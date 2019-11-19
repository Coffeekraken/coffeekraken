"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = analyzePhpLine;

/**
 * Analyze the next php line and set some tag properties if needed
 * @param 		{String} 		line 			The line to analyze
 * @param 		{Object} 		data 			The tag object on which to set the values as you want
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function analyzePhpLine(line, data) {
  // process the line
  line = line.trim();
  if (!line) return; // private

  if (line.match("private ")) {
    data.private = true;
  } // protected


  if (line.match("protected ")) {
    data.protected = true;
  } // public


  if (line.match("public ")) {
    data.public = true;
  } // static


  if (line.match("static ")) {
    data.static = true;
  } // constructor


  if (line.match("__construct")) {
    data.constructor = true;
  }

  var _l = line.replace("(", " ").replace(")", " ").replace(",", " ").replace("{", " ").replace("}", " ").replace("=", " ").trim();

  var splits = _l.split(/\s+/); // if is a class, gather some metas informations like implements, extends, etc...


  if (line.match("class ")) {
    // extends
    if (typeof data.extends === "undefined") {
      var extendsIdx = splits.indexOf("extends");

      if (extendsIdx != -1) {
        // get the extend name
        if (splits[extendsIdx + 1]) {
          data.extends = splits[extendsIdx + 1];
        }
      }
    } // implements


    if (typeof data.implements === "undefined") {
      var implementsIdx = splits.indexOf("implements");

      if (implementsIdx != -1) {
        // get the implements names
        var implementsStack = [];

        for (var i = implementsIdx + 1; i < splits.length; i++) {
          implementsStack.push(splits[i]);
        }

        if (implementsStack.length) {
          data.implements = implementsStack;
        }
      }
    }
  } // name


  if (!data.name) {
    // find the name
    for (var _i = 0; _i < splits.length; _i++) {
      var val = splits[_i];

      if (val !== "function" && val !== "public" && val !== "protected" && val !== "private" && val !== "static" && val !== "object" && val !== "class" && val !== "var") {
        // it's the name
        data.name = val;
        break;
      }
    }
  } // default


  var defaultSplits = line.match(/^([a-zA-Z0-9$_\s]+)\s?(=)\s?([\s\S]+)(,|;|\n)$/m);

  if (defaultSplits && defaultSplits.length === 5) {
    // process default
    if (!data.name) {
      data.name = defaultSplits[1].replace("public", "").replace("private", "").replace("protected", "").trim();
    } // default variable


    if (!data.default) {
      data.default = defaultSplits[3].trim().replace(/^('|")/, "").replace(/(;|,)?$/, "").replace(/('|")?$/, "");
    }
  }
}

module.exports = exports.default;