"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierboss$input.com)
 */
function __cursorToEnd($input) {
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
exports.default = __cursorToEnd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUF3QixhQUFhLENBQUMsTUFBTTtJQUN4QyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ1osSUFBSSxPQUFPLE1BQU0sQ0FBQyxjQUFjLElBQUksUUFBUSxFQUFFO1lBQzFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUNyRTthQUFNLElBQUksT0FBTyxNQUFNLENBQUMsZUFBZSxJQUFJLFdBQVcsRUFBRTtZQUNyRCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDckMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbEI7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFYRCxnQ0FXQyJ9