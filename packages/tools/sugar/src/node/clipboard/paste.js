"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clipboardy_1 = __importDefault(require("clipboardy"));
/**
 * @name            paste
 * @namespace            node.clipboard
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
exports.default = paste;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXN0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCw0REFBc0M7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsS0FBSyxDQUFDLElBQUk7SUFDakIsT0FBTyxvQkFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2pDLENBQUM7QUFDRCxrQkFBZSxLQUFLLENBQUMifQ==