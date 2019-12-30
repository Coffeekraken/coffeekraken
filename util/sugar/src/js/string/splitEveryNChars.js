/**
 * @name              splitEveryNChars
 * @namespace         sugar.js.string
 * @type              Function
 *
 * Split a string every n characters and return an array of the splited parts
 *
 * @param           {String}            string            The string to split
 * @param           {Integer}           n                 At how many characters to split the string
 * @return          {Array}                               An array of the splited string parts
 *
 * @example       js
 * import splitEveryNChars from '@coffeekraken/sugar/js/string/splitEveryNChars';
 * splitEveryNChars('abcabcabcabcabcabcabc', 3); // => ['abc','abc','abc','abc','abc','abc','abc']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function splitEveryNChars(string, n) {
  var result = [];
  for (var i = 0; i < string.length; i += n) {
    result.push(string.substr(i, n));
  }
  return result;
}
