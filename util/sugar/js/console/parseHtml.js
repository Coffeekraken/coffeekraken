"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseHtml;

var _replaceTags = _interopRequireDefault(require("../html/replaceTags"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chalk.default.level = 3;
/**
 * @name                                parseHtml
 * @namespace           js.console
 * @type                                Function
 *
 * Parse the simple html tags to format the console message
 *
 * @param           {String|Array}                  message                 The message to format of an array of messages to format
 * @return          {String}                                          The formated message
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function parseHtml(message) {
  let isArray = false;

  if (Array.isArray(message)) {
    isArray = true;
  } else {
    message = [message];
  }

  message = message.map(m => {
    return (0, _replaceTags.default)(m, {
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
  });
  if (isArray) return message;
  return message[0];
}

module.exports = exports.default;