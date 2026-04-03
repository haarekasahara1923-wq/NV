import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const rzpOrderId = payment.order_id;

      const order = await prisma.order.findUnique({
        where: { razorpayOrderId: rzpOrderId },
        include: { service: true, user: true }
      });

      if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

      // 1. Update Order status
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'PAID',
          razorpayPaymentId: payment.id
        }
      });

      // 2. Create Subscription (PENDING_ACTIVATION)
      await prisma.subscription.create({
        data: {
          userId: order.userId,
          serviceId: order.serviceId,
          orderId: order.id,
          planType: order.planType || 'MONTHLY',
          status: 'PENDING_ACTIVATION'
        }
      });

      // 3. Commission Logic
      if (order.meId) {
        const me = await prisma.marketingExecutive.findUnique({ where: { id: order.meId } });
        if (me && me.meCode !== process.env.DEFAULT_ME_CODE) {
          const commissionAmt = Math.round((order.amount / 100) * (me.commissionPct / 100));
          if (commissionAmt > 0) {
            await prisma.mEEarning.create({
              data: {
                meId: order.meId,
                orderId: order.id,
                amount: commissionAmt,
                status: 'PENDING'
              }
            });
          }
        }
      }

      // 4. Send emails (TODO: resend client order confirmation + admin alert)

      // 5. Send Realtime event to Redis
      await redis.rpush('admin:events', JSON.stringify({
        type: 'new-order',
        clientName: order.user.name,
        service: order.service.name,
        amount: order.amount / 100,
        time: Date.now()
      }));

      // Cache subscription status
      await redis.set(`sub:${order.userId}:${order.serviceId}`, 'PENDING_ACTIVATION', { ex: 86400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
