import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { calculateMEIncentive } from '@/lib/incentives';

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== 'MARKETING_EXECUTIVE') {
    return new Response('Unauthorized', { status: 401 });
  }

  const me = await prisma.marketingExecutive.findUnique({
    where: { userId: session.userId },
    include: {
      clients: {
        include: {
          user: {
            include: {
              subscriptions: {
                where: { status: 'ACTIVE' },
                include: { service: true }
              }
            }
          }
        }
      }
    }
  });

  if (!me) return new Response('ME Profile not found', { status: 404 });

  let csv = 'Client Name,Client Code,Joined Date,Service,Status,Monthly Incentive Share (ME)\n';
  me.clients.forEach(c => {
    c.user.subscriptions.forEach(sub => {
       const isFirstMonth = sub.createdAt > new Date(new Date().setMonth(new Date().getMonth() - 1));
       const incentive = calculateMEIncentive(sub.service.slug, isFirstMonth);
       csv += `"${c.user.name}","${c.user.employeeCode || ''}",${c.createdAt.toISOString().split('T')[0]},"${sub.service.name}","ACTIVE",${incentive}\n`;
    });
    if (c.user.subscriptions.length === 0) {
       csv += `"${c.user.name}","${c.user.employeeCode || ''}",${c.createdAt.toISOString().split('T')[0]},"NO ACTIVE SERVICE","-",0\n`;
    }
  });

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename=ME_Incentive_Report_${me.meCode}.csv`
    }
  });
}
