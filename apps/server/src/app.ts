import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import type { HealthResponse } from '@enterprise-d/contracts';

export function createServer(): FastifyInstance {
  const app = Fastify({ logger: false });

  app.get<{ Reply: HealthResponse }>('/health', async () => ({ status: 'ok' }));

  return app;
}
