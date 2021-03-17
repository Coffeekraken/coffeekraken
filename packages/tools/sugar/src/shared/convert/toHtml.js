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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9IdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG9IdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFViw2REFBdUM7SUFDdkMsb0VBQThDO0lBQzlDLCtFQUF5RDtJQUN6RCxpRkFBMkQ7SUFFM0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQThCRztJQUNILE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDckQsTUFBTSxnQkFBZ0IsR0FBRztRQUN2QixRQUFRLEVBQUUsMEJBQWtCO1FBQzVCLFNBQVMsRUFBRSwyQkFBbUI7S0FDL0IsQ0FBQztJQUNGLFNBQVMsTUFBTSxDQUFDLFdBQVcsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUN4QyxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxJQUFJLEVBQUUsSUFBSTtTQUNYLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRiw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDbEIsdUJBQXVCO1lBQ3ZCLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztnQkFBRSxRQUFRLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztpQkFDaEUsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLHFDQUFxQyxDQUFDO2dCQUMvRCxRQUFRLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztpQkFDekI7Z0JBQ0gsTUFBTSxJQUFJLGdCQUFRLENBQ2hCLGlGQUFpRixrQkFBa0IsQ0FBQyxJQUFJLENBQ3RHLEdBQUcsQ0FDSixFQUFFLENBQ0osQ0FBQzthQUNIO1NBQ0Y7UUFFRCwyQ0FBMkM7UUFDM0MsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsTUFBTSxJQUFJLGdCQUFRLENBQ2hCLG9GQUFvRixRQUFRLENBQUMsSUFBSSxlQUFlLENBQ2pILENBQUM7U0FDSDtRQUVELE9BQU8sV0FBVyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0Qsa0JBQWUsTUFBTSxDQUFDIn0=