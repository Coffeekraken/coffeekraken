// @ts-nocheck
import _map from 'lodash/map';
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
    words = _map(words, (word) => {
        return `<${tag} class="${tagClass}__word">${word}</${tag}>`;
    }).join(' ');
    elm.innerHTML = words;
}
export default splitWords;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRXb3Jkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwbGl0V29yZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sSUFBSSxNQUFNLFlBQVksQ0FBQztBQUU5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRztBQUNILFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsTUFBTSxFQUFFLFFBQVEsR0FBRyxhQUFhO0lBQzdELGFBQWE7SUFDYixXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUVoQyxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVE7SUFDckMsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLHlCQUF5QixDQUFDO0lBQzNDLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDWCxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUN2QixHQUFHLENBQUMseUJBQXlCLEdBQUcsTUFBTSxDQUFDO0tBQ3hDO0lBRUQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFNUIsd0NBQXdDO0lBQ3hDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQ3RCLDZEQUE2RCxDQUM5RCxDQUFDO0lBQ0YsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMzQixPQUFPLElBQUksR0FBRyxXQUFXLFFBQVEsV0FBVyxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDOUQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDeEIsQ0FBQztBQUNELGVBQWUsVUFBVSxDQUFDIn0=