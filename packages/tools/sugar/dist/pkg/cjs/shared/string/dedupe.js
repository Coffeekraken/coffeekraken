"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const to_regex_1 = __importDefault(require("to-regex"));
/**
 * @name        dedupe
 * @namespace            shared.string
 * @type        Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function simple make sure that you don't have duplicate statements in the passed string
 *
 * @param           {String}        string        The string to process
 * @param           {String}        statement       The statement to check
 * @return          {String}                      The deduplicated string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import { __dedupe } from '@coffeekraken/sugar/string';
 * __dedupe('hello world hello your', 'hello'); // => hello world your
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __dedupe(str, statement) {
    const reg = (0, to_regex_1.default)(`(${statement})`, {
        contains: true,
        flags: 'g',
    });
    return str
        .split(reg)
        .reverse()
        .filter(function (e, i, arr) {
        return arr.indexOf(e, i + 1) === -1;
    })
        .reverse()
        .join('');
}
exports.default = __dedupe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUFpQztBQUVqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBd0IsUUFBUSxDQUFDLEdBQUcsRUFBRSxTQUFTO0lBQzNDLE1BQU0sR0FBRyxHQUFHLElBQUEsa0JBQVMsRUFBQyxJQUFJLFNBQVMsR0FBRyxFQUFFO1FBQ3BDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDYixDQUFDLENBQUM7SUFDSCxPQUFPLEdBQUc7U0FDTCxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1YsT0FBTyxFQUFFO1NBQ1QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHO1FBQ3ZCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQztTQUNELE9BQU8sRUFBRTtTQUNULElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNsQixDQUFDO0FBYkQsMkJBYUMifQ==