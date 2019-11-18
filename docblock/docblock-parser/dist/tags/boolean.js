"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = booleanTag;
/**
 * Set the tag data
 * @param 		{String} 		name 			The tag name to process
 * @param 		{Array}			splits 			An array of values found on the tag line
 * @param 		{Object} 		data 			The tag object on which to set the values as you want
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function booleanTag(name, splits, data) {
  data[name] = true;
}
module.exports = exports["default"];