"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        resetFileInput
 * @namespace            js.dom.form
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Correctly reset an input[type="file"]
 *
 * @param       {HTMLInputElement}        $input       The input field to reset
 *
 * @snippet         __resetFileInput($1)
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __resetFileInput } from '@coffeekraken/sugar/dom'
 *  __resetFileInput($myInpuit);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __resetFileInput($input) {
    $input.value = '';
    if (!/safari/i.test(navigator.userAgent)) {
        $input.type = '';
        $input.type = 'file';
    }
}
exports.default = __resetFileInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBd0IsZ0JBQWdCLENBQUMsTUFBd0I7SUFDN0QsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0tBQ3hCO0FBQ0wsQ0FBQztBQU5ELG1DQU1DIn0=