// @ts-nocheck
import _map from 'lodash/map';
function _decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}
/**
 * @name      splitLetters
 * @namespace            js.dom.utils
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
    words = _map(words, (word) => {
        return `<${tag} style="white-space:nowrap">${word}</${tag}>`;
    }).join(' ');
    let letters = _decodeHtml(words).split('');
    let hasTagOpened = false;
    letters = _map(letters, (letter) => {
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
export default splitLetters;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRMZXR0ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3BsaXRMZXR0ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxZQUFZLENBQUM7QUFFOUIsU0FBUyxXQUFXLENBQUMsSUFBSTtJQUN2QixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQztBQUNuQixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnRUc7QUFDSCxTQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLE1BQU0sRUFBRSxRQUFRLEdBQUcsZUFBZTtJQUNqRSxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsMkJBQTJCLENBQUM7SUFDN0MsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNYLE1BQU0sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQywyQkFBMkIsR0FBRyxNQUFNLENBQUM7S0FDMUM7SUFFRCxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUU1Qix3Q0FBd0M7SUFDeEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FDdEIsNkRBQTZELENBQzlELENBQUM7SUFFRixjQUFjO0lBQ2QsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMzQixPQUFPLElBQUksR0FBRywrQkFBK0IsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQy9ELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUViLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFM0MsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDakMsNkJBQTZCO1FBQzdCLElBQUksTUFBTSxLQUFLLEdBQUc7WUFBRSxZQUFZLEdBQUcsSUFBSSxDQUFDO2FBQ25DLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTtZQUN2QixZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLFlBQVk7WUFBRSxPQUFPLE1BQU0sQ0FBQztRQUNoQyxJQUFJLE1BQU0sS0FBSyxHQUFHO1lBQUUsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUN0QyxPQUFPLElBQUksR0FBRyxXQUFXLFFBQVEsd0JBQXdCLEdBQUcsV0FBVyxRQUFRLGFBQWEsTUFBTSxLQUFLLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUN6SCxDQUFDLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVqQyxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFDRCxlQUFlLFlBQVksQ0FBQyJ9