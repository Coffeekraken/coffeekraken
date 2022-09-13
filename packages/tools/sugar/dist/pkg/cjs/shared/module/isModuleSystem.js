"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isCjs_1 = __importDefault(require("./isCjs"));
const isEsm_1 = __importDefault(require("./isEsm"));
/**
 * @name          isSystem
 * @namespace            shared.module
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
 * @example       js
 * import __isSystem from '@coffeekraken/sugar/shared/module/isSystem';
 * __isSystem('esm'); // => true
 * __isSystem('cjs'); // => false
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isSystem(systemNames) {
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
exports.default = isSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQThCO0FBQzlCLG9EQUE4QjtBQUU5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxTQUF3QixRQUFRLENBQUMsV0FBOEI7SUFDM0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBQUUsV0FBVyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDekMsSUFBSSxJQUFBLGVBQU8sR0FBRSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDdkQsSUFBSSxJQUFBLGVBQU8sR0FBRSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLO1lBQUUsT0FBTyxJQUFJLENBQUM7S0FDMUQ7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBUEQsMkJBT0MifQ==