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
 * @snippet         __resetFileInput($1);
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
export default function __resetFileInput($input: HTMLInputElement): void {
    $input.value = '';
    if (!/safari/i.test(navigator.userAgent)) {
        $input.type = '';
        $input.type = 'file';
    }
}
