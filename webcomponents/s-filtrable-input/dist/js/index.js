/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../util/sugar/js/dom/closest.js":
/*!********************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/dom/closest.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = closest;

var _matches = _interopRequireDefault(__webpack_require__(/*! ./matches */ "../../util/sugar/js/dom/matches.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @name        closest
 * @namespace           js.dom
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
    if (typeof selector === 'function') {
      if (selector($elm)) return $elm;
    } else if (typeof selector === 'string' && (0, _matches.default)($elm, selector)) {
      return $elm;
    }

    $elm = $elm.parentNode;
  }

  return null;
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/dom/closestNotVisible.js":
/*!******************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/dom/closestNotVisible.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = closestNotVisible;

var _isVisible = _interopRequireDefault(__webpack_require__(/*! ./isVisible */ "../../util/sugar/js/dom/isVisible.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @name        closestNotVisible
 * @namespace           js.dom
 * @type      Function
 *
 * Go up the dom three to find the first element that is not visible.
 * Not visible mean that has either an opacity to 0, a visibility to hidden or a display to none
 *
 * @param 		{HTMLElement} 					elm  		The element to start on
 * @return 		{HTMLElement} 								The element found or null
 *
 * @example  	js
 * import closestNotVisible from 'sugarcss/js/dom/closestNotVisible'
 * const closestElm = closestNotVisible(myCoolElement);
 * if (closestElm) {
 * 		// we have found en element that is not visible
 * }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


function closestNotVisible(elm) {
  var originalElm = elm;
  elm = elm.parentNode;

  while (elm && elm != originalElm.ownerDocument) {
    if (!(0, _isVisible.default)(elm)) {
      return elm;
    }

    elm = elm.parentNode;
  }

  return null;
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/dom/getStyleProperty.js":
/*!*****************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/dom/getStyleProperty.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getStyleProperty;

var _camelize = _interopRequireDefault(__webpack_require__(/*! ../string/camelize */ "../../util/sugar/js/string/camelize.js"));

var _autoCast = _interopRequireDefault(__webpack_require__(/*! ../string/autoCast */ "../../util/sugar/js/string/autoCast.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
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
  setTimeout(() => {
    elm._sComputedStyle = null;
  });
  var computed = elm._sComputedStyle || window.getComputedStyle(elm);
  elm._sComputedStyle = computed;
  var prefixes = ['', 'webkit-', 'moz-', 'ms-', 'o-', 'khtml-'];

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var value = computed[(0, _camelize.default)("".concat(prefix).concat(property))];
    if (value && value.trim() !== '') return (0, _autoCast.default)(value);
  }

  return null;
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/dom/getTransitionProperties.js":
/*!************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/dom/getTransitionProperties.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTransitionProperties;

var _getStyleProperty = _interopRequireDefault(__webpack_require__(/*! ./getStyleProperty */ "../../util/sugar/js/dom/getStyleProperty.js"));

var _convert = _interopRequireDefault(__webpack_require__(/*! ../time/convert */ "../../util/sugar/js/time/convert.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // TODO tests

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
    return what.split(separator).map(item => item.trim());
  }

  return [what];
}

function getTransitionProperties(elm) {
  // get the transition properties
  var property = (0, _getStyleProperty.default)(elm, 'transition-property');
  var duration = (0, _getStyleProperty.default)(elm, 'transition-duration') || 0;
  var timingFunction = (0, _getStyleProperty.default)(elm, 'transition-timing-function');
  var delay = (0, _getStyleProperty.default)(elm, 'transition-delay'); // return the transition object

  var props = {
    property: splitIfNeeded(property, ','),
    duration: splitIfNeeded(duration, ',').map(value => (0, _convert.default)(value, 'ms')),
    delay: splitIfNeeded(delay, ',').map(value => (0, _convert.default)(value, 'ms')),
    timingFunction: splitIfNeeded(timingFunction, ',')
  };
  var totalDuration = 0;
  var i = 0;
  var delays = [0].concat(props.delay);
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

/***/ "../../util/sugar/js/dom/isInViewport.js":
/*!*************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/dom/isInViewport.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInViewport; // TODO tests

/**
 * @name      isInViewport
 * @namespace           js.dom
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

  if (typeof offset === 'object') {
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

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/dom/isVisible.js":
/*!**********************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/dom/isVisible.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isVisible;
/**
 * @name      isVisible
 * @namespace           js.dom
 * @type      Function
 *
 * Check if the passed HTMLElement is visible or not.
 * Visible mean that it has not an opacity of 0, not a visibility of hidden and not a display of none
 *
 * @param 		{HTMLElement} 				elm  		The element to check
 * @return 		{Boolean}								If the element is visible or not
 *
 * @example  	js
 * import isVisible from '@coffeekraken/sugar/js/dom/isVisible'
 * if (isVisible(myCoolHTMLElement) {
 * 		// i'm visible
 * }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function isVisible(elm) {
  // assume that the script tag is always visible
  if (elm.nodeName.toLowerCase() === 'script') return true; // get style

  var style = window.getComputedStyle(elm, null),
      opacity = style['opacity'],
      visibility = style['visibility'],
      display = style['display'];
  return '0' !== opacity && 'none' !== display && 'hidden' !== visibility;
}

window.__isVisible = isVisible;
module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/dom/matches.js":
/*!********************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/dom/matches.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = matches;
/**
 * @name      matches
 * @namespace           js.dom
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
  if (el.nodeName == '#comment' || el.nodeName == '#text') {
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

/***/ "../../util/sugar/js/dom/observeAttributes.js":
/*!******************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/dom/observeAttributes.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _SPromise = _interopRequireDefault(__webpack_require__(/*! ../promise/SPromise */ "../../util/sugar/js/promise/SPromise.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @name        observeAttributes
 * @namespace           js.dom
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


function _default(target) {
  var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new _SPromise.default((resolve, reject, trigger, cancel) => {
    // create a new observer
    var mutationObserver = new MutationObserver(mutations => {
      var mutedAttrs = {}; // loop on mutations

      mutations.forEach(mutation => {
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
  }).on('cancel,finally', () => {
    mutationObserver.disconnect();
  }).start();
}
/**
 * List of attributes to observe
 * @setting
 * @name 		attributes
 * @type 		{Array}
 * @default 	null
 */


module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/dom/when.js":
/*!*****************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/dom/when.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = when;

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/**
 * @name                              when
 * @namespace           js.dom
 * @type                              Function
 *
 * Return a promise that will be resolved when the wanted status has been applied on the passed HTMLElement.
 * The status that can be requested are:
 * - attribute : Detect when a special attribute has been applied on the element
 * --- settings.attribute : Specify the attribute to check
 * --- settings.checkFn : An optional function to check the attribute. The promise is resolved when this function return true
 *
 * - inViewport : Detect when the element enter in the viewport
 * --- settings.offset : Specify an offset to detect the in viewport state
 *
 * - outOfViewport : Detect when the element exit the viewport
 * --- settings.offset : Specify an offset to detect the out viewport state
 *
 * - transitionEnd : Detect when the css transition is finished on the element
 * --- settings.callback : An optional callback function if you prefer instead of the promise
 *
 * - visible : Detect when the element become visible
 * --- settings.callback : An optional callback function if you prefer instead of the promise
 *
 * @param               {HTMLElement}                 $node               The HTMLElement to check
 * @param               {String}                      state               The state to check on the HTMLElement
 * @param               {Object}                      [settings={}]       The settings to configure the check process
 * @return              {Promise}                                         A promise that will be resolved when the state is detected
 *
 * @example             js
 * import when from '@coffeekraken/sugar/js/dom/when';
 * when(myCoolNode, 'inViewport').then(() => {
 *    // do something...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


function when($node, state) {
  var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (resolve, reject) {
      // check the state to detect
      var importPromise, args;

      switch (state) {
        case 'attribute':
          importPromise = Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__(/*! ./whenAttribute */ "../../util/sugar/js/dom/whenAttribute.js")));
          args = [$node, settings.attribute, settings.checkFn];
          break;

        case 'inViewport':
          importPromise = Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__(/*! ./whenInViewport */ "../../util/sugar/js/dom/whenInViewport.js")));
          args = [$node, settings.offset];
          break;

        case 'outOfViewport':
          importPromise = Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__(/*! ./whenOutOfViewport */ "../../util/sugar/js/dom/whenOutOfViewport.js")));
          args = [$node, settings.offset];
          break;

        case 'transitionEnd':
          importPromise = Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__(/*! ./whenTransitionEnd */ "../../util/sugar/js/dom/whenTransitionEnd.js")));
          args = [$node, settings.callback];
          break;

        case 'visible':
          importPromise = Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__(/*! ./whenVisible */ "../../util/sugar/js/dom/whenVisible.js")));
          args = [$node, settings.callback];
          break;

        default:
          resolve($node);
          return;
          break;
      } // wait until the module is loaded


      var module = yield importPromise; // call the when... function

      module.default.apply(null, args).then(() => {
        // resolve the promise
        resolve($node);
      });
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/dom/whenAttribute.js":
/*!**************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/dom/whenAttribute.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whenAttribute;

var _autoCast = _interopRequireDefault(__webpack_require__(/*! ../string/autoCast */ "../../util/sugar/js/string/autoCast.js"));

var _observeAttributes = _interopRequireDefault(__webpack_require__(/*! ./observeAttributes */ "../../util/sugar/js/dom/observeAttributes.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @name      whenAttribute
 * @namespace           js.dom
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
  return new Promise((resolve, reject) => {
    if (elm.hasAttribute(attrName)) {
      var value = (0, _autoCast.default)(elm.getAttribute(attrName));

      if (checkFn && checkFn(value, value)) {
        resolve(value);
        return;
      } else if (!checkFn) {
        resolve(value);
        return;
      }
    }

    var obs = (0, _observeAttributes.default)(elm).then(mutation => {
      if (mutation.attributeName === attrName) {
        var _value = (0, _autoCast.default)(mutation.target.getAttribute(mutation.attributeName));

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

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/dom/whenInViewport.js":
/*!***************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/dom/whenInViewport.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whenInViewport;

var _inViewport = _interopRequireDefault(__webpack_require__(/*! in-viewport */ "../../util/sugar/node_modules/in-viewport/in-viewport.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @name      whenInViewport
 * @namespace           js.dom
 * @type      Function
 *
 * Monitor an HTMLElement to be notified when it is in the viewport
 *
 * @param 		{HTMLElement} 				elm 					The element to monitor
 * @param 		{Number} 					[offset=50] 			An offset that represent the distance before entering the viewport for the detection
 * @return 		(Promise) 											The promise that will be resolved when the element is in the viewport
 *
 * @example 	js
 * import whenInViewport from '@coffeekraken/sugar/js/dom/whenInViewport'
 * whenInViewport(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that has entered the viewport...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


function whenInViewport(elm) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  return new Promise((resolve, reject) => {
    (0, _inViewport.default)(elm, {
      offset: offset
    }, () => {
      resolve(elm);
    });
  });
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/dom/whenOutOfViewport.js":
/*!******************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/dom/whenOutOfViewport.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whenOutOfViewport;

var _isInViewport = _interopRequireDefault(__webpack_require__(/*! ./isInViewport */ "../../util/sugar/js/dom/isInViewport.js"));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ../function/throttle */ "../../util/sugar/js/function/throttle.js"));

var _closest = _interopRequireDefault(__webpack_require__(/*! ./closest */ "../../util/sugar/js/dom/closest.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // TODO tests

/**
 * @name      whenOutOfViewport
 * @namespace           js.dom
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
  return new Promise((resolve, reject) => {
    if (window.IntersectionObserver) {
      var isInViewport = false,
          _cb = () => {
        if (!isInViewport) {
          observer.disconnect();
          resolve(elm);
        }
      };

      var observer = new IntersectionObserver((entries, observer) => {
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
        var overflowContainer = (0, _closest.default)(elm, '[data-in-viewport-container]');

        if (overflowContainer) {
          scrollContainerElm = overflowContainer;
          elm._inViewportContainer = overflowContainer;
        }
      } else {
        scrollContainerElm = elm._inViewportContainer;
      }

      var _isInViewport2 = true,
          _cb2 = () => {
        if (!_isInViewport2) {
          scrollContainerElm.removeEventListener('scroll', checkViewport);
          window.removeEventListener('resize', checkViewport);
          resolve(elm);
        }
      };

      var checkViewport = (0, _throttle.default)(e => {
        _isInViewport2 = (0, _isInViewport.default)(elm, offset);

        _cb2();
      }, 100); // listen for resize

      scrollContainerElm.addEventListener('scroll', checkViewport);
      window.addEventListener('resize', checkViewport);
      setTimeout(() => {
        checkViewport(null);
      });
    }
  });
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/dom/whenTransitionEnd.js":
/*!******************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/dom/whenTransitionEnd.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whenTransitionEnd;

var _getTransitionProperties = _interopRequireDefault(__webpack_require__(/*! ./getTransitionProperties */ "../../util/sugar/js/dom/getTransitionProperties.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
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
  return new Promise((resolve, reject) => {
    var transition = (0, _getTransitionProperties.default)(elm);
    setTimeout(() => {
      resolve();
      cb && cb();
    }, transition.totalDuration);
  });
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/dom/whenVisible.js":
/*!************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/dom/whenVisible.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whenVisible;

var _isVisible = _interopRequireDefault(__webpack_require__(/*! ./isVisible */ "../../util/sugar/js/dom/isVisible.js"));

var _closestNotVisible = _interopRequireDefault(__webpack_require__(/*! ./closestNotVisible */ "../../util/sugar/js/dom/closestNotVisible.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @name      whenVisible
 * @namespace           js.dom
 * @type      Function
 *
 * Monitor an HTMLElement to be notified when it is visible
 *
 * @param 		{HTMLElement} 				elm 		The element to monitor
 * @param 		{Function} 					[cb=null] 	An optional callback to call when the element is visible
 * @return 		(Promise) 								The promise that will be resolved when the element is visible
 *
 * @example 	js
 * import whenVisible from '@coffeekraken/sugar/js/dom/whenVisible'
 * whenVisible(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that is now visible
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


function whenVisible(elm) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return new Promise((resolve, reject) => {
    // variables
    var isSelfVisible = false,
        areParentsVisible = false,
        closestNotVisible = null,
        selfObserver = null,
        parentObserver = null;

    var _cb = () => {
      if (isSelfVisible && areParentsVisible) {
        // process callbacks
        if (cb) cb(elm);
        resolve(elm); // remove the event listeners

        elm.removeEventListener('transitionend', _eventCb);
        elm.removeEventListener('animationstart', _eventCb);
        elm.removeEventListener('animationend', _eventCb); // remove the event listeners

        if (closestNotVisible) {
          closestNotVisible.removeEventListener('transitionend', _eventCb);
          closestNotVisible.removeEventListener('animationstart', _eventCb);
          closestNotVisible.removeEventListener('animationend', _eventCb);
        }
      }
    }; // function called on each transitionend, start, etc...


    var _eventCb = e => {
      // wait just a little time to check again
      setTimeout(() => {
        if (e.target === elm) {
          if ((0, _isVisible.default)(elm)) {
            isSelfVisible = true;

            if (selfObserver && selfObserver.disconnect) {
              selfObserver.disconnect();
            } // remove the event listeners


            elm.removeEventListener('transitionend', _eventCb);
            elm.removeEventListener('animationstart', _eventCb);
            elm.removeEventListener('animationend', _eventCb);
          }
        } else if (e.target === closestNotVisible) {
          if ((0, _isVisible.default)(closestNotVisible)) {
            areParentsVisible = true;

            if (parentObserver && parentObserver.disconnect) {
              parentObserver.disconnect();
            } // remove the event listeners


            closestNotVisible.removeEventListener('transitionend', _eventCb);
            closestNotVisible.removeEventListener('animationstart', _eventCb);
            closestNotVisible.removeEventListener('animationend', _eventCb);
          }
        } // callback


        _cb();
      });
    }; // check if element itself is not visible


    if (!(0, _isVisible.default)(elm)) {
      selfObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          // check that is the style whos changed
          if (mutation.attributeName === 'style' || mutation.attributeName === 'class') {
            // check if is visible
            if ((0, _isVisible.default)(mutation.target)) {
              // update
              isSelfVisible = true; // callback

              _cb(); // stop observe


              selfObserver.disconnect();
            }
          }
        });
      });
      selfObserver.observe(elm, {
        attributes: true
      }); // listen for animationstart to check if the element is visible

      elm.addEventListener('animationstart', _eventCb);
      elm.addEventListener('animationend', _eventCb);
      elm.addEventListener('transitionend', _eventCb);
    } else {
      isSelfVisible = true;
    } // get the closest not visible element
    // if found, we monitor it to check when it is visible


    closestNotVisible = (0, _closestNotVisible.default)(elm);

    if (closestNotVisible) {
      parentObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          // check that is the style whos changed
          if (mutation.attributeName === 'style' || mutation.attributeName === 'class') {
            // check if is visible
            if ((0, _isVisible.default)(mutation.target)) {
              // update
              areParentsVisible = true; // callback

              _cb(); // stop observe


              parentObserver.disconnect();
            }
          }
        });
      });
      parentObserver.observe(closestNotVisible, {
        attributes: true
      }); // listen for animationstart to check if the element is visible

      closestNotVisible.addEventListener('animationstart', _eventCb);
      closestNotVisible.addEventListener('animationend', _eventCb);
      closestNotVisible.addEventListener('transitionend', _eventCb);
    } else {
      areParentsVisible = true;
    } // callback


    _cb();
  });
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/function/throttle.js":
/*!**************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/function/throttle.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throttle;
/**
 * @name        throttle
 * @namespace           js.function
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

/***/ }),

/***/ "../../util/sugar/js/html/getHtmlClassFromTagName.js":
/*!*************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/html/getHtmlClassFromTagName.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getHtmlClassFromTagName;

var _upperFirst = _interopRequireDefault(__webpack_require__(/*! ../string/upperFirst */ "../../util/sugar/js/string/upperFirst.js"));

var _htmlTagToHtmlClassMap = _interopRequireDefault(__webpack_require__(/*! ./htmlTagToHtmlClassMap */ "../../util/sugar/js/html/htmlTagToHtmlClassMap.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @name            getHtmlClassFromTagName
 * @namespace       sugar.js.html
 * @type            Function
 *
 * This function simply return the HTML{name}Element class depending on the passed
 * tag name like "p", "input", "textarea", etc...
 *
 * @param       {String}      tagName       The tagName to get the class for
 * @return      {HTMLElement}               The HTMLElement class that correspond to the requested tag name
 *
 * @example       js
 * import getHtmlClassFromTagName from '@coffeekraken/sugar/js/html/getHtmlClassFromTagName';
 * getHtmlClassFromTagName('a'); // => HTMLAnchorElement
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


function getHtmlClassFromTagName(tagName) {
  if (!tagName) return HTMLElement;
  var tagNameUpperFirst = (0, _upperFirst.default)(tagName);
  if (window["HTML".concat(tagNameUpperFirst, "Element")]) return window["HTML".concat(tagNameUpperFirst, "Element")];
  if (_htmlTagToHtmlClassMap.default[tagName]) return _htmlTagToHtmlClassMap.default[tagName];
  return HTMLElement;
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/html/htmlTagToHtmlClassMap.js":
/*!***********************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/html/htmlTagToHtmlClassMap.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @name            HtmlTagToHtmlClassMap
 * @namespace       js.html
 * @type            Object
 *
 * This export an object mapping the HTML tag name to his corresponding HTML class (object not css class)
 *
 * @example       js
 * import HtmlTagToHtmlClassMap from '@coffeekraken/sugar/js/html/HtmlTagToHtmlClassMap';
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

module.exports = {
  a: HTMLAnchorElement,
  audio: HTMLAudioElement,
  body: HTMLBodyElement,
  button: HTMLButtonElement,
  canvas: HTMLCanvasElement,
  dl: HTMLDListElement,
  data: HTMLDataElement,
  datalist: HTMLDataListElement,
  details: HTMLDetailsElement,
  dialog: HTMLDialogElement,
  dir: HTMLDirectoryElement,
  div: HTMLDivElement,
  html: HTMLDocument,
  embed: HTMLEmbedElement,
  fieldset: HTMLFieldSetElement,
  font: HTMLFontElement,
  form: HTMLFormElement,
  frame: HTMLFrameElement,
  head: HTMLHeadElement,
  html: HTMLHtmlElement,
  iframe: HTMLIFrameElement,
  img: HTMLImageElement,
  input: HTMLInputElement,
  label: HTMLLabelElement,
  legend: HTMLLegendElement,
  link: HTMLLinkElement,
  map: HTMLMapElement,
  marquee: HTMLMarqueeElement,
  media: HTMLMediaElement,
  menu: HTMLMenuElement,
  meta: HTMLMetaElement,
  meter: HTMLMeterElement,
  del: HTMLModElement,
  ins: HTMLModElement,
  dol: HTMLOListElement,
  object: HTMLObjectElement,
  optgroup: HTMLOptGroupElement,
  option: HTMLOptionElement,
  output: HTMLOutputElement,
  p: HTMLParagraphElement,
  param: HTMLParamElement,
  picture: HTMLPictureElement,
  pre: HTMLPreElement,
  progress: HTMLProgressElement,
  quote: HTMLQuoteElement,
  script: HTMLScriptElement,
  select: HTMLSelectElement,
  slot: HTMLSlotElement,
  source: HTMLSourceElement,
  span: HTMLSpanElement,
  style: HTMLStyleElement,
  td: HTMLTableCellElement,
  th: HTMLTableCellElement,
  col: HTMLTableColElement,
  colgroup: HTMLTableColElement,
  table: HTMLTableElement,
  tr: HTMLTableRowElement,
  tfoot: HTMLTableSectionElement,
  thead: HTMLTableSectionElement,
  tbody: HTMLTableSectionElement,
  template: HTMLTemplateElement,
  textarea: HTMLTextAreaElement,
  time: HTMLTimeElement,
  title: HTMLTitleElement,
  track: HTMLTrackElement,
  ul: HTMLUListElement,
  video: HTMLVideoElement,
  area: HTMLAreaElement
};

/***/ }),

/***/ "../../util/sugar/js/is/array.js":
/*!*****************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/is/array.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isArray;
/**
 * @name        isArray
 * @namespace           js.is
 * @type      Function
 *
 * Check if the passed value is a js Array
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Array, false if not
 *
 * @example    js
 * import isArray from '@coffeekraken/sugar/js/is/array'
 * if (isArray([]) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function isArray(value) {
  return value && typeof value === 'object' && value.constructor === Array;
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/is/boolean.js":
/*!*******************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/is/boolean.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBoolean;
/**
 * @name        isBoolean
 * @namespace           js.is
 * @type      Function
 *
 * Check if the passed value is a js Boolean
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Boolean, false if not
 *
 * @example    js
 * import isBoolean from '@coffeekraken/sugar/js/is/boolean'
 * if (isBoolean(true) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function isBoolean(value) {
  return typeof value === 'boolean';
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/is/class.js":
/*!*****************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/is/class.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cls;

var __isClass = __webpack_require__(/*! is-class */ "../../util/sugar/node_modules/is-class/is-class.js");
/**
 * @name                      class
 * @namespace           js.is
 * @type                      Function
 *
 * Check if the passed variable (or array of variables) is/are plain variable(s)
 *
 * @param         {Mixed|Array}            variable                  The variable(s) to check
 * @return        {Boolean}                                         true if is class(es), false if not
 *
 * @example           js
 * import isClass = from '@coffeekraken/sugar/js/is/class';
 * isClass({ hello: 'world'}); // => false
 * const myCoolClass = class Coco{};
 * isClass(myCoolClass); // => true
 *
 * @see       https://www.npmjs.com/package/is-class
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


function cls(cls) {
  if (!Array.isArray(cls)) cls = [cls];

  for (var i = 0; i < cls.length; i++) {
    if (!__isClass(cls[i])) return false;
  }

  return true;
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/is/function.js":
/*!********************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/is/function.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFunction;
/**
 * @name        isFunction
 * @namespace       js.is
 * @type      Function
 *
 * Check if the passed value is a js function
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a function, false if not
 *
 * @example    js
 * import isFunction from '@coffeekraken/sugar/js/is/function'
 * if (isFunction(function() {})) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function isFunction(value) {
  return value && {}.toString.call(value) === '[object Function]';
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/is/integer.js":
/*!*******************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/is/integer.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInteger;
/**
 * @name        isInteger
 * @namespace           js.is
 * @type      Function
 *
 * Check if the passed value is an integer
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @example 	js
 * import isInteger from '@coffeekraken/sugar/js/is/integer';
 * isInteger(10) => true
 * isInteger('hello') => false
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function isInteger(data) {
  return !isNaN(data) && function (x) {
    return (x | 0) === x;
  }(parseFloat(data));
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/is/json.js":
/*!****************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/is/json.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isJson;
/**
 * @name        isJson
 * @namespace           js.is
 * @type      Function
 *
 * Check if the passed value is a valid json
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a valid json, false if not
 *
 * @example    js
 * import isJson from '@coffeekraken/sugar/js/is/json'
 * if (isJson('[{id:10}]')) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function isJson(value) {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }

  return true;
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/is/number.js":
/*!******************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/is/number.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNumber;
/**
 * @name        isNumber
 * @namespace           js.is
 * @type      Function
 *
 * Check if the passed value is a number
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @example 	js
 * import isNumber from '@coffeekraken/sugar/js/is/number';
 * isNumber(12) => true
 * isNumber(22.3) => true
 * isNumber('20') => false
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function isNumber(source) {
  return !isNaN(parseFloat(source)) && isFinite(source);
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/is/object.js":
/*!******************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/is/object.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObject;
/**
 * @name        isObject
 * @namespace           js.is
 * @type      Function
 *
 * Check if the passed value is a js object
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a object, false if not
 *
 * @example    js
 * import isObject from '@coffeekraken/sugar/js/is/object'
 * if (isObject({}) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function isObject(value) {
  return value && typeof value === 'object' && value.constructor === Object;
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/is/ofType.js":
/*!******************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/is/ofType.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ofType;

var _argumentTypeDefinitionString = _interopRequireDefault(__webpack_require__(/*! ../parse/argumentTypeDefinitionString */ "../../util/sugar/js/parse/argumentTypeDefinitionString.js"));

var _toString = _interopRequireDefault(__webpack_require__(/*! ../string/toString */ "../../util/sugar/js/string/toString.js"));

var _class = _interopRequireDefault(__webpack_require__(/*! ./class */ "../../util/sugar/js/is/class.js"));

var _integer = _interopRequireDefault(__webpack_require__(/*! ./integer */ "../../util/sugar/js/is/integer.js"));

var _upperFirst = _interopRequireDefault(__webpack_require__(/*! ../string/upperFirst */ "../../util/sugar/js/string/upperFirst.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @name              ofType
 * @namespace           js.is
 * @type              Function
 *
 * This function take the value to check and an argument type definition string like "String", "Array<String>", etc... and return true or false depending
 * if the value pass the test or not...
 *
 * @param       {Mixed}        value          The value to check
 * @param       {String}       argTypeDefinition      The argument type definition string to use for the test
 * @param       {Boolean}       [returnError=false]       Specify if you want the error string to be returned  in place of the simply false boolean
 * @return      {Boolean}                     true if the value pass the test, false if not
 *
 * @example       js
 * import isOfType from '@coffeekraken/sugar/js/is/ofType';
 * ifOfType(true, 'Boolean'); // => true
 * isOfType(12, 'String|Number'); // => true
 * isOfType(['hello',true], 'Array<String>'); // => false
 * isOfType(['hello',true], 'Array<String|Boolean>'); // => true
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


function ofType(value, argTypeDefinition) {
  var returnError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var definitionArray = argTypeDefinition; // parsing the argument definition string

  if (typeof argTypeDefinition === 'string') {
    definitionArray = (0, _argumentTypeDefinitionString.default)(argTypeDefinition);
  }

  var error = '';

  var _loop = function _loop(i) {
    var definitionObj = definitionArray[i]; // check array

    if (definitionObj.type === 'array') {
      // make sure the value is an array
      if (Array.isArray(value) && !definitionObj.of) return {
        v: true
      };else error = "Regarding to the argument definition \"<yellow>".concat(argTypeDefinition, "</yellow>\", the passed value \"<cyan>").concat((0, _toString.default)(value), "</cyan>\" of type \"<magenta>").concat(typeof value, "</magenta>\" has to be an <green>Array</green>...");
    } // check object


    if (definitionObj.type === 'object') {
      if (typeof value === 'object' && !definitionObj.of) return {
        v: true
      };else error = "Regarding to the argument definition \"<yellow>".concat(argTypeDefinition, "</yellow>\", the passed value \"<cyan>").concat((0, _toString.default)(value), "</cyan>\" of type \"<magenta>").concat(typeof value, "</magenta>\" has to be an <green>Object</green>...");
    } // check if need to check the childs


    if (definitionObj.of && definitionObj.of.length) {
      if (definitionObj.type === 'array' || definitionObj.type === 'object') {
        var loopOn = Array.isArray(value) ? [...value.keys()] : Object.keys(value);
        var checkValuesResult = true;
        loopOn.forEach(valueIndex => {
          if (!checkValuesResult) return;
          var valueToCheck = value[valueIndex];

          if (!ofType(valueToCheck, definitionObj.of, false)) {
            checkValuesResult = false;
            var ofTypesArray = [];
            definitionObj.of.forEach(o => {
              ofTypesArray.push(o.type);
            });
            error = "Regarding to the argument definition \"<yellow>".concat(argTypeDefinition, "</yellow>\", the passed value \"<yellow>").concat((0, _toString.default)(value), "</yellow>\" of type \"<magenta>").concat(typeof value, "</magenta>\" has to contain only \"<green>").concat(ofTypesArray.join(','), "</green>\"...");
          }
        }); // if one of the values does not correspond to the definition object, return false

        if (!checkValuesResult) {
          return {
            v: returnError ? error || false : false
          };
        }
      }
    } // check "class"


    if (definitionObj.type === 'class') {
      if ((0, _class.default)(value)) return {
        v: true
      };else error = "Regarding to the argument definition \"<yellow>".concat(argTypeDefinition, "</yellow>\", the passed value \"<cyan>").concat((0, _toString.default)(value), "</cyan>\" of type \"<magenta>").concat(typeof value, "</magenta>\" has to be a <green>Class</green>...");
    } // check if is an integer


    if (definitionObj.type === 'int' || definitionObj.type === 'integer') {
      if ((0, _integer.default)(value)) return {
        v: true
      };
      error = "Regarding to the argument definition \"<yellow>".concat(argTypeDefinition, "</yellow>\", the passed value \"<cyan>").concat((0, _toString.default)(value), "</cyan>\" of type \"<magenta>").concat(typeof value, "</magenta>\" has to be a <green>Integer</green>...");
    } // check default types


    if (['boolean', 'number', 'string', 'bigint', 'symbol', 'function'].indexOf(definitionObj.type) !== -1 && typeof value === definitionObj.type) {
      return {
        v: true
      };
    } else {
      error = "Regarding to the argument definition \"<yellow>".concat(argTypeDefinition, "</yellow>\", the passed value \"<cyan>").concat((0, _toString.default)(value), "</cyan>\" of type \"<magenta>").concat(typeof value, "</magenta>\" has to be a <green>").concat((0, _upperFirst.default)(definitionObj.type), "</green>...");
    } // check for "custom" types


    if ((0, _class.default)(value) && value.name) {
      if (definitionObj.type === value.name.toLowerCase()) return {
        v: true
      };else error = "Regarding to the argument definition \"<yellow>".concat(argTypeDefinition, "</yellow>\", the passed value \"<cyan>").concat((0, _toString.default)(value), "</cyan>\" of type \"<magenta>").concat(typeof value, "</magenta>\" has to be a <green>").concat((0, _upperFirst.default)(definitionObj.type), "</green>...");
    } else if (value && value.constructor && value.constructor.name) {
      if (definitionObj.type === value.constructor.name.toLowerCase()) return {
        v: true
      };else error = "Regarding to the argument definition \"<yellow>".concat(argTypeDefinition, "</yellow>\", the passed value \"<cyan>").concat((0, _toString.default)(value), "</cyan>\" of type \"<magenta>").concat(typeof value, "</magenta>\" has to be a <green>").concat((0, _upperFirst.default)(definitionObj.type), "</green>...");
    }
  };

  for (var i = 0; i < definitionArray.length; i++) {
    var _ret = _loop(i);

    if (typeof _ret === "object") return _ret.v;
  }

  return returnError ? error || false : false;
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/is/plainObject.js":
/*!***********************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/is/plainObject.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = plainObject;
/**
 * @name                      plainObject
 * @namespace           js.is
 * @type                      Function
 *
 * Check if the passed object (or array of objects) is/are plain object(s)
 *
 * @param         {Object|Array}            object                  The object(s) to check
 * @return        {Boolean}                                         true if is plain object(s), false if not
 *
 * @example           js
 * const isPlainObject = require('@coffeekraken/sugar/js/is/plainObject');
 * isPlainObject({ hello: 'world'}); // => true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function plainObject(object) {
  if (!Array.isArray(object)) object = [object];

  for (var i = 0; i < object.length; i++) {
    return typeof object[i] == 'object' && object[i] !== null && object[i].constructor == Object;
  }

  return true;
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/is/regexp.js":
/*!******************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/is/regexp.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isRegexp;
/**
 * @name        isRegexp
 * @namespace           js.is
 * @type      Function
 *
 * Check if the passed value is a js Regexp
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Regexp}   true if it's a Regexp, false if not
 *
 * @example    js
 * import isRegexp from '@coffeekraken/sugar/js/is/regexp'
 * if (isRegexp(/^hello$/g) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function isRegexp(value) {
  return value && typeof value === 'object' && value.constructor === RegExp;
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/is/string.js":
/*!******************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/is/string.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isString;
/**
 * @name        isString
 * @namespace           js.is
 * @type      Function
 *
 * Check if the passed value is a js String
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a String, false if not
 *
 * @example    js
 * import isString from '@coffeekraken/sugar/js/is/String'
 * if (isString({}) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/object/deepMerge.js":
/*!*************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/object/deepMerge.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepMerge;

var _copyTo = _interopRequireDefault(__webpack_require__(/*! copy-to */ "../../util/sugar/node_modules/copy-to/index.js"));

var _plainObject = _interopRequireDefault(__webpack_require__(/*! ../is/plainObject */ "../../util/sugar/js/is/plainObject.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @name                deepMerge
 * @namespace           js.object
 * @type                Function
 *
 * Deep merge one object with another and return the merged object result. This merging implementation support:
 * - Merging object with getters/setters
 * - n numbers of objects as arguments
 *
 * @param           {Object}            objects...        Pass all the objects you want to merge
 * @return          {Object}                              The merged object result
 *
 * @example           js
 * import deepMerge from '@coffeekraken/sugar/node/object/deepMerge';
 * deepMerge({a: {b: {c: 'c', d: 'd'}}}, {a: {b: {e: 'e', f: 'f'}}});
 * // => { a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } } }
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


function deepMerge() {
  function merge(firstObj, secondObj) {
    var newObj = {};
    if (!firstObj && secondObj) return secondObj;
    if (!secondObj && firstObj) return firstObj;
    if (!firstObj && !secondObj) return {};
    (0, _copyTo.default)(firstObj).override(newObj);

    for (var key of Object.keys(secondObj)) {
      if ((0, _plainObject.default)(firstObj[key]) && (0, _plainObject.default)(secondObj[key])) {
        newObj[key] = merge(firstObj[key], secondObj[key]);
        continue;
      }

      (0, _copyTo.default)(secondObj).pick(key).toCover(newObj);
    }

    return newObj;
  }

  var currentObj = {};

  for (var i = 0; i < arguments.length; i++) {
    var toMergeObj = (i < 0 || arguments.length <= i ? undefined : arguments[i]) || {};
    currentObj = merge(currentObj, toMergeObj);
  }

  return currentObj;
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/parse/argumentTypeDefinitionString.js":
/*!*******************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/parse/argumentTypeDefinitionString.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = argumentTypeDefinitionString;
/**
 * @name              argumentTypeDefinitionString
 * @namespace           js.parse
 * @type              Function
 *
 * Thia function take an argument type definition string like "String", "Array<String>", "Array|String", etc... and return an object that represent this.
 *
 * @param       {String}        argTypeString         The argument type definition string
 * @return      {Object}                              The argument type definition string in object format
 *
 * @example       js
 * import argumentTypeDefinitionString from '@coffeekraken/sugar/js/parse/argumentTypeDefinitionString';
 * argumentTypeDefinitionString('Array'); // => [{ type: 'array', of: null }] }
 * argumentTypeDefinitionString('Array<String>'); // => [{ type: 'array', of: [{ type: 'string' }] }]
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function argumentTypeDefinitionString(argTypeString) {
  // split the string by |
  var inDepth = 0;
  var currentPart = '',
      typesArray = [];
  argTypeString.split('').forEach(character => {
    if (character === '>') {
      if (inDepth <= 0) {
        throw new Error("It seems that your argument type definition string \"".concat(argTypeString, "\" is invalid..."));
      }

      inDepth--;
      currentPart += character;
      return;
    }

    if (character === '<') {
      inDepth++;
      currentPart += character;
      return;
    }

    if (character === '|') {
      if (inDepth > 0) {
        currentPart += character;
        return;
      }

      typesArray.push(currentPart);
      currentPart = '';
      return;
    }

    currentPart += character;
  });
  typesArray.push(currentPart); // init the return array

  var returnArray = []; // loop on each types array

  typesArray.forEach(typeDefinitionString => {
    // split the string by <
    var parts = typeDefinitionString.split('<'); // get the "type"

    var type = parts[0].toLowerCase(); // process the "of" part if exist

    var ofArray = null;

    if (parts[1]) {
      var ofPart = parts[1].slice(0, -1);
      ofArray = argumentTypeDefinitionString(ofPart);
    } // build the type object and add it the the returnArray


    returnArray.push({
      type,
      of: ofArray
    });
  });
  return returnArray;
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/promise/SPromise.js":
/*!*************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/promise/SPromise.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../object/deepMerge */ "../../util/sugar/js/object/deepMerge.js"));

var _prettyError = _interopRequireDefault(__webpack_require__(/*! pretty-error */ "../../util/sugar/node_modules/pretty-error/lib/PrettyError.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
/**
 * @name                  SPromise
 * @namespace           js.promise
 * @type                  Class
 *
 * This class works the same as the default Promise one. The difference is that you have more control on this one like
 * the possibility to resolve it multiple times. Here's a list of the "differences" and the "features" that this class provide:
 *
 * - Pass the normal "resolve" and "reject" function to the passed executor
 * - Pass a new function to the passed executor called "trigger" that let you launch your registered callbacks like "then", "catch", etc... but without resolving the master promise. Here's some examples:
 *    - new SPromise((resolve, reject, trigger, cancel) => { trigger('then', 'myCoolValue'); }).then(value => { ... });
 *    - new SPromise((resolve, reject, trigger, cancel) => { trigger('then,catch', 'myCoolValue') }).then(value => { ... });
 * - Pass a new function to the passed executor called "cancel" that let you stop/cancel the promise execution without triggering your registered callbacks unless the "cancel" once...
 * - Expose the normal "then" and "catch" methods to register your callbacks
 * - Expose some new callbacks registration functions described here:
 *    - Expose a method called "resolved" that let you register callbacks called only when the "resolve" function has been called
 *    - Expose a method called "rejected" that let you register callbacks called only when the "reject" function has been called
 *    - Expose a method called "finally" that let you register callbacks called when the "resolve" or "reject" function has been called
 *    - Expose a method called "canceled" that let you register callbacks called only when the "cancel" function has been called
 * - Every callbacks registration methods accept as first argument the number of time that your callback will be called at max. Here's some examples:
 *    - new SPromise((...)).then(value => { // do something... }).catch(error => { // do something... }).start();
 *    - new SPromise((...)).then(1, value => { // do something... }).catch(3, error => { // do something... }).start();
 * - Expose a method called "on" that can be used to register callbacks the same as the "then", "catch", etc... methods but you can register a same callback function to multiple callbacks type at once:
 *    - new SPromise((...)).on('then', value => { ... }).on('then,catch', value => { ... }).start();
 *    - Specify the max number of time to call your callback function like so: new SPromise((...)).on('then:2', value => { ... }).on('then:1,catch', value => { ... }).start();
 * - A new method called "start" is exposed. This method is useful when you absolutely need that your executor function is launched right after the callbacks registrations.
 *    - If you don't call the "start" method, the executor function passed to the SPromise constructor will be called on the next javascript execution loop
 * - Support the Promises chaining through the callbacks like to:
 *    ```js
 *      const result = await new SPromise((resolve, reject, trigger, cancel) => {
 *        resolve('hello');
 *      }).then(value => {
 *        return new Promise((resolve) => {
 *          setTimeout(() => {
 *            resolve(value + 'World');
 *          }, 1000);
 *        });
 *      }).then(value => {
 *        return value + 'Promise';
 *      }).start();
 *      console.log(result); // => helloWorldPromise
 *    ```
 *
 * @example         js
 * import SPromise from '@coffeekraken/sugar/js/promise/SPromise';
 * function myCoolFunction() {
 *    return new SPromise((resolve, reject, trigger, cancel) => {
 *        // do something...
 *        setInterval(() => {
 *            // resolve the promise
 *            resolve('something'); *
 *        }, 1000);
 *    });
 * }
 *
 * // calling the function and get back the SPromise instance
 * myCoolFunction().then(value => {
 *    // do something here...
 * }).then(1, value => {
 *    // do something just once...
 * }).catch(error => {
 *    // do something with the returned reason of failure...
 * }).start();
 *
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */


var SPromise = /*#__PURE__*/function (_Promise) {
  _inherits(SPromise, _Promise);

  var _super = _createSuper(SPromise);

  _createClass(SPromise, null, [{
    key: "pipe",

    /**
     * @name                   _masterPromiseResolveFn
     * @type                    Promise
     * @private
     *
     * Store the master promise resolve function
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                   _masterPromiseRejectFn
     * @type                    Promise
     * @private
     *
     * Store the master promise reject function
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                  _executorFn
     * @type                  Function
     *
     * Store the executor function passed to the constructor
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                  _isExecutorStarted
     * @type                  Boolean
     *
     * Store the status of the executor function. true if it has been executed, false if not...
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                  _settings
     * @type                  Object
     * @private
     *
     * Store the settings of this SPromise instance. Here's the available settings:
     * - stacks (null) {Array|String}: An array or comma separated string of additional stacks you want for this instance
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                  _status
     * @type                  String
     * @private
     *
     * Store the promise status. Can be:
     * - pending: When the promise is waiting for resolution or rejection
     * - resolved: When the promise has been resolved
     * - rejected: When the promise has been rejected
     * - canceled: When the promise has been canceled
     * - destroyed: When the promise has been destroyed
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                  _stacks
     * @type                  Object
     * @private
     *
     * Store the stacks callbacks
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                  pipe
     * @type                  Function
     * @static
     *
     * This static function allows you to redirect some SPromise "events" to another SPromise instance
     * with the ability to process the linked value before triggering it on the destination SPromise.
     *
     * @param         {SPromise}      sourceSPromise        The source SPromise instance on which to listen for "events"
     * @param         {SPromise}      destSPromise          The destination SPromise instance on which to trigger the listened "events"
     * @param         {Object}        [settings={}]         An object of settings to configure your pipe process
     * - stacks (*) {String}: Specify which stacks you want to pipe. By default it's all using the "*" character
     * - processor (null) {Function}: Specify a function to apply on the triggered value before triggering it on the dest SPromise. Take as arguments the value itself and the stack name. Need to return a new value
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    value: function pipe(sourceSPromise, destSPromise) {
      var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      // settings
      settings = (0, _deepMerge.default)({
        stacks: '*',
        processor: null
      }, settings); // listen for all on the source promise

      sourceSPromise.on(settings.stacks, (value, stack) => {
        // check if need to process the value
        if (settings.processor) value = settings.processor(value, stack); // trigger on the destination promise

        destSPromise.trigger(stack, value);
      });
    }
    /**
     * @name                  constructor
     * @type                  Function
     *
     * Constructor
     *
     * @param         {Function}          executor          The executor function that will receive the resolve and reject ones...
     * @param         {Object}            [settings={}]     An object of settings for this particular SPromise instance. Here's the available settings:
     * - safeReject (true) {Boolean}: Specify if you prefere that your promise is "resolved" with an "Error" instance when rejected, or if you prefere the normal throw that does not resolve your promise and block the "await" statusment...
     * - cancelDefaultReturn (null) {Mixed}: Specify what you want to return by default if you cancel your promise without any value
     *
     * @example       js
     * const promise = new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     * }).then(value => {
     *    // do something...
     * }).finally(value => {
     *    // do something...
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }]);

  function SPromise(executorFn) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _this;

    _classCallCheck(this, SPromise);

    var _resolve, _reject;

    _this = _super.call(this, (resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    }); // .catch((e) => {
    // check if we have some catch callbacks or not...
    // if (!this._stacks || this._stacks.catch.length === 0) {
    //   let error = e.stack || typeof e === 'object' ? JSON.stringify(e) : e;
    //   const pe = new __prettyError();
    //   console.log(pe.render(new Error(error)));
    // }
    // });

    _defineProperty(_assertThisInitialized(_this), "_masterPromiseResolveFn", null);

    _defineProperty(_assertThisInitialized(_this), "_masterPromiseRejectFn", null);

    _defineProperty(_assertThisInitialized(_this), "_executorFn", null);

    _defineProperty(_assertThisInitialized(_this), "_isExecutorStarted", null);

    _defineProperty(_assertThisInitialized(_this), "_settings", {});

    _defineProperty(_assertThisInitialized(_this), "_status", 'pending');

    _defineProperty(_assertThisInitialized(_this), "_stacks", {
      then: [],
      catch: [],
      resolve: [],
      reject: [],
      finally: [],
      cancel: []
    });

    _this._masterPromiseResolveFn = _resolve;
    _this._masterPromiseRejectFn = _reject; // save the executor function

    _this._executorFn = executorFn; // extend settings

    _this._settings = (0, _deepMerge.default)({
      safeReject: true,
      cancelDefaultReturn: null
    }, settings);
    setTimeout(() => {
      if (!_this._isExecutorStarted) {
        _this._executorFn(_this._resolve.bind(_assertThisInitialized(_this)), _this._reject.bind(_assertThisInitialized(_this)), _this.trigger.bind(_assertThisInitialized(_this)), _this._cancel.bind(_assertThisInitialized(_this)));

        _this._isExecutorStarted = true;
      }
    });
    return _this;
  }
  /**
   * @name                    status
   * @type                    String
   * @get
   *
   * Access the promise status. Can be one of these:
   * - pending: When the promise is waiting for resolution or rejection
   * - resolved: When the promise has been resolved
   * - rejected: When the promise has been rejected
   * - canceled: When the promise has been canceled
   * - destroyed: When the promise has been destroyed
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  _createClass(SPromise, [{
    key: "is",

    /**
     * @name                  is
     * @type                  Function
     *
     * Check is the promise is on one of the passed status
     *
     * @param       {String}        status        A comma separated list of status to check
     * @return      {Boolean}                     Return true if the promise is in one of the passed status
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    value: function is(status) {
      var statusArray = status.split(',').map(l => l.trim());
      if (statusArray.indexOf(this._status) !== -1) return true;
      return false;
    }
    /**
     * @name                  isPending
     * @type                  Function
     *
     * Return back true or false depending on the promise status
     *
     * @return    {Boolean}         true or false depending on the promise status
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "isPending",
    value: function isPending() {
      return this._status === 'pending';
    }
    /**
     * @name                  isResolved
     * @type                  Function
     *
     * Return back true or false depending on the promise status
     *
     * @return    {Boolean}         true or false depending on the promise status
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "isResolved",
    value: function isResolved() {
      return this._status === 'resolved';
    }
    /**
     * @name                  isRejected
     * @type                  Function
     *
     * Return back true or false depending on the promise status
     *
     * @return    {Boolean}         true or false depending on the promise status
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "isRejected",
    value: function isRejected() {
      return this._status === 'rejected';
    }
    /**
     * @name                  isCanceled
     * @type                  Function
     *
     * Return back true or false depending on the promise status
     *
     * @return    {Boolean}         true or false depending on the promise status
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "isCanceled",
    value: function isCanceled() {
      return this._status === 'canceled';
    }
    /**
     * @name                  isDestroyed
     * @type                  Function
     *
     * Return back true or false depending on the promise status
     *
     * @return    {Boolean}         true or false depending on the promise status
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "isDestroyed",
    value: function isDestroyed() {
      return this._status === 'destroyed';
    }
    /**
     * @name                    start
     * @type                    Function
     *
     * This method is useful when you want the executor function passed to the constructor to be called directly and not
     * as usual during the next javascript execution loop.
     *
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something
     * }).then(value => {
     *    // do something
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "start",
    value: function start() {
      if (this._isDestroyed) {
        throw new Error("Sorry but you can't call the \"start\" method on this SPromise cause it has been destroyed...");
      }

      if (this._isExecutorStarted) return;

      this._executorFn.apply(this, [this._resolve.bind(this), this._reject.bind(this), this.trigger.bind(this), this._cancel.bind(this)]);

      this._isExecutorStarted = true; // maintain chainability

      return this;
    }
    /**
     * @name          resolve
     * @type          Function
     * @async
     *
     * This is the "resolve" method exposed on the promise itself for convinience
     *
     * @param         {Mixed}         arg       The value that you want to return back from the promise
     * @param       {Array|String}         [stacksOrder='then,resolve,finally']      This specify in which order have to be called the stacks
     * @return        {Mixed}                   Return the resolve result value passed in each stacks specified in the second parameter
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "resolve",
    value: function resolve(arg) {
      var stacksOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'then,resolve,finally';
      return this._resolve(arg, stacksOrder);
    }
    /**
     * @name          _resolve
     * @type          Function
     * @private
     * @async
     *
     * This is the method that will be called by the promise executor passed resolve function
     *
     * @param       {Mixed}         arg           The argument that the promise user is sendind through the resolve function
     * @param       {Array|String}         [stacksOrder='then,resolve,finally']      This specify in which order have to be called the stacks
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_resolve",
    value: function () {
      var _resolve2 = _asyncToGenerator(function* (arg) {
        var stacksOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'then,resolve,finally';
        if (this._isDestroyed) return; // update the status

        this._status = 'resolved'; // exec the wanted stacks

        var stacksResult = yield this._triggerStacks(stacksOrder, arg); // resolve the master promise

        this._masterPromiseResolveFn(stacksResult); // return the stack result


        return stacksResult;
      });

      function _resolve(_x) {
        return _resolve2.apply(this, arguments);
      }

      return _resolve;
    }()
    /**
     * @name          reject
     * @type          Function
     * @async
     *
     * This is the "reject" method exposed on the promise itself for convinience
     *
     * @param         {Mixed}         arg       The value that you want to return back from the promise
     * @param       {Array|String}         [stacksOrder='then,reject,finally']      This specify in which order have to be called the stacks
     * @return        {Mixed}                   Return the reject result value passed in each stacks specified in the second parameter
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "reject",
    value: function reject(arg) {
      var stacksOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'then,reject,finally';
      return this._reject(arg, stacksOrder);
    }
    /**
     * @name          _reject
     * @type          Function
     * @private
     * @async
     *
     * This is the method that will be called by the promise executor passed reject function
     *
     * @param       {Mixed}         arg           The argument that the promise user is sendind through the reject function
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_reject",
    value: function () {
      var _reject2 = _asyncToGenerator(function* (arg) {
        var stacksOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'catch,reject,finally';
        if (this._isDestroyed) return; // update the status

        this._status = 'rejected'; // exec the wanted stacks

        var stacksResult = yield this._triggerStacks(stacksOrder, arg); // resolve the master promise

        if (this._settings.safeReject) {
          this._masterPromiseResolveFn(stacksResult || this._settings.cancelDefaultReturn);
        } else {
          this._masterPromiseRejectFn(stacksResult);
        } // return the stack result


        return stacksResult;
      });

      function _reject(_x2) {
        return _reject2.apply(this, arguments);
      }

      return _reject;
    }()
    /**
     * @name          cancel
     * @type          Function
     * @async
     *
     * This is the "cancel" method exposed on the promise itself for convinience
     *
     * @param         {Mixed}         arg       The value that you want to return back from the promise
     * @param       {Array|String}         [stacksOrder='cancel']      This specify in which order have to be called the stacks
     * @return        {Mixed}                   Return the cancel result value passed in each stacks specified in the second parameter
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "cancel",
    value: function cancel(arg) {
      var stacksOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'cancel';
      return this._cancel(arg, stacksOrder);
    }
    /**
     * @name            _cancel
     * @type            Function
     * @private
     * @async
     *
     * Cancel the promise execution, destroy the Promise and resolve it with the passed value without calling any callbacks
     *
     * @param         {Mixed}           arg           The argument you want to pass to the cancel callbacks
     * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_cancel",
    value: function () {
      var _cancel2 = _asyncToGenerator(function* (arg) {
        var stacksOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'cancel';
        if (this._isDestroyed) return; // update the status

        this._status = 'canceled'; // exec the wanted stacks

        var stacksResult = yield this._triggerStacks(stacksOrder, arg); // resolve the master promise

        this._masterPromiseResolveFn.apply(this, [stacksResult || null, this]); // return the stack result


        return stacksResult;
      });

      function _cancel(_x3) {
        return _cancel2.apply(this, arguments);
      }

      return _cancel;
    }()
    /**
     * @name          trigger
     * @type          Function
     * @async
     *
     * This is the method that allows you to trigger the callbacks like "then", "catch", "finally", etc... without actually resolving the Promise itself
     *
     * @param         {String|Array}        what            The callbacks that you want to trigger. Can be "then", "catch", "finally" or "cancel". You can trigger multiple stacks by passing an Array like ['then','finally'], or a string like "then,finally"
     * @param         {Mixed}         arg         The argument you want to pass to the callback
     * @return        {Promise}                       A default Promise that will be resolved with the result of the stack execution
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    trigger('then', 'hello world');
     *    setTimeout(() => {
     *      resolve('something');
     *    }, 2000);
     * }).then(value => {
     *    // do something with one time "hello world", and one time "something"...
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "trigger",
    value: function () {
      var _trigger = _asyncToGenerator(function* (what, arg) {
        if (this._isDestroyed) return; // triger the passed stacks

        return this._triggerStacks(what, arg);
      });

      function trigger(_x4, _x5) {
        return _trigger.apply(this, arguments);
      }

      return trigger;
    }()
    /**
     * @name            _registerNewStacks
     * @type            Function
     * @private
     *
     * This methods allows you to register new stacks.
     * A new stack can be called then using the "on('stackName', ...)" method,
     * or directly on the SPromise instance like so "myPromise.stackName(...)".
     *
     * @param       {String|Array}      stacks        The stack(s) name(s) you want to register. Can be an Array or a comma separated string
     * @return      {SPromise}                        The SPromise instance
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_registerNewStacks",
    value: function _registerNewStacks(stacks) {
      // split the stacks order
      if (typeof stacks === 'string') stacks = stacks.split(',').map(s => s.trim());
      stacks.forEach(stack => {
        if (!this._stacks[stack]) {
          this._stacks[stack] = [];
        }
      });
    }
    /**
     * @name            _registerCallbackInStack
     * @type            Function
     *
     * This function take as argument a stack array and register into it the passed callback function
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_registerCallbackInStack",
    value: function _registerCallbackInStack(stack) {
      if (this._isDestroyed) {
        throw new Error("Sorry but you can't call the \"".concat(stack, "\" method on this SPromise cause it has been destroyed..."));
      } // make sure the stack exist


      if (!this._stacks[stack]) {
        this._registerNewStacks(stack);
      }

      if (typeof stack === 'string') stack = this._stacks[stack]; // process the args

      var callback = arguments.length <= 1 ? undefined : arguments[1];
      var callNumber = -1;

      if ((arguments.length <= 1 ? 0 : arguments.length - 1) === 2 && typeof (arguments.length <= 1 ? undefined : arguments[1]) === 'number') {
        callback = arguments.length <= 2 ? undefined : arguments[2];
        callNumber = arguments.length <= 1 ? undefined : arguments[1];
      } // make sure this is a function and register it to the _catchStack


      if (typeof callback === 'function' && stack.indexOf(callback) === -1) stack.push({
        callback,
        callNumber,
        called: 0
      }); // maintain chainability

      return this;
    }
    /**
     * @name            _triggerStack
     * @type            Function
     * @private
     * @async
     *
     * This function take an Array Stack as parameter and execute it to return the result
     *
     * @param         {Array|String}             stack             The stack to execute. Can be the stack array directly, or just the stack name like "then", "catch", etc.stack.stack.
     * @param         {Mixed}             initialValue      The initial value to pass to the first stack callback
     * @param         {String}            [as=null]         This parameter is useful when you want to trigger a stack as another one like when you trigger the stack "*"
     * @return        {Promise}                             A promise resolved with the stack result
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_triggerStack",
    value: function () {
      var _triggerStack2 = _asyncToGenerator(function* (stack, initialValue) {
        var asName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var currentCallbackReturnedValue = initialValue;
        var stackName = asName || stack;
        if (!this._stacks || Object.keys(this._stacks).length === 0) return currentCallbackReturnedValue;

        if (typeof stack === 'string') {
          // make sure the stack exist
          if (!this._stacks[stack]) {
            this._registerNewStacks(stack);
          }

          stack = this._stacks[stack];
        } // filter the catchStack


        stack.map(item => item.called++);
        stack = stack.filter(item => {
          if (item.callNumber === -1) return true;
          if (item.called <= item.callNumber) return true;
          return false;
        });

        for (var i = 0; i < stack.length; i++) {
          // get the actual item in the array
          var item = stack[i]; // make sure the stack exist

          if (!item.callback) return currentCallbackReturnedValue; // call the callback function

          var callbackResult = item.callback(currentCallbackReturnedValue, stackName); // check if the callback result is a promise

          if (Promise.resolve(callbackResult) === callbackResult) {
            callbackResult = yield callbackResult;
          } // if the settings tells that we have to pass each returned value to the next callback


          if (callbackResult !== undefined) {
            currentCallbackReturnedValue = callbackResult;
          }
        } // return the result


        return currentCallbackReturnedValue;
      });

      function _triggerStack(_x6, _x7) {
        return _triggerStack2.apply(this, arguments);
      }

      return _triggerStack;
    }()
    /**
     * @name          _triggerStacks
     * @type          Function
     * @private
     * @async
     *
     * This function take as parameters a list of stacks to trigger like an Array ['then','finnaly'], or a string like so "then,finally", and as second parameter,
     * the initial value to pass to the first callback of the joined stacks...
     *
     * @param         {Array|String}            stacks          The stacks to trigger
     * @param         {Mixed}                   initialValue    The initial value to pass to the first stack callback
     * @return        {Promise}                                 A promise that will be resolved with the stacks resulting value
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_triggerStacks",
    value: function () {
      var _triggerStacks2 = _asyncToGenerator(function* (stacks, initialValue) {
        // check if the stacks is "*"
        if (typeof stacks === 'string') stacks = stacks.split(',').map(s => s.trim()); // stacks.push('*');

        var currentStackResult = initialValue;

        for (var i = 0; i < stacks.length; i++) {
          var stackResult = yield this._triggerStack(stacks[i], currentStackResult);

          if (stackResult !== undefined) {
            currentStackResult = stackResult;
          }

          yield this._triggerStack('*', currentStackResult, stacks[i]); // this._triggerAllStack(stacks[i], currentStackResult);
        }

        return currentStackResult;
      });

      function _triggerStacks(_x8, _x9) {
        return _triggerStacks2.apply(this, arguments);
      }

      return _triggerStacks;
    }()
    /**
     * @name                on
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called every time the "resolve" one is called in the executor
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "release", "on", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {String|Array}      stacks        The stacks in which you want register your callback. Either an Array like ['then','finally'], or a String like "then,finally"
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    resolve('hello world');
     * }).on('then', value => {
     *    // do something with the value that is "hello world"
     * }).on('catch:1', error => {
     *    // do something that will be called only once
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "on",
    value: function on(stacks, callback) {
      if (this._isDestroyed) {
        throw new Error("Sorry but you can't call the \"on\" method on this SPromise cause it has been destroyed...");
      }

      if (typeof stacks === 'string') stacks = stacks.split(',').map(s => s.trim()); // loop on each stacks

      stacks.forEach(name => {
        // check if it has a callNumber specified using name:1
        var splitedName = name.split(':');
        var callNumber = -1;

        if (splitedName.length === 2) {
          name = splitedName[0];
          callNumber = parseInt(splitedName[1]);
        } // calling the registration method


        this._registerCallbackInStack(name, callNumber, callback);
      }); // maintain chainability

      return this;
    }
    /**
     * @name            off
     * @type            Function
     *
     * This method allows you to unsubscribe to an event by passing the event name an optionally the callback function.
     * If you don't pass the callback function, all the subscribed events the same as the passed one will be unsubscribed.
     *
     * @param       {String}        name        The event name to unsubscribe to
     * @param       {Function}    [callback=null]     The callback function you want to unsubscribe
     * @return      {SPromise}                The SPromise instance to maintain chainability
     *
     * @since     2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "off",
    value: function off(name) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!callback) {
        delete this._stacks[name];
        return this;
      } // get the stack


      var stack = this._stacks[name];
      if (!stack) return this; // loop on the stack registered callback to finc the one to delete

      stack = stack.filter(item => {
        if (item.callback === callback) return false;
        return true;
      }); // make sure we have saved the new stack

      this._stacks[name] = stack; // maintain chainability

      return this;
    }
    /**
     * @name                then
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called every time the "resolve" one is called in the executor
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {Number}          [callNumber=-1]     (Optional) How many times you want this callback to be called at max. -1 means unlimited
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    resolve('hello world');
     * }).then(value => {
     *    // do something with the value that is "hello world"
     *    return new Promise((resolve, reject) => {
     *       setTimeout(() => resolve('hola'), 1000);
     *    });
     * }).then(2, value => {
     *    // do something that will be executed only twice
     *    // do something with the value passed "hola"
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "then",
    value: function then() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args.length === 2 && typeof args[0] === 'function' && typeof args[1] === 'function') {
        this._masterPromiseResolveFn = args[0];
        this._masterPromiseRejectFn = args[1];
        return;
      }

      return this._registerCallbackInStack('then', ...args);
    }
    /**
     * @name                catch
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {Number}          [callNumber=-1]     (Optional) How many times you want this callback to be called at max. -1 means unlimited
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    reject('hello world');
     * }).catch(value => {
     *    // do something with the value that is "hello world"
     * }).catch(1, value => {
     *    // do something that will be executed only once
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "catch",
    value: function _catch() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      // super.catch(...args);
      return this._registerCallbackInStack('catch', ...args);
    }
    /**
     * @name                finally
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    resolve('hello world');
     * }).finally(value => {
     *    // do something with the value that is "hello world"
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "finally",
    value: function _finally() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this._registerCallbackInStack('finally', ...args);
    }
    /**
     * @name                resolved
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    resolve('hello world');
     * }).resolved(value => {
     *    // do something with the value that is "hello world"
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "resolved",
    value: function resolved() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return this._registerCallbackInStack('resolve', ...args);
    }
    /**
     * @name                rejected
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    resolve('hello world');
     * }).rejected(value => {
     *    // do something with the value that is "hello world"
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "rejected",
    value: function rejected() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return this._registerCallbackInStack('reject', ...args);
    }
    /**
     * @name                canceled
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called once when the "revoke" function has been called
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {Function}        callback        The callback function to register
     * @return          {Promise}                  A simple promise that will be resolved with the cancel stack result
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    cancel('hello world');
     * }).canceled(value => {
     *    // do something with the value that is "hello world"
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "canceled",
    value: function canceled() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return this._registerCallbackInStack('cancel', ...args);
    }
    /**
     * @name                cancel
     * @type                Function
     *
     * This method allows the user to cancel the promise execution.
     * This mean that the promise will be resolved but not trigger any
     * other stacks like "resolve,reject,etc..."
     *
     * @param           {Mixed}         [value=null]      A value that you want to pass to the resolve promise
     * @return          {Promise}                  A simple promise that will be resolved with the cancel stack result
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    cancel('hello world');
     * }).canceled(value => {
     *    // do something with the value that is "hello world"
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "cancel",
    value: function cancel() {
      if (this._isDestroyed) return;
      return this._cancel(...arguments);
    }
    /**
     * @name                      _destroy
     * @type                      Function
     *
     * Destroying the SPromise instance by unregister all the callbacks, etc...
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      // update the status
      this._status = 'destroyed'; // destroying all the callbacks stacks registered

      delete this._stacks; // delete this._isExecutorStarted; // keep it to avoid errors in the "setTimeout" function in the masterPromise executor...

      delete this._executorFn;
      delete this._masterPromiseResolveFn;
      delete this._masterPromiseRejectFn;
      delete this._masterPromise;
      this._isDestroyed = true;
    }
  }, {
    key: "status",
    get: function get() {
      return this._status;
    }
  }]);

  return SPromise;
}( /*#__PURE__*/_wrapNativeSuper(Promise));

exports.default = SPromise;
module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/string/autoCast.js":
/*!************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/string/autoCast.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = autoCast;
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

/***/ "../../util/sugar/js/string/camelize.js":
/*!************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/string/camelize.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = camelize;
/**
 * @name        camelize
 * @namespace           js.string
 * @type      Function
 *
 * Camelize a string
 *
 * @param         {String}          text        The string to camelize
 * @param         {String}          [charsRange='_-\\s']      The regex chars range to remove and camelize the next character
 * @return        {String}                      The camelized string
 *
 * @example     js
 * import camelize from '@coffeekraken/sugar/js/string/camelize';
 * camelize('hello world'); // => helloWorld
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function camelize(text) {
  var chars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_-\\s';
  var res = '';
  var reg = new RegExp("(?:^|[".concat(chars, "])(w)"), 'g');
  res = text.replace(reg, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
  res = res.substr(0, 1).toLowerCase() + res.slice(1);
  return res.trim();
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/string/paramCase.js":
/*!*************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/string/paramCase.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _paramCase = __webpack_require__(/*! param-case */ "../../util/sugar/node_modules/param-case/dist.es2015/index.js");
/**
 * @name          paramCase
 * @namespace           js.string
 * @type          Function
 *
 * This function transform a string into a param case one like so "something-cool"
 *
 * @param       {String}        string          The string to convert
 * @return      {String}                        The converted string
 *
 * @example       js
 * import paramCase from '@coffeekraken/sugar/js/string/paramCase';
 * paramCase('some thoing cool'); // => some-thing-cool
 *
 * @see         https://www.npmjs.com/package/param-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


function _default(string) {
  return (0, _paramCase.paramCase)(string);
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/string/parse.js":
/*!*********************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/string/parse.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * @name                                  parse
 * @namespace           js.string
 * @type                                  Function
 *
 * Parse a string and convert it into his native data type like date, number, boolean, etc...
 *
 * @param             {String}                        value                                 The value to convert
 * @return            {Mixed}                                                               The converted value
 *
 * @example           js
 * import parse from '@coffeekraken/sugar/js/string/parse';
 * parse('10'); // => 10
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

var _default = value => {
  if (typeof value !== 'string') return value;

  try {
    return Function("\n      \"use strict\";\n      return (".concat(value, ");\n    "))();
  } catch (e) {
    return value;
  }
};

exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/string/toString.js":
/*!************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/string/toString.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toString;

var _json = _interopRequireDefault(__webpack_require__(/*! ../is/json */ "../../util/sugar/js/is/json.js"));

var _object = _interopRequireDefault(__webpack_require__(/*! ../is/object */ "../../util/sugar/js/is/object.js"));

var _array = _interopRequireDefault(__webpack_require__(/*! ../is/array */ "../../util/sugar/js/is/array.js"));

var _function = _interopRequireDefault(__webpack_require__(/*! ../is/function */ "../../util/sugar/js/is/function.js"));

var _boolean = _interopRequireDefault(__webpack_require__(/*! ../is/boolean */ "../../util/sugar/js/is/boolean.js"));

var _regexp = _interopRequireDefault(__webpack_require__(/*! ../is/regexp */ "../../util/sugar/js/is/regexp.js"));

var _string = _interopRequireDefault(__webpack_require__(/*! ../is/string */ "../../util/sugar/js/is/string.js"));

var _number = _interopRequireDefault(__webpack_require__(/*! ../is/number */ "../../util/sugar/js/is/number.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @name        toString
 * @namespace           js.string
 * @type      Function
 *
 * Convert passed value to a string
 *
 * @param    {Mixed}    value    The value to convert to string
 * @return    {String}    The resulting string
 *
 * @example    js
 * import toString from '@coffeekraken/sugar/js/string/toString'
 * toString({
 * 	id:'hello'
 * }) // '{"id":"hello"}'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


function toString(value) {
  if ((0, _string.default)(value)) {
    return value;
  } else if (value === null) {
    return 'null';
  } else if (typeof value === 'symbol' || typeof value === 'typedArray' || value instanceof Date || typeof value === 'color') {
    return value.toString();
  } else if ((0, _object.default)(value) || (0, _array.default)(value) || (0, _json.default)(value)) {
    return JSON.stringify(value);
  } else if ((0, _boolean.default)(value)) {
    if (value) return 'true';else return 'false';
  } else if ((0, _function.default)(value)) {
    return '' + value;
  } else if ((0, _regexp.default)(value)) {
    return value.toString();
  } else if ((0, _number.default)(value)) {
    return value.toString();
  } else if (value === undefined) {
    return 'undefined';
  } else {
    var returnVal;

    try {
      returnVal = JSON.stringify(value);
    } catch (e) {
      try {
        returnVal = value.toString();
      } catch (e) {
        return value;
      }
    }

    return returnVal;
  }
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/string/uncamelize.js":
/*!**************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/string/uncamelize.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uncamelize;
/**
 * @name        uncamelize
 * @namespace           js.string
 * @type      Function
 *
 * Uncamelize a string
 *
 * @param    {String}    string    The string to uncamelize
 * @param    {String}    [separator='-']    The separator to use
 * @return    {String}    The uncamelized string
 *
 * @example    js
 * import uncamelize from '@coffeekraken/sugar/js/string/uncamelize'
 * uncamelize('helloWorldAndUniverse') // hello-world-and-universe
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function uncamelize(text) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
  // Replace all capital letters by separator followed by lowercase one
  var res = '';
  res = text.replace(/[A-Z]/g, function (letter) {
    return separator + letter.toLowerCase();
  }); // Remove first separator (to avoid _hello_world name)

  if (res.slice(0, 1) === separator) res = res.slice(1);
  return res;
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/string/upperFirst.js":
/*!**************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/string/upperFirst.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = upperFirst;
/**
 * @name        upperFirst
 * @namespace           js.string
 * @type      Function
 *
 * Upper first
 *
 * @param    {String}    string    The string to process
 * @return    {String}    The processed string with first letter uppercase
 *
 * @example    js
 * import upperFirst from '@coffeekraken/sugar/js/string/upperFirst'
 * upperFirst('hello world') // Hello world
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/time/convert.js":
/*!*********************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/time/convert.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = convert;
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

/***/ }),

/***/ "../../util/sugar/js/value/validateWithDefinitionObject.js":
/*!*******************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/value/validateWithDefinitionObject.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateWithDefinitionObject;

var _ofType = _interopRequireDefault(__webpack_require__(/*! ../is/ofType */ "../../util/sugar/js/is/ofType.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @name          validateWithDefinitionObject
 * @namespace     js.value
 * @type          Function
 *
 * This function take a value and check if it correspond to the passed definition object.
 * If the value pass the test, the function will return true, otherwise it will return
 * a string that describe the issue.
 *
 * @param         {Mixed}       value       The value to check
 * @param         {Object}      definitionObj     THe definition object
 * @param         {String}      [name=null]     A name for the check. Usefull for debugging purpose
 * @return         {Boolean|String}           true if the check is passed, a string describing the issue if not
 *
 * @example       js
 * import validateWithDefinitionObject from '@coffeekraken/sugar/js/value/validateWithDefinitionObject';
 * validateWithDefinitionObject(true, {
 *    type: 'Boolean|String',
 *    required: true
 * }); // => true
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


function validateWithDefinitionObject(value, definitionObj) {
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  // validate type
  if (value !== undefined && definitionObj.type) {
    var isOfTypeResult = (0, _ofType.default)(value, definitionObj.type, true);

    if (isOfTypeResult !== true) {
      return "".concat(name, ": ").concat(isOfTypeResult);
    }
  } // check required


  if (definitionObj.required === true) {
    if (value === null || value === undefined) {
      return "The property \"<yellow>".concat(name, "</yellow>\" is <green>required</green>...");
    }
  }

  return true;
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/webcomponent/SLitHtmlWebComponent.js":
/*!******************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/webcomponent/SLitHtmlWebComponent.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SLitHtmlWebComponent;

var _SWebComponent2 = _interopRequireDefault(__webpack_require__(/*! ./SWebComponent */ "../../util/sugar/js/webcomponent/SWebComponent.js"));

var _litHtml = __webpack_require__(/*! lit-html */ "../../util/sugar/node_modules/lit-html/lit-html.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
/**
 * @name              SLitHtmlWebComponent
 * @namespace           js.webcomponent
 * @type              Class
 * @extends           SWebComponent
 *
 * // TODO: example
 *
 * Base class that you can extends to create some SWebComponent with Lit Html rendering capabilities
 *
 * @param       {Object}        [settings={}]         A setting object to configure your webcomponent instance:
 * - defaultProps ({}) {Object}: Specify the default properties values
 * - physicalProps ([]) {Array<String>}: List all the properties that need to be ALWAYS on the html element (for styling purpose for example...)
 * - requiredProps ([]) {Array<String>}: List all the properties that MUST be passed to the component
 *
 * @example         js
 * import SLitHtmlWebComponent from '@coffeekraken/sugar/js/webcomponent/SLitHtmlWebComponent';
 * class MyCoolComponent extends SLitHtmlWebComponent {
 *
 *    constructor(settings = {}) {
 *      super(settings);
 *    }
 *
 * }
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


function SLitHtmlWebComponent() {
  var extend = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : HTMLElement;

  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_SWebComponent) {
    _inherits(SLitHtmlWebComponent, _SWebComponent);

    var _super = _createSuper(SLitHtmlWebComponent);
    /**
     * @name        template
     * @type        Function
     * @static
     *
     * This static variable store a function that has as parameter the state object
     * of your component and the lit-html ```html``` function that you can use in your template.
     * This function MUST return a template string representing your component HTML depending on the state
     * object at this point.
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */


    function SLitHtmlWebComponent() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _this;

      _classCallCheck(this, SLitHtmlWebComponent);

      _this = _super.call(this, settings);
      console.log('LIPT');
      return _this;
    }
    /**
     * @name          render
     * @type          Function
     *
     * This method is called every time an update has been made in the state object
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */


    _createClass(SLitHtmlWebComponent, [{
      key: "render",
      value: function render() {}
    }]);

    return SLitHtmlWebComponent;
  }((0, _SWebComponent2.default)(extend)), _defineProperty(_class, "template", (state, html) => "\n\n    "), _temp;
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/webcomponent/SWebComponent.js":
/*!***********************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/webcomponent/SWebComponent.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty2(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SWebComponent;

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../object/deepMerge */ "../../util/sugar/js/object/deepMerge.js"));

var _SPromise = _interopRequireDefault(__webpack_require__(/*! ../promise/SPromise */ "../../util/sugar/js/promise/SPromise.js"));

var _parse = _interopRequireDefault(__webpack_require__(/*! ../string/parse */ "../../util/sugar/js/string/parse.js"));

var _toString = _interopRequireDefault(__webpack_require__(/*! ../string/toString */ "../../util/sugar/js/string/toString.js"));

var _when = _interopRequireDefault(__webpack_require__(/*! ../dom/when */ "../../util/sugar/js/dom/when.js"));

var _camelize = _interopRequireDefault(__webpack_require__(/*! ../string/camelize */ "../../util/sugar/js/string/camelize.js"));

var _paramCase = _interopRequireDefault(__webpack_require__(/*! ../string/paramCase */ "../../util/sugar/js/string/paramCase.js"));

var _uncamelize = _interopRequireDefault(__webpack_require__(/*! ../string/uncamelize */ "../../util/sugar/js/string/uncamelize.js"));

var _validateWithDefinitionObject = _interopRequireDefault(__webpack_require__(/*! ../value/validateWithDefinitionObject */ "../../util/sugar/js/value/validateWithDefinitionObject.js"));

var _register = __webpack_require__(/*! ./register */ "../../util/sugar/js/webcomponent/register.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
/**
 * @name              SWebComponent
 * @namespace           js.webcomponent
 * @type              Class
 * @extends           HTMLElement
 *
 * // TODO: example
 *
 * Base class that allows you to create easily new webcomponents and handle things like attributes updates,
 * base css (scss) importing, etc... Here's a list a features that this class covers:
 * - Listen for attributes changes
 * - Mount the component at a certain point in time (inViewport, visible, etc...)
 * - **Automatically cast the attributes** to their proper js variable types (Array, Object, String, etc...)
 * - **Physical props** : Specify some props that will ALWAYS be present as attribute on the component for styling purpose
 * - Define some **default CSS** that will be injected in the head automatically
 * - Specify some **required props**
 * - **Full lifecycle management** through "events":
 * 	  - attach: Dispatched when the component is attached to the DOM
 *    - detach: Dispatched when the component is detached from the DOM
 *    - mounting: Dispatched when the component starts to mount itself (before mountWhen and mountDependencies execution)
 *    - mounted: Dispatched when the component has be mounted properly
 *    - prop|prop.{name}: Dispatched when a property has been updated, removed or added
 *      - The object format sended with the event is this one:
 *        - { prop: 'propName', action: 'update|remove|add', value: 'Something', previousValue: 'Other' }
 * - **Mount dependencies** : This will allows you to set some promises that have to be resolved before mounting the component
 *
 * @param       {Object}        [settings={}]         A setting object to configure your webcomponent instance:
 * - defaultProps ({}) {Object}: Specify the default properties values
 * - physicalProps ([]) {Array<String>}: List all the properties that need to be ALWAYS on the html element (for styling purpose for example...)
 * - requiredProps ([]) {Array<String>}: List all the properties that MUST be passed to the component
 *
 * @example         js
 * import SWebComponent from '@coffeekraken/sugar/js/webcomponent/SWebComponent';
 * class MyCoolComponent extends SWebComponent {
 *
 *    constructor() {
 *      super();
 *    }
 *
 * }
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


function SWebComponent() {
  var extend = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : HTMLElement;

  var _temp;

  return _temp = /*#__PURE__*/function (_extend) {
    _inherits(SWebComponent, _extend);

    var _super = _createSuper(SWebComponent);

    _createClass(SWebComponent, null, [{
      key: "observedAttributes",

      /**
       * @name          _promise
       * @type          SPromise
       * @private
       *
       * Store the SPromise instance used to "dispatch" some events
       * that you can subscribe using the "on" exposed method
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

      /**
       * @name          _props
       * @type          Object
       * @private
       *
       * Store all the computed properties setted using the "setProp" method or through the
       * attributes
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

      /**
       * @name          _settings
       * @type          Object
       * @private
       *
       * Store all the webcomponent settings like "physicalProps", "requiredProps", etc...
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      get: function get() {
        console.log('thguthught', this.props);
        return Object.keys(this.props);
      }
      /**
       * @name          constructor
       * @type          Function
       * @constructor
       *
       * Constructor
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }]);

    function SWebComponent() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _this;

      _classCallCheck(this, SWebComponent); // init base html element


      _this = _super.call(this); // save the settings

      _defineProperty(_assertThisInitialized(_this), "_settedAttributesStack", {});

      _defineProperty(_assertThisInitialized(_this), "_promise", null);

      _defineProperty(_assertThisInitialized(_this), "_props", {});

      _defineProperty(_assertThisInitialized(_this), "_settings", {});

      _this._settings = (0, _deepMerge.default)({
        name: null,
        props: _this.constructor.props || {}
      }, _register.stack[(0, _uncamelize.default)(_this.constructor.componentName)].settings || {}, settings); // create the SPromise instance

      _this._promise = new _SPromise.default(() => {}).start();

      for (var key in _this._settings.props) {
        _this._props[key] = _objectSpread(_objectSpread({}, _this._settings.props[key]), {}, {
          valuesStack: [],
          value: _this._settings.props[key].default,
          previousValue: undefined
        });

        if (_this._props[key].value !== undefined) {
          _this._props[key].valuesStack.push(_this._props[key].value);
        }
      } // launch the mounting process


      setTimeout(_this._mount.bind(_assertThisInitialized(_this)));
      return _this;
    }
    /**
     * @name          _mount
     * @type          Function
     * @private
     * @async
     *
     * This method handle the mounting of the component
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */


    _createClass(SWebComponent, [{
      key: "_mount",
      value: function () {
        var _mount2 = _asyncToGenerator(function* () {
          this._promise.trigger('mounting'); // wait until the component match the mountDependencies and mountWhen status


          yield this._mountDependencies(); // check props definition

          this._checkPropsDefinition(); // handle physical props


          this._handlePhysicalProps();

          this._promise.trigger('mounted');
        });

        function _mount() {
          return _mount2.apply(this, arguments);
        }

        return _mount;
      }()
      /**
       * @name          on
       * @type          Function
       *
       * Method used to subscribe to the "events" dispatched
       * during the lifecycle of the component. Here's the list of events:
       * - attach: Dispatched when the component is attached to the DOM
       * - detach: Dispatched when the component is detached from the DOM
       * - mounting: Dispatched when the component starts to mount itself (before mountWhen and mountDependencies execution)
       * - mounted: Dispatched when the component has be mounted properly
       * - prop|prop.{name}: Dispatched when a property has been updated, removed or added
       *    - The object format sended with the event is this one:
       *      - { prop: 'propName', action: 'update|remove|add', value: 'Something', previousValue: 'Other' }
       *
       * @param       {String}        event         The event you want to subscribe to
       * @param       {Function}      callback      The callback function that has to be called
       * @return      {SPromise}                    The SPromise used in this instance
       */

    }, {
      key: "on",
      value: function on(event, callback) {
        return this._promise.on(event, callback);
      }
      /**
       * @name          _mountDependencies
       * @type          Function
       * @private
       * @async
       *
       * This method simply delay the mounting process of the component
       * based on different settings "properties":
       * - mountWhen (null) {String}: Specify when you want the component to be mounted. Can be:
       *    - inViewport: Mount the component only when it appears in the viewport
       *    - visible: Mount the component when the component became visible (like display:none; to display:block; for example)
       *    - domReady: Mount the component when the DOM is ready
       *    - transitionEnd. Mount the component when the transition is ended
       * - mountDependencies (null) {Function|Array<Function>}: Specify one/some function(s) that returns a Promise and that need to be all resolved before mounting the component
       *
       * @return      {Promise}               Return a promise that will be resolved once every "dependencies" are satisfied
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "_mountDependencies",
      value: function _mountDependencies() {
        return new Promise((resolve, reject) => {
          var promises = []; // check if we have a "mountWhen" setting specified

          if (this._settings.mountWhen) {
            promises.push((0, _when.default)(this._settings.mountWhen));
          } // check if we have one/some "mountDependencies" setting specified


          if (this._settings._mountDependencies) {
            var depsFns = [...this._settings._mountDependencies];
            depsFns.forEach(fn => {
              promises.push(fn());
            });
          } // wait until all promises are resolved


          Promise.all(promises).then(() => {
            resolve();
          });
        });
      }
      /**
       * @name          connectedCallback
       * @type          Function
       *
       * Called when the component is attached to the dom
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        // dispatch "event"
        console.log('CONNEE');
        setTimeout(() => {
          this._promise.trigger('attach');
        });
      }
      /**
       * @name          disconnectedCallback
       * @type          Function
       *
       * Called when the component is detached from the dom
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        // dispatch "event"
        this._promise.trigger('detach');
      }
      /**
       * @name            attributeChangedCallback
       * @type            Function
       *
       * Called when an attribute is removed, added or updated
       *
       * @param     {String}      attrName      The attribute name
       * @param     {Mixed}       oldVal        The old attribute value
       * @param     {Mixed}       newVal        The new attribute value
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attrName, oldVal, newVal) {
        if (this._settedAttributesStack[attrName]) return; // try to get the property

        var propObj = this._props[attrName];
        var previousValue = (0, _parse.default)(oldVal);
        var newValue = (0, _parse.default)(newVal); // save the old value and the new value

        propObj.value = newValue;
        propObj.previousValue = previousValue;
        propObj.valuesStack.push(newValue);
        console.log(propObj); // save the prop
        // this._props[__camelize(attrName)] = newPropObj;
        // trigger a "prop" event

        this._triggerPropsEvents((0, _camelize.default)(attrName));
      }
      /**
       * @name        prop
       * @type        Function
       *
       * Get of set a property
       *
       * @param       {String}      prop      The property you want to get/set
       * @param       {Mixed}       [value=undefined]    The value you want to set
       * @return      {Mixed}                 The property value
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "prop",
      value: function prop(_prop) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        if (value === undefined) {
          return this._props[_prop] ? this._props[_prop].value : undefined;
        }

        this._props[_prop].previousValue = this._props[_prop].value;
        this._props[_prop].value = value;

        this._props[_prop].valuesStack.push(value); // handle physical props


        this._handlePhysicalProps(_prop); // trigger a "prop" event


        this._triggerPropsEvents(_prop);

        return value;
      }
      /**
       * @name        _triggerPropsEvents
       * @type        Function
       * @private
       *
       * This method simply trigger a prop|prop.{name} event through the SPromise instance.
       *
       * @param     {String}      prop      The property name to trigger event for
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "_triggerPropsEvents",
      value: function _triggerPropsEvents(prop) {
        // trigger a "prop" event
        var eventObj = {
          prop,
          action: this._props[prop].previousValue !== null ? this._props[prop].value !== null ? 'update' : 'remove' : 'add',
          value: this._props[prop].value,
          previousValue: this._props[prop].previousValue
        };

        this._promise.trigger('prop', eventObj);

        this._promise.trigger("prop.".concat(prop), eventObj);
      }
      /**
       * @name        _handlePhysicalProps
       * @type        Function
       * @private
       *
       * This method make sure that all the defined physical props are
       * setted as attribute on the DOM element
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "_handlePhysicalProps",
      value: function _handlePhysicalProps() {
        for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
          props[_key] = arguments[_key];
        }

        if (!props || props.length === 0) props = Object.keys(this._props); // loop on each required props

        props.forEach(prop => {
          var value = this._props[prop].value;

          if (!this.getAttribute(prop)) {
            // set the attribute with the value
            this._settedAttributesStack[prop] = true;
            this.setAttribute(prop, (0, _toString.default)(value));
            delete this._settedAttributesStack[prop];
          } else {
            var currentAttributeValue = this.getAttribute(prop);
            var currentValueStringified = (0, _toString.default)(value);

            if (currentAttributeValue !== currentValueStringified) {
              this._settedAttributesStack[prop] = true;
              this.setAttribute(prop, currentValueStringified);
              delete this._settedAttributesStack[prop];
            }
          }
        });
      }
      /**
       * @name        _checkPropsDefinition
       * @type        Function
       * @private
       *
       * This method simply check a property value depending on his definition such as type, required, etc...
       * If you pass no props to check, it will check all the registered ones.
       *
       * @param       {Array<String>|String}        ...props        The properties to check
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "_checkPropsDefinition",
      value: function _checkPropsDefinition() {
        for (var _len2 = arguments.length, props = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          props[_key2] = arguments[_key2];
        }

        if (!props || props.length === 0) props = Object.keys(this._props);
        props.forEach(prop => {
          var propObj = this._props[prop];
          var validationResult = (0, _validateWithDefinitionObject.default)(propObj.value, propObj, "".concat(this.constructor.name, ".props.").concat(prop));
          if (validationResult !== true) throw new Error(validationResult);
        });
      }
    }]);

    return SWebComponent;
  }(extend), _temp;
}

module.exports = exports.default;

/***/ }),

/***/ "../../util/sugar/js/webcomponent/register.js":
/*!******************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/js/webcomponent/register.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.define = define;
Object.defineProperty(exports, "SWebComponent", {
  enumerable: true,
  get: function get() {
    return _SWebComponent.default;
  }
});
Object.defineProperty(exports, "SLitHtmlWebComponent", {
  enumerable: true,
  get: function get() {
    return _SLitHtmlWebComponent.default;
  }
});
exports.stack = void 0;

var _SWebComponent = _interopRequireDefault(__webpack_require__(/*! ./SWebComponent */ "../../util/sugar/js/webcomponent/SWebComponent.js"));

var _SLitHtmlWebComponent = _interopRequireDefault(__webpack_require__(/*! ./SLitHtmlWebComponent */ "../../util/sugar/js/webcomponent/SLitHtmlWebComponent.js"));

var _getHtmlClassFromTagName = _interopRequireDefault(__webpack_require__(/*! ../html/getHtmlClassFromTagName */ "../../util/sugar/js/html/getHtmlClassFromTagName.js"));

var _uncamelize = _interopRequireDefault(__webpack_require__(/*! ../string/uncamelize */ "../../util/sugar/js/string/uncamelize.js"));

var _htmlTagToHtmlClassMap = _interopRequireDefault(__webpack_require__(/*! ../html/htmlTagToHtmlClassMap */ "../../util/sugar/js/html/htmlTagToHtmlClassMap.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var _SWebComponentStack = {};
exports.stack = _SWebComponentStack;

function define(name, cls) {
  var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!name) throw new Error("SWebComponent: You must define a name for your webcomponent by setting either a static \"name\" property on your class, of by passing a name as first parameter of the static \"define\" function...");
  cls.componentName = name;
  var extend = null;

  for (var key in _htmlTagToHtmlClassMap.default) {
    if (cls.prototype instanceof _htmlTagToHtmlClassMap.default[key]) {
      extend = key;
      break;
    }
  }

  var uncamelizedName = (0, _uncamelize.default)(name);
  _SWebComponentStack[uncamelizedName] = {
    name,
    class: cls,
    extends: extend,
    settings
  };

  if (window.customElements) {
    window.customElements.define(uncamelizedName, cls, {
      extends: extend
    });
  } else if (document.registerElement) {
    document.registerElement(uncamelizedName, {
      prototype: cls.prototype,
      extends: extend
    });
  } else {
    throw "Your browser does not support either document.registerElement or window.customElements.define webcomponents specification...";
  }
}

/***/ }),

/***/ "../../util/sugar/node_modules/base64-js/index.js":
/*!**********************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/base64-js/index.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "../../util/sugar/node_modules/boolbase/index.js":
/*!*********************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/boolbase/index.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
	trueFunc: function trueFunc(){
		return true;
	},
	falseFunc: function falseFunc(){
		return false;
	}
};

/***/ }),

/***/ "../../util/sugar/node_modules/copy-to/index.js":
/*!********************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/copy-to/index.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * copy-to - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */



/**
 * slice() reference.
 */

var slice = Array.prototype.slice;

/**
 * Expose copy
 *
 * ```
 * copy({foo: 'nar', hello: 'copy'}).to({hello: 'world'});
 * copy({foo: 'nar', hello: 'copy'}).toCover({hello: 'world'});
 * ```
 *
 * @param {Object} src
 * @return {Copy}
 */

module.exports = Copy;


/**
 * Copy
 * @param {Object} src
 * @param {Boolean} withAccess
 */

function Copy(src, withAccess) {
  if (!(this instanceof Copy)) return new Copy(src, withAccess);
  this.src = src;
  this._withAccess = withAccess;
}

/**
 * copy properties include getter and setter
 * @param {[type]} val [description]
 * @return {[type]} [description]
 */

Copy.prototype.withAccess = function (w) {
  this._withAccess = w !== false;
  return this;
};

/**
 * pick keys in src
 *
 * @api: public
 */

Copy.prototype.pick = function(keys) {
  if (!Array.isArray(keys)) {
    keys = slice.call(arguments);
  }
  if (keys.length) {
    this.keys = keys;
  }
  return this;
};

/**
 * copy src to target,
 * do not cover any property target has
 * @param {Object} to
 *
 * @api: public
 */

Copy.prototype.to = function(to) {
  to = to || {};

  if (!this.src) return to;
  var keys = this.keys || Object.keys(this.src);

  if (!this._withAccess) {
    for (var i = 0; i < keys.length; i++) {
      key = keys[i];
      if (to[key] !== undefined) continue;
      to[key] = this.src[key];
    }
    return to;
  }

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!notDefined(to, key)) continue;
    var getter = this.src.__lookupGetter__(key);
    var setter = this.src.__lookupSetter__(key);
    if (getter) to.__defineGetter__(key, getter);
    if (setter) to.__defineSetter__(key, setter);

    if (!getter && !setter) {
      to[key] = this.src[key];
    }
  }
  return to;
};

/**
 * copy src to target,
 * override any property target has
 * @param {Object} to
 *
 * @api: public
 */

Copy.prototype.toCover = function(to) {
  var keys = this.keys || Object.keys(this.src);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    delete to[key];
    var getter = this.src.__lookupGetter__(key);
    var setter = this.src.__lookupSetter__(key);
    if (getter) to.__defineGetter__(key, getter);
    if (setter) to.__defineSetter__(key, setter);

    if (!getter && !setter) {
      to[key] = this.src[key];
    }
  }
};

Copy.prototype.override = Copy.prototype.toCover;

/**
 * append another object to src
 * @param {Obj} obj
 * @return {Copy}
 */

Copy.prototype.and = function (obj) {
  var src = {};
  this.to(src);
  this.src = obj;
  this.to(src);
  this.src = src;

  return this;
};

/**
 * check obj[key] if not defiend
 * @param {Object} obj
 * @param {String} key
 * @return {Boolean}
 */

function notDefined(obj, key) {
  return obj[key] === undefined
    && obj.__lookupGetter__(key) === undefined
    && obj.__lookupSetter__(key) === undefined;
}


/***/ }),

/***/ "../../util/sugar/node_modules/dom-converter/lib/domConverter.js":
/*!*************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/dom-converter/lib/domConverter.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
var domToMarkup, object, objectToSaneObject, saneObjectToDom, self;

objectToSaneObject = __webpack_require__(/*! ./objectToSaneObject */ "../../util/sugar/node_modules/dom-converter/lib/objectToSaneObject.js");

saneObjectToDom = __webpack_require__(/*! ./saneObjectToDom */ "../../util/sugar/node_modules/dom-converter/lib/saneObjectToDom.js");

domToMarkup = __webpack_require__(/*! ./domToMarkup */ "../../util/sugar/node_modules/dom-converter/lib/domToMarkup.js");

object = __webpack_require__(/*! utila */ "../../util/sugar/node_modules/utila/lib/utila.js").object;

module.exports = self = {
  objectToDom: function(o) {
    o = self._object2SaneObject(o);
    return saneObjectToDom.convert(o);
  },
  object2markup: function(o) {
    var dom;
    dom = self.objectToDom(o);
    return domToMarkup.convert(dom);
  },
  domToMarkup: function(dom) {
    return domToMarkup.convert(dom);
  },
  _object2SaneObject: function(o) {
    if (!Array.isArray(o)) {
      if (!object.isBareObject(o)) {
        throw Error("toDom() only accepts arrays and bare objects as input");
      }
    }
    return objectToSaneObject.sanitize(o);
  }
};


/***/ }),

/***/ "../../util/sugar/node_modules/dom-converter/lib/domToMarkup.js":
/*!************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/dom-converter/lib/domToMarkup.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.7



/***/ }),

/***/ "../../util/sugar/node_modules/dom-converter/lib/objectToSaneObject.js":
/*!*******************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/dom-converter/lib/objectToSaneObject.js ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
var object, self,
  hasProp = {}.hasOwnProperty;

object = __webpack_require__(/*! utila */ "../../util/sugar/node_modules/utila/lib/utila.js").object;

module.exports = self = {
  sanitize: function(val) {
    return self._toChildren(val);
  },
  _toChildren: function(val) {
    var ref;
    if (object.isBareObject(val)) {
      return self._objectToChildren(val);
    } else if (Array.isArray(val)) {
      return self._arrayToChildren(val);
    } else if (val === null || typeof val === 'undefined') {
      return [];
    } else if ((ref = typeof val) === 'string' || ref === 'number') {
      return [String(val)];
    } else {
      throw Error("not a valid child node: `" + val);
    }
  },
  _objectToChildren: function(o) {
    var a, cur, key, val;
    a = [];
    for (key in o) {
      if (!hasProp.call(o, key)) continue;
      val = o[key];
      cur = {};
      cur[key] = self.sanitize(val);
      a.push(cur);
    }
    return a;
  },
  _arrayToChildren: function(a) {
    var i, len, ret, v;
    ret = [];
    for (i = 0, len = a.length; i < len; i++) {
      v = a[i];
      ret.push(self._toNode(v));
    }
    return ret;
  },
  _toNode: function(o) {
    var key, keys, obj, ref;
    if ((ref = typeof o) === 'string' || ref === 'number') {
      return String(o);
    } else if (object.isBareObject(o)) {
      keys = Object.keys(o);
      if (keys.length !== 1) {
        throw Error("a node must only have one key as tag name");
      }
      key = keys[0];
      obj = {};
      obj[key] = self._toChildren(o[key]);
      return obj;
    } else {
      throw Error("not a valid node: `" + o + "`");
    }
  }
};


/***/ }),

/***/ "../../util/sugar/node_modules/dom-converter/lib/saneObjectToDom.js":
/*!****************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/dom-converter/lib/saneObjectToDom.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.7
var self,
  hasProp = {}.hasOwnProperty;

module.exports = self = {
  convert: function(obj) {
    return self._arrayToChildren(obj);
  },
  _arrayToChildren: function(a, parent) {
    var children, j, len, node, prev, v;
    if (parent == null) {
      parent = null;
    }
    children = [];
    prev = null;
    for (j = 0, len = a.length; j < len; j++) {
      v = a[j];
      if (typeof v === 'string') {
        node = self._getTextNodeFor(v);
      } else {
        node = self._objectToNode(v, parent);
        node.prev = null;
        node.next = null;
        node.parent = parent;
        if (prev != null) {
          node.prev = prev;
          prev.next = node;
        }
        prev = node;
      }
      children.push(node);
    }
    return children;
  },
  _objectToNode: function(o) {
    var attribs, children, i, k, key, name, node, ref, v, val;
    i = 0;
    for (k in o) {
      if (!hasProp.call(o, k)) continue;
      v = o[k];
      if (i > 0) {
        throw Error("_objectToNode() only accepts an object with one key/value");
      }
      key = k;
      val = v;
      i++;
    }
    node = {};
    if (typeof key !== 'string') {
      throw Error("_objectToNode()'s key must be a string of tag name and classes");
    }
    if (typeof val === 'string') {
      children = [self._getTextNodeFor(val)];
    } else if (Array.isArray(val)) {
      children = self._arrayToChildren(val, node);
    } else {
      inspect(o);
      throw Error("_objectToNode()'s key's value must only be a string or an array");
    }
    node.type = 'tag';
    ref = self._parseTag(key), name = ref.name, attribs = ref.attribs;
    node.name = name;
    node.attribs = attribs;
    node.children = children;
    return node;
  },
  _getTextNodeFor: function(s) {
    return {
      type: 'text',
      data: s
    };
  },
  _nameRx: /^[a-zA-Z\-\_]{1}[a-zA-Z0-9\-\_]*$/,
  _parseTag: function(k) {
    var attribs, classes, cls, id, m, name, parts;
    if (!k.match(/^[a-zA-Z0-9\#\-\_\.\[\]\"\'\=\,\s]+$/) || k.match(/^[0-9]+/)) {
      throw Error("cannot parse tag `" + k + "`");
    }
    attribs = {};
    parts = {
      name: '',
      attribs: attribs
    };
    if (m = k.match(/^([^\.#]+)/)) {
      name = m[1];
      if (!name.match(self._nameRx)) {
        throw Error("tag name `" + name + "` is not valid");
      }
      parts.name = name;
      k = k.substr(name.length, k.length);
    }
    if (m = k.match(/^#([a-zA-Z0-9\-]+)/)) {
      id = m[1];
      if (!id.match(self._nameRx)) {
        throw Error("tag id `" + id + "` is not valid");
      }
      attribs.id = id;
      k = k.substr(id.length + 1, k.length);
    }
    classes = [];
    while (m = k.match(/\.([a-zA-Z0-9\-\_]+)/)) {
      cls = m[1];
      if (!cls.match(self._nameRx)) {
        throw Error("tag class `" + cls + "` is not valid");
      }
      classes.push(cls);
      k = k.replace('.' + cls, '');
    }
    if (classes.length) {
      attribs["class"] = classes.join(" ");
    }
    return parts;
  }
};


/***/ }),

/***/ "../../util/sugar/node_modules/dom-serializer/foreignNames.json":
/*!************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/dom-serializer/foreignNames.json ***!
  \************************************************************************************************************************/
/*! exports provided: elementNames, attributeNames, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"elementNames\":{\"altglyph\":\"altGlyph\",\"altglyphdef\":\"altGlyphDef\",\"altglyphitem\":\"altGlyphItem\",\"animatecolor\":\"animateColor\",\"animatemotion\":\"animateMotion\",\"animatetransform\":\"animateTransform\",\"clippath\":\"clipPath\",\"feblend\":\"feBlend\",\"fecolormatrix\":\"feColorMatrix\",\"fecomponenttransfer\":\"feComponentTransfer\",\"fecomposite\":\"feComposite\",\"feconvolvematrix\":\"feConvolveMatrix\",\"fediffuselighting\":\"feDiffuseLighting\",\"fedisplacementmap\":\"feDisplacementMap\",\"fedistantlight\":\"feDistantLight\",\"fedropshadow\":\"feDropShadow\",\"feflood\":\"feFlood\",\"fefunca\":\"feFuncA\",\"fefuncb\":\"feFuncB\",\"fefuncg\":\"feFuncG\",\"fefuncr\":\"feFuncR\",\"fegaussianblur\":\"feGaussianBlur\",\"feimage\":\"feImage\",\"femerge\":\"feMerge\",\"femergenode\":\"feMergeNode\",\"femorphology\":\"feMorphology\",\"feoffset\":\"feOffset\",\"fepointlight\":\"fePointLight\",\"fespecularlighting\":\"feSpecularLighting\",\"fespotlight\":\"feSpotLight\",\"fetile\":\"feTile\",\"feturbulence\":\"feTurbulence\",\"foreignobject\":\"foreignObject\",\"glyphref\":\"glyphRef\",\"lineargradient\":\"linearGradient\",\"radialgradient\":\"radialGradient\",\"textpath\":\"textPath\"},\"attributeNames\":{\"definitionurl\":\"definitionURL\",\"attributename\":\"attributeName\",\"attributetype\":\"attributeType\",\"basefrequency\":\"baseFrequency\",\"baseprofile\":\"baseProfile\",\"calcmode\":\"calcMode\",\"clippathunits\":\"clipPathUnits\",\"diffuseconstant\":\"diffuseConstant\",\"edgemode\":\"edgeMode\",\"filterunits\":\"filterUnits\",\"glyphref\":\"glyphRef\",\"gradienttransform\":\"gradientTransform\",\"gradientunits\":\"gradientUnits\",\"kernelmatrix\":\"kernelMatrix\",\"kernelunitlength\":\"kernelUnitLength\",\"keypoints\":\"keyPoints\",\"keysplines\":\"keySplines\",\"keytimes\":\"keyTimes\",\"lengthadjust\":\"lengthAdjust\",\"limitingconeangle\":\"limitingConeAngle\",\"markerheight\":\"markerHeight\",\"markerunits\":\"markerUnits\",\"markerwidth\":\"markerWidth\",\"maskcontentunits\":\"maskContentUnits\",\"maskunits\":\"maskUnits\",\"numoctaves\":\"numOctaves\",\"pathlength\":\"pathLength\",\"patterncontentunits\":\"patternContentUnits\",\"patterntransform\":\"patternTransform\",\"patternunits\":\"patternUnits\",\"pointsatx\":\"pointsAtX\",\"pointsaty\":\"pointsAtY\",\"pointsatz\":\"pointsAtZ\",\"preservealpha\":\"preserveAlpha\",\"preserveaspectratio\":\"preserveAspectRatio\",\"primitiveunits\":\"primitiveUnits\",\"refx\":\"refX\",\"refy\":\"refY\",\"repeatcount\":\"repeatCount\",\"repeatdur\":\"repeatDur\",\"requiredextensions\":\"requiredExtensions\",\"requiredfeatures\":\"requiredFeatures\",\"specularconstant\":\"specularConstant\",\"specularexponent\":\"specularExponent\",\"spreadmethod\":\"spreadMethod\",\"startoffset\":\"startOffset\",\"stddeviation\":\"stdDeviation\",\"stitchtiles\":\"stitchTiles\",\"surfacescale\":\"surfaceScale\",\"systemlanguage\":\"systemLanguage\",\"tablevalues\":\"tableValues\",\"targetx\":\"targetX\",\"targety\":\"targetY\",\"textlength\":\"textLength\",\"viewbox\":\"viewBox\",\"viewtarget\":\"viewTarget\",\"xchannelselector\":\"xChannelSelector\",\"ychannelselector\":\"yChannelSelector\",\"zoomandpan\":\"zoomAndPan\"}}");

/***/ }),

/***/ "../../util/sugar/node_modules/dom-serializer/index.js":
/*!***************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/dom-serializer/index.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Module dependencies
*/
var ElementType = __webpack_require__(/*! domelementtype */ "../../util/sugar/node_modules/dom-serializer/node_modules/domelementtype/lib/index.js");
var entities = __webpack_require__(/*! entities */ "../../util/sugar/node_modules/entities/lib/index.js");

/* mixed-case SVG and MathML tags & attributes
   recognized by the HTML parser, see
   https://html.spec.whatwg.org/multipage/parsing.html#parsing-main-inforeign
*/
var foreignNames = __webpack_require__(/*! ./foreignNames.json */ "../../util/sugar/node_modules/dom-serializer/foreignNames.json");
foreignNames.elementNames.__proto__ = null; /* use as a simple dictionary */
foreignNames.attributeNames.__proto__ = null;

var unencodedElements = {
  __proto__: null,
  style: true,
  script: true,
  xmp: true,
  iframe: true,
  noembed: true,
  noframes: true,
  plaintext: true,
  noscript: true
};

/*
  Format attributes
*/
function formatAttrs(attributes, opts) {
  if (!attributes) return;

  var output = '';
  var value;

  // Loop through the attributes
  for (var key in attributes) {
    value = attributes[key];
    if (output) {
      output += ' ';
    }

    if (opts.xmlMode === 'foreign') {
      /* fix up mixed-case attribute names */
      key = foreignNames.attributeNames[key] || key;
    }
    output += key;
    if ((value !== null && value !== '') || opts.xmlMode) {
      output +=
        '="' +
        (opts.decodeEntities
          ? entities.encodeXML(value)
          : value.replace(/\"/g, '&quot;')) +
        '"';
    }
  }

  return output;
}

/*
  Self-enclosing tags (stolen from node-htmlparser)
*/
var singleTag = {
  __proto__: null,
  area: true,
  base: true,
  basefont: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  isindex: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};

var render = (module.exports = function(dom, opts) {
  if (!Array.isArray(dom) && !dom.cheerio) dom = [dom];
  opts = opts || {};

  var output = '';

  for (var i = 0; i < dom.length; i++) {
    var elem = dom[i];

    if (elem.type === 'root') output += render(elem.children, opts);
    else if (ElementType.isTag(elem)) output += renderTag(elem, opts);
    else if (elem.type === ElementType.Directive)
      output += renderDirective(elem);
    else if (elem.type === ElementType.Comment) output += renderComment(elem);
    else if (elem.type === ElementType.CDATA) output += renderCdata(elem);
    else output += renderText(elem, opts);
  }

  return output;
});

var foreignModeIntegrationPoints = [
  'mi',
  'mo',
  'mn',
  'ms',
  'mtext',
  'annotation-xml',
  'foreignObject',
  'desc',
  'title'
];

function renderTag(elem, opts) {
  // Handle SVG / MathML in HTML
  if (opts.xmlMode === 'foreign') {
    /* fix up mixed-case element names */
    elem.name = foreignNames.elementNames[elem.name] || elem.name;
    /* exit foreign mode at integration points */
    if (
      elem.parent &&
      foreignModeIntegrationPoints.indexOf(elem.parent.name) >= 0
    )
      opts = Object.assign({}, opts, { xmlMode: false });
  }
  if (!opts.xmlMode && ['svg', 'math'].indexOf(elem.name) >= 0) {
    opts = Object.assign({}, opts, { xmlMode: 'foreign' });
  }

  var tag = '<' + elem.name;
  var attribs = formatAttrs(elem.attribs, opts);

  if (attribs) {
    tag += ' ' + attribs;
  }

  if (opts.xmlMode && (!elem.children || elem.children.length === 0)) {
    tag += '/>';
  } else {
    tag += '>';
    if (elem.children) {
      tag += render(elem.children, opts);
    }

    if (!singleTag[elem.name] || opts.xmlMode) {
      tag += '</' + elem.name + '>';
    }
  }

  return tag;
}

function renderDirective(elem) {
  return '<' + elem.data + '>';
}

function renderText(elem, opts) {
  var data = elem.data || '';

  // if entities weren't decoded, no need to encode them back
  if (
    opts.decodeEntities &&
    !(elem.parent && elem.parent.name in unencodedElements)
  ) {
    data = entities.encodeXML(data);
  }

  return data;
}

function renderCdata(elem) {
  return '<![CDATA[' + elem.children[0].data + ']]>';
}

function renderComment(elem) {
  return '<!--' + elem.data + '-->';
}


/***/ }),

/***/ "../../util/sugar/node_modules/dom-serializer/node_modules/domelementtype/lib/index.js":
/*!***********************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/dom-serializer/node_modules/domelementtype/lib/index.js ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests whether an element is a tag or not.
 *
 * @param elem Element to test
 */
function isTag(elem) {
    return (elem.type === "tag" /* Tag */ ||
        elem.type === "script" /* Script */ ||
        elem.type === "style" /* Style */);
}
exports.isTag = isTag;
// Exports for backwards compatibility
exports.Text = "text" /* Text */; //Text
exports.Directive = "directive" /* Directive */; //<? ... ?>
exports.Comment = "comment" /* Comment */; //<!-- ... -->
exports.Script = "script" /* Script */; //<script> tags
exports.Style = "style" /* Style */; //<style> tags
exports.Tag = "tag" /* Tag */; //Any tag
exports.CDATA = "cdata" /* CDATA */; //<![CDATA[ ... ]]>
exports.Doctype = "doctype" /* Doctype */;


/***/ }),

/***/ "../../util/sugar/node_modules/domelementtype/index.js":
/*!***************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/domelementtype/index.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//Types of elements found in the DOM
module.exports = {
	Text: "text", //Text
	Directive: "directive", //<? ... ?>
	Comment: "comment", //<!-- ... -->
	Script: "script", //<script> tags
	Style: "style", //<style> tags
	Tag: "tag", //Any tag
	CDATA: "cdata", //<![CDATA[ ... ]]>
	Doctype: "doctype",

	isTag: function(elem){
		return elem.type === "tag" || elem.type === "script" || elem.type === "style";
	}
};


/***/ }),

/***/ "../../util/sugar/node_modules/domhandler/index.js":
/*!***********************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/domhandler/index.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ElementType = __webpack_require__(/*! domelementtype */ "../../util/sugar/node_modules/domelementtype/index.js");

var re_whitespace = /\s+/g;
var NodePrototype = __webpack_require__(/*! ./lib/node */ "../../util/sugar/node_modules/domhandler/lib/node.js");
var ElementPrototype = __webpack_require__(/*! ./lib/element */ "../../util/sugar/node_modules/domhandler/lib/element.js");

function DomHandler(callback, options, elementCB){
	if(typeof callback === "object"){
		elementCB = options;
		options = callback;
		callback = null;
	} else if(typeof options === "function"){
		elementCB = options;
		options = defaultOpts;
	}
	this._callback = callback;
	this._options = options || defaultOpts;
	this._elementCB = elementCB;
	this.dom = [];
	this._done = false;
	this._tagStack = [];
	this._parser = this._parser || null;
}

//default options
var defaultOpts = {
	normalizeWhitespace: false, //Replace all whitespace with single spaces
	withStartIndices: false, //Add startIndex properties to nodes
	withEndIndices: false, //Add endIndex properties to nodes
};

DomHandler.prototype.onparserinit = function(parser){
	this._parser = parser;
};

//Resets the handler back to starting state
DomHandler.prototype.onreset = function(){
	DomHandler.call(this, this._callback, this._options, this._elementCB);
};

//Signals the handler that parsing is done
DomHandler.prototype.onend = function(){
	if(this._done) return;
	this._done = true;
	this._parser = null;
	this._handleCallback(null);
};

DomHandler.prototype._handleCallback =
DomHandler.prototype.onerror = function(error){
	if(typeof this._callback === "function"){
		this._callback(error, this.dom);
	} else {
		if(error) throw error;
	}
};

DomHandler.prototype.onclosetag = function(){
	//if(this._tagStack.pop().name !== name) this._handleCallback(Error("Tagname didn't match!"));
	
	var elem = this._tagStack.pop();

	if(this._options.withEndIndices && elem){
		elem.endIndex = this._parser.endIndex;
	}

	if(this._elementCB) this._elementCB(elem);
};

DomHandler.prototype._createDomElement = function(properties){
	if (!this._options.withDomLvl1) return properties;

	var element;
	if (properties.type === "tag") {
		element = Object.create(ElementPrototype);
	} else {
		element = Object.create(NodePrototype);
	}

	for (var key in properties) {
		if (properties.hasOwnProperty(key)) {
			element[key] = properties[key];
		}
	}

	return element;
};

DomHandler.prototype._addDomElement = function(element){
	var parent = this._tagStack[this._tagStack.length - 1];
	var siblings = parent ? parent.children : this.dom;
	var previousSibling = siblings[siblings.length - 1];

	element.next = null;

	if(this._options.withStartIndices){
		element.startIndex = this._parser.startIndex;
	}
	if(this._options.withEndIndices){
		element.endIndex = this._parser.endIndex;
	}

	if(previousSibling){
		element.prev = previousSibling;
		previousSibling.next = element;
	} else {
		element.prev = null;
	}

	siblings.push(element);
	element.parent = parent || null;
};

DomHandler.prototype.onopentag = function(name, attribs){
	var properties = {
		type: name === "script" ? ElementType.Script : name === "style" ? ElementType.Style : ElementType.Tag,
		name: name,
		attribs: attribs,
		children: []
	};

	var element = this._createDomElement(properties);

	this._addDomElement(element);

	this._tagStack.push(element);
};

DomHandler.prototype.ontext = function(data){
	//the ignoreWhitespace is officially dropped, but for now,
	//it's an alias for normalizeWhitespace
	var normalize = this._options.normalizeWhitespace || this._options.ignoreWhitespace;

	var lastTag;

	if(!this._tagStack.length && this.dom.length && (lastTag = this.dom[this.dom.length-1]).type === ElementType.Text){
		if(normalize){
			lastTag.data = (lastTag.data + data).replace(re_whitespace, " ");
		} else {
			lastTag.data += data;
		}
	} else {
		if(
			this._tagStack.length &&
			(lastTag = this._tagStack[this._tagStack.length - 1]) &&
			(lastTag = lastTag.children[lastTag.children.length - 1]) &&
			lastTag.type === ElementType.Text
		){
			if(normalize){
				lastTag.data = (lastTag.data + data).replace(re_whitespace, " ");
			} else {
				lastTag.data += data;
			}
		} else {
			if(normalize){
				data = data.replace(re_whitespace, " ");
			}

			var element = this._createDomElement({
				data: data,
				type: ElementType.Text
			});

			this._addDomElement(element);
		}
	}
};

DomHandler.prototype.oncomment = function(data){
	var lastTag = this._tagStack[this._tagStack.length - 1];

	if(lastTag && lastTag.type === ElementType.Comment){
		lastTag.data += data;
		return;
	}

	var properties = {
		data: data,
		type: ElementType.Comment
	};

	var element = this._createDomElement(properties);

	this._addDomElement(element);
	this._tagStack.push(element);
};

DomHandler.prototype.oncdatastart = function(){
	var properties = {
		children: [{
			data: "",
			type: ElementType.Text
		}],
		type: ElementType.CDATA
	};

	var element = this._createDomElement(properties);

	this._addDomElement(element);
	this._tagStack.push(element);
};

DomHandler.prototype.oncommentend = DomHandler.prototype.oncdataend = function(){
	this._tagStack.pop();
};

DomHandler.prototype.onprocessinginstruction = function(name, data){
	var element = this._createDomElement({
		name: name,
		data: data,
		type: ElementType.Directive
	});

	this._addDomElement(element);
};

module.exports = DomHandler;


/***/ }),

/***/ "../../util/sugar/node_modules/domhandler/lib/element.js":
/*!*****************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/domhandler/lib/element.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// DOM-Level-1-compliant structure
var NodePrototype = __webpack_require__(/*! ./node */ "../../util/sugar/node_modules/domhandler/lib/node.js");
var ElementPrototype = module.exports = Object.create(NodePrototype);

var domLvl1 = {
	tagName: "name"
};

Object.keys(domLvl1).forEach(function(key) {
	var shorthand = domLvl1[key];
	Object.defineProperty(ElementPrototype, key, {
		get: function() {
			return this[shorthand] || null;
		},
		set: function(val) {
			this[shorthand] = val;
			return val;
		}
	});
});


/***/ }),

/***/ "../../util/sugar/node_modules/domhandler/lib/node.js":
/*!**************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/domhandler/lib/node.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// This object will be used as the prototype for Nodes when creating a
// DOM-Level-1-compliant structure.
var NodePrototype = module.exports = {
	get firstChild() {
		var children = this.children;
		return children && children[0] || null;
	},
	get lastChild() {
		var children = this.children;
		return children && children[children.length - 1] || null;
	},
	get nodeType() {
		return nodeTypes[this.type] || nodeTypes.element;
	}
};

var domLvl1 = {
	tagName: "name",
	childNodes: "children",
	parentNode: "parent",
	previousSibling: "prev",
	nextSibling: "next",
	nodeValue: "data"
};

var nodeTypes = {
	element: 1,
	text: 3,
	cdata: 4,
	comment: 8
};

Object.keys(domLvl1).forEach(function(key) {
	var shorthand = domLvl1[key];
	Object.defineProperty(NodePrototype, key, {
		get: function() {
			return this[shorthand] || null;
		},
		set: function(val) {
			this[shorthand] = val;
			return val;
		}
	});
});


/***/ }),

/***/ "../../util/sugar/node_modules/domutils/index.js":
/*!*********************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/domutils/index.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DomUtils = module.exports;

[
	__webpack_require__(/*! ./lib/stringify */ "../../util/sugar/node_modules/domutils/lib/stringify.js"),
	__webpack_require__(/*! ./lib/traversal */ "../../util/sugar/node_modules/domutils/lib/traversal.js"),
	__webpack_require__(/*! ./lib/manipulation */ "../../util/sugar/node_modules/domutils/lib/manipulation.js"),
	__webpack_require__(/*! ./lib/querying */ "../../util/sugar/node_modules/domutils/lib/querying.js"),
	__webpack_require__(/*! ./lib/legacy */ "../../util/sugar/node_modules/domutils/lib/legacy.js"),
	__webpack_require__(/*! ./lib/helpers */ "../../util/sugar/node_modules/domutils/lib/helpers.js")
].forEach(function(ext){
	Object.keys(ext).forEach(function(key){
		DomUtils[key] = ext[key].bind(DomUtils);
	});
});


/***/ }),

/***/ "../../util/sugar/node_modules/domutils/lib/helpers.js":
/*!***************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/domutils/lib/helpers.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removeSubsets
// Given an array of nodes, remove any member that is contained by another.
exports.removeSubsets = function(nodes) {
	var idx = nodes.length, node, ancestor, replace;

	// Check if each node (or one of its ancestors) is already contained in the
	// array.
	while (--idx > -1) {
		node = ancestor = nodes[idx];

		// Temporarily remove the node under consideration
		nodes[idx] = null;
		replace = true;

		while (ancestor) {
			if (nodes.indexOf(ancestor) > -1) {
				replace = false;
				nodes.splice(idx, 1);
				break;
			}
			ancestor = ancestor.parent;
		}

		// If the node has been found to be unique, re-insert it.
		if (replace) {
			nodes[idx] = node;
		}
	}

	return nodes;
};

// Source: http://dom.spec.whatwg.org/#dom-node-comparedocumentposition
var POSITION = {
	DISCONNECTED: 1,
	PRECEDING: 2,
	FOLLOWING: 4,
	CONTAINS: 8,
	CONTAINED_BY: 16
};

// Compare the position of one node against another node in any other document.
// The return value is a bitmask with the following values:
//
// document order:
// > There is an ordering, document order, defined on all the nodes in the
// > document corresponding to the order in which the first character of the
// > XML representation of each node occurs in the XML representation of the
// > document after expansion of general entities. Thus, the document element
// > node will be the first node. Element nodes occur before their children.
// > Thus, document order orders element nodes in order of the occurrence of
// > their start-tag in the XML (after expansion of entities). The attribute
// > nodes of an element occur after the element and before its children. The
// > relative order of attribute nodes is implementation-dependent./
// Source:
// http://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-document-order
//
// @argument {Node} nodaA The first node to use in the comparison
// @argument {Node} nodeB The second node to use in the comparison
//
// @return {Number} A bitmask describing the input nodes' relative position.
//         See http://dom.spec.whatwg.org/#dom-node-comparedocumentposition for
//         a description of these values.
var comparePos = exports.compareDocumentPosition = function(nodeA, nodeB) {
	var aParents = [];
	var bParents = [];
	var current, sharedParent, siblings, aSibling, bSibling, idx;

	if (nodeA === nodeB) {
		return 0;
	}

	current = nodeA;
	while (current) {
		aParents.unshift(current);
		current = current.parent;
	}
	current = nodeB;
	while (current) {
		bParents.unshift(current);
		current = current.parent;
	}

	idx = 0;
	while (aParents[idx] === bParents[idx]) {
		idx++;
	}

	if (idx === 0) {
		return POSITION.DISCONNECTED;
	}

	sharedParent = aParents[idx - 1];
	siblings = sharedParent.children;
	aSibling = aParents[idx];
	bSibling = bParents[idx];

	if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
		if (sharedParent === nodeB) {
			return POSITION.FOLLOWING | POSITION.CONTAINED_BY;
		}
		return POSITION.FOLLOWING;
	} else {
		if (sharedParent === nodeA) {
			return POSITION.PRECEDING | POSITION.CONTAINS;
		}
		return POSITION.PRECEDING;
	}
};

// Sort an array of nodes based on their relative position in the document and
// remove any duplicate nodes. If the array contains nodes that do not belong
// to the same document, sort order is unspecified.
//
// @argument {Array} nodes Array of DOM nodes
//
// @returns {Array} collection of unique nodes, sorted in document order
exports.uniqueSort = function(nodes) {
	var idx = nodes.length, node, position;

	nodes = nodes.slice();

	while (--idx > -1) {
		node = nodes[idx];
		position = nodes.indexOf(node);
		if (position > -1 && position < idx) {
			nodes.splice(idx, 1);
		}
	}
	nodes.sort(function(a, b) {
		var relative = comparePos(a, b);
		if (relative & POSITION.PRECEDING) {
			return -1;
		} else if (relative & POSITION.FOLLOWING) {
			return 1;
		}
		return 0;
	});

	return nodes;
};


/***/ }),

/***/ "../../util/sugar/node_modules/domutils/lib/legacy.js":
/*!**************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/domutils/lib/legacy.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ElementType = __webpack_require__(/*! domelementtype */ "../../util/sugar/node_modules/domelementtype/index.js");
var isTag = exports.isTag = ElementType.isTag;

exports.testElement = function(options, element){
	for(var key in options){
		if(!options.hasOwnProperty(key));
		else if(key === "tag_name"){
			if(!isTag(element) || !options.tag_name(element.name)){
				return false;
			}
		} else if(key === "tag_type"){
			if(!options.tag_type(element.type)) return false;
		} else if(key === "tag_contains"){
			if(isTag(element) || !options.tag_contains(element.data)){
				return false;
			}
		} else if(!element.attribs || !options[key](element.attribs[key])){
			return false;
		}
	}
	return true;
};

var Checks = {
	tag_name: function(name){
		if(typeof name === "function"){
			return function(elem){ return isTag(elem) && name(elem.name); };
		} else if(name === "*"){
			return isTag;
		} else {
			return function(elem){ return isTag(elem) && elem.name === name; };
		}
	},
	tag_type: function(type){
		if(typeof type === "function"){
			return function(elem){ return type(elem.type); };
		} else {
			return function(elem){ return elem.type === type; };
		}
	},
	tag_contains: function(data){
		if(typeof data === "function"){
			return function(elem){ return !isTag(elem) && data(elem.data); };
		} else {
			return function(elem){ return !isTag(elem) && elem.data === data; };
		}
	}
};

function getAttribCheck(attrib, value){
	if(typeof value === "function"){
		return function(elem){ return elem.attribs && value(elem.attribs[attrib]); };
	} else {
		return function(elem){ return elem.attribs && elem.attribs[attrib] === value; };
	}
}

function combineFuncs(a, b){
	return function(elem){
		return a(elem) || b(elem);
	};
}

exports.getElements = function(options, element, recurse, limit){
	var funcs = Object.keys(options).map(function(key){
		var value = options[key];
		return key in Checks ? Checks[key](value) : getAttribCheck(key, value);
	});

	return funcs.length === 0 ? [] : this.filter(
		funcs.reduce(combineFuncs),
		element, recurse, limit
	);
};

exports.getElementById = function(id, element, recurse){
	if(!Array.isArray(element)) element = [element];
	return this.findOne(getAttribCheck("id", id), element, recurse !== false);
};

exports.getElementsByTagName = function(name, element, recurse, limit){
	return this.filter(Checks.tag_name(name), element, recurse, limit);
};

exports.getElementsByTagType = function(type, element, recurse, limit){
	return this.filter(Checks.tag_type(type), element, recurse, limit);
};


/***/ }),

/***/ "../../util/sugar/node_modules/domutils/lib/manipulation.js":
/*!********************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/domutils/lib/manipulation.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.removeElement = function(elem){
	if(elem.prev) elem.prev.next = elem.next;
	if(elem.next) elem.next.prev = elem.prev;

	if(elem.parent){
		var childs = elem.parent.children;
		childs.splice(childs.lastIndexOf(elem), 1);
	}
};

exports.replaceElement = function(elem, replacement){
	var prev = replacement.prev = elem.prev;
	if(prev){
		prev.next = replacement;
	}

	var next = replacement.next = elem.next;
	if(next){
		next.prev = replacement;
	}

	var parent = replacement.parent = elem.parent;
	if(parent){
		var childs = parent.children;
		childs[childs.lastIndexOf(elem)] = replacement;
	}
};

exports.appendChild = function(elem, child){
	child.parent = elem;

	if(elem.children.push(child) !== 1){
		var sibling = elem.children[elem.children.length - 2];
		sibling.next = child;
		child.prev = sibling;
		child.next = null;
	}
};

exports.append = function(elem, next){
	var parent = elem.parent,
		currNext = elem.next;

	next.next = currNext;
	next.prev = elem;
	elem.next = next;
	next.parent = parent;

	if(currNext){
		currNext.prev = next;
		if(parent){
			var childs = parent.children;
			childs.splice(childs.lastIndexOf(currNext), 0, next);
		}
	} else if(parent){
		parent.children.push(next);
	}
};

exports.prepend = function(elem, prev){
	var parent = elem.parent;
	if(parent){
		var childs = parent.children;
		childs.splice(childs.lastIndexOf(elem), 0, prev);
	}

	if(elem.prev){
		elem.prev.next = prev;
	}
	
	prev.parent = parent;
	prev.prev = elem.prev;
	prev.next = elem;
	elem.prev = prev;
};




/***/ }),

/***/ "../../util/sugar/node_modules/domutils/lib/querying.js":
/*!****************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/domutils/lib/querying.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isTag = __webpack_require__(/*! domelementtype */ "../../util/sugar/node_modules/domelementtype/index.js").isTag;

module.exports = {
	filter: filter,
	find: find,
	findOneChild: findOneChild,
	findOne: findOne,
	existsOne: existsOne,
	findAll: findAll
};

function filter(test, element, recurse, limit){
	if(!Array.isArray(element)) element = [element];

	if(typeof limit !== "number" || !isFinite(limit)){
		limit = Infinity;
	}
	return find(test, element, recurse !== false, limit);
}

function find(test, elems, recurse, limit){
	var result = [], childs;

	for(var i = 0, j = elems.length; i < j; i++){
		if(test(elems[i])){
			result.push(elems[i]);
			if(--limit <= 0) break;
		}

		childs = elems[i].children;
		if(recurse && childs && childs.length > 0){
			childs = find(test, childs, recurse, limit);
			result = result.concat(childs);
			limit -= childs.length;
			if(limit <= 0) break;
		}
	}

	return result;
}

function findOneChild(test, elems){
	for(var i = 0, l = elems.length; i < l; i++){
		if(test(elems[i])) return elems[i];
	}

	return null;
}

function findOne(test, elems){
	var elem = null;

	for(var i = 0, l = elems.length; i < l && !elem; i++){
		if(!isTag(elems[i])){
			continue;
		} else if(test(elems[i])){
			elem = elems[i];
		} else if(elems[i].children.length > 0){
			elem = findOne(test, elems[i].children);
		}
	}

	return elem;
}

function existsOne(test, elems){
	for(var i = 0, l = elems.length; i < l; i++){
		if(
			isTag(elems[i]) && (
				test(elems[i]) || (
					elems[i].children.length > 0 &&
					existsOne(test, elems[i].children)
				)
			)
		){
			return true;
		}
	}

	return false;
}

function findAll(test, rootElems){
	var result = [];
	var stack = rootElems.slice();
	while(stack.length){
		var elem = stack.shift();
		if(!isTag(elem)) continue;
		if (elem.children && elem.children.length > 0) {
			stack.unshift.apply(stack, elem.children);
		}
		if(test(elem)) result.push(elem);
	}
	return result;
}


/***/ }),

/***/ "../../util/sugar/node_modules/domutils/lib/stringify.js":
/*!*****************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/domutils/lib/stringify.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ElementType = __webpack_require__(/*! domelementtype */ "../../util/sugar/node_modules/domelementtype/index.js"),
    getOuterHTML = __webpack_require__(/*! dom-serializer */ "../../util/sugar/node_modules/dom-serializer/index.js"),
    isTag = ElementType.isTag;

module.exports = {
	getInnerHTML: getInnerHTML,
	getOuterHTML: getOuterHTML,
	getText: getText
};

function getInnerHTML(elem, opts){
	return elem.children ? elem.children.map(function(elem){
		return getOuterHTML(elem, opts);
	}).join("") : "";
}

function getText(elem){
	if(Array.isArray(elem)) return elem.map(getText).join("");
	if(isTag(elem)) return elem.name === "br" ? "\n" : getText(elem.children);
	if(elem.type === ElementType.CDATA) return getText(elem.children);
	if(elem.type === ElementType.Text) return elem.data;
	return "";
}


/***/ }),

/***/ "../../util/sugar/node_modules/domutils/lib/traversal.js":
/*!*****************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/domutils/lib/traversal.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var getChildren = exports.getChildren = function(elem){
	return elem.children;
};

var getParent = exports.getParent = function(elem){
	return elem.parent;
};

exports.getSiblings = function(elem){
	var parent = getParent(elem);
	return parent ? getChildren(parent) : [elem];
};

exports.getAttributeValue = function(elem, name){
	return elem.attribs && elem.attribs[name];
};

exports.hasAttrib = function(elem, name){
	return !!elem.attribs && hasOwnProperty.call(elem.attribs, name);
};

exports.getName = function(elem){
	return elem.name;
};


/***/ }),

/***/ "../../util/sugar/node_modules/entities/lib/decode.js":
/*!**************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/entities/lib/decode.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeHTML = exports.decodeHTMLStrict = exports.decodeXML = void 0;
var entities_json_1 = __importDefault(__webpack_require__(/*! ./maps/entities.json */ "../../util/sugar/node_modules/entities/lib/maps/entities.json"));
var legacy_json_1 = __importDefault(__webpack_require__(/*! ./maps/legacy.json */ "../../util/sugar/node_modules/entities/lib/maps/legacy.json"));
var xml_json_1 = __importDefault(__webpack_require__(/*! ./maps/xml.json */ "../../util/sugar/node_modules/entities/lib/maps/xml.json"));
var decode_codepoint_1 = __importDefault(__webpack_require__(/*! ./decode_codepoint */ "../../util/sugar/node_modules/entities/lib/decode_codepoint.js"));
exports.decodeXML = getStrictDecoder(xml_json_1.default);
exports.decodeHTMLStrict = getStrictDecoder(entities_json_1.default);
function getStrictDecoder(map) {
    var keys = Object.keys(map).join("|");
    var replace = getReplacer(map);
    keys += "|#[xX][\\da-fA-F]+|#\\d+";
    var re = new RegExp("&(?:" + keys + ");", "g");
    return function (str) { return String(str).replace(re, replace); };
}
var sorter = function (a, b) { return (a < b ? 1 : -1); };
exports.decodeHTML = (function () {
    var legacy = Object.keys(legacy_json_1.default).sort(sorter);
    var keys = Object.keys(entities_json_1.default).sort(sorter);
    for (var i = 0, j = 0; i < keys.length; i++) {
        if (legacy[j] === keys[i]) {
            keys[i] += ";?";
            j++;
        }
        else {
            keys[i] += ";";
        }
    }
    var re = new RegExp("&(?:" + keys.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g");
    var replace = getReplacer(entities_json_1.default);
    function replacer(str) {
        if (str.substr(-1) !== ";")
            str += ";";
        return replace(str);
    }
    //TODO consider creating a merged map
    return function (str) { return String(str).replace(re, replacer); };
})();
function getReplacer(map) {
    return function replace(str) {
        if (str.charAt(1) === "#") {
            var secondChar = str.charAt(2);
            if (secondChar === "X" || secondChar === "x") {
                return decode_codepoint_1.default(parseInt(str.substr(3), 16));
            }
            return decode_codepoint_1.default(parseInt(str.substr(2), 10));
        }
        return map[str.slice(1, -1)];
    };
}


/***/ }),

/***/ "../../util/sugar/node_modules/entities/lib/decode_codepoint.js":
/*!************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/entities/lib/decode_codepoint.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var decode_json_1 = __importDefault(__webpack_require__(/*! ./maps/decode.json */ "../../util/sugar/node_modules/entities/lib/maps/decode.json"));
// modified version of https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
function decodeCodePoint(codePoint) {
    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
        return "\uFFFD";
    }
    if (codePoint in decode_json_1.default) {
        codePoint = decode_json_1.default[codePoint];
    }
    var output = "";
    if (codePoint > 0xffff) {
        codePoint -= 0x10000;
        output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
        codePoint = 0xdc00 | (codePoint & 0x3ff);
    }
    output += String.fromCharCode(codePoint);
    return output;
}
exports.default = decodeCodePoint;


/***/ }),

/***/ "../../util/sugar/node_modules/entities/lib/encode.js":
/*!**************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/entities/lib/encode.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.escape = exports.encodeHTML = exports.encodeXML = void 0;
var xml_json_1 = __importDefault(__webpack_require__(/*! ./maps/xml.json */ "../../util/sugar/node_modules/entities/lib/maps/xml.json"));
var inverseXML = getInverseObj(xml_json_1.default);
var xmlReplacer = getInverseReplacer(inverseXML);
exports.encodeXML = getInverse(inverseXML, xmlReplacer);
var entities_json_1 = __importDefault(__webpack_require__(/*! ./maps/entities.json */ "../../util/sugar/node_modules/entities/lib/maps/entities.json"));
var inverseHTML = getInverseObj(entities_json_1.default);
var htmlReplacer = getInverseReplacer(inverseHTML);
exports.encodeHTML = getInverse(inverseHTML, htmlReplacer);
function getInverseObj(obj) {
    return Object.keys(obj)
        .sort()
        .reduce(function (inverse, name) {
        inverse[obj[name]] = "&" + name + ";";
        return inverse;
    }, {});
}
function getInverseReplacer(inverse) {
    var single = [];
    var multiple = [];
    for (var _i = 0, _a = Object.keys(inverse); _i < _a.length; _i++) {
        var k = _a[_i];
        if (k.length === 1) {
            // Add value to single array
            single.push("\\" + k);
        }
        else {
            // Add value to multiple array
            multiple.push(k);
        }
    }
    // Add ranges to single characters.
    single.sort();
    for (var start = 0; start < single.length - 1; start++) {
        // Find the end of a run of characters
        var end = start;
        while (end < single.length - 1 &&
            single[end].charCodeAt(1) + 1 === single[end + 1].charCodeAt(1)) {
            end += 1;
        }
        var count = 1 + end - start;
        // We want to replace at least three characters
        if (count < 3)
            continue;
        single.splice(start, count, single[start] + "-" + single[end]);
    }
    multiple.unshift("[" + single.join("") + "]");
    return new RegExp(multiple.join("|"), "g");
}
var reNonASCII = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g;
function singleCharReplacer(c) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return "&#x" + c.codePointAt(0).toString(16).toUpperCase() + ";";
}
function getInverse(inverse, re) {
    return function (data) {
        return data
            .replace(re, function (name) { return inverse[name]; })
            .replace(reNonASCII, singleCharReplacer);
    };
}
var reXmlChars = getInverseReplacer(inverseXML);
function escape(data) {
    return data
        .replace(reXmlChars, singleCharReplacer)
        .replace(reNonASCII, singleCharReplacer);
}
exports.escape = escape;


/***/ }),

/***/ "../../util/sugar/node_modules/entities/lib/index.js":
/*!*************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/entities/lib/index.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.decodeStrict = exports.decode = void 0;
var decode_1 = __webpack_require__(/*! ./decode */ "../../util/sugar/node_modules/entities/lib/decode.js");
var encode_1 = __webpack_require__(/*! ./encode */ "../../util/sugar/node_modules/entities/lib/encode.js");
/**
 * Decodes a string with entities.
 *
 * @param data String to decode.
 * @param level Optional level to decode at. 0 = XML, 1 = HTML. Default is 0.
 */
function decode(data, level) {
    return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTML)(data);
}
exports.decode = decode;
/**
 * Decodes a string with entities. Does not allow missing trailing semicolons for entities.
 *
 * @param data String to decode.
 * @param level Optional level to decode at. 0 = XML, 1 = HTML. Default is 0.
 */
function decodeStrict(data, level) {
    return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTMLStrict)(data);
}
exports.decodeStrict = decodeStrict;
/**
 * Encodes a string with entities.
 *
 * @param data String to encode.
 * @param level Optional level to encode at. 0 = XML, 1 = HTML. Default is 0.
 */
function encode(data, level) {
    return (!level || level <= 0 ? encode_1.encodeXML : encode_1.encodeHTML)(data);
}
exports.encode = encode;
var encode_2 = __webpack_require__(/*! ./encode */ "../../util/sugar/node_modules/entities/lib/encode.js");
Object.defineProperty(exports, "encodeXML", { enumerable: true, get: function () { return encode_2.encodeXML; } });
Object.defineProperty(exports, "encodeHTML", { enumerable: true, get: function () { return encode_2.encodeHTML; } });
Object.defineProperty(exports, "escape", { enumerable: true, get: function () { return encode_2.escape; } });
// Legacy aliases
Object.defineProperty(exports, "encodeHTML4", { enumerable: true, get: function () { return encode_2.encodeHTML; } });
Object.defineProperty(exports, "encodeHTML5", { enumerable: true, get: function () { return encode_2.encodeHTML; } });
var decode_2 = __webpack_require__(/*! ./decode */ "../../util/sugar/node_modules/entities/lib/decode.js");
Object.defineProperty(exports, "decodeXML", { enumerable: true, get: function () { return decode_2.decodeXML; } });
Object.defineProperty(exports, "decodeHTML", { enumerable: true, get: function () { return decode_2.decodeHTML; } });
Object.defineProperty(exports, "decodeHTMLStrict", { enumerable: true, get: function () { return decode_2.decodeHTMLStrict; } });
// Legacy aliases
Object.defineProperty(exports, "decodeHTML4", { enumerable: true, get: function () { return decode_2.decodeHTML; } });
Object.defineProperty(exports, "decodeHTML5", { enumerable: true, get: function () { return decode_2.decodeHTML; } });
Object.defineProperty(exports, "decodeHTML4Strict", { enumerable: true, get: function () { return decode_2.decodeHTMLStrict; } });
Object.defineProperty(exports, "decodeHTML5Strict", { enumerable: true, get: function () { return decode_2.decodeHTMLStrict; } });
Object.defineProperty(exports, "decodeXMLStrict", { enumerable: true, get: function () { return decode_2.decodeXML; } });


/***/ }),

/***/ "../../util/sugar/node_modules/entities/lib/maps/decode.json":
/*!*********************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/entities/lib/maps/decode.json ***!
  \*********************************************************************************************************************/
/*! exports provided: 0, 128, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 142, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 158, 159, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"0\":65533,\"128\":8364,\"130\":8218,\"131\":402,\"132\":8222,\"133\":8230,\"134\":8224,\"135\":8225,\"136\":710,\"137\":8240,\"138\":352,\"139\":8249,\"140\":338,\"142\":381,\"145\":8216,\"146\":8217,\"147\":8220,\"148\":8221,\"149\":8226,\"150\":8211,\"151\":8212,\"152\":732,\"153\":8482,\"154\":353,\"155\":8250,\"156\":339,\"158\":382,\"159\":376}");

/***/ }),

/***/ "../../util/sugar/node_modules/entities/lib/maps/entities.json":
/*!***********************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/entities/lib/maps/entities.json ***!
  \***********************************************************************************************************************/
/*! exports provided: Aacute, aacute, Abreve, abreve, ac, acd, acE, Acirc, acirc, acute, Acy, acy, AElig, aelig, af, Afr, afr, Agrave, agrave, alefsym, aleph, Alpha, alpha, Amacr, amacr, amalg, amp, AMP, andand, And, and, andd, andslope, andv, ang, ange, angle, angmsdaa, angmsdab, angmsdac, angmsdad, angmsdae, angmsdaf, angmsdag, angmsdah, angmsd, angrt, angrtvb, angrtvbd, angsph, angst, angzarr, Aogon, aogon, Aopf, aopf, apacir, ap, apE, ape, apid, apos, ApplyFunction, approx, approxeq, Aring, aring, Ascr, ascr, Assign, ast, asymp, asympeq, Atilde, atilde, Auml, auml, awconint, awint, backcong, backepsilon, backprime, backsim, backsimeq, Backslash, Barv, barvee, barwed, Barwed, barwedge, bbrk, bbrktbrk, bcong, Bcy, bcy, bdquo, becaus, because, Because, bemptyv, bepsi, bernou, Bernoullis, Beta, beta, beth, between, Bfr, bfr, bigcap, bigcirc, bigcup, bigodot, bigoplus, bigotimes, bigsqcup, bigstar, bigtriangledown, bigtriangleup, biguplus, bigvee, bigwedge, bkarow, blacklozenge, blacksquare, blacktriangle, blacktriangledown, blacktriangleleft, blacktriangleright, blank, blk12, blk14, blk34, block, bne, bnequiv, bNot, bnot, Bopf, bopf, bot, bottom, bowtie, boxbox, boxdl, boxdL, boxDl, boxDL, boxdr, boxdR, boxDr, boxDR, boxh, boxH, boxhd, boxHd, boxhD, boxHD, boxhu, boxHu, boxhU, boxHU, boxminus, boxplus, boxtimes, boxul, boxuL, boxUl, boxUL, boxur, boxuR, boxUr, boxUR, boxv, boxV, boxvh, boxvH, boxVh, boxVH, boxvl, boxvL, boxVl, boxVL, boxvr, boxvR, boxVr, boxVR, bprime, breve, Breve, brvbar, bscr, Bscr, bsemi, bsim, bsime, bsolb, bsol, bsolhsub, bull, bullet, bump, bumpE, bumpe, Bumpeq, bumpeq, Cacute, cacute, capand, capbrcup, capcap, cap, Cap, capcup, capdot, CapitalDifferentialD, caps, caret, caron, Cayleys, ccaps, Ccaron, ccaron, Ccedil, ccedil, Ccirc, ccirc, Cconint, ccups, ccupssm, Cdot, cdot, cedil, Cedilla, cemptyv, cent, centerdot, CenterDot, cfr, Cfr, CHcy, chcy, check, checkmark, Chi, chi, circ, circeq, circlearrowleft, circlearrowright, circledast, circledcirc, circleddash, CircleDot, circledR, circledS, CircleMinus, CirclePlus, CircleTimes, cir, cirE, cire, cirfnint, cirmid, cirscir, ClockwiseContourIntegral, CloseCurlyDoubleQuote, CloseCurlyQuote, clubs, clubsuit, colon, Colon, Colone, colone, coloneq, comma, commat, comp, compfn, complement, complexes, cong, congdot, Congruent, conint, Conint, ContourIntegral, copf, Copf, coprod, Coproduct, copy, COPY, copysr, CounterClockwiseContourIntegral, crarr, cross, Cross, Cscr, cscr, csub, csube, csup, csupe, ctdot, cudarrl, cudarrr, cuepr, cuesc, cularr, cularrp, cupbrcap, cupcap, CupCap, cup, Cup, cupcup, cupdot, cupor, cups, curarr, curarrm, curlyeqprec, curlyeqsucc, curlyvee, curlywedge, curren, curvearrowleft, curvearrowright, cuvee, cuwed, cwconint, cwint, cylcty, dagger, Dagger, daleth, darr, Darr, dArr, dash, Dashv, dashv, dbkarow, dblac, Dcaron, dcaron, Dcy, dcy, ddagger, ddarr, DD, dd, DDotrahd, ddotseq, deg, Del, Delta, delta, demptyv, dfisht, Dfr, dfr, dHar, dharl, dharr, DiacriticalAcute, DiacriticalDot, DiacriticalDoubleAcute, DiacriticalGrave, DiacriticalTilde, diam, diamond, Diamond, diamondsuit, diams, die, DifferentialD, digamma, disin, div, divide, divideontimes, divonx, DJcy, djcy, dlcorn, dlcrop, dollar, Dopf, dopf, Dot, dot, DotDot, doteq, doteqdot, DotEqual, dotminus, dotplus, dotsquare, doublebarwedge, DoubleContourIntegral, DoubleDot, DoubleDownArrow, DoubleLeftArrow, DoubleLeftRightArrow, DoubleLeftTee, DoubleLongLeftArrow, DoubleLongLeftRightArrow, DoubleLongRightArrow, DoubleRightArrow, DoubleRightTee, DoubleUpArrow, DoubleUpDownArrow, DoubleVerticalBar, DownArrowBar, downarrow, DownArrow, Downarrow, DownArrowUpArrow, DownBreve, downdownarrows, downharpoonleft, downharpoonright, DownLeftRightVector, DownLeftTeeVector, DownLeftVectorBar, DownLeftVector, DownRightTeeVector, DownRightVectorBar, DownRightVector, DownTeeArrow, DownTee, drbkarow, drcorn, drcrop, Dscr, dscr, DScy, dscy, dsol, Dstrok, dstrok, dtdot, dtri, dtrif, duarr, duhar, dwangle, DZcy, dzcy, dzigrarr, Eacute, eacute, easter, Ecaron, ecaron, Ecirc, ecirc, ecir, ecolon, Ecy, ecy, eDDot, Edot, edot, eDot, ee, efDot, Efr, efr, eg, Egrave, egrave, egs, egsdot, el, Element, elinters, ell, els, elsdot, Emacr, emacr, empty, emptyset, EmptySmallSquare, emptyv, EmptyVerySmallSquare, emsp13, emsp14, emsp, ENG, eng, ensp, Eogon, eogon, Eopf, eopf, epar, eparsl, eplus, epsi, Epsilon, epsilon, epsiv, eqcirc, eqcolon, eqsim, eqslantgtr, eqslantless, Equal, equals, EqualTilde, equest, Equilibrium, equiv, equivDD, eqvparsl, erarr, erDot, escr, Escr, esdot, Esim, esim, Eta, eta, ETH, eth, Euml, euml, euro, excl, exist, Exists, expectation, exponentiale, ExponentialE, fallingdotseq, Fcy, fcy, female, ffilig, fflig, ffllig, Ffr, ffr, filig, FilledSmallSquare, FilledVerySmallSquare, fjlig, flat, fllig, fltns, fnof, Fopf, fopf, forall, ForAll, fork, forkv, Fouriertrf, fpartint, frac12, frac13, frac14, frac15, frac16, frac18, frac23, frac25, frac34, frac35, frac38, frac45, frac56, frac58, frac78, frasl, frown, fscr, Fscr, gacute, Gamma, gamma, Gammad, gammad, gap, Gbreve, gbreve, Gcedil, Gcirc, gcirc, Gcy, gcy, Gdot, gdot, ge, gE, gEl, gel, geq, geqq, geqslant, gescc, ges, gesdot, gesdoto, gesdotol, gesl, gesles, Gfr, gfr, gg, Gg, ggg, gimel, GJcy, gjcy, gla, gl, glE, glj, gnap, gnapprox, gne, gnE, gneq, gneqq, gnsim, Gopf, gopf, grave, GreaterEqual, GreaterEqualLess, GreaterFullEqual, GreaterGreater, GreaterLess, GreaterSlantEqual, GreaterTilde, Gscr, gscr, gsim, gsime, gsiml, gtcc, gtcir, gt, GT, Gt, gtdot, gtlPar, gtquest, gtrapprox, gtrarr, gtrdot, gtreqless, gtreqqless, gtrless, gtrsim, gvertneqq, gvnE, Hacek, hairsp, half, hamilt, HARDcy, hardcy, harrcir, harr, hArr, harrw, Hat, hbar, Hcirc, hcirc, hearts, heartsuit, hellip, hercon, hfr, Hfr, HilbertSpace, hksearow, hkswarow, hoarr, homtht, hookleftarrow, hookrightarrow, hopf, Hopf, horbar, HorizontalLine, hscr, Hscr, hslash, Hstrok, hstrok, HumpDownHump, HumpEqual, hybull, hyphen, Iacute, iacute, ic, Icirc, icirc, Icy, icy, Idot, IEcy, iecy, iexcl, iff, ifr, Ifr, Igrave, igrave, ii, iiiint, iiint, iinfin, iiota, IJlig, ijlig, Imacr, imacr, image, ImaginaryI, imagline, imagpart, imath, Im, imof, imped, Implies, incare, in, infin, infintie, inodot, intcal, int, Int, integers, Integral, intercal, Intersection, intlarhk, intprod, InvisibleComma, InvisibleTimes, IOcy, iocy, Iogon, iogon, Iopf, iopf, Iota, iota, iprod, iquest, iscr, Iscr, isin, isindot, isinE, isins, isinsv, isinv, it, Itilde, itilde, Iukcy, iukcy, Iuml, iuml, Jcirc, jcirc, Jcy, jcy, Jfr, jfr, jmath, Jopf, jopf, Jscr, jscr, Jsercy, jsercy, Jukcy, jukcy, Kappa, kappa, kappav, Kcedil, kcedil, Kcy, kcy, Kfr, kfr, kgreen, KHcy, khcy, KJcy, kjcy, Kopf, kopf, Kscr, kscr, lAarr, Lacute, lacute, laemptyv, lagran, Lambda, lambda, lang, Lang, langd, langle, lap, Laplacetrf, laquo, larrb, larrbfs, larr, Larr, lArr, larrfs, larrhk, larrlp, larrpl, larrsim, larrtl, latail, lAtail, lat, late, lates, lbarr, lBarr, lbbrk, lbrace, lbrack, lbrke, lbrksld, lbrkslu, Lcaron, lcaron, Lcedil, lcedil, lceil, lcub, Lcy, lcy, ldca, ldquo, ldquor, ldrdhar, ldrushar, ldsh, le, lE, LeftAngleBracket, LeftArrowBar, leftarrow, LeftArrow, Leftarrow, LeftArrowRightArrow, leftarrowtail, LeftCeiling, LeftDoubleBracket, LeftDownTeeVector, LeftDownVectorBar, LeftDownVector, LeftFloor, leftharpoondown, leftharpoonup, leftleftarrows, leftrightarrow, LeftRightArrow, Leftrightarrow, leftrightarrows, leftrightharpoons, leftrightsquigarrow, LeftRightVector, LeftTeeArrow, LeftTee, LeftTeeVector, leftthreetimes, LeftTriangleBar, LeftTriangle, LeftTriangleEqual, LeftUpDownVector, LeftUpTeeVector, LeftUpVectorBar, LeftUpVector, LeftVectorBar, LeftVector, lEg, leg, leq, leqq, leqslant, lescc, les, lesdot, lesdoto, lesdotor, lesg, lesges, lessapprox, lessdot, lesseqgtr, lesseqqgtr, LessEqualGreater, LessFullEqual, LessGreater, lessgtr, LessLess, lesssim, LessSlantEqual, LessTilde, lfisht, lfloor, Lfr, lfr, lg, lgE, lHar, lhard, lharu, lharul, lhblk, LJcy, ljcy, llarr, ll, Ll, llcorner, Lleftarrow, llhard, lltri, Lmidot, lmidot, lmoustache, lmoust, lnap, lnapprox, lne, lnE, lneq, lneqq, lnsim, loang, loarr, lobrk, longleftarrow, LongLeftArrow, Longleftarrow, longleftrightarrow, LongLeftRightArrow, Longleftrightarrow, longmapsto, longrightarrow, LongRightArrow, Longrightarrow, looparrowleft, looparrowright, lopar, Lopf, lopf, loplus, lotimes, lowast, lowbar, LowerLeftArrow, LowerRightArrow, loz, lozenge, lozf, lpar, lparlt, lrarr, lrcorner, lrhar, lrhard, lrm, lrtri, lsaquo, lscr, Lscr, lsh, Lsh, lsim, lsime, lsimg, lsqb, lsquo, lsquor, Lstrok, lstrok, ltcc, ltcir, lt, LT, Lt, ltdot, lthree, ltimes, ltlarr, ltquest, ltri, ltrie, ltrif, ltrPar, lurdshar, luruhar, lvertneqq, lvnE, macr, male, malt, maltese, Map, map, mapsto, mapstodown, mapstoleft, mapstoup, marker, mcomma, Mcy, mcy, mdash, mDDot, measuredangle, MediumSpace, Mellintrf, Mfr, mfr, mho, micro, midast, midcir, mid, middot, minusb, minus, minusd, minusdu, MinusPlus, mlcp, mldr, mnplus, models, Mopf, mopf, mp, mscr, Mscr, mstpos, Mu, mu, multimap, mumap, nabla, Nacute, nacute, nang, nap, napE, napid, napos, napprox, natural, naturals, natur, nbsp, nbump, nbumpe, ncap, Ncaron, ncaron, Ncedil, ncedil, ncong, ncongdot, ncup, Ncy, ncy, ndash, nearhk, nearr, neArr, nearrow, ne, nedot, NegativeMediumSpace, NegativeThickSpace, NegativeThinSpace, NegativeVeryThinSpace, nequiv, nesear, nesim, NestedGreaterGreater, NestedLessLess, NewLine, nexist, nexists, Nfr, nfr, ngE, nge, ngeq, ngeqq, ngeqslant, nges, nGg, ngsim, nGt, ngt, ngtr, nGtv, nharr, nhArr, nhpar, ni, nis, nisd, niv, NJcy, njcy, nlarr, nlArr, nldr, nlE, nle, nleftarrow, nLeftarrow, nleftrightarrow, nLeftrightarrow, nleq, nleqq, nleqslant, nles, nless, nLl, nlsim, nLt, nlt, nltri, nltrie, nLtv, nmid, NoBreak, NonBreakingSpace, nopf, Nopf, Not, not, NotCongruent, NotCupCap, NotDoubleVerticalBar, NotElement, NotEqual, NotEqualTilde, NotExists, NotGreater, NotGreaterEqual, NotGreaterFullEqual, NotGreaterGreater, NotGreaterLess, NotGreaterSlantEqual, NotGreaterTilde, NotHumpDownHump, NotHumpEqual, notin, notindot, notinE, notinva, notinvb, notinvc, NotLeftTriangleBar, NotLeftTriangle, NotLeftTriangleEqual, NotLess, NotLessEqual, NotLessGreater, NotLessLess, NotLessSlantEqual, NotLessTilde, NotNestedGreaterGreater, NotNestedLessLess, notni, notniva, notnivb, notnivc, NotPrecedes, NotPrecedesEqual, NotPrecedesSlantEqual, NotReverseElement, NotRightTriangleBar, NotRightTriangle, NotRightTriangleEqual, NotSquareSubset, NotSquareSubsetEqual, NotSquareSuperset, NotSquareSupersetEqual, NotSubset, NotSubsetEqual, NotSucceeds, NotSucceedsEqual, NotSucceedsSlantEqual, NotSucceedsTilde, NotSuperset, NotSupersetEqual, NotTilde, NotTildeEqual, NotTildeFullEqual, NotTildeTilde, NotVerticalBar, nparallel, npar, nparsl, npart, npolint, npr, nprcue, nprec, npreceq, npre, nrarrc, nrarr, nrArr, nrarrw, nrightarrow, nRightarrow, nrtri, nrtrie, nsc, nsccue, nsce, Nscr, nscr, nshortmid, nshortparallel, nsim, nsime, nsimeq, nsmid, nspar, nsqsube, nsqsupe, nsub, nsubE, nsube, nsubset, nsubseteq, nsubseteqq, nsucc, nsucceq, nsup, nsupE, nsupe, nsupset, nsupseteq, nsupseteqq, ntgl, Ntilde, ntilde, ntlg, ntriangleleft, ntrianglelefteq, ntriangleright, ntrianglerighteq, Nu, nu, num, numero, numsp, nvap, nvdash, nvDash, nVdash, nVDash, nvge, nvgt, nvHarr, nvinfin, nvlArr, nvle, nvlt, nvltrie, nvrArr, nvrtrie, nvsim, nwarhk, nwarr, nwArr, nwarrow, nwnear, Oacute, oacute, oast, Ocirc, ocirc, ocir, Ocy, ocy, odash, Odblac, odblac, odiv, odot, odsold, OElig, oelig, ofcir, Ofr, ofr, ogon, Ograve, ograve, ogt, ohbar, ohm, oint, olarr, olcir, olcross, oline, olt, Omacr, omacr, Omega, omega, Omicron, omicron, omid, ominus, Oopf, oopf, opar, OpenCurlyDoubleQuote, OpenCurlyQuote, operp, oplus, orarr, Or, or, ord, order, orderof, ordf, ordm, origof, oror, orslope, orv, oS, Oscr, oscr, Oslash, oslash, osol, Otilde, otilde, otimesas, Otimes, otimes, Ouml, ouml, ovbar, OverBar, OverBrace, OverBracket, OverParenthesis, para, parallel, par, parsim, parsl, part, PartialD, Pcy, pcy, percnt, period, permil, perp, pertenk, Pfr, pfr, Phi, phi, phiv, phmmat, phone, Pi, pi, pitchfork, piv, planck, planckh, plankv, plusacir, plusb, pluscir, plus, plusdo, plusdu, pluse, PlusMinus, plusmn, plussim, plustwo, pm, Poincareplane, pointint, popf, Popf, pound, prap, Pr, pr, prcue, precapprox, prec, preccurlyeq, Precedes, PrecedesEqual, PrecedesSlantEqual, PrecedesTilde, preceq, precnapprox, precneqq, precnsim, pre, prE, precsim, prime, Prime, primes, prnap, prnE, prnsim, prod, Product, profalar, profline, profsurf, prop, Proportional, Proportion, propto, prsim, prurel, Pscr, pscr, Psi, psi, puncsp, Qfr, qfr, qint, qopf, Qopf, qprime, Qscr, qscr, quaternions, quatint, quest, questeq, quot, QUOT, rAarr, race, Racute, racute, radic, raemptyv, rang, Rang, rangd, range, rangle, raquo, rarrap, rarrb, rarrbfs, rarrc, rarr, Rarr, rArr, rarrfs, rarrhk, rarrlp, rarrpl, rarrsim, Rarrtl, rarrtl, rarrw, ratail, rAtail, ratio, rationals, rbarr, rBarr, RBarr, rbbrk, rbrace, rbrack, rbrke, rbrksld, rbrkslu, Rcaron, rcaron, Rcedil, rcedil, rceil, rcub, Rcy, rcy, rdca, rdldhar, rdquo, rdquor, rdsh, real, realine, realpart, reals, Re, rect, reg, REG, ReverseElement, ReverseEquilibrium, ReverseUpEquilibrium, rfisht, rfloor, rfr, Rfr, rHar, rhard, rharu, rharul, Rho, rho, rhov, RightAngleBracket, RightArrowBar, rightarrow, RightArrow, Rightarrow, RightArrowLeftArrow, rightarrowtail, RightCeiling, RightDoubleBracket, RightDownTeeVector, RightDownVectorBar, RightDownVector, RightFloor, rightharpoondown, rightharpoonup, rightleftarrows, rightleftharpoons, rightrightarrows, rightsquigarrow, RightTeeArrow, RightTee, RightTeeVector, rightthreetimes, RightTriangleBar, RightTriangle, RightTriangleEqual, RightUpDownVector, RightUpTeeVector, RightUpVectorBar, RightUpVector, RightVectorBar, RightVector, ring, risingdotseq, rlarr, rlhar, rlm, rmoustache, rmoust, rnmid, roang, roarr, robrk, ropar, ropf, Ropf, roplus, rotimes, RoundImplies, rpar, rpargt, rppolint, rrarr, Rrightarrow, rsaquo, rscr, Rscr, rsh, Rsh, rsqb, rsquo, rsquor, rthree, rtimes, rtri, rtrie, rtrif, rtriltri, RuleDelayed, ruluhar, rx, Sacute, sacute, sbquo, scap, Scaron, scaron, Sc, sc, sccue, sce, scE, Scedil, scedil, Scirc, scirc, scnap, scnE, scnsim, scpolint, scsim, Scy, scy, sdotb, sdot, sdote, searhk, searr, seArr, searrow, sect, semi, seswar, setminus, setmn, sext, Sfr, sfr, sfrown, sharp, SHCHcy, shchcy, SHcy, shcy, ShortDownArrow, ShortLeftArrow, shortmid, shortparallel, ShortRightArrow, ShortUpArrow, shy, Sigma, sigma, sigmaf, sigmav, sim, simdot, sime, simeq, simg, simgE, siml, simlE, simne, simplus, simrarr, slarr, SmallCircle, smallsetminus, smashp, smeparsl, smid, smile, smt, smte, smtes, SOFTcy, softcy, solbar, solb, sol, Sopf, sopf, spades, spadesuit, spar, sqcap, sqcaps, sqcup, sqcups, Sqrt, sqsub, sqsube, sqsubset, sqsubseteq, sqsup, sqsupe, sqsupset, sqsupseteq, square, Square, SquareIntersection, SquareSubset, SquareSubsetEqual, SquareSuperset, SquareSupersetEqual, SquareUnion, squarf, squ, squf, srarr, Sscr, sscr, ssetmn, ssmile, sstarf, Star, star, starf, straightepsilon, straightphi, strns, sub, Sub, subdot, subE, sube, subedot, submult, subnE, subne, subplus, subrarr, subset, Subset, subseteq, subseteqq, SubsetEqual, subsetneq, subsetneqq, subsim, subsub, subsup, succapprox, succ, succcurlyeq, Succeeds, SucceedsEqual, SucceedsSlantEqual, SucceedsTilde, succeq, succnapprox, succneqq, succnsim, succsim, SuchThat, sum, Sum, sung, sup1, sup2, sup3, sup, Sup, supdot, supdsub, supE, supe, supedot, Superset, SupersetEqual, suphsol, suphsub, suplarr, supmult, supnE, supne, supplus, supset, Supset, supseteq, supseteqq, supsetneq, supsetneqq, supsim, supsub, supsup, swarhk, swarr, swArr, swarrow, swnwar, szlig, Tab, target, Tau, tau, tbrk, Tcaron, tcaron, Tcedil, tcedil, Tcy, tcy, tdot, telrec, Tfr, tfr, there4, therefore, Therefore, Theta, theta, thetasym, thetav, thickapprox, thicksim, ThickSpace, ThinSpace, thinsp, thkap, thksim, THORN, thorn, tilde, Tilde, TildeEqual, TildeFullEqual, TildeTilde, timesbar, timesb, times, timesd, tint, toea, topbot, topcir, top, Topf, topf, topfork, tosa, tprime, trade, TRADE, triangle, triangledown, triangleleft, trianglelefteq, triangleq, triangleright, trianglerighteq, tridot, trie, triminus, TripleDot, triplus, trisb, tritime, trpezium, Tscr, tscr, TScy, tscy, TSHcy, tshcy, Tstrok, tstrok, twixt, twoheadleftarrow, twoheadrightarrow, Uacute, uacute, uarr, Uarr, uArr, Uarrocir, Ubrcy, ubrcy, Ubreve, ubreve, Ucirc, ucirc, Ucy, ucy, udarr, Udblac, udblac, udhar, ufisht, Ufr, ufr, Ugrave, ugrave, uHar, uharl, uharr, uhblk, ulcorn, ulcorner, ulcrop, ultri, Umacr, umacr, uml, UnderBar, UnderBrace, UnderBracket, UnderParenthesis, Union, UnionPlus, Uogon, uogon, Uopf, uopf, UpArrowBar, uparrow, UpArrow, Uparrow, UpArrowDownArrow, updownarrow, UpDownArrow, Updownarrow, UpEquilibrium, upharpoonleft, upharpoonright, uplus, UpperLeftArrow, UpperRightArrow, upsi, Upsi, upsih, Upsilon, upsilon, UpTeeArrow, UpTee, upuparrows, urcorn, urcorner, urcrop, Uring, uring, urtri, Uscr, uscr, utdot, Utilde, utilde, utri, utrif, uuarr, Uuml, uuml, uwangle, vangrt, varepsilon, varkappa, varnothing, varphi, varpi, varpropto, varr, vArr, varrho, varsigma, varsubsetneq, varsubsetneqq, varsupsetneq, varsupsetneqq, vartheta, vartriangleleft, vartriangleright, vBar, Vbar, vBarv, Vcy, vcy, vdash, vDash, Vdash, VDash, Vdashl, veebar, vee, Vee, veeeq, vellip, verbar, Verbar, vert, Vert, VerticalBar, VerticalLine, VerticalSeparator, VerticalTilde, VeryThinSpace, Vfr, vfr, vltri, vnsub, vnsup, Vopf, vopf, vprop, vrtri, Vscr, vscr, vsubnE, vsubne, vsupnE, vsupne, Vvdash, vzigzag, Wcirc, wcirc, wedbar, wedge, Wedge, wedgeq, weierp, Wfr, wfr, Wopf, wopf, wp, wr, wreath, Wscr, wscr, xcap, xcirc, xcup, xdtri, Xfr, xfr, xharr, xhArr, Xi, xi, xlarr, xlArr, xmap, xnis, xodot, Xopf, xopf, xoplus, xotime, xrarr, xrArr, Xscr, xscr, xsqcup, xuplus, xutri, xvee, xwedge, Yacute, yacute, YAcy, yacy, Ycirc, ycirc, Ycy, ycy, yen, Yfr, yfr, YIcy, yicy, Yopf, yopf, Yscr, yscr, YUcy, yucy, yuml, Yuml, Zacute, zacute, Zcaron, zcaron, Zcy, zcy, Zdot, zdot, zeetrf, ZeroWidthSpace, Zeta, zeta, zfr, Zfr, ZHcy, zhcy, zigrarr, zopf, Zopf, Zscr, zscr, zwj, zwnj, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"Aacute\":\"Á\",\"aacute\":\"á\",\"Abreve\":\"Ă\",\"abreve\":\"ă\",\"ac\":\"∾\",\"acd\":\"∿\",\"acE\":\"∾̳\",\"Acirc\":\"Â\",\"acirc\":\"â\",\"acute\":\"´\",\"Acy\":\"А\",\"acy\":\"а\",\"AElig\":\"Æ\",\"aelig\":\"æ\",\"af\":\"⁡\",\"Afr\":\"𝔄\",\"afr\":\"𝔞\",\"Agrave\":\"À\",\"agrave\":\"à\",\"alefsym\":\"ℵ\",\"aleph\":\"ℵ\",\"Alpha\":\"Α\",\"alpha\":\"α\",\"Amacr\":\"Ā\",\"amacr\":\"ā\",\"amalg\":\"⨿\",\"amp\":\"&\",\"AMP\":\"&\",\"andand\":\"⩕\",\"And\":\"⩓\",\"and\":\"∧\",\"andd\":\"⩜\",\"andslope\":\"⩘\",\"andv\":\"⩚\",\"ang\":\"∠\",\"ange\":\"⦤\",\"angle\":\"∠\",\"angmsdaa\":\"⦨\",\"angmsdab\":\"⦩\",\"angmsdac\":\"⦪\",\"angmsdad\":\"⦫\",\"angmsdae\":\"⦬\",\"angmsdaf\":\"⦭\",\"angmsdag\":\"⦮\",\"angmsdah\":\"⦯\",\"angmsd\":\"∡\",\"angrt\":\"∟\",\"angrtvb\":\"⊾\",\"angrtvbd\":\"⦝\",\"angsph\":\"∢\",\"angst\":\"Å\",\"angzarr\":\"⍼\",\"Aogon\":\"Ą\",\"aogon\":\"ą\",\"Aopf\":\"𝔸\",\"aopf\":\"𝕒\",\"apacir\":\"⩯\",\"ap\":\"≈\",\"apE\":\"⩰\",\"ape\":\"≊\",\"apid\":\"≋\",\"apos\":\"'\",\"ApplyFunction\":\"⁡\",\"approx\":\"≈\",\"approxeq\":\"≊\",\"Aring\":\"Å\",\"aring\":\"å\",\"Ascr\":\"𝒜\",\"ascr\":\"𝒶\",\"Assign\":\"≔\",\"ast\":\"*\",\"asymp\":\"≈\",\"asympeq\":\"≍\",\"Atilde\":\"Ã\",\"atilde\":\"ã\",\"Auml\":\"Ä\",\"auml\":\"ä\",\"awconint\":\"∳\",\"awint\":\"⨑\",\"backcong\":\"≌\",\"backepsilon\":\"϶\",\"backprime\":\"‵\",\"backsim\":\"∽\",\"backsimeq\":\"⋍\",\"Backslash\":\"∖\",\"Barv\":\"⫧\",\"barvee\":\"⊽\",\"barwed\":\"⌅\",\"Barwed\":\"⌆\",\"barwedge\":\"⌅\",\"bbrk\":\"⎵\",\"bbrktbrk\":\"⎶\",\"bcong\":\"≌\",\"Bcy\":\"Б\",\"bcy\":\"б\",\"bdquo\":\"„\",\"becaus\":\"∵\",\"because\":\"∵\",\"Because\":\"∵\",\"bemptyv\":\"⦰\",\"bepsi\":\"϶\",\"bernou\":\"ℬ\",\"Bernoullis\":\"ℬ\",\"Beta\":\"Β\",\"beta\":\"β\",\"beth\":\"ℶ\",\"between\":\"≬\",\"Bfr\":\"𝔅\",\"bfr\":\"𝔟\",\"bigcap\":\"⋂\",\"bigcirc\":\"◯\",\"bigcup\":\"⋃\",\"bigodot\":\"⨀\",\"bigoplus\":\"⨁\",\"bigotimes\":\"⨂\",\"bigsqcup\":\"⨆\",\"bigstar\":\"★\",\"bigtriangledown\":\"▽\",\"bigtriangleup\":\"△\",\"biguplus\":\"⨄\",\"bigvee\":\"⋁\",\"bigwedge\":\"⋀\",\"bkarow\":\"⤍\",\"blacklozenge\":\"⧫\",\"blacksquare\":\"▪\",\"blacktriangle\":\"▴\",\"blacktriangledown\":\"▾\",\"blacktriangleleft\":\"◂\",\"blacktriangleright\":\"▸\",\"blank\":\"␣\",\"blk12\":\"▒\",\"blk14\":\"░\",\"blk34\":\"▓\",\"block\":\"█\",\"bne\":\"=⃥\",\"bnequiv\":\"≡⃥\",\"bNot\":\"⫭\",\"bnot\":\"⌐\",\"Bopf\":\"𝔹\",\"bopf\":\"𝕓\",\"bot\":\"⊥\",\"bottom\":\"⊥\",\"bowtie\":\"⋈\",\"boxbox\":\"⧉\",\"boxdl\":\"┐\",\"boxdL\":\"╕\",\"boxDl\":\"╖\",\"boxDL\":\"╗\",\"boxdr\":\"┌\",\"boxdR\":\"╒\",\"boxDr\":\"╓\",\"boxDR\":\"╔\",\"boxh\":\"─\",\"boxH\":\"═\",\"boxhd\":\"┬\",\"boxHd\":\"╤\",\"boxhD\":\"╥\",\"boxHD\":\"╦\",\"boxhu\":\"┴\",\"boxHu\":\"╧\",\"boxhU\":\"╨\",\"boxHU\":\"╩\",\"boxminus\":\"⊟\",\"boxplus\":\"⊞\",\"boxtimes\":\"⊠\",\"boxul\":\"┘\",\"boxuL\":\"╛\",\"boxUl\":\"╜\",\"boxUL\":\"╝\",\"boxur\":\"└\",\"boxuR\":\"╘\",\"boxUr\":\"╙\",\"boxUR\":\"╚\",\"boxv\":\"│\",\"boxV\":\"║\",\"boxvh\":\"┼\",\"boxvH\":\"╪\",\"boxVh\":\"╫\",\"boxVH\":\"╬\",\"boxvl\":\"┤\",\"boxvL\":\"╡\",\"boxVl\":\"╢\",\"boxVL\":\"╣\",\"boxvr\":\"├\",\"boxvR\":\"╞\",\"boxVr\":\"╟\",\"boxVR\":\"╠\",\"bprime\":\"‵\",\"breve\":\"˘\",\"Breve\":\"˘\",\"brvbar\":\"¦\",\"bscr\":\"𝒷\",\"Bscr\":\"ℬ\",\"bsemi\":\"⁏\",\"bsim\":\"∽\",\"bsime\":\"⋍\",\"bsolb\":\"⧅\",\"bsol\":\"\\\\\",\"bsolhsub\":\"⟈\",\"bull\":\"•\",\"bullet\":\"•\",\"bump\":\"≎\",\"bumpE\":\"⪮\",\"bumpe\":\"≏\",\"Bumpeq\":\"≎\",\"bumpeq\":\"≏\",\"Cacute\":\"Ć\",\"cacute\":\"ć\",\"capand\":\"⩄\",\"capbrcup\":\"⩉\",\"capcap\":\"⩋\",\"cap\":\"∩\",\"Cap\":\"⋒\",\"capcup\":\"⩇\",\"capdot\":\"⩀\",\"CapitalDifferentialD\":\"ⅅ\",\"caps\":\"∩︀\",\"caret\":\"⁁\",\"caron\":\"ˇ\",\"Cayleys\":\"ℭ\",\"ccaps\":\"⩍\",\"Ccaron\":\"Č\",\"ccaron\":\"č\",\"Ccedil\":\"Ç\",\"ccedil\":\"ç\",\"Ccirc\":\"Ĉ\",\"ccirc\":\"ĉ\",\"Cconint\":\"∰\",\"ccups\":\"⩌\",\"ccupssm\":\"⩐\",\"Cdot\":\"Ċ\",\"cdot\":\"ċ\",\"cedil\":\"¸\",\"Cedilla\":\"¸\",\"cemptyv\":\"⦲\",\"cent\":\"¢\",\"centerdot\":\"·\",\"CenterDot\":\"·\",\"cfr\":\"𝔠\",\"Cfr\":\"ℭ\",\"CHcy\":\"Ч\",\"chcy\":\"ч\",\"check\":\"✓\",\"checkmark\":\"✓\",\"Chi\":\"Χ\",\"chi\":\"χ\",\"circ\":\"ˆ\",\"circeq\":\"≗\",\"circlearrowleft\":\"↺\",\"circlearrowright\":\"↻\",\"circledast\":\"⊛\",\"circledcirc\":\"⊚\",\"circleddash\":\"⊝\",\"CircleDot\":\"⊙\",\"circledR\":\"®\",\"circledS\":\"Ⓢ\",\"CircleMinus\":\"⊖\",\"CirclePlus\":\"⊕\",\"CircleTimes\":\"⊗\",\"cir\":\"○\",\"cirE\":\"⧃\",\"cire\":\"≗\",\"cirfnint\":\"⨐\",\"cirmid\":\"⫯\",\"cirscir\":\"⧂\",\"ClockwiseContourIntegral\":\"∲\",\"CloseCurlyDoubleQuote\":\"”\",\"CloseCurlyQuote\":\"’\",\"clubs\":\"♣\",\"clubsuit\":\"♣\",\"colon\":\":\",\"Colon\":\"∷\",\"Colone\":\"⩴\",\"colone\":\"≔\",\"coloneq\":\"≔\",\"comma\":\",\",\"commat\":\"@\",\"comp\":\"∁\",\"compfn\":\"∘\",\"complement\":\"∁\",\"complexes\":\"ℂ\",\"cong\":\"≅\",\"congdot\":\"⩭\",\"Congruent\":\"≡\",\"conint\":\"∮\",\"Conint\":\"∯\",\"ContourIntegral\":\"∮\",\"copf\":\"𝕔\",\"Copf\":\"ℂ\",\"coprod\":\"∐\",\"Coproduct\":\"∐\",\"copy\":\"©\",\"COPY\":\"©\",\"copysr\":\"℗\",\"CounterClockwiseContourIntegral\":\"∳\",\"crarr\":\"↵\",\"cross\":\"✗\",\"Cross\":\"⨯\",\"Cscr\":\"𝒞\",\"cscr\":\"𝒸\",\"csub\":\"⫏\",\"csube\":\"⫑\",\"csup\":\"⫐\",\"csupe\":\"⫒\",\"ctdot\":\"⋯\",\"cudarrl\":\"⤸\",\"cudarrr\":\"⤵\",\"cuepr\":\"⋞\",\"cuesc\":\"⋟\",\"cularr\":\"↶\",\"cularrp\":\"⤽\",\"cupbrcap\":\"⩈\",\"cupcap\":\"⩆\",\"CupCap\":\"≍\",\"cup\":\"∪\",\"Cup\":\"⋓\",\"cupcup\":\"⩊\",\"cupdot\":\"⊍\",\"cupor\":\"⩅\",\"cups\":\"∪︀\",\"curarr\":\"↷\",\"curarrm\":\"⤼\",\"curlyeqprec\":\"⋞\",\"curlyeqsucc\":\"⋟\",\"curlyvee\":\"⋎\",\"curlywedge\":\"⋏\",\"curren\":\"¤\",\"curvearrowleft\":\"↶\",\"curvearrowright\":\"↷\",\"cuvee\":\"⋎\",\"cuwed\":\"⋏\",\"cwconint\":\"∲\",\"cwint\":\"∱\",\"cylcty\":\"⌭\",\"dagger\":\"†\",\"Dagger\":\"‡\",\"daleth\":\"ℸ\",\"darr\":\"↓\",\"Darr\":\"↡\",\"dArr\":\"⇓\",\"dash\":\"‐\",\"Dashv\":\"⫤\",\"dashv\":\"⊣\",\"dbkarow\":\"⤏\",\"dblac\":\"˝\",\"Dcaron\":\"Ď\",\"dcaron\":\"ď\",\"Dcy\":\"Д\",\"dcy\":\"д\",\"ddagger\":\"‡\",\"ddarr\":\"⇊\",\"DD\":\"ⅅ\",\"dd\":\"ⅆ\",\"DDotrahd\":\"⤑\",\"ddotseq\":\"⩷\",\"deg\":\"°\",\"Del\":\"∇\",\"Delta\":\"Δ\",\"delta\":\"δ\",\"demptyv\":\"⦱\",\"dfisht\":\"⥿\",\"Dfr\":\"𝔇\",\"dfr\":\"𝔡\",\"dHar\":\"⥥\",\"dharl\":\"⇃\",\"dharr\":\"⇂\",\"DiacriticalAcute\":\"´\",\"DiacriticalDot\":\"˙\",\"DiacriticalDoubleAcute\":\"˝\",\"DiacriticalGrave\":\"`\",\"DiacriticalTilde\":\"˜\",\"diam\":\"⋄\",\"diamond\":\"⋄\",\"Diamond\":\"⋄\",\"diamondsuit\":\"♦\",\"diams\":\"♦\",\"die\":\"¨\",\"DifferentialD\":\"ⅆ\",\"digamma\":\"ϝ\",\"disin\":\"⋲\",\"div\":\"÷\",\"divide\":\"÷\",\"divideontimes\":\"⋇\",\"divonx\":\"⋇\",\"DJcy\":\"Ђ\",\"djcy\":\"ђ\",\"dlcorn\":\"⌞\",\"dlcrop\":\"⌍\",\"dollar\":\"$\",\"Dopf\":\"𝔻\",\"dopf\":\"𝕕\",\"Dot\":\"¨\",\"dot\":\"˙\",\"DotDot\":\"⃜\",\"doteq\":\"≐\",\"doteqdot\":\"≑\",\"DotEqual\":\"≐\",\"dotminus\":\"∸\",\"dotplus\":\"∔\",\"dotsquare\":\"⊡\",\"doublebarwedge\":\"⌆\",\"DoubleContourIntegral\":\"∯\",\"DoubleDot\":\"¨\",\"DoubleDownArrow\":\"⇓\",\"DoubleLeftArrow\":\"⇐\",\"DoubleLeftRightArrow\":\"⇔\",\"DoubleLeftTee\":\"⫤\",\"DoubleLongLeftArrow\":\"⟸\",\"DoubleLongLeftRightArrow\":\"⟺\",\"DoubleLongRightArrow\":\"⟹\",\"DoubleRightArrow\":\"⇒\",\"DoubleRightTee\":\"⊨\",\"DoubleUpArrow\":\"⇑\",\"DoubleUpDownArrow\":\"⇕\",\"DoubleVerticalBar\":\"∥\",\"DownArrowBar\":\"⤓\",\"downarrow\":\"↓\",\"DownArrow\":\"↓\",\"Downarrow\":\"⇓\",\"DownArrowUpArrow\":\"⇵\",\"DownBreve\":\"̑\",\"downdownarrows\":\"⇊\",\"downharpoonleft\":\"⇃\",\"downharpoonright\":\"⇂\",\"DownLeftRightVector\":\"⥐\",\"DownLeftTeeVector\":\"⥞\",\"DownLeftVectorBar\":\"⥖\",\"DownLeftVector\":\"↽\",\"DownRightTeeVector\":\"⥟\",\"DownRightVectorBar\":\"⥗\",\"DownRightVector\":\"⇁\",\"DownTeeArrow\":\"↧\",\"DownTee\":\"⊤\",\"drbkarow\":\"⤐\",\"drcorn\":\"⌟\",\"drcrop\":\"⌌\",\"Dscr\":\"𝒟\",\"dscr\":\"𝒹\",\"DScy\":\"Ѕ\",\"dscy\":\"ѕ\",\"dsol\":\"⧶\",\"Dstrok\":\"Đ\",\"dstrok\":\"đ\",\"dtdot\":\"⋱\",\"dtri\":\"▿\",\"dtrif\":\"▾\",\"duarr\":\"⇵\",\"duhar\":\"⥯\",\"dwangle\":\"⦦\",\"DZcy\":\"Џ\",\"dzcy\":\"џ\",\"dzigrarr\":\"⟿\",\"Eacute\":\"É\",\"eacute\":\"é\",\"easter\":\"⩮\",\"Ecaron\":\"Ě\",\"ecaron\":\"ě\",\"Ecirc\":\"Ê\",\"ecirc\":\"ê\",\"ecir\":\"≖\",\"ecolon\":\"≕\",\"Ecy\":\"Э\",\"ecy\":\"э\",\"eDDot\":\"⩷\",\"Edot\":\"Ė\",\"edot\":\"ė\",\"eDot\":\"≑\",\"ee\":\"ⅇ\",\"efDot\":\"≒\",\"Efr\":\"𝔈\",\"efr\":\"𝔢\",\"eg\":\"⪚\",\"Egrave\":\"È\",\"egrave\":\"è\",\"egs\":\"⪖\",\"egsdot\":\"⪘\",\"el\":\"⪙\",\"Element\":\"∈\",\"elinters\":\"⏧\",\"ell\":\"ℓ\",\"els\":\"⪕\",\"elsdot\":\"⪗\",\"Emacr\":\"Ē\",\"emacr\":\"ē\",\"empty\":\"∅\",\"emptyset\":\"∅\",\"EmptySmallSquare\":\"◻\",\"emptyv\":\"∅\",\"EmptyVerySmallSquare\":\"▫\",\"emsp13\":\" \",\"emsp14\":\" \",\"emsp\":\" \",\"ENG\":\"Ŋ\",\"eng\":\"ŋ\",\"ensp\":\" \",\"Eogon\":\"Ę\",\"eogon\":\"ę\",\"Eopf\":\"𝔼\",\"eopf\":\"𝕖\",\"epar\":\"⋕\",\"eparsl\":\"⧣\",\"eplus\":\"⩱\",\"epsi\":\"ε\",\"Epsilon\":\"Ε\",\"epsilon\":\"ε\",\"epsiv\":\"ϵ\",\"eqcirc\":\"≖\",\"eqcolon\":\"≕\",\"eqsim\":\"≂\",\"eqslantgtr\":\"⪖\",\"eqslantless\":\"⪕\",\"Equal\":\"⩵\",\"equals\":\"=\",\"EqualTilde\":\"≂\",\"equest\":\"≟\",\"Equilibrium\":\"⇌\",\"equiv\":\"≡\",\"equivDD\":\"⩸\",\"eqvparsl\":\"⧥\",\"erarr\":\"⥱\",\"erDot\":\"≓\",\"escr\":\"ℯ\",\"Escr\":\"ℰ\",\"esdot\":\"≐\",\"Esim\":\"⩳\",\"esim\":\"≂\",\"Eta\":\"Η\",\"eta\":\"η\",\"ETH\":\"Ð\",\"eth\":\"ð\",\"Euml\":\"Ë\",\"euml\":\"ë\",\"euro\":\"€\",\"excl\":\"!\",\"exist\":\"∃\",\"Exists\":\"∃\",\"expectation\":\"ℰ\",\"exponentiale\":\"ⅇ\",\"ExponentialE\":\"ⅇ\",\"fallingdotseq\":\"≒\",\"Fcy\":\"Ф\",\"fcy\":\"ф\",\"female\":\"♀\",\"ffilig\":\"ﬃ\",\"fflig\":\"ﬀ\",\"ffllig\":\"ﬄ\",\"Ffr\":\"𝔉\",\"ffr\":\"𝔣\",\"filig\":\"ﬁ\",\"FilledSmallSquare\":\"◼\",\"FilledVerySmallSquare\":\"▪\",\"fjlig\":\"fj\",\"flat\":\"♭\",\"fllig\":\"ﬂ\",\"fltns\":\"▱\",\"fnof\":\"ƒ\",\"Fopf\":\"𝔽\",\"fopf\":\"𝕗\",\"forall\":\"∀\",\"ForAll\":\"∀\",\"fork\":\"⋔\",\"forkv\":\"⫙\",\"Fouriertrf\":\"ℱ\",\"fpartint\":\"⨍\",\"frac12\":\"½\",\"frac13\":\"⅓\",\"frac14\":\"¼\",\"frac15\":\"⅕\",\"frac16\":\"⅙\",\"frac18\":\"⅛\",\"frac23\":\"⅔\",\"frac25\":\"⅖\",\"frac34\":\"¾\",\"frac35\":\"⅗\",\"frac38\":\"⅜\",\"frac45\":\"⅘\",\"frac56\":\"⅚\",\"frac58\":\"⅝\",\"frac78\":\"⅞\",\"frasl\":\"⁄\",\"frown\":\"⌢\",\"fscr\":\"𝒻\",\"Fscr\":\"ℱ\",\"gacute\":\"ǵ\",\"Gamma\":\"Γ\",\"gamma\":\"γ\",\"Gammad\":\"Ϝ\",\"gammad\":\"ϝ\",\"gap\":\"⪆\",\"Gbreve\":\"Ğ\",\"gbreve\":\"ğ\",\"Gcedil\":\"Ģ\",\"Gcirc\":\"Ĝ\",\"gcirc\":\"ĝ\",\"Gcy\":\"Г\",\"gcy\":\"г\",\"Gdot\":\"Ġ\",\"gdot\":\"ġ\",\"ge\":\"≥\",\"gE\":\"≧\",\"gEl\":\"⪌\",\"gel\":\"⋛\",\"geq\":\"≥\",\"geqq\":\"≧\",\"geqslant\":\"⩾\",\"gescc\":\"⪩\",\"ges\":\"⩾\",\"gesdot\":\"⪀\",\"gesdoto\":\"⪂\",\"gesdotol\":\"⪄\",\"gesl\":\"⋛︀\",\"gesles\":\"⪔\",\"Gfr\":\"𝔊\",\"gfr\":\"𝔤\",\"gg\":\"≫\",\"Gg\":\"⋙\",\"ggg\":\"⋙\",\"gimel\":\"ℷ\",\"GJcy\":\"Ѓ\",\"gjcy\":\"ѓ\",\"gla\":\"⪥\",\"gl\":\"≷\",\"glE\":\"⪒\",\"glj\":\"⪤\",\"gnap\":\"⪊\",\"gnapprox\":\"⪊\",\"gne\":\"⪈\",\"gnE\":\"≩\",\"gneq\":\"⪈\",\"gneqq\":\"≩\",\"gnsim\":\"⋧\",\"Gopf\":\"𝔾\",\"gopf\":\"𝕘\",\"grave\":\"`\",\"GreaterEqual\":\"≥\",\"GreaterEqualLess\":\"⋛\",\"GreaterFullEqual\":\"≧\",\"GreaterGreater\":\"⪢\",\"GreaterLess\":\"≷\",\"GreaterSlantEqual\":\"⩾\",\"GreaterTilde\":\"≳\",\"Gscr\":\"𝒢\",\"gscr\":\"ℊ\",\"gsim\":\"≳\",\"gsime\":\"⪎\",\"gsiml\":\"⪐\",\"gtcc\":\"⪧\",\"gtcir\":\"⩺\",\"gt\":\">\",\"GT\":\">\",\"Gt\":\"≫\",\"gtdot\":\"⋗\",\"gtlPar\":\"⦕\",\"gtquest\":\"⩼\",\"gtrapprox\":\"⪆\",\"gtrarr\":\"⥸\",\"gtrdot\":\"⋗\",\"gtreqless\":\"⋛\",\"gtreqqless\":\"⪌\",\"gtrless\":\"≷\",\"gtrsim\":\"≳\",\"gvertneqq\":\"≩︀\",\"gvnE\":\"≩︀\",\"Hacek\":\"ˇ\",\"hairsp\":\" \",\"half\":\"½\",\"hamilt\":\"ℋ\",\"HARDcy\":\"Ъ\",\"hardcy\":\"ъ\",\"harrcir\":\"⥈\",\"harr\":\"↔\",\"hArr\":\"⇔\",\"harrw\":\"↭\",\"Hat\":\"^\",\"hbar\":\"ℏ\",\"Hcirc\":\"Ĥ\",\"hcirc\":\"ĥ\",\"hearts\":\"♥\",\"heartsuit\":\"♥\",\"hellip\":\"…\",\"hercon\":\"⊹\",\"hfr\":\"𝔥\",\"Hfr\":\"ℌ\",\"HilbertSpace\":\"ℋ\",\"hksearow\":\"⤥\",\"hkswarow\":\"⤦\",\"hoarr\":\"⇿\",\"homtht\":\"∻\",\"hookleftarrow\":\"↩\",\"hookrightarrow\":\"↪\",\"hopf\":\"𝕙\",\"Hopf\":\"ℍ\",\"horbar\":\"―\",\"HorizontalLine\":\"─\",\"hscr\":\"𝒽\",\"Hscr\":\"ℋ\",\"hslash\":\"ℏ\",\"Hstrok\":\"Ħ\",\"hstrok\":\"ħ\",\"HumpDownHump\":\"≎\",\"HumpEqual\":\"≏\",\"hybull\":\"⁃\",\"hyphen\":\"‐\",\"Iacute\":\"Í\",\"iacute\":\"í\",\"ic\":\"⁣\",\"Icirc\":\"Î\",\"icirc\":\"î\",\"Icy\":\"И\",\"icy\":\"и\",\"Idot\":\"İ\",\"IEcy\":\"Е\",\"iecy\":\"е\",\"iexcl\":\"¡\",\"iff\":\"⇔\",\"ifr\":\"𝔦\",\"Ifr\":\"ℑ\",\"Igrave\":\"Ì\",\"igrave\":\"ì\",\"ii\":\"ⅈ\",\"iiiint\":\"⨌\",\"iiint\":\"∭\",\"iinfin\":\"⧜\",\"iiota\":\"℩\",\"IJlig\":\"Ĳ\",\"ijlig\":\"ĳ\",\"Imacr\":\"Ī\",\"imacr\":\"ī\",\"image\":\"ℑ\",\"ImaginaryI\":\"ⅈ\",\"imagline\":\"ℐ\",\"imagpart\":\"ℑ\",\"imath\":\"ı\",\"Im\":\"ℑ\",\"imof\":\"⊷\",\"imped\":\"Ƶ\",\"Implies\":\"⇒\",\"incare\":\"℅\",\"in\":\"∈\",\"infin\":\"∞\",\"infintie\":\"⧝\",\"inodot\":\"ı\",\"intcal\":\"⊺\",\"int\":\"∫\",\"Int\":\"∬\",\"integers\":\"ℤ\",\"Integral\":\"∫\",\"intercal\":\"⊺\",\"Intersection\":\"⋂\",\"intlarhk\":\"⨗\",\"intprod\":\"⨼\",\"InvisibleComma\":\"⁣\",\"InvisibleTimes\":\"⁢\",\"IOcy\":\"Ё\",\"iocy\":\"ё\",\"Iogon\":\"Į\",\"iogon\":\"į\",\"Iopf\":\"𝕀\",\"iopf\":\"𝕚\",\"Iota\":\"Ι\",\"iota\":\"ι\",\"iprod\":\"⨼\",\"iquest\":\"¿\",\"iscr\":\"𝒾\",\"Iscr\":\"ℐ\",\"isin\":\"∈\",\"isindot\":\"⋵\",\"isinE\":\"⋹\",\"isins\":\"⋴\",\"isinsv\":\"⋳\",\"isinv\":\"∈\",\"it\":\"⁢\",\"Itilde\":\"Ĩ\",\"itilde\":\"ĩ\",\"Iukcy\":\"І\",\"iukcy\":\"і\",\"Iuml\":\"Ï\",\"iuml\":\"ï\",\"Jcirc\":\"Ĵ\",\"jcirc\":\"ĵ\",\"Jcy\":\"Й\",\"jcy\":\"й\",\"Jfr\":\"𝔍\",\"jfr\":\"𝔧\",\"jmath\":\"ȷ\",\"Jopf\":\"𝕁\",\"jopf\":\"𝕛\",\"Jscr\":\"𝒥\",\"jscr\":\"𝒿\",\"Jsercy\":\"Ј\",\"jsercy\":\"ј\",\"Jukcy\":\"Є\",\"jukcy\":\"є\",\"Kappa\":\"Κ\",\"kappa\":\"κ\",\"kappav\":\"ϰ\",\"Kcedil\":\"Ķ\",\"kcedil\":\"ķ\",\"Kcy\":\"К\",\"kcy\":\"к\",\"Kfr\":\"𝔎\",\"kfr\":\"𝔨\",\"kgreen\":\"ĸ\",\"KHcy\":\"Х\",\"khcy\":\"х\",\"KJcy\":\"Ќ\",\"kjcy\":\"ќ\",\"Kopf\":\"𝕂\",\"kopf\":\"𝕜\",\"Kscr\":\"𝒦\",\"kscr\":\"𝓀\",\"lAarr\":\"⇚\",\"Lacute\":\"Ĺ\",\"lacute\":\"ĺ\",\"laemptyv\":\"⦴\",\"lagran\":\"ℒ\",\"Lambda\":\"Λ\",\"lambda\":\"λ\",\"lang\":\"⟨\",\"Lang\":\"⟪\",\"langd\":\"⦑\",\"langle\":\"⟨\",\"lap\":\"⪅\",\"Laplacetrf\":\"ℒ\",\"laquo\":\"«\",\"larrb\":\"⇤\",\"larrbfs\":\"⤟\",\"larr\":\"←\",\"Larr\":\"↞\",\"lArr\":\"⇐\",\"larrfs\":\"⤝\",\"larrhk\":\"↩\",\"larrlp\":\"↫\",\"larrpl\":\"⤹\",\"larrsim\":\"⥳\",\"larrtl\":\"↢\",\"latail\":\"⤙\",\"lAtail\":\"⤛\",\"lat\":\"⪫\",\"late\":\"⪭\",\"lates\":\"⪭︀\",\"lbarr\":\"⤌\",\"lBarr\":\"⤎\",\"lbbrk\":\"❲\",\"lbrace\":\"{\",\"lbrack\":\"[\",\"lbrke\":\"⦋\",\"lbrksld\":\"⦏\",\"lbrkslu\":\"⦍\",\"Lcaron\":\"Ľ\",\"lcaron\":\"ľ\",\"Lcedil\":\"Ļ\",\"lcedil\":\"ļ\",\"lceil\":\"⌈\",\"lcub\":\"{\",\"Lcy\":\"Л\",\"lcy\":\"л\",\"ldca\":\"⤶\",\"ldquo\":\"“\",\"ldquor\":\"„\",\"ldrdhar\":\"⥧\",\"ldrushar\":\"⥋\",\"ldsh\":\"↲\",\"le\":\"≤\",\"lE\":\"≦\",\"LeftAngleBracket\":\"⟨\",\"LeftArrowBar\":\"⇤\",\"leftarrow\":\"←\",\"LeftArrow\":\"←\",\"Leftarrow\":\"⇐\",\"LeftArrowRightArrow\":\"⇆\",\"leftarrowtail\":\"↢\",\"LeftCeiling\":\"⌈\",\"LeftDoubleBracket\":\"⟦\",\"LeftDownTeeVector\":\"⥡\",\"LeftDownVectorBar\":\"⥙\",\"LeftDownVector\":\"⇃\",\"LeftFloor\":\"⌊\",\"leftharpoondown\":\"↽\",\"leftharpoonup\":\"↼\",\"leftleftarrows\":\"⇇\",\"leftrightarrow\":\"↔\",\"LeftRightArrow\":\"↔\",\"Leftrightarrow\":\"⇔\",\"leftrightarrows\":\"⇆\",\"leftrightharpoons\":\"⇋\",\"leftrightsquigarrow\":\"↭\",\"LeftRightVector\":\"⥎\",\"LeftTeeArrow\":\"↤\",\"LeftTee\":\"⊣\",\"LeftTeeVector\":\"⥚\",\"leftthreetimes\":\"⋋\",\"LeftTriangleBar\":\"⧏\",\"LeftTriangle\":\"⊲\",\"LeftTriangleEqual\":\"⊴\",\"LeftUpDownVector\":\"⥑\",\"LeftUpTeeVector\":\"⥠\",\"LeftUpVectorBar\":\"⥘\",\"LeftUpVector\":\"↿\",\"LeftVectorBar\":\"⥒\",\"LeftVector\":\"↼\",\"lEg\":\"⪋\",\"leg\":\"⋚\",\"leq\":\"≤\",\"leqq\":\"≦\",\"leqslant\":\"⩽\",\"lescc\":\"⪨\",\"les\":\"⩽\",\"lesdot\":\"⩿\",\"lesdoto\":\"⪁\",\"lesdotor\":\"⪃\",\"lesg\":\"⋚︀\",\"lesges\":\"⪓\",\"lessapprox\":\"⪅\",\"lessdot\":\"⋖\",\"lesseqgtr\":\"⋚\",\"lesseqqgtr\":\"⪋\",\"LessEqualGreater\":\"⋚\",\"LessFullEqual\":\"≦\",\"LessGreater\":\"≶\",\"lessgtr\":\"≶\",\"LessLess\":\"⪡\",\"lesssim\":\"≲\",\"LessSlantEqual\":\"⩽\",\"LessTilde\":\"≲\",\"lfisht\":\"⥼\",\"lfloor\":\"⌊\",\"Lfr\":\"𝔏\",\"lfr\":\"𝔩\",\"lg\":\"≶\",\"lgE\":\"⪑\",\"lHar\":\"⥢\",\"lhard\":\"↽\",\"lharu\":\"↼\",\"lharul\":\"⥪\",\"lhblk\":\"▄\",\"LJcy\":\"Љ\",\"ljcy\":\"љ\",\"llarr\":\"⇇\",\"ll\":\"≪\",\"Ll\":\"⋘\",\"llcorner\":\"⌞\",\"Lleftarrow\":\"⇚\",\"llhard\":\"⥫\",\"lltri\":\"◺\",\"Lmidot\":\"Ŀ\",\"lmidot\":\"ŀ\",\"lmoustache\":\"⎰\",\"lmoust\":\"⎰\",\"lnap\":\"⪉\",\"lnapprox\":\"⪉\",\"lne\":\"⪇\",\"lnE\":\"≨\",\"lneq\":\"⪇\",\"lneqq\":\"≨\",\"lnsim\":\"⋦\",\"loang\":\"⟬\",\"loarr\":\"⇽\",\"lobrk\":\"⟦\",\"longleftarrow\":\"⟵\",\"LongLeftArrow\":\"⟵\",\"Longleftarrow\":\"⟸\",\"longleftrightarrow\":\"⟷\",\"LongLeftRightArrow\":\"⟷\",\"Longleftrightarrow\":\"⟺\",\"longmapsto\":\"⟼\",\"longrightarrow\":\"⟶\",\"LongRightArrow\":\"⟶\",\"Longrightarrow\":\"⟹\",\"looparrowleft\":\"↫\",\"looparrowright\":\"↬\",\"lopar\":\"⦅\",\"Lopf\":\"𝕃\",\"lopf\":\"𝕝\",\"loplus\":\"⨭\",\"lotimes\":\"⨴\",\"lowast\":\"∗\",\"lowbar\":\"_\",\"LowerLeftArrow\":\"↙\",\"LowerRightArrow\":\"↘\",\"loz\":\"◊\",\"lozenge\":\"◊\",\"lozf\":\"⧫\",\"lpar\":\"(\",\"lparlt\":\"⦓\",\"lrarr\":\"⇆\",\"lrcorner\":\"⌟\",\"lrhar\":\"⇋\",\"lrhard\":\"⥭\",\"lrm\":\"‎\",\"lrtri\":\"⊿\",\"lsaquo\":\"‹\",\"lscr\":\"𝓁\",\"Lscr\":\"ℒ\",\"lsh\":\"↰\",\"Lsh\":\"↰\",\"lsim\":\"≲\",\"lsime\":\"⪍\",\"lsimg\":\"⪏\",\"lsqb\":\"[\",\"lsquo\":\"‘\",\"lsquor\":\"‚\",\"Lstrok\":\"Ł\",\"lstrok\":\"ł\",\"ltcc\":\"⪦\",\"ltcir\":\"⩹\",\"lt\":\"<\",\"LT\":\"<\",\"Lt\":\"≪\",\"ltdot\":\"⋖\",\"lthree\":\"⋋\",\"ltimes\":\"⋉\",\"ltlarr\":\"⥶\",\"ltquest\":\"⩻\",\"ltri\":\"◃\",\"ltrie\":\"⊴\",\"ltrif\":\"◂\",\"ltrPar\":\"⦖\",\"lurdshar\":\"⥊\",\"luruhar\":\"⥦\",\"lvertneqq\":\"≨︀\",\"lvnE\":\"≨︀\",\"macr\":\"¯\",\"male\":\"♂\",\"malt\":\"✠\",\"maltese\":\"✠\",\"Map\":\"⤅\",\"map\":\"↦\",\"mapsto\":\"↦\",\"mapstodown\":\"↧\",\"mapstoleft\":\"↤\",\"mapstoup\":\"↥\",\"marker\":\"▮\",\"mcomma\":\"⨩\",\"Mcy\":\"М\",\"mcy\":\"м\",\"mdash\":\"—\",\"mDDot\":\"∺\",\"measuredangle\":\"∡\",\"MediumSpace\":\" \",\"Mellintrf\":\"ℳ\",\"Mfr\":\"𝔐\",\"mfr\":\"𝔪\",\"mho\":\"℧\",\"micro\":\"µ\",\"midast\":\"*\",\"midcir\":\"⫰\",\"mid\":\"∣\",\"middot\":\"·\",\"minusb\":\"⊟\",\"minus\":\"−\",\"minusd\":\"∸\",\"minusdu\":\"⨪\",\"MinusPlus\":\"∓\",\"mlcp\":\"⫛\",\"mldr\":\"…\",\"mnplus\":\"∓\",\"models\":\"⊧\",\"Mopf\":\"𝕄\",\"mopf\":\"𝕞\",\"mp\":\"∓\",\"mscr\":\"𝓂\",\"Mscr\":\"ℳ\",\"mstpos\":\"∾\",\"Mu\":\"Μ\",\"mu\":\"μ\",\"multimap\":\"⊸\",\"mumap\":\"⊸\",\"nabla\":\"∇\",\"Nacute\":\"Ń\",\"nacute\":\"ń\",\"nang\":\"∠⃒\",\"nap\":\"≉\",\"napE\":\"⩰̸\",\"napid\":\"≋̸\",\"napos\":\"ŉ\",\"napprox\":\"≉\",\"natural\":\"♮\",\"naturals\":\"ℕ\",\"natur\":\"♮\",\"nbsp\":\" \",\"nbump\":\"≎̸\",\"nbumpe\":\"≏̸\",\"ncap\":\"⩃\",\"Ncaron\":\"Ň\",\"ncaron\":\"ň\",\"Ncedil\":\"Ņ\",\"ncedil\":\"ņ\",\"ncong\":\"≇\",\"ncongdot\":\"⩭̸\",\"ncup\":\"⩂\",\"Ncy\":\"Н\",\"ncy\":\"н\",\"ndash\":\"–\",\"nearhk\":\"⤤\",\"nearr\":\"↗\",\"neArr\":\"⇗\",\"nearrow\":\"↗\",\"ne\":\"≠\",\"nedot\":\"≐̸\",\"NegativeMediumSpace\":\"​\",\"NegativeThickSpace\":\"​\",\"NegativeThinSpace\":\"​\",\"NegativeVeryThinSpace\":\"​\",\"nequiv\":\"≢\",\"nesear\":\"⤨\",\"nesim\":\"≂̸\",\"NestedGreaterGreater\":\"≫\",\"NestedLessLess\":\"≪\",\"NewLine\":\"\\n\",\"nexist\":\"∄\",\"nexists\":\"∄\",\"Nfr\":\"𝔑\",\"nfr\":\"𝔫\",\"ngE\":\"≧̸\",\"nge\":\"≱\",\"ngeq\":\"≱\",\"ngeqq\":\"≧̸\",\"ngeqslant\":\"⩾̸\",\"nges\":\"⩾̸\",\"nGg\":\"⋙̸\",\"ngsim\":\"≵\",\"nGt\":\"≫⃒\",\"ngt\":\"≯\",\"ngtr\":\"≯\",\"nGtv\":\"≫̸\",\"nharr\":\"↮\",\"nhArr\":\"⇎\",\"nhpar\":\"⫲\",\"ni\":\"∋\",\"nis\":\"⋼\",\"nisd\":\"⋺\",\"niv\":\"∋\",\"NJcy\":\"Њ\",\"njcy\":\"њ\",\"nlarr\":\"↚\",\"nlArr\":\"⇍\",\"nldr\":\"‥\",\"nlE\":\"≦̸\",\"nle\":\"≰\",\"nleftarrow\":\"↚\",\"nLeftarrow\":\"⇍\",\"nleftrightarrow\":\"↮\",\"nLeftrightarrow\":\"⇎\",\"nleq\":\"≰\",\"nleqq\":\"≦̸\",\"nleqslant\":\"⩽̸\",\"nles\":\"⩽̸\",\"nless\":\"≮\",\"nLl\":\"⋘̸\",\"nlsim\":\"≴\",\"nLt\":\"≪⃒\",\"nlt\":\"≮\",\"nltri\":\"⋪\",\"nltrie\":\"⋬\",\"nLtv\":\"≪̸\",\"nmid\":\"∤\",\"NoBreak\":\"⁠\",\"NonBreakingSpace\":\" \",\"nopf\":\"𝕟\",\"Nopf\":\"ℕ\",\"Not\":\"⫬\",\"not\":\"¬\",\"NotCongruent\":\"≢\",\"NotCupCap\":\"≭\",\"NotDoubleVerticalBar\":\"∦\",\"NotElement\":\"∉\",\"NotEqual\":\"≠\",\"NotEqualTilde\":\"≂̸\",\"NotExists\":\"∄\",\"NotGreater\":\"≯\",\"NotGreaterEqual\":\"≱\",\"NotGreaterFullEqual\":\"≧̸\",\"NotGreaterGreater\":\"≫̸\",\"NotGreaterLess\":\"≹\",\"NotGreaterSlantEqual\":\"⩾̸\",\"NotGreaterTilde\":\"≵\",\"NotHumpDownHump\":\"≎̸\",\"NotHumpEqual\":\"≏̸\",\"notin\":\"∉\",\"notindot\":\"⋵̸\",\"notinE\":\"⋹̸\",\"notinva\":\"∉\",\"notinvb\":\"⋷\",\"notinvc\":\"⋶\",\"NotLeftTriangleBar\":\"⧏̸\",\"NotLeftTriangle\":\"⋪\",\"NotLeftTriangleEqual\":\"⋬\",\"NotLess\":\"≮\",\"NotLessEqual\":\"≰\",\"NotLessGreater\":\"≸\",\"NotLessLess\":\"≪̸\",\"NotLessSlantEqual\":\"⩽̸\",\"NotLessTilde\":\"≴\",\"NotNestedGreaterGreater\":\"⪢̸\",\"NotNestedLessLess\":\"⪡̸\",\"notni\":\"∌\",\"notniva\":\"∌\",\"notnivb\":\"⋾\",\"notnivc\":\"⋽\",\"NotPrecedes\":\"⊀\",\"NotPrecedesEqual\":\"⪯̸\",\"NotPrecedesSlantEqual\":\"⋠\",\"NotReverseElement\":\"∌\",\"NotRightTriangleBar\":\"⧐̸\",\"NotRightTriangle\":\"⋫\",\"NotRightTriangleEqual\":\"⋭\",\"NotSquareSubset\":\"⊏̸\",\"NotSquareSubsetEqual\":\"⋢\",\"NotSquareSuperset\":\"⊐̸\",\"NotSquareSupersetEqual\":\"⋣\",\"NotSubset\":\"⊂⃒\",\"NotSubsetEqual\":\"⊈\",\"NotSucceeds\":\"⊁\",\"NotSucceedsEqual\":\"⪰̸\",\"NotSucceedsSlantEqual\":\"⋡\",\"NotSucceedsTilde\":\"≿̸\",\"NotSuperset\":\"⊃⃒\",\"NotSupersetEqual\":\"⊉\",\"NotTilde\":\"≁\",\"NotTildeEqual\":\"≄\",\"NotTildeFullEqual\":\"≇\",\"NotTildeTilde\":\"≉\",\"NotVerticalBar\":\"∤\",\"nparallel\":\"∦\",\"npar\":\"∦\",\"nparsl\":\"⫽⃥\",\"npart\":\"∂̸\",\"npolint\":\"⨔\",\"npr\":\"⊀\",\"nprcue\":\"⋠\",\"nprec\":\"⊀\",\"npreceq\":\"⪯̸\",\"npre\":\"⪯̸\",\"nrarrc\":\"⤳̸\",\"nrarr\":\"↛\",\"nrArr\":\"⇏\",\"nrarrw\":\"↝̸\",\"nrightarrow\":\"↛\",\"nRightarrow\":\"⇏\",\"nrtri\":\"⋫\",\"nrtrie\":\"⋭\",\"nsc\":\"⊁\",\"nsccue\":\"⋡\",\"nsce\":\"⪰̸\",\"Nscr\":\"𝒩\",\"nscr\":\"𝓃\",\"nshortmid\":\"∤\",\"nshortparallel\":\"∦\",\"nsim\":\"≁\",\"nsime\":\"≄\",\"nsimeq\":\"≄\",\"nsmid\":\"∤\",\"nspar\":\"∦\",\"nsqsube\":\"⋢\",\"nsqsupe\":\"⋣\",\"nsub\":\"⊄\",\"nsubE\":\"⫅̸\",\"nsube\":\"⊈\",\"nsubset\":\"⊂⃒\",\"nsubseteq\":\"⊈\",\"nsubseteqq\":\"⫅̸\",\"nsucc\":\"⊁\",\"nsucceq\":\"⪰̸\",\"nsup\":\"⊅\",\"nsupE\":\"⫆̸\",\"nsupe\":\"⊉\",\"nsupset\":\"⊃⃒\",\"nsupseteq\":\"⊉\",\"nsupseteqq\":\"⫆̸\",\"ntgl\":\"≹\",\"Ntilde\":\"Ñ\",\"ntilde\":\"ñ\",\"ntlg\":\"≸\",\"ntriangleleft\":\"⋪\",\"ntrianglelefteq\":\"⋬\",\"ntriangleright\":\"⋫\",\"ntrianglerighteq\":\"⋭\",\"Nu\":\"Ν\",\"nu\":\"ν\",\"num\":\"#\",\"numero\":\"№\",\"numsp\":\" \",\"nvap\":\"≍⃒\",\"nvdash\":\"⊬\",\"nvDash\":\"⊭\",\"nVdash\":\"⊮\",\"nVDash\":\"⊯\",\"nvge\":\"≥⃒\",\"nvgt\":\">⃒\",\"nvHarr\":\"⤄\",\"nvinfin\":\"⧞\",\"nvlArr\":\"⤂\",\"nvle\":\"≤⃒\",\"nvlt\":\"<⃒\",\"nvltrie\":\"⊴⃒\",\"nvrArr\":\"⤃\",\"nvrtrie\":\"⊵⃒\",\"nvsim\":\"∼⃒\",\"nwarhk\":\"⤣\",\"nwarr\":\"↖\",\"nwArr\":\"⇖\",\"nwarrow\":\"↖\",\"nwnear\":\"⤧\",\"Oacute\":\"Ó\",\"oacute\":\"ó\",\"oast\":\"⊛\",\"Ocirc\":\"Ô\",\"ocirc\":\"ô\",\"ocir\":\"⊚\",\"Ocy\":\"О\",\"ocy\":\"о\",\"odash\":\"⊝\",\"Odblac\":\"Ő\",\"odblac\":\"ő\",\"odiv\":\"⨸\",\"odot\":\"⊙\",\"odsold\":\"⦼\",\"OElig\":\"Œ\",\"oelig\":\"œ\",\"ofcir\":\"⦿\",\"Ofr\":\"𝔒\",\"ofr\":\"𝔬\",\"ogon\":\"˛\",\"Ograve\":\"Ò\",\"ograve\":\"ò\",\"ogt\":\"⧁\",\"ohbar\":\"⦵\",\"ohm\":\"Ω\",\"oint\":\"∮\",\"olarr\":\"↺\",\"olcir\":\"⦾\",\"olcross\":\"⦻\",\"oline\":\"‾\",\"olt\":\"⧀\",\"Omacr\":\"Ō\",\"omacr\":\"ō\",\"Omega\":\"Ω\",\"omega\":\"ω\",\"Omicron\":\"Ο\",\"omicron\":\"ο\",\"omid\":\"⦶\",\"ominus\":\"⊖\",\"Oopf\":\"𝕆\",\"oopf\":\"𝕠\",\"opar\":\"⦷\",\"OpenCurlyDoubleQuote\":\"“\",\"OpenCurlyQuote\":\"‘\",\"operp\":\"⦹\",\"oplus\":\"⊕\",\"orarr\":\"↻\",\"Or\":\"⩔\",\"or\":\"∨\",\"ord\":\"⩝\",\"order\":\"ℴ\",\"orderof\":\"ℴ\",\"ordf\":\"ª\",\"ordm\":\"º\",\"origof\":\"⊶\",\"oror\":\"⩖\",\"orslope\":\"⩗\",\"orv\":\"⩛\",\"oS\":\"Ⓢ\",\"Oscr\":\"𝒪\",\"oscr\":\"ℴ\",\"Oslash\":\"Ø\",\"oslash\":\"ø\",\"osol\":\"⊘\",\"Otilde\":\"Õ\",\"otilde\":\"õ\",\"otimesas\":\"⨶\",\"Otimes\":\"⨷\",\"otimes\":\"⊗\",\"Ouml\":\"Ö\",\"ouml\":\"ö\",\"ovbar\":\"⌽\",\"OverBar\":\"‾\",\"OverBrace\":\"⏞\",\"OverBracket\":\"⎴\",\"OverParenthesis\":\"⏜\",\"para\":\"¶\",\"parallel\":\"∥\",\"par\":\"∥\",\"parsim\":\"⫳\",\"parsl\":\"⫽\",\"part\":\"∂\",\"PartialD\":\"∂\",\"Pcy\":\"П\",\"pcy\":\"п\",\"percnt\":\"%\",\"period\":\".\",\"permil\":\"‰\",\"perp\":\"⊥\",\"pertenk\":\"‱\",\"Pfr\":\"𝔓\",\"pfr\":\"𝔭\",\"Phi\":\"Φ\",\"phi\":\"φ\",\"phiv\":\"ϕ\",\"phmmat\":\"ℳ\",\"phone\":\"☎\",\"Pi\":\"Π\",\"pi\":\"π\",\"pitchfork\":\"⋔\",\"piv\":\"ϖ\",\"planck\":\"ℏ\",\"planckh\":\"ℎ\",\"plankv\":\"ℏ\",\"plusacir\":\"⨣\",\"plusb\":\"⊞\",\"pluscir\":\"⨢\",\"plus\":\"+\",\"plusdo\":\"∔\",\"plusdu\":\"⨥\",\"pluse\":\"⩲\",\"PlusMinus\":\"±\",\"plusmn\":\"±\",\"plussim\":\"⨦\",\"plustwo\":\"⨧\",\"pm\":\"±\",\"Poincareplane\":\"ℌ\",\"pointint\":\"⨕\",\"popf\":\"𝕡\",\"Popf\":\"ℙ\",\"pound\":\"£\",\"prap\":\"⪷\",\"Pr\":\"⪻\",\"pr\":\"≺\",\"prcue\":\"≼\",\"precapprox\":\"⪷\",\"prec\":\"≺\",\"preccurlyeq\":\"≼\",\"Precedes\":\"≺\",\"PrecedesEqual\":\"⪯\",\"PrecedesSlantEqual\":\"≼\",\"PrecedesTilde\":\"≾\",\"preceq\":\"⪯\",\"precnapprox\":\"⪹\",\"precneqq\":\"⪵\",\"precnsim\":\"⋨\",\"pre\":\"⪯\",\"prE\":\"⪳\",\"precsim\":\"≾\",\"prime\":\"′\",\"Prime\":\"″\",\"primes\":\"ℙ\",\"prnap\":\"⪹\",\"prnE\":\"⪵\",\"prnsim\":\"⋨\",\"prod\":\"∏\",\"Product\":\"∏\",\"profalar\":\"⌮\",\"profline\":\"⌒\",\"profsurf\":\"⌓\",\"prop\":\"∝\",\"Proportional\":\"∝\",\"Proportion\":\"∷\",\"propto\":\"∝\",\"prsim\":\"≾\",\"prurel\":\"⊰\",\"Pscr\":\"𝒫\",\"pscr\":\"𝓅\",\"Psi\":\"Ψ\",\"psi\":\"ψ\",\"puncsp\":\" \",\"Qfr\":\"𝔔\",\"qfr\":\"𝔮\",\"qint\":\"⨌\",\"qopf\":\"𝕢\",\"Qopf\":\"ℚ\",\"qprime\":\"⁗\",\"Qscr\":\"𝒬\",\"qscr\":\"𝓆\",\"quaternions\":\"ℍ\",\"quatint\":\"⨖\",\"quest\":\"?\",\"questeq\":\"≟\",\"quot\":\"\\\"\",\"QUOT\":\"\\\"\",\"rAarr\":\"⇛\",\"race\":\"∽̱\",\"Racute\":\"Ŕ\",\"racute\":\"ŕ\",\"radic\":\"√\",\"raemptyv\":\"⦳\",\"rang\":\"⟩\",\"Rang\":\"⟫\",\"rangd\":\"⦒\",\"range\":\"⦥\",\"rangle\":\"⟩\",\"raquo\":\"»\",\"rarrap\":\"⥵\",\"rarrb\":\"⇥\",\"rarrbfs\":\"⤠\",\"rarrc\":\"⤳\",\"rarr\":\"→\",\"Rarr\":\"↠\",\"rArr\":\"⇒\",\"rarrfs\":\"⤞\",\"rarrhk\":\"↪\",\"rarrlp\":\"↬\",\"rarrpl\":\"⥅\",\"rarrsim\":\"⥴\",\"Rarrtl\":\"⤖\",\"rarrtl\":\"↣\",\"rarrw\":\"↝\",\"ratail\":\"⤚\",\"rAtail\":\"⤜\",\"ratio\":\"∶\",\"rationals\":\"ℚ\",\"rbarr\":\"⤍\",\"rBarr\":\"⤏\",\"RBarr\":\"⤐\",\"rbbrk\":\"❳\",\"rbrace\":\"}\",\"rbrack\":\"]\",\"rbrke\":\"⦌\",\"rbrksld\":\"⦎\",\"rbrkslu\":\"⦐\",\"Rcaron\":\"Ř\",\"rcaron\":\"ř\",\"Rcedil\":\"Ŗ\",\"rcedil\":\"ŗ\",\"rceil\":\"⌉\",\"rcub\":\"}\",\"Rcy\":\"Р\",\"rcy\":\"р\",\"rdca\":\"⤷\",\"rdldhar\":\"⥩\",\"rdquo\":\"”\",\"rdquor\":\"”\",\"rdsh\":\"↳\",\"real\":\"ℜ\",\"realine\":\"ℛ\",\"realpart\":\"ℜ\",\"reals\":\"ℝ\",\"Re\":\"ℜ\",\"rect\":\"▭\",\"reg\":\"®\",\"REG\":\"®\",\"ReverseElement\":\"∋\",\"ReverseEquilibrium\":\"⇋\",\"ReverseUpEquilibrium\":\"⥯\",\"rfisht\":\"⥽\",\"rfloor\":\"⌋\",\"rfr\":\"𝔯\",\"Rfr\":\"ℜ\",\"rHar\":\"⥤\",\"rhard\":\"⇁\",\"rharu\":\"⇀\",\"rharul\":\"⥬\",\"Rho\":\"Ρ\",\"rho\":\"ρ\",\"rhov\":\"ϱ\",\"RightAngleBracket\":\"⟩\",\"RightArrowBar\":\"⇥\",\"rightarrow\":\"→\",\"RightArrow\":\"→\",\"Rightarrow\":\"⇒\",\"RightArrowLeftArrow\":\"⇄\",\"rightarrowtail\":\"↣\",\"RightCeiling\":\"⌉\",\"RightDoubleBracket\":\"⟧\",\"RightDownTeeVector\":\"⥝\",\"RightDownVectorBar\":\"⥕\",\"RightDownVector\":\"⇂\",\"RightFloor\":\"⌋\",\"rightharpoondown\":\"⇁\",\"rightharpoonup\":\"⇀\",\"rightleftarrows\":\"⇄\",\"rightleftharpoons\":\"⇌\",\"rightrightarrows\":\"⇉\",\"rightsquigarrow\":\"↝\",\"RightTeeArrow\":\"↦\",\"RightTee\":\"⊢\",\"RightTeeVector\":\"⥛\",\"rightthreetimes\":\"⋌\",\"RightTriangleBar\":\"⧐\",\"RightTriangle\":\"⊳\",\"RightTriangleEqual\":\"⊵\",\"RightUpDownVector\":\"⥏\",\"RightUpTeeVector\":\"⥜\",\"RightUpVectorBar\":\"⥔\",\"RightUpVector\":\"↾\",\"RightVectorBar\":\"⥓\",\"RightVector\":\"⇀\",\"ring\":\"˚\",\"risingdotseq\":\"≓\",\"rlarr\":\"⇄\",\"rlhar\":\"⇌\",\"rlm\":\"‏\",\"rmoustache\":\"⎱\",\"rmoust\":\"⎱\",\"rnmid\":\"⫮\",\"roang\":\"⟭\",\"roarr\":\"⇾\",\"robrk\":\"⟧\",\"ropar\":\"⦆\",\"ropf\":\"𝕣\",\"Ropf\":\"ℝ\",\"roplus\":\"⨮\",\"rotimes\":\"⨵\",\"RoundImplies\":\"⥰\",\"rpar\":\")\",\"rpargt\":\"⦔\",\"rppolint\":\"⨒\",\"rrarr\":\"⇉\",\"Rrightarrow\":\"⇛\",\"rsaquo\":\"›\",\"rscr\":\"𝓇\",\"Rscr\":\"ℛ\",\"rsh\":\"↱\",\"Rsh\":\"↱\",\"rsqb\":\"]\",\"rsquo\":\"’\",\"rsquor\":\"’\",\"rthree\":\"⋌\",\"rtimes\":\"⋊\",\"rtri\":\"▹\",\"rtrie\":\"⊵\",\"rtrif\":\"▸\",\"rtriltri\":\"⧎\",\"RuleDelayed\":\"⧴\",\"ruluhar\":\"⥨\",\"rx\":\"℞\",\"Sacute\":\"Ś\",\"sacute\":\"ś\",\"sbquo\":\"‚\",\"scap\":\"⪸\",\"Scaron\":\"Š\",\"scaron\":\"š\",\"Sc\":\"⪼\",\"sc\":\"≻\",\"sccue\":\"≽\",\"sce\":\"⪰\",\"scE\":\"⪴\",\"Scedil\":\"Ş\",\"scedil\":\"ş\",\"Scirc\":\"Ŝ\",\"scirc\":\"ŝ\",\"scnap\":\"⪺\",\"scnE\":\"⪶\",\"scnsim\":\"⋩\",\"scpolint\":\"⨓\",\"scsim\":\"≿\",\"Scy\":\"С\",\"scy\":\"с\",\"sdotb\":\"⊡\",\"sdot\":\"⋅\",\"sdote\":\"⩦\",\"searhk\":\"⤥\",\"searr\":\"↘\",\"seArr\":\"⇘\",\"searrow\":\"↘\",\"sect\":\"§\",\"semi\":\";\",\"seswar\":\"⤩\",\"setminus\":\"∖\",\"setmn\":\"∖\",\"sext\":\"✶\",\"Sfr\":\"𝔖\",\"sfr\":\"𝔰\",\"sfrown\":\"⌢\",\"sharp\":\"♯\",\"SHCHcy\":\"Щ\",\"shchcy\":\"щ\",\"SHcy\":\"Ш\",\"shcy\":\"ш\",\"ShortDownArrow\":\"↓\",\"ShortLeftArrow\":\"←\",\"shortmid\":\"∣\",\"shortparallel\":\"∥\",\"ShortRightArrow\":\"→\",\"ShortUpArrow\":\"↑\",\"shy\":\"­\",\"Sigma\":\"Σ\",\"sigma\":\"σ\",\"sigmaf\":\"ς\",\"sigmav\":\"ς\",\"sim\":\"∼\",\"simdot\":\"⩪\",\"sime\":\"≃\",\"simeq\":\"≃\",\"simg\":\"⪞\",\"simgE\":\"⪠\",\"siml\":\"⪝\",\"simlE\":\"⪟\",\"simne\":\"≆\",\"simplus\":\"⨤\",\"simrarr\":\"⥲\",\"slarr\":\"←\",\"SmallCircle\":\"∘\",\"smallsetminus\":\"∖\",\"smashp\":\"⨳\",\"smeparsl\":\"⧤\",\"smid\":\"∣\",\"smile\":\"⌣\",\"smt\":\"⪪\",\"smte\":\"⪬\",\"smtes\":\"⪬︀\",\"SOFTcy\":\"Ь\",\"softcy\":\"ь\",\"solbar\":\"⌿\",\"solb\":\"⧄\",\"sol\":\"/\",\"Sopf\":\"𝕊\",\"sopf\":\"𝕤\",\"spades\":\"♠\",\"spadesuit\":\"♠\",\"spar\":\"∥\",\"sqcap\":\"⊓\",\"sqcaps\":\"⊓︀\",\"sqcup\":\"⊔\",\"sqcups\":\"⊔︀\",\"Sqrt\":\"√\",\"sqsub\":\"⊏\",\"sqsube\":\"⊑\",\"sqsubset\":\"⊏\",\"sqsubseteq\":\"⊑\",\"sqsup\":\"⊐\",\"sqsupe\":\"⊒\",\"sqsupset\":\"⊐\",\"sqsupseteq\":\"⊒\",\"square\":\"□\",\"Square\":\"□\",\"SquareIntersection\":\"⊓\",\"SquareSubset\":\"⊏\",\"SquareSubsetEqual\":\"⊑\",\"SquareSuperset\":\"⊐\",\"SquareSupersetEqual\":\"⊒\",\"SquareUnion\":\"⊔\",\"squarf\":\"▪\",\"squ\":\"□\",\"squf\":\"▪\",\"srarr\":\"→\",\"Sscr\":\"𝒮\",\"sscr\":\"𝓈\",\"ssetmn\":\"∖\",\"ssmile\":\"⌣\",\"sstarf\":\"⋆\",\"Star\":\"⋆\",\"star\":\"☆\",\"starf\":\"★\",\"straightepsilon\":\"ϵ\",\"straightphi\":\"ϕ\",\"strns\":\"¯\",\"sub\":\"⊂\",\"Sub\":\"⋐\",\"subdot\":\"⪽\",\"subE\":\"⫅\",\"sube\":\"⊆\",\"subedot\":\"⫃\",\"submult\":\"⫁\",\"subnE\":\"⫋\",\"subne\":\"⊊\",\"subplus\":\"⪿\",\"subrarr\":\"⥹\",\"subset\":\"⊂\",\"Subset\":\"⋐\",\"subseteq\":\"⊆\",\"subseteqq\":\"⫅\",\"SubsetEqual\":\"⊆\",\"subsetneq\":\"⊊\",\"subsetneqq\":\"⫋\",\"subsim\":\"⫇\",\"subsub\":\"⫕\",\"subsup\":\"⫓\",\"succapprox\":\"⪸\",\"succ\":\"≻\",\"succcurlyeq\":\"≽\",\"Succeeds\":\"≻\",\"SucceedsEqual\":\"⪰\",\"SucceedsSlantEqual\":\"≽\",\"SucceedsTilde\":\"≿\",\"succeq\":\"⪰\",\"succnapprox\":\"⪺\",\"succneqq\":\"⪶\",\"succnsim\":\"⋩\",\"succsim\":\"≿\",\"SuchThat\":\"∋\",\"sum\":\"∑\",\"Sum\":\"∑\",\"sung\":\"♪\",\"sup1\":\"¹\",\"sup2\":\"²\",\"sup3\":\"³\",\"sup\":\"⊃\",\"Sup\":\"⋑\",\"supdot\":\"⪾\",\"supdsub\":\"⫘\",\"supE\":\"⫆\",\"supe\":\"⊇\",\"supedot\":\"⫄\",\"Superset\":\"⊃\",\"SupersetEqual\":\"⊇\",\"suphsol\":\"⟉\",\"suphsub\":\"⫗\",\"suplarr\":\"⥻\",\"supmult\":\"⫂\",\"supnE\":\"⫌\",\"supne\":\"⊋\",\"supplus\":\"⫀\",\"supset\":\"⊃\",\"Supset\":\"⋑\",\"supseteq\":\"⊇\",\"supseteqq\":\"⫆\",\"supsetneq\":\"⊋\",\"supsetneqq\":\"⫌\",\"supsim\":\"⫈\",\"supsub\":\"⫔\",\"supsup\":\"⫖\",\"swarhk\":\"⤦\",\"swarr\":\"↙\",\"swArr\":\"⇙\",\"swarrow\":\"↙\",\"swnwar\":\"⤪\",\"szlig\":\"ß\",\"Tab\":\"\\t\",\"target\":\"⌖\",\"Tau\":\"Τ\",\"tau\":\"τ\",\"tbrk\":\"⎴\",\"Tcaron\":\"Ť\",\"tcaron\":\"ť\",\"Tcedil\":\"Ţ\",\"tcedil\":\"ţ\",\"Tcy\":\"Т\",\"tcy\":\"т\",\"tdot\":\"⃛\",\"telrec\":\"⌕\",\"Tfr\":\"𝔗\",\"tfr\":\"𝔱\",\"there4\":\"∴\",\"therefore\":\"∴\",\"Therefore\":\"∴\",\"Theta\":\"Θ\",\"theta\":\"θ\",\"thetasym\":\"ϑ\",\"thetav\":\"ϑ\",\"thickapprox\":\"≈\",\"thicksim\":\"∼\",\"ThickSpace\":\"  \",\"ThinSpace\":\" \",\"thinsp\":\" \",\"thkap\":\"≈\",\"thksim\":\"∼\",\"THORN\":\"Þ\",\"thorn\":\"þ\",\"tilde\":\"˜\",\"Tilde\":\"∼\",\"TildeEqual\":\"≃\",\"TildeFullEqual\":\"≅\",\"TildeTilde\":\"≈\",\"timesbar\":\"⨱\",\"timesb\":\"⊠\",\"times\":\"×\",\"timesd\":\"⨰\",\"tint\":\"∭\",\"toea\":\"⤨\",\"topbot\":\"⌶\",\"topcir\":\"⫱\",\"top\":\"⊤\",\"Topf\":\"𝕋\",\"topf\":\"𝕥\",\"topfork\":\"⫚\",\"tosa\":\"⤩\",\"tprime\":\"‴\",\"trade\":\"™\",\"TRADE\":\"™\",\"triangle\":\"▵\",\"triangledown\":\"▿\",\"triangleleft\":\"◃\",\"trianglelefteq\":\"⊴\",\"triangleq\":\"≜\",\"triangleright\":\"▹\",\"trianglerighteq\":\"⊵\",\"tridot\":\"◬\",\"trie\":\"≜\",\"triminus\":\"⨺\",\"TripleDot\":\"⃛\",\"triplus\":\"⨹\",\"trisb\":\"⧍\",\"tritime\":\"⨻\",\"trpezium\":\"⏢\",\"Tscr\":\"𝒯\",\"tscr\":\"𝓉\",\"TScy\":\"Ц\",\"tscy\":\"ц\",\"TSHcy\":\"Ћ\",\"tshcy\":\"ћ\",\"Tstrok\":\"Ŧ\",\"tstrok\":\"ŧ\",\"twixt\":\"≬\",\"twoheadleftarrow\":\"↞\",\"twoheadrightarrow\":\"↠\",\"Uacute\":\"Ú\",\"uacute\":\"ú\",\"uarr\":\"↑\",\"Uarr\":\"↟\",\"uArr\":\"⇑\",\"Uarrocir\":\"⥉\",\"Ubrcy\":\"Ў\",\"ubrcy\":\"ў\",\"Ubreve\":\"Ŭ\",\"ubreve\":\"ŭ\",\"Ucirc\":\"Û\",\"ucirc\":\"û\",\"Ucy\":\"У\",\"ucy\":\"у\",\"udarr\":\"⇅\",\"Udblac\":\"Ű\",\"udblac\":\"ű\",\"udhar\":\"⥮\",\"ufisht\":\"⥾\",\"Ufr\":\"𝔘\",\"ufr\":\"𝔲\",\"Ugrave\":\"Ù\",\"ugrave\":\"ù\",\"uHar\":\"⥣\",\"uharl\":\"↿\",\"uharr\":\"↾\",\"uhblk\":\"▀\",\"ulcorn\":\"⌜\",\"ulcorner\":\"⌜\",\"ulcrop\":\"⌏\",\"ultri\":\"◸\",\"Umacr\":\"Ū\",\"umacr\":\"ū\",\"uml\":\"¨\",\"UnderBar\":\"_\",\"UnderBrace\":\"⏟\",\"UnderBracket\":\"⎵\",\"UnderParenthesis\":\"⏝\",\"Union\":\"⋃\",\"UnionPlus\":\"⊎\",\"Uogon\":\"Ų\",\"uogon\":\"ų\",\"Uopf\":\"𝕌\",\"uopf\":\"𝕦\",\"UpArrowBar\":\"⤒\",\"uparrow\":\"↑\",\"UpArrow\":\"↑\",\"Uparrow\":\"⇑\",\"UpArrowDownArrow\":\"⇅\",\"updownarrow\":\"↕\",\"UpDownArrow\":\"↕\",\"Updownarrow\":\"⇕\",\"UpEquilibrium\":\"⥮\",\"upharpoonleft\":\"↿\",\"upharpoonright\":\"↾\",\"uplus\":\"⊎\",\"UpperLeftArrow\":\"↖\",\"UpperRightArrow\":\"↗\",\"upsi\":\"υ\",\"Upsi\":\"ϒ\",\"upsih\":\"ϒ\",\"Upsilon\":\"Υ\",\"upsilon\":\"υ\",\"UpTeeArrow\":\"↥\",\"UpTee\":\"⊥\",\"upuparrows\":\"⇈\",\"urcorn\":\"⌝\",\"urcorner\":\"⌝\",\"urcrop\":\"⌎\",\"Uring\":\"Ů\",\"uring\":\"ů\",\"urtri\":\"◹\",\"Uscr\":\"𝒰\",\"uscr\":\"𝓊\",\"utdot\":\"⋰\",\"Utilde\":\"Ũ\",\"utilde\":\"ũ\",\"utri\":\"▵\",\"utrif\":\"▴\",\"uuarr\":\"⇈\",\"Uuml\":\"Ü\",\"uuml\":\"ü\",\"uwangle\":\"⦧\",\"vangrt\":\"⦜\",\"varepsilon\":\"ϵ\",\"varkappa\":\"ϰ\",\"varnothing\":\"∅\",\"varphi\":\"ϕ\",\"varpi\":\"ϖ\",\"varpropto\":\"∝\",\"varr\":\"↕\",\"vArr\":\"⇕\",\"varrho\":\"ϱ\",\"varsigma\":\"ς\",\"varsubsetneq\":\"⊊︀\",\"varsubsetneqq\":\"⫋︀\",\"varsupsetneq\":\"⊋︀\",\"varsupsetneqq\":\"⫌︀\",\"vartheta\":\"ϑ\",\"vartriangleleft\":\"⊲\",\"vartriangleright\":\"⊳\",\"vBar\":\"⫨\",\"Vbar\":\"⫫\",\"vBarv\":\"⫩\",\"Vcy\":\"В\",\"vcy\":\"в\",\"vdash\":\"⊢\",\"vDash\":\"⊨\",\"Vdash\":\"⊩\",\"VDash\":\"⊫\",\"Vdashl\":\"⫦\",\"veebar\":\"⊻\",\"vee\":\"∨\",\"Vee\":\"⋁\",\"veeeq\":\"≚\",\"vellip\":\"⋮\",\"verbar\":\"|\",\"Verbar\":\"‖\",\"vert\":\"|\",\"Vert\":\"‖\",\"VerticalBar\":\"∣\",\"VerticalLine\":\"|\",\"VerticalSeparator\":\"❘\",\"VerticalTilde\":\"≀\",\"VeryThinSpace\":\" \",\"Vfr\":\"𝔙\",\"vfr\":\"𝔳\",\"vltri\":\"⊲\",\"vnsub\":\"⊂⃒\",\"vnsup\":\"⊃⃒\",\"Vopf\":\"𝕍\",\"vopf\":\"𝕧\",\"vprop\":\"∝\",\"vrtri\":\"⊳\",\"Vscr\":\"𝒱\",\"vscr\":\"𝓋\",\"vsubnE\":\"⫋︀\",\"vsubne\":\"⊊︀\",\"vsupnE\":\"⫌︀\",\"vsupne\":\"⊋︀\",\"Vvdash\":\"⊪\",\"vzigzag\":\"⦚\",\"Wcirc\":\"Ŵ\",\"wcirc\":\"ŵ\",\"wedbar\":\"⩟\",\"wedge\":\"∧\",\"Wedge\":\"⋀\",\"wedgeq\":\"≙\",\"weierp\":\"℘\",\"Wfr\":\"𝔚\",\"wfr\":\"𝔴\",\"Wopf\":\"𝕎\",\"wopf\":\"𝕨\",\"wp\":\"℘\",\"wr\":\"≀\",\"wreath\":\"≀\",\"Wscr\":\"𝒲\",\"wscr\":\"𝓌\",\"xcap\":\"⋂\",\"xcirc\":\"◯\",\"xcup\":\"⋃\",\"xdtri\":\"▽\",\"Xfr\":\"𝔛\",\"xfr\":\"𝔵\",\"xharr\":\"⟷\",\"xhArr\":\"⟺\",\"Xi\":\"Ξ\",\"xi\":\"ξ\",\"xlarr\":\"⟵\",\"xlArr\":\"⟸\",\"xmap\":\"⟼\",\"xnis\":\"⋻\",\"xodot\":\"⨀\",\"Xopf\":\"𝕏\",\"xopf\":\"𝕩\",\"xoplus\":\"⨁\",\"xotime\":\"⨂\",\"xrarr\":\"⟶\",\"xrArr\":\"⟹\",\"Xscr\":\"𝒳\",\"xscr\":\"𝓍\",\"xsqcup\":\"⨆\",\"xuplus\":\"⨄\",\"xutri\":\"△\",\"xvee\":\"⋁\",\"xwedge\":\"⋀\",\"Yacute\":\"Ý\",\"yacute\":\"ý\",\"YAcy\":\"Я\",\"yacy\":\"я\",\"Ycirc\":\"Ŷ\",\"ycirc\":\"ŷ\",\"Ycy\":\"Ы\",\"ycy\":\"ы\",\"yen\":\"¥\",\"Yfr\":\"𝔜\",\"yfr\":\"𝔶\",\"YIcy\":\"Ї\",\"yicy\":\"ї\",\"Yopf\":\"𝕐\",\"yopf\":\"𝕪\",\"Yscr\":\"𝒴\",\"yscr\":\"𝓎\",\"YUcy\":\"Ю\",\"yucy\":\"ю\",\"yuml\":\"ÿ\",\"Yuml\":\"Ÿ\",\"Zacute\":\"Ź\",\"zacute\":\"ź\",\"Zcaron\":\"Ž\",\"zcaron\":\"ž\",\"Zcy\":\"З\",\"zcy\":\"з\",\"Zdot\":\"Ż\",\"zdot\":\"ż\",\"zeetrf\":\"ℨ\",\"ZeroWidthSpace\":\"​\",\"Zeta\":\"Ζ\",\"zeta\":\"ζ\",\"zfr\":\"𝔷\",\"Zfr\":\"ℨ\",\"ZHcy\":\"Ж\",\"zhcy\":\"ж\",\"zigrarr\":\"⇝\",\"zopf\":\"𝕫\",\"Zopf\":\"ℤ\",\"Zscr\":\"𝒵\",\"zscr\":\"𝓏\",\"zwj\":\"‍\",\"zwnj\":\"‌\"}");

/***/ }),

/***/ "../../util/sugar/node_modules/entities/lib/maps/legacy.json":
/*!*********************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/entities/lib/maps/legacy.json ***!
  \*********************************************************************************************************************/
/*! exports provided: Aacute, aacute, Acirc, acirc, acute, AElig, aelig, Agrave, agrave, amp, AMP, Aring, aring, Atilde, atilde, Auml, auml, brvbar, Ccedil, ccedil, cedil, cent, copy, COPY, curren, deg, divide, Eacute, eacute, Ecirc, ecirc, Egrave, egrave, ETH, eth, Euml, euml, frac12, frac14, frac34, gt, GT, Iacute, iacute, Icirc, icirc, iexcl, Igrave, igrave, iquest, Iuml, iuml, laquo, lt, LT, macr, micro, middot, nbsp, not, Ntilde, ntilde, Oacute, oacute, Ocirc, ocirc, Ograve, ograve, ordf, ordm, Oslash, oslash, Otilde, otilde, Ouml, ouml, para, plusmn, pound, quot, QUOT, raquo, reg, REG, sect, shy, sup1, sup2, sup3, szlig, THORN, thorn, times, Uacute, uacute, Ucirc, ucirc, Ugrave, ugrave, uml, Uuml, uuml, Yacute, yacute, yen, yuml, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"Aacute\":\"Á\",\"aacute\":\"á\",\"Acirc\":\"Â\",\"acirc\":\"â\",\"acute\":\"´\",\"AElig\":\"Æ\",\"aelig\":\"æ\",\"Agrave\":\"À\",\"agrave\":\"à\",\"amp\":\"&\",\"AMP\":\"&\",\"Aring\":\"Å\",\"aring\":\"å\",\"Atilde\":\"Ã\",\"atilde\":\"ã\",\"Auml\":\"Ä\",\"auml\":\"ä\",\"brvbar\":\"¦\",\"Ccedil\":\"Ç\",\"ccedil\":\"ç\",\"cedil\":\"¸\",\"cent\":\"¢\",\"copy\":\"©\",\"COPY\":\"©\",\"curren\":\"¤\",\"deg\":\"°\",\"divide\":\"÷\",\"Eacute\":\"É\",\"eacute\":\"é\",\"Ecirc\":\"Ê\",\"ecirc\":\"ê\",\"Egrave\":\"È\",\"egrave\":\"è\",\"ETH\":\"Ð\",\"eth\":\"ð\",\"Euml\":\"Ë\",\"euml\":\"ë\",\"frac12\":\"½\",\"frac14\":\"¼\",\"frac34\":\"¾\",\"gt\":\">\",\"GT\":\">\",\"Iacute\":\"Í\",\"iacute\":\"í\",\"Icirc\":\"Î\",\"icirc\":\"î\",\"iexcl\":\"¡\",\"Igrave\":\"Ì\",\"igrave\":\"ì\",\"iquest\":\"¿\",\"Iuml\":\"Ï\",\"iuml\":\"ï\",\"laquo\":\"«\",\"lt\":\"<\",\"LT\":\"<\",\"macr\":\"¯\",\"micro\":\"µ\",\"middot\":\"·\",\"nbsp\":\" \",\"not\":\"¬\",\"Ntilde\":\"Ñ\",\"ntilde\":\"ñ\",\"Oacute\":\"Ó\",\"oacute\":\"ó\",\"Ocirc\":\"Ô\",\"ocirc\":\"ô\",\"Ograve\":\"Ò\",\"ograve\":\"ò\",\"ordf\":\"ª\",\"ordm\":\"º\",\"Oslash\":\"Ø\",\"oslash\":\"ø\",\"Otilde\":\"Õ\",\"otilde\":\"õ\",\"Ouml\":\"Ö\",\"ouml\":\"ö\",\"para\":\"¶\",\"plusmn\":\"±\",\"pound\":\"£\",\"quot\":\"\\\"\",\"QUOT\":\"\\\"\",\"raquo\":\"»\",\"reg\":\"®\",\"REG\":\"®\",\"sect\":\"§\",\"shy\":\"­\",\"sup1\":\"¹\",\"sup2\":\"²\",\"sup3\":\"³\",\"szlig\":\"ß\",\"THORN\":\"Þ\",\"thorn\":\"þ\",\"times\":\"×\",\"Uacute\":\"Ú\",\"uacute\":\"ú\",\"Ucirc\":\"Û\",\"ucirc\":\"û\",\"Ugrave\":\"Ù\",\"ugrave\":\"ù\",\"uml\":\"¨\",\"Uuml\":\"Ü\",\"uuml\":\"ü\",\"Yacute\":\"Ý\",\"yacute\":\"ý\",\"yen\":\"¥\",\"yuml\":\"ÿ\"}");

/***/ }),

/***/ "../../util/sugar/node_modules/entities/lib/maps/xml.json":
/*!******************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/entities/lib/maps/xml.json ***!
  \******************************************************************************************************************/
/*! exports provided: amp, apos, gt, lt, quot, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"amp\":\"&\",\"apos\":\"'\",\"gt\":\">\",\"lt\":\"<\",\"quot\":\"\\\"\"}");

/***/ }),

/***/ "../../util/sugar/node_modules/events/events.js":
/*!********************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/events/events.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "../../util/sugar/node_modules/htmlparser2/lib/CollectingHandler.js":
/*!****************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/htmlparser2/lib/CollectingHandler.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = CollectingHandler;

function CollectingHandler(cbs) {
    this._cbs = cbs || {};
    this.events = [];
}

var EVENTS = __webpack_require__(/*! ./ */ "../../util/sugar/node_modules/htmlparser2/lib/index.js").EVENTS;
Object.keys(EVENTS).forEach(function(name) {
    if (EVENTS[name] === 0) {
        name = "on" + name;
        CollectingHandler.prototype[name] = function() {
            this.events.push([name]);
            if (this._cbs[name]) this._cbs[name]();
        };
    } else if (EVENTS[name] === 1) {
        name = "on" + name;
        CollectingHandler.prototype[name] = function(a) {
            this.events.push([name, a]);
            if (this._cbs[name]) this._cbs[name](a);
        };
    } else if (EVENTS[name] === 2) {
        name = "on" + name;
        CollectingHandler.prototype[name] = function(a, b) {
            this.events.push([name, a, b]);
            if (this._cbs[name]) this._cbs[name](a, b);
        };
    } else {
        throw Error("wrong number of arguments");
    }
});

CollectingHandler.prototype.onreset = function() {
    this.events = [];
    if (this._cbs.onreset) this._cbs.onreset();
};

CollectingHandler.prototype.restart = function() {
    if (this._cbs.onreset) this._cbs.onreset();

    for (var i = 0, len = this.events.length; i < len; i++) {
        if (this._cbs[this.events[i][0]]) {
            var num = this.events[i].length;

            if (num === 1) {
                this._cbs[this.events[i][0]]();
            } else if (num === 2) {
                this._cbs[this.events[i][0]](this.events[i][1]);
            } else {
                this._cbs[this.events[i][0]](
                    this.events[i][1],
                    this.events[i][2]
                );
            }
        }
    }
};


/***/ }),

/***/ "../../util/sugar/node_modules/htmlparser2/lib/FeedHandler.js":
/*!**********************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/htmlparser2/lib/FeedHandler.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DomHandler = __webpack_require__(/*! domhandler */ "../../util/sugar/node_modules/domhandler/index.js");
var DomUtils = __webpack_require__(/*! domutils */ "../../util/sugar/node_modules/domutils/index.js");

//TODO: make this a streamable handler
function FeedHandler(callback, options) {
    this.init(callback, options);
}

__webpack_require__(/*! inherits */ "../../util/sugar/node_modules/inherits/inherits_browser.js")(FeedHandler, DomHandler);

FeedHandler.prototype.init = DomHandler;

function getElements(what, where) {
    return DomUtils.getElementsByTagName(what, where, true);
}
function getOneElement(what, where) {
    return DomUtils.getElementsByTagName(what, where, true, 1)[0];
}
function fetch(what, where, recurse) {
    return DomUtils.getText(
        DomUtils.getElementsByTagName(what, where, recurse, 1)
    ).trim();
}

function addConditionally(obj, prop, what, where, recurse) {
    var tmp = fetch(what, where, recurse);
    if (tmp) obj[prop] = tmp;
}

var isValidFeed = function(value) {
    return value === "rss" || value === "feed" || value === "rdf:RDF";
};

FeedHandler.prototype.onend = function() {
    var feed = {},
        feedRoot = getOneElement(isValidFeed, this.dom),
        tmp,
        childs;

    if (feedRoot) {
        if (feedRoot.name === "feed") {
            childs = feedRoot.children;

            feed.type = "atom";
            addConditionally(feed, "id", "id", childs);
            addConditionally(feed, "title", "title", childs);
            if (
                (tmp = getOneElement("link", childs)) &&
                (tmp = tmp.attribs) &&
                (tmp = tmp.href)
            )
                feed.link = tmp;
            addConditionally(feed, "description", "subtitle", childs);
            if ((tmp = fetch("updated", childs))) feed.updated = new Date(tmp);
            addConditionally(feed, "author", "email", childs, true);

            feed.items = getElements("entry", childs).map(function(item) {
                var entry = {},
                    tmp;

                item = item.children;

                addConditionally(entry, "id", "id", item);
                addConditionally(entry, "title", "title", item);
                if (
                    (tmp = getOneElement("link", item)) &&
                    (tmp = tmp.attribs) &&
                    (tmp = tmp.href)
                )
                    entry.link = tmp;
                if ((tmp = fetch("summary", item) || fetch("content", item)))
                    entry.description = tmp;
                if ((tmp = fetch("updated", item)))
                    entry.pubDate = new Date(tmp);
                return entry;
            });
        } else {
            childs = getOneElement("channel", feedRoot.children).children;

            feed.type = feedRoot.name.substr(0, 3);
            feed.id = "";
            addConditionally(feed, "title", "title", childs);
            addConditionally(feed, "link", "link", childs);
            addConditionally(feed, "description", "description", childs);
            if ((tmp = fetch("lastBuildDate", childs)))
                feed.updated = new Date(tmp);
            addConditionally(feed, "author", "managingEditor", childs, true);

            feed.items = getElements("item", feedRoot.children).map(function(
                item
            ) {
                var entry = {},
                    tmp;

                item = item.children;

                addConditionally(entry, "id", "guid", item);
                addConditionally(entry, "title", "title", item);
                addConditionally(entry, "link", "link", item);
                addConditionally(entry, "description", "description", item);
                if ((tmp = fetch("pubDate", item)))
                    entry.pubDate = new Date(tmp);
                return entry;
            });
        }
    }
    this.dom = feed;
    DomHandler.prototype._handleCallback.call(
        this,
        feedRoot ? null : Error("couldn't find root of feed")
    );
};

module.exports = FeedHandler;


/***/ }),

/***/ "../../util/sugar/node_modules/htmlparser2/lib/Parser.js":
/*!*****************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/htmlparser2/lib/Parser.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Tokenizer = __webpack_require__(/*! ./Tokenizer.js */ "../../util/sugar/node_modules/htmlparser2/lib/Tokenizer.js");

/*
	Options:

	xmlMode: Disables the special behavior for script/style tags (false by default)
	lowerCaseAttributeNames: call .toLowerCase for each attribute name (true if xmlMode is `false`)
	lowerCaseTags: call .toLowerCase for each tag name (true if xmlMode is `false`)
*/

/*
	Callbacks:

	oncdataend,
	oncdatastart,
	onclosetag,
	oncomment,
	oncommentend,
	onerror,
	onopentag,
	onprocessinginstruction,
	onreset,
	ontext
*/

var formTags = {
    input: true,
    option: true,
    optgroup: true,
    select: true,
    button: true,
    datalist: true,
    textarea: true
};

var openImpliesClose = {
    tr: { tr: true, th: true, td: true },
    th: { th: true },
    td: { thead: true, th: true, td: true },
    body: { head: true, link: true, script: true },
    li: { li: true },
    p: { p: true },
    h1: { p: true },
    h2: { p: true },
    h3: { p: true },
    h4: { p: true },
    h5: { p: true },
    h6: { p: true },
    select: formTags,
    input: formTags,
    output: formTags,
    button: formTags,
    datalist: formTags,
    textarea: formTags,
    option: { option: true },
    optgroup: { optgroup: true }
};

var voidElements = {
    __proto__: null,
    area: true,
    base: true,
    basefont: true,
    br: true,
    col: true,
    command: true,
    embed: true,
    frame: true,
    hr: true,
    img: true,
    input: true,
    isindex: true,
    keygen: true,
    link: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true
};

var foreignContextElements = {
    __proto__: null,
    math: true,
    svg: true
};
var htmlIntegrationElements = {
    __proto__: null,
    mi: true,
    mo: true,
    mn: true,
    ms: true,
    mtext: true,
    "annotation-xml": true,
    foreignObject: true,
    desc: true,
    title: true
};

var re_nameEnd = /\s|\//;

function Parser(cbs, options) {
    this._options = options || {};
    this._cbs = cbs || {};

    this._tagname = "";
    this._attribname = "";
    this._attribvalue = "";
    this._attribs = null;
    this._stack = [];
    this._foreignContext = [];

    this.startIndex = 0;
    this.endIndex = null;

    this._lowerCaseTagNames =
        "lowerCaseTags" in this._options
            ? !!this._options.lowerCaseTags
            : !this._options.xmlMode;
    this._lowerCaseAttributeNames =
        "lowerCaseAttributeNames" in this._options
            ? !!this._options.lowerCaseAttributeNames
            : !this._options.xmlMode;

    if (this._options.Tokenizer) {
        Tokenizer = this._options.Tokenizer;
    }
    this._tokenizer = new Tokenizer(this._options, this);

    if (this._cbs.onparserinit) this._cbs.onparserinit(this);
}

__webpack_require__(/*! inherits */ "../../util/sugar/node_modules/inherits/inherits_browser.js")(Parser, __webpack_require__(/*! events */ "../../util/sugar/node_modules/events/events.js").EventEmitter);

Parser.prototype._updatePosition = function(initialOffset) {
    if (this.endIndex === null) {
        if (this._tokenizer._sectionStart <= initialOffset) {
            this.startIndex = 0;
        } else {
            this.startIndex = this._tokenizer._sectionStart - initialOffset;
        }
    } else this.startIndex = this.endIndex + 1;
    this.endIndex = this._tokenizer.getAbsoluteIndex();
};

//Tokenizer event handlers
Parser.prototype.ontext = function(data) {
    this._updatePosition(1);
    this.endIndex--;

    if (this._cbs.ontext) this._cbs.ontext(data);
};

Parser.prototype.onopentagname = function(name) {
    if (this._lowerCaseTagNames) {
        name = name.toLowerCase();
    }

    this._tagname = name;

    if (!this._options.xmlMode && name in openImpliesClose) {
        for (
            var el;
            (el = this._stack[this._stack.length - 1]) in
            openImpliesClose[name];
            this.onclosetag(el)
        );
    }

    if (this._options.xmlMode || !(name in voidElements)) {
        this._stack.push(name);
        if (name in foreignContextElements) this._foreignContext.push(true);
        else if (name in htmlIntegrationElements)
            this._foreignContext.push(false);
    }

    if (this._cbs.onopentagname) this._cbs.onopentagname(name);
    if (this._cbs.onopentag) this._attribs = {};
};

Parser.prototype.onopentagend = function() {
    this._updatePosition(1);

    if (this._attribs) {
        if (this._cbs.onopentag)
            this._cbs.onopentag(this._tagname, this._attribs);
        this._attribs = null;
    }

    if (
        !this._options.xmlMode &&
        this._cbs.onclosetag &&
        this._tagname in voidElements
    ) {
        this._cbs.onclosetag(this._tagname);
    }

    this._tagname = "";
};

Parser.prototype.onclosetag = function(name) {
    this._updatePosition(1);

    if (this._lowerCaseTagNames) {
        name = name.toLowerCase();
    }
    
    if (name in foreignContextElements || name in htmlIntegrationElements) {
        this._foreignContext.pop();
    }

    if (
        this._stack.length &&
        (!(name in voidElements) || this._options.xmlMode)
    ) {
        var pos = this._stack.lastIndexOf(name);
        if (pos !== -1) {
            if (this._cbs.onclosetag) {
                pos = this._stack.length - pos;
                while (pos--) this._cbs.onclosetag(this._stack.pop());
            } else this._stack.length = pos;
        } else if (name === "p" && !this._options.xmlMode) {
            this.onopentagname(name);
            this._closeCurrentTag();
        }
    } else if (!this._options.xmlMode && (name === "br" || name === "p")) {
        this.onopentagname(name);
        this._closeCurrentTag();
    }
};

Parser.prototype.onselfclosingtag = function() {
    if (
        this._options.xmlMode ||
        this._options.recognizeSelfClosing ||
        this._foreignContext[this._foreignContext.length - 1]
    ) {
        this._closeCurrentTag();
    } else {
        this.onopentagend();
    }
};

Parser.prototype._closeCurrentTag = function() {
    var name = this._tagname;

    this.onopentagend();

    //self-closing tags will be on the top of the stack
    //(cheaper check than in onclosetag)
    if (this._stack[this._stack.length - 1] === name) {
        if (this._cbs.onclosetag) {
            this._cbs.onclosetag(name);
        }
        this._stack.pop();
        
    }
};

Parser.prototype.onattribname = function(name) {
    if (this._lowerCaseAttributeNames) {
        name = name.toLowerCase();
    }
    this._attribname = name;
};

Parser.prototype.onattribdata = function(value) {
    this._attribvalue += value;
};

Parser.prototype.onattribend = function() {
    if (this._cbs.onattribute)
        this._cbs.onattribute(this._attribname, this._attribvalue);
    if (
        this._attribs &&
        !Object.prototype.hasOwnProperty.call(this._attribs, this._attribname)
    ) {
        this._attribs[this._attribname] = this._attribvalue;
    }
    this._attribname = "";
    this._attribvalue = "";
};

Parser.prototype._getInstructionName = function(value) {
    var idx = value.search(re_nameEnd),
        name = idx < 0 ? value : value.substr(0, idx);

    if (this._lowerCaseTagNames) {
        name = name.toLowerCase();
    }

    return name;
};

Parser.prototype.ondeclaration = function(value) {
    if (this._cbs.onprocessinginstruction) {
        var name = this._getInstructionName(value);
        this._cbs.onprocessinginstruction("!" + name, "!" + value);
    }
};

Parser.prototype.onprocessinginstruction = function(value) {
    if (this._cbs.onprocessinginstruction) {
        var name = this._getInstructionName(value);
        this._cbs.onprocessinginstruction("?" + name, "?" + value);
    }
};

Parser.prototype.oncomment = function(value) {
    this._updatePosition(4);

    if (this._cbs.oncomment) this._cbs.oncomment(value);
    if (this._cbs.oncommentend) this._cbs.oncommentend();
};

Parser.prototype.oncdata = function(value) {
    this._updatePosition(1);

    if (this._options.xmlMode || this._options.recognizeCDATA) {
        if (this._cbs.oncdatastart) this._cbs.oncdatastart();
        if (this._cbs.ontext) this._cbs.ontext(value);
        if (this._cbs.oncdataend) this._cbs.oncdataend();
    } else {
        this.oncomment("[CDATA[" + value + "]]");
    }
};

Parser.prototype.onerror = function(err) {
    if (this._cbs.onerror) this._cbs.onerror(err);
};

Parser.prototype.onend = function() {
    if (this._cbs.onclosetag) {
        for (
            var i = this._stack.length;
            i > 0;
            this._cbs.onclosetag(this._stack[--i])
        );
    }
    if (this._cbs.onend) this._cbs.onend();
};

//Resets the parser to a blank state, ready to parse a new HTML document
Parser.prototype.reset = function() {
    if (this._cbs.onreset) this._cbs.onreset();
    this._tokenizer.reset();

    this._tagname = "";
    this._attribname = "";
    this._attribs = null;
    this._stack = [];

    if (this._cbs.onparserinit) this._cbs.onparserinit(this);
};

//Parses a complete HTML document and pushes it to the handler
Parser.prototype.parseComplete = function(data) {
    this.reset();
    this.end(data);
};

Parser.prototype.write = function(chunk) {
    this._tokenizer.write(chunk);
};

Parser.prototype.end = function(chunk) {
    this._tokenizer.end(chunk);
};

Parser.prototype.pause = function() {
    this._tokenizer.pause();
};

Parser.prototype.resume = function() {
    this._tokenizer.resume();
};

//alias for backwards compat
Parser.prototype.parseChunk = Parser.prototype.write;
Parser.prototype.done = Parser.prototype.end;

module.exports = Parser;


/***/ }),

/***/ "../../util/sugar/node_modules/htmlparser2/lib/ProxyHandler.js":
/*!***********************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/htmlparser2/lib/ProxyHandler.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = ProxyHandler;

function ProxyHandler(cbs) {
    this._cbs = cbs || {};
}

var EVENTS = __webpack_require__(/*! ./ */ "../../util/sugar/node_modules/htmlparser2/lib/index.js").EVENTS;
Object.keys(EVENTS).forEach(function(name) {
    if (EVENTS[name] === 0) {
        name = "on" + name;
        ProxyHandler.prototype[name] = function() {
            if (this._cbs[name]) this._cbs[name]();
        };
    } else if (EVENTS[name] === 1) {
        name = "on" + name;
        ProxyHandler.prototype[name] = function(a) {
            if (this._cbs[name]) this._cbs[name](a);
        };
    } else if (EVENTS[name] === 2) {
        name = "on" + name;
        ProxyHandler.prototype[name] = function(a, b) {
            if (this._cbs[name]) this._cbs[name](a, b);
        };
    } else {
        throw Error("wrong number of arguments");
    }
});


/***/ }),

/***/ "../../util/sugar/node_modules/htmlparser2/lib/Stream.js":
/*!*****************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/htmlparser2/lib/Stream.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = Stream;

var Parser = __webpack_require__(/*! ./WritableStream.js */ "../../util/sugar/node_modules/htmlparser2/lib/WritableStream.js");

function Stream(options) {
    Parser.call(this, new Cbs(this), options);
}

__webpack_require__(/*! inherits */ "../../util/sugar/node_modules/inherits/inherits_browser.js")(Stream, Parser);

Stream.prototype.readable = true;

function Cbs(scope) {
    this.scope = scope;
}

var EVENTS = __webpack_require__(/*! ../ */ "../../util/sugar/node_modules/htmlparser2/lib/index.js").EVENTS;

Object.keys(EVENTS).forEach(function(name) {
    if (EVENTS[name] === 0) {
        Cbs.prototype["on" + name] = function() {
            this.scope.emit(name);
        };
    } else if (EVENTS[name] === 1) {
        Cbs.prototype["on" + name] = function(a) {
            this.scope.emit(name, a);
        };
    } else if (EVENTS[name] === 2) {
        Cbs.prototype["on" + name] = function(a, b) {
            this.scope.emit(name, a, b);
        };
    } else {
        throw Error("wrong number of arguments!");
    }
});


/***/ }),

/***/ "../../util/sugar/node_modules/htmlparser2/lib/Tokenizer.js":
/*!********************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/htmlparser2/lib/Tokenizer.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = Tokenizer;

var decodeCodePoint = __webpack_require__(/*! entities/lib/decode_codepoint.js */ "../../util/sugar/node_modules/htmlparser2/node_modules/entities/lib/decode_codepoint.js");
var entityMap = __webpack_require__(/*! entities/maps/entities.json */ "../../util/sugar/node_modules/htmlparser2/node_modules/entities/maps/entities.json");
var legacyMap = __webpack_require__(/*! entities/maps/legacy.json */ "../../util/sugar/node_modules/htmlparser2/node_modules/entities/maps/legacy.json");
var xmlMap = __webpack_require__(/*! entities/maps/xml.json */ "../../util/sugar/node_modules/htmlparser2/node_modules/entities/maps/xml.json");

var i = 0;

var TEXT = i++;
var BEFORE_TAG_NAME = i++; //after <
var IN_TAG_NAME = i++;
var IN_SELF_CLOSING_TAG = i++;
var BEFORE_CLOSING_TAG_NAME = i++;
var IN_CLOSING_TAG_NAME = i++;
var AFTER_CLOSING_TAG_NAME = i++;

//attributes
var BEFORE_ATTRIBUTE_NAME = i++;
var IN_ATTRIBUTE_NAME = i++;
var AFTER_ATTRIBUTE_NAME = i++;
var BEFORE_ATTRIBUTE_VALUE = i++;
var IN_ATTRIBUTE_VALUE_DQ = i++; // "
var IN_ATTRIBUTE_VALUE_SQ = i++; // '
var IN_ATTRIBUTE_VALUE_NQ = i++;

//declarations
var BEFORE_DECLARATION = i++; // !
var IN_DECLARATION = i++;

//processing instructions
var IN_PROCESSING_INSTRUCTION = i++; // ?

//comments
var BEFORE_COMMENT = i++;
var IN_COMMENT = i++;
var AFTER_COMMENT_1 = i++;
var AFTER_COMMENT_2 = i++;

//cdata
var BEFORE_CDATA_1 = i++; // [
var BEFORE_CDATA_2 = i++; // C
var BEFORE_CDATA_3 = i++; // D
var BEFORE_CDATA_4 = i++; // A
var BEFORE_CDATA_5 = i++; // T
var BEFORE_CDATA_6 = i++; // A
var IN_CDATA = i++; // [
var AFTER_CDATA_1 = i++; // ]
var AFTER_CDATA_2 = i++; // ]

//special tags
var BEFORE_SPECIAL = i++; //S
var BEFORE_SPECIAL_END = i++; //S

var BEFORE_SCRIPT_1 = i++; //C
var BEFORE_SCRIPT_2 = i++; //R
var BEFORE_SCRIPT_3 = i++; //I
var BEFORE_SCRIPT_4 = i++; //P
var BEFORE_SCRIPT_5 = i++; //T
var AFTER_SCRIPT_1 = i++; //C
var AFTER_SCRIPT_2 = i++; //R
var AFTER_SCRIPT_3 = i++; //I
var AFTER_SCRIPT_4 = i++; //P
var AFTER_SCRIPT_5 = i++; //T

var BEFORE_STYLE_1 = i++; //T
var BEFORE_STYLE_2 = i++; //Y
var BEFORE_STYLE_3 = i++; //L
var BEFORE_STYLE_4 = i++; //E
var AFTER_STYLE_1 = i++; //T
var AFTER_STYLE_2 = i++; //Y
var AFTER_STYLE_3 = i++; //L
var AFTER_STYLE_4 = i++; //E

var BEFORE_ENTITY = i++; //&
var BEFORE_NUMERIC_ENTITY = i++; //#
var IN_NAMED_ENTITY = i++;
var IN_NUMERIC_ENTITY = i++;
var IN_HEX_ENTITY = i++; //X

var j = 0;

var SPECIAL_NONE = j++;
var SPECIAL_SCRIPT = j++;
var SPECIAL_STYLE = j++;

function whitespace(c) {
    return c === " " || c === "\n" || c === "\t" || c === "\f" || c === "\r";
}

function ifElseState(upper, SUCCESS, FAILURE) {
    var lower = upper.toLowerCase();

    if (upper === lower) {
        return function(c) {
            if (c === lower) {
                this._state = SUCCESS;
            } else {
                this._state = FAILURE;
                this._index--;
            }
        };
    } else {
        return function(c) {
            if (c === lower || c === upper) {
                this._state = SUCCESS;
            } else {
                this._state = FAILURE;
                this._index--;
            }
        };
    }
}

function consumeSpecialNameChar(upper, NEXT_STATE) {
    var lower = upper.toLowerCase();

    return function(c) {
        if (c === lower || c === upper) {
            this._state = NEXT_STATE;
        } else {
            this._state = IN_TAG_NAME;
            this._index--; //consume the token again
        }
    };
}

function Tokenizer(options, cbs) {
    this._state = TEXT;
    this._buffer = "";
    this._sectionStart = 0;
    this._index = 0;
    this._bufferOffset = 0; //chars removed from _buffer
    this._baseState = TEXT;
    this._special = SPECIAL_NONE;
    this._cbs = cbs;
    this._running = true;
    this._ended = false;
    this._xmlMode = !!(options && options.xmlMode);
    this._decodeEntities = !!(options && options.decodeEntities);
}

Tokenizer.prototype._stateText = function(c) {
    if (c === "<") {
        if (this._index > this._sectionStart) {
            this._cbs.ontext(this._getSection());
        }
        this._state = BEFORE_TAG_NAME;
        this._sectionStart = this._index;
    } else if (
        this._decodeEntities &&
        this._special === SPECIAL_NONE &&
        c === "&"
    ) {
        if (this._index > this._sectionStart) {
            this._cbs.ontext(this._getSection());
        }
        this._baseState = TEXT;
        this._state = BEFORE_ENTITY;
        this._sectionStart = this._index;
    }
};

Tokenizer.prototype._stateBeforeTagName = function(c) {
    if (c === "/") {
        this._state = BEFORE_CLOSING_TAG_NAME;
    } else if (c === "<") {
        this._cbs.ontext(this._getSection());
        this._sectionStart = this._index;
    } else if (c === ">" || this._special !== SPECIAL_NONE || whitespace(c)) {
        this._state = TEXT;
    } else if (c === "!") {
        this._state = BEFORE_DECLARATION;
        this._sectionStart = this._index + 1;
    } else if (c === "?") {
        this._state = IN_PROCESSING_INSTRUCTION;
        this._sectionStart = this._index + 1;
    } else {
        this._state =
            !this._xmlMode && (c === "s" || c === "S")
                ? BEFORE_SPECIAL
                : IN_TAG_NAME;
        this._sectionStart = this._index;
    }
};

Tokenizer.prototype._stateInTagName = function(c) {
    if (c === "/" || c === ">" || whitespace(c)) {
        this._emitToken("onopentagname");
        this._state = BEFORE_ATTRIBUTE_NAME;
        this._index--;
    }
};

Tokenizer.prototype._stateBeforeCloseingTagName = function(c) {
    if (whitespace(c));
    else if (c === ">") {
        this._state = TEXT;
    } else if (this._special !== SPECIAL_NONE) {
        if (c === "s" || c === "S") {
            this._state = BEFORE_SPECIAL_END;
        } else {
            this._state = TEXT;
            this._index--;
        }
    } else {
        this._state = IN_CLOSING_TAG_NAME;
        this._sectionStart = this._index;
    }
};

Tokenizer.prototype._stateInCloseingTagName = function(c) {
    if (c === ">" || whitespace(c)) {
        this._emitToken("onclosetag");
        this._state = AFTER_CLOSING_TAG_NAME;
        this._index--;
    }
};

Tokenizer.prototype._stateAfterCloseingTagName = function(c) {
    //skip everything until ">"
    if (c === ">") {
        this._state = TEXT;
        this._sectionStart = this._index + 1;
    }
};

Tokenizer.prototype._stateBeforeAttributeName = function(c) {
    if (c === ">") {
        this._cbs.onopentagend();
        this._state = TEXT;
        this._sectionStart = this._index + 1;
    } else if (c === "/") {
        this._state = IN_SELF_CLOSING_TAG;
    } else if (!whitespace(c)) {
        this._state = IN_ATTRIBUTE_NAME;
        this._sectionStart = this._index;
    }
};

Tokenizer.prototype._stateInSelfClosingTag = function(c) {
    if (c === ">") {
        this._cbs.onselfclosingtag();
        this._state = TEXT;
        this._sectionStart = this._index + 1;
    } else if (!whitespace(c)) {
        this._state = BEFORE_ATTRIBUTE_NAME;
        this._index--;
    }
};

Tokenizer.prototype._stateInAttributeName = function(c) {
    if (c === "=" || c === "/" || c === ">" || whitespace(c)) {
        this._cbs.onattribname(this._getSection());
        this._sectionStart = -1;
        this._state = AFTER_ATTRIBUTE_NAME;
        this._index--;
    }
};

Tokenizer.prototype._stateAfterAttributeName = function(c) {
    if (c === "=") {
        this._state = BEFORE_ATTRIBUTE_VALUE;
    } else if (c === "/" || c === ">") {
        this._cbs.onattribend();
        this._state = BEFORE_ATTRIBUTE_NAME;
        this._index--;
    } else if (!whitespace(c)) {
        this._cbs.onattribend();
        this._state = IN_ATTRIBUTE_NAME;
        this._sectionStart = this._index;
    }
};

Tokenizer.prototype._stateBeforeAttributeValue = function(c) {
    if (c === '"') {
        this._state = IN_ATTRIBUTE_VALUE_DQ;
        this._sectionStart = this._index + 1;
    } else if (c === "'") {
        this._state = IN_ATTRIBUTE_VALUE_SQ;
        this._sectionStart = this._index + 1;
    } else if (!whitespace(c)) {
        this._state = IN_ATTRIBUTE_VALUE_NQ;
        this._sectionStart = this._index;
        this._index--; //reconsume token
    }
};

Tokenizer.prototype._stateInAttributeValueDoubleQuotes = function(c) {
    if (c === '"') {
        this._emitToken("onattribdata");
        this._cbs.onattribend();
        this._state = BEFORE_ATTRIBUTE_NAME;
    } else if (this._decodeEntities && c === "&") {
        this._emitToken("onattribdata");
        this._baseState = this._state;
        this._state = BEFORE_ENTITY;
        this._sectionStart = this._index;
    }
};

Tokenizer.prototype._stateInAttributeValueSingleQuotes = function(c) {
    if (c === "'") {
        this._emitToken("onattribdata");
        this._cbs.onattribend();
        this._state = BEFORE_ATTRIBUTE_NAME;
    } else if (this._decodeEntities && c === "&") {
        this._emitToken("onattribdata");
        this._baseState = this._state;
        this._state = BEFORE_ENTITY;
        this._sectionStart = this._index;
    }
};

Tokenizer.prototype._stateInAttributeValueNoQuotes = function(c) {
    if (whitespace(c) || c === ">") {
        this._emitToken("onattribdata");
        this._cbs.onattribend();
        this._state = BEFORE_ATTRIBUTE_NAME;
        this._index--;
    } else if (this._decodeEntities && c === "&") {
        this._emitToken("onattribdata");
        this._baseState = this._state;
        this._state = BEFORE_ENTITY;
        this._sectionStart = this._index;
    }
};

Tokenizer.prototype._stateBeforeDeclaration = function(c) {
    this._state =
        c === "["
            ? BEFORE_CDATA_1
            : c === "-"
                ? BEFORE_COMMENT
                : IN_DECLARATION;
};

Tokenizer.prototype._stateInDeclaration = function(c) {
    if (c === ">") {
        this._cbs.ondeclaration(this._getSection());
        this._state = TEXT;
        this._sectionStart = this._index + 1;
    }
};

Tokenizer.prototype._stateInProcessingInstruction = function(c) {
    if (c === ">") {
        this._cbs.onprocessinginstruction(this._getSection());
        this._state = TEXT;
        this._sectionStart = this._index + 1;
    }
};

Tokenizer.prototype._stateBeforeComment = function(c) {
    if (c === "-") {
        this._state = IN_COMMENT;
        this._sectionStart = this._index + 1;
    } else {
        this._state = IN_DECLARATION;
    }
};

Tokenizer.prototype._stateInComment = function(c) {
    if (c === "-") this._state = AFTER_COMMENT_1;
};

Tokenizer.prototype._stateAfterComment1 = function(c) {
    if (c === "-") {
        this._state = AFTER_COMMENT_2;
    } else {
        this._state = IN_COMMENT;
    }
};

Tokenizer.prototype._stateAfterComment2 = function(c) {
    if (c === ">") {
        //remove 2 trailing chars
        this._cbs.oncomment(
            this._buffer.substring(this._sectionStart, this._index - 2)
        );
        this._state = TEXT;
        this._sectionStart = this._index + 1;
    } else if (c !== "-") {
        this._state = IN_COMMENT;
    }
    // else: stay in AFTER_COMMENT_2 (`--->`)
};

Tokenizer.prototype._stateBeforeCdata1 = ifElseState(
    "C",
    BEFORE_CDATA_2,
    IN_DECLARATION
);
Tokenizer.prototype._stateBeforeCdata2 = ifElseState(
    "D",
    BEFORE_CDATA_3,
    IN_DECLARATION
);
Tokenizer.prototype._stateBeforeCdata3 = ifElseState(
    "A",
    BEFORE_CDATA_4,
    IN_DECLARATION
);
Tokenizer.prototype._stateBeforeCdata4 = ifElseState(
    "T",
    BEFORE_CDATA_5,
    IN_DECLARATION
);
Tokenizer.prototype._stateBeforeCdata5 = ifElseState(
    "A",
    BEFORE_CDATA_6,
    IN_DECLARATION
);

Tokenizer.prototype._stateBeforeCdata6 = function(c) {
    if (c === "[") {
        this._state = IN_CDATA;
        this._sectionStart = this._index + 1;
    } else {
        this._state = IN_DECLARATION;
        this._index--;
    }
};

Tokenizer.prototype._stateInCdata = function(c) {
    if (c === "]") this._state = AFTER_CDATA_1;
};

Tokenizer.prototype._stateAfterCdata1 = function(c) {
    if (c === "]") this._state = AFTER_CDATA_2;
    else this._state = IN_CDATA;
};

Tokenizer.prototype._stateAfterCdata2 = function(c) {
    if (c === ">") {
        //remove 2 trailing chars
        this._cbs.oncdata(
            this._buffer.substring(this._sectionStart, this._index - 2)
        );
        this._state = TEXT;
        this._sectionStart = this._index + 1;
    } else if (c !== "]") {
        this._state = IN_CDATA;
    }
    //else: stay in AFTER_CDATA_2 (`]]]>`)
};

Tokenizer.prototype._stateBeforeSpecial = function(c) {
    if (c === "c" || c === "C") {
        this._state = BEFORE_SCRIPT_1;
    } else if (c === "t" || c === "T") {
        this._state = BEFORE_STYLE_1;
    } else {
        this._state = IN_TAG_NAME;
        this._index--; //consume the token again
    }
};

Tokenizer.prototype._stateBeforeSpecialEnd = function(c) {
    if (this._special === SPECIAL_SCRIPT && (c === "c" || c === "C")) {
        this._state = AFTER_SCRIPT_1;
    } else if (this._special === SPECIAL_STYLE && (c === "t" || c === "T")) {
        this._state = AFTER_STYLE_1;
    } else this._state = TEXT;
};

Tokenizer.prototype._stateBeforeScript1 = consumeSpecialNameChar(
    "R",
    BEFORE_SCRIPT_2
);
Tokenizer.prototype._stateBeforeScript2 = consumeSpecialNameChar(
    "I",
    BEFORE_SCRIPT_3
);
Tokenizer.prototype._stateBeforeScript3 = consumeSpecialNameChar(
    "P",
    BEFORE_SCRIPT_4
);
Tokenizer.prototype._stateBeforeScript4 = consumeSpecialNameChar(
    "T",
    BEFORE_SCRIPT_5
);

Tokenizer.prototype._stateBeforeScript5 = function(c) {
    if (c === "/" || c === ">" || whitespace(c)) {
        this._special = SPECIAL_SCRIPT;
    }
    this._state = IN_TAG_NAME;
    this._index--; //consume the token again
};

Tokenizer.prototype._stateAfterScript1 = ifElseState("R", AFTER_SCRIPT_2, TEXT);
Tokenizer.prototype._stateAfterScript2 = ifElseState("I", AFTER_SCRIPT_3, TEXT);
Tokenizer.prototype._stateAfterScript3 = ifElseState("P", AFTER_SCRIPT_4, TEXT);
Tokenizer.prototype._stateAfterScript4 = ifElseState("T", AFTER_SCRIPT_5, TEXT);

Tokenizer.prototype._stateAfterScript5 = function(c) {
    if (c === ">" || whitespace(c)) {
        this._special = SPECIAL_NONE;
        this._state = IN_CLOSING_TAG_NAME;
        this._sectionStart = this._index - 6;
        this._index--; //reconsume the token
    } else this._state = TEXT;
};

Tokenizer.prototype._stateBeforeStyle1 = consumeSpecialNameChar(
    "Y",
    BEFORE_STYLE_2
);
Tokenizer.prototype._stateBeforeStyle2 = consumeSpecialNameChar(
    "L",
    BEFORE_STYLE_3
);
Tokenizer.prototype._stateBeforeStyle3 = consumeSpecialNameChar(
    "E",
    BEFORE_STYLE_4
);

Tokenizer.prototype._stateBeforeStyle4 = function(c) {
    if (c === "/" || c === ">" || whitespace(c)) {
        this._special = SPECIAL_STYLE;
    }
    this._state = IN_TAG_NAME;
    this._index--; //consume the token again
};

Tokenizer.prototype._stateAfterStyle1 = ifElseState("Y", AFTER_STYLE_2, TEXT);
Tokenizer.prototype._stateAfterStyle2 = ifElseState("L", AFTER_STYLE_3, TEXT);
Tokenizer.prototype._stateAfterStyle3 = ifElseState("E", AFTER_STYLE_4, TEXT);

Tokenizer.prototype._stateAfterStyle4 = function(c) {
    if (c === ">" || whitespace(c)) {
        this._special = SPECIAL_NONE;
        this._state = IN_CLOSING_TAG_NAME;
        this._sectionStart = this._index - 5;
        this._index--; //reconsume the token
    } else this._state = TEXT;
};

Tokenizer.prototype._stateBeforeEntity = ifElseState(
    "#",
    BEFORE_NUMERIC_ENTITY,
    IN_NAMED_ENTITY
);
Tokenizer.prototype._stateBeforeNumericEntity = ifElseState(
    "X",
    IN_HEX_ENTITY,
    IN_NUMERIC_ENTITY
);

//for entities terminated with a semicolon
Tokenizer.prototype._parseNamedEntityStrict = function() {
    //offset = 1
    if (this._sectionStart + 1 < this._index) {
        var entity = this._buffer.substring(
                this._sectionStart + 1,
                this._index
            ),
            map = this._xmlMode ? xmlMap : entityMap;

        if (map.hasOwnProperty(entity)) {
            this._emitPartial(map[entity]);
            this._sectionStart = this._index + 1;
        }
    }
};

//parses legacy entities (without trailing semicolon)
Tokenizer.prototype._parseLegacyEntity = function() {
    var start = this._sectionStart + 1,
        limit = this._index - start;

    if (limit > 6) limit = 6; //the max length of legacy entities is 6

    while (limit >= 2) {
        //the min length of legacy entities is 2
        var entity = this._buffer.substr(start, limit);

        if (legacyMap.hasOwnProperty(entity)) {
            this._emitPartial(legacyMap[entity]);
            this._sectionStart += limit + 1;
            return;
        } else {
            limit--;
        }
    }
};

Tokenizer.prototype._stateInNamedEntity = function(c) {
    if (c === ";") {
        this._parseNamedEntityStrict();
        if (this._sectionStart + 1 < this._index && !this._xmlMode) {
            this._parseLegacyEntity();
        }
        this._state = this._baseState;
    } else if (
        (c < "a" || c > "z") &&
        (c < "A" || c > "Z") &&
        (c < "0" || c > "9")
    ) {
        if (this._xmlMode);
        else if (this._sectionStart + 1 === this._index);
        else if (this._baseState !== TEXT) {
            if (c !== "=") {
                this._parseNamedEntityStrict();
            }
        } else {
            this._parseLegacyEntity();
        }

        this._state = this._baseState;
        this._index--;
    }
};

Tokenizer.prototype._decodeNumericEntity = function(offset, base) {
    var sectionStart = this._sectionStart + offset;

    if (sectionStart !== this._index) {
        //parse entity
        var entity = this._buffer.substring(sectionStart, this._index);
        var parsed = parseInt(entity, base);

        this._emitPartial(decodeCodePoint(parsed));
        this._sectionStart = this._index;
    } else {
        this._sectionStart--;
    }

    this._state = this._baseState;
};

Tokenizer.prototype._stateInNumericEntity = function(c) {
    if (c === ";") {
        this._decodeNumericEntity(2, 10);
        this._sectionStart++;
    } else if (c < "0" || c > "9") {
        if (!this._xmlMode) {
            this._decodeNumericEntity(2, 10);
        } else {
            this._state = this._baseState;
        }
        this._index--;
    }
};

Tokenizer.prototype._stateInHexEntity = function(c) {
    if (c === ";") {
        this._decodeNumericEntity(3, 16);
        this._sectionStart++;
    } else if (
        (c < "a" || c > "f") &&
        (c < "A" || c > "F") &&
        (c < "0" || c > "9")
    ) {
        if (!this._xmlMode) {
            this._decodeNumericEntity(3, 16);
        } else {
            this._state = this._baseState;
        }
        this._index--;
    }
};

Tokenizer.prototype._cleanup = function() {
    if (this._sectionStart < 0) {
        this._buffer = "";
        this._bufferOffset += this._index;
        this._index = 0;
    } else if (this._running) {
        if (this._state === TEXT) {
            if (this._sectionStart !== this._index) {
                this._cbs.ontext(this._buffer.substr(this._sectionStart));
            }
            this._buffer = "";
            this._bufferOffset += this._index;
            this._index = 0;
        } else if (this._sectionStart === this._index) {
            //the section just started
            this._buffer = "";
            this._bufferOffset += this._index;
            this._index = 0;
        } else {
            //remove everything unnecessary
            this._buffer = this._buffer.substr(this._sectionStart);
            this._index -= this._sectionStart;
            this._bufferOffset += this._sectionStart;
        }

        this._sectionStart = 0;
    }
};

//TODO make events conditional
Tokenizer.prototype.write = function(chunk) {
    if (this._ended) this._cbs.onerror(Error(".write() after done!"));

    this._buffer += chunk;
    this._parse();
};

Tokenizer.prototype._parse = function() {
    while (this._index < this._buffer.length && this._running) {
        var c = this._buffer.charAt(this._index);
        if (this._state === TEXT) {
            this._stateText(c);
        } else if (this._state === BEFORE_TAG_NAME) {
            this._stateBeforeTagName(c);
        } else if (this._state === IN_TAG_NAME) {
            this._stateInTagName(c);
        } else if (this._state === BEFORE_CLOSING_TAG_NAME) {
            this._stateBeforeCloseingTagName(c);
        } else if (this._state === IN_CLOSING_TAG_NAME) {
            this._stateInCloseingTagName(c);
        } else if (this._state === AFTER_CLOSING_TAG_NAME) {
            this._stateAfterCloseingTagName(c);
        } else if (this._state === IN_SELF_CLOSING_TAG) {
            this._stateInSelfClosingTag(c);
        } else if (this._state === BEFORE_ATTRIBUTE_NAME) {

        /*
		*	attributes
		*/
            this._stateBeforeAttributeName(c);
        } else if (this._state === IN_ATTRIBUTE_NAME) {
            this._stateInAttributeName(c);
        } else if (this._state === AFTER_ATTRIBUTE_NAME) {
            this._stateAfterAttributeName(c);
        } else if (this._state === BEFORE_ATTRIBUTE_VALUE) {
            this._stateBeforeAttributeValue(c);
        } else if (this._state === IN_ATTRIBUTE_VALUE_DQ) {
            this._stateInAttributeValueDoubleQuotes(c);
        } else if (this._state === IN_ATTRIBUTE_VALUE_SQ) {
            this._stateInAttributeValueSingleQuotes(c);
        } else if (this._state === IN_ATTRIBUTE_VALUE_NQ) {
            this._stateInAttributeValueNoQuotes(c);
        } else if (this._state === BEFORE_DECLARATION) {

        /*
		*	declarations
		*/
            this._stateBeforeDeclaration(c);
        } else if (this._state === IN_DECLARATION) {
            this._stateInDeclaration(c);
        } else if (this._state === IN_PROCESSING_INSTRUCTION) {

        /*
		*	processing instructions
		*/
            this._stateInProcessingInstruction(c);
        } else if (this._state === BEFORE_COMMENT) {

        /*
		*	comments
		*/
            this._stateBeforeComment(c);
        } else if (this._state === IN_COMMENT) {
            this._stateInComment(c);
        } else if (this._state === AFTER_COMMENT_1) {
            this._stateAfterComment1(c);
        } else if (this._state === AFTER_COMMENT_2) {
            this._stateAfterComment2(c);
        } else if (this._state === BEFORE_CDATA_1) {

        /*
		*	cdata
		*/
            this._stateBeforeCdata1(c);
        } else if (this._state === BEFORE_CDATA_2) {
            this._stateBeforeCdata2(c);
        } else if (this._state === BEFORE_CDATA_3) {
            this._stateBeforeCdata3(c);
        } else if (this._state === BEFORE_CDATA_4) {
            this._stateBeforeCdata4(c);
        } else if (this._state === BEFORE_CDATA_5) {
            this._stateBeforeCdata5(c);
        } else if (this._state === BEFORE_CDATA_6) {
            this._stateBeforeCdata6(c);
        } else if (this._state === IN_CDATA) {
            this._stateInCdata(c);
        } else if (this._state === AFTER_CDATA_1) {
            this._stateAfterCdata1(c);
        } else if (this._state === AFTER_CDATA_2) {
            this._stateAfterCdata2(c);
        } else if (this._state === BEFORE_SPECIAL) {

        /*
		* special tags
		*/
            this._stateBeforeSpecial(c);
        } else if (this._state === BEFORE_SPECIAL_END) {
            this._stateBeforeSpecialEnd(c);
        } else if (this._state === BEFORE_SCRIPT_1) {

        /*
		* script
		*/
            this._stateBeforeScript1(c);
        } else if (this._state === BEFORE_SCRIPT_2) {
            this._stateBeforeScript2(c);
        } else if (this._state === BEFORE_SCRIPT_3) {
            this._stateBeforeScript3(c);
        } else if (this._state === BEFORE_SCRIPT_4) {
            this._stateBeforeScript4(c);
        } else if (this._state === BEFORE_SCRIPT_5) {
            this._stateBeforeScript5(c);
        } else if (this._state === AFTER_SCRIPT_1) {
            this._stateAfterScript1(c);
        } else if (this._state === AFTER_SCRIPT_2) {
            this._stateAfterScript2(c);
        } else if (this._state === AFTER_SCRIPT_3) {
            this._stateAfterScript3(c);
        } else if (this._state === AFTER_SCRIPT_4) {
            this._stateAfterScript4(c);
        } else if (this._state === AFTER_SCRIPT_5) {
            this._stateAfterScript5(c);
        } else if (this._state === BEFORE_STYLE_1) {

        /*
		* style
		*/
            this._stateBeforeStyle1(c);
        } else if (this._state === BEFORE_STYLE_2) {
            this._stateBeforeStyle2(c);
        } else if (this._state === BEFORE_STYLE_3) {
            this._stateBeforeStyle3(c);
        } else if (this._state === BEFORE_STYLE_4) {
            this._stateBeforeStyle4(c);
        } else if (this._state === AFTER_STYLE_1) {
            this._stateAfterStyle1(c);
        } else if (this._state === AFTER_STYLE_2) {
            this._stateAfterStyle2(c);
        } else if (this._state === AFTER_STYLE_3) {
            this._stateAfterStyle3(c);
        } else if (this._state === AFTER_STYLE_4) {
            this._stateAfterStyle4(c);
        } else if (this._state === BEFORE_ENTITY) {

        /*
		* entities
		*/
            this._stateBeforeEntity(c);
        } else if (this._state === BEFORE_NUMERIC_ENTITY) {
            this._stateBeforeNumericEntity(c);
        } else if (this._state === IN_NAMED_ENTITY) {
            this._stateInNamedEntity(c);
        } else if (this._state === IN_NUMERIC_ENTITY) {
            this._stateInNumericEntity(c);
        } else if (this._state === IN_HEX_ENTITY) {
            this._stateInHexEntity(c);
        } else {
            this._cbs.onerror(Error("unknown _state"), this._state);
        }

        this._index++;
    }

    this._cleanup();
};

Tokenizer.prototype.pause = function() {
    this._running = false;
};
Tokenizer.prototype.resume = function() {
    this._running = true;

    if (this._index < this._buffer.length) {
        this._parse();
    }
    if (this._ended) {
        this._finish();
    }
};

Tokenizer.prototype.end = function(chunk) {
    if (this._ended) this._cbs.onerror(Error(".end() after done!"));
    if (chunk) this.write(chunk);

    this._ended = true;

    if (this._running) this._finish();
};

Tokenizer.prototype._finish = function() {
    //if there is remaining data, emit it in a reasonable way
    if (this._sectionStart < this._index) {
        this._handleTrailingData();
    }

    this._cbs.onend();
};

Tokenizer.prototype._handleTrailingData = function() {
    var data = this._buffer.substr(this._sectionStart);

    if (
        this._state === IN_CDATA ||
        this._state === AFTER_CDATA_1 ||
        this._state === AFTER_CDATA_2
    ) {
        this._cbs.oncdata(data);
    } else if (
        this._state === IN_COMMENT ||
        this._state === AFTER_COMMENT_1 ||
        this._state === AFTER_COMMENT_2
    ) {
        this._cbs.oncomment(data);
    } else if (this._state === IN_NAMED_ENTITY && !this._xmlMode) {
        this._parseLegacyEntity();
        if (this._sectionStart < this._index) {
            this._state = this._baseState;
            this._handleTrailingData();
        }
    } else if (this._state === IN_NUMERIC_ENTITY && !this._xmlMode) {
        this._decodeNumericEntity(2, 10);
        if (this._sectionStart < this._index) {
            this._state = this._baseState;
            this._handleTrailingData();
        }
    } else if (this._state === IN_HEX_ENTITY && !this._xmlMode) {
        this._decodeNumericEntity(3, 16);
        if (this._sectionStart < this._index) {
            this._state = this._baseState;
            this._handleTrailingData();
        }
    } else if (
        this._state !== IN_TAG_NAME &&
        this._state !== BEFORE_ATTRIBUTE_NAME &&
        this._state !== BEFORE_ATTRIBUTE_VALUE &&
        this._state !== AFTER_ATTRIBUTE_NAME &&
        this._state !== IN_ATTRIBUTE_NAME &&
        this._state !== IN_ATTRIBUTE_VALUE_SQ &&
        this._state !== IN_ATTRIBUTE_VALUE_DQ &&
        this._state !== IN_ATTRIBUTE_VALUE_NQ &&
        this._state !== IN_CLOSING_TAG_NAME
    ) {
        this._cbs.ontext(data);
    }
    //else, ignore remaining data
    //TODO add a way to remove current tag
};

Tokenizer.prototype.reset = function() {
    Tokenizer.call(
        this,
        { xmlMode: this._xmlMode, decodeEntities: this._decodeEntities },
        this._cbs
    );
};

Tokenizer.prototype.getAbsoluteIndex = function() {
    return this._bufferOffset + this._index;
};

Tokenizer.prototype._getSection = function() {
    return this._buffer.substring(this._sectionStart, this._index);
};

Tokenizer.prototype._emitToken = function(name) {
    this._cbs[name](this._getSection());
    this._sectionStart = -1;
};

Tokenizer.prototype._emitPartial = function(value) {
    if (this._baseState !== TEXT) {
        this._cbs.onattribdata(value); //TODO implement the new event
    } else {
        this._cbs.ontext(value);
    }
};


/***/ }),

/***/ "../../util/sugar/node_modules/htmlparser2/lib/WritableStream.js":
/*!*************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/htmlparser2/lib/WritableStream.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = Stream;

var Parser = __webpack_require__(/*! ./Parser.js */ "../../util/sugar/node_modules/htmlparser2/lib/Parser.js");
var WritableStream = __webpack_require__(/*! readable-stream */ 0).Writable;
var StringDecoder = __webpack_require__(/*! string_decoder */ "../../util/sugar/node_modules/string_decoder/lib/string_decoder.js").StringDecoder;
var Buffer = __webpack_require__(/*! buffer */ "../../util/sugar/node_modules/node-libs-browser/node_modules/buffer/index.js").Buffer;

function Stream(cbs, options) {
    var parser = (this._parser = new Parser(cbs, options));
    var decoder = (this._decoder = new StringDecoder());

    WritableStream.call(this, { decodeStrings: false });

    this.once("finish", function() {
        parser.end(decoder.end());
    });
}

__webpack_require__(/*! inherits */ "../../util/sugar/node_modules/inherits/inherits_browser.js")(Stream, WritableStream);

Stream.prototype._write = function(chunk, encoding, cb) {
    if (chunk instanceof Buffer) chunk = this._decoder.write(chunk);
    this._parser.write(chunk);
    cb();
};


/***/ }),

/***/ "../../util/sugar/node_modules/htmlparser2/lib/index.js":
/*!****************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/htmlparser2/lib/index.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Parser = __webpack_require__(/*! ./Parser.js */ "../../util/sugar/node_modules/htmlparser2/lib/Parser.js");
var DomHandler = __webpack_require__(/*! domhandler */ "../../util/sugar/node_modules/domhandler/index.js");

function defineProp(name, value) {
    delete module.exports[name];
    module.exports[name] = value;
    return value;
}

module.exports = {
    Parser: Parser,
    Tokenizer: __webpack_require__(/*! ./Tokenizer.js */ "../../util/sugar/node_modules/htmlparser2/lib/Tokenizer.js"),
    ElementType: __webpack_require__(/*! domelementtype */ "../../util/sugar/node_modules/domelementtype/index.js"),
    DomHandler: DomHandler,
    get FeedHandler() {
        return defineProp("FeedHandler", __webpack_require__(/*! ./FeedHandler.js */ "../../util/sugar/node_modules/htmlparser2/lib/FeedHandler.js"));
    },
    get Stream() {
        return defineProp("Stream", __webpack_require__(/*! ./Stream.js */ "../../util/sugar/node_modules/htmlparser2/lib/Stream.js"));
    },
    get WritableStream() {
        return defineProp("WritableStream", __webpack_require__(/*! ./WritableStream.js */ "../../util/sugar/node_modules/htmlparser2/lib/WritableStream.js"));
    },
    get ProxyHandler() {
        return defineProp("ProxyHandler", __webpack_require__(/*! ./ProxyHandler.js */ "../../util/sugar/node_modules/htmlparser2/lib/ProxyHandler.js"));
    },
    get DomUtils() {
        return defineProp("DomUtils", __webpack_require__(/*! domutils */ "../../util/sugar/node_modules/domutils/index.js"));
    },
    get CollectingHandler() {
        return defineProp(
            "CollectingHandler",
            __webpack_require__(/*! ./CollectingHandler.js */ "../../util/sugar/node_modules/htmlparser2/lib/CollectingHandler.js")
        );
    },
    // For legacy support
    DefaultHandler: DomHandler,
    get RssHandler() {
        return defineProp("RssHandler", this.FeedHandler);
    },
    //helper methods
    parseDOM: function(data, options) {
        var handler = new DomHandler(options);
        new Parser(handler, options).end(data);
        return handler.dom;
    },
    parseFeed: function(feed, options) {
        var handler = new module.exports.FeedHandler(options);
        new Parser(handler, options).end(feed);
        return handler.dom;
    },
    createDomStream: function(cb, options, elementCb) {
        var handler = new DomHandler(cb, options, elementCb);
        return new Parser(handler, options);
    },
    // List of all events that the parser emits
    EVENTS: {
        /* Format: eventname: number of arguments */
        attribute: 2,
        cdatastart: 0,
        cdataend: 0,
        text: 1,
        processinginstruction: 2,
        comment: 1,
        commentend: 0,
        closetag: 1,
        opentag: 2,
        opentagname: 1,
        error: 1,
        end: 0
    }
};


/***/ }),

/***/ "../../util/sugar/node_modules/htmlparser2/node_modules/entities/lib/decode_codepoint.js":
/*!*************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/htmlparser2/node_modules/entities/lib/decode_codepoint.js ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var decodeMap = __webpack_require__(/*! ../maps/decode.json */ "../../util/sugar/node_modules/htmlparser2/node_modules/entities/maps/decode.json");

module.exports = decodeCodePoint;

// modified version of https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
function decodeCodePoint(codePoint) {
    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
        return "\uFFFD";
    }

    if (codePoint in decodeMap) {
        codePoint = decodeMap[codePoint];
    }

    var output = "";

    if (codePoint > 0xffff) {
        codePoint -= 0x10000;
        output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
        codePoint = 0xdc00 | (codePoint & 0x3ff);
    }

    output += String.fromCharCode(codePoint);
    return output;
}


/***/ }),

/***/ "../../util/sugar/node_modules/htmlparser2/node_modules/entities/maps/decode.json":
/*!******************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/htmlparser2/node_modules/entities/maps/decode.json ***!
  \******************************************************************************************************************************************/
/*! exports provided: 0, 128, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 142, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 158, 159, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"0\":65533,\"128\":8364,\"130\":8218,\"131\":402,\"132\":8222,\"133\":8230,\"134\":8224,\"135\":8225,\"136\":710,\"137\":8240,\"138\":352,\"139\":8249,\"140\":338,\"142\":381,\"145\":8216,\"146\":8217,\"147\":8220,\"148\":8221,\"149\":8226,\"150\":8211,\"151\":8212,\"152\":732,\"153\":8482,\"154\":353,\"155\":8250,\"156\":339,\"158\":382,\"159\":376}");

/***/ }),

/***/ "../../util/sugar/node_modules/htmlparser2/node_modules/entities/maps/entities.json":
/*!********************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/htmlparser2/node_modules/entities/maps/entities.json ***!
  \********************************************************************************************************************************************/
/*! exports provided: Aacute, aacute, Abreve, abreve, ac, acd, acE, Acirc, acirc, acute, Acy, acy, AElig, aelig, af, Afr, afr, Agrave, agrave, alefsym, aleph, Alpha, alpha, Amacr, amacr, amalg, amp, AMP, andand, And, and, andd, andslope, andv, ang, ange, angle, angmsdaa, angmsdab, angmsdac, angmsdad, angmsdae, angmsdaf, angmsdag, angmsdah, angmsd, angrt, angrtvb, angrtvbd, angsph, angst, angzarr, Aogon, aogon, Aopf, aopf, apacir, ap, apE, ape, apid, apos, ApplyFunction, approx, approxeq, Aring, aring, Ascr, ascr, Assign, ast, asymp, asympeq, Atilde, atilde, Auml, auml, awconint, awint, backcong, backepsilon, backprime, backsim, backsimeq, Backslash, Barv, barvee, barwed, Barwed, barwedge, bbrk, bbrktbrk, bcong, Bcy, bcy, bdquo, becaus, because, Because, bemptyv, bepsi, bernou, Bernoullis, Beta, beta, beth, between, Bfr, bfr, bigcap, bigcirc, bigcup, bigodot, bigoplus, bigotimes, bigsqcup, bigstar, bigtriangledown, bigtriangleup, biguplus, bigvee, bigwedge, bkarow, blacklozenge, blacksquare, blacktriangle, blacktriangledown, blacktriangleleft, blacktriangleright, blank, blk12, blk14, blk34, block, bne, bnequiv, bNot, bnot, Bopf, bopf, bot, bottom, bowtie, boxbox, boxdl, boxdL, boxDl, boxDL, boxdr, boxdR, boxDr, boxDR, boxh, boxH, boxhd, boxHd, boxhD, boxHD, boxhu, boxHu, boxhU, boxHU, boxminus, boxplus, boxtimes, boxul, boxuL, boxUl, boxUL, boxur, boxuR, boxUr, boxUR, boxv, boxV, boxvh, boxvH, boxVh, boxVH, boxvl, boxvL, boxVl, boxVL, boxvr, boxvR, boxVr, boxVR, bprime, breve, Breve, brvbar, bscr, Bscr, bsemi, bsim, bsime, bsolb, bsol, bsolhsub, bull, bullet, bump, bumpE, bumpe, Bumpeq, bumpeq, Cacute, cacute, capand, capbrcup, capcap, cap, Cap, capcup, capdot, CapitalDifferentialD, caps, caret, caron, Cayleys, ccaps, Ccaron, ccaron, Ccedil, ccedil, Ccirc, ccirc, Cconint, ccups, ccupssm, Cdot, cdot, cedil, Cedilla, cemptyv, cent, centerdot, CenterDot, cfr, Cfr, CHcy, chcy, check, checkmark, Chi, chi, circ, circeq, circlearrowleft, circlearrowright, circledast, circledcirc, circleddash, CircleDot, circledR, circledS, CircleMinus, CirclePlus, CircleTimes, cir, cirE, cire, cirfnint, cirmid, cirscir, ClockwiseContourIntegral, CloseCurlyDoubleQuote, CloseCurlyQuote, clubs, clubsuit, colon, Colon, Colone, colone, coloneq, comma, commat, comp, compfn, complement, complexes, cong, congdot, Congruent, conint, Conint, ContourIntegral, copf, Copf, coprod, Coproduct, copy, COPY, copysr, CounterClockwiseContourIntegral, crarr, cross, Cross, Cscr, cscr, csub, csube, csup, csupe, ctdot, cudarrl, cudarrr, cuepr, cuesc, cularr, cularrp, cupbrcap, cupcap, CupCap, cup, Cup, cupcup, cupdot, cupor, cups, curarr, curarrm, curlyeqprec, curlyeqsucc, curlyvee, curlywedge, curren, curvearrowleft, curvearrowright, cuvee, cuwed, cwconint, cwint, cylcty, dagger, Dagger, daleth, darr, Darr, dArr, dash, Dashv, dashv, dbkarow, dblac, Dcaron, dcaron, Dcy, dcy, ddagger, ddarr, DD, dd, DDotrahd, ddotseq, deg, Del, Delta, delta, demptyv, dfisht, Dfr, dfr, dHar, dharl, dharr, DiacriticalAcute, DiacriticalDot, DiacriticalDoubleAcute, DiacriticalGrave, DiacriticalTilde, diam, diamond, Diamond, diamondsuit, diams, die, DifferentialD, digamma, disin, div, divide, divideontimes, divonx, DJcy, djcy, dlcorn, dlcrop, dollar, Dopf, dopf, Dot, dot, DotDot, doteq, doteqdot, DotEqual, dotminus, dotplus, dotsquare, doublebarwedge, DoubleContourIntegral, DoubleDot, DoubleDownArrow, DoubleLeftArrow, DoubleLeftRightArrow, DoubleLeftTee, DoubleLongLeftArrow, DoubleLongLeftRightArrow, DoubleLongRightArrow, DoubleRightArrow, DoubleRightTee, DoubleUpArrow, DoubleUpDownArrow, DoubleVerticalBar, DownArrowBar, downarrow, DownArrow, Downarrow, DownArrowUpArrow, DownBreve, downdownarrows, downharpoonleft, downharpoonright, DownLeftRightVector, DownLeftTeeVector, DownLeftVectorBar, DownLeftVector, DownRightTeeVector, DownRightVectorBar, DownRightVector, DownTeeArrow, DownTee, drbkarow, drcorn, drcrop, Dscr, dscr, DScy, dscy, dsol, Dstrok, dstrok, dtdot, dtri, dtrif, duarr, duhar, dwangle, DZcy, dzcy, dzigrarr, Eacute, eacute, easter, Ecaron, ecaron, Ecirc, ecirc, ecir, ecolon, Ecy, ecy, eDDot, Edot, edot, eDot, ee, efDot, Efr, efr, eg, Egrave, egrave, egs, egsdot, el, Element, elinters, ell, els, elsdot, Emacr, emacr, empty, emptyset, EmptySmallSquare, emptyv, EmptyVerySmallSquare, emsp13, emsp14, emsp, ENG, eng, ensp, Eogon, eogon, Eopf, eopf, epar, eparsl, eplus, epsi, Epsilon, epsilon, epsiv, eqcirc, eqcolon, eqsim, eqslantgtr, eqslantless, Equal, equals, EqualTilde, equest, Equilibrium, equiv, equivDD, eqvparsl, erarr, erDot, escr, Escr, esdot, Esim, esim, Eta, eta, ETH, eth, Euml, euml, euro, excl, exist, Exists, expectation, exponentiale, ExponentialE, fallingdotseq, Fcy, fcy, female, ffilig, fflig, ffllig, Ffr, ffr, filig, FilledSmallSquare, FilledVerySmallSquare, fjlig, flat, fllig, fltns, fnof, Fopf, fopf, forall, ForAll, fork, forkv, Fouriertrf, fpartint, frac12, frac13, frac14, frac15, frac16, frac18, frac23, frac25, frac34, frac35, frac38, frac45, frac56, frac58, frac78, frasl, frown, fscr, Fscr, gacute, Gamma, gamma, Gammad, gammad, gap, Gbreve, gbreve, Gcedil, Gcirc, gcirc, Gcy, gcy, Gdot, gdot, ge, gE, gEl, gel, geq, geqq, geqslant, gescc, ges, gesdot, gesdoto, gesdotol, gesl, gesles, Gfr, gfr, gg, Gg, ggg, gimel, GJcy, gjcy, gla, gl, glE, glj, gnap, gnapprox, gne, gnE, gneq, gneqq, gnsim, Gopf, gopf, grave, GreaterEqual, GreaterEqualLess, GreaterFullEqual, GreaterGreater, GreaterLess, GreaterSlantEqual, GreaterTilde, Gscr, gscr, gsim, gsime, gsiml, gtcc, gtcir, gt, GT, Gt, gtdot, gtlPar, gtquest, gtrapprox, gtrarr, gtrdot, gtreqless, gtreqqless, gtrless, gtrsim, gvertneqq, gvnE, Hacek, hairsp, half, hamilt, HARDcy, hardcy, harrcir, harr, hArr, harrw, Hat, hbar, Hcirc, hcirc, hearts, heartsuit, hellip, hercon, hfr, Hfr, HilbertSpace, hksearow, hkswarow, hoarr, homtht, hookleftarrow, hookrightarrow, hopf, Hopf, horbar, HorizontalLine, hscr, Hscr, hslash, Hstrok, hstrok, HumpDownHump, HumpEqual, hybull, hyphen, Iacute, iacute, ic, Icirc, icirc, Icy, icy, Idot, IEcy, iecy, iexcl, iff, ifr, Ifr, Igrave, igrave, ii, iiiint, iiint, iinfin, iiota, IJlig, ijlig, Imacr, imacr, image, ImaginaryI, imagline, imagpart, imath, Im, imof, imped, Implies, incare, in, infin, infintie, inodot, intcal, int, Int, integers, Integral, intercal, Intersection, intlarhk, intprod, InvisibleComma, InvisibleTimes, IOcy, iocy, Iogon, iogon, Iopf, iopf, Iota, iota, iprod, iquest, iscr, Iscr, isin, isindot, isinE, isins, isinsv, isinv, it, Itilde, itilde, Iukcy, iukcy, Iuml, iuml, Jcirc, jcirc, Jcy, jcy, Jfr, jfr, jmath, Jopf, jopf, Jscr, jscr, Jsercy, jsercy, Jukcy, jukcy, Kappa, kappa, kappav, Kcedil, kcedil, Kcy, kcy, Kfr, kfr, kgreen, KHcy, khcy, KJcy, kjcy, Kopf, kopf, Kscr, kscr, lAarr, Lacute, lacute, laemptyv, lagran, Lambda, lambda, lang, Lang, langd, langle, lap, Laplacetrf, laquo, larrb, larrbfs, larr, Larr, lArr, larrfs, larrhk, larrlp, larrpl, larrsim, larrtl, latail, lAtail, lat, late, lates, lbarr, lBarr, lbbrk, lbrace, lbrack, lbrke, lbrksld, lbrkslu, Lcaron, lcaron, Lcedil, lcedil, lceil, lcub, Lcy, lcy, ldca, ldquo, ldquor, ldrdhar, ldrushar, ldsh, le, lE, LeftAngleBracket, LeftArrowBar, leftarrow, LeftArrow, Leftarrow, LeftArrowRightArrow, leftarrowtail, LeftCeiling, LeftDoubleBracket, LeftDownTeeVector, LeftDownVectorBar, LeftDownVector, LeftFloor, leftharpoondown, leftharpoonup, leftleftarrows, leftrightarrow, LeftRightArrow, Leftrightarrow, leftrightarrows, leftrightharpoons, leftrightsquigarrow, LeftRightVector, LeftTeeArrow, LeftTee, LeftTeeVector, leftthreetimes, LeftTriangleBar, LeftTriangle, LeftTriangleEqual, LeftUpDownVector, LeftUpTeeVector, LeftUpVectorBar, LeftUpVector, LeftVectorBar, LeftVector, lEg, leg, leq, leqq, leqslant, lescc, les, lesdot, lesdoto, lesdotor, lesg, lesges, lessapprox, lessdot, lesseqgtr, lesseqqgtr, LessEqualGreater, LessFullEqual, LessGreater, lessgtr, LessLess, lesssim, LessSlantEqual, LessTilde, lfisht, lfloor, Lfr, lfr, lg, lgE, lHar, lhard, lharu, lharul, lhblk, LJcy, ljcy, llarr, ll, Ll, llcorner, Lleftarrow, llhard, lltri, Lmidot, lmidot, lmoustache, lmoust, lnap, lnapprox, lne, lnE, lneq, lneqq, lnsim, loang, loarr, lobrk, longleftarrow, LongLeftArrow, Longleftarrow, longleftrightarrow, LongLeftRightArrow, Longleftrightarrow, longmapsto, longrightarrow, LongRightArrow, Longrightarrow, looparrowleft, looparrowright, lopar, Lopf, lopf, loplus, lotimes, lowast, lowbar, LowerLeftArrow, LowerRightArrow, loz, lozenge, lozf, lpar, lparlt, lrarr, lrcorner, lrhar, lrhard, lrm, lrtri, lsaquo, lscr, Lscr, lsh, Lsh, lsim, lsime, lsimg, lsqb, lsquo, lsquor, Lstrok, lstrok, ltcc, ltcir, lt, LT, Lt, ltdot, lthree, ltimes, ltlarr, ltquest, ltri, ltrie, ltrif, ltrPar, lurdshar, luruhar, lvertneqq, lvnE, macr, male, malt, maltese, Map, map, mapsto, mapstodown, mapstoleft, mapstoup, marker, mcomma, Mcy, mcy, mdash, mDDot, measuredangle, MediumSpace, Mellintrf, Mfr, mfr, mho, micro, midast, midcir, mid, middot, minusb, minus, minusd, minusdu, MinusPlus, mlcp, mldr, mnplus, models, Mopf, mopf, mp, mscr, Mscr, mstpos, Mu, mu, multimap, mumap, nabla, Nacute, nacute, nang, nap, napE, napid, napos, napprox, natural, naturals, natur, nbsp, nbump, nbumpe, ncap, Ncaron, ncaron, Ncedil, ncedil, ncong, ncongdot, ncup, Ncy, ncy, ndash, nearhk, nearr, neArr, nearrow, ne, nedot, NegativeMediumSpace, NegativeThickSpace, NegativeThinSpace, NegativeVeryThinSpace, nequiv, nesear, nesim, NestedGreaterGreater, NestedLessLess, NewLine, nexist, nexists, Nfr, nfr, ngE, nge, ngeq, ngeqq, ngeqslant, nges, nGg, ngsim, nGt, ngt, ngtr, nGtv, nharr, nhArr, nhpar, ni, nis, nisd, niv, NJcy, njcy, nlarr, nlArr, nldr, nlE, nle, nleftarrow, nLeftarrow, nleftrightarrow, nLeftrightarrow, nleq, nleqq, nleqslant, nles, nless, nLl, nlsim, nLt, nlt, nltri, nltrie, nLtv, nmid, NoBreak, NonBreakingSpace, nopf, Nopf, Not, not, NotCongruent, NotCupCap, NotDoubleVerticalBar, NotElement, NotEqual, NotEqualTilde, NotExists, NotGreater, NotGreaterEqual, NotGreaterFullEqual, NotGreaterGreater, NotGreaterLess, NotGreaterSlantEqual, NotGreaterTilde, NotHumpDownHump, NotHumpEqual, notin, notindot, notinE, notinva, notinvb, notinvc, NotLeftTriangleBar, NotLeftTriangle, NotLeftTriangleEqual, NotLess, NotLessEqual, NotLessGreater, NotLessLess, NotLessSlantEqual, NotLessTilde, NotNestedGreaterGreater, NotNestedLessLess, notni, notniva, notnivb, notnivc, NotPrecedes, NotPrecedesEqual, NotPrecedesSlantEqual, NotReverseElement, NotRightTriangleBar, NotRightTriangle, NotRightTriangleEqual, NotSquareSubset, NotSquareSubsetEqual, NotSquareSuperset, NotSquareSupersetEqual, NotSubset, NotSubsetEqual, NotSucceeds, NotSucceedsEqual, NotSucceedsSlantEqual, NotSucceedsTilde, NotSuperset, NotSupersetEqual, NotTilde, NotTildeEqual, NotTildeFullEqual, NotTildeTilde, NotVerticalBar, nparallel, npar, nparsl, npart, npolint, npr, nprcue, nprec, npreceq, npre, nrarrc, nrarr, nrArr, nrarrw, nrightarrow, nRightarrow, nrtri, nrtrie, nsc, nsccue, nsce, Nscr, nscr, nshortmid, nshortparallel, nsim, nsime, nsimeq, nsmid, nspar, nsqsube, nsqsupe, nsub, nsubE, nsube, nsubset, nsubseteq, nsubseteqq, nsucc, nsucceq, nsup, nsupE, nsupe, nsupset, nsupseteq, nsupseteqq, ntgl, Ntilde, ntilde, ntlg, ntriangleleft, ntrianglelefteq, ntriangleright, ntrianglerighteq, Nu, nu, num, numero, numsp, nvap, nvdash, nvDash, nVdash, nVDash, nvge, nvgt, nvHarr, nvinfin, nvlArr, nvle, nvlt, nvltrie, nvrArr, nvrtrie, nvsim, nwarhk, nwarr, nwArr, nwarrow, nwnear, Oacute, oacute, oast, Ocirc, ocirc, ocir, Ocy, ocy, odash, Odblac, odblac, odiv, odot, odsold, OElig, oelig, ofcir, Ofr, ofr, ogon, Ograve, ograve, ogt, ohbar, ohm, oint, olarr, olcir, olcross, oline, olt, Omacr, omacr, Omega, omega, Omicron, omicron, omid, ominus, Oopf, oopf, opar, OpenCurlyDoubleQuote, OpenCurlyQuote, operp, oplus, orarr, Or, or, ord, order, orderof, ordf, ordm, origof, oror, orslope, orv, oS, Oscr, oscr, Oslash, oslash, osol, Otilde, otilde, otimesas, Otimes, otimes, Ouml, ouml, ovbar, OverBar, OverBrace, OverBracket, OverParenthesis, para, parallel, par, parsim, parsl, part, PartialD, Pcy, pcy, percnt, period, permil, perp, pertenk, Pfr, pfr, Phi, phi, phiv, phmmat, phone, Pi, pi, pitchfork, piv, planck, planckh, plankv, plusacir, plusb, pluscir, plus, plusdo, plusdu, pluse, PlusMinus, plusmn, plussim, plustwo, pm, Poincareplane, pointint, popf, Popf, pound, prap, Pr, pr, prcue, precapprox, prec, preccurlyeq, Precedes, PrecedesEqual, PrecedesSlantEqual, PrecedesTilde, preceq, precnapprox, precneqq, precnsim, pre, prE, precsim, prime, Prime, primes, prnap, prnE, prnsim, prod, Product, profalar, profline, profsurf, prop, Proportional, Proportion, propto, prsim, prurel, Pscr, pscr, Psi, psi, puncsp, Qfr, qfr, qint, qopf, Qopf, qprime, Qscr, qscr, quaternions, quatint, quest, questeq, quot, QUOT, rAarr, race, Racute, racute, radic, raemptyv, rang, Rang, rangd, range, rangle, raquo, rarrap, rarrb, rarrbfs, rarrc, rarr, Rarr, rArr, rarrfs, rarrhk, rarrlp, rarrpl, rarrsim, Rarrtl, rarrtl, rarrw, ratail, rAtail, ratio, rationals, rbarr, rBarr, RBarr, rbbrk, rbrace, rbrack, rbrke, rbrksld, rbrkslu, Rcaron, rcaron, Rcedil, rcedil, rceil, rcub, Rcy, rcy, rdca, rdldhar, rdquo, rdquor, rdsh, real, realine, realpart, reals, Re, rect, reg, REG, ReverseElement, ReverseEquilibrium, ReverseUpEquilibrium, rfisht, rfloor, rfr, Rfr, rHar, rhard, rharu, rharul, Rho, rho, rhov, RightAngleBracket, RightArrowBar, rightarrow, RightArrow, Rightarrow, RightArrowLeftArrow, rightarrowtail, RightCeiling, RightDoubleBracket, RightDownTeeVector, RightDownVectorBar, RightDownVector, RightFloor, rightharpoondown, rightharpoonup, rightleftarrows, rightleftharpoons, rightrightarrows, rightsquigarrow, RightTeeArrow, RightTee, RightTeeVector, rightthreetimes, RightTriangleBar, RightTriangle, RightTriangleEqual, RightUpDownVector, RightUpTeeVector, RightUpVectorBar, RightUpVector, RightVectorBar, RightVector, ring, risingdotseq, rlarr, rlhar, rlm, rmoustache, rmoust, rnmid, roang, roarr, robrk, ropar, ropf, Ropf, roplus, rotimes, RoundImplies, rpar, rpargt, rppolint, rrarr, Rrightarrow, rsaquo, rscr, Rscr, rsh, Rsh, rsqb, rsquo, rsquor, rthree, rtimes, rtri, rtrie, rtrif, rtriltri, RuleDelayed, ruluhar, rx, Sacute, sacute, sbquo, scap, Scaron, scaron, Sc, sc, sccue, sce, scE, Scedil, scedil, Scirc, scirc, scnap, scnE, scnsim, scpolint, scsim, Scy, scy, sdotb, sdot, sdote, searhk, searr, seArr, searrow, sect, semi, seswar, setminus, setmn, sext, Sfr, sfr, sfrown, sharp, SHCHcy, shchcy, SHcy, shcy, ShortDownArrow, ShortLeftArrow, shortmid, shortparallel, ShortRightArrow, ShortUpArrow, shy, Sigma, sigma, sigmaf, sigmav, sim, simdot, sime, simeq, simg, simgE, siml, simlE, simne, simplus, simrarr, slarr, SmallCircle, smallsetminus, smashp, smeparsl, smid, smile, smt, smte, smtes, SOFTcy, softcy, solbar, solb, sol, Sopf, sopf, spades, spadesuit, spar, sqcap, sqcaps, sqcup, sqcups, Sqrt, sqsub, sqsube, sqsubset, sqsubseteq, sqsup, sqsupe, sqsupset, sqsupseteq, square, Square, SquareIntersection, SquareSubset, SquareSubsetEqual, SquareSuperset, SquareSupersetEqual, SquareUnion, squarf, squ, squf, srarr, Sscr, sscr, ssetmn, ssmile, sstarf, Star, star, starf, straightepsilon, straightphi, strns, sub, Sub, subdot, subE, sube, subedot, submult, subnE, subne, subplus, subrarr, subset, Subset, subseteq, subseteqq, SubsetEqual, subsetneq, subsetneqq, subsim, subsub, subsup, succapprox, succ, succcurlyeq, Succeeds, SucceedsEqual, SucceedsSlantEqual, SucceedsTilde, succeq, succnapprox, succneqq, succnsim, succsim, SuchThat, sum, Sum, sung, sup1, sup2, sup3, sup, Sup, supdot, supdsub, supE, supe, supedot, Superset, SupersetEqual, suphsol, suphsub, suplarr, supmult, supnE, supne, supplus, supset, Supset, supseteq, supseteqq, supsetneq, supsetneqq, supsim, supsub, supsup, swarhk, swarr, swArr, swarrow, swnwar, szlig, Tab, target, Tau, tau, tbrk, Tcaron, tcaron, Tcedil, tcedil, Tcy, tcy, tdot, telrec, Tfr, tfr, there4, therefore, Therefore, Theta, theta, thetasym, thetav, thickapprox, thicksim, ThickSpace, ThinSpace, thinsp, thkap, thksim, THORN, thorn, tilde, Tilde, TildeEqual, TildeFullEqual, TildeTilde, timesbar, timesb, times, timesd, tint, toea, topbot, topcir, top, Topf, topf, topfork, tosa, tprime, trade, TRADE, triangle, triangledown, triangleleft, trianglelefteq, triangleq, triangleright, trianglerighteq, tridot, trie, triminus, TripleDot, triplus, trisb, tritime, trpezium, Tscr, tscr, TScy, tscy, TSHcy, tshcy, Tstrok, tstrok, twixt, twoheadleftarrow, twoheadrightarrow, Uacute, uacute, uarr, Uarr, uArr, Uarrocir, Ubrcy, ubrcy, Ubreve, ubreve, Ucirc, ucirc, Ucy, ucy, udarr, Udblac, udblac, udhar, ufisht, Ufr, ufr, Ugrave, ugrave, uHar, uharl, uharr, uhblk, ulcorn, ulcorner, ulcrop, ultri, Umacr, umacr, uml, UnderBar, UnderBrace, UnderBracket, UnderParenthesis, Union, UnionPlus, Uogon, uogon, Uopf, uopf, UpArrowBar, uparrow, UpArrow, Uparrow, UpArrowDownArrow, updownarrow, UpDownArrow, Updownarrow, UpEquilibrium, upharpoonleft, upharpoonright, uplus, UpperLeftArrow, UpperRightArrow, upsi, Upsi, upsih, Upsilon, upsilon, UpTeeArrow, UpTee, upuparrows, urcorn, urcorner, urcrop, Uring, uring, urtri, Uscr, uscr, utdot, Utilde, utilde, utri, utrif, uuarr, Uuml, uuml, uwangle, vangrt, varepsilon, varkappa, varnothing, varphi, varpi, varpropto, varr, vArr, varrho, varsigma, varsubsetneq, varsubsetneqq, varsupsetneq, varsupsetneqq, vartheta, vartriangleleft, vartriangleright, vBar, Vbar, vBarv, Vcy, vcy, vdash, vDash, Vdash, VDash, Vdashl, veebar, vee, Vee, veeeq, vellip, verbar, Verbar, vert, Vert, VerticalBar, VerticalLine, VerticalSeparator, VerticalTilde, VeryThinSpace, Vfr, vfr, vltri, vnsub, vnsup, Vopf, vopf, vprop, vrtri, Vscr, vscr, vsubnE, vsubne, vsupnE, vsupne, Vvdash, vzigzag, Wcirc, wcirc, wedbar, wedge, Wedge, wedgeq, weierp, Wfr, wfr, Wopf, wopf, wp, wr, wreath, Wscr, wscr, xcap, xcirc, xcup, xdtri, Xfr, xfr, xharr, xhArr, Xi, xi, xlarr, xlArr, xmap, xnis, xodot, Xopf, xopf, xoplus, xotime, xrarr, xrArr, Xscr, xscr, xsqcup, xuplus, xutri, xvee, xwedge, Yacute, yacute, YAcy, yacy, Ycirc, ycirc, Ycy, ycy, yen, Yfr, yfr, YIcy, yicy, Yopf, yopf, Yscr, yscr, YUcy, yucy, yuml, Yuml, Zacute, zacute, Zcaron, zcaron, Zcy, zcy, Zdot, zdot, zeetrf, ZeroWidthSpace, Zeta, zeta, zfr, Zfr, ZHcy, zhcy, zigrarr, zopf, Zopf, Zscr, zscr, zwj, zwnj, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"Aacute\":\"Á\",\"aacute\":\"á\",\"Abreve\":\"Ă\",\"abreve\":\"ă\",\"ac\":\"∾\",\"acd\":\"∿\",\"acE\":\"∾̳\",\"Acirc\":\"Â\",\"acirc\":\"â\",\"acute\":\"´\",\"Acy\":\"А\",\"acy\":\"а\",\"AElig\":\"Æ\",\"aelig\":\"æ\",\"af\":\"⁡\",\"Afr\":\"𝔄\",\"afr\":\"𝔞\",\"Agrave\":\"À\",\"agrave\":\"à\",\"alefsym\":\"ℵ\",\"aleph\":\"ℵ\",\"Alpha\":\"Α\",\"alpha\":\"α\",\"Amacr\":\"Ā\",\"amacr\":\"ā\",\"amalg\":\"⨿\",\"amp\":\"&\",\"AMP\":\"&\",\"andand\":\"⩕\",\"And\":\"⩓\",\"and\":\"∧\",\"andd\":\"⩜\",\"andslope\":\"⩘\",\"andv\":\"⩚\",\"ang\":\"∠\",\"ange\":\"⦤\",\"angle\":\"∠\",\"angmsdaa\":\"⦨\",\"angmsdab\":\"⦩\",\"angmsdac\":\"⦪\",\"angmsdad\":\"⦫\",\"angmsdae\":\"⦬\",\"angmsdaf\":\"⦭\",\"angmsdag\":\"⦮\",\"angmsdah\":\"⦯\",\"angmsd\":\"∡\",\"angrt\":\"∟\",\"angrtvb\":\"⊾\",\"angrtvbd\":\"⦝\",\"angsph\":\"∢\",\"angst\":\"Å\",\"angzarr\":\"⍼\",\"Aogon\":\"Ą\",\"aogon\":\"ą\",\"Aopf\":\"𝔸\",\"aopf\":\"𝕒\",\"apacir\":\"⩯\",\"ap\":\"≈\",\"apE\":\"⩰\",\"ape\":\"≊\",\"apid\":\"≋\",\"apos\":\"'\",\"ApplyFunction\":\"⁡\",\"approx\":\"≈\",\"approxeq\":\"≊\",\"Aring\":\"Å\",\"aring\":\"å\",\"Ascr\":\"𝒜\",\"ascr\":\"𝒶\",\"Assign\":\"≔\",\"ast\":\"*\",\"asymp\":\"≈\",\"asympeq\":\"≍\",\"Atilde\":\"Ã\",\"atilde\":\"ã\",\"Auml\":\"Ä\",\"auml\":\"ä\",\"awconint\":\"∳\",\"awint\":\"⨑\",\"backcong\":\"≌\",\"backepsilon\":\"϶\",\"backprime\":\"‵\",\"backsim\":\"∽\",\"backsimeq\":\"⋍\",\"Backslash\":\"∖\",\"Barv\":\"⫧\",\"barvee\":\"⊽\",\"barwed\":\"⌅\",\"Barwed\":\"⌆\",\"barwedge\":\"⌅\",\"bbrk\":\"⎵\",\"bbrktbrk\":\"⎶\",\"bcong\":\"≌\",\"Bcy\":\"Б\",\"bcy\":\"б\",\"bdquo\":\"„\",\"becaus\":\"∵\",\"because\":\"∵\",\"Because\":\"∵\",\"bemptyv\":\"⦰\",\"bepsi\":\"϶\",\"bernou\":\"ℬ\",\"Bernoullis\":\"ℬ\",\"Beta\":\"Β\",\"beta\":\"β\",\"beth\":\"ℶ\",\"between\":\"≬\",\"Bfr\":\"𝔅\",\"bfr\":\"𝔟\",\"bigcap\":\"⋂\",\"bigcirc\":\"◯\",\"bigcup\":\"⋃\",\"bigodot\":\"⨀\",\"bigoplus\":\"⨁\",\"bigotimes\":\"⨂\",\"bigsqcup\":\"⨆\",\"bigstar\":\"★\",\"bigtriangledown\":\"▽\",\"bigtriangleup\":\"△\",\"biguplus\":\"⨄\",\"bigvee\":\"⋁\",\"bigwedge\":\"⋀\",\"bkarow\":\"⤍\",\"blacklozenge\":\"⧫\",\"blacksquare\":\"▪\",\"blacktriangle\":\"▴\",\"blacktriangledown\":\"▾\",\"blacktriangleleft\":\"◂\",\"blacktriangleright\":\"▸\",\"blank\":\"␣\",\"blk12\":\"▒\",\"blk14\":\"░\",\"blk34\":\"▓\",\"block\":\"█\",\"bne\":\"=⃥\",\"bnequiv\":\"≡⃥\",\"bNot\":\"⫭\",\"bnot\":\"⌐\",\"Bopf\":\"𝔹\",\"bopf\":\"𝕓\",\"bot\":\"⊥\",\"bottom\":\"⊥\",\"bowtie\":\"⋈\",\"boxbox\":\"⧉\",\"boxdl\":\"┐\",\"boxdL\":\"╕\",\"boxDl\":\"╖\",\"boxDL\":\"╗\",\"boxdr\":\"┌\",\"boxdR\":\"╒\",\"boxDr\":\"╓\",\"boxDR\":\"╔\",\"boxh\":\"─\",\"boxH\":\"═\",\"boxhd\":\"┬\",\"boxHd\":\"╤\",\"boxhD\":\"╥\",\"boxHD\":\"╦\",\"boxhu\":\"┴\",\"boxHu\":\"╧\",\"boxhU\":\"╨\",\"boxHU\":\"╩\",\"boxminus\":\"⊟\",\"boxplus\":\"⊞\",\"boxtimes\":\"⊠\",\"boxul\":\"┘\",\"boxuL\":\"╛\",\"boxUl\":\"╜\",\"boxUL\":\"╝\",\"boxur\":\"└\",\"boxuR\":\"╘\",\"boxUr\":\"╙\",\"boxUR\":\"╚\",\"boxv\":\"│\",\"boxV\":\"║\",\"boxvh\":\"┼\",\"boxvH\":\"╪\",\"boxVh\":\"╫\",\"boxVH\":\"╬\",\"boxvl\":\"┤\",\"boxvL\":\"╡\",\"boxVl\":\"╢\",\"boxVL\":\"╣\",\"boxvr\":\"├\",\"boxvR\":\"╞\",\"boxVr\":\"╟\",\"boxVR\":\"╠\",\"bprime\":\"‵\",\"breve\":\"˘\",\"Breve\":\"˘\",\"brvbar\":\"¦\",\"bscr\":\"𝒷\",\"Bscr\":\"ℬ\",\"bsemi\":\"⁏\",\"bsim\":\"∽\",\"bsime\":\"⋍\",\"bsolb\":\"⧅\",\"bsol\":\"\\\\\",\"bsolhsub\":\"⟈\",\"bull\":\"•\",\"bullet\":\"•\",\"bump\":\"≎\",\"bumpE\":\"⪮\",\"bumpe\":\"≏\",\"Bumpeq\":\"≎\",\"bumpeq\":\"≏\",\"Cacute\":\"Ć\",\"cacute\":\"ć\",\"capand\":\"⩄\",\"capbrcup\":\"⩉\",\"capcap\":\"⩋\",\"cap\":\"∩\",\"Cap\":\"⋒\",\"capcup\":\"⩇\",\"capdot\":\"⩀\",\"CapitalDifferentialD\":\"ⅅ\",\"caps\":\"∩︀\",\"caret\":\"⁁\",\"caron\":\"ˇ\",\"Cayleys\":\"ℭ\",\"ccaps\":\"⩍\",\"Ccaron\":\"Č\",\"ccaron\":\"č\",\"Ccedil\":\"Ç\",\"ccedil\":\"ç\",\"Ccirc\":\"Ĉ\",\"ccirc\":\"ĉ\",\"Cconint\":\"∰\",\"ccups\":\"⩌\",\"ccupssm\":\"⩐\",\"Cdot\":\"Ċ\",\"cdot\":\"ċ\",\"cedil\":\"¸\",\"Cedilla\":\"¸\",\"cemptyv\":\"⦲\",\"cent\":\"¢\",\"centerdot\":\"·\",\"CenterDot\":\"·\",\"cfr\":\"𝔠\",\"Cfr\":\"ℭ\",\"CHcy\":\"Ч\",\"chcy\":\"ч\",\"check\":\"✓\",\"checkmark\":\"✓\",\"Chi\":\"Χ\",\"chi\":\"χ\",\"circ\":\"ˆ\",\"circeq\":\"≗\",\"circlearrowleft\":\"↺\",\"circlearrowright\":\"↻\",\"circledast\":\"⊛\",\"circledcirc\":\"⊚\",\"circleddash\":\"⊝\",\"CircleDot\":\"⊙\",\"circledR\":\"®\",\"circledS\":\"Ⓢ\",\"CircleMinus\":\"⊖\",\"CirclePlus\":\"⊕\",\"CircleTimes\":\"⊗\",\"cir\":\"○\",\"cirE\":\"⧃\",\"cire\":\"≗\",\"cirfnint\":\"⨐\",\"cirmid\":\"⫯\",\"cirscir\":\"⧂\",\"ClockwiseContourIntegral\":\"∲\",\"CloseCurlyDoubleQuote\":\"”\",\"CloseCurlyQuote\":\"’\",\"clubs\":\"♣\",\"clubsuit\":\"♣\",\"colon\":\":\",\"Colon\":\"∷\",\"Colone\":\"⩴\",\"colone\":\"≔\",\"coloneq\":\"≔\",\"comma\":\",\",\"commat\":\"@\",\"comp\":\"∁\",\"compfn\":\"∘\",\"complement\":\"∁\",\"complexes\":\"ℂ\",\"cong\":\"≅\",\"congdot\":\"⩭\",\"Congruent\":\"≡\",\"conint\":\"∮\",\"Conint\":\"∯\",\"ContourIntegral\":\"∮\",\"copf\":\"𝕔\",\"Copf\":\"ℂ\",\"coprod\":\"∐\",\"Coproduct\":\"∐\",\"copy\":\"©\",\"COPY\":\"©\",\"copysr\":\"℗\",\"CounterClockwiseContourIntegral\":\"∳\",\"crarr\":\"↵\",\"cross\":\"✗\",\"Cross\":\"⨯\",\"Cscr\":\"𝒞\",\"cscr\":\"𝒸\",\"csub\":\"⫏\",\"csube\":\"⫑\",\"csup\":\"⫐\",\"csupe\":\"⫒\",\"ctdot\":\"⋯\",\"cudarrl\":\"⤸\",\"cudarrr\":\"⤵\",\"cuepr\":\"⋞\",\"cuesc\":\"⋟\",\"cularr\":\"↶\",\"cularrp\":\"⤽\",\"cupbrcap\":\"⩈\",\"cupcap\":\"⩆\",\"CupCap\":\"≍\",\"cup\":\"∪\",\"Cup\":\"⋓\",\"cupcup\":\"⩊\",\"cupdot\":\"⊍\",\"cupor\":\"⩅\",\"cups\":\"∪︀\",\"curarr\":\"↷\",\"curarrm\":\"⤼\",\"curlyeqprec\":\"⋞\",\"curlyeqsucc\":\"⋟\",\"curlyvee\":\"⋎\",\"curlywedge\":\"⋏\",\"curren\":\"¤\",\"curvearrowleft\":\"↶\",\"curvearrowright\":\"↷\",\"cuvee\":\"⋎\",\"cuwed\":\"⋏\",\"cwconint\":\"∲\",\"cwint\":\"∱\",\"cylcty\":\"⌭\",\"dagger\":\"†\",\"Dagger\":\"‡\",\"daleth\":\"ℸ\",\"darr\":\"↓\",\"Darr\":\"↡\",\"dArr\":\"⇓\",\"dash\":\"‐\",\"Dashv\":\"⫤\",\"dashv\":\"⊣\",\"dbkarow\":\"⤏\",\"dblac\":\"˝\",\"Dcaron\":\"Ď\",\"dcaron\":\"ď\",\"Dcy\":\"Д\",\"dcy\":\"д\",\"ddagger\":\"‡\",\"ddarr\":\"⇊\",\"DD\":\"ⅅ\",\"dd\":\"ⅆ\",\"DDotrahd\":\"⤑\",\"ddotseq\":\"⩷\",\"deg\":\"°\",\"Del\":\"∇\",\"Delta\":\"Δ\",\"delta\":\"δ\",\"demptyv\":\"⦱\",\"dfisht\":\"⥿\",\"Dfr\":\"𝔇\",\"dfr\":\"𝔡\",\"dHar\":\"⥥\",\"dharl\":\"⇃\",\"dharr\":\"⇂\",\"DiacriticalAcute\":\"´\",\"DiacriticalDot\":\"˙\",\"DiacriticalDoubleAcute\":\"˝\",\"DiacriticalGrave\":\"`\",\"DiacriticalTilde\":\"˜\",\"diam\":\"⋄\",\"diamond\":\"⋄\",\"Diamond\":\"⋄\",\"diamondsuit\":\"♦\",\"diams\":\"♦\",\"die\":\"¨\",\"DifferentialD\":\"ⅆ\",\"digamma\":\"ϝ\",\"disin\":\"⋲\",\"div\":\"÷\",\"divide\":\"÷\",\"divideontimes\":\"⋇\",\"divonx\":\"⋇\",\"DJcy\":\"Ђ\",\"djcy\":\"ђ\",\"dlcorn\":\"⌞\",\"dlcrop\":\"⌍\",\"dollar\":\"$\",\"Dopf\":\"𝔻\",\"dopf\":\"𝕕\",\"Dot\":\"¨\",\"dot\":\"˙\",\"DotDot\":\"⃜\",\"doteq\":\"≐\",\"doteqdot\":\"≑\",\"DotEqual\":\"≐\",\"dotminus\":\"∸\",\"dotplus\":\"∔\",\"dotsquare\":\"⊡\",\"doublebarwedge\":\"⌆\",\"DoubleContourIntegral\":\"∯\",\"DoubleDot\":\"¨\",\"DoubleDownArrow\":\"⇓\",\"DoubleLeftArrow\":\"⇐\",\"DoubleLeftRightArrow\":\"⇔\",\"DoubleLeftTee\":\"⫤\",\"DoubleLongLeftArrow\":\"⟸\",\"DoubleLongLeftRightArrow\":\"⟺\",\"DoubleLongRightArrow\":\"⟹\",\"DoubleRightArrow\":\"⇒\",\"DoubleRightTee\":\"⊨\",\"DoubleUpArrow\":\"⇑\",\"DoubleUpDownArrow\":\"⇕\",\"DoubleVerticalBar\":\"∥\",\"DownArrowBar\":\"⤓\",\"downarrow\":\"↓\",\"DownArrow\":\"↓\",\"Downarrow\":\"⇓\",\"DownArrowUpArrow\":\"⇵\",\"DownBreve\":\"̑\",\"downdownarrows\":\"⇊\",\"downharpoonleft\":\"⇃\",\"downharpoonright\":\"⇂\",\"DownLeftRightVector\":\"⥐\",\"DownLeftTeeVector\":\"⥞\",\"DownLeftVectorBar\":\"⥖\",\"DownLeftVector\":\"↽\",\"DownRightTeeVector\":\"⥟\",\"DownRightVectorBar\":\"⥗\",\"DownRightVector\":\"⇁\",\"DownTeeArrow\":\"↧\",\"DownTee\":\"⊤\",\"drbkarow\":\"⤐\",\"drcorn\":\"⌟\",\"drcrop\":\"⌌\",\"Dscr\":\"𝒟\",\"dscr\":\"𝒹\",\"DScy\":\"Ѕ\",\"dscy\":\"ѕ\",\"dsol\":\"⧶\",\"Dstrok\":\"Đ\",\"dstrok\":\"đ\",\"dtdot\":\"⋱\",\"dtri\":\"▿\",\"dtrif\":\"▾\",\"duarr\":\"⇵\",\"duhar\":\"⥯\",\"dwangle\":\"⦦\",\"DZcy\":\"Џ\",\"dzcy\":\"џ\",\"dzigrarr\":\"⟿\",\"Eacute\":\"É\",\"eacute\":\"é\",\"easter\":\"⩮\",\"Ecaron\":\"Ě\",\"ecaron\":\"ě\",\"Ecirc\":\"Ê\",\"ecirc\":\"ê\",\"ecir\":\"≖\",\"ecolon\":\"≕\",\"Ecy\":\"Э\",\"ecy\":\"э\",\"eDDot\":\"⩷\",\"Edot\":\"Ė\",\"edot\":\"ė\",\"eDot\":\"≑\",\"ee\":\"ⅇ\",\"efDot\":\"≒\",\"Efr\":\"𝔈\",\"efr\":\"𝔢\",\"eg\":\"⪚\",\"Egrave\":\"È\",\"egrave\":\"è\",\"egs\":\"⪖\",\"egsdot\":\"⪘\",\"el\":\"⪙\",\"Element\":\"∈\",\"elinters\":\"⏧\",\"ell\":\"ℓ\",\"els\":\"⪕\",\"elsdot\":\"⪗\",\"Emacr\":\"Ē\",\"emacr\":\"ē\",\"empty\":\"∅\",\"emptyset\":\"∅\",\"EmptySmallSquare\":\"◻\",\"emptyv\":\"∅\",\"EmptyVerySmallSquare\":\"▫\",\"emsp13\":\" \",\"emsp14\":\" \",\"emsp\":\" \",\"ENG\":\"Ŋ\",\"eng\":\"ŋ\",\"ensp\":\" \",\"Eogon\":\"Ę\",\"eogon\":\"ę\",\"Eopf\":\"𝔼\",\"eopf\":\"𝕖\",\"epar\":\"⋕\",\"eparsl\":\"⧣\",\"eplus\":\"⩱\",\"epsi\":\"ε\",\"Epsilon\":\"Ε\",\"epsilon\":\"ε\",\"epsiv\":\"ϵ\",\"eqcirc\":\"≖\",\"eqcolon\":\"≕\",\"eqsim\":\"≂\",\"eqslantgtr\":\"⪖\",\"eqslantless\":\"⪕\",\"Equal\":\"⩵\",\"equals\":\"=\",\"EqualTilde\":\"≂\",\"equest\":\"≟\",\"Equilibrium\":\"⇌\",\"equiv\":\"≡\",\"equivDD\":\"⩸\",\"eqvparsl\":\"⧥\",\"erarr\":\"⥱\",\"erDot\":\"≓\",\"escr\":\"ℯ\",\"Escr\":\"ℰ\",\"esdot\":\"≐\",\"Esim\":\"⩳\",\"esim\":\"≂\",\"Eta\":\"Η\",\"eta\":\"η\",\"ETH\":\"Ð\",\"eth\":\"ð\",\"Euml\":\"Ë\",\"euml\":\"ë\",\"euro\":\"€\",\"excl\":\"!\",\"exist\":\"∃\",\"Exists\":\"∃\",\"expectation\":\"ℰ\",\"exponentiale\":\"ⅇ\",\"ExponentialE\":\"ⅇ\",\"fallingdotseq\":\"≒\",\"Fcy\":\"Ф\",\"fcy\":\"ф\",\"female\":\"♀\",\"ffilig\":\"ﬃ\",\"fflig\":\"ﬀ\",\"ffllig\":\"ﬄ\",\"Ffr\":\"𝔉\",\"ffr\":\"𝔣\",\"filig\":\"ﬁ\",\"FilledSmallSquare\":\"◼\",\"FilledVerySmallSquare\":\"▪\",\"fjlig\":\"fj\",\"flat\":\"♭\",\"fllig\":\"ﬂ\",\"fltns\":\"▱\",\"fnof\":\"ƒ\",\"Fopf\":\"𝔽\",\"fopf\":\"𝕗\",\"forall\":\"∀\",\"ForAll\":\"∀\",\"fork\":\"⋔\",\"forkv\":\"⫙\",\"Fouriertrf\":\"ℱ\",\"fpartint\":\"⨍\",\"frac12\":\"½\",\"frac13\":\"⅓\",\"frac14\":\"¼\",\"frac15\":\"⅕\",\"frac16\":\"⅙\",\"frac18\":\"⅛\",\"frac23\":\"⅔\",\"frac25\":\"⅖\",\"frac34\":\"¾\",\"frac35\":\"⅗\",\"frac38\":\"⅜\",\"frac45\":\"⅘\",\"frac56\":\"⅚\",\"frac58\":\"⅝\",\"frac78\":\"⅞\",\"frasl\":\"⁄\",\"frown\":\"⌢\",\"fscr\":\"𝒻\",\"Fscr\":\"ℱ\",\"gacute\":\"ǵ\",\"Gamma\":\"Γ\",\"gamma\":\"γ\",\"Gammad\":\"Ϝ\",\"gammad\":\"ϝ\",\"gap\":\"⪆\",\"Gbreve\":\"Ğ\",\"gbreve\":\"ğ\",\"Gcedil\":\"Ģ\",\"Gcirc\":\"Ĝ\",\"gcirc\":\"ĝ\",\"Gcy\":\"Г\",\"gcy\":\"г\",\"Gdot\":\"Ġ\",\"gdot\":\"ġ\",\"ge\":\"≥\",\"gE\":\"≧\",\"gEl\":\"⪌\",\"gel\":\"⋛\",\"geq\":\"≥\",\"geqq\":\"≧\",\"geqslant\":\"⩾\",\"gescc\":\"⪩\",\"ges\":\"⩾\",\"gesdot\":\"⪀\",\"gesdoto\":\"⪂\",\"gesdotol\":\"⪄\",\"gesl\":\"⋛︀\",\"gesles\":\"⪔\",\"Gfr\":\"𝔊\",\"gfr\":\"𝔤\",\"gg\":\"≫\",\"Gg\":\"⋙\",\"ggg\":\"⋙\",\"gimel\":\"ℷ\",\"GJcy\":\"Ѓ\",\"gjcy\":\"ѓ\",\"gla\":\"⪥\",\"gl\":\"≷\",\"glE\":\"⪒\",\"glj\":\"⪤\",\"gnap\":\"⪊\",\"gnapprox\":\"⪊\",\"gne\":\"⪈\",\"gnE\":\"≩\",\"gneq\":\"⪈\",\"gneqq\":\"≩\",\"gnsim\":\"⋧\",\"Gopf\":\"𝔾\",\"gopf\":\"𝕘\",\"grave\":\"`\",\"GreaterEqual\":\"≥\",\"GreaterEqualLess\":\"⋛\",\"GreaterFullEqual\":\"≧\",\"GreaterGreater\":\"⪢\",\"GreaterLess\":\"≷\",\"GreaterSlantEqual\":\"⩾\",\"GreaterTilde\":\"≳\",\"Gscr\":\"𝒢\",\"gscr\":\"ℊ\",\"gsim\":\"≳\",\"gsime\":\"⪎\",\"gsiml\":\"⪐\",\"gtcc\":\"⪧\",\"gtcir\":\"⩺\",\"gt\":\">\",\"GT\":\">\",\"Gt\":\"≫\",\"gtdot\":\"⋗\",\"gtlPar\":\"⦕\",\"gtquest\":\"⩼\",\"gtrapprox\":\"⪆\",\"gtrarr\":\"⥸\",\"gtrdot\":\"⋗\",\"gtreqless\":\"⋛\",\"gtreqqless\":\"⪌\",\"gtrless\":\"≷\",\"gtrsim\":\"≳\",\"gvertneqq\":\"≩︀\",\"gvnE\":\"≩︀\",\"Hacek\":\"ˇ\",\"hairsp\":\" \",\"half\":\"½\",\"hamilt\":\"ℋ\",\"HARDcy\":\"Ъ\",\"hardcy\":\"ъ\",\"harrcir\":\"⥈\",\"harr\":\"↔\",\"hArr\":\"⇔\",\"harrw\":\"↭\",\"Hat\":\"^\",\"hbar\":\"ℏ\",\"Hcirc\":\"Ĥ\",\"hcirc\":\"ĥ\",\"hearts\":\"♥\",\"heartsuit\":\"♥\",\"hellip\":\"…\",\"hercon\":\"⊹\",\"hfr\":\"𝔥\",\"Hfr\":\"ℌ\",\"HilbertSpace\":\"ℋ\",\"hksearow\":\"⤥\",\"hkswarow\":\"⤦\",\"hoarr\":\"⇿\",\"homtht\":\"∻\",\"hookleftarrow\":\"↩\",\"hookrightarrow\":\"↪\",\"hopf\":\"𝕙\",\"Hopf\":\"ℍ\",\"horbar\":\"―\",\"HorizontalLine\":\"─\",\"hscr\":\"𝒽\",\"Hscr\":\"ℋ\",\"hslash\":\"ℏ\",\"Hstrok\":\"Ħ\",\"hstrok\":\"ħ\",\"HumpDownHump\":\"≎\",\"HumpEqual\":\"≏\",\"hybull\":\"⁃\",\"hyphen\":\"‐\",\"Iacute\":\"Í\",\"iacute\":\"í\",\"ic\":\"⁣\",\"Icirc\":\"Î\",\"icirc\":\"î\",\"Icy\":\"И\",\"icy\":\"и\",\"Idot\":\"İ\",\"IEcy\":\"Е\",\"iecy\":\"е\",\"iexcl\":\"¡\",\"iff\":\"⇔\",\"ifr\":\"𝔦\",\"Ifr\":\"ℑ\",\"Igrave\":\"Ì\",\"igrave\":\"ì\",\"ii\":\"ⅈ\",\"iiiint\":\"⨌\",\"iiint\":\"∭\",\"iinfin\":\"⧜\",\"iiota\":\"℩\",\"IJlig\":\"Ĳ\",\"ijlig\":\"ĳ\",\"Imacr\":\"Ī\",\"imacr\":\"ī\",\"image\":\"ℑ\",\"ImaginaryI\":\"ⅈ\",\"imagline\":\"ℐ\",\"imagpart\":\"ℑ\",\"imath\":\"ı\",\"Im\":\"ℑ\",\"imof\":\"⊷\",\"imped\":\"Ƶ\",\"Implies\":\"⇒\",\"incare\":\"℅\",\"in\":\"∈\",\"infin\":\"∞\",\"infintie\":\"⧝\",\"inodot\":\"ı\",\"intcal\":\"⊺\",\"int\":\"∫\",\"Int\":\"∬\",\"integers\":\"ℤ\",\"Integral\":\"∫\",\"intercal\":\"⊺\",\"Intersection\":\"⋂\",\"intlarhk\":\"⨗\",\"intprod\":\"⨼\",\"InvisibleComma\":\"⁣\",\"InvisibleTimes\":\"⁢\",\"IOcy\":\"Ё\",\"iocy\":\"ё\",\"Iogon\":\"Į\",\"iogon\":\"į\",\"Iopf\":\"𝕀\",\"iopf\":\"𝕚\",\"Iota\":\"Ι\",\"iota\":\"ι\",\"iprod\":\"⨼\",\"iquest\":\"¿\",\"iscr\":\"𝒾\",\"Iscr\":\"ℐ\",\"isin\":\"∈\",\"isindot\":\"⋵\",\"isinE\":\"⋹\",\"isins\":\"⋴\",\"isinsv\":\"⋳\",\"isinv\":\"∈\",\"it\":\"⁢\",\"Itilde\":\"Ĩ\",\"itilde\":\"ĩ\",\"Iukcy\":\"І\",\"iukcy\":\"і\",\"Iuml\":\"Ï\",\"iuml\":\"ï\",\"Jcirc\":\"Ĵ\",\"jcirc\":\"ĵ\",\"Jcy\":\"Й\",\"jcy\":\"й\",\"Jfr\":\"𝔍\",\"jfr\":\"𝔧\",\"jmath\":\"ȷ\",\"Jopf\":\"𝕁\",\"jopf\":\"𝕛\",\"Jscr\":\"𝒥\",\"jscr\":\"𝒿\",\"Jsercy\":\"Ј\",\"jsercy\":\"ј\",\"Jukcy\":\"Є\",\"jukcy\":\"є\",\"Kappa\":\"Κ\",\"kappa\":\"κ\",\"kappav\":\"ϰ\",\"Kcedil\":\"Ķ\",\"kcedil\":\"ķ\",\"Kcy\":\"К\",\"kcy\":\"к\",\"Kfr\":\"𝔎\",\"kfr\":\"𝔨\",\"kgreen\":\"ĸ\",\"KHcy\":\"Х\",\"khcy\":\"х\",\"KJcy\":\"Ќ\",\"kjcy\":\"ќ\",\"Kopf\":\"𝕂\",\"kopf\":\"𝕜\",\"Kscr\":\"𝒦\",\"kscr\":\"𝓀\",\"lAarr\":\"⇚\",\"Lacute\":\"Ĺ\",\"lacute\":\"ĺ\",\"laemptyv\":\"⦴\",\"lagran\":\"ℒ\",\"Lambda\":\"Λ\",\"lambda\":\"λ\",\"lang\":\"⟨\",\"Lang\":\"⟪\",\"langd\":\"⦑\",\"langle\":\"⟨\",\"lap\":\"⪅\",\"Laplacetrf\":\"ℒ\",\"laquo\":\"«\",\"larrb\":\"⇤\",\"larrbfs\":\"⤟\",\"larr\":\"←\",\"Larr\":\"↞\",\"lArr\":\"⇐\",\"larrfs\":\"⤝\",\"larrhk\":\"↩\",\"larrlp\":\"↫\",\"larrpl\":\"⤹\",\"larrsim\":\"⥳\",\"larrtl\":\"↢\",\"latail\":\"⤙\",\"lAtail\":\"⤛\",\"lat\":\"⪫\",\"late\":\"⪭\",\"lates\":\"⪭︀\",\"lbarr\":\"⤌\",\"lBarr\":\"⤎\",\"lbbrk\":\"❲\",\"lbrace\":\"{\",\"lbrack\":\"[\",\"lbrke\":\"⦋\",\"lbrksld\":\"⦏\",\"lbrkslu\":\"⦍\",\"Lcaron\":\"Ľ\",\"lcaron\":\"ľ\",\"Lcedil\":\"Ļ\",\"lcedil\":\"ļ\",\"lceil\":\"⌈\",\"lcub\":\"{\",\"Lcy\":\"Л\",\"lcy\":\"л\",\"ldca\":\"⤶\",\"ldquo\":\"“\",\"ldquor\":\"„\",\"ldrdhar\":\"⥧\",\"ldrushar\":\"⥋\",\"ldsh\":\"↲\",\"le\":\"≤\",\"lE\":\"≦\",\"LeftAngleBracket\":\"⟨\",\"LeftArrowBar\":\"⇤\",\"leftarrow\":\"←\",\"LeftArrow\":\"←\",\"Leftarrow\":\"⇐\",\"LeftArrowRightArrow\":\"⇆\",\"leftarrowtail\":\"↢\",\"LeftCeiling\":\"⌈\",\"LeftDoubleBracket\":\"⟦\",\"LeftDownTeeVector\":\"⥡\",\"LeftDownVectorBar\":\"⥙\",\"LeftDownVector\":\"⇃\",\"LeftFloor\":\"⌊\",\"leftharpoondown\":\"↽\",\"leftharpoonup\":\"↼\",\"leftleftarrows\":\"⇇\",\"leftrightarrow\":\"↔\",\"LeftRightArrow\":\"↔\",\"Leftrightarrow\":\"⇔\",\"leftrightarrows\":\"⇆\",\"leftrightharpoons\":\"⇋\",\"leftrightsquigarrow\":\"↭\",\"LeftRightVector\":\"⥎\",\"LeftTeeArrow\":\"↤\",\"LeftTee\":\"⊣\",\"LeftTeeVector\":\"⥚\",\"leftthreetimes\":\"⋋\",\"LeftTriangleBar\":\"⧏\",\"LeftTriangle\":\"⊲\",\"LeftTriangleEqual\":\"⊴\",\"LeftUpDownVector\":\"⥑\",\"LeftUpTeeVector\":\"⥠\",\"LeftUpVectorBar\":\"⥘\",\"LeftUpVector\":\"↿\",\"LeftVectorBar\":\"⥒\",\"LeftVector\":\"↼\",\"lEg\":\"⪋\",\"leg\":\"⋚\",\"leq\":\"≤\",\"leqq\":\"≦\",\"leqslant\":\"⩽\",\"lescc\":\"⪨\",\"les\":\"⩽\",\"lesdot\":\"⩿\",\"lesdoto\":\"⪁\",\"lesdotor\":\"⪃\",\"lesg\":\"⋚︀\",\"lesges\":\"⪓\",\"lessapprox\":\"⪅\",\"lessdot\":\"⋖\",\"lesseqgtr\":\"⋚\",\"lesseqqgtr\":\"⪋\",\"LessEqualGreater\":\"⋚\",\"LessFullEqual\":\"≦\",\"LessGreater\":\"≶\",\"lessgtr\":\"≶\",\"LessLess\":\"⪡\",\"lesssim\":\"≲\",\"LessSlantEqual\":\"⩽\",\"LessTilde\":\"≲\",\"lfisht\":\"⥼\",\"lfloor\":\"⌊\",\"Lfr\":\"𝔏\",\"lfr\":\"𝔩\",\"lg\":\"≶\",\"lgE\":\"⪑\",\"lHar\":\"⥢\",\"lhard\":\"↽\",\"lharu\":\"↼\",\"lharul\":\"⥪\",\"lhblk\":\"▄\",\"LJcy\":\"Љ\",\"ljcy\":\"љ\",\"llarr\":\"⇇\",\"ll\":\"≪\",\"Ll\":\"⋘\",\"llcorner\":\"⌞\",\"Lleftarrow\":\"⇚\",\"llhard\":\"⥫\",\"lltri\":\"◺\",\"Lmidot\":\"Ŀ\",\"lmidot\":\"ŀ\",\"lmoustache\":\"⎰\",\"lmoust\":\"⎰\",\"lnap\":\"⪉\",\"lnapprox\":\"⪉\",\"lne\":\"⪇\",\"lnE\":\"≨\",\"lneq\":\"⪇\",\"lneqq\":\"≨\",\"lnsim\":\"⋦\",\"loang\":\"⟬\",\"loarr\":\"⇽\",\"lobrk\":\"⟦\",\"longleftarrow\":\"⟵\",\"LongLeftArrow\":\"⟵\",\"Longleftarrow\":\"⟸\",\"longleftrightarrow\":\"⟷\",\"LongLeftRightArrow\":\"⟷\",\"Longleftrightarrow\":\"⟺\",\"longmapsto\":\"⟼\",\"longrightarrow\":\"⟶\",\"LongRightArrow\":\"⟶\",\"Longrightarrow\":\"⟹\",\"looparrowleft\":\"↫\",\"looparrowright\":\"↬\",\"lopar\":\"⦅\",\"Lopf\":\"𝕃\",\"lopf\":\"𝕝\",\"loplus\":\"⨭\",\"lotimes\":\"⨴\",\"lowast\":\"∗\",\"lowbar\":\"_\",\"LowerLeftArrow\":\"↙\",\"LowerRightArrow\":\"↘\",\"loz\":\"◊\",\"lozenge\":\"◊\",\"lozf\":\"⧫\",\"lpar\":\"(\",\"lparlt\":\"⦓\",\"lrarr\":\"⇆\",\"lrcorner\":\"⌟\",\"lrhar\":\"⇋\",\"lrhard\":\"⥭\",\"lrm\":\"‎\",\"lrtri\":\"⊿\",\"lsaquo\":\"‹\",\"lscr\":\"𝓁\",\"Lscr\":\"ℒ\",\"lsh\":\"↰\",\"Lsh\":\"↰\",\"lsim\":\"≲\",\"lsime\":\"⪍\",\"lsimg\":\"⪏\",\"lsqb\":\"[\",\"lsquo\":\"‘\",\"lsquor\":\"‚\",\"Lstrok\":\"Ł\",\"lstrok\":\"ł\",\"ltcc\":\"⪦\",\"ltcir\":\"⩹\",\"lt\":\"<\",\"LT\":\"<\",\"Lt\":\"≪\",\"ltdot\":\"⋖\",\"lthree\":\"⋋\",\"ltimes\":\"⋉\",\"ltlarr\":\"⥶\",\"ltquest\":\"⩻\",\"ltri\":\"◃\",\"ltrie\":\"⊴\",\"ltrif\":\"◂\",\"ltrPar\":\"⦖\",\"lurdshar\":\"⥊\",\"luruhar\":\"⥦\",\"lvertneqq\":\"≨︀\",\"lvnE\":\"≨︀\",\"macr\":\"¯\",\"male\":\"♂\",\"malt\":\"✠\",\"maltese\":\"✠\",\"Map\":\"⤅\",\"map\":\"↦\",\"mapsto\":\"↦\",\"mapstodown\":\"↧\",\"mapstoleft\":\"↤\",\"mapstoup\":\"↥\",\"marker\":\"▮\",\"mcomma\":\"⨩\",\"Mcy\":\"М\",\"mcy\":\"м\",\"mdash\":\"—\",\"mDDot\":\"∺\",\"measuredangle\":\"∡\",\"MediumSpace\":\" \",\"Mellintrf\":\"ℳ\",\"Mfr\":\"𝔐\",\"mfr\":\"𝔪\",\"mho\":\"℧\",\"micro\":\"µ\",\"midast\":\"*\",\"midcir\":\"⫰\",\"mid\":\"∣\",\"middot\":\"·\",\"minusb\":\"⊟\",\"minus\":\"−\",\"minusd\":\"∸\",\"minusdu\":\"⨪\",\"MinusPlus\":\"∓\",\"mlcp\":\"⫛\",\"mldr\":\"…\",\"mnplus\":\"∓\",\"models\":\"⊧\",\"Mopf\":\"𝕄\",\"mopf\":\"𝕞\",\"mp\":\"∓\",\"mscr\":\"𝓂\",\"Mscr\":\"ℳ\",\"mstpos\":\"∾\",\"Mu\":\"Μ\",\"mu\":\"μ\",\"multimap\":\"⊸\",\"mumap\":\"⊸\",\"nabla\":\"∇\",\"Nacute\":\"Ń\",\"nacute\":\"ń\",\"nang\":\"∠⃒\",\"nap\":\"≉\",\"napE\":\"⩰̸\",\"napid\":\"≋̸\",\"napos\":\"ŉ\",\"napprox\":\"≉\",\"natural\":\"♮\",\"naturals\":\"ℕ\",\"natur\":\"♮\",\"nbsp\":\" \",\"nbump\":\"≎̸\",\"nbumpe\":\"≏̸\",\"ncap\":\"⩃\",\"Ncaron\":\"Ň\",\"ncaron\":\"ň\",\"Ncedil\":\"Ņ\",\"ncedil\":\"ņ\",\"ncong\":\"≇\",\"ncongdot\":\"⩭̸\",\"ncup\":\"⩂\",\"Ncy\":\"Н\",\"ncy\":\"н\",\"ndash\":\"–\",\"nearhk\":\"⤤\",\"nearr\":\"↗\",\"neArr\":\"⇗\",\"nearrow\":\"↗\",\"ne\":\"≠\",\"nedot\":\"≐̸\",\"NegativeMediumSpace\":\"​\",\"NegativeThickSpace\":\"​\",\"NegativeThinSpace\":\"​\",\"NegativeVeryThinSpace\":\"​\",\"nequiv\":\"≢\",\"nesear\":\"⤨\",\"nesim\":\"≂̸\",\"NestedGreaterGreater\":\"≫\",\"NestedLessLess\":\"≪\",\"NewLine\":\"\\n\",\"nexist\":\"∄\",\"nexists\":\"∄\",\"Nfr\":\"𝔑\",\"nfr\":\"𝔫\",\"ngE\":\"≧̸\",\"nge\":\"≱\",\"ngeq\":\"≱\",\"ngeqq\":\"≧̸\",\"ngeqslant\":\"⩾̸\",\"nges\":\"⩾̸\",\"nGg\":\"⋙̸\",\"ngsim\":\"≵\",\"nGt\":\"≫⃒\",\"ngt\":\"≯\",\"ngtr\":\"≯\",\"nGtv\":\"≫̸\",\"nharr\":\"↮\",\"nhArr\":\"⇎\",\"nhpar\":\"⫲\",\"ni\":\"∋\",\"nis\":\"⋼\",\"nisd\":\"⋺\",\"niv\":\"∋\",\"NJcy\":\"Њ\",\"njcy\":\"њ\",\"nlarr\":\"↚\",\"nlArr\":\"⇍\",\"nldr\":\"‥\",\"nlE\":\"≦̸\",\"nle\":\"≰\",\"nleftarrow\":\"↚\",\"nLeftarrow\":\"⇍\",\"nleftrightarrow\":\"↮\",\"nLeftrightarrow\":\"⇎\",\"nleq\":\"≰\",\"nleqq\":\"≦̸\",\"nleqslant\":\"⩽̸\",\"nles\":\"⩽̸\",\"nless\":\"≮\",\"nLl\":\"⋘̸\",\"nlsim\":\"≴\",\"nLt\":\"≪⃒\",\"nlt\":\"≮\",\"nltri\":\"⋪\",\"nltrie\":\"⋬\",\"nLtv\":\"≪̸\",\"nmid\":\"∤\",\"NoBreak\":\"⁠\",\"NonBreakingSpace\":\" \",\"nopf\":\"𝕟\",\"Nopf\":\"ℕ\",\"Not\":\"⫬\",\"not\":\"¬\",\"NotCongruent\":\"≢\",\"NotCupCap\":\"≭\",\"NotDoubleVerticalBar\":\"∦\",\"NotElement\":\"∉\",\"NotEqual\":\"≠\",\"NotEqualTilde\":\"≂̸\",\"NotExists\":\"∄\",\"NotGreater\":\"≯\",\"NotGreaterEqual\":\"≱\",\"NotGreaterFullEqual\":\"≧̸\",\"NotGreaterGreater\":\"≫̸\",\"NotGreaterLess\":\"≹\",\"NotGreaterSlantEqual\":\"⩾̸\",\"NotGreaterTilde\":\"≵\",\"NotHumpDownHump\":\"≎̸\",\"NotHumpEqual\":\"≏̸\",\"notin\":\"∉\",\"notindot\":\"⋵̸\",\"notinE\":\"⋹̸\",\"notinva\":\"∉\",\"notinvb\":\"⋷\",\"notinvc\":\"⋶\",\"NotLeftTriangleBar\":\"⧏̸\",\"NotLeftTriangle\":\"⋪\",\"NotLeftTriangleEqual\":\"⋬\",\"NotLess\":\"≮\",\"NotLessEqual\":\"≰\",\"NotLessGreater\":\"≸\",\"NotLessLess\":\"≪̸\",\"NotLessSlantEqual\":\"⩽̸\",\"NotLessTilde\":\"≴\",\"NotNestedGreaterGreater\":\"⪢̸\",\"NotNestedLessLess\":\"⪡̸\",\"notni\":\"∌\",\"notniva\":\"∌\",\"notnivb\":\"⋾\",\"notnivc\":\"⋽\",\"NotPrecedes\":\"⊀\",\"NotPrecedesEqual\":\"⪯̸\",\"NotPrecedesSlantEqual\":\"⋠\",\"NotReverseElement\":\"∌\",\"NotRightTriangleBar\":\"⧐̸\",\"NotRightTriangle\":\"⋫\",\"NotRightTriangleEqual\":\"⋭\",\"NotSquareSubset\":\"⊏̸\",\"NotSquareSubsetEqual\":\"⋢\",\"NotSquareSuperset\":\"⊐̸\",\"NotSquareSupersetEqual\":\"⋣\",\"NotSubset\":\"⊂⃒\",\"NotSubsetEqual\":\"⊈\",\"NotSucceeds\":\"⊁\",\"NotSucceedsEqual\":\"⪰̸\",\"NotSucceedsSlantEqual\":\"⋡\",\"NotSucceedsTilde\":\"≿̸\",\"NotSuperset\":\"⊃⃒\",\"NotSupersetEqual\":\"⊉\",\"NotTilde\":\"≁\",\"NotTildeEqual\":\"≄\",\"NotTildeFullEqual\":\"≇\",\"NotTildeTilde\":\"≉\",\"NotVerticalBar\":\"∤\",\"nparallel\":\"∦\",\"npar\":\"∦\",\"nparsl\":\"⫽⃥\",\"npart\":\"∂̸\",\"npolint\":\"⨔\",\"npr\":\"⊀\",\"nprcue\":\"⋠\",\"nprec\":\"⊀\",\"npreceq\":\"⪯̸\",\"npre\":\"⪯̸\",\"nrarrc\":\"⤳̸\",\"nrarr\":\"↛\",\"nrArr\":\"⇏\",\"nrarrw\":\"↝̸\",\"nrightarrow\":\"↛\",\"nRightarrow\":\"⇏\",\"nrtri\":\"⋫\",\"nrtrie\":\"⋭\",\"nsc\":\"⊁\",\"nsccue\":\"⋡\",\"nsce\":\"⪰̸\",\"Nscr\":\"𝒩\",\"nscr\":\"𝓃\",\"nshortmid\":\"∤\",\"nshortparallel\":\"∦\",\"nsim\":\"≁\",\"nsime\":\"≄\",\"nsimeq\":\"≄\",\"nsmid\":\"∤\",\"nspar\":\"∦\",\"nsqsube\":\"⋢\",\"nsqsupe\":\"⋣\",\"nsub\":\"⊄\",\"nsubE\":\"⫅̸\",\"nsube\":\"⊈\",\"nsubset\":\"⊂⃒\",\"nsubseteq\":\"⊈\",\"nsubseteqq\":\"⫅̸\",\"nsucc\":\"⊁\",\"nsucceq\":\"⪰̸\",\"nsup\":\"⊅\",\"nsupE\":\"⫆̸\",\"nsupe\":\"⊉\",\"nsupset\":\"⊃⃒\",\"nsupseteq\":\"⊉\",\"nsupseteqq\":\"⫆̸\",\"ntgl\":\"≹\",\"Ntilde\":\"Ñ\",\"ntilde\":\"ñ\",\"ntlg\":\"≸\",\"ntriangleleft\":\"⋪\",\"ntrianglelefteq\":\"⋬\",\"ntriangleright\":\"⋫\",\"ntrianglerighteq\":\"⋭\",\"Nu\":\"Ν\",\"nu\":\"ν\",\"num\":\"#\",\"numero\":\"№\",\"numsp\":\" \",\"nvap\":\"≍⃒\",\"nvdash\":\"⊬\",\"nvDash\":\"⊭\",\"nVdash\":\"⊮\",\"nVDash\":\"⊯\",\"nvge\":\"≥⃒\",\"nvgt\":\">⃒\",\"nvHarr\":\"⤄\",\"nvinfin\":\"⧞\",\"nvlArr\":\"⤂\",\"nvle\":\"≤⃒\",\"nvlt\":\"<⃒\",\"nvltrie\":\"⊴⃒\",\"nvrArr\":\"⤃\",\"nvrtrie\":\"⊵⃒\",\"nvsim\":\"∼⃒\",\"nwarhk\":\"⤣\",\"nwarr\":\"↖\",\"nwArr\":\"⇖\",\"nwarrow\":\"↖\",\"nwnear\":\"⤧\",\"Oacute\":\"Ó\",\"oacute\":\"ó\",\"oast\":\"⊛\",\"Ocirc\":\"Ô\",\"ocirc\":\"ô\",\"ocir\":\"⊚\",\"Ocy\":\"О\",\"ocy\":\"о\",\"odash\":\"⊝\",\"Odblac\":\"Ő\",\"odblac\":\"ő\",\"odiv\":\"⨸\",\"odot\":\"⊙\",\"odsold\":\"⦼\",\"OElig\":\"Œ\",\"oelig\":\"œ\",\"ofcir\":\"⦿\",\"Ofr\":\"𝔒\",\"ofr\":\"𝔬\",\"ogon\":\"˛\",\"Ograve\":\"Ò\",\"ograve\":\"ò\",\"ogt\":\"⧁\",\"ohbar\":\"⦵\",\"ohm\":\"Ω\",\"oint\":\"∮\",\"olarr\":\"↺\",\"olcir\":\"⦾\",\"olcross\":\"⦻\",\"oline\":\"‾\",\"olt\":\"⧀\",\"Omacr\":\"Ō\",\"omacr\":\"ō\",\"Omega\":\"Ω\",\"omega\":\"ω\",\"Omicron\":\"Ο\",\"omicron\":\"ο\",\"omid\":\"⦶\",\"ominus\":\"⊖\",\"Oopf\":\"𝕆\",\"oopf\":\"𝕠\",\"opar\":\"⦷\",\"OpenCurlyDoubleQuote\":\"“\",\"OpenCurlyQuote\":\"‘\",\"operp\":\"⦹\",\"oplus\":\"⊕\",\"orarr\":\"↻\",\"Or\":\"⩔\",\"or\":\"∨\",\"ord\":\"⩝\",\"order\":\"ℴ\",\"orderof\":\"ℴ\",\"ordf\":\"ª\",\"ordm\":\"º\",\"origof\":\"⊶\",\"oror\":\"⩖\",\"orslope\":\"⩗\",\"orv\":\"⩛\",\"oS\":\"Ⓢ\",\"Oscr\":\"𝒪\",\"oscr\":\"ℴ\",\"Oslash\":\"Ø\",\"oslash\":\"ø\",\"osol\":\"⊘\",\"Otilde\":\"Õ\",\"otilde\":\"õ\",\"otimesas\":\"⨶\",\"Otimes\":\"⨷\",\"otimes\":\"⊗\",\"Ouml\":\"Ö\",\"ouml\":\"ö\",\"ovbar\":\"⌽\",\"OverBar\":\"‾\",\"OverBrace\":\"⏞\",\"OverBracket\":\"⎴\",\"OverParenthesis\":\"⏜\",\"para\":\"¶\",\"parallel\":\"∥\",\"par\":\"∥\",\"parsim\":\"⫳\",\"parsl\":\"⫽\",\"part\":\"∂\",\"PartialD\":\"∂\",\"Pcy\":\"П\",\"pcy\":\"п\",\"percnt\":\"%\",\"period\":\".\",\"permil\":\"‰\",\"perp\":\"⊥\",\"pertenk\":\"‱\",\"Pfr\":\"𝔓\",\"pfr\":\"𝔭\",\"Phi\":\"Φ\",\"phi\":\"φ\",\"phiv\":\"ϕ\",\"phmmat\":\"ℳ\",\"phone\":\"☎\",\"Pi\":\"Π\",\"pi\":\"π\",\"pitchfork\":\"⋔\",\"piv\":\"ϖ\",\"planck\":\"ℏ\",\"planckh\":\"ℎ\",\"plankv\":\"ℏ\",\"plusacir\":\"⨣\",\"plusb\":\"⊞\",\"pluscir\":\"⨢\",\"plus\":\"+\",\"plusdo\":\"∔\",\"plusdu\":\"⨥\",\"pluse\":\"⩲\",\"PlusMinus\":\"±\",\"plusmn\":\"±\",\"plussim\":\"⨦\",\"plustwo\":\"⨧\",\"pm\":\"±\",\"Poincareplane\":\"ℌ\",\"pointint\":\"⨕\",\"popf\":\"𝕡\",\"Popf\":\"ℙ\",\"pound\":\"£\",\"prap\":\"⪷\",\"Pr\":\"⪻\",\"pr\":\"≺\",\"prcue\":\"≼\",\"precapprox\":\"⪷\",\"prec\":\"≺\",\"preccurlyeq\":\"≼\",\"Precedes\":\"≺\",\"PrecedesEqual\":\"⪯\",\"PrecedesSlantEqual\":\"≼\",\"PrecedesTilde\":\"≾\",\"preceq\":\"⪯\",\"precnapprox\":\"⪹\",\"precneqq\":\"⪵\",\"precnsim\":\"⋨\",\"pre\":\"⪯\",\"prE\":\"⪳\",\"precsim\":\"≾\",\"prime\":\"′\",\"Prime\":\"″\",\"primes\":\"ℙ\",\"prnap\":\"⪹\",\"prnE\":\"⪵\",\"prnsim\":\"⋨\",\"prod\":\"∏\",\"Product\":\"∏\",\"profalar\":\"⌮\",\"profline\":\"⌒\",\"profsurf\":\"⌓\",\"prop\":\"∝\",\"Proportional\":\"∝\",\"Proportion\":\"∷\",\"propto\":\"∝\",\"prsim\":\"≾\",\"prurel\":\"⊰\",\"Pscr\":\"𝒫\",\"pscr\":\"𝓅\",\"Psi\":\"Ψ\",\"psi\":\"ψ\",\"puncsp\":\" \",\"Qfr\":\"𝔔\",\"qfr\":\"𝔮\",\"qint\":\"⨌\",\"qopf\":\"𝕢\",\"Qopf\":\"ℚ\",\"qprime\":\"⁗\",\"Qscr\":\"𝒬\",\"qscr\":\"𝓆\",\"quaternions\":\"ℍ\",\"quatint\":\"⨖\",\"quest\":\"?\",\"questeq\":\"≟\",\"quot\":\"\\\"\",\"QUOT\":\"\\\"\",\"rAarr\":\"⇛\",\"race\":\"∽̱\",\"Racute\":\"Ŕ\",\"racute\":\"ŕ\",\"radic\":\"√\",\"raemptyv\":\"⦳\",\"rang\":\"⟩\",\"Rang\":\"⟫\",\"rangd\":\"⦒\",\"range\":\"⦥\",\"rangle\":\"⟩\",\"raquo\":\"»\",\"rarrap\":\"⥵\",\"rarrb\":\"⇥\",\"rarrbfs\":\"⤠\",\"rarrc\":\"⤳\",\"rarr\":\"→\",\"Rarr\":\"↠\",\"rArr\":\"⇒\",\"rarrfs\":\"⤞\",\"rarrhk\":\"↪\",\"rarrlp\":\"↬\",\"rarrpl\":\"⥅\",\"rarrsim\":\"⥴\",\"Rarrtl\":\"⤖\",\"rarrtl\":\"↣\",\"rarrw\":\"↝\",\"ratail\":\"⤚\",\"rAtail\":\"⤜\",\"ratio\":\"∶\",\"rationals\":\"ℚ\",\"rbarr\":\"⤍\",\"rBarr\":\"⤏\",\"RBarr\":\"⤐\",\"rbbrk\":\"❳\",\"rbrace\":\"}\",\"rbrack\":\"]\",\"rbrke\":\"⦌\",\"rbrksld\":\"⦎\",\"rbrkslu\":\"⦐\",\"Rcaron\":\"Ř\",\"rcaron\":\"ř\",\"Rcedil\":\"Ŗ\",\"rcedil\":\"ŗ\",\"rceil\":\"⌉\",\"rcub\":\"}\",\"Rcy\":\"Р\",\"rcy\":\"р\",\"rdca\":\"⤷\",\"rdldhar\":\"⥩\",\"rdquo\":\"”\",\"rdquor\":\"”\",\"rdsh\":\"↳\",\"real\":\"ℜ\",\"realine\":\"ℛ\",\"realpart\":\"ℜ\",\"reals\":\"ℝ\",\"Re\":\"ℜ\",\"rect\":\"▭\",\"reg\":\"®\",\"REG\":\"®\",\"ReverseElement\":\"∋\",\"ReverseEquilibrium\":\"⇋\",\"ReverseUpEquilibrium\":\"⥯\",\"rfisht\":\"⥽\",\"rfloor\":\"⌋\",\"rfr\":\"𝔯\",\"Rfr\":\"ℜ\",\"rHar\":\"⥤\",\"rhard\":\"⇁\",\"rharu\":\"⇀\",\"rharul\":\"⥬\",\"Rho\":\"Ρ\",\"rho\":\"ρ\",\"rhov\":\"ϱ\",\"RightAngleBracket\":\"⟩\",\"RightArrowBar\":\"⇥\",\"rightarrow\":\"→\",\"RightArrow\":\"→\",\"Rightarrow\":\"⇒\",\"RightArrowLeftArrow\":\"⇄\",\"rightarrowtail\":\"↣\",\"RightCeiling\":\"⌉\",\"RightDoubleBracket\":\"⟧\",\"RightDownTeeVector\":\"⥝\",\"RightDownVectorBar\":\"⥕\",\"RightDownVector\":\"⇂\",\"RightFloor\":\"⌋\",\"rightharpoondown\":\"⇁\",\"rightharpoonup\":\"⇀\",\"rightleftarrows\":\"⇄\",\"rightleftharpoons\":\"⇌\",\"rightrightarrows\":\"⇉\",\"rightsquigarrow\":\"↝\",\"RightTeeArrow\":\"↦\",\"RightTee\":\"⊢\",\"RightTeeVector\":\"⥛\",\"rightthreetimes\":\"⋌\",\"RightTriangleBar\":\"⧐\",\"RightTriangle\":\"⊳\",\"RightTriangleEqual\":\"⊵\",\"RightUpDownVector\":\"⥏\",\"RightUpTeeVector\":\"⥜\",\"RightUpVectorBar\":\"⥔\",\"RightUpVector\":\"↾\",\"RightVectorBar\":\"⥓\",\"RightVector\":\"⇀\",\"ring\":\"˚\",\"risingdotseq\":\"≓\",\"rlarr\":\"⇄\",\"rlhar\":\"⇌\",\"rlm\":\"‏\",\"rmoustache\":\"⎱\",\"rmoust\":\"⎱\",\"rnmid\":\"⫮\",\"roang\":\"⟭\",\"roarr\":\"⇾\",\"robrk\":\"⟧\",\"ropar\":\"⦆\",\"ropf\":\"𝕣\",\"Ropf\":\"ℝ\",\"roplus\":\"⨮\",\"rotimes\":\"⨵\",\"RoundImplies\":\"⥰\",\"rpar\":\")\",\"rpargt\":\"⦔\",\"rppolint\":\"⨒\",\"rrarr\":\"⇉\",\"Rrightarrow\":\"⇛\",\"rsaquo\":\"›\",\"rscr\":\"𝓇\",\"Rscr\":\"ℛ\",\"rsh\":\"↱\",\"Rsh\":\"↱\",\"rsqb\":\"]\",\"rsquo\":\"’\",\"rsquor\":\"’\",\"rthree\":\"⋌\",\"rtimes\":\"⋊\",\"rtri\":\"▹\",\"rtrie\":\"⊵\",\"rtrif\":\"▸\",\"rtriltri\":\"⧎\",\"RuleDelayed\":\"⧴\",\"ruluhar\":\"⥨\",\"rx\":\"℞\",\"Sacute\":\"Ś\",\"sacute\":\"ś\",\"sbquo\":\"‚\",\"scap\":\"⪸\",\"Scaron\":\"Š\",\"scaron\":\"š\",\"Sc\":\"⪼\",\"sc\":\"≻\",\"sccue\":\"≽\",\"sce\":\"⪰\",\"scE\":\"⪴\",\"Scedil\":\"Ş\",\"scedil\":\"ş\",\"Scirc\":\"Ŝ\",\"scirc\":\"ŝ\",\"scnap\":\"⪺\",\"scnE\":\"⪶\",\"scnsim\":\"⋩\",\"scpolint\":\"⨓\",\"scsim\":\"≿\",\"Scy\":\"С\",\"scy\":\"с\",\"sdotb\":\"⊡\",\"sdot\":\"⋅\",\"sdote\":\"⩦\",\"searhk\":\"⤥\",\"searr\":\"↘\",\"seArr\":\"⇘\",\"searrow\":\"↘\",\"sect\":\"§\",\"semi\":\";\",\"seswar\":\"⤩\",\"setminus\":\"∖\",\"setmn\":\"∖\",\"sext\":\"✶\",\"Sfr\":\"𝔖\",\"sfr\":\"𝔰\",\"sfrown\":\"⌢\",\"sharp\":\"♯\",\"SHCHcy\":\"Щ\",\"shchcy\":\"щ\",\"SHcy\":\"Ш\",\"shcy\":\"ш\",\"ShortDownArrow\":\"↓\",\"ShortLeftArrow\":\"←\",\"shortmid\":\"∣\",\"shortparallel\":\"∥\",\"ShortRightArrow\":\"→\",\"ShortUpArrow\":\"↑\",\"shy\":\"­\",\"Sigma\":\"Σ\",\"sigma\":\"σ\",\"sigmaf\":\"ς\",\"sigmav\":\"ς\",\"sim\":\"∼\",\"simdot\":\"⩪\",\"sime\":\"≃\",\"simeq\":\"≃\",\"simg\":\"⪞\",\"simgE\":\"⪠\",\"siml\":\"⪝\",\"simlE\":\"⪟\",\"simne\":\"≆\",\"simplus\":\"⨤\",\"simrarr\":\"⥲\",\"slarr\":\"←\",\"SmallCircle\":\"∘\",\"smallsetminus\":\"∖\",\"smashp\":\"⨳\",\"smeparsl\":\"⧤\",\"smid\":\"∣\",\"smile\":\"⌣\",\"smt\":\"⪪\",\"smte\":\"⪬\",\"smtes\":\"⪬︀\",\"SOFTcy\":\"Ь\",\"softcy\":\"ь\",\"solbar\":\"⌿\",\"solb\":\"⧄\",\"sol\":\"/\",\"Sopf\":\"𝕊\",\"sopf\":\"𝕤\",\"spades\":\"♠\",\"spadesuit\":\"♠\",\"spar\":\"∥\",\"sqcap\":\"⊓\",\"sqcaps\":\"⊓︀\",\"sqcup\":\"⊔\",\"sqcups\":\"⊔︀\",\"Sqrt\":\"√\",\"sqsub\":\"⊏\",\"sqsube\":\"⊑\",\"sqsubset\":\"⊏\",\"sqsubseteq\":\"⊑\",\"sqsup\":\"⊐\",\"sqsupe\":\"⊒\",\"sqsupset\":\"⊐\",\"sqsupseteq\":\"⊒\",\"square\":\"□\",\"Square\":\"□\",\"SquareIntersection\":\"⊓\",\"SquareSubset\":\"⊏\",\"SquareSubsetEqual\":\"⊑\",\"SquareSuperset\":\"⊐\",\"SquareSupersetEqual\":\"⊒\",\"SquareUnion\":\"⊔\",\"squarf\":\"▪\",\"squ\":\"□\",\"squf\":\"▪\",\"srarr\":\"→\",\"Sscr\":\"𝒮\",\"sscr\":\"𝓈\",\"ssetmn\":\"∖\",\"ssmile\":\"⌣\",\"sstarf\":\"⋆\",\"Star\":\"⋆\",\"star\":\"☆\",\"starf\":\"★\",\"straightepsilon\":\"ϵ\",\"straightphi\":\"ϕ\",\"strns\":\"¯\",\"sub\":\"⊂\",\"Sub\":\"⋐\",\"subdot\":\"⪽\",\"subE\":\"⫅\",\"sube\":\"⊆\",\"subedot\":\"⫃\",\"submult\":\"⫁\",\"subnE\":\"⫋\",\"subne\":\"⊊\",\"subplus\":\"⪿\",\"subrarr\":\"⥹\",\"subset\":\"⊂\",\"Subset\":\"⋐\",\"subseteq\":\"⊆\",\"subseteqq\":\"⫅\",\"SubsetEqual\":\"⊆\",\"subsetneq\":\"⊊\",\"subsetneqq\":\"⫋\",\"subsim\":\"⫇\",\"subsub\":\"⫕\",\"subsup\":\"⫓\",\"succapprox\":\"⪸\",\"succ\":\"≻\",\"succcurlyeq\":\"≽\",\"Succeeds\":\"≻\",\"SucceedsEqual\":\"⪰\",\"SucceedsSlantEqual\":\"≽\",\"SucceedsTilde\":\"≿\",\"succeq\":\"⪰\",\"succnapprox\":\"⪺\",\"succneqq\":\"⪶\",\"succnsim\":\"⋩\",\"succsim\":\"≿\",\"SuchThat\":\"∋\",\"sum\":\"∑\",\"Sum\":\"∑\",\"sung\":\"♪\",\"sup1\":\"¹\",\"sup2\":\"²\",\"sup3\":\"³\",\"sup\":\"⊃\",\"Sup\":\"⋑\",\"supdot\":\"⪾\",\"supdsub\":\"⫘\",\"supE\":\"⫆\",\"supe\":\"⊇\",\"supedot\":\"⫄\",\"Superset\":\"⊃\",\"SupersetEqual\":\"⊇\",\"suphsol\":\"⟉\",\"suphsub\":\"⫗\",\"suplarr\":\"⥻\",\"supmult\":\"⫂\",\"supnE\":\"⫌\",\"supne\":\"⊋\",\"supplus\":\"⫀\",\"supset\":\"⊃\",\"Supset\":\"⋑\",\"supseteq\":\"⊇\",\"supseteqq\":\"⫆\",\"supsetneq\":\"⊋\",\"supsetneqq\":\"⫌\",\"supsim\":\"⫈\",\"supsub\":\"⫔\",\"supsup\":\"⫖\",\"swarhk\":\"⤦\",\"swarr\":\"↙\",\"swArr\":\"⇙\",\"swarrow\":\"↙\",\"swnwar\":\"⤪\",\"szlig\":\"ß\",\"Tab\":\"\\t\",\"target\":\"⌖\",\"Tau\":\"Τ\",\"tau\":\"τ\",\"tbrk\":\"⎴\",\"Tcaron\":\"Ť\",\"tcaron\":\"ť\",\"Tcedil\":\"Ţ\",\"tcedil\":\"ţ\",\"Tcy\":\"Т\",\"tcy\":\"т\",\"tdot\":\"⃛\",\"telrec\":\"⌕\",\"Tfr\":\"𝔗\",\"tfr\":\"𝔱\",\"there4\":\"∴\",\"therefore\":\"∴\",\"Therefore\":\"∴\",\"Theta\":\"Θ\",\"theta\":\"θ\",\"thetasym\":\"ϑ\",\"thetav\":\"ϑ\",\"thickapprox\":\"≈\",\"thicksim\":\"∼\",\"ThickSpace\":\"  \",\"ThinSpace\":\" \",\"thinsp\":\" \",\"thkap\":\"≈\",\"thksim\":\"∼\",\"THORN\":\"Þ\",\"thorn\":\"þ\",\"tilde\":\"˜\",\"Tilde\":\"∼\",\"TildeEqual\":\"≃\",\"TildeFullEqual\":\"≅\",\"TildeTilde\":\"≈\",\"timesbar\":\"⨱\",\"timesb\":\"⊠\",\"times\":\"×\",\"timesd\":\"⨰\",\"tint\":\"∭\",\"toea\":\"⤨\",\"topbot\":\"⌶\",\"topcir\":\"⫱\",\"top\":\"⊤\",\"Topf\":\"𝕋\",\"topf\":\"𝕥\",\"topfork\":\"⫚\",\"tosa\":\"⤩\",\"tprime\":\"‴\",\"trade\":\"™\",\"TRADE\":\"™\",\"triangle\":\"▵\",\"triangledown\":\"▿\",\"triangleleft\":\"◃\",\"trianglelefteq\":\"⊴\",\"triangleq\":\"≜\",\"triangleright\":\"▹\",\"trianglerighteq\":\"⊵\",\"tridot\":\"◬\",\"trie\":\"≜\",\"triminus\":\"⨺\",\"TripleDot\":\"⃛\",\"triplus\":\"⨹\",\"trisb\":\"⧍\",\"tritime\":\"⨻\",\"trpezium\":\"⏢\",\"Tscr\":\"𝒯\",\"tscr\":\"𝓉\",\"TScy\":\"Ц\",\"tscy\":\"ц\",\"TSHcy\":\"Ћ\",\"tshcy\":\"ћ\",\"Tstrok\":\"Ŧ\",\"tstrok\":\"ŧ\",\"twixt\":\"≬\",\"twoheadleftarrow\":\"↞\",\"twoheadrightarrow\":\"↠\",\"Uacute\":\"Ú\",\"uacute\":\"ú\",\"uarr\":\"↑\",\"Uarr\":\"↟\",\"uArr\":\"⇑\",\"Uarrocir\":\"⥉\",\"Ubrcy\":\"Ў\",\"ubrcy\":\"ў\",\"Ubreve\":\"Ŭ\",\"ubreve\":\"ŭ\",\"Ucirc\":\"Û\",\"ucirc\":\"û\",\"Ucy\":\"У\",\"ucy\":\"у\",\"udarr\":\"⇅\",\"Udblac\":\"Ű\",\"udblac\":\"ű\",\"udhar\":\"⥮\",\"ufisht\":\"⥾\",\"Ufr\":\"𝔘\",\"ufr\":\"𝔲\",\"Ugrave\":\"Ù\",\"ugrave\":\"ù\",\"uHar\":\"⥣\",\"uharl\":\"↿\",\"uharr\":\"↾\",\"uhblk\":\"▀\",\"ulcorn\":\"⌜\",\"ulcorner\":\"⌜\",\"ulcrop\":\"⌏\",\"ultri\":\"◸\",\"Umacr\":\"Ū\",\"umacr\":\"ū\",\"uml\":\"¨\",\"UnderBar\":\"_\",\"UnderBrace\":\"⏟\",\"UnderBracket\":\"⎵\",\"UnderParenthesis\":\"⏝\",\"Union\":\"⋃\",\"UnionPlus\":\"⊎\",\"Uogon\":\"Ų\",\"uogon\":\"ų\",\"Uopf\":\"𝕌\",\"uopf\":\"𝕦\",\"UpArrowBar\":\"⤒\",\"uparrow\":\"↑\",\"UpArrow\":\"↑\",\"Uparrow\":\"⇑\",\"UpArrowDownArrow\":\"⇅\",\"updownarrow\":\"↕\",\"UpDownArrow\":\"↕\",\"Updownarrow\":\"⇕\",\"UpEquilibrium\":\"⥮\",\"upharpoonleft\":\"↿\",\"upharpoonright\":\"↾\",\"uplus\":\"⊎\",\"UpperLeftArrow\":\"↖\",\"UpperRightArrow\":\"↗\",\"upsi\":\"υ\",\"Upsi\":\"ϒ\",\"upsih\":\"ϒ\",\"Upsilon\":\"Υ\",\"upsilon\":\"υ\",\"UpTeeArrow\":\"↥\",\"UpTee\":\"⊥\",\"upuparrows\":\"⇈\",\"urcorn\":\"⌝\",\"urcorner\":\"⌝\",\"urcrop\":\"⌎\",\"Uring\":\"Ů\",\"uring\":\"ů\",\"urtri\":\"◹\",\"Uscr\":\"𝒰\",\"uscr\":\"𝓊\",\"utdot\":\"⋰\",\"Utilde\":\"Ũ\",\"utilde\":\"ũ\",\"utri\":\"▵\",\"utrif\":\"▴\",\"uuarr\":\"⇈\",\"Uuml\":\"Ü\",\"uuml\":\"ü\",\"uwangle\":\"⦧\",\"vangrt\":\"⦜\",\"varepsilon\":\"ϵ\",\"varkappa\":\"ϰ\",\"varnothing\":\"∅\",\"varphi\":\"ϕ\",\"varpi\":\"ϖ\",\"varpropto\":\"∝\",\"varr\":\"↕\",\"vArr\":\"⇕\",\"varrho\":\"ϱ\",\"varsigma\":\"ς\",\"varsubsetneq\":\"⊊︀\",\"varsubsetneqq\":\"⫋︀\",\"varsupsetneq\":\"⊋︀\",\"varsupsetneqq\":\"⫌︀\",\"vartheta\":\"ϑ\",\"vartriangleleft\":\"⊲\",\"vartriangleright\":\"⊳\",\"vBar\":\"⫨\",\"Vbar\":\"⫫\",\"vBarv\":\"⫩\",\"Vcy\":\"В\",\"vcy\":\"в\",\"vdash\":\"⊢\",\"vDash\":\"⊨\",\"Vdash\":\"⊩\",\"VDash\":\"⊫\",\"Vdashl\":\"⫦\",\"veebar\":\"⊻\",\"vee\":\"∨\",\"Vee\":\"⋁\",\"veeeq\":\"≚\",\"vellip\":\"⋮\",\"verbar\":\"|\",\"Verbar\":\"‖\",\"vert\":\"|\",\"Vert\":\"‖\",\"VerticalBar\":\"∣\",\"VerticalLine\":\"|\",\"VerticalSeparator\":\"❘\",\"VerticalTilde\":\"≀\",\"VeryThinSpace\":\" \",\"Vfr\":\"𝔙\",\"vfr\":\"𝔳\",\"vltri\":\"⊲\",\"vnsub\":\"⊂⃒\",\"vnsup\":\"⊃⃒\",\"Vopf\":\"𝕍\",\"vopf\":\"𝕧\",\"vprop\":\"∝\",\"vrtri\":\"⊳\",\"Vscr\":\"𝒱\",\"vscr\":\"𝓋\",\"vsubnE\":\"⫋︀\",\"vsubne\":\"⊊︀\",\"vsupnE\":\"⫌︀\",\"vsupne\":\"⊋︀\",\"Vvdash\":\"⊪\",\"vzigzag\":\"⦚\",\"Wcirc\":\"Ŵ\",\"wcirc\":\"ŵ\",\"wedbar\":\"⩟\",\"wedge\":\"∧\",\"Wedge\":\"⋀\",\"wedgeq\":\"≙\",\"weierp\":\"℘\",\"Wfr\":\"𝔚\",\"wfr\":\"𝔴\",\"Wopf\":\"𝕎\",\"wopf\":\"𝕨\",\"wp\":\"℘\",\"wr\":\"≀\",\"wreath\":\"≀\",\"Wscr\":\"𝒲\",\"wscr\":\"𝓌\",\"xcap\":\"⋂\",\"xcirc\":\"◯\",\"xcup\":\"⋃\",\"xdtri\":\"▽\",\"Xfr\":\"𝔛\",\"xfr\":\"𝔵\",\"xharr\":\"⟷\",\"xhArr\":\"⟺\",\"Xi\":\"Ξ\",\"xi\":\"ξ\",\"xlarr\":\"⟵\",\"xlArr\":\"⟸\",\"xmap\":\"⟼\",\"xnis\":\"⋻\",\"xodot\":\"⨀\",\"Xopf\":\"𝕏\",\"xopf\":\"𝕩\",\"xoplus\":\"⨁\",\"xotime\":\"⨂\",\"xrarr\":\"⟶\",\"xrArr\":\"⟹\",\"Xscr\":\"𝒳\",\"xscr\":\"𝓍\",\"xsqcup\":\"⨆\",\"xuplus\":\"⨄\",\"xutri\":\"△\",\"xvee\":\"⋁\",\"xwedge\":\"⋀\",\"Yacute\":\"Ý\",\"yacute\":\"ý\",\"YAcy\":\"Я\",\"yacy\":\"я\",\"Ycirc\":\"Ŷ\",\"ycirc\":\"ŷ\",\"Ycy\":\"Ы\",\"ycy\":\"ы\",\"yen\":\"¥\",\"Yfr\":\"𝔜\",\"yfr\":\"𝔶\",\"YIcy\":\"Ї\",\"yicy\":\"ї\",\"Yopf\":\"𝕐\",\"yopf\":\"𝕪\",\"Yscr\":\"𝒴\",\"yscr\":\"𝓎\",\"YUcy\":\"Ю\",\"yucy\":\"ю\",\"yuml\":\"ÿ\",\"Yuml\":\"Ÿ\",\"Zacute\":\"Ź\",\"zacute\":\"ź\",\"Zcaron\":\"Ž\",\"zcaron\":\"ž\",\"Zcy\":\"З\",\"zcy\":\"з\",\"Zdot\":\"Ż\",\"zdot\":\"ż\",\"zeetrf\":\"ℨ\",\"ZeroWidthSpace\":\"​\",\"Zeta\":\"Ζ\",\"zeta\":\"ζ\",\"zfr\":\"𝔷\",\"Zfr\":\"ℨ\",\"ZHcy\":\"Ж\",\"zhcy\":\"ж\",\"zigrarr\":\"⇝\",\"zopf\":\"𝕫\",\"Zopf\":\"ℤ\",\"Zscr\":\"𝒵\",\"zscr\":\"𝓏\",\"zwj\":\"‍\",\"zwnj\":\"‌\"}");

/***/ }),

/***/ "../../util/sugar/node_modules/htmlparser2/node_modules/entities/maps/legacy.json":
/*!******************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/htmlparser2/node_modules/entities/maps/legacy.json ***!
  \******************************************************************************************************************************************/
/*! exports provided: Aacute, aacute, Acirc, acirc, acute, AElig, aelig, Agrave, agrave, amp, AMP, Aring, aring, Atilde, atilde, Auml, auml, brvbar, Ccedil, ccedil, cedil, cent, copy, COPY, curren, deg, divide, Eacute, eacute, Ecirc, ecirc, Egrave, egrave, ETH, eth, Euml, euml, frac12, frac14, frac34, gt, GT, Iacute, iacute, Icirc, icirc, iexcl, Igrave, igrave, iquest, Iuml, iuml, laquo, lt, LT, macr, micro, middot, nbsp, not, Ntilde, ntilde, Oacute, oacute, Ocirc, ocirc, Ograve, ograve, ordf, ordm, Oslash, oslash, Otilde, otilde, Ouml, ouml, para, plusmn, pound, quot, QUOT, raquo, reg, REG, sect, shy, sup1, sup2, sup3, szlig, THORN, thorn, times, Uacute, uacute, Ucirc, ucirc, Ugrave, ugrave, uml, Uuml, uuml, Yacute, yacute, yen, yuml, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"Aacute\":\"Á\",\"aacute\":\"á\",\"Acirc\":\"Â\",\"acirc\":\"â\",\"acute\":\"´\",\"AElig\":\"Æ\",\"aelig\":\"æ\",\"Agrave\":\"À\",\"agrave\":\"à\",\"amp\":\"&\",\"AMP\":\"&\",\"Aring\":\"Å\",\"aring\":\"å\",\"Atilde\":\"Ã\",\"atilde\":\"ã\",\"Auml\":\"Ä\",\"auml\":\"ä\",\"brvbar\":\"¦\",\"Ccedil\":\"Ç\",\"ccedil\":\"ç\",\"cedil\":\"¸\",\"cent\":\"¢\",\"copy\":\"©\",\"COPY\":\"©\",\"curren\":\"¤\",\"deg\":\"°\",\"divide\":\"÷\",\"Eacute\":\"É\",\"eacute\":\"é\",\"Ecirc\":\"Ê\",\"ecirc\":\"ê\",\"Egrave\":\"È\",\"egrave\":\"è\",\"ETH\":\"Ð\",\"eth\":\"ð\",\"Euml\":\"Ë\",\"euml\":\"ë\",\"frac12\":\"½\",\"frac14\":\"¼\",\"frac34\":\"¾\",\"gt\":\">\",\"GT\":\">\",\"Iacute\":\"Í\",\"iacute\":\"í\",\"Icirc\":\"Î\",\"icirc\":\"î\",\"iexcl\":\"¡\",\"Igrave\":\"Ì\",\"igrave\":\"ì\",\"iquest\":\"¿\",\"Iuml\":\"Ï\",\"iuml\":\"ï\",\"laquo\":\"«\",\"lt\":\"<\",\"LT\":\"<\",\"macr\":\"¯\",\"micro\":\"µ\",\"middot\":\"·\",\"nbsp\":\" \",\"not\":\"¬\",\"Ntilde\":\"Ñ\",\"ntilde\":\"ñ\",\"Oacute\":\"Ó\",\"oacute\":\"ó\",\"Ocirc\":\"Ô\",\"ocirc\":\"ô\",\"Ograve\":\"Ò\",\"ograve\":\"ò\",\"ordf\":\"ª\",\"ordm\":\"º\",\"Oslash\":\"Ø\",\"oslash\":\"ø\",\"Otilde\":\"Õ\",\"otilde\":\"õ\",\"Ouml\":\"Ö\",\"ouml\":\"ö\",\"para\":\"¶\",\"plusmn\":\"±\",\"pound\":\"£\",\"quot\":\"\\\"\",\"QUOT\":\"\\\"\",\"raquo\":\"»\",\"reg\":\"®\",\"REG\":\"®\",\"sect\":\"§\",\"shy\":\"­\",\"sup1\":\"¹\",\"sup2\":\"²\",\"sup3\":\"³\",\"szlig\":\"ß\",\"THORN\":\"Þ\",\"thorn\":\"þ\",\"times\":\"×\",\"Uacute\":\"Ú\",\"uacute\":\"ú\",\"Ucirc\":\"Û\",\"ucirc\":\"û\",\"Ugrave\":\"Ù\",\"ugrave\":\"ù\",\"uml\":\"¨\",\"Uuml\":\"Ü\",\"uuml\":\"ü\",\"Yacute\":\"Ý\",\"yacute\":\"ý\",\"yen\":\"¥\",\"yuml\":\"ÿ\"}");

/***/ }),

/***/ "../../util/sugar/node_modules/htmlparser2/node_modules/entities/maps/xml.json":
/*!***************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/htmlparser2/node_modules/entities/maps/xml.json ***!
  \***************************************************************************************************************************************/
/*! exports provided: amp, apos, gt, lt, quot, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"amp\":\"&\",\"apos\":\"'\",\"gt\":\">\",\"lt\":\"<\",\"quot\":\"\\\"\"}");

/***/ }),

/***/ "../../util/sugar/node_modules/ieee754/index.js":
/*!********************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/ieee754/index.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "../../util/sugar/node_modules/in-viewport/in-viewport.js":
/*!******************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/in-viewport/in-viewport.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = inViewport;

var instances = [];
var supportsMutationObserver = typeof global.MutationObserver === 'function';

function inViewport(elt, params, cb) {
  var opts = {
    container: global.document.body,
    offset: 0,
    debounce: 15,
    failsafe: 150
  };

  if (params === undefined || typeof params === 'function') {
    cb = params;
    params = {};
  }

  var container = opts.container = params.container || opts.container;
  var offset = opts.offset = params.offset || opts.offset;
  var debounceValue = opts.debounce = params.debounce || opts.debounce;
  var failsafe = opts.failsafe = params.failsafe || opts.failsafe;

  // ensure backward compatibility with failsafe as boolean
  if (failsafe === true) {
    failsafe = 150;
  } else if(failsafe === false) {
    failsafe = 0;
  }

  // failsafe check always needs to be higher than debounceValue
  if (failsafe > 0 && failsafe < debounceValue) {
      failsafe = debounceValue + 50;
  }

  for (var i = 0; i < instances.length; i++) {
    if (
      instances[i].container === container &&
      instances[i]._debounce === debounceValue &&
      instances[i]._failsafe === failsafe
    ) {
      return instances[i].isInViewport(elt, offset, cb);
    }
  }

  return instances[
    instances.push(createInViewport(container, debounceValue, failsafe)) - 1
  ].isInViewport(elt, offset, cb);
}

function addEvent(el, type, fn) {
  if (el.attachEvent) {
    el.attachEvent('on' + type, fn);
  } else {
    el.addEventListener(type, fn, false);
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);

    function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }
  };
}

// https://github.com/jquery/sizzle/blob/3136f48b90e3edc84cbaaa6f6f7734ef03775a07/sizzle.js#L708
var contains = function() {
  if (!global.document) {
    return true;
  }
  return global.document.documentElement.compareDocumentPosition ?
    function (a, b) {
      return !!(a.compareDocumentPosition(b) & 16);
    } :
    global.document.documentElement.contains ?
      function (a, b) {
        return a !== b && ( a.contains ? a.contains(b) : false );
      } :
      function (a, b) {
        while (b = b.parentNode) {
          if (b === a) {
            return true;
          }
        }
        return false;
      };
}

function createInViewport(container, debounceValue, failsafe) {
  var watches = createWatches();

  var scrollContainer = container === global.document.body ? global : container;
  var debouncedCheck = debounce(watches.checkAll(watchInViewport), debounceValue);

  addEvent(scrollContainer, 'scroll', debouncedCheck);

  if (scrollContainer === global) {
    addEvent(global, 'resize', debouncedCheck);
  }

  if (supportsMutationObserver) {
    observeDOM(watches, container, debouncedCheck);
  }

  // failsafe check, every X we check for visible images
  // usecase: a hidden parent containing eleements
  // when the parent becomes visible, we have no event that the children
  // became visible
  if (failsafe > 0) {
    setInterval(debouncedCheck, failsafe);
  }

  function isInViewport(elt, offset, cb) {
    if (!cb) {
      return isVisible(elt, offset);
    }

    var remote = createRemote(elt, offset, cb);
    remote.watch();
    return remote;
  }

  function createRemote(elt, offset, cb) {
    function watch() {
      watches.add(elt, offset, cb);
    }

    function dispose() {
      watches.remove(elt);
    }

    return {
      watch: watch,
      dispose: dispose
    };
  }

  function watchInViewport(elt, offset, cb) {
    if (isVisible(elt, offset)) {
      watches.remove(elt);
      cb(elt);
    }
  }

  function isVisible(elt, offset) {
    if (!elt) {
      return false;
    }

    if (!contains(global.document.documentElement, elt) || !contains(global.document.documentElement, container)) {
      return false;
    }

    // Check if the element is visible
    // https://github.com/jquery/jquery/blob/740e190223d19a114d5373758127285d14d6b71e/src/css/hiddenVisibleSelectors.js
    if (!elt.offsetWidth || !elt.offsetHeight) {
      return false;
    }

    var eltRect = elt.getBoundingClientRect();
    var viewport = {};

    if (container === global.document.body) {
      viewport = {
        top: -offset,
        left: -offset,
        right: global.document.documentElement.clientWidth + offset,
        bottom: global.document.documentElement.clientHeight + offset
      };
    } else {
      var containerRect = container.getBoundingClientRect();
      viewport = {
        top: containerRect.top - offset,
        left: containerRect.left - offset,
        right: containerRect.right + offset,
        bottom: containerRect.bottom + offset
      };
    }

    // The element must overlap with the visible part of the viewport
    var visible =
      (
        eltRect.right >= viewport.left &&
        eltRect.left <= viewport.right &&
        eltRect.bottom >= viewport.top &&
        eltRect.top <= viewport.bottom
      );

    return visible;
  }

  return {
    container: container,
    isInViewport: isInViewport,
    _debounce: debounceValue,
    _failsafe: failsafe
  };
}

function createWatches() {
  var watches = [];

  function add(elt, offset, cb) {
    if (!isWatched(elt)) {
      watches.push([elt, offset, cb]);
    }
  }

  function remove(elt) {
    var pos = indexOf(elt);
    if (pos !== -1) {
      watches.splice(pos, 1);
    }
  }

  function indexOf(elt) {
    for (var i = watches.length - 1; i >= 0; i--) {
      if (watches[i][0] === elt) {
        return i;
      }
    }
    return -1;
  }

  function isWatched(elt) {
    return indexOf(elt) !== -1;
  }

  function checkAll(cb) {
    return function () {
      for (var i = watches.length - 1; i >= 0; i--) {
        cb.apply(this, watches[i]);
      }
    };
  }

  return {
    add: add,
    remove: remove,
    isWatched: isWatched,
    checkAll: checkAll
  };
}

function observeDOM(watches, container, cb) {
  var observer = new MutationObserver(watch);
  var filter = Array.prototype.filter;
  var concat = Array.prototype.concat;

  observer.observe(container, {
    childList: true,
    subtree: true,
    // changes like style/width/height/display will be catched
    attributes: true
  });

  function watch(mutations) {
    // some new DOM nodes where previously watched
    // we should check their positions
    if (mutations.some(knownNodes) === true) {
      setTimeout(cb, 0);
    }
  }

  function knownNodes(mutation) {
    var nodes = concat.call([],
      Array.prototype.slice.call(mutation.addedNodes),
      mutation.target
    );
    return filter.call(nodes, watches.isWatched).length > 0;
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../../util/sugar/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../util/sugar/node_modules/inherits/inherits_browser.js":
/*!********************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/inherits/inherits_browser.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "../../util/sugar/node_modules/is-class/is-class.js":
/*!************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/is-class/is-class.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root) {
  const toString = Function.prototype.toString

  function fnBody (fn) {
    return toString.call(fn).replace(/^[^{]*{\s*/, '').replace(/\s*}[^}]*$/, '')
  }

  function isClass (fn) {
    if (typeof fn !== 'function') {
      return false
    }

    if (/^class[\s{]/.test(toString.call(fn))) {
      return true
    }

    // babel.js classCallCheck() & inlined
    const body = fnBody(fn)
    return (/classCallCheck\(/.test(body) || /TypeError\("Cannot call a class as a function"\)/.test(body))
  }

  if (true) {
    if ( true && module.exports) {
      exports = module.exports = isClass
    }
    exports.isClass = isClass
  } else {}
})(this);


/***/ }),

/***/ "../../util/sugar/node_modules/isarray/index.js":
/*!********************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/isarray/index.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "../../util/sugar/node_modules/lit-html/lib/default-template-processor.js":
/*!**********************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/lit-html/lib/default-template-processor.js ***!
  \**********************************************************************************************************************************/
/*! exports provided: DefaultTemplateProcessor, defaultTemplateProcessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultTemplateProcessor", function() { return DefaultTemplateProcessor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultTemplateProcessor", function() { return defaultTemplateProcessor; });
/* harmony import */ var _parts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parts.js */ "../../util/sugar/node_modules/lit-html/lib/parts.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
        const prefix = name[0];
        if (prefix === '.') {
            const committer = new _parts_js__WEBPACK_IMPORTED_MODULE_0__["PropertyCommitter"](element, name.slice(1), strings);
            return committer.parts;
        }
        if (prefix === '@') {
            return [new _parts_js__WEBPACK_IMPORTED_MODULE_0__["EventPart"](element, name.slice(1), options.eventContext)];
        }
        if (prefix === '?') {
            return [new _parts_js__WEBPACK_IMPORTED_MODULE_0__["BooleanAttributePart"](element, name.slice(1), strings)];
        }
        const committer = new _parts_js__WEBPACK_IMPORTED_MODULE_0__["AttributeCommitter"](element, name, strings);
        return committer.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */
    handleTextExpression(options) {
        return new _parts_js__WEBPACK_IMPORTED_MODULE_0__["NodePart"](options);
    }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();
//# sourceMappingURL=default-template-processor.js.map

/***/ }),

/***/ "../../util/sugar/node_modules/lit-html/lib/directive.js":
/*!*****************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/lit-html/lib/directive.js ***!
  \*****************************************************************************************************************/
/*! exports provided: directive, isDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "directive", function() { return directive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDirective", function() { return isDirective; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive factory function so that lit-html will call
 * the function during template rendering, rather than passing as a value.
 *
 * A _directive_ is a function that takes a Part as an argument. It has the
 * signature: `(part: Part) => void`.
 *
 * A directive _factory_ is a function that takes arguments for data and
 * configuration and returns a directive. Users of directive usually refer to
 * the directive factory as the directive. For example, "The repeat directive".
 *
 * Usually a template author will invoke a directive factory in their template
 * with relevant arguments, which will then return a directive function.
 *
 * Here's an example of using the `repeat()` directive factory that takes an
 * array and a function to render an item:
 *
 * ```js
 * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
 * ```
 *
 * When `repeat` is invoked, it returns a directive function that closes over
 * `items` and the template function. When the outer template is rendered, the
 * return directive function is called with the Part for the expression.
 * `repeat` then performs it's custom logic to render multiple items.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object.
 *
 * @example
 *
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 */
const directive = (f) => ((...args) => {
    const d = f(...args);
    directives.set(d, true);
    return d;
});
const isDirective = (o) => {
    return typeof o === 'function' && directives.has(o);
};
//# sourceMappingURL=directive.js.map

/***/ }),

/***/ "../../util/sugar/node_modules/lit-html/lib/dom.js":
/*!***********************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/lit-html/lib/dom.js ***!
  \***********************************************************************************************************/
/*! exports provided: isCEPolyfill, reparentNodes, removeNodes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCEPolyfill", function() { return isCEPolyfill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reparentNodes", function() { return reparentNodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeNodes", function() { return removeNodes; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = typeof window !== 'undefined' &&
    window.customElements != null &&
    window.customElements.polyfillWrapFlushCallback !==
        undefined;
/**
 * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
 * into another container (could be the same container), before `before`. If
 * `before` is null, it appends the nodes to the container.
 */
const reparentNodes = (container, start, end = null, before = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.insertBefore(start, before);
        start = n;
    }
};
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */
const removeNodes = (container, start, end = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.removeChild(start);
        start = n;
    }
};
//# sourceMappingURL=dom.js.map

/***/ }),

/***/ "../../util/sugar/node_modules/lit-html/lib/part.js":
/*!************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/lit-html/lib/part.js ***!
  \************************************************************************************************************/
/*! exports provided: noChange, nothing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noChange", function() { return noChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nothing", function() { return nothing; });
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */
const nothing = {};
//# sourceMappingURL=part.js.map

/***/ }),

/***/ "../../util/sugar/node_modules/lit-html/lib/parts.js":
/*!*************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/lit-html/lib/parts.js ***!
  \*************************************************************************************************************/
/*! exports provided: isPrimitive, isIterable, AttributeCommitter, AttributePart, NodePart, BooleanAttributePart, PropertyCommitter, PropertyPart, EventPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPrimitive", function() { return isPrimitive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIterable", function() { return isIterable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributeCommitter", function() { return AttributeCommitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributePart", function() { return AttributePart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodePart", function() { return NodePart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BooleanAttributePart", function() { return BooleanAttributePart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyCommitter", function() { return PropertyCommitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPart", function() { return PropertyPart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventPart", function() { return EventPart; });
/* harmony import */ var _directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./directive.js */ "../../util/sugar/node_modules/lit-html/lib/directive.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "../../util/sugar/node_modules/lit-html/lib/dom.js");
/* harmony import */ var _part_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./part.js */ "../../util/sugar/node_modules/lit-html/lib/part.js");
/* harmony import */ var _template_instance_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template-instance.js */ "../../util/sugar/node_modules/lit-html/lib/template-instance.js");
/* harmony import */ var _template_result_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template-result.js */ "../../util/sugar/node_modules/lit-html/lib/template-result.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./template.js */ "../../util/sugar/node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */






const isPrimitive = (value) => {
    return (value === null ||
        !(typeof value === 'object' || typeof value === 'function'));
};
const isIterable = (value) => {
    return Array.isArray(value) ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attribute. The value is only set once even if there are multiple parts
 * for an attribute.
 */
class AttributeCommitter {
    constructor(element, name, strings) {
        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];
        for (let i = 0; i < strings.length - 1; i++) {
            this.parts[i] = this._createPart();
        }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */
    _createPart() {
        return new AttributePart(this);
    }
    _getValue() {
        const strings = this.strings;
        const l = strings.length - 1;
        let text = '';
        for (let i = 0; i < l; i++) {
            text += strings[i];
            const part = this.parts[i];
            if (part !== undefined) {
                const v = part.value;
                if (isPrimitive(v) || !isIterable(v)) {
                    text += typeof v === 'string' ? v : String(v);
                }
                else {
                    for (const t of v) {
                        text += typeof t === 'string' ? t : String(t);
                    }
                }
            }
        }
        text += strings[l];
        return text;
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
        }
    }
}
/**
 * A Part that controls all or part of an attribute value.
 */
class AttributePart {
    constructor(committer) {
        this.value = undefined;
        this.committer = committer;
    }
    setValue(value) {
        if (value !== _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"] && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().
            if (!Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this.value)) {
            const directive = this.value;
            this.value = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        if (this.value === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        this.committer.commit();
    }
}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */
class NodePart {
    constructor(options) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.options = options;
    }
    /**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendInto(container) {
        this.startNode = container.appendChild(Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
        this.endNode = container.appendChild(Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
    }
    /**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendIntoPart(part) {
        part.__insert(this.startNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
        part.__insert(this.endNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
    }
    /**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterPart(ref) {
        ref.__insert(this.startNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        if (this.startNode.parentNode === null) {
            return;
        }
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        const value = this.__pendingValue;
        if (value === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        if (isPrimitive(value)) {
            if (value !== this.value) {
                this.__commitText(value);
            }
        }
        else if (value instanceof _template_result_js__WEBPACK_IMPORTED_MODULE_4__["TemplateResult"]) {
            this.__commitTemplateResult(value);
        }
        else if (value instanceof Node) {
            this.__commitNode(value);
        }
        else if (isIterable(value)) {
            this.__commitIterable(value);
        }
        else if (value === _part_js__WEBPACK_IMPORTED_MODULE_2__["nothing"]) {
            this.value = _part_js__WEBPACK_IMPORTED_MODULE_2__["nothing"];
            this.clear();
        }
        else {
            // Fallback, will render the string representation
            this.__commitText(value);
        }
    }
    __insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    __commitNode(value) {
        if (this.value === value) {
            return;
        }
        this.clear();
        this.__insert(value);
        this.value = value;
    }
    __commitText(value) {
        const node = this.startNode.nextSibling;
        value = value == null ? '' : value;
        // If `value` isn't already a string, we explicitly convert it here in case
        // it can't be implicitly converted - i.e. it's a symbol.
        const valueAsString = typeof value === 'string' ? value : String(value);
        if (node === this.endNode.previousSibling &&
            node.nodeType === 3 /* Node.TEXT_NODE */) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if this.value is primitive?
            node.data = valueAsString;
        }
        else {
            this.__commitNode(document.createTextNode(valueAsString));
        }
        this.value = value;
    }
    __commitTemplateResult(value) {
        const template = this.options.templateFactory(value);
        if (this.value instanceof _template_instance_js__WEBPACK_IMPORTED_MODULE_3__["TemplateInstance"] &&
            this.value.template === template) {
            this.value.update(value.values);
        }
        else {
            // Make sure we propagate the template processor from the TemplateResult
            // so that we use its syntax extension, etc. The template factory comes
            // from the render function options so that it can control template
            // caching and preprocessing.
            const instance = new _template_instance_js__WEBPACK_IMPORTED_MODULE_3__["TemplateInstance"](template, value.processor, this.options);
            const fragment = instance._clone();
            instance.update(value.values);
            this.__commitNode(fragment);
            this.value = instance;
        }
    }
    __commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _value is an array, then the previous render was of an
        // iterable and _value will contain the NodeParts from the previous
        // render. If _value is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this.value;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            // Try to reuse an existing part
            itemPart = itemParts[partIndex];
            // If no existing part, create a new one
            if (itemPart === undefined) {
                itemPart = new NodePart(this.options);
                itemParts.push(itemPart);
                if (partIndex === 0) {
                    itemPart.appendIntoPart(this);
                }
                else {
                    itemPart.insertAfterPart(itemParts[partIndex - 1]);
                }
            }
            itemPart.setValue(item);
            itemPart.commit();
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
            this.clear(itemPart && itemPart.endNode);
        }
    }
    clear(startNode = this.startNode) {
        Object(_dom_js__WEBPACK_IMPORTED_MODULE_1__["removeNodes"])(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
class BooleanAttributePart {
    constructor(element, name, strings) {
        this.value = undefined;
        this.__pendingValue = undefined;
        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
        }
        this.element = element;
        this.name = name;
        this.strings = strings;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        if (this.__pendingValue === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        const value = !!this.__pendingValue;
        if (this.value !== value) {
            if (value) {
                this.element.setAttribute(this.name, '');
            }
            else {
                this.element.removeAttribute(this.name);
            }
            this.value = value;
        }
        this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
    }
}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */
class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
        super(element, name, strings);
        this.single =
            (strings.length === 2 && strings[0] === '' && strings[1] === '');
    }
    _createPart() {
        return new PropertyPart(this);
    }
    _getValue() {
        if (this.single) {
            return this.parts[0].value;
        }
        return super._getValue();
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.element[this.name] = this._getValue();
        }
    }
}
class PropertyPart extends AttributePart {
}
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported = false;
// Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module
(() => {
    try {
        const options = {
            get capture() {
                eventOptionsSupported = true;
                return false;
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.addEventListener('test', options, options);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.removeEventListener('test', options, options);
    }
    catch (_e) {
        // event options not supported
    }
})();
class EventPart {
    constructor(element, eventName, eventContext) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this.__boundHandleEvent = (e) => this.handleEvent(e);
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        if (this.__pendingValue === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        const newListener = this.__pendingValue;
        const oldListener = this.value;
        const shouldRemoveListener = newListener == null ||
            oldListener != null &&
                (newListener.capture !== oldListener.capture ||
                    newListener.once !== oldListener.once ||
                    newListener.passive !== oldListener.passive);
        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        if (shouldAddListener) {
            this.__options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        this.value = newListener;
        this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
    }
    handleEvent(event) {
        if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
        }
        else {
            this.value.handleEvent(event);
        }
    }
}
// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const getOptions = (o) => o &&
    (eventOptionsSupported ?
        { capture: o.capture, passive: o.passive, once: o.once } :
        o.capture);
//# sourceMappingURL=parts.js.map

/***/ }),

/***/ "../../util/sugar/node_modules/lit-html/lib/render.js":
/*!**************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/lit-html/lib/render.js ***!
  \**************************************************************************************************************/
/*! exports provided: parts, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parts", function() { return parts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "../../util/sugar/node_modules/lit-html/lib/dom.js");
/* harmony import */ var _parts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parts.js */ "../../util/sugar/node_modules/lit-html/lib/parts.js");
/* harmony import */ var _template_factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template-factory.js */ "../../util/sugar/node_modules/lit-html/lib/template-factory.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */



const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
const render = (result, container, options) => {
    let part = parts.get(container);
    if (part === undefined) {
        Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["removeNodes"])(container, container.firstChild);
        parts.set(container, part = new _parts_js__WEBPACK_IMPORTED_MODULE_1__["NodePart"](Object.assign({ templateFactory: _template_factory_js__WEBPACK_IMPORTED_MODULE_2__["templateFactory"] }, options)));
        part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
};
//# sourceMappingURL=render.js.map

/***/ }),

/***/ "../../util/sugar/node_modules/lit-html/lib/template-factory.js":
/*!************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/lit-html/lib/template-factory.js ***!
  \************************************************************************************************************************/
/*! exports provided: templateFactory, templateCaches */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "templateFactory", function() { return templateFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "templateCaches", function() { return templateCaches; });
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template.js */ "../../util/sugar/node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result.type, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    const key = result.strings.join(_template_js__WEBPACK_IMPORTED_MODULE_0__["marker"]);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new _template_js__WEBPACK_IMPORTED_MODULE_0__["Template"](result, result.getTemplateElement());
        // Cache the Template for this key
        templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
}
const templateCaches = new Map();
//# sourceMappingURL=template-factory.js.map

/***/ }),

/***/ "../../util/sugar/node_modules/lit-html/lib/template-instance.js":
/*!*************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/lit-html/lib/template-instance.js ***!
  \*************************************************************************************************************************/
/*! exports provided: TemplateInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateInstance", function() { return TemplateInstance; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "../../util/sugar/node_modules/lit-html/lib/dom.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template.js */ "../../util/sugar/node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */


/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
    constructor(template, processor, options) {
        this.__parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
    }
    update(values) {
        let i = 0;
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.setValue(values[i]);
            }
            i++;
        }
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.commit();
            }
        }
    }
    _clone() {
        // There are a number of steps in the lifecycle of a template instance's
        // DOM fragment:
        //  1. Clone - create the instance fragment
        //  2. Adopt - adopt into the main document
        //  3. Process - find part markers and create parts
        //  4. Upgrade - upgrade custom elements
        //  5. Update - set node, attribute, property, etc., values
        //  6. Connect - connect to the document. Optional and outside of this
        //     method.
        //
        // We have a few constraints on the ordering of these steps:
        //  * We need to upgrade before updating, so that property values will pass
        //    through any property setters.
        //  * We would like to process before upgrading so that we're sure that the
        //    cloned fragment is inert and not disturbed by self-modifying DOM.
        //  * We want custom elements to upgrade even in disconnected fragments.
        //
        // Given these constraints, with full custom elements support we would
        // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
        //
        // But Safari does not implement CustomElementRegistry#upgrade, so we
        // can not implement that order and still have upgrade-before-update and
        // upgrade disconnected fragments. So we instead sacrifice the
        // process-before-upgrade constraint, since in Custom Elements v1 elements
        // must not modify their light DOM in the constructor. We still have issues
        // when co-existing with CEv0 elements like Polymer 1, and with polyfills
        // that don't strictly adhere to the no-modification rule because shadow
        // DOM, which may be created in the constructor, is emulated by being placed
        // in the light DOM.
        //
        // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
        // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
        // in one step.
        //
        // The Custom Elements v1 polyfill supports upgrade(), so the order when
        // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
        // Connect.
        const fragment = _dom_js__WEBPACK_IMPORTED_MODULE_0__["isCEPolyfill"] ?
            this.template.element.content.cloneNode(true) :
            document.importNode(this.template.element.content, true);
        const stack = [];
        const parts = this.template.parts;
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        let partIndex = 0;
        let nodeIndex = 0;
        let part;
        let node = walker.nextNode();
        // Loop through all the nodes and parts of a template
        while (partIndex < parts.length) {
            part = parts[partIndex];
            if (!Object(_template_js__WEBPACK_IMPORTED_MODULE_1__["isTemplatePartActive"])(part)) {
                this.__parts.push(undefined);
                partIndex++;
                continue;
            }
            // Progress the tree walker until we find our next part's node.
            // Note that multiple parts may share the same node (attribute parts
            // on a single element), so this loop may not run at all.
            while (nodeIndex < part.index) {
                nodeIndex++;
                if (node.nodeName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
                if ((node = walker.nextNode()) === null) {
                    // We've exhausted the content inside a nested template element.
                    // Because we still have parts (the outer for-loop), we know:
                    // - There is a template in the stack
                    // - The walker will find a nextNode outside the template
                    walker.currentNode = stack.pop();
                    node = walker.nextNode();
                }
            }
            // We've arrived at our part's node.
            if (part.type === 'node') {
                const part = this.processor.handleTextExpression(this.options);
                part.insertAfterNode(node.previousSibling);
                this.__parts.push(part);
            }
            else {
                this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
            }
            partIndex++;
        }
        if (_dom_js__WEBPACK_IMPORTED_MODULE_0__["isCEPolyfill"]) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
        }
        return fragment;
    }
}
//# sourceMappingURL=template-instance.js.map

/***/ }),

/***/ "../../util/sugar/node_modules/lit-html/lib/template-result.js":
/*!***********************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/lit-html/lib/template-result.js ***!
  \***********************************************************************************************************************/
/*! exports provided: TemplateResult, SVGTemplateResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateResult", function() { return TemplateResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVGTemplateResult", function() { return SVGTemplateResult; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "../../util/sugar/node_modules/lit-html/lib/dom.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template.js */ "../../util/sugar/node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */


const commentMarker = ` ${_template_js__WEBPACK_IMPORTED_MODULE_1__["marker"]} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
    constructor(strings, values, type, processor) {
        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */
    getHTML() {
        const l = this.strings.length - 1;
        let html = '';
        let isCommentBinding = false;
        for (let i = 0; i < l; i++) {
            const s = this.strings[i];
            // For each binding we want to determine the kind of marker to insert
            // into the template source before it's parsed by the browser's HTML
            // parser. The marker type is based on whether the expression is in an
            // attribute, text, or comment position.
            //   * For node-position bindings we insert a comment with the marker
            //     sentinel as its text content, like <!--{{lit-guid}}-->.
            //   * For attribute bindings we insert just the marker sentinel for the
            //     first binding, so that we support unquoted attribute bindings.
            //     Subsequent bindings can use a comment marker because multi-binding
            //     attributes must be quoted.
            //   * For comment bindings we insert just the marker sentinel so we don't
            //     close the comment.
            //
            // The following code scans the template source, but is *not* an HTML
            // parser. We don't need to track the tree structure of the HTML, only
            // whether a binding is inside a comment, and if not, if it appears to be
            // the first binding in an attribute.
            const commentOpen = s.lastIndexOf('<!--');
            // We're in comment position if we have a comment open with no following
            // comment close. Because <-- can appear in an attribute value there can
            // be false positives.
            isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                s.indexOf('-->', commentOpen + 1) === -1;
            // Check to see if we have an attribute-like sequence preceding the
            // expression. This can match "name=value" like structures in text,
            // comments, and attribute values, so there can be false-positives.
            const attributeMatch = _template_js__WEBPACK_IMPORTED_MODULE_1__["lastAttributeNameRegex"].exec(s);
            if (attributeMatch === null) {
                // We're only in this branch if we don't have a attribute-like
                // preceding sequence. For comments, this guards against unusual
                // attribute values like <div foo="<!--${'bar'}">. Cases like
                // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                // below.
                html += s + (isCommentBinding ? commentMarker : _template_js__WEBPACK_IMPORTED_MODULE_1__["nodeMarker"]);
            }
            else {
                // For attributes we use just a marker sentinel, and also append a
                // $lit$ suffix to the name to opt-out of attribute-specific parsing
                // that IE and Edge do for style and certain SVG attributes.
                html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                    attributeMatch[2] + _template_js__WEBPACK_IMPORTED_MODULE_1__["boundAttributeSuffix"] + attributeMatch[3] +
                    _template_js__WEBPACK_IMPORTED_MODULE_1__["marker"];
            }
        }
        html += this.strings[l];
        return html;
    }
    getTemplateElement() {
        const template = document.createElement('template');
        template.innerHTML = this.getHTML();
        return template;
    }
}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */
class SVGTemplateResult extends TemplateResult {
    getHTML() {
        return `<svg>${super.getHTML()}</svg>`;
    }
    getTemplateElement() {
        const template = super.getTemplateElement();
        const content = template.content;
        const svgElement = content.firstChild;
        content.removeChild(svgElement);
        Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["reparentNodes"])(content, svgElement.firstChild);
        return template;
    }
}
//# sourceMappingURL=template-result.js.map

/***/ }),

/***/ "../../util/sugar/node_modules/lit-html/lib/template.js":
/*!****************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/lit-html/lib/template.js ***!
  \****************************************************************************************************************/
/*! exports provided: marker, nodeMarker, markerRegex, boundAttributeSuffix, Template, isTemplatePartActive, createMarker, lastAttributeNameRegex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "marker", function() { return marker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nodeMarker", function() { return nodeMarker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markerRegex", function() { return markerRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boundAttributeSuffix", function() { return boundAttributeSuffix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Template", function() { return Template; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTemplatePartActive", function() { return isTemplatePartActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMarker", function() { return createMarker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lastAttributeNameRegex", function() { return lastAttributeNameRegex; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */
const boundAttributeSuffix = '$lit$';
/**
 * An updatable Template that tracks the location of dynamic parts.
 */
class Template {
    constructor(result, element) {
        this.parts = [];
        this.element = element;
        const nodesToRemove = [];
        const stack = [];
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        // Keeps track of the last index associated with a part. We try to delete
        // unnecessary nodes, but we never want to associate two different parts
        // to the same index. They must have a constant node between.
        let lastPartIndex = 0;
        let index = -1;
        let partIndex = 0;
        const { strings, values: { length } } = result;
        while (partIndex < length) {
            const node = walker.nextNode();
            if (node === null) {
                // We've exhausted the content inside a nested template element.
                // Because we still have parts (the outer for-loop), we know:
                // - There is a template in the stack
                // - The walker will find a nextNode outside the template
                walker.currentNode = stack.pop();
                continue;
            }
            index++;
            if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                if (node.hasAttributes()) {
                    const attributes = node.attributes;
                    const { length } = attributes;
                    // Per
                    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                    // attributes are not guaranteed to be returned in document order.
                    // In particular, Edge/IE can return them out of order, so we cannot
                    // assume a correspondence between part index and attribute index.
                    let count = 0;
                    for (let i = 0; i < length; i++) {
                        if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                            count++;
                        }
                    }
                    while (count-- > 0) {
                        // Get the template literal section leading up to the first
                        // expression in this attribute
                        const stringForPart = strings[partIndex];
                        // Find the attribute name
                        const name = lastAttributeNameRegex.exec(stringForPart)[2];
                        // Find the corresponding attribute
                        // All bound attributes have had a suffix added in
                        // TemplateResult#getHTML to opt out of special attribute
                        // handling. To look up the attribute value we also need to add
                        // the suffix.
                        const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                        const attributeValue = node.getAttribute(attributeLookupName);
                        node.removeAttribute(attributeLookupName);
                        const statics = attributeValue.split(markerRegex);
                        this.parts.push({ type: 'attribute', index, name, strings: statics });
                        partIndex += statics.length - 1;
                    }
                }
                if (node.tagName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
            }
            else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                const data = node.data;
                if (data.indexOf(marker) >= 0) {
                    const parent = node.parentNode;
                    const strings = data.split(markerRegex);
                    const lastIndex = strings.length - 1;
                    // Generate a new text node for each literal section
                    // These nodes are also used as the markers for node parts
                    for (let i = 0; i < lastIndex; i++) {
                        let insert;
                        let s = strings[i];
                        if (s === '') {
                            insert = createMarker();
                        }
                        else {
                            const match = lastAttributeNameRegex.exec(s);
                            if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                s = s.slice(0, match.index) + match[1] +
                                    match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                            }
                            insert = document.createTextNode(s);
                        }
                        parent.insertBefore(insert, node);
                        this.parts.push({ type: 'node', index: ++index });
                    }
                    // If there's no text, we must insert a comment to mark our place.
                    // Else, we can trust it will stick around after cloning.
                    if (strings[lastIndex] === '') {
                        parent.insertBefore(createMarker(), node);
                        nodesToRemove.push(node);
                    }
                    else {
                        node.data = strings[lastIndex];
                    }
                    // We have a part for each match found
                    partIndex += lastIndex;
                }
            }
            else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                if (node.data === marker) {
                    const parent = node.parentNode;
                    // Add a new marker node to be the startNode of the Part if any of
                    // the following are true:
                    //  * We don't have a previousSibling
                    //  * The previousSibling is already the start of a previous part
                    if (node.previousSibling === null || index === lastPartIndex) {
                        index++;
                        parent.insertBefore(createMarker(), node);
                    }
                    lastPartIndex = index;
                    this.parts.push({ type: 'node', index });
                    // If we don't have a nextSibling, keep this node so we have an end.
                    // Else, we can remove it to save future costs.
                    if (node.nextSibling === null) {
                        node.data = '';
                    }
                    else {
                        nodesToRemove.push(node);
                        index--;
                    }
                    partIndex++;
                }
                else {
                    let i = -1;
                    while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        // TODO (justinfagnani): consider whether it's even worth it to
                        // make bindings in comments work
                        this.parts.push({ type: 'node', index: -1 });
                        partIndex++;
                    }
                }
            }
        }
        // Remove text binding nodes after the walk to not disturb the TreeWalker
        for (const n of nodesToRemove) {
            n.parentNode.removeChild(n);
        }
    }
}
const endsWith = (str, suffix) => {
    const index = str.length - suffix.length;
    return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const lastAttributeNameRegex = 
// eslint-disable-next-line no-control-regex
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
//# sourceMappingURL=template.js.map

/***/ }),

/***/ "../../util/sugar/node_modules/lit-html/lit-html.js":
/*!************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/lit-html/lit-html.js ***!
  \************************************************************************************************************/
/*! exports provided: DefaultTemplateProcessor, defaultTemplateProcessor, directive, isDirective, removeNodes, reparentNodes, noChange, nothing, AttributeCommitter, AttributePart, BooleanAttributePart, EventPart, isIterable, isPrimitive, NodePart, PropertyCommitter, PropertyPart, parts, render, templateCaches, templateFactory, TemplateInstance, SVGTemplateResult, TemplateResult, createMarker, isTemplatePartActive, Template, html, svg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "html", function() { return html; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svg", function() { return svg; });
/* harmony import */ var _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/default-template-processor.js */ "../../util/sugar/node_modules/lit-html/lib/default-template-processor.js");
/* harmony import */ var _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/template-result.js */ "../../util/sugar/node_modules/lit-html/lib/template-result.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultTemplateProcessor", function() { return _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["DefaultTemplateProcessor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultTemplateProcessor", function() { return _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["defaultTemplateProcessor"]; });

/* harmony import */ var _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/directive.js */ "../../util/sugar/node_modules/lit-html/lib/directive.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "directive", function() { return _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__["directive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDirective", function() { return _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__["isDirective"]; });

/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/dom.js */ "../../util/sugar/node_modules/lit-html/lib/dom.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeNodes", function() { return _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__["removeNodes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reparentNodes", function() { return _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__["reparentNodes"]; });

/* harmony import */ var _lib_part_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/part.js */ "../../util/sugar/node_modules/lit-html/lib/part.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "noChange", function() { return _lib_part_js__WEBPACK_IMPORTED_MODULE_4__["noChange"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nothing", function() { return _lib_part_js__WEBPACK_IMPORTED_MODULE_4__["nothing"]; });

/* harmony import */ var _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/parts.js */ "../../util/sugar/node_modules/lit-html/lib/parts.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AttributeCommitter", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["AttributeCommitter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AttributePart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["AttributePart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BooleanAttributePart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["BooleanAttributePart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventPart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["EventPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isIterable", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["isIterable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPrimitive", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["isPrimitive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NodePart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["NodePart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyCommitter", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["PropertyCommitter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["PropertyPart"]; });

/* harmony import */ var _lib_render_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/render.js */ "../../util/sugar/node_modules/lit-html/lib/render.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parts", function() { return _lib_render_js__WEBPACK_IMPORTED_MODULE_6__["parts"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _lib_render_js__WEBPACK_IMPORTED_MODULE_6__["render"]; });

/* harmony import */ var _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/template-factory.js */ "../../util/sugar/node_modules/lit-html/lib/template-factory.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "templateCaches", function() { return _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__["templateCaches"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "templateFactory", function() { return _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__["templateFactory"]; });

/* harmony import */ var _lib_template_instance_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/template-instance.js */ "../../util/sugar/node_modules/lit-html/lib/template-instance.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateInstance", function() { return _lib_template_instance_js__WEBPACK_IMPORTED_MODULE_8__["TemplateInstance"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SVGTemplateResult", function() { return _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["SVGTemplateResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateResult", function() { return _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["TemplateResult"]; });

/* harmony import */ var _lib_template_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/template.js */ "../../util/sugar/node_modules/lit-html/lib/template.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createMarker", function() { return _lib_template_js__WEBPACK_IMPORTED_MODULE_9__["createMarker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTemplatePartActive", function() { return _lib_template_js__WEBPACK_IMPORTED_MODULE_9__["isTemplatePartActive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Template", function() { return _lib_template_js__WEBPACK_IMPORTED_MODULE_9__["Template"]; });

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 *
 * Main lit-html module.
 *
 * Main exports:
 *
 * -  [[html]]
 * -  [[svg]]
 * -  [[render]]
 *
 * @module lit-html
 * @preferred
 */
/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */




// TODO(justinfagnani): remove line when we get NodePart moving methods








// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
if (typeof window !== 'undefined') {
    (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.2.1');
}
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const html = (strings, ...values) => new _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["TemplateResult"](strings, values, 'html', _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["defaultTemplateProcessor"]);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */
const svg = (strings, ...values) => new _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["SVGTemplateResult"](strings, values, 'svg', _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["defaultTemplateProcessor"]);
//# sourceMappingURL=lit-html.js.map

/***/ }),

/***/ "../../util/sugar/node_modules/node-libs-browser/node_modules/buffer/index.js":
/*!**************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/node-libs-browser/node_modules/buffer/index.js ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "../../util/sugar/node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "../../util/sugar/node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "../../util/sugar/node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "../../util/sugar/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../util/sugar/node_modules/nth-check/compile.js":
/*!************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/nth-check/compile.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = compile;

var BaseFuncs = __webpack_require__(/*! boolbase */ "../../util/sugar/node_modules/boolbase/index.js"),
    trueFunc  = BaseFuncs.trueFunc,
    falseFunc = BaseFuncs.falseFunc;

/*
	returns a function that checks if an elements index matches the given rule
	highly optimized to return the fastest solution
*/
function compile(parsed){
	var a = parsed[0],
	    b = parsed[1] - 1;

	//when b <= 0, a*n won't be possible for any matches when a < 0
	//besides, the specification says that no element is matched when a and b are 0
	if(b < 0 && a <= 0) return falseFunc;

	//when a is in the range -1..1, it matches any element (so only b is checked)
	if(a ===-1) return function(pos){ return pos <= b; };
	if(a === 0) return function(pos){ return pos === b; };
	//when b <= 0 and a === 1, they match any element
	if(a === 1) return b < 0 ? trueFunc : function(pos){ return pos >= b; };

	//when a > 0, modulo can be used to check if there is a match
	var bMod = b % a;
	if(bMod < 0) bMod += a;

	if(a > 1){
		return function(pos){
			return pos >= b && pos % a === bMod;
		};
	}

	a *= -1; //make `a` positive

	return function(pos){
		return pos <= b && pos % a === bMod;
	};
}

/***/ }),

/***/ "../../util/sugar/node_modules/nth-check/index.js":
/*!**********************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/nth-check/index.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ./parse.js */ "../../util/sugar/node_modules/nth-check/parse.js"),
    compile = __webpack_require__(/*! ./compile.js */ "../../util/sugar/node_modules/nth-check/compile.js");

module.exports = function nthCheck(formula){
	return compile(parse(formula));
};

module.exports.parse = parse;
module.exports.compile = compile;

/***/ }),

/***/ "../../util/sugar/node_modules/nth-check/parse.js":
/*!**********************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/nth-check/parse.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = parse;

//following http://www.w3.org/TR/css3-selectors/#nth-child-pseudo

//[ ['-'|'+']? INTEGER? {N} [ S* ['-'|'+'] S* INTEGER ]?
var re_nthElement = /^([+\-]?\d*n)?\s*(?:([+\-]?)\s*(\d+))?$/;

/*
	parses a nth-check formula, returns an array of two numbers
*/
function parse(formula){
	formula = formula.trim().toLowerCase();

	if(formula === "even"){
		return [2, 0];
	} else if(formula === "odd"){
		return [2, 1];
	} else {
		var parsed = formula.match(re_nthElement);

		if(!parsed){
			throw new SyntaxError("n-th rule couldn't be parsed ('" + formula + "')");
		}

		var a;

		if(parsed[1]){
			a = parseInt(parsed[1], 10);
			if(isNaN(a)){
				if(parsed[1].charAt(0) === "-") a = -1;
				else a = 1;
			}
		} else a = 0;

		return [
			a,
			parsed[3] ? parseInt((parsed[2] || "") + parsed[3], 10) : 0
		];
	}
}


/***/ }),

/***/ "../../util/sugar/node_modules/param-case/dist.es2015/index.js":
/*!***********************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/param-case/dist.es2015/index.js ***!
  \***********************************************************************************************************************/
/*! exports provided: paramCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "paramCase", function() { return paramCase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../util/sugar/node_modules/tslib/tslib.es6.js");
/* harmony import */ var dot_case__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dot-case */ "../../util/sugar/node_modules/param-case/node_modules/dot-case/dist.es2015/index.js");


function paramCase(input, options) {
    if (options === void 0) { options = {}; }
    return Object(dot_case__WEBPACK_IMPORTED_MODULE_1__["dotCase"])(input, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ delimiter: "-" }, options));
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../util/sugar/node_modules/param-case/node_modules/dot-case/dist.es2015/index.js":
/*!*********************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/param-case/node_modules/dot-case/dist.es2015/index.js ***!
  \*********************************************************************************************************************************************/
/*! exports provided: dotCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dotCase", function() { return dotCase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../util/sugar/node_modules/tslib/tslib.es6.js");
/* harmony import */ var no_case__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! no-case */ "../../util/sugar/node_modules/param-case/node_modules/no-case/dist.es2015/index.js");


function dotCase(input, options) {
    if (options === void 0) { options = {}; }
    return Object(no_case__WEBPACK_IMPORTED_MODULE_1__["noCase"])(input, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ delimiter: "." }, options));
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../util/sugar/node_modules/param-case/node_modules/lower-case/dist.es2015/index.js":
/*!***********************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/param-case/node_modules/lower-case/dist.es2015/index.js ***!
  \***********************************************************************************************************************************************/
/*! exports provided: localeLowerCase, lowerCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "localeLowerCase", function() { return localeLowerCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lowerCase", function() { return lowerCase; });
/**
 * Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
 */
var SUPPORTED_LOCALE = {
    tr: {
        regexp: /\u0130|\u0049|\u0049\u0307/g,
        map: {
            İ: "\u0069",
            I: "\u0131",
            İ: "\u0069"
        }
    },
    az: {
        regexp: /\u0130/g,
        map: {
            İ: "\u0069",
            I: "\u0131",
            İ: "\u0069"
        }
    },
    lt: {
        regexp: /\u0049|\u004A|\u012E|\u00CC|\u00CD|\u0128/g,
        map: {
            I: "\u0069\u0307",
            J: "\u006A\u0307",
            Į: "\u012F\u0307",
            Ì: "\u0069\u0307\u0300",
            Í: "\u0069\u0307\u0301",
            Ĩ: "\u0069\u0307\u0303"
        }
    }
};
/**
 * Localized lower case.
 */
function localeLowerCase(str, locale) {
    var lang = SUPPORTED_LOCALE[locale.toLowerCase()];
    if (lang)
        return lowerCase(str.replace(lang.regexp, function (m) { return lang.map[m]; }));
    return lowerCase(str);
}
/**
 * Lower case as a function.
 */
function lowerCase(str) {
    return str.toLowerCase();
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../util/sugar/node_modules/param-case/node_modules/no-case/dist.es2015/index.js":
/*!********************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/param-case/node_modules/no-case/dist.es2015/index.js ***!
  \********************************************************************************************************************************************/
/*! exports provided: noCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noCase", function() { return noCase; });
/* harmony import */ var lower_case__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lower-case */ "../../util/sugar/node_modules/param-case/node_modules/lower-case/dist.es2015/index.js");

// Support camel case ("camelCase" -> "camel Case" and "CAMELCase" -> "CAMEL Case").
var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
// Remove all non-word characters.
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
/**
 * Normalize the string into something other libraries can manipulate easier.
 */
function noCase(input, options) {
    if (options === void 0) { options = {}; }
    var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lower_case__WEBPACK_IMPORTED_MODULE_0__["lowerCase"] : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
    var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
    var start = 0;
    var end = result.length;
    // Trim the delimiter from around the output string.
    while (result.charAt(start) === "\0")
        start++;
    while (result.charAt(end - 1) === "\0")
        end--;
    // Transform each token independently.
    return result
        .slice(start, end)
        .split("\0")
        .map(transform)
        .join(delimiter);
}
/**
 * Replace `re` in the input string with the replacement value.
 */
function replace(input, re, value) {
    if (re instanceof RegExp)
        return input.replace(re, value);
    return re.reduce(function (input, re) { return input.replace(re, value); }, input);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../util/sugar/node_modules/path-browserify/index.js":
/*!****************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/path-browserify/index.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "../../util/sugar/node_modules/process/browser.js")))

/***/ }),

/***/ "../../util/sugar/node_modules/pretty-error/lib/ParsedError.js":
/*!***********************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/pretty-error/lib/ParsedError.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.8.0
var ParsedError, prop, sysPath, _fn, _i, _len, _ref;

sysPath = __webpack_require__(/*! path */ "../../util/sugar/node_modules/path-browserify/index.js");

module.exports = ParsedError = (function() {
  function ParsedError(error) {
    this.error = error;
    this._parse();
  }

  ParsedError.prototype._parse = function() {
    var m;
    this._trace = [];
    this._kind = 'Error';
    this._wrapper = '';
    if (this.error.wrapper != null) {
      this._wrapper = String(this.error.wrapper);
    }
    if (typeof this.error !== 'object') {
      this._message = String(this.error);
    } else {
      this._stack = this.error.stack;
      if (this.error.kind != null) {
        this._kind = String(this.error.kind);
      } else if (typeof this._stack === 'string') {
        if (m = this._stack.match(/^([a-zA-Z0-9\_\$]+):\ /)) {
          this._kind = m[1];
        }
      }
      if (typeof this._stack === 'string') {
        this._parseStack();
      } else {
        this._message = (this.error.message != null) && String(this.error.message) || '';
      }
    }
  };

  ParsedError.prototype._parseStack = function() {
    var line, message, messageLines, reachedTrace, _i, _len, _ref;
    messageLines = [];
    reachedTrace = false;
    _ref = this._stack.split('\n');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      line = _ref[_i];
      if (line.trim() === '') {
        continue;
      }
      if (reachedTrace) {
        this._trace.push(this._parseTraceItem(line));
      } else {
        if (line.match(/^\s*at\s.+/)) {
          reachedTrace = true;
          this._trace.push(this._parseTraceItem(line));
        } else {
          messageLines.push(line);
        }
      }
    }
    message = messageLines.join('\n');
    if (message.substr(0, this._kind.length) === this._kind) {
      message = message.substr(this._kind.length, message.length).replace(/^\:\s+/, '');
    }
    this._message = message;
  };

  ParsedError.prototype._parseTraceItem = function(text) {
    var addr, col, d, dir, file, jsCol, jsLine, line, m, original, packageName, packages, path, r, remaining, shortenedAddr, shortenedPath, what;
    text = text.trim();
    if (text === '') {
      return;
    }
    if (!text.match(/^at\ /)) {
      return text;
    }
    text = text.replace(/^at /, '');
    if (text === 'Error (<anonymous>)' || text === 'Error (<anonymous>:null:null)') {
      return;
    }
    original = text;
    what = null;
    addr = null;
    path = null;
    dir = null;
    file = null;
    line = null;
    col = null;
    jsLine = null;
    jsCol = null;
    shortenedPath = null;
    shortenedAddr = null;
    packageName = '[current]';
    if (m = text.match(/\(([^\)]+)\)$/)) {
      addr = m[1].trim();
    }
    if (addr != null) {
      what = text.substr(0, text.length - addr.length - 2);
      what = what.trim();
    }
    if (addr == null) {
      addr = text.trim();
    }
    addr = this._fixPath(addr);
    remaining = addr;
    if (m = remaining.match(/\,\ <js>:(\d+):(\d+)$/)) {
      jsLine = m[1];
      jsCol = m[2];
      remaining = remaining.substr(0, remaining.length - m[0].length);
    }
    if (m = remaining.match(/:(\d+):(\d+)$/)) {
      line = m[1];
      col = m[2];
      remaining = remaining.substr(0, remaining.length - m[0].length);
      path = remaining;
    }
    if (path != null) {
      file = sysPath.basename(path);
      dir = sysPath.dirname(path);
      if (dir === '.') {
        dir = '';
      }
      path = this._fixPath(path);
      file = this._fixPath(file);
      dir = this._fixPath(dir);
    }
    if (dir != null) {
      d = dir.replace(/[\\]{1,2}/g, '/');
      if (m = d.match(/node_modules\/([^\/]+)(?!.*node_modules.*)/)) {
        packageName = m[1];
      }
    }
    if (jsLine == null) {
      jsLine = line;
      jsCol = col;
    }
    if (path != null) {
      r = this._rectifyPath(path);
      shortenedPath = r.path;
      shortenedAddr = shortenedPath + addr.substr(path.length, addr.length);
      packages = r.packages;
    }
    return {
      original: original,
      what: what,
      addr: addr,
      path: path,
      dir: dir,
      file: file,
      line: parseInt(line),
      col: parseInt(col),
      jsLine: parseInt(jsLine),
      jsCol: parseInt(jsCol),
      packageName: packageName,
      shortenedPath: shortenedPath,
      shortenedAddr: shortenedAddr,
      packages: packages || []
    };
  };

  ParsedError.prototype._getMessage = function() {
    return this._message;
  };

  ParsedError.prototype._getKind = function() {
    return this._kind;
  };

  ParsedError.prototype._getWrapper = function() {
    return this._wrapper;
  };

  ParsedError.prototype._getStack = function() {
    return this._stack;
  };

  ParsedError.prototype._getArguments = function() {
    return this.error["arguments"];
  };

  ParsedError.prototype._getType = function() {
    return this.error.type;
  };

  ParsedError.prototype._getTrace = function() {
    return this._trace;
  };

  ParsedError.prototype._fixPath = function(path) {
    return path.replace(/[\\]{1,2}/g, '/');
  };

  ParsedError.prototype._rectifyPath = function(path, nameForCurrentPackage) {
    var m, packages, parts, remaining, rest;
    path = String(path);
    remaining = path;
    if (!(m = path.match(/^(.+?)\/node_modules\/(.+)$/))) {
      return {
        path: path,
        packages: []
      };
    }
    parts = [];
    packages = [];
    if (typeof nameForCurrentPackage === 'string') {
      parts.push("[" + nameForCurrentPackage + "]");
      packages.push("[" + nameForCurrentPackage + "]");
    } else {
      parts.push("[" + (m[1].match(/([^\/]+)$/)[1]) + "]");
      packages.push(m[1].match(/([^\/]+)$/)[1]);
    }
    rest = m[2];
    while (m = rest.match(/([^\/]+)\/node_modules\/(.+)$/)) {
      parts.push("[" + m[1] + "]");
      packages.push(m[1]);
      rest = m[2];
    }
    if (m = rest.match(/([^\/]+)\/(.+)$/)) {
      parts.push("[" + m[1] + "]");
      packages.push(m[1]);
      rest = m[2];
    }
    parts.push(rest);
    return {
      path: parts.join("/"),
      packages: packages
    };
  };

  return ParsedError;

})();

_ref = ['message', 'kind', 'arguments', 'type', 'stack', 'trace', 'wrapper'];
_fn = function() {
  var methodName;
  methodName = '_get' + prop[0].toUpperCase() + prop.substr(1, prop.length);
  return Object.defineProperty(ParsedError.prototype, prop, {
    get: function() {
      return this[methodName]();
    }
  });
};
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  prop = _ref[_i];
  _fn();
}


/***/ }),

/***/ "../../util/sugar/node_modules/pretty-error/lib/PrettyError.js":
/*!***********************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/pretty-error/lib/PrettyError.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.8.0
var ParsedError, PrettyError, RenderKid, array, defaultStyle, instance, nodePaths, object, prop, _fn, _i, _len, _ref, _ref1,
  __slice = [].slice,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_ref = __webpack_require__(/*! utila */ "../../util/sugar/node_modules/utila/lib/utila.js"), object = _ref.object, array = _ref.array;

defaultStyle = __webpack_require__(/*! ./defaultStyle */ "../../util/sugar/node_modules/pretty-error/lib/defaultStyle.js");

ParsedError = __webpack_require__(/*! ./ParsedError */ "../../util/sugar/node_modules/pretty-error/lib/ParsedError.js");

nodePaths = __webpack_require__(/*! ./nodePaths */ "../../util/sugar/node_modules/pretty-error/lib/nodePaths.js");

RenderKid = __webpack_require__(/*! renderkid */ "../../util/sugar/node_modules/renderkid/lib/RenderKid.js");

instance = null;

module.exports = PrettyError = (function() {
  var self;

  self = PrettyError;

  PrettyError._filters = {
    'module.exports': function(item) {
      if (item.what == null) {
        return;
      }
      item.what = item.what.replace(/\.module\.exports\./g, ' - ');
    }
  };

  PrettyError._getDefaultStyle = function() {
    return defaultStyle();
  };

  PrettyError.start = function() {
    if (instance == null) {
      instance = new self;
      instance.start();
    }
    return instance;
  };

  PrettyError.stop = function() {
    return instance != null ? instance.stop() : void 0;
  };

  function PrettyError() {
    this._useColors = true;
    this._maxItems = 50;
    this._packagesToSkip = [];
    this._pathsToSkip = [];
    this._skipCallbacks = [];
    this._filterCallbacks = [];
    this._parsedErrorFilters = [];
    this._aliases = [];
    this._renderer = new RenderKid;
    this._style = self._getDefaultStyle();
    this._renderer.style(this._style);
  }

  PrettyError.prototype.start = function() {
    var prepeare;
    this._oldPrepareStackTrace = Error.prepareStackTrace;
    prepeare = this._oldPrepareStackTrace || function(exc, frames) {
      var result;
      result = exc.toString();
      frames = frames.map(function(frame) {
        return "  at " + (frame.toString());
      });
      return result + "\n" + frames.join("\n");
    };
    Error.prepareStackTrace = (function(_this) {
      return function(exc, trace) {
        var stack;
        stack = prepeare.apply(null, arguments);
        return _this.render({
          stack: stack,
          message: exc.toString().replace(/^.*: /, '')
        }, false);
      };
    })(this);
    return this;
  };

  PrettyError.prototype.stop = function() {
    Error.prepareStackTrace = this._oldPrepareStackTrace;
    return this._oldPrepareStackTrace = null;
  };

  PrettyError.prototype.config = function(c) {
    var alias, path, _ref1;
    if (c.skipPackages != null) {
      if (c.skipPackages === false) {
        this.unskipAllPackages();
      } else {
        this.skipPackage.apply(this, c.skipPackages);
      }
    }
    if (c.skipPaths != null) {
      if (c.skipPaths === false) {
        this.unskipAllPaths();
      } else {
        this.skipPath.apply(this, c.skipPaths);
      }
    }
    if (c.skip != null) {
      if (c.skip === false) {
        this.unskipAll();
      } else {
        this.skip.apply(this, c.skip);
      }
    }
    if (c.maxItems != null) {
      this.setMaxItems(c.maxItems);
    }
    if (c.skipNodeFiles === true) {
      this.skipNodeFiles();
    } else if (c.skipNodeFiles === false) {
      this.unskipNodeFiles();
    }
    if (c.filters != null) {
      if (c.filters === false) {
        this.removeAllFilters();
      } else {
        this.filter.apply(this, c.filters);
      }
    }
    if (c.parsedErrorFilters != null) {
      if (c.parsedErrorFilters === false) {
        this.removeAllParsedErrorFilters();
      } else {
        this.filterParsedError.apply(this, c.parsedErrorFilters);
      }
    }
    if (c.aliases != null) {
      if (object.isBareObject(c.aliases)) {
        _ref1 = c.aliases;
        for (path in _ref1) {
          alias = _ref1[path];
          this.alias(path, alias);
        }
      } else if (c.aliases === false) {
        this.removeAllAliases();
      }
    }
    return this;
  };

  PrettyError.prototype.withoutColors = function() {
    this._useColors = false;
    return this;
  };

  PrettyError.prototype.withColors = function() {
    this._useColors = true;
    return this;
  };

  PrettyError.prototype.skipPackage = function() {
    var packages, pkg, _i, _len;
    packages = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    for (_i = 0, _len = packages.length; _i < _len; _i++) {
      pkg = packages[_i];
      this._packagesToSkip.push(String(pkg));
    }
    return this;
  };

  PrettyError.prototype.unskipPackage = function() {
    var packages, pkg, _i, _len;
    packages = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    for (_i = 0, _len = packages.length; _i < _len; _i++) {
      pkg = packages[_i];
      array.pluckOneItem(this._packagesToSkip, pkg);
    }
    return this;
  };

  PrettyError.prototype.unskipAllPackages = function() {
    this._packagesToSkip.length = 0;
    return this;
  };

  PrettyError.prototype.skipPath = function() {
    var path, paths, _i, _len;
    paths = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    for (_i = 0, _len = paths.length; _i < _len; _i++) {
      path = paths[_i];
      this._pathsToSkip.push(path);
    }
    return this;
  };

  PrettyError.prototype.unskipPath = function() {
    var path, paths, _i, _len;
    paths = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    for (_i = 0, _len = paths.length; _i < _len; _i++) {
      path = paths[_i];
      array.pluckOneItem(this._pathsToSkip, path);
    }
    return this;
  };

  PrettyError.prototype.unskipAllPaths = function() {
    this._pathsToSkip.length = 0;
    return this;
  };

  PrettyError.prototype.skip = function() {
    var callbacks, cb, _i, _len;
    callbacks = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
      cb = callbacks[_i];
      this._skipCallbacks.push(cb);
    }
    return this;
  };

  PrettyError.prototype.unskip = function() {
    var callbacks, cb, _i, _len;
    callbacks = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
      cb = callbacks[_i];
      array.pluckOneItem(this._skipCallbacks, cb);
    }
    return this;
  };

  PrettyError.prototype.unskipAll = function() {
    this._skipCallbacks.length = 0;
    return this;
  };

  PrettyError.prototype.skipNodeFiles = function() {
    return this.skipPath.apply(this, nodePaths);
  };

  PrettyError.prototype.unskipNodeFiles = function() {
    return this.unskipPath.apply(this, nodePaths);
  };

  PrettyError.prototype.filter = function() {
    var callbacks, cb, _i, _len;
    callbacks = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
      cb = callbacks[_i];
      this._filterCallbacks.push(cb);
    }
    return this;
  };

  PrettyError.prototype.removeFilter = function() {
    var callbacks, cb, _i, _len;
    callbacks = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
      cb = callbacks[_i];
      array.pluckOneItem(this._filterCallbacks, cb);
    }
    return this;
  };

  PrettyError.prototype.removeAllFilters = function() {
    this._filterCallbacks.length = 0;
    return this;
  };

  PrettyError.prototype.filterParsedError = function() {
    var callbacks, cb, _i, _len;
    callbacks = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
      cb = callbacks[_i];
      this._parsedErrorFilters.push(cb);
    }
    return this;
  };

  PrettyError.prototype.removeParsedErrorFilter = function() {
    var callbacks, cb, _i, _len;
    callbacks = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
      cb = callbacks[_i];
      array.pluckOneItem(this._parsedErrorFilters, cb);
    }
    return this;
  };

  PrettyError.prototype.removeAllParsedErrorFilters = function() {
    this._parsedErrorFilters.length = 0;
    return this;
  };

  PrettyError.prototype.setMaxItems = function(maxItems) {
    if (maxItems == null) {
      maxItems = 50;
    }
    if (maxItems === 0) {
      maxItems = 50;
    }
    this._maxItems = maxItems | 0;
    return this;
  };

  PrettyError.prototype.alias = function(stringOrRx, alias) {
    this._aliases.push({
      stringOrRx: stringOrRx,
      alias: alias
    });
    return this;
  };

  PrettyError.prototype.removeAlias = function(stringOrRx) {
    array.pluckByCallback(this._aliases, function(pair) {
      return pair.stringOrRx === stringOrRx;
    });
    return this;
  };

  PrettyError.prototype.removeAllAliases = function() {
    this._aliases.length = 0;
    return this;
  };

  PrettyError.prototype._getStyle = function() {
    return this._style;
  };

  PrettyError.prototype.appendStyle = function(toAppend) {
    object.appendOnto(this._style, toAppend);
    this._renderer.style(toAppend);
    return this;
  };

  PrettyError.prototype._getRenderer = function() {
    return this._renderer;
  };

  PrettyError.prototype.render = function(e, logIt, useColors) {
    var obj, rendered;
    if (logIt == null) {
      logIt = false;
    }
    if (useColors == null) {
      useColors = this._useColors;
    }
    obj = this.getObject(e);
    rendered = this._renderer.render(obj, useColors);
    if (logIt === true) {
      console.error(rendered);
    }
    return rendered;
  };

  PrettyError.prototype.getObject = function(e) {
    var count, header, i, item, obj, traceItems, _i, _len, _ref1;
    if (!(e instanceof ParsedError)) {
      e = new ParsedError(e);
    }
    this._applyParsedErrorFiltersOn(e);
    header = {
      title: (function() {
        var ret;
        ret = {};
        if (e.wrapper !== '') {
          ret.wrapper = "" + e.wrapper;
        }
        ret.kind = e.kind;
        return ret;
      })(),
      colon: ':',
      message: String(e.message).trim()
    };
    traceItems = [];
    count = -1;
    _ref1 = e.trace;
    for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
      item = _ref1[i];
      if (item == null) {
        continue;
      }
      if (this._skipOrFilter(item, i) === true) {
        continue;
      }
      count++;
      if (count > this._maxItems) {
        break;
      }
      if (typeof item === 'string') {
        traceItems.push({
          item: {
            custom: item
          }
        });
        continue;
      }
      traceItems.push((function() {
        var markupItem;
        markupItem = {
          item: {
            header: {
              pointer: (function() {
                if (item.file == null) {
                  return '';
                }
                return {
                  file: item.file,
                  colon: ':',
                  line: item.line
                };
              })()
            },
            footer: (function() {
              var foooter;
              foooter = {
                addr: item.shortenedAddr
              };
              if (item.extra != null) {
                foooter.extra = item.extra;
              }
              return foooter;
            })()
          }
        };
        if (typeof item.what === 'string' && item.what.trim().length > 0) {
          markupItem.item.header.what = item.what;
        }
        return markupItem;
      })());
    }
    obj = {
      'pretty-error': {
        header: header
      }
    };
    if (traceItems.length > 0) {
      obj['pretty-error'].trace = traceItems;
    }
    return obj;
  };

  PrettyError.prototype._skipOrFilter = function(item, itemNumber) {
    var cb, modName, pair, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
    if (typeof item === 'object') {
      if (_ref1 = item.modName, __indexOf.call(this._packagesToSkip, _ref1) >= 0) {
        return true;
      }
      if (_ref2 = item.path, __indexOf.call(this._pathsToSkip, _ref2) >= 0) {
        return true;
      }
      _ref3 = item.packages;
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        modName = _ref3[_i];
        if (__indexOf.call(this._packagesToSkip, modName) >= 0) {
          return true;
        }
      }
      if (typeof item.shortenedAddr === 'string') {
        _ref4 = this._aliases;
        for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
          pair = _ref4[_j];
          item.shortenedAddr = item.shortenedAddr.replace(pair.stringOrRx, pair.alias);
        }
      }
    }
    _ref5 = this._skipCallbacks;
    for (_k = 0, _len2 = _ref5.length; _k < _len2; _k++) {
      cb = _ref5[_k];
      if (cb(item, itemNumber) === true) {
        return true;
      }
    }
    _ref6 = this._filterCallbacks;
    for (_l = 0, _len3 = _ref6.length; _l < _len3; _l++) {
      cb = _ref6[_l];
      cb(item, itemNumber);
    }
    return false;
  };

  PrettyError.prototype._applyParsedErrorFiltersOn = function(error) {
    var cb, _i, _len, _ref1;
    _ref1 = this._parsedErrorFilters;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      cb = _ref1[_i];
      cb(error);
    }
  };

  return PrettyError;

})();

_ref1 = ['renderer', 'style'];
_fn = function() {
  var methodName;
  methodName = '_get' + prop[0].toUpperCase() + prop.substr(1, prop.length);
  return PrettyError.prototype.__defineGetter__(prop, function() {
    return this[methodName]();
  });
};
for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
  prop = _ref1[_i];
  _fn();
}


/***/ }),

/***/ "../../util/sugar/node_modules/pretty-error/lib/defaultStyle.js":
/*!************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/pretty-error/lib/defaultStyle.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.8.0
module.exports = function() {
  return {
    'pretty-error': {
      display: 'block',
      marginLeft: '2'
    },
    'pretty-error > header': {
      display: 'block'
    },
    'pretty-error > header > title > kind': {
      background: 'red',
      color: 'bright-white'
    },
    'pretty-error > header > title > wrapper': {
      marginRight: '1',
      color: 'grey'
    },
    'pretty-error > header > colon': {
      color: 'grey',
      marginRight: 1
    },
    'pretty-error > header > message': {
      color: 'bright-white'
    },
    'pretty-error > trace': {
      display: 'block',
      marginTop: 1
    },
    'pretty-error > trace > item': {
      display: 'block',
      marginBottom: 1,
      marginLeft: 2,
      bullet: '"<grey>-</grey>"'
    },
    'pretty-error > trace > item > header': {
      display: 'block'
    },
    'pretty-error > trace > item > header > pointer > file': {
      color: 'bright-yellow'
    },
    'pretty-error > trace > item > header > pointer > colon': {
      color: 'grey'
    },
    'pretty-error > trace > item > header > pointer > line': {
      color: 'bright-yellow',
      marginRight: 1
    },
    'pretty-error > trace > item > header > what': {
      color: 'white'
    },
    'pretty-error > trace > item > footer': {
      display: 'block'
    },
    'pretty-error > trace > item > footer > addr': {
      display: 'block',
      color: 'grey'
    },
    'pretty-error > trace > item > footer > extra': {
      display: 'block',
      color: 'grey'
    }
  };
};


/***/ }),

/***/ "../../util/sugar/node_modules/pretty-error/lib/nodePaths.js":
/*!*********************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/pretty-error/lib/nodePaths.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.8.0
module.exports = ['_debugger.js', '_http_agent.js', '_http_client.js', '_http_common.js', '_http_incoming.js', '_http_outgoing.js', '_http_server.js', '_linklist.js', '_stream_duplex.js', '_stream_passthrough.js', '_stream_readable.js', '_stream_transform.js', '_stream_writable.js', '_tls_legacy.js', '_tls_wrap.js', 'assert.js', 'buffer.js', 'child_process.js', 'cluster.js', 'console.js', 'constants.js', 'crypto.js', 'dgram.js', 'dns.js', 'domain.js', 'events.js', 'freelist.js', 'fs.js', 'http.js', 'https.js', 'module.js', 'net.js', 'os.js', 'path.js', 'punycode.js', 'querystring.js', 'readline.js', 'repl.js', 'smalloc.js', 'stream.js', 'string_decoder.js', 'sys.js', 'timers.js', 'tls.js', 'tty.js', 'url.js', 'util.js', 'vm.js', 'zlib.js', 'node.js'];


/***/ }),

/***/ "../../util/sugar/node_modules/process/browser.js":
/*!**********************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/process/browser.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/AnsiPainter.js":
/*!********************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/AnsiPainter.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var AnsiPainter, object, styles, tags, tools,
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

tools = __webpack_require__(/*! ./tools */ "../../util/sugar/node_modules/renderkid/lib/tools.js");

tags = __webpack_require__(/*! ./ansiPainter/tags */ "../../util/sugar/node_modules/renderkid/lib/ansiPainter/tags.js");

styles = __webpack_require__(/*! ./ansiPainter/styles */ "../../util/sugar/node_modules/renderkid/lib/ansiPainter/styles.js");

object = __webpack_require__(/*! utila */ "../../util/sugar/node_modules/utila/lib/utila.js").object;

module.exports = AnsiPainter = (function() {
  var self;

  function AnsiPainter() {}

  AnsiPainter.tags = tags;

  AnsiPainter.prototype.paint = function(s) {
    return this._replaceSpecialStrings(this._renderDom(this._parse(s)));
  };

  AnsiPainter.prototype._replaceSpecialStrings = function(str) {
    return str.replace(/&sp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
  };

  AnsiPainter.prototype._parse = function(string, injectFakeRoot) {
    if (injectFakeRoot == null) {
      injectFakeRoot = true;
    }
    if (injectFakeRoot) {
      string = '<none>' + string + '</none>';
    }
    return tools.toDom(string);
  };

  AnsiPainter.prototype._renderDom = function(dom) {
    var parentStyles;
    parentStyles = {
      bg: 'none',
      color: 'none'
    };
    return this._renderChildren(dom, parentStyles);
  };

  AnsiPainter.prototype._renderChildren = function(children, parentStyles) {
    var child, n, ret;
    ret = '';
    for (n in children) {
      if (!hasProp.call(children, n)) continue;
      child = children[n];
      ret += this._renderNode(child, parentStyles);
    }
    return ret;
  };

  AnsiPainter.prototype._renderNode = function(node, parentStyles) {
    if (node.type === 'text') {
      return this._renderTextNode(node, parentStyles);
    } else {
      return this._renderTag(node, parentStyles);
    }
  };

  AnsiPainter.prototype._renderTextNode = function(node, parentStyles) {
    return this._wrapInStyle(node.data, parentStyles);
  };

  AnsiPainter.prototype._wrapInStyle = function(str, style) {
    return styles.color(style.color) + styles.bg(style.bg) + str + styles.none();
  };

  AnsiPainter.prototype._renderTag = function(node, parentStyles) {
    var currentStyles, tagStyles;
    tagStyles = this._getStylesForTagName(node.name);
    currentStyles = this._mixStyles(parentStyles, tagStyles);
    return this._renderChildren(node.children, currentStyles);
  };

  AnsiPainter.prototype._mixStyles = function() {
    var final, i, key, len, style, styles, val;
    styles = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    final = {};
    for (i = 0, len = styles.length; i < len; i++) {
      style = styles[i];
      for (key in style) {
        if (!hasProp.call(style, key)) continue;
        val = style[key];
        if ((final[key] == null) || val !== 'inherit') {
          final[key] = val;
        }
      }
    }
    return final;
  };

  AnsiPainter.prototype._getStylesForTagName = function(name) {
    if (tags[name] == null) {
      throw Error("Unknown tag name `" + name + "`");
    }
    return tags[name];
  };

  self = AnsiPainter;

  AnsiPainter.getInstance = function() {
    if (self._instance == null) {
      self._instance = new self;
    }
    return self._instance;
  };

  AnsiPainter.paint = function(str) {
    return self.getInstance().paint(str);
  };

  AnsiPainter.strip = function(s) {
    return s.replace(/\x1b\[[0-9]+m/g, '');
  };

  return AnsiPainter;

})();


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/Layout.js":
/*!***************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/Layout.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var Block, Layout, SpecialString, fn, i, len, object, prop, ref, terminalWidth;

Block = __webpack_require__(/*! ./layout/Block */ "../../util/sugar/node_modules/renderkid/lib/layout/Block.js");

object = __webpack_require__(/*! utila */ "../../util/sugar/node_modules/utila/lib/utila.js").object;

SpecialString = __webpack_require__(/*! ./layout/SpecialString */ "../../util/sugar/node_modules/renderkid/lib/layout/SpecialString.js");

terminalWidth = __webpack_require__(/*! ./tools */ "../../util/sugar/node_modules/renderkid/lib/tools.js").getCols();

module.exports = Layout = (function() {
  var self;

  self = Layout;

  Layout._rootBlockDefaultConfig = {
    linePrependor: {
      options: {
        amount: 0
      }
    },
    lineAppendor: {
      options: {
        amount: 0
      }
    },
    blockPrependor: {
      options: {
        amount: 0
      }
    },
    blockAppendor: {
      options: {
        amount: 0
      }
    }
  };

  Layout._defaultConfig = {
    terminalWidth: terminalWidth
  };

  function Layout(config, rootBlockConfig) {
    var rootConfig;
    if (config == null) {
      config = {};
    }
    if (rootBlockConfig == null) {
      rootBlockConfig = {};
    }
    this._written = [];
    this._activeBlock = null;
    this._config = object.append(self._defaultConfig, config);
    rootConfig = object.append(self._rootBlockDefaultConfig, rootBlockConfig);
    this._root = new Block(this, null, rootConfig, '__root');
    this._root._open();
  }

  Layout.prototype.getRootBlock = function() {
    return this._root;
  };

  Layout.prototype._append = function(text) {
    return this._written.push(text);
  };

  Layout.prototype._appendLine = function(text) {
    var s;
    this._append(text);
    s = SpecialString(text);
    if (s.length < this._config.terminalWidth) {
      this._append('<none>\n</none>');
    }
    return this;
  };

  Layout.prototype.get = function() {
    this._ensureClosed();
    if (this._written[this._written.length - 1] === '<none>\n</none>') {
      this._written.pop();
    }
    return this._written.join("");
  };

  Layout.prototype._ensureClosed = function() {
    if (this._activeBlock !== this._root) {
      throw Error("Not all the blocks have been closed. Please call block.close() on all open blocks.");
    }
    if (this._root.isOpen()) {
      this._root.close();
    }
  };

  return Layout;

})();

ref = ['openBlock', 'write'];
fn = function() {
  var method;
  method = prop;
  return Layout.prototype[method] = function() {
    return this._root[method].apply(this._root, arguments);
  };
};
for (i = 0, len = ref.length; i < len; i++) {
  prop = ref[i];
  fn();
}


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/RenderKid.js":
/*!******************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/RenderKid.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var AnsiPainter, Layout, RenderKid, Styles, blockStyleApplier, inlineStyleApplier, object, stripAnsi, terminalWidth, tools;

inlineStyleApplier = __webpack_require__(/*! ./renderKid/styleApplier/inline */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styleApplier/inline.js");

blockStyleApplier = __webpack_require__(/*! ./renderKid/styleApplier/block */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styleApplier/block.js");

AnsiPainter = __webpack_require__(/*! ./AnsiPainter */ "../../util/sugar/node_modules/renderkid/lib/AnsiPainter.js");

Styles = __webpack_require__(/*! ./renderKid/Styles */ "../../util/sugar/node_modules/renderkid/lib/renderKid/Styles.js");

Layout = __webpack_require__(/*! ./Layout */ "../../util/sugar/node_modules/renderkid/lib/Layout.js");

tools = __webpack_require__(/*! ./tools */ "../../util/sugar/node_modules/renderkid/lib/tools.js");

object = __webpack_require__(/*! utila */ "../../util/sugar/node_modules/utila/lib/utila.js").object;

stripAnsi = __webpack_require__(/*! strip-ansi */ "../../util/sugar/node_modules/renderkid/node_modules/strip-ansi/index.js");

terminalWidth = __webpack_require__(/*! ./tools */ "../../util/sugar/node_modules/renderkid/lib/tools.js").getCols();

module.exports = RenderKid = (function() {
  var self;

  self = RenderKid;

  RenderKid.AnsiPainter = AnsiPainter;

  RenderKid.Layout = Layout;

  RenderKid.quote = tools.quote;

  RenderKid.tools = tools;

  RenderKid._defaultConfig = {
    layout: {
      terminalWidth: terminalWidth
    }
  };

  function RenderKid(config) {
    if (config == null) {
      config = {};
    }
    this.tools = self.tools;
    this._config = object.append(self._defaultConfig, config);
    this._initStyles();
  }

  RenderKid.prototype._initStyles = function() {
    return this._styles = new Styles;
  };

  RenderKid.prototype.style = function() {
    return this._styles.setRule.apply(this._styles, arguments);
  };

  RenderKid.prototype._getStyleFor = function(el) {
    return this._styles.getStyleFor(el);
  };

  RenderKid.prototype.render = function(input, withColors) {
    if (withColors == null) {
      withColors = true;
    }
    return this._paint(this._renderDom(this._toDom(input)), withColors);
  };

  RenderKid.prototype._toDom = function(input) {
    if (typeof input === 'string') {
      return this._parse(input);
    } else if (object.isBareObject(input) || Array.isArray(input)) {
      return this._objToDom(input);
    } else {
      throw Error("Invalid input type. Only strings, arrays and objects are accepted");
    }
  };

  RenderKid.prototype._objToDom = function(o, injectFakeRoot) {
    if (injectFakeRoot == null) {
      injectFakeRoot = true;
    }
    if (injectFakeRoot) {
      o = {
        body: o
      };
    }
    return tools.objectToDom(o);
  };

  RenderKid.prototype._paint = function(text, withColors) {
    var painted;
    painted = AnsiPainter.paint(text);
    if (withColors) {
      return painted;
    } else {
      return stripAnsi(painted);
    }
  };

  RenderKid.prototype._parse = function(string, injectFakeRoot) {
    if (injectFakeRoot == null) {
      injectFakeRoot = true;
    }
    if (injectFakeRoot) {
      string = '<body>' + string + '</body>';
    }
    return tools.stringToDom(string);
  };

  RenderKid.prototype._renderDom = function(dom) {
    var bodyTag, layout, rootBlock;
    bodyTag = dom[0];
    layout = new Layout(this._config.layout);
    rootBlock = layout.getRootBlock();
    this._renderBlockNode(bodyTag, null, rootBlock);
    return layout.get();
  };

  RenderKid.prototype._renderChildrenOf = function(parentNode, parentBlock) {
    var i, len, node, nodes;
    nodes = parentNode.children;
    for (i = 0, len = nodes.length; i < len; i++) {
      node = nodes[i];
      this._renderNode(node, parentNode, parentBlock);
    }
  };

  RenderKid.prototype._renderNode = function(node, parentNode, parentBlock) {
    if (node.type === 'text') {
      this._renderText(node, parentNode, parentBlock);
    } else if (node.name === 'br') {
      this._renderBr(node, parentNode, parentBlock);
    } else if (this._isBlock(node)) {
      this._renderBlockNode(node, parentNode, parentBlock);
    } else if (this._isNone(node)) {
      return;
    } else {
      this._renderInlineNode(node, parentNode, parentBlock);
    }
  };

  RenderKid.prototype._renderText = function(node, parentNode, parentBlock) {
    var ref, text;
    text = node.data;
    text = text.replace(/\s+/g, ' ');
    if ((parentNode != null ? (ref = parentNode.styles) != null ? ref.display : void 0 : void 0) !== 'inline') {
      text = text.trim();
    }
    if (text.length === 0) {
      return;
    }
    text = text.replace(/&nl;/g, "\n");
    return parentBlock.write(text);
  };

  RenderKid.prototype._renderBlockNode = function(node, parentNode, parentBlock) {
    var after, before, block, blockConfig, ref;
    ref = blockStyleApplier.applyTo(node, this._getStyleFor(node)), before = ref.before, after = ref.after, blockConfig = ref.blockConfig;
    block = parentBlock.openBlock(blockConfig);
    if (before !== '') {
      block.write(before);
    }
    this._renderChildrenOf(node, block);
    if (after !== '') {
      block.write(after);
    }
    return block.close();
  };

  RenderKid.prototype._renderInlineNode = function(node, parentNode, parentBlock) {
    var after, before, ref;
    ref = inlineStyleApplier.applyTo(node, this._getStyleFor(node)), before = ref.before, after = ref.after;
    if (before !== '') {
      parentBlock.write(before);
    }
    this._renderChildrenOf(node, parentBlock);
    if (after !== '') {
      return parentBlock.write(after);
    }
  };

  RenderKid.prototype._renderBr = function(node, parentNode, parentBlock) {
    return parentBlock.write("\n");
  };

  RenderKid.prototype._isBlock = function(node) {
    return !(node.type === 'text' || node.name === 'br' || this._getStyleFor(node).display !== 'block');
  };

  RenderKid.prototype._isNone = function(node) {
    return !(node.type === 'text' || node.name === 'br' || this._getStyleFor(node).display !== 'none');
  };

  return RenderKid;

})();


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/ansiPainter/styles.js":
/*!***************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/ansiPainter/styles.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.9.3
var codes, styles;

module.exports = styles = {};

styles.codes = codes = {
  'none': 0,
  'black': 30,
  'red': 31,
  'green': 32,
  'yellow': 33,
  'blue': 34,
  'magenta': 35,
  'cyan': 36,
  'white': 37,
  'grey': 90,
  'bright-red': 91,
  'bright-green': 92,
  'bright-yellow': 93,
  'bright-blue': 94,
  'bright-magenta': 95,
  'bright-cyan': 96,
  'bright-white': 97,
  'bg-black': 40,
  'bg-red': 41,
  'bg-green': 42,
  'bg-yellow': 43,
  'bg-blue': 44,
  'bg-magenta': 45,
  'bg-cyan': 46,
  'bg-white': 47,
  'bg-grey': 100,
  'bg-bright-red': 101,
  'bg-bright-green': 102,
  'bg-bright-yellow': 103,
  'bg-bright-blue': 104,
  'bg-bright-magenta': 105,
  'bg-bright-cyan': 106,
  'bg-bright-white': 107
};

styles.color = function(str) {
  var code;
  if (str === 'none') {
    return '';
  }
  code = codes[str];
  if (code == null) {
    throw Error("Unknown color `" + str + "`");
  }
  return "\x1b[" + code + "m";
};

styles.bg = function(str) {
  var code;
  if (str === 'none') {
    return '';
  }
  code = codes['bg-' + str];
  if (code == null) {
    throw Error("Unknown bg color `" + str + "`");
  }
  return "\x1B[" + code + "m";
};

styles.none = function(str) {
  return "\x1B[" + codes.none + "m";
};


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/ansiPainter/tags.js":
/*!*************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/ansiPainter/tags.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.9.3
var color, colors, i, len, tags;

module.exports = tags = {
  'none': {
    color: 'none',
    bg: 'none'
  },
  'bg-none': {
    color: 'inherit',
    bg: 'none'
  },
  'color-none': {
    color: 'none',
    bg: 'inherit'
  }
};

colors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'grey', 'bright-red', 'bright-green', 'bright-yellow', 'bright-blue', 'bright-magenta', 'bright-cyan', 'bright-white'];

for (i = 0, len = colors.length; i < len; i++) {
  color = colors[i];
  tags[color] = {
    color: color,
    bg: 'inherit'
  };
  tags["color-" + color] = {
    color: color,
    bg: 'inherit'
  };
  tags["bg-" + color] = {
    color: 'inherit',
    bg: color
  };
}


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/layout/Block.js":
/*!*********************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/layout/Block.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var Block, SpecialString, object, terminalWidth;

SpecialString = __webpack_require__(/*! ./SpecialString */ "../../util/sugar/node_modules/renderkid/lib/layout/SpecialString.js");

object = __webpack_require__(/*! utila */ "../../util/sugar/node_modules/utila/lib/utila.js").object;

terminalWidth = __webpack_require__(/*! ../tools */ "../../util/sugar/node_modules/renderkid/lib/tools.js").getCols();

module.exports = Block = (function() {
  var self;

  self = Block;

  Block.defaultConfig = {
    blockPrependor: {
      fn: __webpack_require__(/*! ./block/blockPrependor/Default */ "../../util/sugar/node_modules/renderkid/lib/layout/block/blockPrependor/Default.js"),
      options: {
        amount: 0
      }
    },
    blockAppendor: {
      fn: __webpack_require__(/*! ./block/blockAppendor/Default */ "../../util/sugar/node_modules/renderkid/lib/layout/block/blockAppendor/Default.js"),
      options: {
        amount: 0
      }
    },
    linePrependor: {
      fn: __webpack_require__(/*! ./block/linePrependor/Default */ "../../util/sugar/node_modules/renderkid/lib/layout/block/linePrependor/Default.js"),
      options: {
        amount: 0
      }
    },
    lineAppendor: {
      fn: __webpack_require__(/*! ./block/lineAppendor/Default */ "../../util/sugar/node_modules/renderkid/lib/layout/block/lineAppendor/Default.js"),
      options: {
        amount: 0
      }
    },
    lineWrapper: {
      fn: __webpack_require__(/*! ./block/lineWrapper/Default */ "../../util/sugar/node_modules/renderkid/lib/layout/block/lineWrapper/Default.js"),
      options: {
        lineWidth: null
      }
    },
    width: terminalWidth,
    prefixRaw: '',
    suffixRaw: ''
  };

  function Block(_layout, _parent, config, _name) {
    this._layout = _layout;
    this._parent = _parent;
    if (config == null) {
      config = {};
    }
    this._name = _name != null ? _name : '';
    this._config = object.append(self.defaultConfig, config);
    this._closed = false;
    this._wasOpenOnce = false;
    this._active = false;
    this._buffer = '';
    this._didSeparateBlock = false;
    this._linePrependor = new this._config.linePrependor.fn(this._config.linePrependor.options);
    this._lineAppendor = new this._config.lineAppendor.fn(this._config.lineAppendor.options);
    this._blockPrependor = new this._config.blockPrependor.fn(this._config.blockPrependor.options);
    this._blockAppendor = new this._config.blockAppendor.fn(this._config.blockAppendor.options);
  }

  Block.prototype._activate = function(deactivateParent) {
    if (deactivateParent == null) {
      deactivateParent = true;
    }
    if (this._active) {
      throw Error("This block is already active. This is probably a bug in RenderKid itself");
    }
    if (this._closed) {
      throw Error("This block is closed and cannot be activated. This is probably a bug in RenderKid itself");
    }
    this._active = true;
    this._layout._activeBlock = this;
    if (deactivateParent) {
      if (this._parent != null) {
        this._parent._deactivate(false);
      }
    }
    return this;
  };

  Block.prototype._deactivate = function(activateParent) {
    if (activateParent == null) {
      activateParent = true;
    }
    this._ensureActive();
    this._flushBuffer();
    if (activateParent) {
      if (this._parent != null) {
        this._parent._activate(false);
      }
    }
    this._active = false;
    return this;
  };

  Block.prototype._ensureActive = function() {
    if (!this._wasOpenOnce) {
      throw Error("This block has never been open before. This is probably a bug in RenderKid itself.");
    }
    if (!this._active) {
      throw Error("This block is not active. This is probably a bug in RenderKid itself.");
    }
    if (this._closed) {
      throw Error("This block is already closed. This is probably a bug in RenderKid itself.");
    }
  };

  Block.prototype._open = function() {
    if (this._wasOpenOnce) {
      throw Error("Block._open() has been called twice. This is probably a RenderKid bug.");
    }
    this._wasOpenOnce = true;
    if (this._parent != null) {
      this._parent.write(this._whatToPrependToBlock());
    }
    this._activate();
    return this;
  };

  Block.prototype.close = function() {
    this._deactivate();
    this._closed = true;
    if (this._parent != null) {
      this._parent.write(this._whatToAppendToBlock());
    }
    return this;
  };

  Block.prototype.isOpen = function() {
    return this._wasOpenOnce && !this._closed;
  };

  Block.prototype.write = function(str) {
    this._ensureActive();
    if (str === '') {
      return;
    }
    str = String(str);
    this._buffer += str;
    return this;
  };

  Block.prototype.openBlock = function(config, name) {
    var block;
    this._ensureActive();
    block = new Block(this._layout, this, config, name);
    block._open();
    return block;
  };

  Block.prototype._flushBuffer = function() {
    var str;
    if (this._buffer === '') {
      return;
    }
    str = this._buffer;
    this._buffer = '';
    this._writeInline(str);
  };

  Block.prototype._toPrependToLine = function() {
    var fromParent;
    fromParent = '';
    if (this._parent != null) {
      fromParent = this._parent._toPrependToLine();
    }
    return this._linePrependor.render(fromParent);
  };

  Block.prototype._toAppendToLine = function() {
    var fromParent;
    fromParent = '';
    if (this._parent != null) {
      fromParent = this._parent._toAppendToLine();
    }
    return this._lineAppendor.render(fromParent);
  };

  Block.prototype._whatToPrependToBlock = function() {
    return this._blockPrependor.render();
  };

  Block.prototype._whatToAppendToBlock = function() {
    return this._blockAppendor.render();
  };

  Block.prototype._writeInline = function(str) {
    var i, j, k, l, lineBreaksToAppend, m, ref, ref1, ref2, remaining;
    if (SpecialString(str).isOnlySpecialChars()) {
      this._layout._append(str);
      return;
    }
    remaining = str;
    lineBreaksToAppend = 0;
    if (m = remaining.match(/^\n+/)) {
      for (i = j = 1, ref = m[0].length; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
        this._writeLine('');
      }
      remaining = remaining.substr(m[0].length, remaining.length);
    }
    if (m = remaining.match(/\n+$/)) {
      lineBreaksToAppend = m[0].length;
      remaining = remaining.substr(0, remaining.length - m[0].length);
    }
    while (remaining.length > 0) {
      if (m = remaining.match(/^[^\n]+/)) {
        this._writeLine(m[0]);
        remaining = remaining.substr(m[0].length, remaining.length);
      } else if (m = remaining.match(/^\n+/)) {
        for (i = k = 1, ref1 = m[0].length; 1 <= ref1 ? k < ref1 : k > ref1; i = 1 <= ref1 ? ++k : --k) {
          this._writeLine('');
        }
        remaining = remaining.substr(m[0].length, remaining.length);
      }
    }
    if (lineBreaksToAppend > 0) {
      for (i = l = 1, ref2 = lineBreaksToAppend; 1 <= ref2 ? l <= ref2 : l >= ref2; i = 1 <= ref2 ? ++l : --l) {
        this._writeLine('');
      }
    }
  };

  Block.prototype._writeLine = function(str) {
    var line, lineContent, lineContentLength, remaining, roomLeft, toAppend, toAppendLength, toPrepend, toPrependLength;
    remaining = SpecialString(str);
    while (true) {
      toPrepend = this._toPrependToLine();
      toPrependLength = SpecialString(toPrepend).length;
      toAppend = this._toAppendToLine();
      toAppendLength = SpecialString(toAppend).length;
      roomLeft = this._layout._config.terminalWidth - (toPrependLength + toAppendLength);
      lineContentLength = Math.min(this._config.width, roomLeft);
      lineContent = remaining.cut(0, lineContentLength, true);
      line = toPrepend + lineContent.str + toAppend;
      this._layout._appendLine(line);
      if (remaining.isEmpty()) {
        break;
      }
    }
  };

  return Block;

})();


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/layout/SpecialString.js":
/*!*****************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/layout/SpecialString.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.9.3
var SpecialString, fn, i, len, prop, ref;

module.exports = SpecialString = (function() {
  var self;

  self = SpecialString;

  SpecialString._tabRx = /^\t/;

  SpecialString._tagRx = /^<[^>]+>/;

  SpecialString._quotedHtmlRx = /^&(gt|lt|quot|amp|apos|sp);/;

  function SpecialString(str) {
    if (!(this instanceof self)) {
      return new self(str);
    }
    this._str = String(str);
    this._len = 0;
  }

  SpecialString.prototype._getStr = function() {
    return this._str;
  };

  SpecialString.prototype.set = function(str) {
    this._str = String(str);
    return this;
  };

  SpecialString.prototype.clone = function() {
    return new SpecialString(this._str);
  };

  SpecialString.prototype.isEmpty = function() {
    return this._str === '';
  };

  SpecialString.prototype.isOnlySpecialChars = function() {
    return !this.isEmpty() && this.length === 0;
  };

  SpecialString.prototype._reset = function() {
    return this._len = 0;
  };

  SpecialString.prototype.splitIn = function(limit, trimLeftEachLine) {
    var buffer, bufferLength, justSkippedSkipChar, lines;
    if (trimLeftEachLine == null) {
      trimLeftEachLine = false;
    }
    buffer = '';
    bufferLength = 0;
    lines = [];
    justSkippedSkipChar = false;
    self._countChars(this._str, function(char, charLength) {
      if (bufferLength > limit || bufferLength + charLength > limit) {
        lines.push(buffer);
        buffer = '';
        bufferLength = 0;
      }
      if (bufferLength === 0 && char === ' ' && !justSkippedSkipChar && trimLeftEachLine) {
        return justSkippedSkipChar = true;
      } else {
        buffer += char;
        bufferLength += charLength;
        return justSkippedSkipChar = false;
      }
    });
    if (buffer.length > 0) {
      lines.push(buffer);
    }
    return lines;
  };

  SpecialString.prototype.trim = function() {
    return new SpecialString(this.str.trim());
  };

  SpecialString.prototype.trimLeft = function() {
    return new SpecialString(this.str.replace(/^\s+/, ''));
  };

  SpecialString.prototype.trimRight = function() {
    return new SpecialString(this.str.replace(/\s+$/, ''));
  };

  SpecialString.prototype._getLength = function() {
    var sum;
    sum = 0;
    self._countChars(this._str, function(char, charLength) {
      sum += charLength;
    });
    return sum;
  };

  SpecialString.prototype.cut = function(from, to, trimLeft) {
    var after, before, cur, cut;
    if (trimLeft == null) {
      trimLeft = false;
    }
    if (to == null) {
      to = this.length;
    }
    from = parseInt(from);
    if (from >= to) {
      throw Error("`from` shouldn't be larger than `to`");
    }
    before = '';
    after = '';
    cut = '';
    cur = 0;
    self._countChars(this._str, (function(_this) {
      return function(char, charLength) {
        if (_this.str === 'ab<tag>') {
          console.log(charLength, char);
        }
        if (cur === from && char.match(/^\s+$/) && trimLeft) {
          return;
        }
        if (cur < from) {
          before += char;
        } else if (cur < to || cur + charLength <= to) {
          cut += char;
        } else {
          after += char;
        }
        cur += charLength;
      };
    })(this));
    this._str = before + after;
    this._reset();
    return SpecialString(cut);
  };

  SpecialString._countChars = function(text, cb) {
    var char, charLength, m;
    while (text.length !== 0) {
      if (m = text.match(self._tagRx)) {
        char = m[0];
        charLength = 0;
        text = text.substr(char.length, text.length);
      } else if (m = text.match(self._quotedHtmlRx)) {
        char = m[0];
        charLength = 1;
        text = text.substr(char.length, text.length);
      } else if (text.match(self._tabRx)) {
        char = "\t";
        charLength = 8;
        text = text.substr(1, text.length);
      } else {
        char = text[0];
        charLength = 1;
        text = text.substr(1, text.length);
      }
      cb.call(null, char, charLength);
    }
  };

  return SpecialString;

})();

ref = ['str', 'length'];
fn = function() {
  var methodName;
  methodName = '_get' + prop[0].toUpperCase() + prop.substr(1, prop.length);
  return SpecialString.prototype.__defineGetter__(prop, function() {
    return this[methodName]();
  });
};
for (i = 0, len = ref.length; i < len; i++) {
  prop = ref[i];
  fn();
}


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/layout/block/blockAppendor/Default.js":
/*!*******************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/layout/block/blockAppendor/Default.js ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var DefaultBlockAppendor, tools,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

tools = __webpack_require__(/*! ../../../tools */ "../../util/sugar/node_modules/renderkid/lib/tools.js");

module.exports = DefaultBlockAppendor = (function(superClass) {
  extend(DefaultBlockAppendor, superClass);

  function DefaultBlockAppendor() {
    return DefaultBlockAppendor.__super__.constructor.apply(this, arguments);
  }

  DefaultBlockAppendor.prototype._render = function(options) {
    return tools.repeatString("\n", this._config.amount);
  };

  return DefaultBlockAppendor;

})(__webpack_require__(/*! ./_BlockAppendor */ "../../util/sugar/node_modules/renderkid/lib/layout/block/blockAppendor/_BlockAppendor.js"));


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/layout/block/blockAppendor/_BlockAppendor.js":
/*!**************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/layout/block/blockAppendor/_BlockAppendor.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.9.3
var _BlockAppendor;

module.exports = _BlockAppendor = (function() {
  function _BlockAppendor(_config) {
    this._config = _config;
  }

  _BlockAppendor.prototype.render = function(options) {
    return this._render(options);
  };

  return _BlockAppendor;

})();


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/layout/block/blockPrependor/Default.js":
/*!********************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/layout/block/blockPrependor/Default.js ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var DefaultBlockPrependor, tools,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

tools = __webpack_require__(/*! ../../../tools */ "../../util/sugar/node_modules/renderkid/lib/tools.js");

module.exports = DefaultBlockPrependor = (function(superClass) {
  extend(DefaultBlockPrependor, superClass);

  function DefaultBlockPrependor() {
    return DefaultBlockPrependor.__super__.constructor.apply(this, arguments);
  }

  DefaultBlockPrependor.prototype._render = function(options) {
    return tools.repeatString("\n", this._config.amount);
  };

  return DefaultBlockPrependor;

})(__webpack_require__(/*! ./_BlockPrependor */ "../../util/sugar/node_modules/renderkid/lib/layout/block/blockPrependor/_BlockPrependor.js"));


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/layout/block/blockPrependor/_BlockPrependor.js":
/*!****************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/layout/block/blockPrependor/_BlockPrependor.js ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.9.3
var _BlockPrependor;

module.exports = _BlockPrependor = (function() {
  function _BlockPrependor(_config) {
    this._config = _config;
  }

  _BlockPrependor.prototype.render = function(options) {
    return this._render(options);
  };

  return _BlockPrependor;

})();


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/layout/block/lineAppendor/Default.js":
/*!******************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/layout/block/lineAppendor/Default.js ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var DefaultLineAppendor, tools,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

tools = __webpack_require__(/*! ../../../tools */ "../../util/sugar/node_modules/renderkid/lib/tools.js");

module.exports = DefaultLineAppendor = (function(superClass) {
  extend(DefaultLineAppendor, superClass);

  function DefaultLineAppendor() {
    return DefaultLineAppendor.__super__.constructor.apply(this, arguments);
  }

  DefaultLineAppendor.prototype._render = function(inherited, options) {
    return inherited + tools.repeatString(" ", this._config.amount);
  };

  return DefaultLineAppendor;

})(__webpack_require__(/*! ./_LineAppendor */ "../../util/sugar/node_modules/renderkid/lib/layout/block/lineAppendor/_LineAppendor.js"));


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/layout/block/lineAppendor/_LineAppendor.js":
/*!************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/layout/block/lineAppendor/_LineAppendor.js ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.9.3
var _LineAppendor;

module.exports = _LineAppendor = (function() {
  function _LineAppendor(_config) {
    this._config = _config;
    this._lineNo = 0;
  }

  _LineAppendor.prototype.render = function(inherited, options) {
    this._lineNo++;
    return '<none>' + this._render(inherited, options) + '</none>';
  };

  return _LineAppendor;

})();


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/layout/block/linePrependor/Default.js":
/*!*******************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/layout/block/linePrependor/Default.js ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var DefaultLinePrependor, SpecialString, tools,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

tools = __webpack_require__(/*! ../../../tools */ "../../util/sugar/node_modules/renderkid/lib/tools.js");

SpecialString = __webpack_require__(/*! ../../SpecialString */ "../../util/sugar/node_modules/renderkid/lib/layout/SpecialString.js");

module.exports = DefaultLinePrependor = (function(superClass) {
  var self;

  extend(DefaultLinePrependor, superClass);

  function DefaultLinePrependor() {
    return DefaultLinePrependor.__super__.constructor.apply(this, arguments);
  }

  self = DefaultLinePrependor;

  DefaultLinePrependor.pad = function(howMuch) {
    return tools.repeatString(" ", howMuch);
  };

  DefaultLinePrependor.prototype._render = function(inherited, options) {
    var addToLeft, addToRight, alignment, bullet, char, charLen, diff, left, output, space, toWrite;
    if (this._lineNo === 0 && (bullet = this._config.bullet)) {
      char = bullet.char;
      charLen = SpecialString(char).length;
      alignment = bullet.alignment;
      space = this._config.amount;
      toWrite = char;
      addToLeft = '';
      addToRight = '';
      if (space > charLen) {
        diff = space - charLen;
        if (alignment === 'right') {
          addToLeft = self.pad(diff);
        } else if (alignment === 'left') {
          addToRight = self.pad(diff);
        } else if (alignment === 'center') {
          left = Math.round(diff / 2);
          addToLeft = self.pad(left);
          addToRight = self.pad(diff - left);
        } else {
          throw Error("Unknown alignment `" + alignment + "`");
        }
      }
      output = addToLeft + char + addToRight;
    } else {
      output = self.pad(this._config.amount);
    }
    return inherited + output;
  };

  return DefaultLinePrependor;

})(__webpack_require__(/*! ./_LinePrependor */ "../../util/sugar/node_modules/renderkid/lib/layout/block/linePrependor/_LinePrependor.js"));


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/layout/block/linePrependor/_LinePrependor.js":
/*!**************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/layout/block/linePrependor/_LinePrependor.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.9.3
var _LinePrependor;

module.exports = _LinePrependor = (function() {
  function _LinePrependor(_config) {
    this._config = _config;
    this._lineNo = -1;
  }

  _LinePrependor.prototype.render = function(inherited, options) {
    this._lineNo++;
    return '<none>' + this._render(inherited, options) + '</none>';
  };

  return _LinePrependor;

})();


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/layout/block/lineWrapper/Default.js":
/*!*****************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/layout/block/lineWrapper/Default.js ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var DefaultLineWrapper,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = DefaultLineWrapper = (function(superClass) {
  extend(DefaultLineWrapper, superClass);

  function DefaultLineWrapper() {
    return DefaultLineWrapper.__super__.constructor.apply(this, arguments);
  }

  DefaultLineWrapper.prototype._render = function() {};

  return DefaultLineWrapper;

})(__webpack_require__(/*! ./_LineWrapper */ "../../util/sugar/node_modules/renderkid/lib/layout/block/lineWrapper/_LineWrapper.js"));


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/layout/block/lineWrapper/_LineWrapper.js":
/*!**********************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/layout/block/lineWrapper/_LineWrapper.js ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.9.3
var _LineWrapper;

module.exports = _LineWrapper = (function() {
  function _LineWrapper() {}

  _LineWrapper.prototype.render = function(str, options) {
    return this._render(str, options);
  };

  return _LineWrapper;

})();


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/Styles.js":
/*!*************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/Styles.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var MixedDeclarationSet, StyleSheet, Styles, terminalWidth;

StyleSheet = __webpack_require__(/*! ./styles/StyleSheet */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/StyleSheet.js");

MixedDeclarationSet = __webpack_require__(/*! ./styles/rule/MixedDeclarationSet */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/MixedDeclarationSet.js");

terminalWidth = __webpack_require__(/*! ../tools */ "../../util/sugar/node_modules/renderkid/lib/tools.js").getCols();

module.exports = Styles = (function() {
  var self;

  self = Styles;

  Styles.defaultRules = {
    '*': {
      display: 'inline'
    },
    'body': {
      background: 'none',
      color: 'white',
      display: 'block',
      width: terminalWidth + ' !important'
    }
  };

  function Styles() {
    this._defaultStyles = new StyleSheet;
    this._userStyles = new StyleSheet;
    this._setDefaultStyles();
  }

  Styles.prototype._setDefaultStyles = function() {
    this._defaultStyles.setRule(self.defaultRules);
  };

  Styles.prototype.setRule = function(selector, rules) {
    this._userStyles.setRule.apply(this._userStyles, arguments);
    return this;
  };

  Styles.prototype.getStyleFor = function(el) {
    var styles;
    styles = el.styles;
    if (styles == null) {
      el.styles = styles = this._getComputedStyleFor(el);
    }
    return styles;
  };

  Styles.prototype._getRawStyleFor = function(el) {
    var def, user;
    def = this._defaultStyles.getRulesFor(el);
    user = this._userStyles.getRulesFor(el);
    return MixedDeclarationSet.mix(def, user).toObject();
  };

  Styles.prototype._getComputedStyleFor = function(el) {
    var decs, parent, prop, ref, val;
    decs = {};
    parent = el.parent;
    ref = this._getRawStyleFor(el);
    for (prop in ref) {
      val = ref[prop];
      if (val !== 'inherit') {
        decs[prop] = val;
      } else {
        throw Error("Inherited styles are not supported yet.");
      }
    }
    return decs;
  };

  return Styles;

})();


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styleApplier/_common.js":
/*!***************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styleApplier/_common.js ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var AnsiPainter, _common;

AnsiPainter = __webpack_require__(/*! ../../AnsiPainter */ "../../util/sugar/node_modules/renderkid/lib/AnsiPainter.js");

module.exports = _common = {
  getStyleTagsFor: function(style) {
    var i, len, ret, tag, tagName, tagsToAdd;
    tagsToAdd = [];
    if (style.color != null) {
      tagName = 'color-' + style.color;
      if (AnsiPainter.tags[tagName] == null) {
        throw Error("Unknown color `" + style.color + "`");
      }
      tagsToAdd.push(tagName);
    }
    if (style.background != null) {
      tagName = 'bg-' + style.background;
      if (AnsiPainter.tags[tagName] == null) {
        throw Error("Unknown background `" + style.background + "`");
      }
      tagsToAdd.push(tagName);
    }
    ret = {
      before: '',
      after: ''
    };
    for (i = 0, len = tagsToAdd.length; i < len; i++) {
      tag = tagsToAdd[i];
      ret.before = ("<" + tag + ">") + ret.before;
      ret.after = ret.after + ("</" + tag + ">");
    }
    return ret;
  }
};


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styleApplier/block.js":
/*!*************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styleApplier/block.js ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var _common, blockStyleApplier, object, self;

_common = __webpack_require__(/*! ./_common */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styleApplier/_common.js");

object = __webpack_require__(/*! utila */ "../../util/sugar/node_modules/utila/lib/utila.js").object;

module.exports = blockStyleApplier = self = {
  applyTo: function(el, style) {
    var config, ret;
    ret = _common.getStyleTagsFor(style);
    ret.blockConfig = config = {};
    this._margins(style, config);
    this._bullet(style, config);
    this._dims(style, config);
    return ret;
  },
  _margins: function(style, config) {
    if (style.marginLeft != null) {
      object.appendOnto(config, {
        linePrependor: {
          options: {
            amount: parseInt(style.marginLeft)
          }
        }
      });
    }
    if (style.marginRight != null) {
      object.appendOnto(config, {
        lineAppendor: {
          options: {
            amount: parseInt(style.marginRight)
          }
        }
      });
    }
    if (style.marginTop != null) {
      object.appendOnto(config, {
        blockPrependor: {
          options: {
            amount: parseInt(style.marginTop)
          }
        }
      });
    }
    if (style.marginBottom != null) {
      object.appendOnto(config, {
        blockAppendor: {
          options: {
            amount: parseInt(style.marginBottom)
          }
        }
      });
    }
  },
  _bullet: function(style, config) {
    var after, before, bullet, conf, ref;
    if ((style.bullet != null) && style.bullet.enabled) {
      bullet = style.bullet;
      conf = {};
      conf.alignment = style.bullet.alignment;
      ref = _common.getStyleTagsFor({
        color: bullet.color,
        background: bullet.background
      }), before = ref.before, after = ref.after;
      conf.char = before + bullet.char + after;
      object.appendOnto(config, {
        linePrependor: {
          options: {
            bullet: conf
          }
        }
      });
    }
  },
  _dims: function(style, config) {
    var w;
    if (style.width != null) {
      w = parseInt(style.width);
      config.width = w;
    }
  }
};


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styleApplier/inline.js":
/*!**************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styleApplier/inline.js ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var _common, inlineStyleApplier, self, tools;

tools = __webpack_require__(/*! ../../tools */ "../../util/sugar/node_modules/renderkid/lib/tools.js");

_common = __webpack_require__(/*! ./_common */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styleApplier/_common.js");

module.exports = inlineStyleApplier = self = {
  applyTo: function(el, style) {
    var ret;
    ret = _common.getStyleTagsFor(style);
    if (style.marginLeft != null) {
      ret.before = (tools.repeatString("&sp;", parseInt(style.marginLeft))) + ret.before;
    }
    if (style.marginRight != null) {
      ret.after += tools.repeatString("&sp;", parseInt(style.marginRight));
    }
    if (style.paddingLeft != null) {
      ret.before += tools.repeatString("&sp;", parseInt(style.paddingLeft));
    }
    if (style.paddingRight != null) {
      ret.after = (tools.repeatString("&sp;", parseInt(style.paddingRight))) + ret.after;
    }
    return ret;
  }
};


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/Rule.js":
/*!******************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/Rule.js ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var DeclarationBlock, Rule, Selector;

Selector = __webpack_require__(/*! ./rule/Selector */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/Selector.js");

DeclarationBlock = __webpack_require__(/*! ./rule/DeclarationBlock */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/DeclarationBlock.js");

module.exports = Rule = (function() {
  function Rule(selector) {
    this.selector = new Selector(selector);
    this.styles = new DeclarationBlock;
  }

  Rule.prototype.setStyles = function(styles) {
    this.styles.set(styles);
    return this;
  };

  return Rule;

})();


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/StyleSheet.js":
/*!************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/StyleSheet.js ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var Rule, StyleSheet;

Rule = __webpack_require__(/*! ./Rule */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/Rule.js");

module.exports = StyleSheet = (function() {
  var self;

  self = StyleSheet;

  function StyleSheet() {
    this._rulesBySelector = {};
  }

  StyleSheet.prototype.setRule = function(selector, styles) {
    var key, val;
    if (typeof selector === 'string') {
      this._setRule(selector, styles);
    } else if (typeof selector === 'object') {
      for (key in selector) {
        val = selector[key];
        this._setRule(key, val);
      }
    }
    return this;
  };

  StyleSheet.prototype._setRule = function(s, styles) {
    var i, len, ref, selector;
    ref = self.splitSelectors(s);
    for (i = 0, len = ref.length; i < len; i++) {
      selector = ref[i];
      this._setSingleRule(selector, styles);
    }
    return this;
  };

  StyleSheet.prototype._setSingleRule = function(s, styles) {
    var rule, selector;
    selector = self.normalizeSelector(s);
    if (!(rule = this._rulesBySelector[selector])) {
      rule = new Rule(selector);
      this._rulesBySelector[selector] = rule;
    }
    rule.setStyles(styles);
    return this;
  };

  StyleSheet.prototype.getRulesFor = function(el) {
    var ref, rule, rules, selector;
    rules = [];
    ref = this._rulesBySelector;
    for (selector in ref) {
      rule = ref[selector];
      if (rule.selector.matches(el)) {
        rules.push(rule);
      }
    }
    return rules;
  };

  StyleSheet.normalizeSelector = function(selector) {
    return selector.replace(/[\s]+/g, ' ').replace(/[\s]*([>\,\+]{1})[\s]*/g, '$1').trim();
  };

  StyleSheet.splitSelectors = function(s) {
    return s.trim().split(',');
  };

  return StyleSheet;

})();


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/DeclarationBlock.js":
/*!***********************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/DeclarationBlock.js ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var Arbitrary, DeclarationBlock, declarationClasses;

module.exports = DeclarationBlock = (function() {
  var self;

  self = DeclarationBlock;

  function DeclarationBlock() {
    this._declarations = {};
  }

  DeclarationBlock.prototype.set = function(prop, value) {
    var key, val;
    if (typeof prop === 'object') {
      for (key in prop) {
        val = prop[key];
        this.set(key, val);
      }
      return this;
    }
    prop = self.sanitizeProp(prop);
    this._getDeclarationClass(prop).setOnto(this._declarations, prop, value);
    return this;
  };

  DeclarationBlock.prototype._getDeclarationClass = function(prop) {
    var cls;
    if (prop[0] === '_') {
      return Arbitrary;
    }
    if (!(cls = declarationClasses[prop])) {
      throw Error("Unknown property `" + prop + "`. Write it as `_" + prop + "` if you're defining a custom property");
    }
    return cls;
  };

  DeclarationBlock.sanitizeProp = function(prop) {
    return String(prop).trim();
  };

  return DeclarationBlock;

})();

Arbitrary = __webpack_require__(/*! ./declarationBlock/Arbitrary */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Arbitrary.js");

declarationClasses = {
  color: __webpack_require__(/*! ./declarationBlock/Color */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Color.js"),
  background: __webpack_require__(/*! ./declarationBlock/Background */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Background.js"),
  width: __webpack_require__(/*! ./declarationBlock/Width */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Width.js"),
  height: __webpack_require__(/*! ./declarationBlock/Height */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Height.js"),
  bullet: __webpack_require__(/*! ./declarationBlock/Bullet */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Bullet.js"),
  display: __webpack_require__(/*! ./declarationBlock/Display */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Display.js"),
  margin: __webpack_require__(/*! ./declarationBlock/Margin */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Margin.js"),
  marginTop: __webpack_require__(/*! ./declarationBlock/MarginTop */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginTop.js"),
  marginLeft: __webpack_require__(/*! ./declarationBlock/MarginLeft */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginLeft.js"),
  marginRight: __webpack_require__(/*! ./declarationBlock/MarginRight */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginRight.js"),
  marginBottom: __webpack_require__(/*! ./declarationBlock/MarginBottom */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginBottom.js"),
  padding: __webpack_require__(/*! ./declarationBlock/Padding */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Padding.js"),
  paddingTop: __webpack_require__(/*! ./declarationBlock/PaddingTop */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingTop.js"),
  paddingLeft: __webpack_require__(/*! ./declarationBlock/PaddingLeft */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingLeft.js"),
  paddingRight: __webpack_require__(/*! ./declarationBlock/PaddingRight */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingRight.js"),
  paddingBottom: __webpack_require__(/*! ./declarationBlock/PaddingBottom */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingBottom.js")
};


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/MixedDeclarationSet.js":
/*!**************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/MixedDeclarationSet.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.9.3
var MixedDeclarationSet,
  slice = [].slice;

module.exports = MixedDeclarationSet = (function() {
  var self;

  self = MixedDeclarationSet;

  MixedDeclarationSet.mix = function() {
    var i, len, mixed, ruleSets, rules;
    ruleSets = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    mixed = new self;
    for (i = 0, len = ruleSets.length; i < len; i++) {
      rules = ruleSets[i];
      mixed.mixWithList(rules);
    }
    return mixed;
  };

  function MixedDeclarationSet() {
    this._declarations = {};
  }

  MixedDeclarationSet.prototype.mixWithList = function(rules) {
    var i, len, rule;
    rules.sort(function(a, b) {
      return a.selector.priority > b.selector.priority;
    });
    for (i = 0, len = rules.length; i < len; i++) {
      rule = rules[i];
      this._mixWithRule(rule);
    }
    return this;
  };

  MixedDeclarationSet.prototype._mixWithRule = function(rule) {
    var dec, prop, ref;
    ref = rule.styles._declarations;
    for (prop in ref) {
      dec = ref[prop];
      this._mixWithDeclaration(dec);
    }
  };

  MixedDeclarationSet.prototype._mixWithDeclaration = function(dec) {
    var cur;
    cur = this._declarations[dec.prop];
    if ((cur != null) && cur.important && !dec.important) {
      return;
    }
    this._declarations[dec.prop] = dec;
  };

  MixedDeclarationSet.prototype.get = function(prop) {
    if (prop == null) {
      return this._declarations;
    }
    if (this._declarations[prop] == null) {
      return null;
    }
    return this._declarations[prop].val;
  };

  MixedDeclarationSet.prototype.toObject = function() {
    var dec, obj, prop, ref;
    obj = {};
    ref = this._declarations;
    for (prop in ref) {
      dec = ref[prop];
      obj[prop] = dec.val;
    }
    return obj;
  };

  return MixedDeclarationSet;

})();


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/Selector.js":
/*!***************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/Selector.js ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var CSSSelect, Selector;

CSSSelect = __webpack_require__(/*! css-select */ "../../util/sugar/node_modules/renderkid/node_modules/css-select/index.js");

module.exports = Selector = (function() {
  var self;

  self = Selector;

  function Selector(text1) {
    this.text = text1;
    this._fn = CSSSelect.compile(this.text);
    this.priority = self.calculatePriority(this.text);
  }

  Selector.prototype.matches = function(elem) {
    return CSSSelect.is(elem, this._fn);
  };

  Selector.calculatePriority = function(text) {
    var n, priotrity;
    priotrity = 0;
    if (n = text.match(/[\#]{1}/g)) {
      priotrity += 100 * n.length;
    }
    if (n = text.match(/[a-zA-Z]+/g)) {
      priotrity += 2 * n.length;
    }
    if (n = text.match(/\*/g)) {
      priotrity += 1 * n.length;
    }
    return priotrity;
  };

  return Selector;

})();


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Arbitrary.js":
/*!*********************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Arbitrary.js ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var Arbitrary, _Declaration,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_Declaration = __webpack_require__(/*! ./_Declaration */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Declaration.js");

module.exports = Arbitrary = (function(superClass) {
  extend(Arbitrary, superClass);

  function Arbitrary() {
    return Arbitrary.__super__.constructor.apply(this, arguments);
  }

  return Arbitrary;

})(_Declaration);


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Background.js":
/*!**********************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Background.js ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var Background, _Declaration,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_Declaration = __webpack_require__(/*! ./_Declaration */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Declaration.js");

module.exports = Background = (function(superClass) {
  extend(Background, superClass);

  function Background() {
    return Background.__super__.constructor.apply(this, arguments);
  }

  return Background;

})(_Declaration);


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Bullet.js":
/*!******************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Bullet.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var Bullet, _Declaration,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_Declaration = __webpack_require__(/*! ./_Declaration */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Declaration.js");

module.exports = Bullet = (function(superClass) {
  var self;

  extend(Bullet, superClass);

  function Bullet() {
    return Bullet.__super__.constructor.apply(this, arguments);
  }

  self = Bullet;

  Bullet.prototype._set = function(val) {
    var alignment, bg, char, color, enabled, m, original;
    val = String(val);
    original = val;
    char = null;
    enabled = false;
    color = 'none';
    bg = 'none';
    if (m = val.match(/\"([^"]+)\"/) || (m = val.match(/\'([^']+)\'/))) {
      char = m[1];
      val = val.replace(m[0], '');
      enabled = true;
    }
    if (m = val.match(/(none|left|right|center)/)) {
      alignment = m[1];
      val = val.replace(m[0], '');
    } else {
      alignment = 'left';
    }
    if (alignment === 'none') {
      enabled = false;
    }
    if (m = val.match(/color\:([\w\-]+)/)) {
      color = m[1];
      val = val.replace(m[0], '');
    }
    if (m = val.match(/bg\:([\w\-]+)/)) {
      bg = m[1];
      val = val.replace(m[0], '');
    }
    if (val.trim() !== '') {
      throw Error("Unrecognizable value `" + original + "` for `" + this.prop + "`");
    }
    return this.val = {
      enabled: enabled,
      char: char,
      alignment: alignment,
      background: bg,
      color: color
    };
  };

  return Bullet;

})(_Declaration);


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Color.js":
/*!*****************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Color.js ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var Color, _Declaration,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_Declaration = __webpack_require__(/*! ./_Declaration */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Declaration.js");

module.exports = Color = (function(superClass) {
  extend(Color, superClass);

  function Color() {
    return Color.__super__.constructor.apply(this, arguments);
  }

  return Color;

})(_Declaration);


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Display.js":
/*!*******************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Display.js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var Display, _Declaration,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_Declaration = __webpack_require__(/*! ./_Declaration */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Declaration.js");

module.exports = Display = (function(superClass) {
  var self;

  extend(Display, superClass);

  function Display() {
    return Display.__super__.constructor.apply(this, arguments);
  }

  self = Display;

  Display._allowed = ['inline', 'block', 'none'];

  Display.prototype._set = function(val) {
    val = String(val).toLowerCase();
    if (indexOf.call(self._allowed, val) < 0) {
      throw Error("Unrecognizable value `" + val + "` for `" + this.prop + "`");
    }
    return this.val = val;
  };

  return Display;

})(_Declaration);


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Height.js":
/*!******************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Height.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var Height, _Length,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_Length = __webpack_require__(/*! ./_Length */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Length.js");

module.exports = Height = (function(superClass) {
  extend(Height, superClass);

  function Height() {
    return Height.__super__.constructor.apply(this, arguments);
  }

  return Height;

})(_Length);


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Margin.js":
/*!******************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Margin.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var Margin, MarginBottom, MarginLeft, MarginRight, MarginTop, _Declaration,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_Declaration = __webpack_require__(/*! ./_Declaration */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Declaration.js");

MarginTop = __webpack_require__(/*! ./MarginTop */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginTop.js");

MarginLeft = __webpack_require__(/*! ./MarginLeft */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginLeft.js");

MarginRight = __webpack_require__(/*! ./MarginRight */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginRight.js");

MarginBottom = __webpack_require__(/*! ./MarginBottom */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginBottom.js");

module.exports = Margin = (function(superClass) {
  var self;

  extend(Margin, superClass);

  function Margin() {
    return Margin.__super__.constructor.apply(this, arguments);
  }

  self = Margin;

  Margin.setOnto = function(declarations, prop, originalValue) {
    var append, val, vals;
    append = '';
    val = _Declaration.sanitizeValue(originalValue);
    if (_Declaration.importantClauseRx.test(String(val))) {
      append = ' !important';
      val = val.replace(_Declaration.importantClauseRx, '');
    }
    val = val.trim();
    if (val.length === 0) {
      return self._setAllDirections(declarations, append, append, append, append);
    }
    vals = val.split(" ").map(function(val) {
      return val + append;
    });
    if (vals.length === 1) {
      return self._setAllDirections(declarations, vals[0], vals[0], vals[0], vals[0]);
    } else if (vals.length === 2) {
      return self._setAllDirections(declarations, vals[0], vals[1], vals[0], vals[1]);
    } else if (vals.length === 3) {
      return self._setAllDirections(declarations, vals[0], vals[1], vals[2], vals[1]);
    } else if (vals.length === 4) {
      return self._setAllDirections(declarations, vals[0], vals[1], vals[2], vals[3]);
    } else {
      throw Error("Can't understand value for margin: `" + originalValue + "`");
    }
  };

  Margin._setAllDirections = function(declarations, top, right, bottom, left) {
    MarginTop.setOnto(declarations, 'marginTop', top);
    MarginTop.setOnto(declarations, 'marginRight', right);
    MarginTop.setOnto(declarations, 'marginBottom', bottom);
    MarginTop.setOnto(declarations, 'marginLeft', left);
  };

  return Margin;

})(_Declaration);


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginBottom.js":
/*!************************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginBottom.js ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var MarginBottom, _Length,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_Length = __webpack_require__(/*! ./_Length */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Length.js");

module.exports = MarginBottom = (function(superClass) {
  extend(MarginBottom, superClass);

  function MarginBottom() {
    return MarginBottom.__super__.constructor.apply(this, arguments);
  }

  return MarginBottom;

})(_Length);


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginLeft.js":
/*!**********************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginLeft.js ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var MarginLeft, _Length,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_Length = __webpack_require__(/*! ./_Length */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Length.js");

module.exports = MarginLeft = (function(superClass) {
  extend(MarginLeft, superClass);

  function MarginLeft() {
    return MarginLeft.__super__.constructor.apply(this, arguments);
  }

  return MarginLeft;

})(_Length);


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginRight.js":
/*!***********************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginRight.js ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var MarginRight, _Length,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_Length = __webpack_require__(/*! ./_Length */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Length.js");

module.exports = MarginRight = (function(superClass) {
  extend(MarginRight, superClass);

  function MarginRight() {
    return MarginRight.__super__.constructor.apply(this, arguments);
  }

  return MarginRight;

})(_Length);


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginTop.js":
/*!*********************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginTop.js ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var MarginTop, _Length,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_Length = __webpack_require__(/*! ./_Length */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Length.js");

module.exports = MarginTop = (function(superClass) {
  extend(MarginTop, superClass);

  function MarginTop() {
    return MarginTop.__super__.constructor.apply(this, arguments);
  }

  return MarginTop;

})(_Length);


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Padding.js":
/*!*******************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Padding.js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var Padding, PaddingBottom, PaddingLeft, PaddingRight, PaddingTop, _Declaration,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_Declaration = __webpack_require__(/*! ./_Declaration */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Declaration.js");

PaddingTop = __webpack_require__(/*! ./PaddingTop */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingTop.js");

PaddingLeft = __webpack_require__(/*! ./PaddingLeft */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingLeft.js");

PaddingRight = __webpack_require__(/*! ./PaddingRight */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingRight.js");

PaddingBottom = __webpack_require__(/*! ./PaddingBottom */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingBottom.js");

module.exports = Padding = (function(superClass) {
  var self;

  extend(Padding, superClass);

  function Padding() {
    return Padding.__super__.constructor.apply(this, arguments);
  }

  self = Padding;

  Padding.setOnto = function(declarations, prop, originalValue) {
    var append, val, vals;
    append = '';
    val = _Declaration.sanitizeValue(originalValue);
    if (_Declaration.importantClauseRx.test(String(val))) {
      append = ' !important';
      val = val.replace(_Declaration.importantClauseRx, '');
    }
    val = val.trim();
    if (val.length === 0) {
      return self._setAllDirections(declarations, append, append, append, append);
    }
    vals = val.split(" ").map(function(val) {
      return val + append;
    });
    if (vals.length === 1) {
      return self._setAllDirections(declarations, vals[0], vals[0], vals[0], vals[0]);
    } else if (vals.length === 2) {
      return self._setAllDirections(declarations, vals[0], vals[1], vals[0], vals[1]);
    } else if (vals.length === 3) {
      return self._setAllDirections(declarations, vals[0], vals[1], vals[2], vals[1]);
    } else if (vals.length === 4) {
      return self._setAllDirections(declarations, vals[0], vals[1], vals[2], vals[3]);
    } else {
      throw Error("Can't understand value for padding: `" + originalValue + "`");
    }
  };

  Padding._setAllDirections = function(declarations, top, right, bottom, left) {
    PaddingTop.setOnto(declarations, 'paddingTop', top);
    PaddingTop.setOnto(declarations, 'paddingRight', right);
    PaddingTop.setOnto(declarations, 'paddingBottom', bottom);
    PaddingTop.setOnto(declarations, 'paddingLeft', left);
  };

  return Padding;

})(_Declaration);


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingBottom.js":
/*!*************************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingBottom.js ***!
  \*************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var PaddingBottom, _Length,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_Length = __webpack_require__(/*! ./_Length */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Length.js");

module.exports = PaddingBottom = (function(superClass) {
  extend(PaddingBottom, superClass);

  function PaddingBottom() {
    return PaddingBottom.__super__.constructor.apply(this, arguments);
  }

  return PaddingBottom;

})(_Length);


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingLeft.js":
/*!***********************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingLeft.js ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var PaddingLeft, _Length,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_Length = __webpack_require__(/*! ./_Length */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Length.js");

module.exports = PaddingLeft = (function(superClass) {
  extend(PaddingLeft, superClass);

  function PaddingLeft() {
    return PaddingLeft.__super__.constructor.apply(this, arguments);
  }

  return PaddingLeft;

})(_Length);


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingRight.js":
/*!************************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingRight.js ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var PaddingRight, _Length,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_Length = __webpack_require__(/*! ./_Length */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Length.js");

module.exports = PaddingRight = (function(superClass) {
  extend(PaddingRight, superClass);

  function PaddingRight() {
    return PaddingRight.__super__.constructor.apply(this, arguments);
  }

  return PaddingRight;

})(_Length);


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingTop.js":
/*!**********************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingTop.js ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var PaddingTop, _Length,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_Length = __webpack_require__(/*! ./_Length */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Length.js");

module.exports = PaddingTop = (function(superClass) {
  extend(PaddingTop, superClass);

  function PaddingTop() {
    return PaddingTop.__super__.constructor.apply(this, arguments);
  }

  return PaddingTop;

})(_Length);


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Width.js":
/*!*****************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Width.js ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var Width, _Length,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_Length = __webpack_require__(/*! ./_Length */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Length.js");

module.exports = Width = (function(superClass) {
  extend(Width, superClass);

  function Width() {
    return Width.__super__.constructor.apply(this, arguments);
  }

  return Width;

})(_Length);


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Declaration.js":
/*!************************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Declaration.js ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.9.3
var _Declaration;

module.exports = _Declaration = (function() {
  var self;

  self = _Declaration;

  _Declaration.importantClauseRx = /(\s\!important)$/;

  _Declaration.setOnto = function(declarations, prop, val) {
    var dec;
    if (!(dec = declarations[prop])) {
      return declarations[prop] = new this(prop, val);
    } else {
      return dec.set(val);
    }
  };

  _Declaration.sanitizeValue = function(val) {
    return String(val).trim().replace(/[\s]+/g, ' ');
  };

  _Declaration.inheritAllowed = false;

  function _Declaration(prop1, val) {
    this.prop = prop1;
    this.important = false;
    this.set(val);
  }

  _Declaration.prototype.get = function() {
    return this._get();
  };

  _Declaration.prototype._get = function() {
    return this.val;
  };

  _Declaration.prototype._pickImportantClause = function(val) {
    if (self.importantClauseRx.test(String(val))) {
      this.important = true;
      return val.replace(self.importantClauseRx, '');
    } else {
      this.important = false;
      return val;
    }
  };

  _Declaration.prototype.set = function(val) {
    val = self.sanitizeValue(val);
    val = this._pickImportantClause(val);
    val = val.trim();
    if (this._handleNullOrInherit(val)) {
      return this;
    }
    this._set(val);
    return this;
  };

  _Declaration.prototype._set = function(val) {
    return this.val = val;
  };

  _Declaration.prototype._handleNullOrInherit = function(val) {
    if (val === '') {
      this.val = '';
      return true;
    }
    if (val === 'inherit') {
      if (this.constructor.inheritAllowed) {
        this.val = 'inherit';
      } else {
        throw Error("Inherit is not allowed for `" + this.prop + "`");
      }
      return true;
    } else {
      return false;
    }
  };

  return _Declaration;

})();


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Length.js":
/*!*******************************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Length.js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
var _Declaration, _Length,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_Declaration = __webpack_require__(/*! ./_Declaration */ "../../util/sugar/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Declaration.js");

module.exports = _Length = (function(superClass) {
  extend(_Length, superClass);

  function _Length() {
    return _Length.__super__.constructor.apply(this, arguments);
  }

  _Length.prototype._set = function(val) {
    if (!/^[0-9]+$/.test(String(val))) {
      throw Error("`" + this.prop + "` only takes an integer for value");
    }
    return this.val = parseInt(val);
  };

  return _Length;

})(_Declaration);


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/lib/tools.js":
/*!**************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/lib/tools.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.9.3
var htmlparser, object, objectToDom, self;

htmlparser = __webpack_require__(/*! htmlparser2 */ "../../util/sugar/node_modules/htmlparser2/lib/index.js");

object = __webpack_require__(/*! utila */ "../../util/sugar/node_modules/utila/lib/utila.js").object;

objectToDom = __webpack_require__(/*! dom-converter */ "../../util/sugar/node_modules/dom-converter/lib/domConverter.js").objectToDom;

module.exports = self = {
  repeatString: function(str, times) {
    var i, j, output, ref;
    output = '';
    for (i = j = 0, ref = times; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      output += str;
    }
    return output;
  },
  toDom: function(subject) {
    if (typeof subject === 'string') {
      return self.stringToDom(subject);
    } else if (object.isBareObject(subject)) {
      return self._objectToDom(subject);
    } else {
      throw Error("tools.toDom() only supports strings and objects");
    }
  },
  stringToDom: function(string) {
    var handler, parser;
    handler = new htmlparser.DomHandler;
    parser = new htmlparser.Parser(handler);
    parser.write(string);
    parser.end();
    return handler.dom;
  },
  _fixQuotesInDom: function(input) {
    var j, len, node;
    if (Array.isArray(input)) {
      for (j = 0, len = input.length; j < len; j++) {
        node = input[j];
        self._fixQuotesInDom(node);
      }
      return input;
    }
    node = input;
    if (node.type === 'text') {
      return node.data = self._quoteNodeText(node.data);
    } else {
      return self._fixQuotesInDom(node.children);
    }
  },
  objectToDom: function(o) {
    if (!Array.isArray(o)) {
      if (!object.isBareObject(o)) {
        throw Error("objectToDom() only accepts a bare object or an array");
      }
    }
    return self._fixQuotesInDom(objectToDom(o));
  },
  quote: function(str) {
    return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/\ /g, '&sp;').replace(/\n/g, '<br />');
  },
  _quoteNodeText: function(text) {
    return String(text).replace(/\&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/\ /g, '&sp;').replace(/\n/g, "&nl;");
  },
  getCols: function() {
    var cols, tty;
    tty = __webpack_require__(/*! tty */ "../../util/sugar/node_modules/tty-browserify/index.js");
    cols = (function() {
      try {
        if (tty.isatty(1) && tty.isatty(2)) {
          if (process.stdout.getWindowSize) {
            return process.stdout.getWindowSize(1)[0];
          } else if (tty.getWindowSize) {
            return tty.getWindowSize()[1];
          } else if (process.stdout.columns) {
            return process.stdout.columns;
          }
        }
      } catch (_error) {}
    })();
    if (typeof cols === 'number' && cols > 30) {
      return cols;
    } else {
      return 80;
    }
  }
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "../../util/sugar/node_modules/process/browser.js")))

/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/node_modules/ansi-regex/index.js":
/*!**********************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/node_modules/ansi-regex/index.js ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
};


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/node_modules/css-select/index.js":
/*!**********************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/node_modules/css-select/index.js ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = CSSselect;

var Pseudos       = __webpack_require__(/*! ./lib/pseudos.js */ "../../util/sugar/node_modules/renderkid/node_modules/css-select/lib/pseudos.js"),
    DomUtils      = __webpack_require__(/*! domutils */ "../../util/sugar/node_modules/renderkid/node_modules/domutils/index.js"),
    findOne       = DomUtils.findOne,
    findAll       = DomUtils.findAll,
    getChildren   = DomUtils.getChildren,
    removeSubsets = DomUtils.removeSubsets,
    falseFunc     = __webpack_require__(/*! boolbase */ "../../util/sugar/node_modules/boolbase/index.js").falseFunc,
    compile       = __webpack_require__(/*! ./lib/compile.js */ "../../util/sugar/node_modules/renderkid/node_modules/css-select/lib/compile.js"),
    compileUnsafe = compile.compileUnsafe,
    compileToken  = compile.compileToken;

function getSelectorFunc(searchFunc){
	return function select(query, elems, options){
        if(typeof query !== "function") query = compileUnsafe(query, options, elems);
        if(!Array.isArray(elems)) elems = getChildren(elems);
		else elems = removeSubsets(elems);
		return searchFunc(query, elems);
	};
}

var selectAll = getSelectorFunc(function selectAll(query, elems){
	return (query === falseFunc || !elems || elems.length === 0) ? [] : findAll(query, elems);
});

var selectOne = getSelectorFunc(function selectOne(query, elems){
	return (query === falseFunc || !elems || elems.length === 0) ? null : findOne(query, elems);
});

function is(elem, query, options){
	return (typeof query === "function" ? query : compile(query, options))(elem);
}

/*
	the exported interface
*/
function CSSselect(query, elems, options){
	return selectAll(query, elems, options);
}

CSSselect.compile = compile;
CSSselect.filters = Pseudos.filters;
CSSselect.pseudos = Pseudos.pseudos;

CSSselect.selectAll = selectAll;
CSSselect.selectOne = selectOne;

CSSselect.is = is;

//legacy methods (might be removed)
CSSselect.parse = compile;
CSSselect.iterate = selectAll;

//hooks
CSSselect._compileUnsafe = compileUnsafe;
CSSselect._compileToken = compileToken;


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/node_modules/css-select/lib/attributes.js":
/*!*******************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/node_modules/css-select/lib/attributes.js ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DomUtils  = __webpack_require__(/*! domutils */ "../../util/sugar/node_modules/renderkid/node_modules/domutils/index.js"),
    hasAttrib = DomUtils.hasAttrib,
    getAttributeValue = DomUtils.getAttributeValue,
    falseFunc = __webpack_require__(/*! boolbase */ "../../util/sugar/node_modules/boolbase/index.js").falseFunc;

//https://github.com/slevithan/XRegExp/blob/master/src/xregexp.js#L469
var reChars = /[-[\]{}()*+?.,\\^$|#\s]/g;

/*
	attribute selectors
*/

var attributeRules = {
	__proto__: null,
	equals: function(next, data){
		var name  = data.name,
		    value = data.value;

		if(data.ignoreCase){
			value = value.toLowerCase();

			return function equalsIC(elem){
				var attr = getAttributeValue(elem, name);
				return attr != null && attr.toLowerCase() === value && next(elem);
			};
		}

		return function equals(elem){
			return getAttributeValue(elem, name) === value && next(elem);
		};
	},
	hyphen: function(next, data){
		var name  = data.name,
		    value = data.value,
		    len = value.length;

		if(data.ignoreCase){
			value = value.toLowerCase();

			return function hyphenIC(elem){
				var attr = getAttributeValue(elem, name);
				return attr != null &&
						(attr.length === len || attr.charAt(len) === "-") &&
						attr.substr(0, len).toLowerCase() === value &&
						next(elem);
			};
		}

		return function hyphen(elem){
			var attr = getAttributeValue(elem, name);
			return attr != null &&
					attr.substr(0, len) === value &&
					(attr.length === len || attr.charAt(len) === "-") &&
					next(elem);
		};
	},
	element: function(next, data){
		var name = data.name,
		    value = data.value;

		if(/\s/.test(value)){
			return falseFunc;
		}

		value = value.replace(reChars, "\\$&");

		var pattern = "(?:^|\\s)" + value + "(?:$|\\s)",
		    flags = data.ignoreCase ? "i" : "",
		    regex = new RegExp(pattern, flags);

		return function element(elem){
			var attr = getAttributeValue(elem, name);
			return attr != null && regex.test(attr) && next(elem);
		};
	},
	exists: function(next, data){
		var name = data.name;
		return function exists(elem){
			return hasAttrib(elem, name) && next(elem);
		};
	},
	start: function(next, data){
		var name  = data.name,
		    value = data.value,
		    len = value.length;

		if(len === 0){
			return falseFunc;
		}
		
		if(data.ignoreCase){
			value = value.toLowerCase();

			return function startIC(elem){
				var attr = getAttributeValue(elem, name);
				return attr != null && attr.substr(0, len).toLowerCase() === value && next(elem);
			};
		}

		return function start(elem){
			var attr = getAttributeValue(elem, name);
			return attr != null && attr.substr(0, len) === value && next(elem);
		};
	},
	end: function(next, data){
		var name  = data.name,
		    value = data.value,
		    len   = -value.length;

		if(len === 0){
			return falseFunc;
		}

		if(data.ignoreCase){
			value = value.toLowerCase();

			return function endIC(elem){
				var attr = getAttributeValue(elem, name);
				return attr != null && attr.substr(len).toLowerCase() === value && next(elem);
			};
		}

		return function end(elem){
			var attr = getAttributeValue(elem, name);
			return attr != null && attr.substr(len) === value && next(elem);
		};
	},
	any: function(next, data){
		var name  = data.name,
		    value = data.value;

		if(value === ""){
			return falseFunc;
		}

		if(data.ignoreCase){
			var regex = new RegExp(value.replace(reChars, "\\$&"), "i");

			return function anyIC(elem){
				var attr = getAttributeValue(elem, name);
				return attr != null && regex.test(attr) && next(elem);
			};
		}

		return function any(elem){
			var attr = getAttributeValue(elem, name);
			return attr != null && attr.indexOf(value) >= 0 && next(elem);
		};
	},
	not: function(next, data){
		var name  = data.name,
		    value = data.value;

		if(value === ""){
			return function notEmpty(elem){
				return !!getAttributeValue(elem, name) && next(elem);
			};
		} else if(data.ignoreCase){
			value = value.toLowerCase();

			return function notIC(elem){
				var attr = getAttributeValue(elem, name);
				return attr != null && attr.toLowerCase() !== value && next(elem);
			};
		}

		return function not(elem){
			return getAttributeValue(elem, name) !== value && next(elem);
		};
	}
};

module.exports = {
	compile: function(next, data, options){
		if(options && options.strict && (
			data.ignoreCase || data.action === "not"
		)) throw SyntaxError("Unsupported attribute selector");
		return attributeRules[data.action](next, data);
	},
	rules: attributeRules
};


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/node_modules/css-select/lib/compile.js":
/*!****************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/node_modules/css-select/lib/compile.js ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	compiles a selector to an executable function
*/

module.exports = compile;
module.exports.compileUnsafe = compileUnsafe;
module.exports.compileToken = compileToken;

var parse       = __webpack_require__(/*! css-what */ "../../util/sugar/node_modules/renderkid/node_modules/css-what/index.js"),
    DomUtils    = __webpack_require__(/*! domutils */ "../../util/sugar/node_modules/renderkid/node_modules/domutils/index.js"),
    isTag       = DomUtils.isTag,
    Rules       = __webpack_require__(/*! ./general.js */ "../../util/sugar/node_modules/renderkid/node_modules/css-select/lib/general.js"),
    sortRules   = __webpack_require__(/*! ./sort.js */ "../../util/sugar/node_modules/renderkid/node_modules/css-select/lib/sort.js"),
    BaseFuncs   = __webpack_require__(/*! boolbase */ "../../util/sugar/node_modules/boolbase/index.js"),
    trueFunc    = BaseFuncs.trueFunc,
    falseFunc   = BaseFuncs.falseFunc,
    procedure   = __webpack_require__(/*! ./procedure.json */ "../../util/sugar/node_modules/renderkid/node_modules/css-select/lib/procedure.json");

function compile(selector, options, context){
	var next = compileUnsafe(selector, options, context);
	return wrap(next);
}

function wrap(next){
	return function base(elem){
		return isTag(elem) && next(elem);
	};
}

function compileUnsafe(selector, options, context){
	var token = parse(selector, options);
	return compileToken(token, options, context);
}

function includesScopePseudo(t){
    return t.type === "pseudo" && (
        t.name === "scope" || (
            Array.isArray(t.data) &&
            t.data.some(function(data){
                return data.some(includesScopePseudo);
            })
        )
    );
}

var DESCENDANT_TOKEN = {type: "descendant"},
    SCOPE_TOKEN = {type: "pseudo", name: "scope"},
    PLACEHOLDER_ELEMENT = {},
    getParent = DomUtils.getParent;

//CSS 4 Spec (Draft): 3.3.1. Absolutizing a Scope-relative Selector
//http://www.w3.org/TR/selectors4/#absolutizing
function absolutize(token, context){
    //TODO better check if context is document
    var hasContext = !!context && !!context.length && context.every(function(e){
        return e === PLACEHOLDER_ELEMENT || !!getParent(e);
    });


    token.forEach(function(t){
        if(t.length > 0 && isTraversal(t[0]) && t[0].type !== "descendant"){
            //don't return in else branch
        } else if(hasContext && !includesScopePseudo(t)){
            t.unshift(DESCENDANT_TOKEN);
        } else {
            return;
        }

        t.unshift(SCOPE_TOKEN);
    });
}

function compileToken(token, options, context){
    token = token.filter(function(t){ return t.length > 0; });

	token.forEach(sortRules);

	var isArrayContext = Array.isArray(context);

    context = (options && options.context) || context;

    if(context && !isArrayContext) context = [context];

    absolutize(token, context);

	return token
		.map(function(rules){ return compileRules(rules, options, context, isArrayContext); })
		.reduce(reduceRules, falseFunc);
}

function isTraversal(t){
	return procedure[t.type] < 0;
}

function compileRules(rules, options, context, isArrayContext){
	var acceptSelf = (isArrayContext && rules[0].name === "scope" && rules[1].type === "descendant");
	return rules.reduce(function(func, rule, index){
		if(func === falseFunc) return func;
		return Rules[rule.type](func, rule, options, context, acceptSelf && index === 1);
	}, options && options.rootFunc || trueFunc);
}

function reduceRules(a, b){
	if(b === falseFunc || a === trueFunc){
		return a;
	}
	if(a === falseFunc || b === trueFunc){
		return b;
	}

	return function combine(elem){
		return a(elem) || b(elem);
	};
}

//:not, :has and :matches have to compile selectors
//doing this in lib/pseudos.js would lead to circular dependencies,
//so we add them here

var Pseudos     = __webpack_require__(/*! ./pseudos.js */ "../../util/sugar/node_modules/renderkid/node_modules/css-select/lib/pseudos.js"),
    filters     = Pseudos.filters,
    existsOne   = DomUtils.existsOne,
    isTag       = DomUtils.isTag,
    getChildren = DomUtils.getChildren;


function containsTraversal(t){
	return t.some(isTraversal);
}

filters.not = function(next, token, options, context){
	var opts = {
	    	xmlMode: !!(options && options.xmlMode),
	    	strict: !!(options && options.strict)
	    };

	if(opts.strict){
		if(token.length > 1 || token.some(containsTraversal)){
			throw new SyntaxError("complex selectors in :not aren't allowed in strict mode");
		}
	}

    var func = compileToken(token, opts, context);

	if(func === falseFunc) return next;
	if(func === trueFunc)  return falseFunc;

	return function(elem){
		return !func(elem) && next(elem);
	};
};

filters.has = function(next, token, options){
	var opts = {
		xmlMode: !!(options && options.xmlMode),
		strict: !!(options && options.strict)
	};

    //FIXME: Uses an array as a pointer to the current element (side effects)
    var context = token.some(containsTraversal) ? [PLACEHOLDER_ELEMENT] : null;

	var func = compileToken(token, opts, context);

	if(func === falseFunc) return falseFunc;
	if(func === trueFunc)  return function(elem){
			return getChildren(elem).some(isTag) && next(elem);
		};

	func = wrap(func);

    if(context){
        return function has(elem){
		return next(elem) && (
                (context[0] = elem), existsOne(func, getChildren(elem))
            );
	};
    }

    return function has(elem){
		return next(elem) && existsOne(func, getChildren(elem));
	};
};

filters.matches = function(next, token, options, context){
	var opts = {
		xmlMode: !!(options && options.xmlMode),
		strict: !!(options && options.strict),
		rootFunc: next
	};

	return compileToken(token, opts, context);
};


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/node_modules/css-select/lib/general.js":
/*!****************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/node_modules/css-select/lib/general.js ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DomUtils    = __webpack_require__(/*! domutils */ "../../util/sugar/node_modules/renderkid/node_modules/domutils/index.js"),
    isTag       = DomUtils.isTag,
    getParent   = DomUtils.getParent,
    getChildren = DomUtils.getChildren,
    getSiblings = DomUtils.getSiblings,
    getName     = DomUtils.getName;

/*
	all available rules
*/
module.exports = {
	__proto__: null,

	attribute: __webpack_require__(/*! ./attributes.js */ "../../util/sugar/node_modules/renderkid/node_modules/css-select/lib/attributes.js").compile,
	pseudo: __webpack_require__(/*! ./pseudos.js */ "../../util/sugar/node_modules/renderkid/node_modules/css-select/lib/pseudos.js").compile,

	//tags
	tag: function(next, data){
		var name = data.name;
		return function tag(elem){
			return getName(elem) === name && next(elem);
		};
	},

	//traversal
	descendant: function(next, rule, options, context, acceptSelf){
		return function descendant(elem){

			if (acceptSelf && next(elem)) return true;

			var found = false;

			while(!found && (elem = getParent(elem))){
				found = next(elem);
			}

			return found;
		};
	},
	parent: function(next, data, options){
		if(options && options.strict) throw SyntaxError("Parent selector isn't part of CSS3");

		return function parent(elem){
			return getChildren(elem).some(test);
		};

		function test(elem){
			return isTag(elem) && next(elem);
		}
	},
	child: function(next){
		return function child(elem){
			var parent = getParent(elem);
			return !!parent && next(parent);
		};
	},
	sibling: function(next){
		return function sibling(elem){
			var siblings = getSiblings(elem);

			for(var i = 0; i < siblings.length; i++){
				if(isTag(siblings[i])){
					if(siblings[i] === elem) break;
					if(next(siblings[i])) return true;
				}
			}

			return false;
		};
	},
	adjacent: function(next){
		return function adjacent(elem){
			var siblings = getSiblings(elem),
			    lastElement;

			for(var i = 0; i < siblings.length; i++){
				if(isTag(siblings[i])){
					if(siblings[i] === elem) break;
					lastElement = siblings[i];
				}
			}

			return !!lastElement && next(lastElement);
		};
	},
	universal: function(next){
		return next;
	}
};

/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/node_modules/css-select/lib/procedure.json":
/*!********************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/node_modules/css-select/lib/procedure.json ***!
  \********************************************************************************************************************************************/
/*! exports provided: universal, tag, attribute, pseudo, descendant, child, parent, sibling, adjacent, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"universal\":50,\"tag\":30,\"attribute\":1,\"pseudo\":0,\"descendant\":-1,\"child\":-1,\"parent\":-1,\"sibling\":-1,\"adjacent\":-1}");

/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/node_modules/css-select/lib/pseudos.js":
/*!****************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/node_modules/css-select/lib/pseudos.js ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	pseudo selectors

	---

	they are available in two forms:
	* filters called when the selector
	  is compiled and return a function
	  that needs to return next()
	* pseudos get called on execution
	  they need to return a boolean
*/

var DomUtils    = __webpack_require__(/*! domutils */ "../../util/sugar/node_modules/renderkid/node_modules/domutils/index.js"),
    isTag       = DomUtils.isTag,
    getText     = DomUtils.getText,
    getParent   = DomUtils.getParent,
    getChildren = DomUtils.getChildren,
    getSiblings = DomUtils.getSiblings,
    hasAttrib   = DomUtils.hasAttrib,
    getName     = DomUtils.getName,
    getAttribute= DomUtils.getAttributeValue,
    getNCheck   = __webpack_require__(/*! nth-check */ "../../util/sugar/node_modules/nth-check/index.js"),
    checkAttrib = __webpack_require__(/*! ./attributes.js */ "../../util/sugar/node_modules/renderkid/node_modules/css-select/lib/attributes.js").rules.equals,
    BaseFuncs   = __webpack_require__(/*! boolbase */ "../../util/sugar/node_modules/boolbase/index.js"),
    trueFunc    = BaseFuncs.trueFunc,
    falseFunc   = BaseFuncs.falseFunc;

//helper methods
function getFirstElement(elems){
	for(var i = 0; elems && i < elems.length; i++){
		if(isTag(elems[i])) return elems[i];
	}
}

function getAttribFunc(name, value){
	var data = {name: name, value: value};
	return function attribFunc(next){
		return checkAttrib(next, data);
	};
}

function getChildFunc(next){
	return function(elem){
		return !!getParent(elem) && next(elem);
	};
}

var filters = {
	contains: function(next, text){
		return function contains(elem){
			return next(elem) && getText(elem).indexOf(text) >= 0;
		};
	},
	icontains: function(next, text){
		var itext = text.toLowerCase();
		return function icontains(elem){
			return next(elem) &&
				getText(elem).toLowerCase().indexOf(itext) >= 0;
		};
	},

	//location specific methods
	"nth-child": function(next, rule){
		var func = getNCheck(rule);

		if(func === falseFunc) return func;
		if(func === trueFunc)  return getChildFunc(next);

		return function nthChild(elem){
			var siblings = getSiblings(elem);

			for(var i = 0, pos = 0; i < siblings.length; i++){
				if(isTag(siblings[i])){
					if(siblings[i] === elem) break;
					else pos++;
				}
			}

			return func(pos) && next(elem);
		};
	},
	"nth-last-child": function(next, rule){
		var func = getNCheck(rule);

		if(func === falseFunc) return func;
		if(func === trueFunc)  return getChildFunc(next);

		return function nthLastChild(elem){
			var siblings = getSiblings(elem);

			for(var pos = 0, i = siblings.length - 1; i >= 0; i--){
				if(isTag(siblings[i])){
					if(siblings[i] === elem) break;
					else pos++;
				}
			}

			return func(pos) && next(elem);
		};
	},
	"nth-of-type": function(next, rule){
		var func = getNCheck(rule);

		if(func === falseFunc) return func;
		if(func === trueFunc)  return getChildFunc(next);

		return function nthOfType(elem){
			var siblings = getSiblings(elem);

			for(var pos = 0, i = 0; i < siblings.length; i++){
				if(isTag(siblings[i])){
					if(siblings[i] === elem) break;
					if(getName(siblings[i]) === getName(elem)) pos++;
				}
			}

			return func(pos) && next(elem);
		};
	},
	"nth-last-of-type": function(next, rule){
		var func = getNCheck(rule);

		if(func === falseFunc) return func;
		if(func === trueFunc)  return getChildFunc(next);

		return function nthLastOfType(elem){
			var siblings = getSiblings(elem);

			for(var pos = 0, i = siblings.length - 1; i >= 0; i--){
				if(isTag(siblings[i])){
					if(siblings[i] === elem) break;
					if(getName(siblings[i]) === getName(elem)) pos++;
				}
			}

			return func(pos) && next(elem);
		};
	},

    //TODO determine the actual root element
    root: function(next){
        return function(elem){
            return !getParent(elem) && next(elem);
        };
    },

    scope: function(next, rule, options, context){
        if(!context || context.length === 0){
            //equivalent to :root
            return filters.root(next);
        }

        if(context.length === 1){
            //NOTE: can't be unpacked, as :has uses this for side-effects
            return function(elem){
                return context[0] === elem && next(elem);
            };
        }

        return function(elem){
            return context.indexOf(elem) >= 0 && next(elem);
        };
    },

	//jQuery extensions (others follow as pseudos)
	checkbox: getAttribFunc("type", "checkbox"),
	file: getAttribFunc("type", "file"),
	password: getAttribFunc("type", "password"),
	radio: getAttribFunc("type", "radio"),
	reset: getAttribFunc("type", "reset"),
	image: getAttribFunc("type", "image"),
	submit: getAttribFunc("type", "submit")
};

//while filters are precompiled, pseudos get called when they are needed
var pseudos = {
	empty: function(elem){
		return !getChildren(elem).some(function(elem){
			return isTag(elem) || elem.type === "text";
		});
	},

	"first-child": function(elem){
		return getFirstElement(getSiblings(elem)) === elem;
	},
	"last-child": function(elem){
		var siblings = getSiblings(elem);

		for(var i = siblings.length - 1; i >= 0; i--){
			if(siblings[i] === elem) return true;
			if(isTag(siblings[i])) break;
		}

		return false;
	},
	"first-of-type": function(elem){
		var siblings = getSiblings(elem);

		for(var i = 0; i < siblings.length; i++){
			if(isTag(siblings[i])){
				if(siblings[i] === elem) return true;
				if(getName(siblings[i]) === getName(elem)) break;
			}
		}

		return false;
	},
	"last-of-type": function(elem){
		var siblings = getSiblings(elem);

		for(var i = siblings.length-1; i >= 0; i--){
			if(isTag(siblings[i])){
				if(siblings[i] === elem) return true;
				if(getName(siblings[i]) === getName(elem)) break;
			}
		}

		return false;
	},
	"only-of-type": function(elem){
		var siblings = getSiblings(elem);

		for(var i = 0, j = siblings.length; i < j; i++){
			if(isTag(siblings[i])){
				if(siblings[i] === elem) continue;
				if(getName(siblings[i]) === getName(elem)) return false;
			}
		}

		return true;
	},
	"only-child": function(elem){
		var siblings = getSiblings(elem);

		for(var i = 0; i < siblings.length; i++){
			if(isTag(siblings[i]) && siblings[i] !== elem) return false;
		}

		return true;
	},

	//:matches(a, area, link)[href]
	link: function(elem){
		return hasAttrib(elem, "href");
	},
	visited: falseFunc, //seems to be a valid implementation
	//TODO: :any-link once the name is finalized (as an alias of :link)

	//forms
	//to consider: :target

	//:matches([selected], select:not([multiple]):not(> option[selected]) > option:first-of-type)
	selected: function(elem){
		if(hasAttrib(elem, "selected")) return true;
		else if(getName(elem) !== "option") return false;

		//the first <option> in a <select> is also selected
		var parent = getParent(elem);

		if(
			!parent ||
			getName(parent) !== "select" ||
			hasAttrib(parent, "multiple")
		) return false;

		var siblings = getChildren(parent),
			sawElem  = false;

		for(var i = 0; i < siblings.length; i++){
			if(isTag(siblings[i])){
				if(siblings[i] === elem){
					sawElem = true;
				} else if(!sawElem){
					return false;
				} else if(hasAttrib(siblings[i], "selected")){
					return false;
				}
			}
		}

		return sawElem;
	},
	//https://html.spec.whatwg.org/multipage/scripting.html#disabled-elements
	//:matches(
	//  :matches(button, input, select, textarea, menuitem, optgroup, option)[disabled],
	//  optgroup[disabled] > option),
	// fieldset[disabled] * //TODO not child of first <legend>
	//)
	disabled: function(elem){
		return hasAttrib(elem, "disabled");
	},
	enabled: function(elem){
		return !hasAttrib(elem, "disabled");
	},
	//:matches(:matches(:radio, :checkbox)[checked], :selected) (TODO menuitem)
	checked: function(elem){
		return hasAttrib(elem, "checked") || pseudos.selected(elem);
	},
	//:matches(input, select, textarea)[required]
	required: function(elem){
		return hasAttrib(elem, "required");
	},
	//:matches(input, select, textarea):not([required])
	optional: function(elem){
		return !hasAttrib(elem, "required");
	},

	//jQuery extensions

	//:not(:empty)
	parent: function(elem){
		return !pseudos.empty(elem);
	},
	//:matches(h1, h2, h3, h4, h5, h6)
	header: function(elem){
		var name = getName(elem);
		return name === "h1" ||
		       name === "h2" ||
		       name === "h3" ||
		       name === "h4" ||
		       name === "h5" ||
		       name === "h6";
	},

	//:matches(button, input[type=button])
	button: function(elem){
		var name = getName(elem);
		return name === "button" ||
		       name === "input" &&
		       getAttribute(elem, "type") === "button";
	},
	//:matches(input, textarea, select, button)
	input: function(elem){
		var name = getName(elem);
		return name === "input" ||
		       name === "textarea" ||
		       name === "select" ||
		       name === "button";
	},
	//input:matches(:not([type!='']), [type='text' i])
	text: function(elem){
		var attr;
		return getName(elem) === "input" && (
			!(attr = getAttribute(elem, "type")) ||
			attr.toLowerCase() === "text"
		);
	}
};

function verifyArgs(func, name, subselect){
	if(subselect === null){
		if(func.length > 1 && name !== "scope"){
			throw new SyntaxError("pseudo-selector :" + name + " requires an argument");
		}
	} else {
		if(func.length === 1){
			throw new SyntaxError("pseudo-selector :" + name + " doesn't have any arguments");
		}
	}
}

//FIXME this feels hacky
var re_CSS3 = /^(?:(?:nth|last|first|only)-(?:child|of-type)|root|empty|(?:en|dis)abled|checked|not)$/;

module.exports = {
	compile: function(next, data, options, context){
		var name = data.name,
			subselect = data.data;

		if(options && options.strict && !re_CSS3.test(name)){
			throw SyntaxError(":" + name + " isn't part of CSS3");
		}

		if(typeof filters[name] === "function"){
			verifyArgs(filters[name], name,  subselect);
			return filters[name](next, subselect, options, context);
		} else if(typeof pseudos[name] === "function"){
			var func = pseudos[name];
			verifyArgs(func, name, subselect);

			if(next === trueFunc) return func;

			return function pseudoArgs(elem){
				return func(elem, subselect) && next(elem);
			};
		} else {
			throw new SyntaxError("unmatched pseudo-class :" + name);
		}
	},
	filters: filters,
	pseudos: pseudos
};


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/node_modules/css-select/lib/sort.js":
/*!*************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/node_modules/css-select/lib/sort.js ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = sortByProcedure;

/*
	sort the parts of the passed selector,
	as there is potential for optimization
	(some types of selectors are faster than others)
*/

var procedure = __webpack_require__(/*! ./procedure.json */ "../../util/sugar/node_modules/renderkid/node_modules/css-select/lib/procedure.json");

var attributes = {
	__proto__: null,
	exists: 10,
	equals: 8,
	not: 7,
	start: 6,
	end: 6,
	any: 5,
	hyphen: 4,
	element: 4
};

function sortByProcedure(arr){
	var procs = arr.map(getProcedure);
	for(var i = 1; i < arr.length; i++){
		var procNew = procs[i];

		if(procNew < 0) continue;

		for(var j = i - 1; j >= 0 && procNew < procs[j]; j--){
			var token = arr[j + 1];
			arr[j + 1] = arr[j];
			arr[j] = token;
			procs[j + 1] = procs[j];
			procs[j] = procNew;
		}
	}
}

function getProcedure(token){
	var proc = procedure[token.type];

	if(proc === procedure.attribute){
		proc = attributes[token.action];

		if(proc === attributes.equals && token.name === "id"){
			//prefer ID selectors (eg. #ID)
			proc = 9;
		}

		if(token.ignoreCase){
			//ignoreCase adds some overhead, prefer "normal" token
			//this is a binary operation, to ensure it's still an int
			proc >>= 1;
		}
	} else if(proc === procedure.pseudo){
		if(!token.data){
			proc = 3;
		} else if(token.name === "has" || token.name === "contains"){
			proc = 0; //expensive in any case
		} else if(token.name === "matches" || token.name === "not"){
			proc = 0;
			for(var i = 0; i < token.data.length; i++){
				//TODO better handling of complex selectors
				if(token.data[i].length !== 1) continue;
				var cur = getProcedure(token.data[i][0]);
				//avoid executing :has or :contains
				if(cur === 0){
					proc = 0;
					break;
				}
				if(cur > proc) proc = cur;
			}
			if(token.data.length > 1 && proc > 0) proc -= 1;
		} else {
			proc = 1;
		}
	}
	return proc;
}


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/node_modules/css-what/index.js":
/*!********************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/node_modules/css-what/index.js ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = parse;

var re_name = /^(?:\\.|[\w\-\u00b0-\uFFFF])+/,
    re_escape = /\\([\da-f]{1,6}\s?|(\s)|.)/ig,
    //modified version of https://github.com/jquery/sizzle/blob/master/src/sizzle.js#L87
    re_attr = /^\s*((?:\\.|[\w\u00b0-\uFFFF\-])+)\s*(?:(\S?)=\s*(?:(['"])([^]*?)\3|(#?(?:\\.|[\w\u00b0-\uFFFF\-])*)|)|)\s*(i)?\]/;

var actionTypes = {
	__proto__: null,
	"undefined": "exists",
	"":  "equals",
	"~": "element",
	"^": "start",
	"$": "end",
	"*": "any",
	"!": "not",
	"|": "hyphen"
};

var simpleSelectors = {
	__proto__: null,
	">": "child",
	"<": "parent",
	"~": "sibling",
	"+": "adjacent"
};

var attribSelectors = {
	__proto__: null,
	"#": ["id", "equals"],
	".": ["class", "element"]
};

//pseudos, whose data-property is parsed as well
var unpackPseudos = {
	__proto__: null,
	"has": true,
	"not": true,
	"matches": true
};

var stripQuotesFromPseudos = {
	__proto__: null,
	"contains": true,
	"icontains": true
};

var quotes = {
	__proto__: null,
	"\"": true,
	"'": true
};

//unescape function taken from https://github.com/jquery/sizzle/blob/master/src/sizzle.js#L139
function funescape( _, escaped, escapedWhitespace ) {
	var high = "0x" + escaped - 0x10000;
	// NaN means non-codepoint
	// Support: Firefox
	// Workaround erroneous numeric interpretation of +"0x"
	return high !== high || escapedWhitespace ?
		escaped :
		// BMP codepoint
		high < 0 ?
			String.fromCharCode( high + 0x10000 ) :
			// Supplemental Plane codepoint (surrogate pair)
			String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
}

function unescapeCSS(str){
	return str.replace(re_escape, funescape);
}

function isWhitespace(c){
	return c === " " || c === "\n" || c === "\t" || c === "\f" || c === "\r";
}

function parse(selector, options){
	var subselects = [];

	selector = parseSelector(subselects, selector + "", options);

	if(selector !== ""){
		throw new SyntaxError("Unmatched selector: " + selector);
	}

	return subselects;
}

function parseSelector(subselects, selector, options){
	var tokens = [],
		sawWS = false,
		data, firstChar, name, quot;

	function getName(){
		var sub = selector.match(re_name)[0];
		selector = selector.substr(sub.length);
		return unescapeCSS(sub);
	}

	function stripWhitespace(start){
		while(isWhitespace(selector.charAt(start))) start++;
		selector = selector.substr(start);
	}

	function isEscaped(pos) {
		var slashCount = 0;

		while (selector.charAt(--pos) === "\\") slashCount++;
		return (slashCount & 1) === 1;
	}

	stripWhitespace(0);

	while(selector !== ""){
		firstChar = selector.charAt(0);

		if(isWhitespace(firstChar)){
			sawWS = true;
			stripWhitespace(1);
		} else if(firstChar in simpleSelectors){
			tokens.push({type: simpleSelectors[firstChar]});
			sawWS = false;

			stripWhitespace(1);
		} else if(firstChar === ","){
			if(tokens.length === 0){
				throw new SyntaxError("empty sub-selector");
			}
			subselects.push(tokens);
			tokens = [];
			sawWS = false;
			stripWhitespace(1);
		} else {
			if(sawWS){
				if(tokens.length > 0){
					tokens.push({type: "descendant"});
				}
				sawWS = false;
			}

			if(firstChar === "*"){
				selector = selector.substr(1);
				tokens.push({type: "universal"});
			} else if(firstChar in attribSelectors){
				selector = selector.substr(1);
				tokens.push({
					type: "attribute",
					name: attribSelectors[firstChar][0],
					action: attribSelectors[firstChar][1],
					value: getName(),
					ignoreCase: false
				});
			} else if(firstChar === "["){
				selector = selector.substr(1);
				data = selector.match(re_attr);
				if(!data){
					throw new SyntaxError("Malformed attribute selector: " + selector);
				}
				selector = selector.substr(data[0].length);
				name = unescapeCSS(data[1]);

				if(
					!options || (
						"lowerCaseAttributeNames" in options ?
							options.lowerCaseAttributeNames :
							!options.xmlMode
					)
				){
					name = name.toLowerCase();
				}

				tokens.push({
					type: "attribute",
					name: name,
					action: actionTypes[data[2]],
					value: unescapeCSS(data[4] || data[5] || ""),
					ignoreCase: !!data[6]
				});

			} else if(firstChar === ":"){
				if(selector.charAt(1) === ":"){
					selector = selector.substr(2);
					tokens.push({type: "pseudo-element", name: getName().toLowerCase()});
					continue;
				}

				selector = selector.substr(1);

				name = getName().toLowerCase();
				data = null;

				if(selector.charAt(0) === "("){
					if(name in unpackPseudos){
						quot = selector.charAt(1);
						var quoted = quot in quotes;

						selector = selector.substr(quoted + 1);

						data = [];
						selector = parseSelector(data, selector, options);

						if(quoted){
							if(selector.charAt(0) !== quot){
								throw new SyntaxError("unmatched quotes in :" + name);
							} else {
								selector = selector.substr(1);
							}
						}

						if(selector.charAt(0) !== ")"){
							throw new SyntaxError("missing closing parenthesis in :" + name + " " + selector);
						}

						selector = selector.substr(1);
					} else {
						var pos = 1, counter = 1;

						for(; counter > 0 && pos < selector.length; pos++){
							if(selector.charAt(pos) === "(" && !isEscaped(pos)) counter++;
							else if(selector.charAt(pos) === ")" && !isEscaped(pos)) counter--;
						}

						if(counter){
							throw new SyntaxError("parenthesis not matched");
						}

						data = selector.substr(1, pos - 2);
						selector = selector.substr(pos);

						if(name in stripQuotesFromPseudos){
							quot = data.charAt(0);

							if(quot === data.slice(-1) && quot in quotes){
								data = data.slice(1, -1);
							}

							data = unescapeCSS(data);
						}
					}
				}

				tokens.push({type: "pseudo", name: name, data: data});
			} else if(re_name.test(selector)){
				name = getName();

				if(!options || ("lowerCaseTags" in options ? options.lowerCaseTags : !options.xmlMode)){
					name = name.toLowerCase();
				}

				tokens.push({type: "tag", name: name});
			} else {
				if(tokens.length && tokens[tokens.length - 1].type === "descendant"){
					tokens.pop();
				}
				addToken(subselects, tokens);
				return selector;
			}
		}
	}

	addToken(subselects, tokens);

	return selector;
}

function addToken(subselects, tokens){
	if(subselects.length > 0 && tokens.length === 0){
		throw new SyntaxError("empty sub-selector");
	}

	subselects.push(tokens);
}


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/node_modules/domutils/index.js":
/*!********************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/node_modules/domutils/index.js ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DomUtils = module.exports;

[
	__webpack_require__(/*! ./lib/stringify */ "../../util/sugar/node_modules/renderkid/node_modules/domutils/lib/stringify.js"),
	__webpack_require__(/*! ./lib/traversal */ "../../util/sugar/node_modules/renderkid/node_modules/domutils/lib/traversal.js"),
	__webpack_require__(/*! ./lib/manipulation */ "../../util/sugar/node_modules/renderkid/node_modules/domutils/lib/manipulation.js"),
	__webpack_require__(/*! ./lib/querying */ "../../util/sugar/node_modules/renderkid/node_modules/domutils/lib/querying.js"),
	__webpack_require__(/*! ./lib/legacy */ "../../util/sugar/node_modules/renderkid/node_modules/domutils/lib/legacy.js"),
	__webpack_require__(/*! ./lib/helpers */ "../../util/sugar/node_modules/renderkid/node_modules/domutils/lib/helpers.js")
].forEach(function(ext){
	Object.keys(ext).forEach(function(key){
		DomUtils[key] = ext[key].bind(DomUtils);
	});
});


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/node_modules/domutils/lib/helpers.js":
/*!**************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/node_modules/domutils/lib/helpers.js ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removeSubsets
// Given an array of nodes, remove any member that is contained by another.
exports.removeSubsets = function(nodes) {
	var idx = nodes.length, node, ancestor, replace;

	// Check if each node (or one of its ancestors) is already contained in the
	// array.
	while (--idx > -1) {
		node = ancestor = nodes[idx];

		// Temporarily remove the node under consideration
		nodes[idx] = null;
		replace = true;

		while (ancestor) {
			if (nodes.indexOf(ancestor) > -1) {
				replace = false;
				nodes.splice(idx, 1);
				break;
			}
			ancestor = ancestor.parent;
		}

		// If the node has been found to be unique, re-insert it.
		if (replace) {
			nodes[idx] = node;
		}
	}

	return nodes;
};

// Source: http://dom.spec.whatwg.org/#dom-node-comparedocumentposition
var POSITION = {
	DISCONNECTED: 1,
	PRECEDING: 2,
	FOLLOWING: 4,
	CONTAINS: 8,
	CONTAINED_BY: 16
};

// Compare the position of one node against another node in any other document.
// The return value is a bitmask with the following values:
//
// document order:
// > There is an ordering, document order, defined on all the nodes in the
// > document corresponding to the order in which the first character of the
// > XML representation of each node occurs in the XML representation of the
// > document after expansion of general entities. Thus, the document element
// > node will be the first node. Element nodes occur before their children.
// > Thus, document order orders element nodes in order of the occurrence of
// > their start-tag in the XML (after expansion of entities). The attribute
// > nodes of an element occur after the element and before its children. The
// > relative order of attribute nodes is implementation-dependent./
// Source:
// http://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-document-order
//
// @argument {Node} nodaA The first node to use in the comparison
// @argument {Node} nodeB The second node to use in the comparison
//
// @return {Number} A bitmask describing the input nodes' relative position.
//         See http://dom.spec.whatwg.org/#dom-node-comparedocumentposition for
//         a description of these values.
var comparePos = exports.compareDocumentPosition = function(nodeA, nodeB) {
	var aParents = [];
	var bParents = [];
	var current, sharedParent, siblings, aSibling, bSibling, idx;

	if (nodeA === nodeB) {
		return 0;
	}

	current = nodeA;
	while (current) {
		aParents.unshift(current);
		current = current.parent;
	}
	current = nodeB;
	while (current) {
		bParents.unshift(current);
		current = current.parent;
	}

	idx = 0;
	while (aParents[idx] === bParents[idx]) {
		idx++;
	}

	if (idx === 0) {
		return POSITION.DISCONNECTED;
	}

	sharedParent = aParents[idx - 1];
	siblings = sharedParent.children;
	aSibling = aParents[idx];
	bSibling = bParents[idx];

	if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
		if (sharedParent === nodeB) {
			return POSITION.FOLLOWING | POSITION.CONTAINED_BY;
		}
		return POSITION.FOLLOWING;
	} else {
		if (sharedParent === nodeA) {
			return POSITION.PRECEDING | POSITION.CONTAINS;
		}
		return POSITION.PRECEDING;
	}
};

// Sort an array of nodes based on their relative position in the document and
// remove any duplicate nodes. If the array contains nodes that do not belong
// to the same document, sort order is unspecified.
//
// @argument {Array} nodes Array of DOM nodes
//
// @returns {Array} collection of unique nodes, sorted in document order
exports.uniqueSort = function(nodes) {
	var idx = nodes.length, node, position;

	nodes = nodes.slice();

	while (--idx > -1) {
		node = nodes[idx];
		position = nodes.indexOf(node);
		if (position > -1 && position < idx) {
			nodes.splice(idx, 1);
		}
	}
	nodes.sort(function(a, b) {
		var relative = comparePos(a, b);
		if (relative & POSITION.PRECEDING) {
			return -1;
		} else if (relative & POSITION.FOLLOWING) {
			return 1;
		}
		return 0;
	});

	return nodes;
};


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/node_modules/domutils/lib/legacy.js":
/*!*************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/node_modules/domutils/lib/legacy.js ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ElementType = __webpack_require__(/*! domelementtype */ "../../util/sugar/node_modules/domelementtype/index.js");
var isTag = exports.isTag = ElementType.isTag;

exports.testElement = function(options, element){
	for(var key in options){
		if(!options.hasOwnProperty(key));
		else if(key === "tag_name"){
			if(!isTag(element) || !options.tag_name(element.name)){
				return false;
			}
		} else if(key === "tag_type"){
			if(!options.tag_type(element.type)) return false;
		} else if(key === "tag_contains"){
			if(isTag(element) || !options.tag_contains(element.data)){
				return false;
			}
		} else if(!element.attribs || !options[key](element.attribs[key])){
			return false;
		}
	}
	return true;
};

var Checks = {
	tag_name: function(name){
		if(typeof name === "function"){
			return function(elem){ return isTag(elem) && name(elem.name); };
		} else if(name === "*"){
			return isTag;
		} else {
			return function(elem){ return isTag(elem) && elem.name === name; };
		}
	},
	tag_type: function(type){
		if(typeof type === "function"){
			return function(elem){ return type(elem.type); };
		} else {
			return function(elem){ return elem.type === type; };
		}
	},
	tag_contains: function(data){
		if(typeof data === "function"){
			return function(elem){ return !isTag(elem) && data(elem.data); };
		} else {
			return function(elem){ return !isTag(elem) && elem.data === data; };
		}
	}
};

function getAttribCheck(attrib, value){
	if(typeof value === "function"){
		return function(elem){ return elem.attribs && value(elem.attribs[attrib]); };
	} else {
		return function(elem){ return elem.attribs && elem.attribs[attrib] === value; };
	}
}

function combineFuncs(a, b){
	return function(elem){
		return a(elem) || b(elem);
	};
}

exports.getElements = function(options, element, recurse, limit){
	var funcs = Object.keys(options).map(function(key){
		var value = options[key];
		return key in Checks ? Checks[key](value) : getAttribCheck(key, value);
	});

	return funcs.length === 0 ? [] : this.filter(
		funcs.reduce(combineFuncs),
		element, recurse, limit
	);
};

exports.getElementById = function(id, element, recurse){
	if(!Array.isArray(element)) element = [element];
	return this.findOne(getAttribCheck("id", id), element, recurse !== false);
};

exports.getElementsByTagName = function(name, element, recurse, limit){
	return this.filter(Checks.tag_name(name), element, recurse, limit);
};

exports.getElementsByTagType = function(type, element, recurse, limit){
	return this.filter(Checks.tag_type(type), element, recurse, limit);
};


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/node_modules/domutils/lib/manipulation.js":
/*!*******************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/node_modules/domutils/lib/manipulation.js ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.removeElement = function(elem){
	if(elem.prev) elem.prev.next = elem.next;
	if(elem.next) elem.next.prev = elem.prev;

	if(elem.parent){
		var childs = elem.parent.children;
		childs.splice(childs.lastIndexOf(elem), 1);
	}
};

exports.replaceElement = function(elem, replacement){
	var prev = replacement.prev = elem.prev;
	if(prev){
		prev.next = replacement;
	}

	var next = replacement.next = elem.next;
	if(next){
		next.prev = replacement;
	}

	var parent = replacement.parent = elem.parent;
	if(parent){
		var childs = parent.children;
		childs[childs.lastIndexOf(elem)] = replacement;
	}
};

exports.appendChild = function(elem, child){
	child.parent = elem;

	if(elem.children.push(child) !== 1){
		var sibling = elem.children[elem.children.length - 2];
		sibling.next = child;
		child.prev = sibling;
		child.next = null;
	}
};

exports.append = function(elem, next){
	var parent = elem.parent,
		currNext = elem.next;

	next.next = currNext;
	next.prev = elem;
	elem.next = next;
	next.parent = parent;

	if(currNext){
		currNext.prev = next;
		if(parent){
			var childs = parent.children;
			childs.splice(childs.lastIndexOf(currNext), 0, next);
		}
	} else if(parent){
		parent.children.push(next);
	}
};

exports.prepend = function(elem, prev){
	var parent = elem.parent;
	if(parent){
		var childs = parent.children;
		childs.splice(childs.lastIndexOf(elem), 0, prev);
	}

	if(elem.prev){
		elem.prev.next = prev;
	}
	
	prev.parent = parent;
	prev.prev = elem.prev;
	prev.next = elem;
	elem.prev = prev;
};




/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/node_modules/domutils/lib/querying.js":
/*!***************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/node_modules/domutils/lib/querying.js ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isTag = __webpack_require__(/*! domelementtype */ "../../util/sugar/node_modules/domelementtype/index.js").isTag;

module.exports = {
	filter: filter,
	find: find,
	findOneChild: findOneChild,
	findOne: findOne,
	existsOne: existsOne,
	findAll: findAll
};

function filter(test, element, recurse, limit){
	if(!Array.isArray(element)) element = [element];

	if(typeof limit !== "number" || !isFinite(limit)){
		limit = Infinity;
	}
	return find(test, element, recurse !== false, limit);
}

function find(test, elems, recurse, limit){
	var result = [], childs;

	for(var i = 0, j = elems.length; i < j; i++){
		if(test(elems[i])){
			result.push(elems[i]);
			if(--limit <= 0) break;
		}

		childs = elems[i].children;
		if(recurse && childs && childs.length > 0){
			childs = find(test, childs, recurse, limit);
			result = result.concat(childs);
			limit -= childs.length;
			if(limit <= 0) break;
		}
	}

	return result;
}

function findOneChild(test, elems){
	for(var i = 0, l = elems.length; i < l; i++){
		if(test(elems[i])) return elems[i];
	}

	return null;
}

function findOne(test, elems){
	var elem = null;

	for(var i = 0, l = elems.length; i < l && !elem; i++){
		if(!isTag(elems[i])){
			continue;
		} else if(test(elems[i])){
			elem = elems[i];
		} else if(elems[i].children.length > 0){
			elem = findOne(test, elems[i].children);
		}
	}

	return elem;
}

function existsOne(test, elems){
	for(var i = 0, l = elems.length; i < l; i++){
		if(
			isTag(elems[i]) && (
				test(elems[i]) || (
					elems[i].children.length > 0 &&
					existsOne(test, elems[i].children)
				)
			)
		){
			return true;
		}
	}

	return false;
}

function findAll(test, elems){
	var result = [];
	for(var i = 0, j = elems.length; i < j; i++){
		if(!isTag(elems[i])) continue;
		if(test(elems[i])) result.push(elems[i]);

		if(elems[i].children.length > 0){
			result = result.concat(findAll(test, elems[i].children));
		}
	}
	return result;
}


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/node_modules/domutils/lib/stringify.js":
/*!****************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/node_modules/domutils/lib/stringify.js ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ElementType = __webpack_require__(/*! domelementtype */ "../../util/sugar/node_modules/domelementtype/index.js"),
    getOuterHTML = __webpack_require__(/*! dom-serializer */ "../../util/sugar/node_modules/dom-serializer/index.js"),
    isTag = ElementType.isTag;

module.exports = {
	getInnerHTML: getInnerHTML,
	getOuterHTML: getOuterHTML,
	getText: getText
};

function getInnerHTML(elem, opts){
	return elem.children ? elem.children.map(function(elem){
		return getOuterHTML(elem, opts);
	}).join("") : "";
}

function getText(elem){
	if(Array.isArray(elem)) return elem.map(getText).join("");
	if(isTag(elem) || elem.type === ElementType.CDATA) return getText(elem.children);
	if(elem.type === ElementType.Text) return elem.data;
	return "";
}


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/node_modules/domutils/lib/traversal.js":
/*!****************************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/node_modules/domutils/lib/traversal.js ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var getChildren = exports.getChildren = function(elem){
	return elem.children;
};

var getParent = exports.getParent = function(elem){
	return elem.parent;
};

exports.getSiblings = function(elem){
	var parent = getParent(elem);
	return parent ? getChildren(parent) : [elem];
};

exports.getAttributeValue = function(elem, name){
	return elem.attribs && elem.attribs[name];
};

exports.hasAttrib = function(elem, name){
	return !!elem.attribs && hasOwnProperty.call(elem.attribs, name);
};

exports.getName = function(elem){
	return elem.name;
};


/***/ }),

/***/ "../../util/sugar/node_modules/renderkid/node_modules/strip-ansi/index.js":
/*!**********************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/renderkid/node_modules/strip-ansi/index.js ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(/*! ansi-regex */ "../../util/sugar/node_modules/renderkid/node_modules/ansi-regex/index.js")();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};


/***/ }),

/***/ "../../util/sugar/node_modules/safe-buffer/index.js":
/*!************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/safe-buffer/index.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(/*! buffer */ "../../util/sugar/node_modules/node-libs-browser/node_modules/buffer/index.js")
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ "../../util/sugar/node_modules/string_decoder/lib/string_decoder.js":
/*!****************************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/string_decoder/lib/string_decoder.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var Buffer = __webpack_require__(/*! safe-buffer */ "../../util/sugar/node_modules/safe-buffer/index.js").Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),

/***/ "../../util/sugar/node_modules/tslib/tslib.es6.js":
/*!**********************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/tslib/tslib.es6.js ***!
  \**********************************************************************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "../../util/sugar/node_modules/tty-browserify/index.js":
/*!***************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/tty-browserify/index.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.isatty = function () { return false; };

function ReadStream() {
  throw new Error('tty.ReadStream is not implemented');
}
exports.ReadStream = ReadStream;

function WriteStream() {
  throw new Error('tty.ReadStream is not implemented');
}
exports.WriteStream = WriteStream;


/***/ }),

/***/ "../../util/sugar/node_modules/utila/lib/Emitter.js":
/*!************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/utila/lib/Emitter.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.6.3
var Emitter, array;

array = __webpack_require__(/*! ./array */ "../../util/sugar/node_modules/utila/lib/array.js");

module.exports = Emitter = (function() {
  function Emitter() {
    this._listeners = {};
    this._listenersForAnyEvent = [];
    this._disabledEmitters = {};
  }

  Emitter.prototype.on = function(eventName, listener) {
    if (this._listeners[eventName] == null) {
      this._listeners[eventName] = [];
    }
    this._listeners[eventName].push(listener);
    return this;
  };

  Emitter.prototype.once = function(eventName, listener) {
    var cb, ran,
      _this = this;
    ran = false;
    cb = function() {
      if (ran) {
        return;
      }
      ran = true;
      listener();
      return setTimeout(function() {
        return _this.removeEvent(eventName, cb);
      }, 0);
    };
    this.on(eventName, cb);
    return this;
  };

  Emitter.prototype.onAnyEvent = function(listener) {
    this._listenersForAnyEvent.push(listener);
    return this;
  };

  Emitter.prototype.removeEvent = function(eventName, listener) {
    if (this._listeners[eventName] == null) {
      return this;
    }
    array.pluckOneItem(this._listeners[eventName], listener);
    return this;
  };

  Emitter.prototype.removeListeners = function(eventName) {
    if (this._listeners[eventName] == null) {
      return this;
    }
    this._listeners[eventName].length = 0;
    return this;
  };

  Emitter.prototype.removeAllListeners = function() {
    var listeners, name, _ref;
    _ref = this._listeners;
    for (name in _ref) {
      listeners = _ref[name];
      listeners.length = 0;
    }
    return this;
  };

  Emitter.prototype._emit = function(eventName, data) {
    var listener, _i, _j, _len, _len1, _ref, _ref1;
    _ref = this._listenersForAnyEvent;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      listener = _ref[_i];
      listener.call(this, data, eventName);
    }
    if (this._listeners[eventName] == null) {
      return;
    }
    _ref1 = this._listeners[eventName];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      listener = _ref1[_j];
      listener.call(this, data);
    }
  };

  Emitter.prototype._throttleEmitterMethod = function(fnName, time) {
    var lastCallArgs, originalFn, pend, pending, runIt, timer,
      _this = this;
    if (time == null) {
      time = 1000;
    }
    originalFn = this[fnName];
    if (typeof originalFn !== 'function') {
      throw Error("this class does not have a method called '" + fnName + "'");
    }
    lastCallArgs = null;
    pending = false;
    timer = null;
    this[fnName] = function() {
      lastCallArgs = arguments;
      return pend();
    };
    pend = function() {
      if (pending) {
        clearTimeout(timer);
      }
      timer = setTimeout(runIt, time);
      return pending = true;
    };
    return runIt = function() {
      pending = false;
      return originalFn.apply(_this, lastCallArgs);
    };
  };

  Emitter.prototype._disableEmitter = function(fnName) {
    if (this._disabledEmitters[fnName] != null) {
      throw Error("" + fnName + " is already a disabled emitter");
    }
    this._disabledEmitters[fnName] = this[fnName];
    return this[fnName] = function() {};
  };

  Emitter.prototype._enableEmitter = function(fnName) {
    var fn;
    fn = this._disabledEmitters[fnName];
    if (fn == null) {
      throw Error("" + fnName + " is not a disabled emitter");
    }
    this[fnName] = fn;
    return delete this._disabledEmitters[fnName];
  };

  return Emitter;

})();


/***/ }),

/***/ "../../util/sugar/node_modules/utila/lib/_common.js":
/*!************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/utila/lib/_common.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.6.3
var common;

module.exports = common = {
  /*
  	Checks to see if o is an object, and it isn't an instance
  	of some class.
  */

  isBareObject: function(o) {
    if ((o != null) && o.constructor === Object) {
      return true;
    }
    return false;
  },
  /*
  	Returns type of an object, including:
  	undefined, null, string, number, array,
  	arguments, element, textnode, whitespace, and object
  */

  typeOf: function(item) {
    var _ref;
    if (item === null) {
      return 'null';
    }
    if (typeof item !== 'object') {
      return typeof item;
    }
    if (Array.isArray(item)) {
      return 'array';
    }
    if (item.nodeName) {
      if (item.nodeType === 1) {
        return 'element';
      }
      if (item.nodeType === 3) {
        return (_ref = /\S/.test(item.nodeValue)) != null ? _ref : {
          'textnode': 'whitespace'
        };
      }
    } else if (typeof item.length === 'number') {
      if (item.callee) {
        return 'arguments';
      }
    }
    return typeof item;
  },
  clone: function(item, includePrototype) {
    if (includePrototype == null) {
      includePrototype = false;
    }
    switch (common.typeOf(item)) {
      case 'array':
        return common._cloneArray(item, includePrototype);
      case 'object':
        return common._cloneObject(item, includePrototype);
      default:
        return item;
    }
  },
  /*
  	Deep clone of an object.
  	From MooTools
  */

  _cloneObject: function(o, includePrototype) {
    var clone, key;
    if (includePrototype == null) {
      includePrototype = false;
    }
    if (common.isBareObject(o)) {
      clone = {};
      for (key in o) {
        clone[key] = common.clone(o[key], includePrototype);
      }
      return clone;
    } else {
      if (!includePrototype) {
        return o;
      }
      if (o instanceof Function) {
        return o;
      }
      clone = Object.create(o.constructor.prototype);
      for (key in o) {
        if (o.hasOwnProperty(key)) {
          clone[key] = common.clone(o[key], includePrototype);
        }
      }
      return clone;
    }
  },
  /*
  	Deep clone of an array.
  	From MooTools
  */

  _cloneArray: function(a, includePrototype) {
    var clone, i;
    if (includePrototype == null) {
      includePrototype = false;
    }
    i = a.length;
    clone = new Array(i);
    while (i--) {
      clone[i] = common.clone(a[i], includePrototype);
    }
    return clone;
  }
};


/***/ }),

/***/ "../../util/sugar/node_modules/utila/lib/array.js":
/*!**********************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/utila/lib/array.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.6.3
var array;

module.exports = array = {
  /*
  	Tries to turn anything into an array.
  */

  from: function(r) {
    return Array.prototype.slice.call(r);
  },
  /*
  	Clone of an array. Properties will be shallow copies.
  */

  simpleClone: function(a) {
    return a.slice(0);
  },
  shallowEqual: function(a1, a2) {
    var i, val, _i, _len;
    if (!(Array.isArray(a1) && Array.isArray(a2) && a1.length === a2.length)) {
      return false;
    }
    for (i = _i = 0, _len = a1.length; _i < _len; i = ++_i) {
      val = a1[i];
      if (a2[i] !== val) {
        return false;
      }
    }
    return true;
  },
  pluck: function(a, i) {
    var index, value, _i, _len;
    if (a.length < 1) {
      return a;
    }
    for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
      value = a[index];
      if (index > i) {
        a[index - 1] = a[index];
      }
    }
    a.length = a.length - 1;
    return a;
  },
  pluckItem: function(a, item) {
    var index, removed, value, _i, _len;
    if (a.length < 1) {
      return a;
    }
    removed = 0;
    for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
      value = a[index];
      if (value === item) {
        removed++;
        continue;
      }
      if (removed !== 0) {
        a[index - removed] = a[index];
      }
    }
    if (removed > 0) {
      a.length = a.length - removed;
    }
    return a;
  },
  pluckOneItem: function(a, item) {
    var index, reached, value, _i, _len;
    if (a.length < 1) {
      return a;
    }
    reached = false;
    for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
      value = a[index];
      if (!reached) {
        if (value === item) {
          reached = true;
          continue;
        }
      } else {
        a[index - 1] = a[index];
      }
    }
    if (reached) {
      a.length = a.length - 1;
    }
    return a;
  },
  pluckByCallback: function(a, cb) {
    var index, removed, value, _i, _len;
    if (a.length < 1) {
      return a;
    }
    removed = 0;
    for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
      value = a[index];
      if (cb(value, index)) {
        removed++;
        continue;
      }
      if (removed !== 0) {
        a[index - removed] = a[index];
      }
    }
    if (removed > 0) {
      a.length = a.length - removed;
    }
    return a;
  },
  pluckMultiple: function(array, indexesToRemove) {
    var i, removedSoFar, _i, _len;
    if (array.length < 1) {
      return array;
    }
    removedSoFar = 0;
    indexesToRemove.sort();
    for (_i = 0, _len = indexesToRemove.length; _i < _len; _i++) {
      i = indexesToRemove[_i];
      this.pluck(array, i - removedSoFar);
      removedSoFar++;
    }
    return array;
  },
  injectByCallback: function(a, toInject, shouldInject) {
    var i, len, val, valA, valB, _i, _len;
    valA = null;
    valB = null;
    len = a.length;
    if (len < 1) {
      a.push(toInject);
      return a;
    }
    for (i = _i = 0, _len = a.length; _i < _len; i = ++_i) {
      val = a[i];
      valA = valB;
      valB = val;
      if (shouldInject(valA, valB, toInject)) {
        return a.splice(i, 0, toInject);
      }
    }
    a.push(toInject);
    return a;
  },
  injectInIndex: function(a, index, toInject) {
    var i, len, toPut, toPutNext;
    len = a.length;
    i = index;
    if (len < 1) {
      a.push(toInject);
      return a;
    }
    toPut = toInject;
    toPutNext = null;
    for(; i <= len; i++){

			toPutNext = a[i];

			a[i] = toPut;

			toPut = toPutNext;

		};
    return null;
  }
};


/***/ }),

/***/ "../../util/sugar/node_modules/utila/lib/classic.js":
/*!************************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/utila/lib/classic.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.6.3
var classic,
  __slice = [].slice;

module.exports = classic = {};

classic.implement = function() {
  var classProto, classReference, desc, member, mixin, mixins, _i, _j, _len;
  mixins = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), classReference = arguments[_i++];
  for (_j = 0, _len = mixins.length; _j < _len; _j++) {
    mixin = mixins[_j];
    classProto = classReference.prototype;
    for (member in mixin.prototype) {
      if (!Object.getOwnPropertyDescriptor(classProto, member)) {
        desc = Object.getOwnPropertyDescriptor(mixin.prototype, member);
        Object.defineProperty(classProto, member, desc);
      }
    }
  }
  return classReference;
};

classic.mix = function() {
  var classProto, classReference, desc, member, mixin, mixins, _i, _j, _len;
  mixins = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), classReference = arguments[_i++];
  classProto = classReference.prototype;
  classReference.__mixinCloners = [];
  classReference.__applyClonersFor = function(instance, args) {
    var cloner, _j, _len, _ref;
    if (args == null) {
      args = null;
    }
    _ref = classReference.__mixinCloners;
    for (_j = 0, _len = _ref.length; _j < _len; _j++) {
      cloner = _ref[_j];
      cloner.apply(instance, args);
    }
  };
  classReference.__mixinInitializers = [];
  classReference.__initMixinsFor = function(instance, args) {
    var initializer, _j, _len, _ref;
    if (args == null) {
      args = null;
    }
    _ref = classReference.__mixinInitializers;
    for (_j = 0, _len = _ref.length; _j < _len; _j++) {
      initializer = _ref[_j];
      initializer.apply(instance, args);
    }
  };
  classReference.__mixinQuitters = [];
  classReference.__applyQuittersFor = function(instance, args) {
    var quitter, _j, _len, _ref;
    if (args == null) {
      args = null;
    }
    _ref = classReference.__mixinQuitters;
    for (_j = 0, _len = _ref.length; _j < _len; _j++) {
      quitter = _ref[_j];
      quitter.apply(instance, args);
    }
  };
  for (_j = 0, _len = mixins.length; _j < _len; _j++) {
    mixin = mixins[_j];
    if (!(mixin.constructor instanceof Function)) {
      throw Error("Mixin should be a function");
    }
    for (member in mixin.prototype) {
      if (member.substr(0, 11) === '__initMixin') {
        classReference.__mixinInitializers.push(mixin.prototype[member]);
        continue;
      } else if (member.substr(0, 11) === '__clonerFor') {
        classReference.__mixinCloners.push(mixin.prototype[member]);
        continue;
      } else if (member.substr(0, 12) === '__quitterFor') {
        classReference.__mixinQuitters.push(mixin.prototype[member]);
        continue;
      }
      if (!Object.getOwnPropertyDescriptor(classProto, member)) {
        desc = Object.getOwnPropertyDescriptor(mixin.prototype, member);
        Object.defineProperty(classProto, member, desc);
      }
    }
  }
  return classReference;
};


/***/ }),

/***/ "../../util/sugar/node_modules/utila/lib/object.js":
/*!***********************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/utila/lib/object.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.6.3
var object, _common,
  __hasProp = {}.hasOwnProperty;

_common = __webpack_require__(/*! ./_common */ "../../util/sugar/node_modules/utila/lib/_common.js");

module.exports = object = {
  isBareObject: _common.isBareObject.bind(_common),
  /*
  	if object is an instance of a class
  */

  isInstance: function(what) {
    return !this.isBareObject(what);
  },
  /*
  	Alias to _common.typeOf
  */

  typeOf: _common.typeOf.bind(_common),
  /*
  	Alias to _common.clone
  */

  clone: _common.clone.bind(_common),
  /*
  	Empties an object of its properties.
  */

  empty: function(o) {
    var prop;
    for (prop in o) {
      if (o.hasOwnProperty(prop)) {
        delete o[prop];
      }
    }
    return o;
  },
  /*
  	Empties an object. Doesn't check for hasOwnProperty, so it's a tiny
  	bit faster. Use it for plain objects.
  */

  fastEmpty: function(o) {
    var property;
    for (property in o) {
      delete o[property];
    }
    return o;
  },
  /*
  	Overrides values fomr `newValues` on `base`, as long as they
  	already exist in base.
  */

  overrideOnto: function(base, newValues) {
    var key, newVal, oldVal;
    if (!this.isBareObject(newValues) || !this.isBareObject(base)) {
      return base;
    }
    for (key in base) {
      oldVal = base[key];
      newVal = newValues[key];
      if (newVal === void 0) {
        continue;
      }
      if (typeof newVal !== 'object' || this.isInstance(newVal)) {
        base[key] = this.clone(newVal);
      } else {
        if (typeof oldVal !== 'object' || this.isInstance(oldVal)) {
          base[key] = this.clone(newVal);
        } else {
          this.overrideOnto(oldVal, newVal);
        }
      }
    }
    return base;
  },
  /*
  	Takes a clone of 'base' and runs #overrideOnto on it
  */

  override: function(base, newValues) {
    return this.overrideOnto(this.clone(base), newValues);
  },
  append: function(base, toAppend) {
    return this.appendOnto(this.clone(base), toAppend);
  },
  appendOnto: function(base, toAppend) {
    var key, newVal, oldVal;
    if (!this.isBareObject(toAppend) || !this.isBareObject(base)) {
      return base;
    }
    for (key in toAppend) {
      if (!__hasProp.call(toAppend, key)) continue;
      newVal = toAppend[key];
      if (newVal === void 0) {
        continue;
      }
      if (typeof newVal !== 'object' || this.isInstance(newVal)) {
        base[key] = newVal;
      } else {
        oldVal = base[key];
        if (typeof oldVal !== 'object' || this.isInstance(oldVal)) {
          base[key] = this.clone(newVal);
        } else {
          this.appendOnto(oldVal, newVal);
        }
      }
    }
    return base;
  },
  groupProps: function(obj, groups) {
    var def, defs, grouped, key, name, shouldAdd, val, _i, _len;
    grouped = {};
    for (name in groups) {
      defs = groups[name];
      grouped[name] = {};
    }
    grouped['rest'] = {};
    top: //;
    for (key in obj) {
      val = obj[key];
      shouldAdd = false;
      for (name in groups) {
        defs = groups[name];
        if (!Array.isArray(defs)) {
          defs = [defs];
        }
        for (_i = 0, _len = defs.length; _i < _len; _i++) {
          def = defs[_i];
          if (typeof def === 'string') {
            if (key === def) {
              shouldAdd = true;
            }
          } else if (def instanceof RegExp) {
            if (def.test(key)) {
              shouldAdd = true;
            }
          } else if (def instanceof Function) {
            if (def(key)) {
              shouldAdd = true;
            }
          } else {
            throw Error('Group definitions must either\
						be strings, regexes, or functions.');
          }
          if (shouldAdd) {
            grouped[name][key] = val;
            continue top;
          }
        }
      }
      grouped['rest'][key] = val;
    }
    return grouped;
  }
};


/***/ }),

/***/ "../../util/sugar/node_modules/utila/lib/string.js":
/*!***********************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/utila/lib/string.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.6.3
module.exports = {
  pad: function(n, width, z) {
    if (z == null) {
      z = '0';
    }
    n = n + '';
    if (n.length >= width) {
      return n;
    } else {
      return new Array(width - n.length + 1).join(z) + n;
    }
  }
};


/***/ }),

/***/ "../../util/sugar/node_modules/utila/lib/utila.js":
/*!**********************************************************************************************************!*\
  !*** /Users/olivierbossel/Home/web/coffeekraken/coffeekraken/util/sugar/node_modules/utila/lib/utila.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.6.3
var utila;

module.exports = utila = {
  array: __webpack_require__(/*! ./array */ "../../util/sugar/node_modules/utila/lib/array.js"),
  classic: __webpack_require__(/*! ./classic */ "../../util/sugar/node_modules/utila/lib/classic.js"),
  object: __webpack_require__(/*! ./object */ "../../util/sugar/node_modules/utila/lib/object.js"),
  string: __webpack_require__(/*! ./string */ "../../util/sugar/node_modules/utila/lib/string.js"),
  Emitter: __webpack_require__(/*! ./Emitter */ "../../util/sugar/node_modules/utila/lib/Emitter.js")
};


/***/ }),

/***/ "../../util/sugar/node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _coffeekraken_sugar_js_webcomponent_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @coffeekraken/sugar/js/webcomponent/register */ "../../util/sugar/js/webcomponent/register.js");
/* harmony import */ var _coffeekraken_sugar_js_webcomponent_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_coffeekraken_sugar_js_webcomponent_register__WEBPACK_IMPORTED_MODULE_0__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class SFiltrableInputWebComponent extends Object(_coffeekraken_sugar_js_webcomponent_register__WEBPACK_IMPORTED_MODULE_0__["SLitHtmlWebComponent"])(HTMLInputElement) {
  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor() {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(settings);
  }

}

_defineProperty(SFiltrableInputWebComponent, "props", {
  items: {
    type: 'Array<Object>',
    required: true,
    physical: true,
    default: [{
      name: 'hello'
    }]
  }
});

Object(_coffeekraken_sugar_js_webcomponent_register__WEBPACK_IMPORTED_MODULE_0__["define"])('SFiltrableInput', SFiltrableInputWebComponent, {});

/***/ }),

/***/ 0:
/*!*********************************!*\
  !*** readable-stream (ignored) ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=index.js.map