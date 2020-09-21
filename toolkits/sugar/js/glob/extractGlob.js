"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractGlob;

var _globParent = _interopRequireDefault(require("glob-parent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                extractGlob
 * @namespace           sugar.js.glob
 * @type                Function
 *
 * This function simply return you the glob part of a passed string
 *
 * @param       {String}            string          The string from which to extract the glob part
 * @return      {String}                            The glob part of the passed string
 *
 * @example         js
 * import extractGlob from '@coffeekraken/sugar/js/glob/extractGlob';
 * extractGlob('/coco/hello/*.js'); // => '*.js'
 *
 * @see             https://www.npmjs.com/package/glob-parent
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function extractGlob(string) {
  var parent = (0, _globParent.default)(string);
  var final = string.replace(parent, '');
  if (final.slice(0, 1) === '/') final = final.slice(1);
  return final;
}

module.exports = exports.default;