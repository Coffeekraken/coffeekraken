// @ts-nocheck
import __clipboardy from 'clipboardy';
import __toString from '../../shared/string/toString';
import __ncp from 'copy-paste';
/**
 * @name            copy
 * @namespace            node.clipboard
 * @type            Function
 * @stable
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sWUFBWSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLFVBQVUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEtBQUssTUFBTSxZQUFZLENBQUM7QUFFL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLElBQUksQ0FBQyxJQUFJO0lBQ2hCLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsSUFBSTtRQUNGLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbEI7QUFDSCxDQUFDO0FBQ0QsZUFBZSxJQUFJLENBQUMifQ==