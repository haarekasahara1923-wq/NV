import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const ratelimitKey = `ratelimit:contact:${ip}`;
    
    // Rate limit
    const count = await redis.incr(ratelimitKey);
    if (count === 1) await redis.expire(ratelimitKey, 60 * 5); // 5 mins
    if (count > 5) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

    const body = await req.json();
    const data = contactSchema.parse(body);

    await prisma.contactMessage.create({ data });

    // TODO: Send ContactAck Email to user via Resend
    // TODO: Send Alert to Admin via Resend

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid input or internal error' }, { status: 400 });
  }
}
