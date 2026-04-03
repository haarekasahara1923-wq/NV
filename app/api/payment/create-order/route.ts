import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { razorpay } from '@/lib/razorpay';
import { verifyToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    // Auth check
    const token = req.headers.get('authorization')?.split(' ')[1] || (req as any).cookies?.get('nvstudio_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    let payload;
    try {
      payload = verifyToken(token);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
    }

    const { serviceId, planType } = await req.json();

    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });

    let amount = service.price;
    if (planType === 'SIX_MONTH' && service.sixMonthTotal) amount = service.sixMonthTotal;
    if (planType === 'YEARLY' && service.yearlyTotal) amount = service.yearlyTotal;

    // Convert to paise
    const amountInPaise = amount * 100;

    const rzpOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    });

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { referredByME: true }
    });

    const order = await prisma.order.create({
      data: {
        userId: payload.userId,
        serviceId: service.id,
        razorpayOrderId: rzpOrder.id,
        amount: amountInPaise,
        currency: "INR",
        planType: planType || null,
        meId: user?.referredByME || null
      }
    });

    return NextResponse.json({
      orderId: rzpOrder.id,
      amount: amountInPaise,
      currency: "INR"
    });

  } catch (error) {
    console.error('Create Order Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
