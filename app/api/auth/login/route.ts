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

    let user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    // Check for admin bootstrap if user not found or password doesn't match
    const isBootstrapAdmin = 
      process.env.ADMIN_EMAIL && 
      data.email === process.env.ADMIN_EMAIL && 
      data.password === process.env.ADMIN_PASSWORD;

    if (isBootstrapAdmin) {
      if (!user) {
        // Create the admin user if it doesn't exist
        const { hashPassword } = await import('@/lib/auth');
        const hash = await hashPassword(data.password);
        user = await prisma.user.create({
          data: {
            name: "NV Studio Admin",
            email: data.email,
            phone: "9999999999",
            passwordHash: hash,
            role: "ADMIN"
          }
        });
        
        // Also create ME profile for admin (NV001)
        await prisma.marketingExecutive.upsert({
          where: { userId: user.id },
          update: { isActive: true, meCode: "NV001" },
          create: {
            userId: user.id,
            meCode: "NV001",
            displayName: "NV Studio (Company)",
            isActive: true,
            commissionPct: 0,
          }
        });
      } else {
        // If user exists but login was failed, and it matches env vars, we could update it too
        // But for now, we'll just allow it to fall through to the password check if and only if
        // the password matches the hashed one in DB. 
        // If password didn't match but matches ADMIN_PASSWORD, we can "force" log in and update.
      }
    }

    if (!user || !(await comparePassword(data.password, user.passwordHash))) {
      // Final attempt: if we are here and password didn't match the hash, but we have a match
      // with ADMIN_PASSWORD for the ADMIN_EMAIL, we should still fail UNLESS 
      // it's the very first bootstrap. But we already handled the "no user" case.
      
      // One edge case: User exists but password in DB is old, but matches ADMIN_PASSWORD in env.
      // Let's allow force bootstrap for admin email if password matches env secret.
      if (isBootstrapAdmin && user) {
          // Allow login and update the hash to stay in sync
          const { hashPassword } = await import('@/lib/auth');
          const newHash = await hashPassword(data.password);
          await prisma.user.update({
             where: { id: user.id },
             data: { passwordHash: newHash, role: 'ADMIN' }
          });
      } else {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }
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
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
