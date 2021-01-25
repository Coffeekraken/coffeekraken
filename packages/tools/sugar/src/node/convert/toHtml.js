"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SError_1 = __importDefault(require("../error/SError"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const htmlFromMarkdown_1 = __importDefault(require("./html/htmlFromMarkdown"));
const htmlFromDocblocks_1 = __importDefault(require("./html/htmlFromDocblocks"));
/**
 * @name            toHtml
 * @namespace       sugar.js.convert
 * @type            Function
 * @wip
 *
 * Take a string as input and convert it to HTML.
 *
 * @feature        2.0.0       Supported input types: markdown, docblocks
 * @feature        2.0.0       Try to detect the type automatically. For safer results, specify the "from" setting.
 *
 * @param       {String}          inputString         The input string to convert to HTML
 * @param       {Object}          [settings={}]       An object of settings to configure your conversion process:
 * - from (null) {String}: Specify the type of the input string like "markdown", "dockblocks", and more coming...
 * @return      {String}                              The HTML converted result
 *
 * @todo        interface
 * @todo        doc
 *
 * @example       js
 * import toHtml from '@coffeekraken/sugar/js/convert/toHtml';
 * toHtml(`
 *  # Hello world
 *  How are you?
 * `);
 * // <h1>Hello world</h1>
 * // <p>How are you</p>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const supportedFromTypes = ['markdown', 'docblocks'];
const convertersByType = {
    markdown: htmlFromMarkdown_1.default,
    docblocks: htmlFromDocblocks_1.default
};
function toHtml(inputString, settings = {}) {
    settings = deepMerge_1.default({
        from: null
    }, settings);
    // check if we don't have the "from" setting
    if (!settings.from) {
        // check if is markdown
        if (inputString.match(/\s?#{1,6}\s?.*/g))
            settings.from = 'markdown';
        else if (inputString.match(/(<!--|\/\*{2})([\s\S]+?)(\*\/|-->)/g))
            settings.from = 'docblocks';
        else {
            throw new SError_1.default(`Sorry but the passed inputString does not match any supported type which are: ${supportedFromTypes.join(',')}`);
        }
    }
    // convert the string from the correct type
    const converterFn = convertersByType[settings.from];
    if (!converterFn) {
        throw new SError_1.default(`It seems that no converter exists for your inputString which is of type "<yellow>${settings.from}</yellow>"...`);
    }
    return converterFn(inputString, settings);
}
module.exports = toHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9IdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG9IdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7OztBQUVWLDZEQUF1QztBQUN2QyxvRUFBOEM7QUFDOUMsK0VBQXlEO0FBQ3pELGlGQUEyRDtBQUUzRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNyRCxNQUFNLGdCQUFnQixHQUFHO0lBQ3ZCLFFBQVEsRUFBRSwwQkFBa0I7SUFDNUIsU0FBUyxFQUFFLDJCQUFtQjtDQUMvQixDQUFDO0FBQ0YsU0FBUyxNQUFNLENBQUMsV0FBVyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3hDLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLElBQUksRUFBRSxJQUFJO0tBQ1gsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLDRDQUE0QztJQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtRQUNsQix1QkFBdUI7UUFDdkIsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO1lBQUUsUUFBUSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7YUFDaEUsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLHFDQUFxQyxDQUFDO1lBQy9ELFFBQVEsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO2FBQ3pCO1lBQ0gsTUFBTSxJQUFJLGdCQUFRLENBQ2hCLGlGQUFpRixrQkFBa0IsQ0FBQyxJQUFJLENBQ3RHLEdBQUcsQ0FDSixFQUFFLENBQ0osQ0FBQztTQUNIO0tBQ0Y7SUFFRCwyQ0FBMkM7SUFDM0MsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXBELElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDaEIsTUFBTSxJQUFJLGdCQUFRLENBQ2hCLG9GQUFvRixRQUFRLENBQUMsSUFBSSxlQUFlLENBQ2pILENBQUM7S0FDSDtJQUVELE9BQU8sV0FBVyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBQ0QsaUJBQVMsTUFBTSxDQUFDIn0=