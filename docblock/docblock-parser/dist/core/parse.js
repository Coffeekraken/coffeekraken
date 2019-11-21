"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parse;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _size2 = _interopRequireDefault(require("lodash/size"));

var _processExample = _interopRequireDefault(require("../utils/processExample"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Parse the given string to extract the docblock in JSON format
 * @param 	{string}		stringToParse 		The string to extract the docblocks JSON from
 * @param 	{string}		[language=null] 	The language of the string to parse (js, scss, etc...)
 * @return 	{JSON}                 			The docblocks in JSON format
 * @example 	js
 * const docblockParser = require('coffeekraken-docblock-parser');
 * const jsonDocblocks = docblockParser({
 * 	// override some configs here
 * }).parse(myStringToParse);
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function parse(stringToParse) {
  var _this = this;

  var language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  try {
    var res = [];
    var data = {};
    var inBlock = false;
    var currentTag = null;
    var currentTagValue = [];
    var _analyzeNextLine = false;
    var lines = [];

    var _language = language || this._config.language || "js"; // split string to into lines


    lines = stringToParse.split("\n"); // loop through lines

    lines.forEach(function (line) {
      // if the line is the first line
      // after a docblock
      if (_analyzeNextLine) {
        if (_this._config.nextLineAnalyzer && _this._config.nextLineAnalyzer[_language]) {
          _this._config.nextLineAnalyzer[_language](line, data);
        }

        _analyzeNextLine = false;
        return;
      } // if we have a new block


      if (line.trim() === "/**") {
        data = {};
        inBlock = true;
        return;
      } else if (line.trim() === "*/") {
        // if we have already a currentTag
        // mean that we have finished to process it
        // and need to add it into result json
        // before handle the next one
        if (currentTag) {
          // check if we have a currentTagValue
          // for the currentTag
          // to add it has a body
          if (currentTagValue.length) {
            if (_typeof(data[currentTag]) === "object") {
              if (currentTag === "example") {
                // process example
                data[currentTag].body = (0, _processExample["default"])(currentTagValue.join("\n"));
              } else {
                data[currentTag].body = currentTagValue.join("\n");
              }
            } else if (!data.body && currentTagValue.join("\n").trim() !== "") {
              data.body = currentTagValue.join("\n");
            }
          } // set the current tag


          currentTagValue = [];
        } // we are at the end of the block
        // so we add the data to the res json
        // and reset some variables


        if ((0, _size2["default"])(data)) {
          res.push(data);
        }

        inBlock = false;
        currentTag = null;
        currentTagValue = []; // set that we can analyze the next line

        _analyzeNextLine = true; // stop here

        return;
      } // if we are not in a docblock
      // we do nothing....


      if (!inBlock) {
        return;
      } // replace the version inside the line


      if (line.match(/\{version\}/g)) {
        line = line.replace(/\{version\}/g, _this._getVersion());
      } // process line


      var rawLine = line;
      line = line.trim().substr(1).trim().replace(/\t+/g, "\t"); // check if the line is a tag one

      if (line.substr(0, 1) === "@") {
        // if we have already a currentTag
        // mean that we have finished to process it
        // and need to add it into result json
        // before handle the next one
        if (currentTag && currentTagValue.length) {
          // check if we have a currentTagValue
          // for the currentTag
          // to add it has a body
          if (_typeof(data[currentTag]) === "object") {
            if (currentTag === "example") {
              // process example
              data[currentTag].body = (0, _processExample["default"])(currentTagValue.join("\n"));
            } else {
              data[currentTag].body = currentTagValue.join("\n");
            }
          } else if (!data.body && currentTagValue.join("\n").trim() !== "") {
            data.body = currentTagValue.join("\n");
          } // set the current tag


          currentTagValue = [];
        } // split the line by tabs


        var splits = line.split(/\t|[\s]{2,}/).map(function (item) {
          return item.trim();
        }); // get the tag name

        var name = splits[0].trim().substr(1); // unshift the name of the splits

        splits.shift(); // process the line

        if (_this._config.tags["@".concat(name)]) {
          _this._config.tags["@".concat(name)](name, splits, data, _language);
        } else {
          // just set that we have this tag
          if (splits.length === 1) {
            data[name] = splits[0];
          } else if (splits.length) {
            data[name] = splits;
          } else {
            data[name] = true;
          } // we do not handle this tag name


          return;
        }

        currentTag = name;
        return;
      } else {
        // the line is not a tag one
        currentTagValue.push(rawLine.trim().replace(/^\t*\*\s?/, ""));

        if (!currentTag) {
          currentTag = "description";
        }
      }
    }); // return the result

    return res;
  } catch (e) {
    console.error("e", e);
  }
}

module.exports = exports.default;