(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["whenOutOfViewport"],{

/***/ "./src/js/dom/closest.js":
/*!*******************************!*\
  !*** ./src/js/dom/closest.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = closest;

var _matches = _interopRequireDefault(__webpack_require__(/*! ./matches */ "./src/js/dom/matches.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  const originalElm = $elm;
  $elm = $elm.parentNode;

  while ($elm && $elm != originalElm.ownerDocument) {
    if (typeof selector === "function") {
      if (selector($elm)) return $elm;
    } else if (typeof selector === "string" && (0, _matches.default)($elm, selector)) {
      return $elm;
    }

    $elm = $elm.parentNode;
  }

  return null;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/js/dom/isInViewport.js":
/*!************************************!*\
  !*** ./src/js/dom/isInViewport.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInViewport;

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
function isInViewport(elm, offset = 50) {
  // handle offset
  let offsetTop = offset;
  let offsetRight = offset;
  let offsetBottom = offset;
  let offsetLeft = offset;

  if (typeof offset === "object") {
    offsetTop = offset.top || 0;
    offsetRight = offset.right || 0;
    offsetBottom = offset.bottom || 0;
    offsetLeft = offset.left || 0;
  }

  const containerHeight = window.innerHeight || document.documentElement.clientHeight;
  const containerWidth = window.innerWidth || document.documentElement.clientWidth;
  const rect = elm.getBoundingClientRect();
  const isTopIn = rect.top - containerHeight - offsetBottom <= 0;
  const isBottomIn = rect.bottom - offsetTop >= 0;
  const isLeftIn = rect.left - containerWidth - offsetRight <= 0;
  const isRightIn = rect.right - offsetLeft >= 0;
  return isTopIn && isBottomIn && isLeftIn && isRightIn;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/js/dom/matches.js":
/*!*******************************!*\
  !*** ./src/js/dom/matches.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = matches;

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

module.exports = exports.default;

/***/ }),

/***/ "./src/js/dom/whenOutOfViewport.js":
/*!*****************************************!*\
  !*** ./src/js/dom/whenOutOfViewport.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whenOutOfViewport;

var _isInViewport = _interopRequireDefault(__webpack_require__(/*! ./isInViewport */ "./src/js/dom/isInViewport.js"));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ../function/throttle */ "./src/js/function/throttle.js"));

var _closest = _interopRequireDefault(__webpack_require__(/*! ./closest */ "./src/js/dom/closest.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function whenOutOfViewport(elm, offset = 50) {
  return new Promise((resolve, reject) => {
    if (window.IntersectionObserver) {
      let isInViewport = false,
          _cb = () => {
        if (!isInViewport) {
          observer.disconnect();
          resolve(elm);
        }
      };

      const observer = new IntersectionObserver((entries, observer) => {
        if (!entries.length) return;
        const entry = entries[0];

        if (entry.intersectionRatio > 0) {
          isInViewport = true;
        } else {
          isInViewport = false;
        }

        _cb();
      }, {
        root: null,
        // viewport
        rootMargin: `${offset}px`,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      });
      observer.observe(elm);
    } else {
      // try to get the closest element that has an overflow
      let scrollContainerElm = document;

      if (!elm._inViewportContainer) {
        const overflowContainer = (0, _closest.default)(elm, "[data-in-viewport-container]");

        if (overflowContainer) {
          scrollContainerElm = overflowContainer;
          elm._inViewportContainer = overflowContainer;
        }
      } else {
        scrollContainerElm = elm._inViewportContainer;
      }

      let isInViewport = true,
          _cb = () => {
        if (!isInViewport) {
          scrollContainerElm.removeEventListener("scroll", checkViewport);
          window.removeEventListener("resize", checkViewport);
          resolve(elm);
        }
      };

      let checkViewport = (0, _throttle.default)(e => {
        isInViewport = (0, _isInViewport.default)(elm, offset);

        _cb();
      }, 100); // listen for resize

      scrollContainerElm.addEventListener("scroll", checkViewport);
      window.addEventListener("resize", checkViewport);
      setTimeout(() => {
        checkViewport(null);
      });
    }
  });
}

module.exports = exports.default;

/***/ }),

/***/ "./src/js/function/throttle.js":
/*!*************************************!*\
  !*** ./src/js/function/throttle.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throttle;

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

module.exports = exports.default;

/***/ })

}]);
//# sourceMappingURL=whenOutOfViewport.index.js.map