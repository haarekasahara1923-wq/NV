import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

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
    const dateParam = searchParams.get('date');

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

    // Verify the ME belongs to this SM
    const me = await prisma.marketingExecutive.findUnique({
      where: { id: meId }
    });

    if (!me || me.smId !== user.smProfile.id) {
      return NextResponse.json({ error: 'Invalid ME or unauthorized access' }, { status: 403 });
    }

    const queryInfo: any = {
      where: { meId: meId },
      orderBy: { createdAt: 'desc' }
    };
    
    if (dateParam) {
      const startOfDay = new Date(dateParam);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(dateParam);
      endOfDay.setHours(23, 59, 59, 999);

      queryInfo.where.date = {
        gte: startOfDay,
        lte: endOfDay
      };
    }

    const records = await prisma.mECallRecord.findMany(queryInfo);

    return NextResponse.json({
        meDetails: { name: me.displayName, code: me.meCode },
        records
    });
  } catch (error) {
    console.error('Error fetching ME daily calls for SM:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
