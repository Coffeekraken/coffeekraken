"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = implementsTag;
/**
 * Set the implements tag data
 * @param 		{String} 		name 			The one split tag name to process
 * @param 		{Array}			splits 			An array of values found on the one split tag line
 * @param 		{Object} 		data 			The one split tag object on which to set the values as you want
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function implementsTag(name, splits, data) {
  if (splits.length !== 1) return;
  data[name] = splits[0].split(/\||,/).map(function (item) {
    return item.trim();
  });
}
module.exports = exports["default"];