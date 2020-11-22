const __clipboardy = require('clipboardy');

/**
 * @name            paste
 * @namespace       sugar.node.clipboard
 * @type            Function
 *
 * Simple function to paste things from the system clipboard.
 * This is using https://www.npmjs.com/package/clipboardy under the hood.
 *
 * @return       {String}             The text to paste
 *
 * @example       js
 * const paste = require('@coffeekraken/sugar/node/clipboard/paste');
 * const copy = require('@coffeekraken/sugar/node/clipboard/copy');
 * copy('Hello world');
 * past(); // => Hello world
 *
 * @since       2.0.0
 * @see         https://www.npmjs.com/package/clipboardy
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function paste(text) {
  return __clipboardy.readSync();
};
