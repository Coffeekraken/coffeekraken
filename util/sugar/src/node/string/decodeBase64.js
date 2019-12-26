/**
 * @name              decodeBase64
 * @namespace         sugar.node.string
 * @type              Function
 *
 * Encode a string to base64
 *
 * @param         {String}          string          The string to encode
 * @return        {String}                          The encoded base64 string
 *
 * @example       js
 * const decodeBase64 = require('@coffeekraken/node/string/decodeBase64');
 * console.log(decodeBase64('SGVsbG8gV29ybGQ=')); // => Hello World
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function decodeBase64(string) {
  let buff = new Buffer(string, 'base64');
  return buff.toString('ascii');
}
