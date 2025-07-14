Tools for working with inflation-adjusted prices in Canada.

Pulls "Composite Price Index" data from [statistics canada](https://www150.statcan.gc.ca/n1/pub/71-607-x/2018016/cpilg-ipcgl-eng.htm)

There are apparently some subtle caveats, which I do not understand.

Data is available from Jan 1915

```
npm install ca-inflation
```

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