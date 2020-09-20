"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trimLines;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name          trimLines
 * @namespace     sugar.js.string
 * @type          Function
 *
 * This function take a string and trim each lines
 *
 * @param       {String}        string        The string to trim lines of
 * @param       {Object}        [settings={}]     An object settings. Here's the object properties:
 * - leftPadding (0) {Number}: Specify a left padding to set. 1 padding represent 1 space character
 * - rightPadding (0) {Number}: Specify a right padding to set.
 * - keepEmptyLines (true) {Boolean}: Specify if you want to keep empty lines or not
 *
 * @example         js
 * import trimLines from '@coffeekraken/sugar/js/string/trimLines';
 * trimLines(`my cool lines
 *      that have some lines to trim
 * and some not...`);
 * // my cool lines
 * // that have some lines to trim
 * // and some not...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function trimLines(string, settings) {
  if (settings === void 0) {
    settings = {};
  }

  settings = (0, _deepMerge.default)({
    leftPadding: 0,
    rightPadding: 0,
    keepEmptyLines: true
  }, settings);
  string = string.split('\n').map(line => {
    line = line.trim();

    if (!settings.keepEmptyLines) {
      if (line === '') return -1;
    }

    if (settings.leftPadding) line = "".concat(' '.repeat(settings.leftPadding)).concat(line);
    if (settings.rightPadding) line = "".concat(line).concat(' '.repeat(settings.rightPadding));
    return line;
  }).filter(line => line !== -1).join('\n');
  return string;
}

module.exports = exports.default;