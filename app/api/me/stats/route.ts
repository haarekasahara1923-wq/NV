import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== 'MARKETING_EXECUTIVE') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const me = await prisma.marketingExecutive.findUnique({
    where: { userId: session.userId },
    include: {
      user: true,
      sm: true,
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

  if (!me) return NextResponse.json({ error: 'ME Profile not found' }, { status: 404 });

  // Calculate earnings real quick
  // (In production, this might be a separate background task, but for MVP it's here)
  const earnings = 2400; // Placeholder until we integrate the lib/incentives logic fully into DB queries

  return NextResponse.json({
    name: me.displayName || me.user.name,
    meCode: me.meCode,
    smCode: me.sm?.smCode,
    clients: me.clients.length,
    newThisMonth: me.clients.filter(c => c.createdAt > new Date(new Date().setDate(1))).length,
    earnings: earnings
  });
}
