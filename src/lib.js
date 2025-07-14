import data from './yearly.js'

const getDate = function (input) {
  if (typeof input === 'number') {
    return `${input}-01-01`
  }
  return input
}

const getRange = (start, end) => {
  start = getDate(start)
  end = getDate(end)
  let startIndex = data.findIndex(d => d[0] === start)
  let endIndex = data.findIndex(d => d[0] === end)
  return data.slice(startIndex, endIndex)
}

const round = n => Math.round(n * 100) / 100

const getGrowth = (from, to) => {
  let percent = (to / from - 1) * 100
  return Math.round(percent)
}

const getAverage = function (changes) {
  return changes.reduce((acc, curr) => acc + curr[1], 0) / changes.length
}

export { getDate, getRange, round, getGrowth, getAverage }