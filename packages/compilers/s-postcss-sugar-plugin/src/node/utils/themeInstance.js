"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name        themeInstance
 * @namespace      node.utils
 * @type          STheme
 *
 * Gives you access to the current theme STheme instance in order to access
 * utilities methods like loopOnColors, etc...
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-ignore
if (!global._sTheme)
    global._sTheme = new s_theme_1.default();
// @ts-ignore
exports.default = global._sTheme;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVJbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRoZW1lSW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7R0FVRztBQUVILGFBQWE7QUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87SUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQVEsRUFBRSxDQUFDO0FBQ3JELGFBQWE7QUFDYixrQkFBZSxNQUFNLENBQUMsT0FBTyxDQUFDIn0=