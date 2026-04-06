import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

// GET /api/social-media-posts?date=2024-01-15&platform=FACEBOOK&userId=xxx
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get('date');
  const platform = searchParams.get('platform');
  // Admin can query any userId; clients can only query their own
  const targetUserId = session.role === 'ADMIN'
    ? (searchParams.get('userId') || session.userId)
    : session.userId;

  if (!dateStr) return NextResponse.json({ error: 'date is required' }, { status: 400 });

  const date = new Date(dateStr);
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const where: Record<string, unknown> = {
    userId: targetUserId,
    postDate: { gte: startOfDay, lte: endOfDay },
  };
  if (platform) where.platform = platform;

  const posts = await prisma.socialMediaPost.findMany({
    where,
    orderBy: { postDate: 'asc' },
  });

  return NextResponse.json({ posts });
}

// POST /api/social-media-posts  — Admin only: manually add a content entry
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const { userId, platform, postDate, title, contentUrl, thumbnailUrl, contentType } = body;

  if (!userId || !platform || !postDate || !contentUrl) {
    return NextResponse.json({ error: 'userId, platform, postDate, contentUrl are required' }, { status: 400 });
  }

  const post = await prisma.socialMediaPost.create({
    data: {
      userId,
      platform,
      postDate: new Date(postDate),
      title: title || null,
      contentUrl,
      thumbnailUrl: thumbnailUrl || null,
      contentType: contentType || 'POST',
      isAutoSynced: false,
    },
  });

  return NextResponse.json({ post }, { status: 201 });
}
