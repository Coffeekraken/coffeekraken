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
        define(["require", "exports", "../object/deepMerge", "strip-css-comments"], factory);
    }
})(function (require, exports) {
    "use strict";
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var strip_css_comments_1 = __importDefault(require("strip-css-comments"));
    /**
     * @name          stripCssComments
     * @namespace     sugar.js.css
     * @type          Function
     * @status              wip
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
     * @example       js
     * import stripCssComments from '@coffeekraken/sugar/js/css/stripCssComments';
     * stripCssComments(`
     * // something cool
     * body { background-color: red; }
     * `);
     * // body { background-color: red }
     *
     * @see         https://www.npmjs.com/package/strip-css-comments
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function stripCssComments(css, settings) {
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_1.default({
            block: true,
            line: true
        }, settings);
        if (settings.block) {
            // css = css.replace(/\/\*{2}([\s\S]+?)\*\//g, '');
            css = strip_css_comments_1.default(css, {
                preserve: false
            });
        }
        if (settings.line) {
            css = css.replace(/^[\s]{0,99999999}\/\/.*$/gm, '');
        }
        return css;
    }
    return stripCssComments;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBDc3NDb21tZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0cmlwQ3NzQ29tbWVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7O0lBRVYsa0VBQThDO0lBQzlDLDBFQUFvRDtJQUVwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQ0c7SUFDSCxTQUFTLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQzFDLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLEtBQUssRUFBRSxJQUFJO1lBQ1gsSUFBSSxFQUFFLElBQUk7U0FDWCxFQUNELFFBQVEsQ0FDVCxDQUFDO1FBQ0YsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO1lBQ2xCLG1EQUFtRDtZQUNuRCxHQUFHLEdBQUcsNEJBQWtCLENBQUMsR0FBRyxFQUFFO2dCQUM1QixRQUFRLEVBQUUsS0FBSzthQUNoQixDQUFDLENBQUM7U0FDSjtRQUNELElBQUksUUFBUSxDQUFDLElBQUksRUFBRTtZQUNqQixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNyRDtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNELE9BQVMsZ0JBQWdCLENBQUMifQ==