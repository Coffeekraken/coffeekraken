"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = htmlFromMarkdown;

var _SError = _interopRequireDefault(require("../../error/SError"));

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

var _marked = _interopRequireDefault(require("marked"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name            htmlFromMarkdown
 * @namespace       sugar.js.convert
 * @type            Function
 *
 * Take a markdown string as input and convert it to HTML.
 *
 * @param       {String}          inputString         The input string to convert to HTML
 * @param       {Object}          [settings={}]       An object of settings to configure your conversion process. All the ```marked``` settings are supported
 * @return      {String}                              The HTML converted result
 *
 * @example       js
 * import htmlFromMarkdown from '@coffeekraken/sugar/js/convert/html/htmlFromMarkdown';
 * htmlFromMarkdown(`
 *  # Hello world
 *  How are you?
 * `);
 * // <h1>Hello world</h1>
 * // <p>How are you</p>
 *
 * @since       2.0.0
 * @see       https://marked.js.org/#/README.md
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function htmlFromMarkdown(inputString, settings) {
  if (settings === void 0) {
    settings = {};
  }

  settings = (0, _deepMerge.default)({}, settings);

  _marked.default.setOptions(settings);

  return (0, _marked.default)(inputString);
}

module.exports = exports.default;