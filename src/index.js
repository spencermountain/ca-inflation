import data from './data2.js'
import { getDate, getRange, round, getGrowth, getAverage, toMultiple } from './lib.js'

const calculate = function (val, changes) {
  changes.forEach(([date, rate]) => {
    const change = val * (rate)
    val += change
    console.log(`${date}: ${rate}% on ${(val - change).toFixed(2)} = ${val.toFixed(2)}`)
  })
  return val
}

const calculate2 = function (val, changes) {
  const compoundMethod = changes.reduce((acc, [date, rate]) => acc * (1 + rate), 1)
  return val * compoundMethod
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
    result2: calculate2(value, changes),
    averageInflation: round(average),
    percentChange: growth,
    // multiple: toMultiple(growth)
  }
}

caInflation.getLatest = () => {
  return data[data.length - 1][1]
}

export default caInflation