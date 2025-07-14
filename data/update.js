import fs from 'fs'
process.cwd()

let data = fs.readFileSync('./data/data.json', 'utf8')
let lines = JSON.parse(data)
let last = lines[lines.length - 1]

let url = `https://www.bankofcanada.ca/valet/observations/STATIC_ATABLE_CPILL,STATIC_ATABLE_CPIHL,STATIC_ATABLE_V41690973,CPI_TRIM,CPI_MEDIAN/json?start_date=2025-01-01`
fetch(url)
  .then(response => response.json())
  .then(data => {
    data.observations.forEach(obj => {
      console.log(obj.d, last[0])
      if (obj.d > last[0]) {
        lines.push([obj.d, obj.STATIC_ATABLE_V41690973.v])
      }
    })
    fs.writeFileSync('./data/data.json', JSON.stringify(lines, null, 2))
  })
  .catch(error => {
    console.error('Error:', error)
  })