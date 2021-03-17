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
    var map_1 = __importDefault(require("lodash/map"));
    var throttle_1 = __importDefault(require("../../shared/function/throttle"));
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
    exports.default = splitLines;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRMaW5lcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2RvbS9zcGxpdExpbmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLG1EQUE4QjtJQUM5Qiw0RUFBd0Q7SUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BZ0NHO0lBQ0gsU0FBUyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQVMsRUFBRSxRQUF3QjtRQUFuQyxvQkFBQSxFQUFBLFNBQVM7UUFBRSx5QkFBQSxFQUFBLHdCQUF3QjtRQUMxRCx3QkFBd0I7UUFDeEIsTUFBTSxDQUFDLGdCQUFnQixDQUNyQixRQUFRLEVBQ1Isa0JBQVUsQ0FBQyxVQUFDLENBQUM7WUFDWCxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQ1IsQ0FBQztRQUVGLGFBQWE7UUFDYixXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVoQyxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVE7UUFDckMsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLHlCQUF5QixDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztZQUN2QixHQUFHLENBQUMseUJBQXlCLEdBQUcsTUFBTSxDQUFDO1NBQ3hDO1FBRUQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFNUIsd0NBQXdDO1FBQ3hDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQ3RCLDZEQUE2RCxDQUM5RCxDQUFDO1FBQ0YsS0FBSyxHQUFHLGFBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQyxJQUFJO1lBQ3ZCLE9BQU8sbUNBQStCLElBQUksWUFBUyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNiLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBRXRCLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztRQUNmLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQyxPQUFPO1lBQzdCLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUNwRCxJQUFJLEdBQUcsSUFBSSxPQUFPLEtBQUssR0FBRyxFQUFFO2dCQUMxQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxHQUFHLEVBQUUsQ0FBQzthQUNYO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDcEMsR0FBRyxHQUFHLE9BQU8sQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTNCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSzthQUNsQixHQUFHLENBQUMsVUFBQyxPQUFPO1lBQ1gsT0FBTyxNQUFJLEdBQUcsaUJBQVcsUUFBUSxpQkFBVyxPQUFPLFVBQUssR0FBRyxNQUFHLENBQUM7UUFDakUsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUNELGtCQUFlLFVBQVUsQ0FBQyJ9