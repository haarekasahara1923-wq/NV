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
  signupType: z.enum(['CLIENT', 'ME', 'SM']),
  meCode: z.string().optional(),
  employeeCode: z.string().optional(),
  smCode: z.string().optional(),
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

    if (data.employeeCode) {
      const existingCode = await prisma.user.findUnique({
        where: { employeeCode: data.employeeCode }
      });
      if (existingCode) {
        return NextResponse.json({ error: 'Employee Code already in use' }, { status: 400 });
      }
    }

    const hashedPassword = await hashPassword(data.password);

    if (data.signupType === 'CLIENT') {
      const codeToUse = data.meCode?.trim() ? data.meCode.trim() : (process.env.DEFAULT_ME_CODE || 'NVME001');

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

      const token = signToken({ userId: user.id, role: user.role, meCode: codeToUse });
      const response = NextResponse.json({ message: 'Signup successful', redirect: '/dashboard' });
      response.cookies.set('nvstudio_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60, path: '/' });
      return response;

    } else if (data.signupType === 'SM') {
      // Sales Manager Signup
      if (!data.employeeCode) return NextResponse.json({ error: 'Employee code required' }, { status: 400 });

      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          passwordHash: hashedPassword,
          role: 'SALES_MANAGER',
          employeeCode: data.employeeCode,
          meCode: data.employeeCode, // SM code is also their ME code for tracking
        },
      });

      await prisma.salesManager.create({
        data: {
          userId: user.id,
          smCode: data.employeeCode,
          displayName: data.name,
        },
      });

      const token = signToken({ userId: user.id, role: user.role });
      const response = NextResponse.json({ message: 'SM Signup successful', redirect: '/sm/dashboard' });
      response.cookies.set('nvstudio_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60, path: '/' });
      return response;

    } else if (data.signupType === 'ME') {
      // ME Signup
      if (!data.employeeCode) return NextResponse.json({ error: 'Employee code required' }, { status: 400 });
      if (!data.smCode) return NextResponse.json({ error: 'SM code required' }, { status: 400 });

      const sm = await prisma.salesManager.findUnique({
        where: { smCode: data.smCode }
      });

      if (!sm) {
        return NextResponse.json({ error: 'Invalid SM Code' }, { status: 400 });
      }

      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          passwordHash: hashedPassword,
          role: 'MARKETING_EXECUTIVE',
          employeeCode: data.employeeCode,
          meCode: data.employeeCode,
          smCode: data.smCode
        },
      });

      await prisma.marketingExecutive.create({
        data: {
          userId: user.id,
          meCode: data.employeeCode,
          displayName: data.name,
          smId: sm.id
        },
      });

      const token = signToken({ userId: user.id, role: user.role, meCode: data.employeeCode });
      const response = NextResponse.json({ message: 'ME Signup successful', redirect: '/me/dashboard' });
      response.cookies.set('nvstudio_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60, path: '/' });
      return response;
    }

  } catch (error: any) {
    console.error('Signup Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
