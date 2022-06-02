// @ts-nocheck

/**
 * @name      splitWords
 * @namespace            js.dom.utils
 * @type      Function
 * @platform          js
 * @status        beta
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
 * @setting 	{String} 			[tag="p"] 		The tag to use to split the words
 * @setting 	{String} 			[tagClass="s-split-lines"] 		The class to apply on the tags
 *
 * @param 	{HTMLElement} 		elm 		 	The HTMLElement to split words in
 * @param     {ISplitWordsSettings}       [settings={}]       Some settings to tweak the process
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
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISplitWordsSettings {
    tag: string;
    class: string;
}

function splitWords(
    elm: HTMLElement,
    settings: Partial<ISplitWordsSettings> = {},
): HTMLElement {
    settings = {
        tag: 'span',
        class: 'split-words',
        ...settings,
    };

    // first call
    _splitWords(elm, settings);

    return elm;
}

function _splitWords(elm, settings) {
    let string = elm._splitWordsOriginalString;
    if (!string) {
        string = elm.innerHTML;
        elm._splitWordsOriginalString = string;
    }

    elm.classList.add(settings.class);

    // wrap each characters inside two spans
    let words = string.match(
        /<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g,
    );
    words = words
        .map((word) => {
            return `<${settings.tag} class="${settings.class}__word">${word}</${settings.tag}>`;
        })
        .join(' ');
    elm.innerHTML = words;
}
export default splitWords;
