// @ts-nocheck

import __clipboardy from 'clipboardy';
import __toString from '../../shared/string/toString';
import __ncp from 'copy-paste';

/**
 * @name            copy
 * @namespace       sugar.node.clipboard
 * @type            Function
 * @stable
 *
 * Simple function to copy things into the system clipboard.
 * This is using https://www.npmjs.com/package/clipboardy under the hood.
 *
 * @param       {String}      text        The text to copy
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import copy from '@coffeekraken/sugar/node/clipboard/copy';
 * copy('Hello world');
 *
 * @since       2.0.0
 * @see         https://www.npmjs.com/package/clipboardy
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function copy(text) {
  text = __toString(text);
  try {
    __clipboardy.writeSync(text);
  } catch (e) {
    __ncp.copy(text);
  }
}
export default copy;
