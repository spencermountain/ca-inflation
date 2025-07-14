<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />
  <div>calculate inflation for Canadian Dollars</div>
  <a href="https://npmjs.org/package/ca-inflation">
    <img src="https://img.shields.io/npm/v/ca-inflation.svg?style=flat-square" />
  </a>
  <a href="https://unpkg.com/ca-inflation/builds/ca-inflation.min.js">
     <img src="https://badge-size.herokuapp.com/spencermountain/ca-inflation/master/builds/ca-inflation.min.js" />
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-green.svg?style=flat-square" />
  </a>
</div>

How does money change its worth? Do some prices change, more than others? Is it good? Where does the money go?

This is a (very) small javascript library to calculate inflation-adjusted prices for Canadian Dollars, based on 'Composite Price Index' data from [statistics canada](https://www150.statcan.gc.ca/n1/pub/71-607-x/2018016/cpilg-ipcgl-eng.htm). 

The CPI is an official attempt to reckon the changes of the purchasing power of a normal household. Data for this is available annually, since Jan 1915.

Regarding the calculation, there are apparently some subtle caveats which I do not understand. Results are comparable to many commercial calculators - although there is little agreement even between them.

It really seems like this information is more difficult than it should be.


<div align="center">
  <code>npm install ca-inflation</code>
</div>


### Usage

```js
import caInflation from './src/index.js'

// get the value of $100 in 1970, in 2024
let res = caInflation(100, 1970, 1980)
// {
//   start: '1970-01-01',
//   end: '2024-01-01',
//   initial: 100,
//   result: 798.52,
//   averageInflation: 3.97,
//   percentChange: 699
// }
```

this library is updated as often as possible, to see the most-recent data, use:
```js
console.log(caInflation.getLatest())
// 2024-01-01
```

please let me know if there are any issues. This is important information, and also more-complicated than it should be.

### See also
* [us-inflation](https://www.npmjs.com/package/us-inflation) by @jeremiak
* [uk-inflation](https://github.com/craig552uk/uk-inflation) by @craig552uk

MIT