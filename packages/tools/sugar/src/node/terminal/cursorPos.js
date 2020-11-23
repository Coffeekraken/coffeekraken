"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const terminal_kit_1 = require("terminal-kit");
// TODO tests
/**
 * @name                                      cursorPos
 * @namespace           sugar.node.terminal
 * @type                                      Function
 *
 * Return the terminal cursor position in {x,y} format.
 *
 * @return              {Promise}                         A promise resolved once the position has been getted
 *
 * @example             js
 * import cursorPos from '@coffeekraken/sugar/node/terminal/cursorPos';
 * await cursorPos(); // => { x: 10, y: 20 }
 *
 * @see       https://www.npmjs.com/package/terminal-kit
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function cursorPos() {
    return new Promise(async (resolve, reject) => {
        terminal_kit_1.terminal.once('terminal', (name, data) => {
            resolve(data);
        });
        try {
            await terminal_kit_1.terminal.getCursorLocation();
        }
        catch (e) { }
    });
}
exports.default = cursorPos;
