"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memoizee_1 = __importDefault(require("memoizee"));
/**
 * @name            memoize
 * @namespace       shared.function
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This function can be used to memorize a function call result in order to save memory.
 * This is just a "proxy" of the "memoizee" package.
 *
 * @example         js
 * import { __memoize } from '@coffeekraken/sugar/function';
 * const fn =  __memoize(function(text) => {
 *    return `Hello ${text}`;
 * });
 * const result = fn('world'); // first execution. no cache
 * const result1 = fn('plop'); // first execution with this argument, no cache
 * const result2 = fn('world'); // taken from cache
 *
 * @see             https://www.npmjs.com/package/memoizee
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __memoize(...args) {
    return (0, memoizee_1.default)(...args);
}
exports.default = __memoize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWtDO0FBRWxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQXdCLFNBQVMsQ0FBQyxHQUFHLElBQUk7SUFDckMsT0FBTyxJQUFBLGtCQUFVLEVBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBRkQsNEJBRUMifQ==