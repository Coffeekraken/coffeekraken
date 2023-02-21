/**
 * @name      cursorToEnd
 * @namespace            js.dom.input
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Place the cursor to the end of the input
 *
 * @param 		{HTMLFormElement} 		$input 		The input to process
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import { __cursorToEnd } from '@coffeekraken/sugar/dom';
 * __cursorToEnd($input);
 *
 * @see             https://stackoverflow.com/a/56416714
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierboss$input.com)
 */
export default function __cursorToEnd($input) {
    $input.focus();
    setTimeout(() => {
        if (typeof $input.selectionStart == 'number') {
            $input.selectionStart = $input.selectionEnd = $input.value.length;
        } else if (typeof $input.createTextRange != 'undefined') {
            var range = $input.createTextRange();
            range.collapse(false);
            range.select();
        }
    });
}
