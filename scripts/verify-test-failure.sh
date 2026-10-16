#!/usr/bin/env bash
set -euo pipefail

probe_dir="$(mktemp -d "${TMPDIR:-/tmp}/night-watch-ci-probe.XXXXXX")"
fixture="$probe_dir/ci-failure-probe.test.mjs"
output="$probe_dir/npm-test-output.txt"

cleanup() {
  rm -f "$fixture" "$output"
  rmdir "$probe_dir"
}
trap cleanup EXIT

cat > "$fixture" <<'TEST'
import { test } from 'node:test';

test('CI_FAILURE_PROPAGATION_PROBE', () => {
  throw new Error('Intentional failure used to verify CI exit propagation.');
});
TEST

set +e
npm test -- "$fixture" >"$output" 2>&1
status=$?
set -e

if [[ "$status" -eq 0 ]]; then
  cat "$output"
  printf '%s\n' 'FAIL: npm test returned success for an intentionally failing test.' >&2
  exit 1
fi

if ! grep -q 'CI_FAILURE_PROPAGATION_PROBE' "$output"; then
  cat "$output"
  printf '%s\n' 'FAIL: npm test failed without executing the failure-probe test.' >&2
  exit 1
fi

printf 'PASS: npm test propagated the deliberate failure (exit %s).\n' "$status"
