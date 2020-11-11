"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whenOutOfViewport;

var _isInViewport2 = _interopRequireDefault(require("./isInViewport"));

var _throttle = _interopRequireDefault(require("../function/throttle"));

var _closest = _interopRequireDefault(require("./closest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO tests

/**
 * @name      whenOutOfViewport
 * @namespace           sugar.js.dom
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
function whenOutOfViewport(elm, offset) {
  if (offset === void 0) {
    offset = 50;
  }

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

      var _isInViewport = true,
          _cb2 = () => {
        if (!_isInViewport) {
          scrollContainerElm.removeEventListener('scroll', checkViewport);
          window.removeEventListener('resize', checkViewport);
          resolve(elm);
        }
      };

      var checkViewport = (0, _throttle.default)(e => {
        _isInViewport = (0, _isInViewport2.default)(elm, offset);

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