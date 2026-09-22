import data from './yearly.js'

const firstDate = data[0][0]
const lastDate = data.at(-1)[0]

// normalize 1970, '1970', or '1970-06-15' to '1970-01-01'
const getDate = function (input) {
  const m = String(input).match(/^(\d{4})/)
  if (!m) {
    throw new RangeError(
      `ca-inflation: cannot parse '${input}' as a year - try 1970 or '1970-01-01'`
    )
  }
  return `${m[1]}-01-01`
}

const getRange = (start, end) => {
  const startIndex = data.findIndex((d) => d[0] === start)
  const endIndex = data.findIndex((d) => d[0] === end)
  if (startIndex === -1) {
    throw new RangeError(
      `ca-inflation: no data for '${start}' - data covers ${firstDate} to ${lastDate}`
    )
  }
  if (endIndex === -1) {
    throw new RangeError(
      `ca-inflation: no data for '${end}' - data covers ${firstDate} to ${lastDate}`
    )
  }
  if (endIndex < startIndex) {
    throw new RangeError(`ca-inflation: end date '${end}' is before start date '${start}'`)
  }
  // the rate labelled year Y is the price-change from Y-1 to Y,
  // so converting start→end dollars applies the rates for start+1 through end
  return data.slice(startIndex + 1, endIndex + 1)
}

const round = (n) => Math.round(n * 100) / 100

const getGrowth = (from, to) => {
  return round((to / from - 1) * 100)
}

// compound annual rate (geometric mean), like official inflation calculators report
const getAverage = function (changes) {
  if (changes.length === 0) {
    return 0
  }
  const factor = changes.reduce((acc, [, rate]) => acc * (1 + rate / 100), 1)
  return (Math.pow(factor, 1 / changes.length) - 1) * 100
}

export { getDate, getRange, round, getGrowth, getAverage }
