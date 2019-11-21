"use strict";

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = processExample;

function processExample(example) {
  // replace the \@ used in certain languages
  example = example.replace(/\\@/g, "@"); // replace the \/ used in certain languages for docblocks inside examples

  example = example.replace(/\\\/\*/g, "/*").replace(/\*\\\//g, "*/"); // trim

  example = example.trim(); // return result

  return example;
}

module.exports = exports.default;