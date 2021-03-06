"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = styleObject2String;

var _uncamelize = _interopRequireDefault(require("../string/uncamelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      styleObject2String
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Transform a style object to inline string separated by ;
 *
 * @param 		{Object} 				styleObj 		An object of style to apply
 * @return 		(String) 								The string style representation
 *
 * @example 	js
 * import styleObject2String from '@coffeekraken/sugar/js/dom/styleObject2String'
 * const styleString = styleObject2String({
 * 		paddingLeft : '20px',
 * 		display : 'block'
 * });
 * // output => padding-left:20px; display:block;
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function styleObject2String(styleObj) {
  // process the style object
  let propertiesArray = [];

  for (let key in styleObj) {
    const value = styleObj[key]; // if the value is ''
    // mean that we need to get rid of

    if (value === undefined || value === "") {
      delete styleObj[key];
    } else {
      propertiesArray.push(`${(0, _uncamelize.default)(key)}:${value};`);
    }
  } // return the css text


  return propertiesArray.join(" ");
}

module.exports = exports.default;