import _map from 'lodash/map';
/**
 * @name      splitWords
 * @namespace           sugar.js.dom
 * @type      Function
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
 * @example 	js
 * import splitWords from '@coffeekraken/sugar/js/dom/splitLines'
 * const myCoolElement = document.querySelector('.my-cool-element');
 * splitWords(myCoolElement);
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function splitWords(elm, tag = 'span', tagClass = 'split-words') {
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
