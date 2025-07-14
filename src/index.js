import data from './data.js'
import { getDate, getRange, round, getGrowth, getAverage, toMultiple } from './lib.js'

const caInflation = (value, start, end) => {
  start = getDate(start)
  end = getDate(end)
  let changes = getRange(start, end)
  let result = value
  changes.forEach(o => {
    let cpi = o[1] / 100 / 12
    result += result * cpi
  })
  let average = getAverage(changes)
  let growth = getGrowth(value, result)

  return {
    start, end,
    initial: value,
    result: round(result),
    average: round(average),
    growth,
    multiple: toMultiple(growth)
  }
}

caInflation.getLatest = () => {
  return data[data.length - 1][1]
}

export default caInflation