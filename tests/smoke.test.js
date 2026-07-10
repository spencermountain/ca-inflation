import test from 'node:test';
import assert from 'node:assert';
import caInflation from '../src/index.js';
// import caInflation from '../builds/ca-inflation.mjs';

test('smoke-test', (t) => {
  let res = caInflation(100, 1970, 2024)
  assert.strictEqual(res.start, '1970-01-01', 'start date')
  assert.strictEqual(res.end, '2024-01-01', 'end date')
  assert.strictEqual(res.initial, 100, 'initial value')
  // CPI(2024) / CPI(1970) = 7.9107, per world-bank index levels
  assert.strictEqual(res.result, 791.07, 'result')
  assert.strictEqual(res.averageInflation, 3.9, 'average inflation')
  assert.strictEqual(res.percentChange, 691.07, 'percent change')
  assert.strictEqual(caInflation.getLatest(), '2024-01-01', 'latest date')
})

test('single-year uses the end-year rate', (t) => {
  // the 2024 rate (2.38%) is the change from 2023 to 2024
  let res = caInflation(100, 2023, 2024)
  assert.strictEqual(res.result, 102.38, 'result')
  assert.strictEqual(res.averageInflation, 2.38, 'average inflation')
})

test('same year is a no-op', (t) => {
  let res = caInflation(100, 2024, 2024)
  assert.strictEqual(res.result, 100, 'result')
  assert.strictEqual(res.averageInflation, 0, 'average inflation')
  assert.strictEqual(res.percentChange, 0, 'percent change')
})

test('end defaults to the latest year', (t) => {
  let res = caInflation(100, 2020)
  assert.strictEqual(res.end, caInflation.getLatest(), 'end date')
})

test('date formats', (t) => {
  let a = caInflation(100, 1970, 2024)
  assert.deepStrictEqual(caInflation(100, '1970', '2024'), a, 'year strings')
  assert.deepStrictEqual(caInflation(100, '1970-06-15', '2024-01-01'), a, 'full dates')
})

test('out-of-range inputs throw', (t) => {
  assert.throws(() => caInflation(100, 1915, 2024), RangeError, 'before data starts')
  assert.throws(() => caInflation(100, 2020, 2099), RangeError, 'after data ends')
  assert.throws(() => caInflation(100, 2024, 1970), RangeError, 'reversed range')
  assert.throws(() => caInflation(100, 'banana'), RangeError, 'unparseable date')
})
