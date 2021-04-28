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
        define(["require", "exports", "./htmlTagToHtmlClassMap"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const htmlTagToHtmlClassMap_1 = __importDefault(require("./htmlTagToHtmlClassMap"));
    /**
     * @name            getHtmlhtmlClassFromHtmlClass
     * @namespace            js.html
     * @type            Function
     * @stable
     *
     * This function simply return the tagname depending on the passed HTML class
     * like HTMLAnchorElement, HTMLLinkElement, etc...
     *
     * @param       {HTMLElement}      htmlClass       The htmlClass to get the tag for
     * @return      {String}               The tagname that correspond to the passed HTMLElement class
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import getHtmlhtmlClassFromHtmlClass from '@coffeekraken/sugar/js/html/getHtmlhtmlClassFromHtmlClass';
     * getHtmlhtmlClassFromHtmlClass(HTMLAnchorElement); // => 'a'
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function getHtmlhtmlClassFromHtmlClass(htmlClass) {
        if (!htmlClass)
            return false;
        for (const key in htmlTagToHtmlClassMap_1.default) {
            if (htmlTagToHtmlClassMap_1.default[key] === htmlClass)
                return key;
        }
        return false;
    }
    exports.default = getHtmlhtmlClassFromHtmlClass;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VGFnTmFtZUZyb21IdG1sQ2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvaHRtbC9nZXRUYWdOYW1lRnJvbUh0bWxDbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFHZCxvRkFBOEQ7SUFFOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxTQUFTLDZCQUE2QixDQUFDLFNBQVM7UUFDOUMsSUFBSSxDQUFDLFNBQVM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUU3QixLQUFLLE1BQU0sR0FBRyxJQUFJLCtCQUF1QixFQUFFO1lBQ3pDLElBQUksK0JBQXVCLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUztnQkFBRSxPQUFPLEdBQUcsQ0FBQztTQUM1RDtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNELGtCQUFlLDZCQUE2QixDQUFDIn0=