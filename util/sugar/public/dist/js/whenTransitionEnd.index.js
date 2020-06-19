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
exports.default = getStyleProperty;

var _camelize = _interopRequireDefault(__webpack_require__(/*! ../string/camelize */ "./src/js/string/camelize.js"));

var _autoCast = _interopRequireDefault(__webpack_require__(/*! ../string/autoCast */ "./src/js/string/autoCast.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      getStyleProperty
 * @namespace     sugar.js.dom
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
  setTimeout(() => {
    elm._sComputedStyle = null;
  });
  const computed = elm._sComputedStyle || window.getComputedStyle(elm);
  elm._sComputedStyle = computed;
  const prefixes = ["", "webkit-", "moz-", "ms-", "o-", "khtml-"];

  for (let i = 0; i < prefixes.length; i++) {
    const prefix = prefixes[i];
    const value = computed[(0, _camelize.default)(`${prefix}${property}`)];
    if (value && value.trim() !== "") return (0, _autoCast.default)(value);
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
exports.default = getTransitionProperties;

var _getStyleProperty = _interopRequireDefault(__webpack_require__(/*! ./getStyleProperty */ "./src/js/dom/getStyleProperty.js"));

var _toMs = _interopRequireDefault(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module '../string/toMs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO tests

/**
 * @name      getTransitionProperties
 * @namespace     sugar.js.dom
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
    return what.split(separator).map(item => item.trim());
  }

  return [what];
}

function getTransitionProperties(elm) {
  // get the transition properties
  const property = (0, _getStyleProperty.default)(elm, "transition-property");
  const duration = (0, _getStyleProperty.default)(elm, "transition-duration") || 0;
  const timingFunction = (0, _getStyleProperty.default)(elm, "transition-timing-function");
  const delay = (0, _getStyleProperty.default)(elm, "transition-delay"); // return the transition object

  const props = {
    property: splitIfNeeded(property, ","),
    duration: splitIfNeeded(duration, ",").map(value => (0, _toMs.default)(value)),
    delay: splitIfNeeded(delay, ",").map(value => (0, _toMs.default)(value)),
    timingFunction: splitIfNeeded(timingFunction, ",")
  };
  let totalDuration = 0;
  let i = 0;
  const delays = [0].concat(props.delay);
  [0].concat(props.duration).forEach(val => {
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
exports.default = whenTransitionEnd;

var _getTransitionProperties = _interopRequireDefault(__webpack_require__(/*! ./getTransitionProperties */ "./src/js/dom/getTransitionProperties.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      whenTransitionEnd
 * @namespace     sugar.js.dom
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
function whenTransitionEnd(elm, cb = null) {
  return new Promise((resolve, reject) => {
    const transition = (0, _getTransitionProperties.default)(elm);
    setTimeout(() => {
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
exports.default = autoCast;

/**
 * @name        autoCast
 * @namespace       sugar.js.string
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
  if (typeof string !== "string") return string; // handle the single quotes strings like '"hello world"'

  if (string.substr(0, 1) === "'" && string.substr(-1) === "'") {
    return string.substr(1, string.length - 2);
  } // number
  // before the window check cause window['0'] correspond to something


  const presumedNumber = parseFloat(string);

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
    const obj = eval(`(${string})`);
    return obj;
  } catch (e) {
    // assume that the string passed is a string
    return string;
  }
}

module.exports = exports.default;

/***/ })

}]);
//# sourceMappingURL=whenTransitionEnd.index.js.map