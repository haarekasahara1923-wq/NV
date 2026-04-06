import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, signToken } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  identifier: z.string().min(1, 'Email or Employee Code is required'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = loginSchema.parse(body);

    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.identifier },
          { employeeCode: data.identifier }
        ]
      }
    });

    // Check for admin bootstrap
    const isBootstrapAdmin = 
      process.env.ADMIN_EMAIL && 
      data.identifier === process.env.ADMIN_EMAIL && 
      data.password === process.env.ADMIN_PASSWORD;

    if (isBootstrapAdmin && !user) {
      const { hashPassword } = await import('@/lib/auth');
      const hash = await hashPassword(data.password);
      user = await prisma.user.create({
        data: {
          name: "NV Studio Admin",
          email: data.identifier,
          phone: "9999999999",
          passwordHash: hash,
          role: "ADMIN"
        }
      });
    }

    if (!user || !(await comparePassword(data.password, user.passwordHash))) {
      return NextResponse.json(
        { error: 'Invalid identifier or password' },
        { status: 401 }
      );
    }

    const token = signToken({ 
      userId: user.id, 
      role: user.role, 
      meCode: user.meCode || undefined 
    });

    let redirectUrl = '/dashboard';
    if (user.role === 'ADMIN') redirectUrl = '/admin';
    if (user.role === 'MARKETING_EXECUTIVE') redirectUrl = '/me-dashboard';
    if (user.role === 'SALES_MANAGER') redirectUrl = '/sm-dashboard';

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
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
