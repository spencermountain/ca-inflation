<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />
  <div>calculate inflation for Canadian Dollars</div>
  <a href="https://npmjs.org/package/ca-inflation">
    <img src="https://img.shields.io/npm/v/ca-inflation.svg?style=flat-square" />
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-green.svg?style=flat-square" />
  </a>
</div>

How does money change its worth? Do some prices change, more than others? Is it good? Where does the money go?

This is a (very) small javascript library to calculate inflation-adjusted prices for Canadian Dollars, using annual Consumer Price Index inflation rates from the [World Bank](https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG?locations=CA), via [Our World in Data](https://ourworldindata.org/grapher/inflation-of-consumer-prices). The data covers **1960 to 2024**.

<div align="center">
  <code>npm install ca-inflation</code>
</div>

### Usage

```js
import caInflation from 'ca-inflation'

// get the value of $100 in 1970, in 2024
let res = caInflation(100, 1970, 2024)
// {
//   start: '1970-01-01',
//   end: '2024-01-01',
//   initial: 100,
//   result: 791.07,
//   averageInflation: 3.9,
//   percentChange: 691.07
// }
```

years can be numbers or strings - `1970`, `'1970'`, and `'1970-01-01'` all work.
If you leave out the end date, it uses the most-recent year in the data:

```js
caInflation(100, 2020).result
// 117.44

console.log(caInflation.getLatest())
// '2024-01-01'
```

dates outside the data (before 1960, or in the future) throw a `RangeError`, rather than returning a wrong number.

## Notes

The CPI is an official attempt to reckon the changes of the purchasing power of a normal household.

How the calculation works: the inflation rate for a given year is the change in average prices *from the previous year* - so converting 1970 dollars to 2024 dollars compounds the rates for 1971 through 2024. This is the same as taking the ratio of the CPI index levels, `CPI(2024) / CPI(1970)`, which is what official calculators like the [Bank of Canada's](https://www.bankofcanada.ca/rates/related/inflation-calculator/) do.

`averageInflation` is the compound annual rate (the geometric mean), not the simple average of the yearly rates - again, matching how official calculators report it.

Results may still differ slightly from calculators that compare specific *months* rather than annual averages.

To refresh the data from the source, run `npm run update`.

Please let me know if there are any issues. This is important information, and this stuff is really more difficult than it should be.

### See also
* [us-inflation](https://www.npmjs.com/package/us-inflation) by @jeremiak
* [uk-inflation](https://github.com/craig552uk/uk-inflation) by @craig552uk

MIT
