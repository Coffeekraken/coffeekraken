// @ts-nocheck

import __clipboardy from 'clipboardy';

/**
 * @name            read
 * @namespace            node.clipboard
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * Simple function to read things from the system clipboard.
 * This is using https://www.npmjs.com/package/clipboardy under the hood.
 *
 * @return       {String}             The text to read
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import read from '@coffeekraken/sugar/node/clipboard/read';
 * import copy from '@coffeekraken/sugar/node/clipboard/copy';
 * copy('Hello world');
 * read(); // => Hello world
 *
 * @since       2.0.0
 * @see         https://www.npmjs.com/package/clipboardy
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function read() {
    return __clipboardy.readSync();
}
export default read;
