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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRMZXR0ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3BsaXRMZXR0ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHFEQUE4QjtJQUU5QixTQUFTLFdBQVcsQ0FBQyxJQUFJO1FBQ3ZCLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDckIsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWdFRztJQUNILFNBQVMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsTUFBTSxFQUFFLFFBQVEsR0FBRyxlQUFlO1FBQ2pFLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7WUFDdkIsR0FBRyxDQUFDLDJCQUEyQixHQUFHLE1BQU0sQ0FBQztTQUMxQztRQUVELEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTVCLHdDQUF3QztRQUN4QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUN0Qiw2REFBNkQsQ0FDOUQsQ0FBQztRQUVGLGNBQWM7UUFDZCxLQUFLLEdBQUcsYUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzNCLE9BQU8sSUFBSSxHQUFHLCtCQUErQixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWIsSUFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUzQyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDekIsT0FBTyxHQUFHLGFBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNqQyw2QkFBNkI7WUFDN0IsSUFBSSxNQUFNLEtBQUssR0FBRztnQkFBRSxZQUFZLEdBQUcsSUFBSSxDQUFDO2lCQUNuQyxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3ZCLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7WUFDRCxJQUFJLFlBQVk7Z0JBQUUsT0FBTyxNQUFNLENBQUM7WUFDaEMsSUFBSSxNQUFNLEtBQUssR0FBRztnQkFBRSxNQUFNLEdBQUcsUUFBUSxDQUFDO1lBQ3RDLE9BQU8sSUFBSSxHQUFHLFdBQVcsUUFBUSx3QkFBd0IsR0FBRyxXQUFXLFFBQVEsYUFBYSxNQUFNLEtBQUssR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ3pILENBQUMsQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWpDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNELGtCQUFlLFlBQVksQ0FBQyJ9