(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["whenOutOfViewport"],{

/***/ "../../util/sugar/src/js/dom/closest.js":
/*!************************************************************************************************!*\
  !*** /Users/olivierbossel/data/web/coffeekraken/coffeekraken/util/sugar/src/js/dom/closest.js ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return closest; });
/* harmony import */ var _matches__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./matches */ "../../util/sugar/src/js/dom/matches.js");

/**
 * @name        closest
 * @namespace       sugar.js.dom
 * @type      Function
 *
 * Go up the dom three to find the first element that matches the passed selector
 *
 * @param 		{HTMLElement} 					$elm  		The element to start on
 * @param 		{String|Function} 				selector 	A css selector to search for or a check function that will be used
 * @return 		{HTMLElement} 								The element found or null
 *
 * @example  	js
 * import closest from '@coffeekraken/sugar/js/dom/closest'
 * const closestElm = closest(myCoolElement, '.my-cool-class');
 * if (closestElm) {
 * 		// we have found en element that matches the selector
 * }
 * // the selector param can be a function that need to return either true or false like so:
 * closest(myCoolElement, (elm) => {
 *   return elm.hasAttribute('my-cool-attribute')
 * })
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function closest($elm, selector) {
  var originalElm = $elm;
  $elm = $elm.parentNode;

  while ($elm && $elm != originalElm.ownerDocument) {
    if (typeof selector === "function") {
      if (selector($elm)) return $elm;
    } else if (typeof selector === "string" && Object(_matches__WEBPACK_IMPORTED_MODULE_0__["default"])($elm, selector)) {
      return $elm;
    }

    $elm = $elm.parentNode;
  }

  return null;
}

/***/ }),

/***/ "../../util/sugar/src/js/dom/isInViewport.js":
/*!*****************************************************************************************************!*\
  !*** /Users/olivierbossel/data/web/coffeekraken/coffeekraken/util/sugar/src/js/dom/isInViewport.js ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isInViewport; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// TODO tests

/**
 * @name      isInViewport
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Check if the passed HTMLElement is in the viewport or not
 *
 * @param 		{HTMLElement} 				elm  			The element to insert
 * @param 		{Object} 					[offset=50] 	An object of top, right, bottom and left offset used to detect the status or an object with top, right, bottom and left offsets
 * @return 		{Boolean}									If the element is in the viewport or not
 *
 * @example  	js
 * import isInViewport from '@coffeekraken/sugar/js/dom/isInViewport'
 * if (isInViewport(myCoolHTMLElement) {
 * 		// i'm in the viewport
 * }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isInViewport(elm) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  // handle offset
  var offsetTop = offset;
  var offsetRight = offset;
  var offsetBottom = offset;
  var offsetLeft = offset;

  if (_typeof(offset) === "object") {
    offsetTop = offset.top || 0;
    offsetRight = offset.right || 0;
    offsetBottom = offset.bottom || 0;
    offsetLeft = offset.left || 0;
  }

  var containerHeight = window.innerHeight || document.documentElement.clientHeight;
  var containerWidth = window.innerWidth || document.documentElement.clientWidth;
  var rect = elm.getBoundingClientRect();
  var isTopIn = rect.top - containerHeight - offsetBottom <= 0;
  var isBottomIn = rect.bottom - offsetTop >= 0;
  var isLeftIn = rect.left - containerWidth - offsetRight <= 0;
  var isRightIn = rect.right - offsetLeft >= 0;
  return isTopIn && isBottomIn && isLeftIn && isRightIn;
}

/***/ }),

/***/ "../../util/sugar/src/js/dom/matches.js":
/*!************************************************************************************************!*\
  !*** /Users/olivierbossel/data/web/coffeekraken/coffeekraken/util/sugar/src/js/dom/matches.js ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return matches; });
/**
 * @name      matches
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Polyfill for the Element.matches function
 *
 * @param 		{HTMLElement} 			elm  			The element to check
 * @param 		{String} 				selector 		The selector to check on the element
 * @return 		{Boolean} 								If the element match the selector or not
 *
 * @example  	js
 * import matches from '@coffeekraken/sugar/js/dom/matches'
 * if (matches(myCoolHTMLElement, '.my-cool-css-selector')) {
 * 		// the element match the selector
 * }
 *
 * @see 		https://developer.mozilla.org/en/docs/Web/API/Element/matches
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function matches(el, selector) {
  if (el.nodeName == "#comment" || el.nodeName == "#text") {
    return false;
  }

  var p = Element.prototype;

  var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {
    return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
  };

  return f.call(el, selector);
}

/***/ }),

/***/ "../../util/sugar/src/js/dom/whenOutOfViewport.js":
/*!**********************************************************************************************************!*\
  !*** /Users/olivierbossel/data/web/coffeekraken/coffeekraken/util/sugar/src/js/dom/whenOutOfViewport.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return whenOutOfViewport; });
/* harmony import */ var _isInViewport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isInViewport */ "../../util/sugar/src/js/dom/isInViewport.js");
/* harmony import */ var _function_throttle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../function/throttle */ "../../util/sugar/src/js/function/throttle.js");
/* harmony import */ var _closest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./closest */ "../../util/sugar/src/js/dom/closest.js");


 // TODO tests

/**
 * @name      whenOutOfViewport
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Monitor an HTMLElement to be notified when it exit the viewport
 *
 * @param 		{HTMLElement} 				elm 				The element to monitor
 * @param 		{Number} 					[offset=50] 		An offset that represent the distance before entering the viewport for the detection
 * @return 		(Promise) 										The promise that will be resolved when the element exit the viewport
 *
 * @example 	js
 * import whenOutOfViewport from '@coffeekraken/sugar/js/dom/whenOutOfViewport'
 * whenOutOfViewport(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that has exit the viewport...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function whenOutOfViewport(elm) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  return new Promise(function (resolve, reject) {
    if (window.IntersectionObserver) {
      var isInViewport = false,
          _cb = function _cb() {
        if (!isInViewport) {
          observer.disconnect();
          resolve(elm);
        }
      };

      var observer = new IntersectionObserver(function (entries, observer) {
        if (!entries.length) return;
        var entry = entries[0];

        if (entry.intersectionRatio > 0) {
          isInViewport = true;
        } else {
          isInViewport = false;
        }

        _cb();
      }, {
        root: null,
        // viewport
        rootMargin: "".concat(offset, "px"),
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      });
      observer.observe(elm);
    } else {
      // try to get the closest element that has an overflow
      var scrollContainerElm = document;

      if (!elm._inViewportContainer) {
        var overflowContainer = Object(_closest__WEBPACK_IMPORTED_MODULE_2__["default"])(elm, "[data-in-viewport-container]");

        if (overflowContainer) {
          scrollContainerElm = overflowContainer;
          elm._inViewportContainer = overflowContainer;
        }
      } else {
        scrollContainerElm = elm._inViewportContainer;
      }

      var _isInViewport = true,
          _cb2 = function _cb2() {
        if (!_isInViewport) {
          scrollContainerElm.removeEventListener("scroll", checkViewport);
          window.removeEventListener("resize", checkViewport);
          resolve(elm);
        }
      };

      var checkViewport = Object(_function_throttle__WEBPACK_IMPORTED_MODULE_1__["default"])(function (e) {
        _isInViewport = Object(_isInViewport__WEBPACK_IMPORTED_MODULE_0__["default"])(elm, offset);

        _cb2();
      }, 100); // listen for resize


      scrollContainerElm.addEventListener("scroll", checkViewport);
      window.addEventListener("resize", checkViewport);
      setTimeout(function () {
        checkViewport(null);
      });
    }
  });
}

/***/ }),

/***/ "../../util/sugar/src/js/function/throttle.js":
/*!******************************************************************************************************!*\
  !*** /Users/olivierbossel/data/web/coffeekraken/coffeekraken/util/sugar/src/js/function/throttle.js ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return throttle; });
/**
 * @name        throttle
 * @namespace       sugar.js.function
 * @type      Function
 *
 * This utils function allows you to make sure that a function that will normally be called
 * several times, for example during a scroll event, to be called once each threshhold time
 *
 * @example 		js
 * import throttle from '@coffeekraken/sugar/js/function/throttle';
 * const myThrottledFn = throttle(() => {
 * 		// my function content that will be
 * 		// executed only once each second
 * }, 1000);
 *
 * document.addEventListener('scroll', (e) => {
 * 		// call my throttled function
 * 		myThrottledFn();
 * });
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function throttle(fn, threshhold) {
  threshhold || (threshhold = 250);
  var last;
  return function () {
    var context = this;
    var now = new Date(),
        args = arguments;

    if (!last || last <= now - threshhold) {
      last = now;
      fn.apply(context, args);
    }
  };
}

/***/ })

}]);
//# sourceMappingURL=whenOutOfViewport.index.js.map