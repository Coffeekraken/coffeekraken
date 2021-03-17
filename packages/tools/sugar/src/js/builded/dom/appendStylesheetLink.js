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
    var linkLoaded_1 = __importDefault(require("./linkLoaded"));
    /**
     * @name        appendStylesheetLink
     * @namespace           sugar.js.dom
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
        var $link = document.createElement('link');
        $link.type = 'text/css';
        $link.rel = 'stylesheet';
        $link.href = href;
        document.head.appendChild($link);
        return linkLoaded_1.default($link);
    }
    exports.default = appendStylesheetLink;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwZW5kU3R5bGVzaGVldExpbmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9kb20vYXBwZW5kU3R5bGVzaGVldExpbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsNERBQXNDO0lBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDSCxTQUFTLG9CQUFvQixDQUFDLElBQUk7UUFDaEMsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxLQUFLLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztRQUN4QixLQUFLLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQztRQUN6QixLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxPQUFPLG9CQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNELGtCQUFlLG9CQUFvQixDQUFDIn0=