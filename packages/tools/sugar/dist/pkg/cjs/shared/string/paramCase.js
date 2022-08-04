"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const param_case_1 = require("param-case");
/**
 * @name          paramCase
 * @namespace            js.string
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function transform a string into a param case one like so "something-cool"
 *
 * @param       {String}        string          The string to convert
 * @return      {String}                        The converted string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import paramCase from '@coffeekraken/sugar/js/string/paramCase';
 * paramCase('some thoing cool'); // => some-thing-cool
 *
 * @see         https://www.npmjs.com/package/param-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function paramCaseFn(string) {
    return (0, param_case_1.paramCase)(string);
}
exports.default = paramCaseFn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLDJDQUF1QztBQUV2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxXQUFXLENBQUMsTUFBTTtJQUN2QixPQUFPLElBQUEsc0JBQVMsRUFBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBQ0Qsa0JBQWUsV0FBVyxDQUFDIn0=