"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whenInViewport;

var _inViewport = _interopRequireDefault(require("in-viewport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function whenInViewport(elm, offset) {
  if (offset === void 0) {
    offset = 50;
  }

  return new Promise((resolve, reject) => {
    (0, _inViewport.default)(elm, {
      offset: offset
    }, () => {
      resolve(elm);
    });
  });
}

module.exports = exports.default;