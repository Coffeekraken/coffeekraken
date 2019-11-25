"use strict";

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = styleString2Object;

var _camelize = _interopRequireDefault(require("../utils/strings/camelize"));

var _autoCast = _interopRequireDefault(require("../utils/strings/autoCast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Transform a style string to an object representation
 *
 * @name 		styleString2Object
 * @param 		{String} 				style 			The style string
 * @return 		(Object) 								The string object representation
 *
 * @example 	js
 * import styleString2Object from '@coffeekraken/sugar/js/dom/styleString2Object'
 * const styleString = styleString2Object('padding-left:20px; display:block;');
 * // output => {
 * //		paddingLeft : '20px',
 * // 		display : 'block'
 * // }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function styleString2Object(style) {
  if (!style || style === "") return {};
  let obj = {};
  const split = style.replace(/\s/g, "").split(";");
  split.forEach(statement => {
    // split statement by key value pairs
    const spl = statement.split(":"),
          key = (0, _camelize.default)(spl[0]),
          value = spl[1]; // add element into object

    obj[key] = (0, _autoCast.default)(value);
  }); // return the style object

  return obj;
}

module.exports = exports.default;