// @ts-nocheck

/**
 * @name        lowerFirst
 * @namespace           sugar.js.string
 * @type      Function
 * @stable
 *
 * Lower first letter
 *
 * @param    {String}    string    The string to lower the first letter
 * @return    {String}    The string with the first letter lowered
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import lowerFirst from '@coffeekraken/sugar/js/string/lowerFirst'
 * lowerFirst('Hello world') // hello world
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function lowerFirst(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}
export = lowerFirst;