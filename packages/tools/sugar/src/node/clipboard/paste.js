// @ts-nocheck
import __clipboardy from 'clipboardy';
/**
 * @name            paste
 * @namespace            node.clipboard
 * @type            Function
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * Simple function to paste things from the system clipboard.
 * This is using https://www.npmjs.com/package/clipboardy under the hood.
 *
 * @return       {String}             The text to paste
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import paste from '@coffeekraken/sugar/node/clipboard/paste';
 * import copy from '@coffeekraken/sugar/node/clipboard/copy';
 * copy('Hello world');
 * past(); // => Hello world
 *
 * @since       2.0.0
 * @see         https://www.npmjs.com/package/clipboardy
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function paste(text) {
    return __clipboardy.readSync();
}
export default paste;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXN0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sWUFBWSxDQUFDO0FBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsS0FBSyxDQUFDLElBQUk7SUFDakIsT0FBTyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDakMsQ0FBQztBQUNELGVBQWUsS0FBSyxDQUFDIn0=