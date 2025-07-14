import test from 'node:test';
import assert from 'node:assert';
import caInflation from '../src/index.js';
// import caInflation from '../builds/ca-inflation.mjs';

test('smoke-test', (t) => {
  let res = caInflation(100, 1970, 2024)
  assert.strictEqual(res.start, '1970-01-01', 'start date')
  assert.strictEqual(res.end, '2024-01-01', 'end date')
  assert.strictEqual(res.initial, 100, 'initial value')
  assert.strictEqual(res.result > 780 && res.result < 800, true, 'result')
  assert.strictEqual(res.averageInflation, 3.97, 'average inflation')
  assert.strictEqual(res.percentChange, 699, 'percent change')
  assert.strictEqual(caInflation.getLatest(), '2024-01-01', 'latest date')
})