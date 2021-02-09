"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_parent_1 = __importDefault(require("glob-parent"));
/**
 * @name                extractNoneGlob
 * @namespace           sugar.js.glob
 * @type                Function
 * @stable
 *
 * This function simply return you the none glob part of a passed string
 *
 * @param       {String}            string          The string from which to extract the none glob part
 * @return      {String}                            The none glob part of the passed string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import extractNoneGlob from '@coffeekraken/sugar/js/glob/extractNoneGlob';
 * extractNoneGlob('/coco/hello/*.js'); // => '*.js'
 *
 * @see             https://www.npmjs.com/package/glob-parent
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function extractNoneGlob(string) {
    const parent = glob_parent_1.default(string);
    return parent;
}
exports.default = extractNoneGlob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdE5vbmVHbG9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXh0cmFjdE5vbmVHbG9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7QUFFViw4REFBdUM7QUFFdkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLGVBQWUsQ0FBQyxNQUFNO0lBQzdCLE1BQU0sTUFBTSxHQUFHLHFCQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUNELGtCQUFlLGVBQWUsQ0FBQyJ9