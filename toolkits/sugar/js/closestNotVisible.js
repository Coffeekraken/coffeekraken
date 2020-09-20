"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = closestNotVisible;

var _isVisible = _interopRequireDefault(require("./isVisible"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        closestNotVisible
 * @namespace           sugar.js.dom
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