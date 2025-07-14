import caInflation from './src/index.js'

// get the value of $100 in 1970, in 2024
console.log(caInflation(100, '1970-01-01', '2024-01-01'))
//{start:'1970-01-01', end:'2024-0101', value: 795.74}

// console.log(caInflation(100, '2020-01-01', '2021-01-01'))
