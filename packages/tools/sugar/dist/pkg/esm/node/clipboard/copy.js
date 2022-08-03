// @ts-nocheck
import __clipboardy from 'clipboardy';
import __toString from '../../shared/string/toString';
import __ncp from 'copy-paste';
/**
 * @name            copy
 * @namespace            node.clipboard
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * Simple function to copy things into the system clipboard.
 * This is using https://www.npmjs.com/package/clipboardy under the hood.
 *
 * @param       {String}      text        The text to copy
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import copy from '@coffeekraken/sugar/node/clipboard/copy';
 * copy('Hello world');
 *
 * @since       2.0.0
 * @see         https://www.npmjs.com/package/clipboardy
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function copy(text) {
    text = __toString(text);
    try {
        __clipboardy.writeSync(text);
    }
    catch (e) {
        __ncp.copy(text);
    }
}
export default copy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyxVQUFVLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxLQUFLLE1BQU0sWUFBWSxDQUFDO0FBRS9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsSUFBSSxDQUFDLElBQUk7SUFDZCxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLElBQUk7UUFDQSxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hDO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BCO0FBQ0wsQ0FBQztBQUNELGVBQWUsSUFBSSxDQUFDIn0=