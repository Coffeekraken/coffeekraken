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
    function _decodeHtml(html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }
    /**
     * @name      splitLetters
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Split each letters inside an HTMLElement by scoping them inside multiple tags.
     * Here's an result sample for : Hello World
     * ```html
     * <span style="white-space:nowrap">
     * 	<span class="split-letters">
     * 		<span class="split-letters__letter">H</span>
     * 	</span>
     * 	<span class="split-letters">
     * 		<span class="split-letters__letter">e</span>
     * 	</span>
     * 	<span class="split-letters">
     * 		<span class="split-letters__letter">l</span>
     * 	</span>
     * 	<span class="split-letters">
     * 		<span class="split-letters__letter">l</span>
     * 	</span>
     * 	<span class="split-letters">
     * 		<span class="split-letters__letter">o</span>
     * 	</span>
     * </span>
     * <span class="split-letters">
     * 	<span class="split-letters__letter">&nbsp;</span>
     * </span>
     * <span style="white-space:nowrap">
     * 	<span class="split-letters">
     * 		<span class="split-letters__letter">W</span>
     * 	</span>
     * 	<span class="split-letters">
     * 		<span class="split-letters__letter">o</span>
     * 	</span>
     * 	<span class="split-letters">
     * 		<span class="split-letters__letter">r</span>
     * 	</span>
     * 	<span class="split-letters">
     * 		<span class="split-letters__letter">l</span>
     * 	</span>
     * 	<span class="split-letters">
     * 		<span class="split-letters__letter">d</span>
     * 	</span>
     * </span>
     * ```
     *
     * @param 	{HTMLElement} 		elm 		 	The HTMLElement to split letters in
     * @param 	{String} 			[tag="span"] 	The tag to use to split the letters
     * @param 	{String} 			[tagClass="s-split-letters"] 		The class to apply on the tags
     * @return 	{HTMLElement} 						The HTMLElement processed
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import __splitLetters from '@coffeekraken/sugar/js/dom/splitLetters'
     * const myCoolElement = document.querySelector('.my-cool-element');
     * __splitLetters(myCoolElement);
     *
     * @since       1.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function splitLetters(elm, tag, tagClass) {
        if (tag === void 0) { tag = 'span'; }
        if (tagClass === void 0) { tagClass = 'split-letters'; }
        var string = elm._splitLettersOriginalString;
        if (!string) {
            string = elm.innerHTML;
            elm._splitLettersOriginalString = string;
        }
        elm.classList.add(tagClass);
        // wrap each characters inside two spans
        var words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
        // split words
        words = map_1.default(words, function (word) {
            return "<" + tag + " style=\"white-space:nowrap\">" + word + "</" + tag + ">";
        }).join(' ');
        var letters = _decodeHtml(words).split('');
        var hasTagOpened = false;
        letters = map_1.default(letters, function (letter) {
            // check if a tag has started
            if (letter === '<')
                hasTagOpened = true;
            else if (letter === '>') {
                hasTagOpened = false;
                return letter;
            }
            if (hasTagOpened)
                return letter;
            if (letter === ' ')
                letter = '&nbsp;';
            return "<" + tag + " class=\"" + tagClass + "__letter-container\"><" + tag + " class=\"" + tagClass + "__letter\">" + letter + "</" + tag + "></" + tag + ">";
        });
        elm.innerHTML = letters.join('');
        return elm;
    }
    exports.default = splitLetters;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRMZXR0ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2pzL2RvbS9zcGxpdExldHRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsbURBQThCO0lBRTlCLFNBQVMsV0FBVyxDQUFDLElBQUk7UUFDdkIsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNyQixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BZ0VHO0lBQ0gsU0FBUyxZQUFZLENBQUMsR0FBRyxFQUFFLEdBQVksRUFBRSxRQUEwQjtRQUF4QyxvQkFBQSxFQUFBLFlBQVk7UUFBRSx5QkFBQSxFQUFBLDBCQUEwQjtRQUNqRSxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsMkJBQTJCLENBQUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE1BQU0sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO1lBQ3ZCLEdBQUcsQ0FBQywyQkFBMkIsR0FBRyxNQUFNLENBQUM7U0FDMUM7UUFFRCxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU1Qix3Q0FBd0M7UUFDeEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FDdEIsNkRBQTZELENBQzlELENBQUM7UUFFRixjQUFjO1FBQ2QsS0FBSyxHQUFHLGFBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQyxJQUFJO1lBQ3ZCLE9BQU8sTUFBSSxHQUFHLHNDQUErQixJQUFJLFVBQUssR0FBRyxNQUFHLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWIsSUFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUzQyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDekIsT0FBTyxHQUFHLGFBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQyxNQUFNO1lBQzdCLDZCQUE2QjtZQUM3QixJQUFJLE1BQU0sS0FBSyxHQUFHO2dCQUFFLFlBQVksR0FBRyxJQUFJLENBQUM7aUJBQ25DLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDdkIsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDckIsT0FBTyxNQUFNLENBQUM7YUFDZjtZQUNELElBQUksWUFBWTtnQkFBRSxPQUFPLE1BQU0sQ0FBQztZQUNoQyxJQUFJLE1BQU0sS0FBSyxHQUFHO2dCQUFFLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFDdEMsT0FBTyxNQUFJLEdBQUcsaUJBQVcsUUFBUSw4QkFBd0IsR0FBRyxpQkFBVyxRQUFRLG1CQUFhLE1BQU0sVUFBSyxHQUFHLFdBQU0sR0FBRyxNQUFHLENBQUM7UUFDekgsQ0FBQyxDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFakMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBQ0Qsa0JBQWUsWUFBWSxDQUFDIn0=