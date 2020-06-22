(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["whenAttribute"],{

/***/ "../../util/sugar/src/js/dom/observeAttributes.js":
/*!**********************************************************************************************************!*\
  !*** /Users/olivierbossel/data/web/coffeekraken/coffeekraken/util/sugar/src/js/dom/observeAttributes.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _promise_SPromise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../promise/SPromise */ "../../util/sugar/src/js/promise/SPromise.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * @name        observeAttributes
 * @namespace       sugar.js.dom
 * @type      Function
 *
 * Observe attributes on an HTMLElement and get mutations through the SPromise instance
 *
 * @param 		{HTMLElement} 					target 		The element to observe
 * @param 		{MutationObserverInit} 			settings 	The mutation observer settings
 * @return 		{SPromise} 								The SPromise throught which you can have the mutations using the "then" callback
 *
 * @example  	js
 * import observeAttributes from 'sugarcss/js/dom/observeAttributes'
 * const observer = observeAttributes(myCoolHTMLElement).then(mutation => {
 * 		// do something with the mutation
 * });
 * // cancel the observer
 * observer.cancel();
 *
 * @see 		https://developer.mozilla.org/en/docs/Web/API/MutationObserver
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

/* harmony default export */ __webpack_exports__["default"] = (function (target) {
  var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new _promise_SPromise__WEBPACK_IMPORTED_MODULE_0__["default"](function (resolve, reject, trigger, cancel) {
    // create a new observer
    var mutationObserver = new MutationObserver(function (mutations) {
      var mutedAttrs = {}; // loop on mutations

      mutations.forEach(function (mutation) {
        // push mutation
        if (!mutedAttrs[mutation.attributeName]) {
          trigger('then', mutation);
          mutedAttrs[mutation.attributeName] = true;
        }
      });
      mutedAttrs = {};
    });
    mutationObserver.observe(target, _objectSpread({
      attributes: true
    }, settings));
  }).on('cancel,finally', function () {
    mutationObserver.disconnect();
  }).start();
});
/**
 * List of attributes to observe
 * @setting
 * @name 		attributes
 * @type 		{Array}
 * @default 	null
 */

/***/ }),

/***/ "../../util/sugar/src/js/dom/whenAttribute.js":
/*!******************************************************************************************************!*\
  !*** /Users/olivierbossel/data/web/coffeekraken/coffeekraken/util/sugar/src/js/dom/whenAttribute.js ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return whenAttribute; });
/* harmony import */ var _string_autoCast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../string/autoCast */ "../../util/sugar/src/js/string/autoCast.js");
/* harmony import */ var _observeAttributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./observeAttributes */ "../../util/sugar/src/js/dom/observeAttributes.js");


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

function whenAttribute(elm, attrName) {
  var checkFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return new Promise(function (resolve, reject) {
    if (elm.hasAttribute(attrName)) {
      var value = Object(_string_autoCast__WEBPACK_IMPORTED_MODULE_0__["default"])(elm.getAttribute(attrName));

      if (checkFn && checkFn(value, value)) {
        resolve(value);
        return;
      } else if (!checkFn) {
        resolve(value);
        return;
      }
    }

    var obs = Object(_observeAttributes__WEBPACK_IMPORTED_MODULE_1__["default"])(elm).then(function (mutation) {
      if (mutation.attributeName === attrName) {
        var _value = Object(_string_autoCast__WEBPACK_IMPORTED_MODULE_0__["default"])(mutation.target.getAttribute(mutation.attributeName));

        if (checkFn && checkFn(_value, mutation.oldValue)) {
          resolve(_value);
          obs.cancel();
        } else if (!checkFn) {
          resolve(_value);
          obs.cancel();
        }
      }
    });
  });
}

/***/ }),

/***/ "../../util/sugar/src/js/string/autoCast.js":
/*!****************************************************************************************************!*\
  !*** /Users/olivierbossel/data/web/coffeekraken/coffeekraken/util/sugar/src/js/string/autoCast.js ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return autoCast; });
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

/***/ })

}]);
//# sourceMappingURL=whenAttribute.index.js.map