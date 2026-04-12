import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  try {
    const token = cookies().get('nvstudio_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== 'MARKETING_EXECUTIVE') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { meProfile: true }
    });

    if (!user || !user.meProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get('date');

    const queryInfo: any = {
      where: { meId: user.meProfile.id },
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

    return NextResponse.json(records);
  } catch (error) {
    console.error('Error fetching ME daily calls:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const token = cookies().get('nvstudio_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== 'MARKETING_EXECUTIVE') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { meProfile: true }
    });

    if (!user || !user.meProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const body = await req.json();
    const { clientName, address, mobileNo, servicesInterest, remarks, isOnboarded } = body;

    if (!clientName || !mobileNo) {
      return NextResponse.json({ error: 'Client Name and Mobile Number are required' }, { status: 400 });
    }

    const record = await prisma.mECallRecord.create({
      data: {
        meId: user.meProfile.id,
        clientName,
        address,
        mobileNo,
        servicesInterest,
        remarks,
        isOnboarded: isOnboarded || false
      }
    });

    return NextResponse.json({ message: 'Call log added successfully', record }, { status: 201 });
  } catch (error) {
    console.error('Error adding ME call log:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
