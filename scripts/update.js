// refresh src/yearly.js from Our World in Data (World Bank annual CPI inflation, FP.CPI.TOTL.ZG)
import fs from 'fs'
import current from '../src/yearly.js'

const url = 'https://ourworldindata.org/grapher/inflation-of-consumer-prices.csv?v=1&csvType=full&useColumnShortNames=true'
const filePath = new URL('../src/yearly.js', import.meta.url)

fetch(url)
  .then(response => response.text())
  .then(csv => {
    // rows look like:  Canada,CAN,1970,3.3460398
    let rows = csv
      .split('\n')
      .filter(line => line.startsWith('Canada,CAN,'))
      .map(line => {
        let [, , year, rate] = line.trim().split(',')
        return [`${year}-01-01`, Number(rate)]
      })
      .filter(([, rate]) => !isNaN(rate))
      .sort((a, b) => (a[0] > b[0] ? 1 : -1))
    if (rows.length === 0) {
      throw new Error('no Canada rows found in csv')
    }
    // keep any hand-added years newer than what OWID has
    let newest = rows[rows.length - 1][0]
    let manual = current.filter(([date]) => date > newest)
    rows = rows.concat(manual)

    let lines = rows.map(([date, rate]) => `  ['${date}', ${rate}],`).join('\n')
    let out = `// ${url}\nexport default [\n${lines}\n]\n`
    fs.writeFileSync(filePath, out)
    console.log(`wrote ${rows.length} rows - latest is ${rows[rows.length - 1][0]}`)
  })
  .catch(error => {
    console.error('Error:', error)
    process.exit(1)
  })
