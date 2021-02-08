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
    return toHtml;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9IdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG9IdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7OztJQUVWLDJEQUF1QztJQUN2QyxrRUFBOEM7SUFDOUMsNkVBQXlEO0lBQ3pELCtFQUEyRDtJQUUzRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BOEJHO0lBQ0gsSUFBTSxrQkFBa0IsR0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNyRCxJQUFNLGdCQUFnQixHQUFHO1FBQ3ZCLFFBQVEsRUFBRSwwQkFBa0I7UUFDNUIsU0FBUyxFQUFFLDJCQUFtQjtLQUMvQixDQUFDO0lBQ0YsU0FBUyxNQUFNLENBQUMsV0FBVyxFQUFFLFFBQWE7UUFBYix5QkFBQSxFQUFBLGFBQWE7UUFDeEMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsSUFBSSxFQUFFLElBQUk7U0FDWCxFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ2xCLHVCQUF1QjtZQUN2QixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7Z0JBQUUsUUFBUSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7aUJBQ2hFLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQztnQkFDL0QsUUFBUSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7aUJBQ3pCO2dCQUNILE1BQU0sSUFBSSxnQkFBUSxDQUNoQixtRkFBaUYsa0JBQWtCLENBQUMsSUFBSSxDQUN0RyxHQUFHLENBQ0YsQ0FDSixDQUFDO2FBQ0g7U0FDRjtRQUVELDJDQUEyQztRQUMzQyxJQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEQsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNoQixNQUFNLElBQUksZ0JBQVEsQ0FDaEIsdUZBQW9GLFFBQVEsQ0FBQyxJQUFJLG1CQUFlLENBQ2pILENBQUM7U0FDSDtRQUVELE9BQU8sV0FBVyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0QsT0FBUyxNQUFNLENBQUMifQ==