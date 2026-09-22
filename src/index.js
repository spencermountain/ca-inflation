import data from './yearly.js'
import { getDate, getRange, round, getGrowth, getAverage } from './lib.js'

const calculate = function (val, changes) {
  changes.forEach(([, rate]) => {
    val += val * (rate / 100)
  })
  return val
}

const caInflation = (value, start, end) => {
  start = getDate(start)
  end = end === undefined ? data.at(-1)[0] : getDate(end)
  const changes = getRange(start, end)
  const result = calculate(value, changes)
  const average = getAverage(changes)
  const growth = getGrowth(value, result)

  return {
    start, end,
    initial: value,
    result: round(result),
    averageInflation: round(average),
    percentChange: growth,
  }
}

caInflation.getLatest = () => {
  return data.at(-1)[0]
}

export default caInflation
