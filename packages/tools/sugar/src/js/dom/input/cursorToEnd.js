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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yVG9FbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjdXJzb3JUb0VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUFDLE1BQU07SUFDeEMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLElBQUksT0FBTyxNQUFNLENBQUMsY0FBYyxJQUFJLFFBQVEsRUFBRTtZQUMxQyxNQUFNLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7U0FDckU7YUFBTSxJQUFJLE9BQU8sTUFBTSxDQUFDLGVBQWUsSUFBSSxXQUFXLEVBQUU7WUFDckQsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3JDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEIsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIn0=