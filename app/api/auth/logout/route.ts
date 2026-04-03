import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully', redirect: '/login' });
  response.cookies.set('nvstudio_token', '', { maxAge: 0, path: '/' });
  return response;
}
