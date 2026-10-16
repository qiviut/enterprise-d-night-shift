import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createServer } from './app.ts';

test('GET /health returns the shared health contract', async (context) => {
  const app = createServer();
  await app.ready();
  context.after(async () => app.close());

  const response = await app.inject({ method: 'GET', url: '/health' });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { status: 'ok' });
});
