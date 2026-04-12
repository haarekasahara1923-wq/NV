import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const token = cookies().get('nvstudio_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const orderId = params.id;
    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { service: true, user: true }
    });

    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    if (order.status === 'PAID') {
      return NextResponse.json({ error: 'Order is already marked as PAID' }, { status: 400 });
    }

    // 1. Update Order status
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'PAID',
        razorpayPaymentId: 'manual_admin_cash_upi'
      }
    });

    // 2. Create Subscription (PENDING_ACTIVATION -> wait, let's make it ACTIVE or PENDING_ACTIVATION)
    // We will make it ACTIVE immediately since admin is bypassing the flow!
    await prisma.subscription.create({
      data: {
        userId: order.userId,
        serviceId: order.serviceId,
        orderId: order.id,
        planType: order.planType || 'MONTHLY',
        status: 'ACTIVE',
        startDate: new Date(),
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

    return NextResponse.json({ message: 'Order successfully marked as PAID and subscription activated' });
  } catch (error) {
    console.error('Error marking order as paid:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
