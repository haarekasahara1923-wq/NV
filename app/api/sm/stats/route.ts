import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { calculateSMIncentive } from '@/lib/incentives';

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== 'SALES_MANAGER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sm = await prisma.salesManager.findUnique({
    where: { userId: session.userId },
    include: {
      user: true,
      mes: {
        include: {
          _count: {
            select: { clients: true, dailyMetrics: true }
          },
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
          },
          dailyMetrics: {
             orderBy: { date: 'desc' },
             take: 1
          }
        }
      }
    }
  });

  if (!sm) return NextResponse.json({ error: 'SM Profile not found' }, { status: 404 });

  const teamData = sm.mes.map(me => {
    let smIncentiveTotal = 0;
    
    const clients = me.clients.map(client => {
      let clientIncentiveToSM = 0;
      let activeServicesNames: string[] = [];

      client.user.subscriptions.forEach(sub => {
        // Calculate if it's the 1st month
        const isFirstMonth = sub.createdAt > new Date(new Date().setMonth(new Date().getMonth() - 1));
        const incentive = calculateSMIncentive(sub.service.slug, isFirstMonth);
        clientIncentiveToSM += incentive;
        activeServicesNames.push(sub.service.name);
      });

      smIncentiveTotal += clientIncentiveToSM;
      return {
        id: client.id,
        user: { name: client.user.name, employeeCode: client.user.employeeCode },
        incentiveToSM: clientIncentiveToSM,
        activeServices: activeServicesNames.join(', ')
      };
    });

    return {
      id: me.id,
      displayName: me.displayName,
      meCode: me.meCode,
      _count: me._count,
      todayStats: me.dailyMetrics[0] || null,
      clients: clients,
      smIncentiveTotal: smIncentiveTotal
    };
  });

  return NextResponse.json({
    info: { name: sm.user.name, smCode: sm.smCode },
    team: teamData
  });
}
