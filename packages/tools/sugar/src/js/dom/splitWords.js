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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRXb3Jkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwbGl0V29yZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQscURBQThCO0lBRTlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BK0JHO0lBQ0gsU0FBUyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxNQUFNLEVBQUUsUUFBUSxHQUFHLGFBQWE7UUFDN0QsYUFBYTtRQUNiLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRWhDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELFNBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUTtRQUNyQyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMseUJBQXlCLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE1BQU0sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO1lBQ3ZCLEdBQUcsQ0FBQyx5QkFBeUIsR0FBRyxNQUFNLENBQUM7U0FDeEM7UUFFRCxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU1Qix3Q0FBd0M7UUFDeEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FDdEIsNkRBQTZELENBQzlELENBQUM7UUFDRixLQUFLLEdBQUcsYUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzNCLE9BQU8sSUFBSSxHQUFHLFdBQVcsUUFBUSxXQUFXLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUM5RCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDYixHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBQ0Qsa0JBQWUsVUFBVSxDQUFDIn0=