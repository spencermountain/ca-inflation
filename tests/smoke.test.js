import test from 'tape'
import caInflation from '../src/index.js'
// import caInflation from '../builds/ca-inflation.mjs';

test('smoke-test', (t) => {
  const res = caInflation(100, 1970, 2024)
  t.equal(res.start, '1970-01-01', 'start date')
  t.equal(res.end, '2024-01-01', 'end date')
  t.equal(res.initial, 100, 'initial value')
  // CPI(2024) / CPI(1970) = 7.9107, per world-bank index levels
  t.equal(res.result, 791.07, 'result')
  t.equal(res.averageInflation, 3.9, 'average inflation')
  t.equal(res.percentChange, 691.07, 'percent change')
  t.ok(caInflation.getLatest() > '2024-01-01', 'latest date')
  t.end()
})

test('single-year uses the end-year rate', (t) => {
  // the 2024 rate (2.38%) is the change from 2023 to 2024
  const res = caInflation(100, 2023, 2024)
  t.equal(res.result, 102.38, 'result')
  t.equal(res.averageInflation, 2.38, 'average inflation')
  t.end()
})

test('same year is a no-op', (t) => {
  const res = caInflation(100, 2024, 2024)
  t.equal(res.result, 100, 'result')
  t.equal(res.averageInflation, 0, 'average inflation')
  t.equal(res.percentChange, 0, 'percent change')
  t.end()
})

test('end defaults to the latest year', (t) => {
  const res = caInflation(100, 2020)
  t.equal(res.end, caInflation.getLatest(), 'end date')
  t.end()
})

test('date formats', (t) => {
  const a = caInflation(100, 1970, 2024)
  t.deepEqual(caInflation(100, '1970', '2024'), a, 'year strings')
  t.deepEqual(caInflation(100, '1970-06-15', '2024-01-01'), a, 'full dates')
  t.end()
})

test('out-of-range inputs throw', (t) => {
  t.throws(() => caInflation(100, 1915, 2024), RangeError, 'before data starts')
  t.throws(() => caInflation(100, 2020, 2099), RangeError, 'after data ends')
  t.throws(() => caInflation(100, 2024, 1970), RangeError, 'reversed range')
  t.throws(() => caInflation(100, 'banana'), RangeError, 'unparseable date')
  t.end()
})
