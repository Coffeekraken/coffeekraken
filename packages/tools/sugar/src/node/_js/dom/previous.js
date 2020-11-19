"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = previous;

var _matches = _interopRequireDefault(require("./matches"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      previous
 * @namespace           sugar.js.dom
 * @type      Function
 *
 * Browse the passed element previous siblings to find the first element that matches the passed selector
 *
 * @param 		{HTMLElement} 					elm  		The element to start on
 * @param 		{String} 						selector 	A css selector to search for
 * @return 		{HTMLElement} 								The element found or null
 *
 * @example  	js
 * import previous from '@coffeekraken/sugar/js/dom/previous'
 * const previousElm = previous(myCoolElement, '.my-cool-class');
 * if (previousElm) {
 * 		// we have found en element that matches the selector
 * }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function previous(elm, selector) {
  elm = elm.previousSibling;

  while (elm) {
    if ((0, _matches.default)(elm, selector)) {
      return elm;
    }

    elm = elm.previousSibling;
  }

  return false;
}

module.exports = exports.default;