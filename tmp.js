const monthlyRates = [
  ['2020-01-01', 2.4],
  ['2020-02-01', 2.2],
  ['2020-03-01', 0.9],
  ['2020-04-01', -0.2],
  ['2020-05-01', -0.4],
  ['2020-06-01', 0.7],
  ['2020-07-01', 0.1],
  ['2020-08-01', 0.1],
  ['2020-09-01', 0.5],
  ['2020-10-01', 0.7],
  ['2020-11-01', 1],
  ['2020-12-01', 0.7]
]

// Calculate what $100 becomes by applying each monthly change sequentially
let currentValue = 100
monthlyRates.forEach(([date, rate]) => {
  const change = currentValue * (rate / 100)
  currentValue += change
  console.log(`${date}: ${rate}% on ${(currentValue - change).toFixed(2)} = ${currentValue.toFixed(2)}`)
})

// Calculate the overall inflation rate
const totalInflation = ((currentValue - 100) / 100) * 100
const realChange = currentValue - 100

console.log(`\nFinal Results:`)
console.log(`Annual inflation rate: ${totalInflation.toFixed(2)}%`)
console.log(`$100 becomes: ${currentValue.toFixed(2)}`)
console.log(`Real change: ${realChange.toFixed(2)}`)

// Show the difference from the compound multiplication method
const compoundMethod = monthlyRates.reduce((acc, [date, rate]) => acc * (1 + rate / 100), 1)
console.log(`\nCompound multiplication would give: ${(100 * compoundMethod).toFixed(2)}`)
console.log(`Difference: ${(currentValue - 100 * compoundMethod).toFixed(2)}`)