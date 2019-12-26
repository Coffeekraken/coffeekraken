"use strict";

/**
 * @name              encodeBase64
 * @namespace         sugar.node.string
 * @type              Function
 *
 * Encode a string to base64
 *
 * @param         {String}          string          The string to encode
 * @return        {String}                          The encoded base64 string
 *
 * @example       js
 * const encodeBase64 = require('@coffeekraken/node/string/encodeBase64');
 * console.log(encodeBase64('Hello World')); // => SGVsbG8gV29ybGQ=
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function encodeBase64(string) {
  return Buffer.from(string).toString('base64');
};