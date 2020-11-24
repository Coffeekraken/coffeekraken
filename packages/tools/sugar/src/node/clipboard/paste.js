"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const clipboardy_1 = __importDefault(require("clipboardy"));
/**
 * @name            paste
 * @namespace       sugar.node.clipboard
 * @type            Function
 * @stable
 *
 * Simple function to paste things from the system clipboard.
 * This is using https://www.npmjs.com/package/clipboardy under the hood.
 *
 * @return       {String}             The text to paste
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import paste from '@coffeekraken/sugar/node/clipboard/paste';
 * import copy from '@coffeekraken/sugar/node/clipboard/copy';
 * copy('Hello world');
 * past(); // => Hello world
 *
 * @since       2.0.0
 * @see         https://www.npmjs.com/package/clipboardy
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function paste(text) {
    return clipboardy_1.default.readSync();
}
module.exports = paste;
