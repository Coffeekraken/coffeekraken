"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isCjs_1 = __importDefault(require("./isCjs"));
/**
 * @name          isEsm
 * @namespace            shared.is
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the current module system the code runs on "esm" module system.
 *
 * @return      {Boolean}           true if the current system is esm
 *
 * @snippet         __isEsm()
 *
 * @example       js
 * import { __isEsm } from '@coffeekraken/sugar/is';
 * __isEsm(); // => true
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isEsm() {
    return !(0, isCjs_1.default)();
}
exports.default = __isEsm;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQThCO0FBRTlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILFNBQXdCLE9BQU87SUFDM0IsT0FBTyxDQUFDLElBQUEsZUFBTyxHQUFFLENBQUM7QUFDdEIsQ0FBQztBQUZELDBCQUVDIn0=