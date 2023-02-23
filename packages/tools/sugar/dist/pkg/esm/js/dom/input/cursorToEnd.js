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
 * @snippet         __cursorToEnd($1);
 *
 * @example 	js
 * import { __cursorToEnd } from '@coffeekraken/sugar/dom';
 * __cursorToEnd($input);
 *
 * @see             https://stackoverflow.com/a/56416714
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierboss$input.com)
 */
export default function __cursorToEnd($input) {
    $input.focus();
    setTimeout(() => {
        if (typeof $input.selectionStart == 'number') {
            $input.selectionStart = $input.selectionEnd = $input.value.length;
        }
        else if (typeof $input.createTextRange != 'undefined') {
            var range = $input.createTextRange();
            range.collapse(false);
            range.select();
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGFBQWEsQ0FBQyxNQUFNO0lBQ3hDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDWixJQUFJLE9BQU8sTUFBTSxDQUFDLGNBQWMsSUFBSSxRQUFRLEVBQUU7WUFDMUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQ3JFO2FBQU0sSUFBSSxPQUFPLE1BQU0sQ0FBQyxlQUFlLElBQUksV0FBVyxFQUFFO1lBQ3JELElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNyQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNsQjtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9