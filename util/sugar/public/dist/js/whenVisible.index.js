(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["whenVisible"],{

/***/ "../src/js/dom/closestNotVisible.js":
/*!******************************************!*\
  !*** ../src/js/dom/closestNotVisible.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = closestNotVisible;

var _isVisible = _interopRequireDefault(__webpack_require__(/*! ./isVisible */ "../src/js/dom/isVisible.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @name        closestNotVisible
 * @namespace       sugar.js.dom
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
    if (!(0, _isVisible["default"])(elm)) {
      return elm;
    }

    elm = elm.parentNode;
  }

  return null;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/dom/isVisible.js":
/*!**********************************!*\
  !*** ../src/js/dom/isVisible.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isVisible;

/**
 * @name      isVisible
 * @namespace     sugar.js.dom
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
  if (elm.nodeName.toLowerCase() === "script") return true; // get style

  var style = window.getComputedStyle(elm, null),
      opacity = style["opacity"],
      visibility = style["visibility"],
      display = style["display"];
  return "0" !== opacity && "none" !== display && "hidden" !== visibility;
}

window.__isVisible = isVisible;
module.exports = exports.default;

/***/ }),

/***/ "../src/js/dom/whenVisible.js":
/*!************************************!*\
  !*** ../src/js/dom/whenVisible.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = whenVisible;

var _isVisible = _interopRequireDefault(__webpack_require__(/*! ./isVisible */ "../src/js/dom/isVisible.js"));

var _closestNotVisible = _interopRequireDefault(__webpack_require__(/*! ./closestNotVisible */ "../src/js/dom/closestNotVisible.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @name      whenVisible
 * @namespace     sugar.js.dom
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
  return new Promise(function (resolve, reject) {
    // variables
    var isSelfVisible = false,
        areParentsVisible = false,
        closestNotVisible = null,
        selfObserver = null,
        parentObserver = null;

    var _cb = function _cb() {
      if (isSelfVisible && areParentsVisible) {
        // process callbacks
        if (cb) cb(elm);
        resolve(elm); // remove the event listeners

        elm.removeEventListener("transitionend", _eventCb);
        elm.removeEventListener("animationstart", _eventCb);
        elm.removeEventListener("animationend", _eventCb); // remove the event listeners

        if (closestNotVisible) {
          closestNotVisible.removeEventListener("transitionend", _eventCb);
          closestNotVisible.removeEventListener("animationstart", _eventCb);
          closestNotVisible.removeEventListener("animationend", _eventCb);
        }
      }
    }; // function called on each transitionend, start, etc...


    var _eventCb = function _eventCb(e) {
      // wait just a little time to check again
      setTimeout(function () {
        if (e.target === elm) {
          if ((0, _isVisible["default"])(elm)) {
            isSelfVisible = true;

            if (selfObserver && selfObserver.disconnect) {
              selfObserver.disconnect();
            } // remove the event listeners


            elm.removeEventListener("transitionend", _eventCb);
            elm.removeEventListener("animationstart", _eventCb);
            elm.removeEventListener("animationend", _eventCb);
          }
        } else if (e.target === closestNotVisible) {
          if ((0, _isVisible["default"])(closestNotVisible)) {
            areParentsVisible = true;

            if (parentObserver && parentObserver.disconnect) {
              parentObserver.disconnect();
            } // remove the event listeners


            closestNotVisible.removeEventListener("transitionend", _eventCb);
            closestNotVisible.removeEventListener("animationstart", _eventCb);
            closestNotVisible.removeEventListener("animationend", _eventCb);
          }
        } // callback


        _cb();
      });
    }; // check if element itself is not visible


    if (!(0, _isVisible["default"])(elm)) {
      selfObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          // check that is the style whos changed
          if (mutation.attributeName === "style" || mutation.attributeName === "class") {
            // check if is visible
            if ((0, _isVisible["default"])(mutation.target)) {
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

      elm.addEventListener("animationstart", _eventCb);
      elm.addEventListener("animationend", _eventCb);
      elm.addEventListener("transitionend", _eventCb);
    } else {
      isSelfVisible = true;
    } // get the closest not visible element
    // if found, we monitor it to check when it is visible


    closestNotVisible = (0, _closestNotVisible["default"])(elm);

    if (closestNotVisible) {
      parentObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          // check that is the style whos changed
          if (mutation.attributeName === "style" || mutation.attributeName === "class") {
            // check if is visible
            if ((0, _isVisible["default"])(mutation.target)) {
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

      closestNotVisible.addEventListener("animationstart", _eventCb);
      closestNotVisible.addEventListener("animationend", _eventCb);
      closestNotVisible.addEventListener("transitionend", _eventCb);
    } else {
      areParentsVisible = true;
    } // callback


    _cb();
  });
}

module.exports = exports.default;

/***/ })

}]);
//# sourceMappingURL=whenVisible.index.js.map