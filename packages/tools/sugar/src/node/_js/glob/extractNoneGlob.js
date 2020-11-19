"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractNoneGlob;

var _globParent = _interopRequireDefault(require("glob-parent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                extractNoneGlob
 * @namespace           sugar.js.glob
 * @type                Function
 *
 * This function simply return you the none glob part of a passed string
 *
 * @param       {String}            string          The string from which to extract the none glob part
 * @return      {String}                            The none glob part of the passed string
 *
 * @example         js
 * import extractNoneGlob from '@coffeekraken/sugar/js/glob/extractNoneGlob';
 * extractNoneGlob('/coco/hello/*.js'); // => '*.js'
 *
 * @see             https://www.npmjs.com/package/glob-parent
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function extractNoneGlob(string) {
  var parent = (0, _globParent.default)(string);
  return parent;
}

module.exports = exports.default;