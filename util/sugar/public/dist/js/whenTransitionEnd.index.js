(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["whenTransitionEnd"],{

/***/ "./src/js/dom/getStyleProperty.js":
/*!****************************************!*\
  !*** ./src/js/dom/getStyleProperty.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getStyleProperty;

var _camelize = _interopRequireDefault(__webpack_require__(/*! ../string/camelize */ "./src/js/string/camelize.js"));

var _autoCast = _interopRequireDefault(__webpack_require__(/*! ../string/autoCast */ "./src/js/string/autoCast.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @name      getStyleProperty
 * @namespace           js.dom
 * @type      Function
 *
 * Get a style property on the passed element through the computed style.
 * This function try to store the actual style to not trigger more that 1 redraw
 * each js execution loop.
 *
 * @param 		{HTMLElement} 					elm  		The element to get style from
 * @param 		{String} 						property 	The css property to get
 * @return 		{Mixed} 									The style value
 *
 * @example  	js
 * import getStyleProperty from '@coffeekraken/sugar/js/dom/getStyleProperty'
 * const opacity = getStyleProperty(myCoolHTMLElement, 'opacity');
 *
 * @see 		https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function getStyleProperty(elm, property) {
  // caching mecanisme
  setTimeout(function () {
    elm._sComputedStyle = null;
  });
  var computed = elm._sComputedStyle || window.getComputedStyle(elm);
  elm._sComputedStyle = computed;
  var prefixes = ['', 'webkit-', 'moz-', 'ms-', 'o-', 'khtml-'];

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var value = computed[(0, _camelize["default"])("".concat(prefix).concat(property))];
    if (value && value.trim() !== '') return (0, _autoCast["default"])(value);
  }

  return null;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/js/dom/getTransitionProperties.js":
/*!***********************************************!*\
  !*** ./src/js/dom/getTransitionProperties.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getTransitionProperties;

var _getStyleProperty = _interopRequireDefault(__webpack_require__(/*! ./getStyleProperty */ "./src/js/dom/getStyleProperty.js"));

var _convert = _interopRequireDefault(__webpack_require__(/*! ../time/convert */ "./src/js/time/convert.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// TODO tests

/**
 * @name      getTransitionProperties
 * @namespace           js.dom
 * @type      Function
 *
 * Get the css transition properties from an HTMLElement in an object format
 *
 * @param 		{HTMLElement} 					elm  		The element to get the properties from
 * @return 		{Object} 									The animation properties
 *
 * @example  	js
 * import getTransitionProperties from '@coffeekraken/sugar/js/dom/getTransitionProperties'
 * const props = getTransitionProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	property : ['all'],
 * // 	duration : [200],
 * // 	delay : [0],
 * // 	timingFunction : ['linear'],
 * // 	totalDuration : 200
 * // }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function splitIfNeeded(what, separator) {
  if (what.indexOf(separator) !== -1) {
    return what.split(separator).map(function (item) {
      return item.trim();
    });
  }

  return [what];
}

function getTransitionProperties(elm) {
  // get the transition properties
  var property = (0, _getStyleProperty["default"])(elm, 'transition-property');
  var duration = (0, _getStyleProperty["default"])(elm, 'transition-duration') || 0;
  var timingFunction = (0, _getStyleProperty["default"])(elm, 'transition-timing-function');
  var delay = (0, _getStyleProperty["default"])(elm, 'transition-delay'); // return the transition object

  var props = {
    property: splitIfNeeded(property, ','),
    duration: splitIfNeeded(duration, ',').map(function (value) {
      return (0, _convert["default"])(value, 'ms');
    }),
    delay: splitIfNeeded(delay, ',').map(function (value) {
      return (0, _convert["default"])(value, 'ms');
    }),
    timingFunction: splitIfNeeded(timingFunction, ',')
  };
  var totalDuration = 0;
  var i = 0;
  var delays = [0].concat(props.delay);
  [0].concat(props.duration).forEach(function (val) {
    if (val + delays[i] > totalDuration) {
      totalDuration = val + delays[i];
    }

    i++;
  });
  props.totalDuration = totalDuration;
  return props;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/js/dom/whenTransitionEnd.js":
/*!*****************************************!*\
  !*** ./src/js/dom/whenTransitionEnd.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = whenTransitionEnd;

var _getTransitionProperties = _interopRequireDefault(__webpack_require__(/*! ./getTransitionProperties */ "./src/js/dom/getTransitionProperties.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @name      whenTransitionEnd
 * @namespace           js.dom
 * @type      Function
 *
 * Monitor an HTMLElement to be notified when his transition has ended
 *
 * @param 		{HTMLElement} 				elm 		The element to monitor
 * @param 		{Function} 					[cb=null] 	An optional callback to call when the element transition has ended
 * @return 		(Promise) 								The promise that will be resolved when the element transition has ended
 *
 * @example 	js
 * import whenTransitionEnd from '@coffeekraken/sugar/js/dom/whenTransitionEnd'
 * whenTransitionEnd(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element transition has ended...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function whenTransitionEnd(elm) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return new Promise(function (resolve, reject) {
    var transition = (0, _getTransitionProperties["default"])(elm);
    setTimeout(function () {
      resolve();
      cb && cb();
    }, transition.totalDuration);
  });
}

module.exports = exports.default;

/***/ }),

/***/ "./src/js/string/autoCast.js":
/*!***********************************!*\
  !*** ./src/js/string/autoCast.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = autoCast;

/**
 * @name        autoCast
 * @namespace           js.string
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

/***/ }),

/***/ "./src/js/time/convert.js":
/*!********************************!*\
  !*** ./src/js/time/convert.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = convert;

/**
 * @name                                  convert
 * @namespace           js.time
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
function convert(from) {
  var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ms';
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
      throw new Error("You try to convert \"".concat(from, "\" to \"").concat(to, "\" but this format does not exist... The valids formats are \"ms,s,m,h,d,w,month,y\"..."));
      break;
  }
}

module.exports = exports.default;

/***/ })

}]);
//# sourceMappingURL=whenTransitionEnd.index.js.map