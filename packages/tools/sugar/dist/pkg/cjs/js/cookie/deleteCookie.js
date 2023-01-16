"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const setCookie_1 = __importDefault(require("./setCookie"));
/**
 * @name            deleteCookie
 * @namespace       js.cookie
 * @type            Function
 * @status          stable
 *
 * Delete a cookie
 *
 * @param       {String}            name            The cookie name to delete
 * @return      {any}                               The cookie value
 *
 * @example         js
 * import { __deleteCookie } from '@coffeekraken/sugar/cookie';
 * __deleteCookie('myCookie');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __deleteCookie(name) {
    (0, setCookie_1.default)(name, '', {
        'max-age': -1,
    });
}
exports.default = __deleteCookie;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNERBQXNDO0FBRXRDOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILFNBQXdCLGNBQWMsQ0FBQyxJQUFZO0lBQy9DLElBQUEsbUJBQVcsRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ2xCLFNBQVMsRUFBRSxDQUFDLENBQUM7S0FDaEIsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUpELGlDQUlDIn0=