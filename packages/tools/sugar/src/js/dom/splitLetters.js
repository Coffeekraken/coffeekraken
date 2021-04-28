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
    function _decodeHtml(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }
    /**
     * @name      splitLetters
     * @namespace            js.dom
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
    function splitLetters(elm, tag = 'span', tagClass = 'split-letters') {
        let string = elm._splitLettersOriginalString;
        if (!string) {
            string = elm.innerHTML;
            elm._splitLettersOriginalString = string;
        }
        elm.classList.add(tagClass);
        // wrap each characters inside two spans
        let words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
        // split words
        words = map_1.default(words, (word) => {
            return `<${tag} style="white-space:nowrap">${word}</${tag}>`;
        }).join(' ');
        let letters = _decodeHtml(words).split('');
        let hasTagOpened = false;
        letters = map_1.default(letters, (letter) => {
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
            return `<${tag} class="${tagClass}__letter-container"><${tag} class="${tagClass}__letter">${letter}</${tag}></${tag}>`;
        });
        elm.innerHTML = letters.join('');
        return elm;
    }
    exports.default = splitLetters;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRMZXR0ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL2pzL2RvbS9zcGxpdExldHRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQscURBQThCO0lBRTlCLFNBQVMsV0FBVyxDQUFDLElBQUk7UUFDdkIsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNyQixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BZ0VHO0lBQ0gsU0FBUyxZQUFZLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxNQUFNLEVBQUUsUUFBUSxHQUFHLGVBQWU7UUFDakUsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLDJCQUEyQixDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztZQUN2QixHQUFHLENBQUMsMkJBQTJCLEdBQUcsTUFBTSxDQUFDO1NBQzFDO1FBRUQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFNUIsd0NBQXdDO1FBQ3hDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQ3RCLDZEQUE2RCxDQUM5RCxDQUFDO1FBRUYsY0FBYztRQUNkLEtBQUssR0FBRyxhQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDM0IsT0FBTyxJQUFJLEdBQUcsK0JBQStCLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUMvRCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFYixJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztRQUN6QixPQUFPLEdBQUcsYUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2pDLDZCQUE2QjtZQUM3QixJQUFJLE1BQU0sS0FBSyxHQUFHO2dCQUFFLFlBQVksR0FBRyxJQUFJLENBQUM7aUJBQ25DLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDdkIsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDckIsT0FBTyxNQUFNLENBQUM7YUFDZjtZQUNELElBQUksWUFBWTtnQkFBRSxPQUFPLE1BQU0sQ0FBQztZQUNoQyxJQUFJLE1BQU0sS0FBSyxHQUFHO2dCQUFFLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFDdEMsT0FBTyxJQUFJLEdBQUcsV0FBVyxRQUFRLHdCQUF3QixHQUFHLFdBQVcsUUFBUSxhQUFhLE1BQU0sS0FBSyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDekgsQ0FBQyxDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFakMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBQ0Qsa0JBQWUsWUFBWSxDQUFDIn0=