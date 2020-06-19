(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["whenAttribute"],{

/***/ "./src/js/dom/whenAttribute.js":
/*!*************************************!*\
  !*** ./src/js/dom/whenAttribute.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whenAttribute;

var _attributesObservable = _interopRequireDefault(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module './attributesObservable'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));

var _autoCast = _interopRequireDefault(__webpack_require__(/*! ../string/autoCast */ "./src/js/string/autoCast.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      whenAttribute
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Resolve a promise when the wanted attribute on the passed HTMLElement exist or pass the check function provided
 *
 * @param 		{HTMLElement} 				elm 				The HTMLElement on which to monitor the property
 * @param 		{String} 					attribute 			The attribute to monitor
 * @param 		{Function} 					[checkFn=null] 		An optional function to check the attribute. The promise is resolved when this function return true
 * @return 		(Promise) 										The promise that will be resolved when the attribute exist on the element (and that it passes the checkFn)
 *
 * @example 	js
 * import whenAttribute from '@coffeekraken/sugar/js/dom/whenAttribute'
 * whenAttribute(myCoolHTMLElement, 'value').then((value) => {
 * 		// the value attribute exist on the element
 * });
 * // with a checkFn
 * whenAttribute(myCoolHTMLElement, 'value', (newVal, oldVal) => {
 * 		// make sure the value is a number
 * 		return typeof(newVal) === 'number';
 * }).then((value) => {
 * 		// do something with your number value...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function whenAttribute(elm, attrName, checkFn = null) {
  return new Promise((resolve, reject) => {
    if (elm.hasAttribute(attrName)) {
      const value = (0, _autoCast.default)(elm.getAttribute(attrName));

      if (checkFn && checkFn(value, value)) {
        resolve(value);
        return;
      } else if (!checkFn) {
        resolve(value);
        return;
      }
    }

    const obs = (0, _attributesObservable.default)(elm).subscribe(mutation => {
      if (mutation.attributeName === attrName) {
        const value = (0, _autoCast.default)(mutation.target.getAttribute(mutation.attributeName));

        if (checkFn && checkFn(value, mutation.oldValue)) {
          resolve(value);
          obs.unsubscribe();
        } else if (!checkFn) {
          resolve(value);
          obs.unsubscribe();
        }
      }
    });
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
//# sourceMappingURL=whenAttribute.index.js.map