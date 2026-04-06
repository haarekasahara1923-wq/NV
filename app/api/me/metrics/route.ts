import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.role !== 'MARKETING_EXECUTIVE') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { calls, leads, orders } = await req.json();
    
    const me = await prisma.marketingExecutive.findUnique({
      where: { userId: session.userId }
    });
    if (!me) return NextResponse.json({ error: 'ME Profile not found' }, { status: 404 });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const performance = await prisma.dailyPerformance.upsert({
      where: {
        meId_date: {
          meId: me.id,
          date: today
        }
      },
      update: {
        callsDone: calls,
        leadsCreated: leads,
        successfulOrders: orders
      },
      create: {
        meId: me.id,
        date: today,
        callsDone: calls,
        leadsCreated: leads,
        successfulOrders: orders
      }
    });

    return NextResponse.json({ success: true, data: performance });
  } catch (error) {
    console.error('Metrics logging error:', error);
    return NextResponse.json({ error: 'Failed to save metrics' }, { status: 500 });
  }
}
