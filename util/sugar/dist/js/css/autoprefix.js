"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = autoprefix;

var _htmlAutoprefixer = _interopRequireDefault(require("html-autoprefixer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name          autoprefix
 * @namespace      sugar.js.css
 * @type           Function
 *
 * Prefix all the css found in the passed HTML string and return the prefixed version
 *
 * @param           {String}          html            The HTML code to process
 * @return          {String}                          The prefixed version of the passed code
 *
 * @example       js
 * import autoprefix from '@coffeekraken/js/css/autoprefix';
 * console.log(autoprefix('<style>:fullscreen a { color: red; }</style>'));
 * // => <style>:-webkit-full-screen a { color: red; }</style>
 *
 * @see         https://github.com/devinus/html-autoprefixer
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function autoprefix(html) {
  return _htmlAutoprefixer.default.process(html);
}

module.exports = exports.default;