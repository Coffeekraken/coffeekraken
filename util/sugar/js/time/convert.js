"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = convert;

/**
 * @name                                  convert
 * @namespace                             sugar.js.time
 * @type                                  Function
 * 
 * This function allows you to convert time like seconds, ms, hours, minutes, etc... from one format to another
 * 
 * @param           {String|Number}             from                  The value to start from like "10s", "20ms", "2h", etc...
 * @param           {String}                    [to='ms']             The format you want to get back
 * @return          {Number}                                          The converted value
 * 
 * @example           js
 * import convert from '@coffeekraken/sugar/js/time/convert';
 * convert('10s', 'ms'); // => 10000
 * 
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function convert(from, to = 'ms') {
  // init the fromMs variable
  let fromMs = from; // check if the time is a string to convert it to ms

  if (typeof from === 'string') {
    if (from.slice(-2) === 'ms' || from.slice(-11) === 'millisecond' || from.slice(-12) === 'milliseconds') {
      fromMs = parseFloat(from);
    } else if (from.slice(-1) === 's' || from.slice(-6) === 'second' || from.slice(-7) === 'seconds') {
      fromMs = parseFloat(from) * 1000;
    } else if (from.slice(-1) === 'm' || from.slice(-6) === 'minute' || from.slice(-7) === 'minutes') {
      fromMs = parseFloat(from) * 60 * 1000;
    } else if (from.slice(-1) === 'h' || from.slice(-4) === 'hour' || from.slice(-5) === 'months') {
      fromMs = parseFloat(from) * 60 * 60 * 1000;
    } else if (from.slice(-1) === 'd' || from.slice(-3) === 'day' || from.slice(-4) === 'days') {
      fromMs = parseFloat(from) * 24 * 60 * 60 * 1000;
    } else if (from.slice(-1) === 'w' || from.slice(-4) === 'week' || from.slice(-5) === 'weeks') {
      fromMs = parseFloat(from) * 7 * 24 * 60 * 60 * 1000;
    } else if (from.slice(-5) === 'month' || from.slice(-6) === 'months') {
      fromMs = parseFloat(from) * 31 * 24 * 60 * 60 * 1000;
    } else if (from.slice(-1) === 'y' || from.slice(-4) === 'year' || from.slice(-5) === 'years') {
      fromMs = parseFloat(from) * 365 * 24 * 60 * 60 * 1000;
    }
  } // convert not the fromMs value to the requested format


  switch (to) {
    case 'ms':
    case 'millisecond':
    case 'milliseconds':
      return fromMs;
      break;

    case 's':
    case 'second':
    case 'seconds':
      return fromMs / 1000;
      break;

    case 'm':
    case 'minute':
    case 'minutes':
      return fromMs / 1000 / 60;
      break;

    case 'h':
    case 'hour':
    case 'hours':
      return fromMs / 1000 / 60 / 60;
      break;

    case 'd':
    case 'day':
    case 'days':
      return fromMs / 1000 / 60 / 60 / 24;
      break;

    case 'w':
    case 'week':
    case 'weeks':
      return fromMs / 1000 / 60 / 60 / 24 / 7;
      break;

    case 'month':
    case 'months':
      return fromMs / 1000 / 60 / 60 / 24 / 31;
      break;

    case 'y':
    case 'year':
    case 'years':
      return fromMs / 1000 / 60 / 60 / 24 / 365;
      break;

    default:
      throw new Error(`You tra to convert "${from}" to "${to}" but this format does not exist... The valids formats are "ms,s,m,h,d,w,month,y"...`);
      break;
  }
}

module.exports = exports.default;