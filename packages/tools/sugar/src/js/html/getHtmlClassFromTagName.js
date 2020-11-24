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
        define(["require", "exports", "../string/upperFirst", "./htmlTagToHtmlClassMap"], factory);
    }
})(function (require, exports) {
    "use strict";
    var upperFirst_1 = __importDefault(require("../string/upperFirst"));
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
    return getHtmlClassFromTagName;
});
