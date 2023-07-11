"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleErrors_js_1 = __importDefault(require("../error/handleErrors.js"));
const exitCleanup_js_1 = __importDefault(require("./exitCleanup.js"));
const onProcessExit_js_1 = __importDefault(require("./onProcessExit.js"));
/**
 * @name                    index
 * @namespace           node
 *
 * This file is the "initialisation" one for the sugar node toolkit.
 * It's optional to include it but if you do, you will get these features "for free":
 * - Display errors
 * - Process exit cleanup
 *
 * @snippet         __processSugar()
 *
 * @example         js
 * import { __processSugar } from '@coffeekraken/sugar/process';
 * __processSugar();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __processSugar() {
    // handle the errors
    (0, handleErrors_js_1.default)();
    // exit cleanup
    (0, onProcessExit_js_1.default)(() => {
        return exitCleanup_js_1.default;
    });
}
exports.default = __processSugar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtFQUFzRDtBQUN0RCxzRUFBNkM7QUFDN0MsMEVBQWlEO0FBRWpEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILFNBQXdCLGNBQWM7SUFDbEMsb0JBQW9CO0lBQ3BCLElBQUEseUJBQWMsR0FBRSxDQUFDO0lBRWpCLGVBQWU7SUFDZixJQUFBLDBCQUFlLEVBQUMsR0FBRyxFQUFFO1FBQ2pCLE9BQU8sd0JBQWEsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFSRCxpQ0FRQyJ9