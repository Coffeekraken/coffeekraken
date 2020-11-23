import __SError from '../../error/SError';
import __deepMerge from '../../object/deepMerge';
import __marked from 'marked';

/**
 * @name            htmlFromMarkdown
 * @namespace       sugar.js.convert
 * @type            Function
 * @wip
 *
 * Take a markdown string as input and convert it to HTML.
 *
 * @param       {String}          inputString         The input string to convert to HTML
 * @param       {Object}          [settings={}]       An object of settings to configure your conversion process. All the ```marked``` settings are supported
 * @return      {String}                              The HTML converted result
 *
 * @todo        interface
 * @todo        doc
 *
 * @example       js
 * import htmlFromMarkdown from '@coffeekraken/sugar/js/convert/html/htmlFromMarkdown';
 * htmlFromMarkdown(`
 *  # Hello world
 *  How are you?
 * `);
 * // <h1>Hello world</h1>
 * // <p>How are you</p>
 *
 * @since       2.0.0
 * @see       https://marked.js.org/#/README.md
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function htmlFromMarkdown(inputString, settings = {}) {
  settings = __deepMerge({}, settings);
  __marked.setOptions(settings);
  return __marked(inputString);
}
