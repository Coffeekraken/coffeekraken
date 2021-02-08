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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRMaW5lcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwbGl0TGluZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxtREFBOEI7SUFDOUIsa0VBQThDO0lBRTlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWdDRztJQUNILFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFTLEVBQUUsUUFBd0I7UUFBbkMsb0JBQUEsRUFBQSxTQUFTO1FBQUUseUJBQUEsRUFBQSx3QkFBd0I7UUFDMUQsd0JBQXdCO1FBQ3hCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FDckIsUUFBUSxFQUNSLGtCQUFVLENBQUMsVUFBQyxDQUFDO1lBQ1gsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUNSLENBQUM7UUFFRixhQUFhO1FBQ2IsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFaEMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRO1FBQ3JDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7WUFDdkIsR0FBRyxDQUFDLHlCQUF5QixHQUFHLE1BQU0sQ0FBQztTQUN4QztRQUVELEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTVCLHdDQUF3QztRQUN4QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUN0Qiw2REFBNkQsQ0FDOUQsQ0FBQztRQUNGLEtBQUssR0FBRyxhQUFJLENBQUMsS0FBSyxFQUFFLFVBQUMsSUFBSTtZQUN2QixPQUFPLG1DQUErQixJQUFJLFlBQVMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDYixHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUV0QixJQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN6RCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDZixJQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQUMsT0FBTztZQUM3QixJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHLENBQUM7WUFDcEQsSUFBSSxHQUFHLElBQUksT0FBTyxLQUFLLEdBQUcsRUFBRTtnQkFDMUIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksR0FBRyxFQUFFLENBQUM7YUFDWDtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3BDLEdBQUcsR0FBRyxPQUFPLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUzQixHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUs7YUFDbEIsR0FBRyxDQUFDLFVBQUMsT0FBTztZQUNYLE9BQU8sTUFBSSxHQUFHLGlCQUFXLFFBQVEsaUJBQVcsT0FBTyxVQUFLLEdBQUcsTUFBRyxDQUFDO1FBQ2pFLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNkLENBQUM7SUFDRCxPQUFTLFVBQVUsQ0FBQyJ9