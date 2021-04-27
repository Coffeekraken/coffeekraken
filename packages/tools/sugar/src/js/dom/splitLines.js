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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRMaW5lcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwbGl0TGluZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQscURBQThCO0lBQzlCLDhFQUF3RDtJQUV4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQ0c7SUFDSCxTQUFTLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxRQUFRLEdBQUcsYUFBYTtRQUMxRCx3QkFBd0I7UUFDeEIsTUFBTSxDQUFDLGdCQUFnQixDQUNyQixRQUFRLEVBQ1Isa0JBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2YsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUNSLENBQUM7UUFFRixhQUFhO1FBQ2IsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFaEMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRO1FBQ3JDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7WUFDdkIsR0FBRyxDQUFDLHlCQUF5QixHQUFHLE1BQU0sQ0FBQztTQUN4QztRQUVELEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTVCLHdDQUF3QztRQUN4QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUN0Qiw2REFBNkQsQ0FDOUQsQ0FBQztRQUNGLEtBQUssR0FBRyxhQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDM0IsT0FBTywrQkFBK0IsSUFBSSxTQUFTLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdEIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDekQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2YsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUNwRCxJQUFJLEdBQUcsSUFBSSxPQUFPLEtBQUssR0FBRyxFQUFFO2dCQUMxQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxHQUFHLEVBQUUsQ0FBQzthQUNYO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDcEMsR0FBRyxHQUFHLE9BQU8sQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTNCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSzthQUNsQixHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNmLE9BQU8sSUFBSSxHQUFHLFdBQVcsUUFBUSxXQUFXLE9BQU8sS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNqRSxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDZCxDQUFDO0lBQ0Qsa0JBQWUsVUFBVSxDQUFDIn0=