import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const token = cookies().get('nvstudio_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { orderId, utrNo } = await req.json();

    if (!orderId || !utrNo) {
      return NextResponse.json({ error: 'Missing order ID or UTR number' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { razorpayOrderId: orderId }
    });

    if (!order || order.userId !== decoded.userId) {
      return NextResponse.json({ error: 'Order not found or unauthorized' }, { status: 404 });
    }

    await prisma.order.update({
      where: { id: order.id },
      data: {
        razorpayPaymentId: utrNo // Storing UTR / Transaction ID here for manual tracking
      }
    });

    return NextResponse.json({ success: true, message: 'UTR updated successfully' });
  } catch (error) {
    console.error('Error updating UTR:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
