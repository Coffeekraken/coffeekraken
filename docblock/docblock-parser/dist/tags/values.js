"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = typeTag;

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

module.exports = exports.default;