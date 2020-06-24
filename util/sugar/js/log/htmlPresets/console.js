"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = console;

var _replaceTags = _interopRequireDefault(require("../../html/replaceTags"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chalk.default.level = 3;
/**
 * @name                              console
 * @namespace           js.log.htmlPresets
 * @type                              Function
 *
 * Replace all the "log" html tags like "<red>", "<bold>", etc... with the corresponding syntax for the terminal
 *
 * @param                   {String}                      text                        The text to process
 * @return                  {String}                                                  The processed text ready for the terminal
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function console(text) {
  return (0, _replaceTags.default)(text, {
    black: (tag, content) => _chalk.default.black(content),
    red: (tag, content) => _chalk.default.red(content),
    green: (tag, content) => _chalk.default.green(content),
    yellow: (tag, content) => _chalk.default.yellow(content),
    blue: (tag, content) => _chalk.default.blue(content),
    magenta: (tag, content) => _chalk.default.magenta(content),
    cyan: (tag, content) => _chalk.default.cyan(content),
    white: (tag, content) => _chalk.default.white(content),
    bgBlack: (tag, content) => _chalk.default.bgBlack(content),
    bgRed: (tag, content) => _chalk.default.bgRed(content),
    bgGreen: (tag, content) => _chalk.default.bgGreen(content),
    bgYellow: (tag, content) => _chalk.default.bgYellow(content),
    bgBlue: (tag, content) => _chalk.default.bgBlue(content),
    bgMagenta: (tag, content) => _chalk.default.bgMagenta(content),
    bgCyan: (tag, content) => _chalk.default.bgCyan(content),
    bgWhite: (tag, content) => _chalk.default.bgWhite(content),
    bold: (tag, content) => _chalk.default.bold(content),
    dim: (tag, content) => _chalk.default.dim(content),
    italic: (tag, content) => _chalk.default.italic(content),
    underline: (tag, content) => _chalk.default.underline(content),
    strike: (tag, content) => _chalk.default.strike(content),
    br: (tag, content) => '\n'
  });
}

module.exports = exports.default;