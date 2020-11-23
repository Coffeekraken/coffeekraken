import __clipboardy from 'clipboardy';
import __toString from '../string/toString';

/**
 * @name            copy
 * @namespace       sugar.node.clipboard
 * @type            Function
 *
 * Simple function to copy things into the system clipboard.
 * This is using https://www.npmjs.com/package/clipboardy under the hood.
 *
 * @param       {String}      text        The text to copy
 *
 * @example       js
 * import copy from '@coffeekraken/sugar/node/clipboard/copy';
 * copy('Hello world');
 *
 * @since       2.0.0
 * @see         https://www.npmjs.com/package/clipboardy
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function copy(text) {
  text = __toString(text);
  __clipboardy.writeSync(text);
}
