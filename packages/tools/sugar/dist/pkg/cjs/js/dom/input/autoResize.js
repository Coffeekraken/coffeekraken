"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      autoResize
 * @namespace            js.dom.input
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Automatically resize a textarea height
 *
 * @param 		{HTMLFormElement} 		$textarea 		The textarea to auto resize
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __autoResize($1)
 *
 * @example 	js
 * import { __autoResize } from '@coffeekraken/sugar/dom';
 * __autoResize($textarea);
 *
 * @see             https://stackoverflow.com/a/56416714
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierboss$input.com)
 */
function autoResize($textarea) {
    $textarea.style.boxSizing = 'border-box';
    var offset = $textarea.offsetHeight - $textarea.clientHeight;
    $textarea.addEventListener('input', function (event) {
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + offset + 'px';
    });
}
exports.default = autoResize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQXdCLFVBQVUsQ0FBQyxTQUE4QjtJQUM3RCxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7SUFDekMsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO0lBQzdELFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBVSxLQUFLO1FBQy9DLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDbkMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDMUUsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBUEQsNkJBT0MifQ==