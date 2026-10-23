import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createOfflineReply } from './index.ts';

test('offline reply is deterministic and usable without a provider', () => {
  const first = createOfflineReply();
  const second = createOfflineReply();

  assert.equal(first, second);
  assert.match(first, /offline mode/);
});
