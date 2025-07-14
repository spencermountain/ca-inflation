Tools for working with inflation-adjusted prices in Canada.

Pulls "Composite Price Index" data from [statistics canada](https://www150.statcan.gc.ca/n1/pub/71-607-x/2018016/cpilg-ipcgl-eng.htm)

There are apparently some subtle caveats, which I do not understand.

Data is available from Jan 1915

```
npm install ca-inflation
```

### Usage

```js
import {getAdjustment, averageInflation} from 'ca-inflation'

// get the value of $100 in 1970, in 2024
let val = getAdjustment(100, 1970, 2024)
// $795.74

let avg = averageInflation(1970, 2024)
// 3.84%


```


### See also
* [us-inflation](https://www.npmjs.com/package/us-inflation) by @jeremiak
* [uk-inflation](https://github.com/craig552uk/uk-inflation) by @craig552uk

MIT