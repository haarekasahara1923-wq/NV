import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { calculateMEIncentive, calculateSMIncentive } from '@/lib/incentives';

export async function GET(req: Request) {
  try {
    const token = cookies().get('nvstudio_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== 'SALES_MANAGER') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const meId = searchParams.get('meId');

    if (!meId) {
      return NextResponse.json({ error: 'ME ID required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { smProfile: true }
    });

    if (!user || !user.smProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const me = await prisma.marketingExecutive.findUnique({
      where: { id: meId },
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

    if (!me || me.smId !== user.smProfile.id) {
      return NextResponse.json({ error: 'Invalid ME or unauthorized access' }, { status: 403 });
    }

    const clientsData = me.clients.map(client => {
      let clientIncentiveToSM = 0;
      const servicesData = client.user.subscriptions.map(sub => {
         const isFirstMonth = sub.createdAt > new Date(new Date().setMonth(new Date().getMonth() - 1));
         const smIncentive = calculateSMIncentive(sub.service.slug, isFirstMonth);
         clientIncentiveToSM += smIncentive;
         return {
           serviceName: sub.service.name,
           smIncentive: smIncentive,
           startDate: sub.startDate || sub.createdAt,
           duration: sub.planType
         };
      });

      return {
        id: client.id,
        name: client.user.name,
        phone: client.user.phone,
        email: client.user.email,
        employeeCode: client.user.employeeCode || `CLIENT-${client.id.slice(0,5).toUpperCase()}`,
        services: servicesData,
        totalIncentiveToSM: clientIncentiveToSM,
        joinedAt: client.createdAt
      };
    });

    return NextResponse.json({ clients: clientsData });
  } catch (error) {
    console.error('Error fetching SM me-clients:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
