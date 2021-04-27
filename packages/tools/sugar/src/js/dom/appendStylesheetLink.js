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
        define(["require", "exports", "./linkLoaded"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const linkLoaded_1 = __importDefault(require("./linkLoaded"));
    /**
     * @name        appendStylesheetLink
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Append a stylesheet link to the page head
     *
     * @param    {String}    href    THe url to the stylesheet
     * @return    {Promise}    A promise when the stylesheet is loaded with the link element as parameter
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import appendStylesheetLink from '@coffeekraken/sugar/js/dom/appendStylesheetLink'
     * appendStylesheetLink('/dist/css/style.css')
     *
     * @since     1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function appendStylesheetLink(href) {
        const $link = document.createElement('link');
        $link.type = 'text/css';
        $link.rel = 'stylesheet';
        $link.href = href;
        document.head.appendChild($link);
        return linkLoaded_1.default($link);
    }
    exports.default = appendStylesheetLink;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwZW5kU3R5bGVzaGVldExpbmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHBlbmRTdHlsZXNoZWV0TGluay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw4REFBc0M7SUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILFNBQVMsb0JBQW9CLENBQUMsSUFBSTtRQUNoQyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLEtBQUssQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDO1FBQ3pCLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sb0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0Qsa0JBQWUsb0JBQW9CLENBQUMifQ==