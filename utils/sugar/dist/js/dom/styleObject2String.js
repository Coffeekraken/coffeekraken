"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = styleObject2String;

var _uncamelize = _interopRequireDefault(require("../utils/strings/uncamelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Transform a style object to inline string separated by ;
 *
 * @name 		styleObject2String
 * @param 		{Object} 				styleObj 		An object of style to apply
 * @return 		(String) 								The string style representation
 *
 * @example 	js
 * import styleObject2String from 'coffeekraken-sugar/js/dom/styleObject2String'
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
      propertiesArray.push("".concat((0, _uncamelize.default)(key), ":").concat(value, ";"));
    }
  } // return the css text


  return propertiesArray.join(" ");
}

module.exports = exports.default;