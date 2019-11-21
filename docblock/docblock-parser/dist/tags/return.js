"use strict";

require("core-js/modules/es.array.map");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = returnTag;

var _upperFirst = _interopRequireDefault(require("../utils/upper-first"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Set the return data
 * @param 		{String} 		name 			The return name to process
 * @param 		{Array}			splits 			An array of values found on the return line
 * @param 		{Object} 		data 			The return object on which to set the values as you want
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function returnTag(name, splits, data) {
  // protect
  if (!splits || splits.length < 2) {
    // invalid tag
    return;
  }

  data["return"] = {
    types: splits[0].replace("{", "").replace("}", "").split(/\||,/).map(function (type) {
      return type.trim();
    }),
    description: splits[1]
  };
}

module.exports = exports.default;