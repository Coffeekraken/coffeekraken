// @ts-nocheck

/**
 * @name        rtrim
 * @namespace           sugar.js.string
 * @type      Function
 * @stable
 *
 * Trim right a specified string
 *
 * @param    {String}    string    The string to trim
 * @param    {String}    needle    The string to find an cut out if found
 * @param     {Boolean}     [trimResult=true]       Specify if you want to trim the trimed string
 * @return    {String}    The trimed string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import rtrim from '@coffeekraken/sugar/js/string/rtrim'
 * rtrim('Hello World', 'ld') // Hello Wor
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function rtrim(string, needle, trimResult = true) {
  if (string.substr(needle.length * -1) === needle) {
    if (trimResult) {
      return string.substr(0, string.length - needle.length).trim();
    } else {
      return string.substr(0, string.length - needle.length);
    }
  }
  // nothing to trim
  return string;
}
export default rtrim;
