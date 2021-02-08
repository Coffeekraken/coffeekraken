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
    var map_1 = __importDefault(require("lodash/map"));
    /**
     * @name      splitWords
     * @namespace           sugar.js.dom
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
    function splitWords(elm, tag, tagClass) {
        if (tag === void 0) { tag = 'span'; }
        if (tagClass === void 0) { tagClass = 'split-words'; }
        // first call
        _splitWords(elm, tag, tagClass);
        return elm;
    }
    function _splitWords(elm, tag, tagClass) {
        var string = elm._splitWordsOriginalString;
        if (!string) {
            string = elm.innerHTML;
            elm._splitWordsOriginalString = string;
        }
        elm.classList.add(tagClass);
        // wrap each characters inside two spans
        var words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
        words = map_1.default(words, function (word) {
            return "<" + tag + " class=\"" + tagClass + "__word\">" + word + "</" + tag + ">";
        }).join(' ');
        elm.innerHTML = words;
    }
    return splitWords;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRXb3Jkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwbGl0V29yZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxtREFBOEI7SUFFOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0ErQkc7SUFDSCxTQUFTLFVBQVUsQ0FDakIsR0FBRyxFQUNILEdBQVksRUFDWixRQUF3QjtRQUR4QixvQkFBQSxFQUFBLFlBQVk7UUFDWix5QkFBQSxFQUFBLHdCQUF3QjtRQUV4QixhQUFhO1FBQ2IsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFaEMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRO1FBQ3JDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7WUFDdkIsR0FBRyxDQUFDLHlCQUF5QixHQUFHLE1BQU0sQ0FBQztTQUN4QztRQUVELEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTVCLHdDQUF3QztRQUN4QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUN0Qiw2REFBNkQsQ0FDOUQsQ0FBQztRQUNGLEtBQUssR0FBRyxhQUFJLENBQUMsS0FBSyxFQUFFLFVBQUMsSUFBSTtZQUN2QixPQUFPLE1BQUksR0FBRyxpQkFBVyxRQUFRLGlCQUFXLElBQUksVUFBSyxHQUFHLE1BQUcsQ0FBQztRQUM5RCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDYixHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBQ0QsT0FBUyxVQUFVLENBQUMifQ==