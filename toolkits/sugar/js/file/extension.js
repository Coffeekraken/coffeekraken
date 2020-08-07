"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extension;

/**
 * @name                    extension
 * @namespace           js.file
 * @type                    Function
 *
 * Return the passed file path extension
 *
 * @param           {String}            path                The file path to get the extension from
 * @return          {String}                                The file extension
 *
 * @example         js
 * import extension from '@coffeekraken/sugar/js/file/extension';
 * extension('hello/world.jpg'); // => jpg
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function extension(path) {
  return path.split('.').pop();
}

module.exports = exports.default;