import { NextRequest } from 'next/server';
import { redis } from '@/lib/redis';

export const dynamic = 'force-dynamic';

// @upstash/redis is REST-based and does not support pub/sub subscribe.
// We use a Redis List as an event queue: events are pushed by API routes,
// and this SSE endpoint polls for new items and streams them to the client.

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();
  let lastIndex = 0;

  const stream = new ReadableStream({
    async start(controller) {
      // Send initial keep-alive
      controller.enqueue(encoder.encode(': connected\n\n'));

      const interval = setInterval(async () => {
        try {
          // Read all events from position lastIndex onwards
          const events = await redis.lrange('admin:events', lastIndex, -1);
          if (events && events.length > 0) {
            lastIndex += events.length;
            for (const event of events) {
              controller.enqueue(encoder.encode(`data: ${event}\n\n`));
            }
          }
          // Keep-alive ping every cycle
          controller.enqueue(encoder.encode(': ping\n\n'));
        } catch {
          // Ignore polling errors silently
        }
      }, 3000); // Poll every 3 seconds

      req.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
