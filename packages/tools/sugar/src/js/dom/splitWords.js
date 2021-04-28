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
        define(["require", "exports", "lodash/map"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const map_1 = __importDefault(require("lodash/map"));
    /**
     * @name      splitWords
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Split each words inside an HTMLElement by scoping them inside some tags.
     * Here's an result sample for :
     * Hello World
     *
     * ```html
     * <span class="s-split-words">Hello</span>
     * <span class="s-split-words">World</span>
     * ```
     *
     * @param 	{HTMLElement} 		elm 		 	The HTMLElement to split words in
     * @param 	{String} 			[tag="p"] 		The tag to use to split the words
     * @param 	{String} 			[tagClass="s-split-lines"] 		The class to apply on the tags
     * @return 	{HTMLElement} 						The HTMLElement processed
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import splitWords from '@coffeekraken/sugar/js/dom/splitLines'
     * const myCoolElement = document.querySelector('.my-cool-element');
     * splitWords(myCoolElement);
     *
     * @since       1.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function splitWords(elm, tag = 'span', tagClass = 'split-words') {
        // first call
        _splitWords(elm, tag, tagClass);
        return elm;
    }
    function _splitWords(elm, tag, tagClass) {
        let string = elm._splitWordsOriginalString;
        if (!string) {
            string = elm.innerHTML;
            elm._splitWordsOriginalString = string;
        }
        elm.classList.add(tagClass);
        // wrap each characters inside two spans
        let words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
        words = map_1.default(words, (word) => {
            return `<${tag} class="${tagClass}__word">${word}</${tag}>`;
        }).join(' ');
        elm.innerHTML = words;
    }
    exports.default = splitWords;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRXb3Jkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9kb20vc3BsaXRXb3Jkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxxREFBOEI7SUFFOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0ErQkc7SUFDSCxTQUFTLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLE1BQU0sRUFBRSxRQUFRLEdBQUcsYUFBYTtRQUM3RCxhQUFhO1FBQ2IsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFaEMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRO1FBQ3JDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7WUFDdkIsR0FBRyxDQUFDLHlCQUF5QixHQUFHLE1BQU0sQ0FBQztTQUN4QztRQUVELEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTVCLHdDQUF3QztRQUN4QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUN0Qiw2REFBNkQsQ0FDOUQsQ0FBQztRQUNGLEtBQUssR0FBRyxhQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDM0IsT0FBTyxJQUFJLEdBQUcsV0FBVyxRQUFRLFdBQVcsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNiLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxrQkFBZSxVQUFVLENBQUMifQ==