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
 * import cursorToEnd from '@coffeekraken/sugar/js/dom/input/cursorToEnd';
 * cursorToEnd($input);
 *
 * @see             https://stackoverflow.com/a/56416714
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierboss$input.com)
 */
export default function cursorToEnd($input) {
    $input.focus();
    setTimeout(() => {
        if (typeof $input.selectionStart == "number") {
            $input.selectionStart = $input.selectionEnd = $input.value.length;
        }
        else if (typeof $input.createTextRange != "undefined") {
            var range = $input.createTextRange();
            range.collapse(false);
            range.select();
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQUMsTUFBTTtJQUN4QyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsSUFBSSxPQUFPLE1BQU0sQ0FBQyxjQUFjLElBQUksUUFBUSxFQUFFO1lBQzFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUNyRTthQUFNLElBQUksT0FBTyxNQUFNLENBQUMsZUFBZSxJQUFJLFdBQVcsRUFBRTtZQUNyRCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDckMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbEI7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMifQ==