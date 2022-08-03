"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            stripSourcemap
 * @namespace       shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function simply take a string and get rid of all sourcemap
 *
 * @feature        Support sourcemap like `//# sourceMappingURL=...`
 *
 * @param       {String}            str         The string to process
 * @return      {String}                        The processed string
 *
 * @example         js
 * import __stripSourcemap from '@coffeekraken/sugar/shared/string/stripSourcemap';
 * __stripSourcemap('...');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function stripSourcemap(str) {
    str = str.replace(/\/\/#\s?sourceMappingURL=[\w\W]+/gm, '');
    return str;
}
exports.default = stripSourcemap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQXdCLGNBQWMsQ0FBQyxHQUFXO0lBQzlDLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLG9DQUFvQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVELE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUhELGlDQUdDIn0=