"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = offsetParent;

var _offset = _interopRequireDefault(require("./offset"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      offsetParent
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Get the offset top and left of the passed element from his parent top left point
 *
 * @param 		{HTMLElement} 					elm  		The element to get the offset from
 * @return 		{Object} 									The offset top and left object
 *
 * @example  	js
 * import offsetParent from '@coffeekraken/sugar/js/dom/offsetParent'
 * const offsetParentElm = offsetParent(myCoolElement);
 * // output : { top : 200, left : 300 }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function offsetParent(elm) {
  const parentOffset = (0, _offset.default)(elm.parentNode);
  const offset = (0, _offset.default)(elm);
  return {
    top: offset.top - parentOffset.top,
    left: offset.left - parentOffset.left
  };
}

module.exports = exports.default;