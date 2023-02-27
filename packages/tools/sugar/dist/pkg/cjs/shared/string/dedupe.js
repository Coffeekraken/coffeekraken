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
 * @snippet         __dedupe($1, $2)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUFpQztBQUVqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUF3QixRQUFRLENBQUMsR0FBRyxFQUFFLFNBQVM7SUFDM0MsTUFBTSxHQUFHLEdBQUcsSUFBQSxrQkFBUyxFQUFDLElBQUksU0FBUyxHQUFHLEVBQUU7UUFDcEMsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNiLENBQUMsQ0FBQztJQUNILE9BQU8sR0FBRztTQUNMLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDVixPQUFPLEVBQUU7U0FDVCxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUc7UUFDdkIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDO1NBQ0QsT0FBTyxFQUFFO1NBQ1QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2xCLENBQUM7QUFiRCwyQkFhQyJ9