"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = htmlFromDocblocks;

var _SError = _interopRequireDefault(require("../../error/SError"));

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

var _SDocblock = _interopRequireDefault(require("../../docblock/SDocblock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name            htmlFromDocblocks
 * @namespace       js.convert
 * @type            Function
 *
 * Take a markdown string as input and convert it to HTML.
 *
 * @param       {String}          inputString         The input string to convert to HTML
 * @param       {Object}          [settings={}]       An object of settings to configure your conversion process:
 * @return      {String}                              The HTML converted result
 *
 * @example       js
 * import htmlFromDocblocks from '@coffeekraken/sugar/js/convert/html/htmlFromDocblocks';
 * htmlFromDocblocks(`
 *  \/\*\*
 *   * @name    Hello world
 *  \*\/
 * `);
 * // <h1>Hello world</h1>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function htmlFromDocblocks(inputString, settings) {
  if (settings === void 0) {
    settings = {};
  }

  settings = (0, _deepMerge.default)({}, settings);
  var sDocblock = new _SDocblock.default(inputString, settings);
  return sDocblock.toHtml(settings);
}

module.exports = exports.default;