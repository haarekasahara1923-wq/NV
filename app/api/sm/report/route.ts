import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function GET(req: Request) {
  const session = await getSession();
  if (!session || session.role !== 'SALES_MANAGER') {
    return new Response('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'daily';
  const dateStr = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const meId = searchParams.get('meId');

  const sm = await prisma.salesManager.findUnique({
    where: { userId: session.userId },
    include: { mes: true }
  });
  if (!sm) return new Response('SM not found', { status: 404 });

  // Query performance data
  const targetDate = new Date(dateStr);
  targetDate.setHours(0,0,0,0);

  const query: any = {
    where: {
      me: {
        smId: sm.id,
        ...(meId ? { id: meId } : {})
      }
    },
    include: { me: true }
  };

  if (type === 'daily') {
    query.where.date = targetDate;
  } else {
    const startOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
    const endOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);
    query.where.date = { gte: startOfMonth, lte: endOfMonth };
  }

  const metrics = await prisma.dailyPerformance.findMany(query);

  // Generate CSV
  let csv = 'Date,Executive Name,Executive Code,Calls Done,Leads Created,Orders Successful\n';
  metrics.forEach((m: any) => {
    csv += `${m.date.toISOString().split('T')[0]},${m.me.displayName},${m.me.meCode},${m.callsDone},${m.leadsCreated},${m.successfulOrders}\n`;
  });

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename=SM_Report_${type}_${dateStr}.csv`
    }
  });
}
