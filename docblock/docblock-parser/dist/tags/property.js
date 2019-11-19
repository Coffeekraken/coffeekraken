"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = propertyTag;

/**
 * Set the property data
 * @param 		{String} 		name 			The param name to process
 * @param 		{Array}			splits 			An array of values found on the param line
 * @param 		{Object} 		data 			The param object on which to set the values as you want
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function propertyTag(name, splits, data) {
  // protect
  if (!splits || splits.length < 3) {
    // invalid tag
    return;
  }

  if (!data.properties) data.properties = [];
  var def = undefined;
  var _name = splits[1];
  var _optional = false;
  var _property = {};

  if (_name.substr(0, 1) === "[" && _name.substr(-1) === "]") {
    var defSplit = _name.substr(1, _name.length - 2).split("=");

    def = defSplit[1];
    _name = defSplit[0];
  }

  _property = {
    name: _name,
    types: splits[0].replace("{", "").replace("}", "").split(/\||,/).map(function (type) {
      return type.trim();
    }),
    description: splits[2]
  };

  if (def !== undefined) {
    _property.default = def;
  }

  data.properties.push(_property);
}

module.exports = exports.default;