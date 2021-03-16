"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SError_1 = __importDefault(require("../error/SError"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const htmlFromMarkdown_1 = __importDefault(require("./html/htmlFromMarkdown"));
const htmlFromDocblocks_1 = __importDefault(require("./html/htmlFromDocblocks"));
/**
 * @name            toHtml
 * @namespace       sugar.js.convert
 * @type            Function
 * @status              wip
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
exports.default = toHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9IdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9jb252ZXJ0L3RvSHRtbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7O0FBRVYsNkRBQXVDO0FBQ3ZDLG9FQUE4QztBQUM5QywrRUFBeUQ7QUFDekQsaUZBQTJEO0FBRTNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFDSCxNQUFNLGtCQUFrQixHQUFHLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3JELE1BQU0sZ0JBQWdCLEdBQUc7SUFDdkIsUUFBUSxFQUFFLDBCQUFrQjtJQUM1QixTQUFTLEVBQUUsMkJBQW1CO0NBQy9CLENBQUM7QUFDRixTQUFTLE1BQU0sQ0FBQyxXQUFXLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDeEMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1FBQ0UsSUFBSSxFQUFFLElBQUk7S0FDWCxFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsNENBQTRDO0lBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1FBQ2xCLHVCQUF1QjtRQUN2QixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7WUFBRSxRQUFRLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQzthQUNoRSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMscUNBQXFDLENBQUM7WUFDL0QsUUFBUSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7YUFDekI7WUFDSCxNQUFNLElBQUksZ0JBQVEsQ0FDaEIsaUZBQWlGLGtCQUFrQixDQUFDLElBQUksQ0FDdEcsR0FBRyxDQUNKLEVBQUUsQ0FDSixDQUFDO1NBQ0g7S0FDRjtJQUVELDJDQUEyQztJQUMzQyxNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFcEQsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNoQixNQUFNLElBQUksZ0JBQVEsQ0FDaEIsb0ZBQW9GLFFBQVEsQ0FBQyxJQUFJLGVBQWUsQ0FDakgsQ0FBQztLQUNIO0lBRUQsT0FBTyxXQUFXLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFDRCxrQkFBZSxNQUFNLENBQUMifQ==