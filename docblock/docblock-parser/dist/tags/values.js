"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typeTag;
/**
 * Set the values data
 * @param 		{String} 		name 			The type name to process
 * @param 		{Array}			splits 			An array of values found on the type line
 * @param 		{Object} 		data 			The type object on which to set the values as you want
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function typeTag(name, splits, data) {
  // protect
  if (!splits || splits.length !== 1) {
    // invalid tag
    return;
  }
  data.values = splits[0].split(/\||,/).map(function (value) {
    return value.trim();
  });
}
module.exports = exports["default"];