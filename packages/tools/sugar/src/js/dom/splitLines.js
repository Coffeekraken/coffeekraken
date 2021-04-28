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
        define(["require", "exports", "lodash/map", "../../shared/function/throttle"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const map_1 = __importDefault(require("lodash/map"));
    const throttle_1 = __importDefault(require("../../shared/function/throttle"));
    /**
     * @name      splitLines
     * @namespace            js.dom
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
    function splitLines(elm, tag = 'p', tagClass = 'split-lines') {
        // apply again on resize
        window.addEventListener('resize', throttle_1.default((e) => {
            _splitLines(elm, tag, tagClass);
        }, 150));
        // first call
        _splitLines(elm, tag, tagClass);
        return elm;
    }
    function _splitLines(elm, tag, tagClass) {
        let string = elm._splitLinesOriginalString;
        if (!string) {
            string = elm.innerHTML;
            elm._splitLinesOriginalString = string;
        }
        elm.classList.add(tagClass);
        // wrap each characters inside two spans
        let words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
        words = map_1.default(words, (word) => {
            return `<span class="s-split-lines">${word}</span>`;
        }).join(' ');
        elm.innerHTML = words;
        const spans = elm.querySelectorAll('span.s-split-lines');
        let top = null;
        const lines = [];
        let line = [];
        [].forEach.call(spans, (spanElm) => {
            const spanTop = spanElm.getBoundingClientRect().top;
            if (top && spanTop !== top) {
                lines.push(line.join(' '));
                line = [];
            }
            line.push(spanElm.innerHTML.trim());
            top = spanTop;
        });
        lines.push(line.join(' '));
        elm.innerHTML = lines
            .map((lineStr) => {
            return `<${tag} class="${tagClass}__line">${lineStr}</${tag}>`;
        })
            .join('');
    }
    exports.default = splitLines;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRMaW5lcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9kb20vc3BsaXRMaW5lcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxxREFBOEI7SUFDOUIsOEVBQXdEO0lBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWdDRztJQUNILFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLFFBQVEsR0FBRyxhQUFhO1FBQzFELHdCQUF3QjtRQUN4QixNQUFNLENBQUMsZ0JBQWdCLENBQ3JCLFFBQVEsRUFDUixrQkFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDZixXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQ1IsQ0FBQztRQUVGLGFBQWE7UUFDYixXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVoQyxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVE7UUFDckMsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLHlCQUF5QixDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztZQUN2QixHQUFHLENBQUMseUJBQXlCLEdBQUcsTUFBTSxDQUFDO1NBQ3hDO1FBRUQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFNUIsd0NBQXdDO1FBQ3hDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQ3RCLDZEQUE2RCxDQUM5RCxDQUFDO1FBQ0YsS0FBSyxHQUFHLGFBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMzQixPQUFPLCtCQUErQixJQUFJLFNBQVMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDYixHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUV0QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN6RCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDZixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDakMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ3BELElBQUksR0FBRyxJQUFJLE9BQU8sS0FBSyxHQUFHLEVBQUU7Z0JBQzFCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLEdBQUcsRUFBRSxDQUFDO2FBQ1g7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNwQyxHQUFHLEdBQUcsT0FBTyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFM0IsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLO2FBQ2xCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2YsT0FBTyxJQUFJLEdBQUcsV0FBVyxRQUFRLFdBQVcsT0FBTyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2pFLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNkLENBQUM7SUFDRCxrQkFBZSxVQUFVLENBQUMifQ==