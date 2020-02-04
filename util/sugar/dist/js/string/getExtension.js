"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getExtension;

/**
 * @name                    getExtension
 * @namespace               sugar.js.string
 * @type                    Function
 *
 * Return the passed file path extension
 *
 * @param           {String}            path                The file path to get the extension from
 * @return          {String}                                The file extension
 *
 * @example         js
 * import getExtension from '@coffeekraken/sugar/js/string/getExtension';
 * getExtension('hello/world.jpg'); // => jpg
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function getExtension(path) {
  return path.split('.').pop();
}

module.exports = exports.default;