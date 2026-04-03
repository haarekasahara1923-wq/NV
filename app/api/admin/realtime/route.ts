import { NextRequest } from 'next/server';
import { redis } from '@/lib/redis';

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const pubsub = redis.duplicate();
      
      const onMessage = (channel: string, message: string) => {
        const payload = JSON.stringify({ type: channel, ...JSON.parse(message) });
        controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
      };

      // Subscribe to Redis channels
      await pubsub.subscribe('admin:new-signup', 'admin:new-order');
      pubsub.on('message', onMessage);

      req.signal.addEventListener('abort', () => {
        pubsub.unsubscribe('admin:new-signup', 'admin:new-order');
        pubsub.quit();
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
