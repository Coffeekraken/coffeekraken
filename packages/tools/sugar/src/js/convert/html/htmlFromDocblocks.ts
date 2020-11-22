import __SError from '../../error/SError';
import __deepMerge from '../../object/deepMerge';
import __SDocblock from '../../docblock/SDocblock';

/**
 * @name            htmlFromDocblocks
 * @namespace       sugar.js.convert
 * @type            Function
 *
 * Take a markdown string as input and convert it to HTML.
 *
 * @param       {String}          inputString         The input string to convert to HTML
 * @param       {Object}          [settings={}]       An object of settings to configure your conversion process:
 * @return      {String}                              The HTML converted result
 *
 * @example       js
 * import htmlFromDocblocks from '@coffeekraken/sugar/js/convert/html/htmlFromDocblocks';
 * htmlFromDocblocks(`
 *  \/\*\*
 *   * @name    Hello world
 *  \*\/
 * `);
 * // <h1>Hello world</h1>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function htmlFromDocblocks(inputString, settings = {}) {
  settings = __deepMerge({}, settings);
  const sDocblock = new __SDocblock(inputString, settings);
  return sDocblock.toHtml(settings);
}
