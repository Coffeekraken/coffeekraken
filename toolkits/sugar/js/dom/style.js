"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = style;

var _uncamelize = _interopRequireDefault(require("../string/uncamelize"));

var _styleString2Object = _interopRequireDefault(require("./styleString2Object"));

var _styleObject2String = _interopRequireDefault(require("./styleObject2String"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name      style
 * @namespace           js.dom
 * @type      Function
 *
 * Set or remove a css style property on an HTMLElement
 *
 * @param 		{HTMLElement} 			elm 			The element to process
 * @param 		{Object} 				styleObj 		An object of style to apply
 * @return 		(Object) 								The element applied style
 *
 * @example 	js
 * import style from '@coffeekraken/sugar/js/dom/style'
 * style(myCoolHTMLElement, {
 * 		paddingLeft : 20,
 * 		display : null
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function style(elm, styleObj) {
  // convert style string to object
  var styleAttr = elm.getAttribute('style');

  if (styleAttr) {
    styleObj = _objectSpread(_objectSpread({}, (0, _styleString2Object.default)(styleAttr)), styleObj);
  } // apply the style to the element
  // elm.setAttribute('style', __styleObject2String(current.styleObj));


  elm.style.cssText = (0, _styleObject2String.default)(styleObj); // return the style

  return elm.style;
}

module.exports = exports.default;