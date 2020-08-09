"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mail;

var _replaceTags = _interopRequireDefault(require("../../html/replaceTags"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                              mail
 * @namespace           js.log.htmlPresets
 * @type                              Function
 *
 * Replace all the "log" html tags like "<red>", "<bold>", etc... with the corresponding syntax for mail formating
 *
 * @param                   {String}                      text                        The text to process
 * @return                  {String}                                                  The processed text ready for the terminal
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function mail(text) {
  return (0, _replaceTags.default)(text, {
    black: (tag, content) => "<span style=\"color: black\">".concat(content, "</span>"),
    red: (tag, content) => "<span style=\"color: #FF0000\">".concat(content, "</span>"),
    green: (tag, content) => "<span style=\"color: #008000\">".concat(content, "</span>"),
    yellow: (tag, content) => "<span style=\"color: #F1C40F\">".concat(content, "</span>"),
    blue: (tag, content) => "<span style=\"color: #0000FF\">".concat(content, "</span>"),
    magenta: (tag, content) => "<span style=\"color: #800080\">".concat(content, "</span>"),
    cyan: (tag, content) => "<span style=\"color: #5DADE2\">".concat(content, "</span>"),
    white: (tag, content) => "<span style=\"color: white\">".concat(content, "</span>"),
    bgBlack: (tag, content) => "<span style=\"background-color: black\">".concat(content, "</span>"),
    bgRed: (tag, content) => "<span style=\"background-color: #FF0000\">".concat(content, "</span>"),
    bgGreen: (tag, content) => "<span style=\"background-color: #008000\">".concat(content, "</span>"),
    bgYellow: (tag, content) => "<span style=\"background-color: #F1C40F\">".concat(content, "</span>"),
    bgBlue: (tag, content) => "<span style=\"background-color: #0000FF\">".concat(content, "</span>"),
    bgMagenta: (tag, content) => "<span style=\"background-color: #800080\">".concat(content, "</span>"),
    bgCyan: (tag, content) => "<span style=\"background-color: #5DADE2\">".concat(content, "</span>"),
    bgWhite: (tag, content) => "<span style=\"background-color: white\">".concat(content, "</span>"),
    bold: (tag, content) => "<span style=\"font-weight: bold;\">".concat(content, "</span>"),
    dim: (tag, content) => "<span style=\"\">".concat(content, "</span>"),
    italic: (tag, content) => "<span style=\"font-style: italic;\">".concat(content, "</span>"),
    underline: (tag, content) => "<span style=\"font-style: underline;\">".concat(content, "</span>"),
    strike: (tag, content) => "<span text-decoration=\"line-through;\">".concat(content, "</span>"),
    br: (tag, content) => '<br />'
  });
}

module.exports = exports.default;