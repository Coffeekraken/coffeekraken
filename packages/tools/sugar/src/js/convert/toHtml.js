// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../error/SError", "../object/deepMerge", "./html/htmlFromMarkdown", "./html/htmlFromDocblocks"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SError_1 = __importDefault(require("../error/SError"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var htmlFromMarkdown_1 = __importDefault(require("./html/htmlFromMarkdown"));
    var htmlFromDocblocks_1 = __importDefault(require("./html/htmlFromDocblocks"));
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
    var supportedFromTypes = ['markdown', 'docblocks'];
    var convertersByType = {
        markdown: htmlFromMarkdown_1.default,
        docblocks: htmlFromDocblocks_1.default
    };
    function toHtml(inputString, settings) {
        if (settings === void 0) { settings = {}; }
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
                throw new SError_1.default("Sorry but the passed inputString does not match any supported type which are: " + supportedFromTypes.join(','));
            }
        }
        // convert the string from the correct type
        var converterFn = convertersByType[settings.from];
        if (!converterFn) {
            throw new SError_1.default("It seems that no converter exists for your inputString which is of type \"<yellow>" + settings.from + "</yellow>\"...");
        }
        return converterFn(inputString, settings);
    }
    exports.default = toHtml;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9IdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG9IdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFViwyREFBdUM7SUFDdkMsa0VBQThDO0lBQzlDLDZFQUF5RDtJQUN6RCwrRUFBMkQ7SUFFM0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQThCRztJQUNILElBQU0sa0JBQWtCLEdBQUcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDckQsSUFBTSxnQkFBZ0IsR0FBRztRQUN2QixRQUFRLEVBQUUsMEJBQWtCO1FBQzVCLFNBQVMsRUFBRSwyQkFBbUI7S0FDL0IsQ0FBQztJQUNGLFNBQVMsTUFBTSxDQUFDLFdBQVcsRUFBRSxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQ3hDLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLElBQUksRUFBRSxJQUFJO1NBQ1gsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLDRDQUE0QztRQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtZQUNsQix1QkFBdUI7WUFDdkIsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO2dCQUFFLFFBQVEsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO2lCQUNoRSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMscUNBQXFDLENBQUM7Z0JBQy9ELFFBQVEsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO2lCQUN6QjtnQkFDSCxNQUFNLElBQUksZ0JBQVEsQ0FDaEIsbUZBQWlGLGtCQUFrQixDQUFDLElBQUksQ0FDdEcsR0FBRyxDQUNGLENBQ0osQ0FBQzthQUNIO1NBQ0Y7UUFFRCwyQ0FBMkM7UUFDM0MsSUFBTSxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsTUFBTSxJQUFJLGdCQUFRLENBQ2hCLHVGQUFvRixRQUFRLENBQUMsSUFBSSxtQkFBZSxDQUNqSCxDQUFDO1NBQ0g7UUFFRCxPQUFPLFdBQVcsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNELGtCQUFlLE1BQU0sQ0FBQyJ9