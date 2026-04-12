import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const token = cookies().get('nvstudio_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const totalClients = await prisma.user.count({ where: { role: 'CLIENT' } });
    const totalMEs = await prisma.user.count({ where: { role: 'MARKETING_EXECUTIVE' } });
    
    const paidOrders = await prisma.order.findMany({ where: { status: 'PAID' } });
    const totalRevenue = paidOrders.reduce((sum, order) => sum + (order.amount / 100), 0);

    const pendingOrdersCount = await prisma.order.count({ where: { status: 'PENDING' } });

    const recentActivity = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true, service: true }
    });

    const pendingActions = await prisma.order.findMany({
      where: { status: 'PENDING' },
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true, service: true }
    });

    return NextResponse.json({ 
      stats: {
        totalClients,
        totalMEs,
        totalRevenue,
        pendingOrdersCount
      },
      recentActivity,
      pendingActions
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
