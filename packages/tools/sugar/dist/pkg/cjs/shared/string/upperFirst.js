"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        upperFirst
 * @namespace            js.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Upper first
 *
 * @param    {String}    string    The string to process
 * @return    {String}    The processed string with first letter uppercase
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import upperFirst from '@coffeekraken/sugar/js/string/upperFirst'
 * upperFirst('hello world') // Hello world
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function upperFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
exports.default = upperFirst;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsVUFBVSxDQUFDLE1BQU07SUFDdEIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUNELGtCQUFlLFVBQVUsQ0FBQyJ9