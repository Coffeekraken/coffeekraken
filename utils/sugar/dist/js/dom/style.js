"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = style;

var _uncamelize = _interopRequireDefault(require("../utils/strings/uncamelize"));

var _styleString2Object = _interopRequireDefault(require("./styleString2Object"));

var _styleObject2String = _interopRequireDefault(require("./styleObject2String"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Set or remove a css style property on an HTMLElement
 *
 * @name 		style
 * @param 		{HTMLElement} 			elm 			The element to process
 * @param 		{Object} 				styleObj 		An object of style to apply
 * @return 		(Object) 								The element applied style
 *
 * @example 	js
 * import style from 'sugarcss/js/dom/style'
 * style(myCoolHTMLElement, {
 * 		paddingLeft : 20,
 * 		display : null
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function style(elm, styleObj) {
  // convert style string to object
  const styleAttr = elm.getAttribute("style");

  if (styleAttr) {
    styleObj = { ...(0, _styleString2Object.default)(styleAttr),
      ...styleObj
    };
  } // apply the style to the element
  // elm.setAttribute('style', __styleObject2String(current.styleObj));


  elm.style.cssText = (0, _styleObject2String.default)(styleObj); // return the style

  return elm.style;
}

module.exports = exports.default;