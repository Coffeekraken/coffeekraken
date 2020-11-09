import { c as createCommonjsModule } from './deepMerge-7574b276.js';

var convert_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @name                                  convert
 * @namespace           sugar.js.time
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
function convert(from, to) {
  if (to === void 0) {
    to = 'ms';
  }

  // init the fromMs variable
  var fromMs = from; // check if the time is a string to convert it to ms

  if (typeof from === 'string') {
    var fromNumber = parseFloat(from);
    var fromLength = fromNumber.toString().length;
    var fromString = from.slice(fromLength);

    if (fromString === 'ms' || fromString === 'millisecond' || fromString === 'milliseconds') {
      fromMs = fromNumber;
    } else if (fromString === 's' || fromString === 'second' || fromString === 'seconds') {
      fromMs = fromNumber * 1000;
    } else if (fromString === 'm' || fromString === 'minute' || fromString === 'minutes') {
      fromMs = fromNumber * 60 * 1000;
    } else if (fromString === 'h' || fromString === 'hour' || fromString === 'months') {
      fromMs = fromNumber * 60 * 60 * 1000;
    } else if (fromString === 'd' || fromString === 'day' || fromString === 'days') {
      fromMs = fromNumber * 24 * 60 * 60 * 1000;
    } else if (fromString === 'w' || fromString === 'week' || fromString === 'weeks') {
      fromMs = fromNumber * 7 * 24 * 60 * 60 * 1000;
    } else if (fromString === 'month' || fromString === 'months') {
      fromMs = fromNumber * 31 * 24 * 60 * 60 * 1000;
    } else if (fromString === 'y' || fromString === 'year' || fromString === 'years') {
      fromMs = fromNumber * 365 * 24 * 60 * 60 * 1000;
    }
  } // convert not the fromMs value to the requested format


  switch (to) {
    case 'ms':
    case 'millisecond':
    case 'milliseconds':
      return fromMs;

    case 's':
    case 'second':
    case 'seconds':
      return fromMs / 1000;

    case 'm':
    case 'minute':
    case 'minutes':
      return fromMs / 1000 / 60;

    case 'h':
    case 'hour':
    case 'hours':
      return fromMs / 1000 / 60 / 60;

    case 'd':
    case 'day':
    case 'days':
      return fromMs / 1000 / 60 / 60 / 24;

    case 'w':
    case 'week':
    case 'weeks':
      return fromMs / 1000 / 60 / 60 / 24 / 7;

    case 'month':
    case 'months':
      return fromMs / 1000 / 60 / 60 / 24 / 31;

    case 'y':
    case 'year':
    case 'years':
      return fromMs / 1000 / 60 / 60 / 24 / 365;

    default:
      throw new Error("You try to convert \"".concat(from, "\" to \"").concat(to, "\" but this format does not exist... The valids formats are \"ms,s,m,h,d,w,month,y\"..."));
  }
}

convert.MILLISECOND = 'ms';
convert.SECOND = 's';
convert.MINUTE = 'm';
convert.HOUR = 'h';
convert.DAY = 'd';
convert.WEEK = 'w';
convert.MONTH = 'month';
convert.YEAR = 'y';
var _default = convert;
exports.default = _default;
module.exports = exports.default;
});

var autoCast_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = autoCast;

/**
 * @name        autoCast
 * @namespace           sugar.js.string
 * @type      Function
 *
 * Auto cast the string into the correct variable type
 *
 * @param    {String}    string    The string to auto cast
 * @return    {Mixed}    The casted value
 *
 * @example    js
 * import autoCast from '@coffeekraken/sugar/js/strings/autoCast'
 * autoCast('12') // => 12
 * autoCast('window.HTMLElement') // => HTMLElement
 * autoCast('{"hello":"world"}') // {hello:'world'}
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function autoCast(string) {
  // if the passed string is not a string, return the value
  if (typeof string !== 'string') return string; // handle the single quotes strings like '"hello world"'

  if (string.substr(0, 1) === "'" && string.substr(-1) === "'") {
    return string.substr(1, string.length - 2);
  } // number
  // before the window check cause window['0'] correspond to something


  var presumedNumber = parseFloat(string);

  if (!isNaN(presumedNumber)) {
    if (presumedNumber.toString() === string) {
      return presumedNumber;
    }
  } // avoid getting item from the window object


  if (window[string]) {
    return string;
  } // try to eval the passed string
  // if no exception, mean that it's a valid
  // js variable type


  try {
    var obj = eval("(".concat(string, ")"));
    return obj;
  } catch (e) {
    // assume that the string passed is a string
    return string;
  }
}

module.exports = exports.default;
});

export { autoCast_1 as a, convert_1 as c };
