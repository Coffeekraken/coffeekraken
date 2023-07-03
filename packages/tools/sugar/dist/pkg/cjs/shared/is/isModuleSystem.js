"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isCjs_1 = __importDefault(require("./isCjs"));
const isEsm_1 = __importDefault(require("./isEsm"));
/**
 * @name          isModuleSystem
 * @namespace            shared.is
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the current module system the code runs on is one of the passed system names like "esm" or "cjs".
 *
 * @param       {('esm'|'cjs')[]}    systemNames    An array of system names to check against
 * @return      {Boolean}           true if the current system is one of the passed system names, false otherwise
 *
 * @snippet         __isModuleSystem($1)
 *
 * @example       js
 * import { __isModuleSystem } from '@coffeekraken/sugar/is';
 * __isModuleSystem('esm'); // => true
 * __isModuleSystem('cjs'); // => false
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isModuleSystem(systemNames) {
    if (!Array.isArray(systemNames))
        systemNames = [systemNames];
    for (let i = 0; i < systemNames.length; i++) {
        if ((0, isCjs_1.default)() && systemNames[i] === 'cjs')
            return true;
        if ((0, isEsm_1.default)() && systemNames[i] === 'esm')
            return true;
    }
    return false;
}
exports.default = __isModuleSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQThCO0FBQzlCLG9EQUE4QjtBQUU5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQXdCLGdCQUFnQixDQUNwQyxXQUE4QjtJQUU5QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFBRSxXQUFXLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN6QyxJQUFJLElBQUEsZUFBTyxHQUFFLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUs7WUFBRSxPQUFPLElBQUksQ0FBQztRQUN2RCxJQUFJLElBQUEsZUFBTyxHQUFFLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUs7WUFBRSxPQUFPLElBQUksQ0FBQztLQUMxRDtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFURCxtQ0FTQyJ9