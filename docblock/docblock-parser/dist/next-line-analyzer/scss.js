"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = analyzeScssLine;

/**
 * Analyze the next scss line and set some tag properties if needed
 * @param 		{String} 		line 			The line to analyze
 * @param 		{Object} 		data 			The tag object on which to set the values as you want
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function analyzeScssLine(line, data) {
  // process the line
  line = line.trim();
  if (!line) return; // mixin

  if (line.match("@mixin")) {
    data.mixin = true;
  } // function


  if (line.match("@function")) {
    data["function"] = true;
  }

  if (!data.name) {
    var _l = line.replace("(", " ").replace(")", " ").replace("{", " ").replace("}", " ").replace(":", " ").trim();

    var splits = _l.split(/\s+/); // find the name


    for (var i = 0; i < splits.length; i++) {
      var val = splits[i];

      if (val !== "@function" && val !== "@mixin") {
        // it's the name
        data.name = val;
        break;
      }
    }
  } // protected, private, etc...


  if (data.name.substr(0, 1) === "_" && data["public"] === undefined && data["protected"] === undefined && data["private"] === undefined) {
    data["private"] = true;
  } // default


  var defaultSplits = line.match(/^([a-zA-Z0-9$_\s]+)\s?(:)\s?([\s\S]+)(,|;|\n)?$/m);

  if (defaultSplits && defaultSplits.length === 5) {
    // process default
    if (!data.name) {
      data.name = defaultSplits[1];
    } // default variable


    if (!data["default"]) {
      data["default"] = defaultSplits[3].trim().replace(/^('|")/, "").replace(/(;|,)?$/, "").replace(/('|")?$/, "");
    }
  }
}

module.exports = exports.default;