import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, signToken } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = loginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await comparePassword(data.password, user.passwordHash))) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (user.role === 'MARKETING_EXECUTIVE') {
      const meProfile = await prisma.marketingExecutive.findUnique({
        where: { userId: user.id },
      });
      if (!meProfile || !meProfile.isActive) {
        return NextResponse.json(
          { error: 'Your account is pending activation by admin.' },
          { status: 403 }
        );
      }
    }

    const token = signToken({ userId: user.id, role: user.role, meCode: user.meCode || undefined });

    let redirectUrl = '/dashboard';
    if (user.role === 'ADMIN') redirectUrl = '/admin';
    if (user.role === 'MARKETING_EXECUTIVE') redirectUrl = '/me-dashboard';

    const response = NextResponse.json({ message: 'Login successful', redirect: redirectUrl });
    response.cookies.set('nvstudio_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
