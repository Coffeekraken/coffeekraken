"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_parent_1 = __importDefault(require("glob-parent"));
/**
 * @name                extractGlob
 * @namespace            shared.glob
 * @type                Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * This function simply return you the glob part of a passed string
 *
 * @param       {String}            string          The string from which to extract the glob part
 * @return      {String}                            The glob part of the passed string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __extractGlob($1)
 *
 * @example         js
 * import { __extractGlob } from '@coffeekraken/sugar/glob';
 * __extractGlob('/coco/hello/*.js'); // => '*.js'
 *
 * @see             https://www.npmjs.com/package/glob-parent
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __extractGlob(string) {
    const parent = (0, glob_parent_1.default)(string);
    let final = string.replace(parent, '');
    if (final.slice(0, 1) === '/')
        final = final.slice(1);
    return final;
}
exports.default = __extractGlob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDhEQUF1QztBQUV2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFFSCxTQUF3QixhQUFhLENBQUMsTUFBTTtJQUN4QyxNQUFNLE1BQU0sR0FBRyxJQUFBLHFCQUFZLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdkMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHO1FBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUxELGdDQUtDIn0=