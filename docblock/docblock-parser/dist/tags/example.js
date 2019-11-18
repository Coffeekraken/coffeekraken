'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exampleTag;
/**
 * Set the example data
 * @param 		{String} 		name 			The example name to process
 * @param 		{Array}			splits 			An array of values found on the example line
 * @param 		{Object} 		data 			The example object on which to set the values as you want
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function exampleTag(name, splits, data) {
  var language = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'js';

  data.example = {
    language: splits[0] || language
  };
}
module.exports = exports['default'];