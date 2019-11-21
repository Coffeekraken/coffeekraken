"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whenOutOfViewport;

var _isInViewport = _interopRequireDefault(require("./isInViewport"));

var _throttle = _interopRequireDefault(require("../utils/functions/throttle"));

var _closest = _interopRequireDefault(require("./closest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Monitor an HTMLElement to be notified when it exit the viewport
 *
 * @name 		whenOutOfViewport
 * @param 		{HTMLElement} 				elm 				The element to monitor
 * @param 		{Number} 					[offset=50] 		An offset that represent the distance before entering the viewport for the detection
 * @return 		(Promise) 										The promise that will be resolved when the element exit the viewport
 *
 * @example 	js
 * import whenOutOfViewport from 'coffeekraken-sugar/js/dom/whenOutOfViewport'
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
        rootMargin: "".concat(offset, "px"),
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