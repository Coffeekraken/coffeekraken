"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = querySelector;

var _isVisible = _interopRequireDefault(require("./isVisible"));

var _isInViewport = _interopRequireDefault(require("./isInViewport"));

var _closestNotVisible = _interopRequireDefault(require("./closestNotVisible"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Enhanced proxy of the Element.querySelector function that let you specify
 * if you want an element that is visible, or even that is in the viewport
 *
 * @name 		querySelector
 * @param 		{String} 			selector 			The css selector to search
 * @param 		{Object} 			settings	 		The settings of the query
 * @return 		{HTMLElement} 							The founded element
 *
 * @example 	js
 * // simple query
 * const elm = querySelector('.a-cool-css-selector');
 *
 * // get an element that is in the viewport
 * const elm = querySelector('.a-cool-css-selector', {
 * 		inViewport : true
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

/**
 * If we want only a visible element
 * @setting
 * @name 		visible
 * @type 		{Boolean}
 * @default 	false
 */

/**
 * If we want only an element that is in the viewport
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
function querySelector(selector, settings = {}) {
  // extend settings
  settings = {
    visible: null,
    inViewport: null,
    rootNode: document.body,
    ...settings
  }; // grab the element into the dom

  const elm = settings.rootNode.querySelector(selector); // if no element, stop here

  if (!elm) return null; // state tracking

  let isVisible = true;
  let isInViewport = true; // check settings

  if (settings.visible) {
    if (!(0, _isVisible.default)(elm) || !(0, _closestNotVisible.default)(elm)) return null;
  }

  if (settings.inViewport) {
    if (!(0, _isInViewport.default)(elm)) return null;
  } // return the element


  return elm;
}

module.exports = exports.default;