import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code')?.trim();

  if (!code) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  try {
    // Check Redis cache first
    const cached = await redis.get(`mecode:${code}`);
    if (cached) {
      return NextResponse.json(typeof cached === 'string' ? JSON.parse(cached) : cached);
    }

    const me = await prisma.marketingExecutive.findUnique({
      where: { meCode: code },
      select: { displayName: true, isActive: true }
    });

    if (me && me.isActive) {
      const result = { valid: true, meName: me.displayName };
      await redis.set(`mecode:${code}`, JSON.stringify(result), { ex: 300 });
      return NextResponse.json(result);
    }

    return NextResponse.json({ valid: false }, { status: 404 });
  } catch (error) {
    console.error('Validate ME Code Error:', error);
    return NextResponse.json({ valid: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
