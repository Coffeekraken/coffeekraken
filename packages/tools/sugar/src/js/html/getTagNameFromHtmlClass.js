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
    var htmlTagToHtmlClassMap_1 = __importDefault(require("./htmlTagToHtmlClassMap"));
    /**
     * @name            getHtmlhtmlClassFromHtmlClass
     * @namespace       sugar.js.html
     * @type            Function
     * @stable
     *
     * This function simply return the tagname depending on the passed HTML class
     * like HTMLAnchorElement, HTMLLinkElement, etc...
     *
     * @param       {HTMLElement}      htmlClass       The htmlClass to get the tag for
     * @return      {String}               The tagname that correspond to the passed HTMLElement class
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
        for (var key in htmlTagToHtmlClassMap_1.default) {
            if (htmlTagToHtmlClassMap_1.default[key] === htmlClass)
                return key;
        }
        return false;
    }
    return getHtmlhtmlClassFromHtmlClass;
});
//# sourceMappingURL=module.js.map