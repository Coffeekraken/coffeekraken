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
export default function __resetFileInput($input) {
    $input.value = '';
    if (!/safari/i.test(navigator.userAgent)) {
        $input.type = '';
        $input.type = 'file';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCLENBQUMsTUFBd0I7SUFDN0QsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0tBQ3hCO0FBQ0wsQ0FBQyJ9