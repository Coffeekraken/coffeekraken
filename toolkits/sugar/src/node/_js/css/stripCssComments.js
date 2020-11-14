"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stripCssComments;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _stripCssComments = _interopRequireDefault(require("strip-css-comments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name          stripCssComments
 * @namespace     sugar.js.css
 * @type          Function
 *
 * This function simply remove all the css comments like:
 * - Multiline blocks css comments begining with /* *, ending with * /
 * - Single line comments begining with //
 *
 * @param       {String}        css         The css code to process
 * @param       {Object}      [settings={}]   An object of settings
 * @return      {String}                    The processed css code
 *
 * @setting     {Boolean}     [block=true]       Remove the blocks comments
 * @setting     {Boolean}     [line=true]       Remove the line comments
 *
 * @todo        tests
 *
 * @example       js
 * import stripCssComments from '@coffeekraken/sugar/js/css/stripCssComments';
 * stripCssComments(`
 * // something cool
 * body { background-color: red; }
 * `);
 * // body { background-color: red }
 *
 * @see         https://www.npmjs.com/package/strip-css-comments
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function stripCssComments(css, settings) {
  if (settings === void 0) {
    settings = {};
  }

  settings = (0, _deepMerge.default)({
    block: true,
    line: true
  }, settings);

  if (settings.block) {
    css = (0, _stripCssComments.default)(css);
  }

  if (settings.line) {
    css = css.replace(/^[\s]{0,99999999}\/\/.*$/gm, '');
  }

  return css;
}

module.exports = exports.default;