"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = querySelector;

var _isVisible = _interopRequireDefault(require("./isVisible"));

var _isInViewport = _interopRequireDefault(require("./isInViewport"));

var _closestNotVisible = _interopRequireDefault(require("./closestNotVisible"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name      querySelector
 * @namespace           sugar.js.dom
 * @type      Function
 *
 * Enhanced proxy of the Element.querySelector function that let you specify
 * if you want an element that is visible, or even that is in the viewport
 *
 * @param 		{String} 			selector 			The css selector to search
 * @param 		{Object} 			settings	 		The settings of the query
 * @return 		{HTMLElement} 							The founded element
 *
 * @example 	js
 * import querySelector from '@coffeekraken/sugar/js/dom/querySelector';
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
function querySelector(selector, settings) {
  if (settings === void 0) {
    settings = {};
  }

  // extend settings
  settings = _objectSpread({
    visible: null,
    inViewport: null,
    rootNode: document.body
  }, settings); // grab the element into the dom

  var elm = settings.rootNode.querySelector(selector); // if no element, stop here

  if (!elm) return null; // state tracking

  var isVisible = true;
  var isInViewport = true; // check settings

  if (settings.visible) {
    if (!(0, _isVisible.default)(elm) || !(0, _closestNotVisible.default)(elm)) return null;
  }

  if (settings.inViewport) {
    if (!(0, _isInViewport.default)(elm)) return null;
  } // return the element


  return elm;
}

module.exports = exports.default;