"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const marked_1 = __importDefault(require("marked"));
/**
 * @name            htmlFromMarkdown
 * @namespace       sugar.js.convert
 * @type            Function
 * @wip
 *
 * Take a markdown string as input and convert it to HTML.
 *
 * @param       {String}          inputString         The input string to convert to HTML
 * @param       {Object}          [settings={}]       An object of settings to configure your conversion process. All the ```marked``` settings are supported
 * @return      {String}                              The HTML converted result
 *
 * @todo        interface
 * @todo        doc
 *
 * @example       js
 * import htmlFromMarkdown from '@coffeekraken/sugar/js/convert/html/htmlFromMarkdown';
 * htmlFromMarkdown(`
 *  # Hello world
 *  How are you?
 * `);
 * // <h1>Hello world</h1>
 * // <p>How are you</p>
 *
 * @since       2.0.0
 * @see       https://marked.js.org/#/README.md
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function htmlFromMarkdown(inputString, settings = {}) {
    settings = deepMerge_1.default({}, settings);
    marked_1.default.setOptions(settings);
    return marked_1.default(inputString);
}
module.exports = htmlFromMarkdown;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbEZyb21NYXJrZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh0bWxGcm9tTWFya2Rvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7O0FBR1YsdUVBQWlEO0FBQ2pELG9EQUE4QjtBQUU5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDbEQsUUFBUSxHQUFHLG1CQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLGdCQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlCLE9BQU8sZ0JBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBQ0QsaUJBQVMsZ0JBQWdCLENBQUMifQ==