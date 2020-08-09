"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseHtml;
exports.tagsMap = void 0;

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

var tagsMap = {
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
  h1: (tag, content) => {
    return _chalk.default.underline(_chalk.default.bold(content)) + '\n\n';
  },
  h2: (tag, content) => {
    return _chalk.default.bold(content) + '\n';
  },
  iWarn: (tag, content) => parseHtml('<yellow>⚠</yellow> '),
  iCheck: (tag, content) => parseHtml("<green>\u2713</green> "),
  iCross: (tag, content) => parseHtml("<red>\u2716</red> "),
  iClose: (tag, content) => "\u2716",
  iStart: (tag, content) => parseHtml("<green>\u2023</green> "),
  date: (tag, content) => new Date().getDate().toString().padStart('0', 2) + '-' + (new Date().getMonth() + 1).toString().padStart('0', 2) + '-' + new Date().getFullYear().toString().padStart('0', 2),
  time: (tag, content) => new Date().getHours().toString().padStart('0', 2) + ':' + new Date().getMinutes().toString().padStart('0', 2) + ':' + new Date().getMinutes().toString().padStart('0', 2),
  day: (tag, content) => new Date().getDate().toString().padStart('0', 2),
  days: (tag, content) => new Date().getDate().toString().padStart('0', 2),
  month: (tag, content) => new Date().getMonth().toString().padStart('0', 2),
  months: (tag, content) => new Date().getMonth().toString().padStart('0', 2),
  year: (tag, content) => new Date().getFullYear().toString().padStart('0', 2),
  years: (tag, content) => new Date().getFullYear().toString().padStart('0', 2),
  hour: (tag, content) => new Date().getHours().toString().padStart('0', 2),
  hours: (tag, content) => new Date().getHours().toString().padStart('0', 2),
  minute: (tag, content) => new Date().getMinutes().toString().padStart('0', 2),
  minutes: (tag, content) => new Date().getMinutes().toString().padStart('0', 2),
  second: (tag, content) => new Date().getSeconds().toString().padStart('0', 2),
  seconds: (tag, content) => new Date().getSeconds().toString().padStart('0', 2),
  br: (tag, content) => '\n'
};
exports.tagsMap = tagsMap;

function parseHtml(message) {
  var isArray = false;

  if (Array.isArray(message)) {
    isArray = true;
  } else {
    message = [message];
  }

  message = message.map(m => {
    return (0, _replaceTags.default)(m, tagsMap);
  });
  if (isArray) return message;
  return message[0];
}