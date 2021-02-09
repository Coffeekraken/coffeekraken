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
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = cursorPos;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yUG9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3Vyc29yUG9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7OztBQUVkLCtDQUF5RDtBQUV6RCxhQUFhO0FBRWI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLFNBQVM7SUFDaEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDL0MsdUJBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO1lBQzVDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUk7WUFDRixNQUFNLHVCQUFhLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUN6QztRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7SUFDaEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNMLENBQUM7QUFDRCxrQkFBZSxTQUFTLENBQUMifQ==