// @ts-nocheck

import __clipboardy from 'clipboardy';
import __ncp from 'copy-paste';
import __toString from '../../shared/string/toString';

/**
 * @name            copy
 * @namespace            node.clipboard
 * @type            Function
 * @platform        node
 * @status          beta
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
 * import { __copy } from '@coffeekraken/sugar/clipboard';
 * __copy('Hello world');
 *
 * @since       2.0.0
 * @see         https://www.npmjs.com/package/clipboardy
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
