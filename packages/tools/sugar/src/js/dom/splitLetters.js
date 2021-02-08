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
    return splitLetters;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRMZXR0ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3BsaXRMZXR0ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0lBRWQsbURBQThCO0lBRTlCLFNBQVMsV0FBVyxDQUFDLElBQUk7UUFDdkIsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNyQixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BZ0VHO0lBQ0gsU0FBUyxZQUFZLENBQ25CLEdBQUcsRUFDSCxHQUFZLEVBQ1osUUFBMEI7UUFEMUIsb0JBQUEsRUFBQSxZQUFZO1FBQ1oseUJBQUEsRUFBQSwwQkFBMEI7UUFFMUIsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLDJCQUEyQixDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztZQUN2QixHQUFHLENBQUMsMkJBQTJCLEdBQUcsTUFBTSxDQUFDO1NBQzFDO1FBRUQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFNUIsd0NBQXdDO1FBQ3hDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQ3RCLDZEQUE2RCxDQUM5RCxDQUFDO1FBRUYsY0FBYztRQUNkLEtBQUssR0FBRyxhQUFJLENBQUMsS0FBSyxFQUFFLFVBQUMsSUFBSTtZQUN2QixPQUFPLE1BQUksR0FBRyxzQ0FBK0IsSUFBSSxVQUFLLEdBQUcsTUFBRyxDQUFDO1FBQy9ELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUViLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFM0MsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLE9BQU8sR0FBRyxhQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsTUFBTTtZQUM3Qiw2QkFBNkI7WUFDN0IsSUFBSSxNQUFNLEtBQUssR0FBRztnQkFBRSxZQUFZLEdBQUcsSUFBSSxDQUFDO2lCQUNuQyxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3ZCLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7WUFDRCxJQUFJLFlBQVk7Z0JBQUUsT0FBTyxNQUFNLENBQUM7WUFDaEMsSUFBSSxNQUFNLEtBQUssR0FBRztnQkFBRSxNQUFNLEdBQUcsUUFBUSxDQUFDO1lBQ3RDLE9BQU8sTUFBSSxHQUFHLGlCQUFXLFFBQVEsOEJBQXdCLEdBQUcsaUJBQVcsUUFBUSxtQkFBYSxNQUFNLFVBQUssR0FBRyxXQUFNLEdBQUcsTUFBRyxDQUFDO1FBQ3pILENBQUMsQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWpDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNELE9BQVMsWUFBWSxDQUFDIn0=