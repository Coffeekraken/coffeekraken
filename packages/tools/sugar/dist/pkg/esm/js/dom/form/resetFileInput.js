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
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __resetFileInput } from '@coffeekraken/sugar/dom'
 *  __resetFileInput($myInpuit);
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __resetFileInput($input) {
    $input.value = '';
    if (!/safari/i.test(navigator.userAgent)) {
        $input.type = '';
        $input.type = 'file';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGdCQUFnQixDQUFDLE1BQXdCO0lBQzdELE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUN0QyxNQUFNLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNqQixNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztLQUN4QjtBQUNMLENBQUMifQ==