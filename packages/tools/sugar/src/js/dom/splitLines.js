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
        define(["require", "exports", "lodash/map", "../function/throttle"], factory);
    }
})(function (require, exports) {
    "use strict";
    var map_1 = __importDefault(require("lodash/map"));
    var throttle_1 = __importDefault(require("../function/throttle"));
    /**
     * @name      splitLines
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Split each lines inside an HTMLElement by scoping them inside some tags.
     * Here's an result sample for :
     * Hello
     * World
     *
     * ```html
     * <p class="s-split-lines">Hello</p>
     * <p class="s-split-lines">World</p>
     * ```
     *
     * @param 	{HTMLElement} 		elm 		 	The HTMLElement to split lines in
     * @param 	{String} 			[tag="p"] 		The tag to use to split the lines
     * @param 	{String} 			[tagClass="s-split-lines"] 		The class to apply on the tags
     * @return 	{HTMLElement} 						The HTMLElement processed
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import splitLines from '@coffeekraken/sugar/js/dom/splitLines'
     * const myCoolElement = document.querySelector('.my-cool-element');
     * splitLines(myCoolElement);
     *
     * @since       1.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function splitLines(elm, tag, tagClass) {
        if (tag === void 0) { tag = 'p'; }
        if (tagClass === void 0) { tagClass = 'split-lines'; }
        // apply again on resize
        window.addEventListener('resize', throttle_1.default(function (e) {
            _splitLines(elm, tag, tagClass);
        }, 150));
        // first call
        _splitLines(elm, tag, tagClass);
        return elm;
    }
    function _splitLines(elm, tag, tagClass) {
        var string = elm._splitLinesOriginalString;
        if (!string) {
            string = elm.innerHTML;
            elm._splitLinesOriginalString = string;
        }
        elm.classList.add(tagClass);
        // wrap each characters inside two spans
        var words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
        words = map_1.default(words, function (word) {
            return "<span class=\"s-split-lines\">" + word + "</span>";
        }).join(' ');
        elm.innerHTML = words;
        var spans = elm.querySelectorAll('span.s-split-lines');
        var top = null;
        var lines = [];
        var line = [];
        [].forEach.call(spans, function (spanElm) {
            var spanTop = spanElm.getBoundingClientRect().top;
            if (top && spanTop !== top) {
                lines.push(line.join(' '));
                line = [];
            }
            line.push(spanElm.innerHTML.trim());
            top = spanTop;
        });
        lines.push(line.join(' '));
        elm.innerHTML = lines
            .map(function (lineStr) {
            return "<" + tag + " class=\"" + tagClass + "__line\">" + lineStr + "</" + tag + ">";
        })
            .join('');
    }
    return splitLines;
});
