import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { calculateMEIncentive } from '@/lib/incentives';

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== 'MARKETING_EXECUTIVE') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const me = await prisma.marketingExecutive.findUnique({
    where: { userId: session.userId },
    include: {
      clients: {
        include: {
          user: {
            include: {
              subscriptions: {
                include: { service: true }
              }
            }
          }
        }
      }
    }
  });

  if (!me) return NextResponse.json({ error: 'ME Profile not found' }, { status: 404 });

  const clientsData = me.clients.map(client => {
    let meIncentiveTotal = 0;
    const servicesData = client.user.subscriptions.map(sub => {
       const isFirstMonth = sub.createdAt > new Date(new Date().setMonth(new Date().getMonth() - 1));
       let incentive = 0;
       
       if (sub.status === 'ACTIVE') {
         incentive = calculateMEIncentive(sub.service.slug, isFirstMonth);
         meIncentiveTotal += incentive;
       }

       return {
         serviceName: sub.service.name,
         incentive: incentive,
         startDate: sub.startDate || sub.createdAt,
         duration: sub.planType,
         status: sub.status // PENDING_ACTIVATION or ACTIVE
       };
    });

    return {
      id: client.id,
      name: client.user.name,
      phone: client.user.phone,
      email: client.user.email,
      employeeCode: client.user.employeeCode || `CLIENT-${client.id.slice(0,5).toUpperCase()}`,
      services: servicesData,
      totalIncentive: meIncentiveTotal,
      joinedAt: client.createdAt
    };
  });

  return NextResponse.json({ clients: clientsData });
}
