// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/deepMerge", "./html/htmlFromMarkdown", "./html/htmlFromDocblocks"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                throw new Error(`Sorry but the passed inputString does not match any supported type which are: ${supportedFromTypes.join(',')}`);
            }
        }
        // convert the string from the correct type
        const converterFn = convertersByType[settings.from];
        if (!converterFn) {
            throw new Error(`It seems that no converter exists for your inputString which is of type "<yellow>${settings.from}</yellow>"...`);
        }
        return converterFn(inputString, settings);
    }
    exports.default = toHtml;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9IdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG9IdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLG9FQUE4QztJQUM5QywrRUFBeUQ7SUFDekQsaUZBQTJEO0lBRTNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E4Qkc7SUFDSCxNQUFNLGtCQUFrQixHQUFHLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3JELE1BQU0sZ0JBQWdCLEdBQUc7UUFDdkIsUUFBUSxFQUFFLDBCQUFrQjtRQUM1QixTQUFTLEVBQUUsMkJBQW1CO0tBQy9CLENBQUM7SUFDRixTQUFTLE1BQU0sQ0FBQyxXQUFXLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDeEMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsSUFBSSxFQUFFLElBQUk7U0FDWCxFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ2xCLHVCQUF1QjtZQUN2QixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7Z0JBQUUsUUFBUSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7aUJBQ2hFLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQztnQkFDL0QsUUFBUSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7aUJBQ3pCO2dCQUNILE1BQU0sSUFBSSxLQUFLLENBQ2IsaUZBQWlGLGtCQUFrQixDQUFDLElBQUksQ0FDdEcsR0FBRyxDQUNKLEVBQUUsQ0FDSixDQUFDO2FBQ0g7U0FDRjtRQUVELDJDQUEyQztRQUMzQyxNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEQsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUNiLG9GQUFvRixRQUFRLENBQUMsSUFBSSxlQUFlLENBQ2pILENBQUM7U0FDSDtRQUVELE9BQU8sV0FBVyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0Qsa0JBQWUsTUFBTSxDQUFDIn0=