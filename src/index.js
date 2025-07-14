import data from './yearly.js'
import { getDate, getRange, round, getGrowth, getAverage } from './lib.js'

const calculate = function (val, changes) {
  changes.forEach(([date, rate]) => {
    const change = val * (rate / 100)
    val += change
    // console.log(`${date}: ${rate}% on ${(val - change).toFixed(2)} = ${val.toFixed(2)}`)
  })
  return val
}

const caInflation = (value, start, end) => {
  start = getDate(start)
  end = getDate(end)
  let changes = getRange(start, end)
  let result = calculate(value, changes)
  let average = getAverage(changes)
  let growth = getGrowth(value, result)

  return {
    start, end,
    initial: value,
    result: round(result),
    averageInflation: round(average),
    percentChange: growth,
  }
}

caInflation.getLatest = () => {
  return data[data.length - 1][0]
}

export default caInflation