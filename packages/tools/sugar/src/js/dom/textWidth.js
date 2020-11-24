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
        define(["require", "exports", "./getStyleProperty"], factory);
    }
})(function (require, exports) {
    "use strict";
    var getStyleProperty_1 = __importDefault(require("./getStyleProperty"));
    /**
     * @name      textWidth
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Get the text width in px of a passed string or the passed HTMLElement
     *
     * @param 		{String|HTMLElement}		source 		The source to process
     * @return 		{Number} 								The calculated width of the text
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import textWidth from '@coffeekraken/sugar/js/dom/textWidth'
     * // text of an HTMLElement
     * const width = textWidth(myCoolHTMLElement);
     *
     * // text directly (no font-size management so it's less accurate...)
     * const width = textWidth('Hello World');
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function textWidth(source) {
        // create an element
        var elm = document.createElement('span');
        elm.style.whiteSpace = 'nowrap';
        elm.style.position = 'absolute';
        elm.style.visibility = 'hidden';
        var text = source;
        // if the source if an html element
        if (source.tagName) {
            // set the text into the element
            var tagName = source.tagName.toLowerCase();
            switch (tagName) {
                case 'input':
                case 'textarea':
                    text = source.value;
                    break;
                default:
                    text = source.innerText;
                    break;
            }
            // get the font properties
            var fs = getStyleProperty_1.default(source, 'font-size');
            var ff = getStyleProperty_1.default(source, 'font-family');
            var ls = getStyleProperty_1.default(source, 'letter-spacing');
            elm.style.fontSize = fs;
            elm.style.fontFamily = ff;
            elm.style.letterSpacing = ls;
        }
        // replacing spaces
        text = text.replace(/ /g, '\u00a0');
        // set the element content
        elm.innerHTML = text;
        // append the element to the body
        document.body.appendChild(elm);
        // return the width of the element
        var width = elm.offsetWidth;
        // remove the element from the dom
        document.body.removeChild(elm);
        // return the width
        return width;
    }
    return textWidth;
});
