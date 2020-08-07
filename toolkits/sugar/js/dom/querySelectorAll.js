"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = querySelectorAll;

var _isVisible = _interopRequireDefault(require("./isVisible"));

var _isInViewport = _interopRequireDefault(require("./isInViewport"));

var _closestNotVisible = _interopRequireDefault(require("./closestNotVisible"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      querySelectorAll
 * @namespace           js.dom
 * @type      Function
 *
 * Enhanced proxy of the Element.querySelectorAll function that let you specify
 * if you want elements that are visible, or even that are in the viewport
 *
 * @param 		{String} 				selector 			The css selector to search
 * @param 		{Object} 				settings	 		The settings of the query
 * @return 		{Array}<HTMLElement> 						The founded elements
 *
 * @example 	js
 * import querySelectorAll from '@coffeekraken/sugar/js/dom/querySelectorAll';
 * // simple query
 * const elms = querySelectorAll('.a-cool-css-selector');
 *
 * // get elements that are in the viewport
 * const elms = querySelectorAll('.a-cool-css-selector', {
 * 		inViewport : true
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

/**
 * If we want only visible elements
 * @setting
 * @name 		visible
 * @type 		{Boolean}
 * @default 	false
 */

/**
 * If we want only elements that are in the viewport
 * @setting
 * @name 		inViewport
 * @type 		{Boolean}
 * @default 	false
 */

/**
 * The root node to start the query from
 * @setting
 * @name 		rootNode
 * @type 		{HTMLElement}
 * @default 	document.body
 */
function querySelectorAll(selector, settings = {}) {
  // extend settings
  settings = {
    visible: null,
    inViewport: null,
    rootNode: document.body,
    ...settings
  }; // results array

  const results = []; // grab the element into the dom

  const elms = settings.rootNode.querySelectorAll(selector); // loop on the found elements

  [].forEach.call(elms, elm => {
    // check settings
    if (settings.visible) {
      if (!(0, _isVisible.default)(elm) || !(0, _closestNotVisible.default)(elm)) return;
    }

    if (settings.inViewport) {
      if (!(0, _isInViewport.default)(elm)) return;
    } // add the element to the result array


    results.push(elm);
  }); // return the elements

  return results;
}

module.exports = exports.default;