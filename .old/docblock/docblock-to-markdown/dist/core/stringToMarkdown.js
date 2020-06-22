"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stringToMarkdown;

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _docblockParser = _interopRequireDefault(require("@coffeekraken/docblock-parser"));

var _docblockJsonToMarkdown = _interopRequireDefault(require("@coffeekraken/docblock-json-to-markdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToMarkdown(stringToTransform, language = "js") {
  // parse the string
  const json = (0, _docblockParser.default)((0, _merge2.default)({
    language
  }, this._config.docblockParser)).parse(stringToTransform); // transform to markdown

  const markdown = (0, _docblockJsonToMarkdown.default)((0, _merge2.default)({
    language
  }, this._config.docblockJsonToMarkdown)).jsonToMarkdown(json); // return the markdown

  return markdown;
}

module.exports = exports.default;