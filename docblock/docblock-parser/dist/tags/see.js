"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = seeTag;

/**
 * Set the see data
 * @param 		{String} 		name 			The see name to process
 * @param 		{Array}			splits 			An array of values found on the see line
 * @param 		{Object} 		data 			The see object on which to set the values as you want
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function seeTag(name, splits, data) {
  // protect
  if (!splits || splits.length < 1) {
    // invalid tag
    return;
  }

  data[name] = {
    url: splits[0],
    label: splits[1] || "See more"
  };
}

module.exports = exports.default;