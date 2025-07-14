/* spencermountain/ca-inflation 0.0.1 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["ca-inflation"] = factory());
})(this, (function () { 'use strict';

  // https://ourworldindata.org/grapher/inflation-of-consumer-prices.csv?v=1&csvType=full&useColumnShortNames=true
  var data = [
    ['1960-01-01', 1.3586956],
    ['1961-01-01', 1.0187668],
    ['1962-01-01', 1.0615711],
    ['1963-01-01', 1.6281513],
    ['1964-01-01', 1.9121447],
    ['1965-01-01', 2.332657],
    ['1966-01-01', 3.815659],
    ['1967-01-01', 3.5799522],
    ['1968-01-01', 4.0552998],
    ['1969-01-01', 4.5615587],
    ['1970-01-01', 3.3460398],
    ['1971-01-01', 2.7049181],
    ['1972-01-01', 4.9880285],
    ['1973-01-01', 7.487647],
    ['1974-01-01', 10.997171],
    ['1975-01-01', 10.672189],
    ['1976-01-01', 7.5417385],
    ['1977-01-01', 7.976445],
    ['1978-01-01', 8.973723],
    ['1979-01-01', 9.144677],
    ['1980-01-01', 10.129221],
    ['1981-01-01', 12.471612],
    ['1982-01-01', 10.768971],
    ['1983-01-01', 5.863588],
    ['1984-01-01', 4.304778],
    ['1985-01-01', 3.9620306],
    ['1986-01-01', 4.194786],
    ['1987-01-01', 4.3561087],
    ['1988-01-01', 4.028234],
    ['1989-01-01', 4.983622],
    ['1990-01-01', 4.780477],
    ['1991-01-01', 5.625864],
    ['1992-01-01', 1.4901329],
    ['1993-01-01', 1.8650794],
    ['1994-01-01', 0.16556291],
    ['1995-01-01', 2.1487603],
    ['1996-01-01', 1.5705311],
    ['1997-01-01', 1.6212164],
    ['1998-01-01', 0.9959425],
    ['1999-01-01', 1.7348429],
    ['2000-01-01', 2.71944],
    ['2001-01-01', 2.5251203],
    ['2002-01-01', 2.2583945],
    ['2003-01-01', 2.7585633],
    ['2004-01-01', 1.8572587],
    ['2005-01-01', 2.213552],
    ['2006-01-01', 2.0020254],
    ['2007-01-01', 2.138384],
    ['2008-01-01', 2.3702707],
    ['2009-01-01', 0.2994668],
    ['2010-01-01', 1.7768716],
    ['2011-01-01', 2.9121351],
    ['2012-01-01', 1.5156783],
    ['2013-01-01', 0.9382919],
    ['2014-01-01', 1.9066359],
    ['2015-01-01', 1.1252414],
    ['2016-01-01', 1.4287596],
    ['2017-01-01', 1.5968841],
    ['2018-01-01', 2.2682257],
    ['2019-01-01', 1.949269],
    ['2020-01-01', 0.71699965],
    ['2021-01-01', 3.395193],
    ['2022-01-01', 6.802801],
    ['2023-01-01', 3.8790016],
    // 
    ['2024-01-01', 2.4],
    // ['2025-01-01', 1],
  ];

  const getDate = function (input) {
    if (typeof input === 'number') {
      return `${input}-01-01`
    }
    return input
  };

  const getRange = (start, end) => {
    start = getDate(start);
    end = getDate(end);
    let startIndex = data.findIndex(d => d[0] === start);
    let endIndex = data.findIndex(d => d[0] === end);
    return data.slice(startIndex, endIndex)
  };

  const round = n => Math.round(n * 100) / 100;

  const getGrowth = (from, to) => {
    let percent = (to / from - 1) * 100;
    return Math.round(percent)
  };

  const getAverage = function (changes) {
    return changes.reduce((acc, curr) => acc + curr[1], 0) / changes.length
  };

  const calculate = function (val, changes) {
    changes.forEach(([date, rate]) => {
      const change = val * (rate / 100);
      val += change;
      // console.log(`${date}: ${rate}% on ${(val - change).toFixed(2)} = ${val.toFixed(2)}`)
    });
    return val
  };

  const caInflation = (value, start, end) => {
    start = getDate(start);
    end = getDate(end);
    let changes = getRange(start, end);
    let result = calculate(value, changes);
    let average = getAverage(changes);
    let growth = getGrowth(value, result);

    return {
      start, end,
      initial: value,
      result: round(result),
      averageInflation: round(average),
      percentChange: growth,
    }
  };

  caInflation.getLatest = () => {
    return data[data.length - 1][0]
  };

  return caInflation;

}));
