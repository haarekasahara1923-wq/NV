import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, signToken } from '@/lib/auth';
import { z } from 'zod';
import { redis } from '@/lib/redis';
import { resend } from '@/lib/resend';
// import { WelcomeClientEmail, WelcomeMEEmail, MENewClientAlert } from '@/emails'; // To be implemented

const signupSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  signupType: z.enum(['CLIENT', 'ME']),
  meCode: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = signupSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(data.password);

    if (data.signupType === 'CLIENT') {
      const codeToUse = data.meCode?.trim() ? data.meCode.trim() : (process.env.DEFAULT_ME_CODE || 'NV001');

      const meUser = await prisma.marketingExecutive.findUnique({
        where: { meCode: codeToUse },
      });

      if (!meUser) {
        return NextResponse.json({ error: 'Invalid ME Code' }, { status: 400 });
      }

      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          passwordHash: hashedPassword,
          role: 'CLIENT',
          meCode: codeToUse,
          referredByME: meUser.id,
        },
      });

      await prisma.client.create({
        data: {
          userId: user.id,
          meId: meUser.id,
        },
      });

      // Send emails
      // await resend.emails.send({ ...WelcomeClientEmail });
      // await resend.emails.send({ ...MENewClientAlert });

      // Realtime event (with safety fallback)
      try {
        await redis.rpush('admin:events', JSON.stringify({ type: 'new-signup', name: data.name, email: data.email, meCode: codeToUse, time: Date.now() }));
      } catch (redisError) {
        console.warn('Realtime event failed to publish to Redis:', redisError);
      }

      const token = signToken({ userId: user.id, role: user.role, meCode: codeToUse });

      const response = NextResponse.json({ message: 'Signup successful', redirect: '/dashboard' });
      response.cookies.set('nvstudio_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60, path: '/' });
      return response;

    } else {
      // ME Signup
      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          passwordHash: hashedPassword,
          role: 'MARKETING_EXECUTIVE',
        },
      });

      await prisma.marketingExecutive.create({
        data: {
          userId: user.id,
          meCode: `PENDING-${user.id}`, // Temporary
          displayName: data.name,
          isActive: true, // Auto-activated for testing
        },
      });

      // Send Email
      // await resend.emails.send({ ...WelcomeMEEmail });

      return NextResponse.json({ message: 'Account created! Admin will assign your ME code within 24 hours.', redirect: '/login' });
    }

  } catch (error: any) {
    console.error('Signup Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
