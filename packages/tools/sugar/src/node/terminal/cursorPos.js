"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const terminal_kit_1 = require("terminal-kit");
// TODO tests
/**
 * @name                                      cursorPos
 * @namespace           sugar.node.terminal
 * @type                                      Function
 * @status              wip
 *
 * Return the terminal cursor position in {x,y} format.
 *
 * @return              {Promise}                         A promise resolved once the position has been getted
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      move in "format" folder
 *
 * @example             js
 * import cursorPos from '@coffeekraken/sugar/node/terminal/cursorPos';
 * await cursorPos(); // => { x: 10, y: 20 }
 *
 * @see       https://www.npmjs.com/package/terminal-kit
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function cursorPos() {
    return new Promise(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
        terminal_kit_1.terminal.once('terminal', (name, data) => {
            resolve(data);
        });
        try {
            yield terminal_kit_1.terminal.getCursorLocation();
        }
        catch (e) { }
    }));
}
module.exports = cursorPos;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yUG9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3Vyc29yUG9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsK0NBQXlEO0FBRXpELGFBQWE7QUFFYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsU0FBUztJQUNoQixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUMvQyx1QkFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDNUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSTtZQUNGLE1BQU0sdUJBQWEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQ3pDO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtJQUNoQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUNELGlCQUFTLFNBQVMsQ0FBQyJ9