"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = styleString2Object;

var _camelize = _interopRequireDefault(require("../string/camelize"));

var _autoCast = _interopRequireDefault(require("../string/autoCast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      styleString2Object
 * @namespace           js.dom
 * @type      Function
 *
 * Transform a style string to an object representation
 *
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
  if (!style || style === '') return {};
  var obj = {};
  var split = style.replace(/\s/g, '').split(';');
  split.forEach(statement => {
    // split statement by key value pairs
    var spl = statement.split(':'),
        key = (0, _camelize.default)(spl[0]),
        value = spl[1]; // add element into object

    obj[key] = (0, _autoCast.default)(value);
  }); // return the style object

  return obj;
}

module.exports = exports.default;