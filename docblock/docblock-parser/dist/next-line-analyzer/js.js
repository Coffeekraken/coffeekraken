"use strict";

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.function.name");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = analyzeJsLine;

/**
 * Analyze the next js line and set some tag properties if needed
 * @param 		{String} 		line 			The line to analyze
 * @param 		{Object} 		data 			The tag object on which to set the values as you want
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function analyzeJsLine(line, data) {
  // process the line
  line = line.trim().replace('"use strict";', "");
  if (!line) return; // static

  if (line.indexOf("static ") !== -1) {
    data["static"] = true;
  } // constructor


  if (line.indexOf("constructor") !== -1) {
    data.constructor = true;
  }

  var _l = line.replace("(", " ").replace(")", " ").replace(",", " ").replace("{", " ").replace("}", " ").replace(":", " ").replace("=", " ").trim();

  var splits = _l.split(/\s+/); // if is a class, gather some metas informations like implements, extends, etc...


  if (line.match("class ")) {
    // extends
    if (typeof data["extends"] === "undefined") {
      var extendsIdx = splits.indexOf("extends");

      if (extendsIdx != -1) {
        // get the extend name
        if (splits[extendsIdx + 1]) {
          data["extends"] = splits[extendsIdx + 1];
        }
      }
    } // implements


    if (typeof data["implements"] === "undefined") {
      var implementsIdx = splits.indexOf("implements");

      if (implementsIdx != -1) {
        // get the implements names
        var implementsStack = [];

        for (var i = implementsIdx + 1; i < splits.length; i++) {
          implementsStack.push(splits[i]);
        }

        if (implementsStack.length) {
          data["implements"] = implementsStack;
        }
      }
    }
  } // name


  if (!data.name) {
    // find the name
    for (var _i = 0; _i < splits.length; _i++) {
      var val = splits[_i];

      if (val !== "function" && val !== "class" && val !== "default" && val !== "export" && val !== "extends" && val !== "import" && val !== "static" && val !== "set" && val !== "get" && val !== "async" && !val.match(".prototype.")) {
        // it's the name
        data.name = val;
        break;
      }
    }
  } // protected, private, etc...


  if (data.name.substr(0, 1) === "_" && data["public"] === undefined && data["protected"] === undefined && data["private"] === undefined) {
    data["private"] = true;
  } // default


  var defaultSplits = line.match(/^([a-zA-Z0-9_\s]+)\s?(=|:)\s?([\s\S]+)(,|;|\n)?$/m);

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