"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = authorTag;
/**
 * Set the author data
 * @param 		{String} 		name 			The see name to process
 * @param 		{Array}			splits 			An array of values found on the see line
 * @param 		{Object} 		data 			The see object on which to set the values as you want
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function authorTag(name, splits, data) {
  // protect
  if (!splits || splits.length !== 1) {
    // invalid tag
    return;
  }

  // parse the line
  var authorNfo = /^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)/gm.exec(splits[0]);
  if (!authorNfo) return;
  data.author = {
    name: authorNfo[1]
  };
  if (authorNfo[2]) {
    data.author.email = authorNfo[2];
  }
  if (authorNfo[3]) {
    data.author.url = authorNfo[3];
  }
}
module.exports = exports["default"];