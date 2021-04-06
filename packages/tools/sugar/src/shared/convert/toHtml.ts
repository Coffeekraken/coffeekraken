// @ts-nocheck

import __deepMerge from '../object/deepMerge';
import __htmlFromMarkdown from './html/htmlFromMarkdown';
import __htmlFromDocblocks from './html/htmlFromDocblocks';

/**
 * @name            toHtml
 * @namespace       sugar.js.convert
 * @type            Function
 * @status              wip
 *
 * Take a string as input and convert it to HTML.
 *
 * @feature        2.0.0       Supported input types: markdown, docblocks
 * @feature        2.0.0       Try to detect the type automatically. For safer results, specify the "from" setting.
 *
 * @param       {String}          inputString         The input string to convert to HTML
 * @param       {Object}          [settings={}]       An object of settings to configure your conversion process:
 * - from (null) {String}: Specify the type of the input string like "markdown", "dockblocks", and more coming...
 * @return      {String}                              The HTML converted result
 *
 * @todo        interface
 * @todo        doc
 *
 * @example       js
 * import toHtml from '@coffeekraken/sugar/js/convert/toHtml';
 * toHtml(`
 *  # Hello world
 *  How are you?
 * `);
 * // <h1>Hello world</h1>
 * // <p>How are you</p>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const supportedFromTypes = ['markdown', 'docblocks'];
const convertersByType = {
  markdown: __htmlFromMarkdown,
  docblocks: __htmlFromDocblocks
};
function toHtml(inputString, settings = {}) {
  settings = __deepMerge(
    {
      from: null
    },
    settings
  );

  // check if we don't have the "from" setting
  if (!settings.from) {
    // check if is markdown
    if (inputString.match(/\s?#{1,6}\s?.*/g)) settings.from = 'markdown';
    else if (inputString.match(/(<!--|\/\*{2})([\s\S]+?)(\*\/|-->)/g))
      settings.from = 'docblocks';
    else {
      throw new Error(
        `Sorry but the passed inputString does not match any supported type which are: ${supportedFromTypes.join(
          ','
        )}`
      );
    }
  }

  // convert the string from the correct type
  const converterFn = convertersByType[settings.from];

  if (!converterFn) {
    throw new Error(
      `It seems that no converter exists for your inputString which is of type "<yellow>${settings.from}</yellow>"...`
    );
  }

  return converterFn(inputString, settings);
}
export default toHtml;
