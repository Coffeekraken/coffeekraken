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
    exports.default = splitWords;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRXb3Jkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9kb20vc3BsaXRXb3Jkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxtREFBOEI7SUFFOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0ErQkc7SUFDSCxTQUFTLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBWSxFQUFFLFFBQXdCO1FBQXRDLG9CQUFBLEVBQUEsWUFBWTtRQUFFLHlCQUFBLEVBQUEsd0JBQXdCO1FBQzdELGFBQWE7UUFDYixXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVoQyxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVE7UUFDckMsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLHlCQUF5QixDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztZQUN2QixHQUFHLENBQUMseUJBQXlCLEdBQUcsTUFBTSxDQUFDO1NBQ3hDO1FBRUQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFNUIsd0NBQXdDO1FBQ3hDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQ3RCLDZEQUE2RCxDQUM5RCxDQUFDO1FBQ0YsS0FBSyxHQUFHLGFBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQyxJQUFJO1lBQ3ZCLE9BQU8sTUFBSSxHQUFHLGlCQUFXLFFBQVEsaUJBQVcsSUFBSSxVQUFLLEdBQUcsTUFBRyxDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNiLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxrQkFBZSxVQUFVLENBQUMifQ==