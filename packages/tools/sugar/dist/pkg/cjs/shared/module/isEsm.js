"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isCjs_1 = __importDefault(require("./isCjs"));
/**
 * @name          isEsm
 * @namespace            shared.module
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the current module system the code runs on "esm" module system.
 *
 * @return      {Boolean}           true if the current system is esm
 *
 * @example       js
 * import __isEsm from '@coffeekraken/sugar/shared/module/isEsm';
 * __isEsm(); // => true
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isEsm() {
    return !(0, isCjs_1.default)();
}
exports.default = isEsm;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQThCO0FBRTlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxTQUF3QixLQUFLO0lBQ3pCLE9BQU8sQ0FBQyxJQUFBLGVBQU8sR0FBRSxDQUFDO0FBQ3RCLENBQUM7QUFGRCx3QkFFQyJ9