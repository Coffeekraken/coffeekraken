"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strip_css_comments_1 = __importDefault(require("strip-css-comments"));
const deepMerge_js_1 = __importDefault(require("../object/deepMerge.js"));
/**
 * @name          stripCssComments
 * @namespace            shared.css
 * @type          Function
 * @platform          js
 * @platform          node
 * @status              beta
 *
 * This function simply remove all the css comments like:
 * - Multiline blocks css comments begining with /* *, ending with * /
 * - Single line comments begining with //
 *
 * @param       {String}        css         The css code to process
 * @param       {Object}      [settings={}]   An object of settings
 * @return      {String}                    The processed css code
 *
 * @setting     {Boolean}     [block=true]       Remove the blocks comments
 * @setting     {Boolean}     [line=true]       Remove the line comments
 *
 * @todo        tests
 * @todo        interface
 * @todo        doc
 *
 * @snippet         __stripCssComments($1)
 *
 * @example       js
 * import { __stripCssComments } from '@coffeekraken/sugar/css';
 * __stripCssComments(`
 * // something cool
 * body { background-color: red; }
 * `);
 * // body { background-color: red }
 *
 * @see         https://www.npmjs.com/package/strip-css-comments
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function stripCssComments(css, settings = {}) {
    settings = (0, deepMerge_js_1.default)({
        block: true,
        line: true,
    }, settings);
    if (settings.block) {
        // css = css.replace(/\/\*{2}([\s\S]+?)\*\//g, '');
        css = (0, strip_css_comments_1.default)(css, {
            preserve: false,
        });
    }
    if (settings.line) {
        css = css.replace(/^[\s]{0,99999999}\/\/.*$/gm, '');
    }
    return css;
}
exports.default = stripCssComments;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFvRDtBQUNwRCwwRUFBaUQ7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9DRztBQUNILFNBQXdCLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUN2RCxRQUFRLEdBQUcsSUFBQSxzQkFBVyxFQUNsQjtRQUNJLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLElBQUk7S0FDYixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO1FBQ2hCLG1EQUFtRDtRQUNuRCxHQUFHLEdBQUcsSUFBQSw0QkFBa0IsRUFBQyxHQUFHLEVBQUU7WUFDMUIsUUFBUSxFQUFFLEtBQUs7U0FDbEIsQ0FBQyxDQUFDO0tBQ047SUFDRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDZixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN2RDtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQWxCRCxtQ0FrQkMifQ==