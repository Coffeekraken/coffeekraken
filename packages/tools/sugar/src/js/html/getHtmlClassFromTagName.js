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
        define(["require", "exports", "../../shared/string/upperFirst", "./htmlTagToHtmlClassMap"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var upperFirst_1 = __importDefault(require("../../shared/string/upperFirst"));
    var htmlTagToHtmlClassMap_1 = __importDefault(require("./htmlTagToHtmlClassMap"));
    /**
     * @name            getHtmlClassFromTagName
     * @namespace       sugar.js.html
     * @type            Function
     * @stable
     *
     * This function simply return the HTML{name}Element class depending on the passed
     * tag name like "p", "input", "textarea", etc...
     *
     * @param       {String}      tagName       The tagName to get the class for
     * @return      {HTMLElement}               The HTMLElement class that correspond to the requested tag name
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import getHtmlClassFromTagName from '@coffeekraken/sugar/js/html/getHtmlClassFromTagName';
     * getHtmlClassFromTagName('a'); // => HTMLAnchorElement
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function getHtmlClassFromTagName(tagName) {
        if (!tagName)
            return HTMLElement;
        var tagNameUpperFirst = upperFirst_1.default(tagName);
        if (window["HTML" + tagNameUpperFirst + "Element"])
            return window["HTML" + tagNameUpperFirst + "Element"];
        if (htmlTagToHtmlClassMap_1.default[tagName])
            return htmlTagToHtmlClassMap_1.default[tagName];
        return HTMLElement;
    }
    exports.default = getHtmlClassFromTagName;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SHRtbENsYXNzRnJvbVRhZ05hbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRIdG1sQ2xhc3NGcm9tVGFnTmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw4RUFBMEQ7SUFDMUQsa0ZBQThEO0lBRTlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0JHO0lBQ0gsU0FBUyx1QkFBdUIsQ0FBQyxPQUFPO1FBQ3RDLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTyxXQUFXLENBQUM7UUFFakMsSUFBTSxpQkFBaUIsR0FBRyxvQkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELElBQUksTUFBTSxDQUFDLFNBQU8saUJBQWlCLFlBQVMsQ0FBQztZQUMzQyxPQUFPLE1BQU0sQ0FBQyxTQUFPLGlCQUFpQixZQUFTLENBQUMsQ0FBQztRQUVuRCxJQUFJLCtCQUF1QixDQUFDLE9BQU8sQ0FBQztZQUFFLE9BQU8sK0JBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFOUUsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUNELGtCQUFlLHVCQUF1QixDQUFDIn0=