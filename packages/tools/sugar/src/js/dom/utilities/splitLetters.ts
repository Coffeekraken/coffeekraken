// @ts-nocheck

function _decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

/**
 * @name      splitLetters
 * @namespace            js.dom.utils
 * @type      Function
 * @platform          js
 * @status      beta
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
 * @param     {ISplitLettersSettings}       [settings={}]       Some settings to tweak the process
 * @return 	{HTMLElement} 						The HTMLElement processed
 *
 * @setting 	{String} 			[tag="span"] 	          The tag to use to split the letters
 * @setting 	{String} 			[class="s-split-letters"] 		The class to apply on the tags
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __splitLetters($1)
 *
 * @example 	js
 * import { __splitLetters } from '@coffeekraken/sugar/dom'
 * const myCoolElement = document.querySelector('.my-cool-element');
 * __splitLetters(myCoolElement);
 *
 * @since           2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISplitLettersSettings {
    tag: string;
    class: string;
}

export default function __splitLetters(
    elm: HTMLElement,
    settings: Partial<ISplitLettersSettings> = {},
): HTMLElement {
    settings = {
        tag: 'span',
        class: 's-split-letters',
        letterClass: 's-split-letter',
        ...settings,
    };

    let string = elm._splitLettersOriginalString;
    if (!string) {
        string = elm.innerHTML;
        elm._splitLettersOriginalString = string;
    }

    elm.classList.add(settings.class);

    function process(nodes) {
        nodes.forEach((node) => {
            if (node.childNodes.length) {
                process(node.childNodes);
            }

            if (node.nodeName === '#text') {
                const newValue = node.textContent
                    .split('')
                    .map((letter) => {
                        return `<${settings.tag} class="${settings.letterClass}">${letter}</span>`;
                    })
                    .join('');
                const $wrap = document.createElement(settings.tag);
                $wrap.innerHTML = newValue;
                $wrap.classList.add(settings.class);
                node.after($wrap);
                node.remove();
            }
        });
    }
    process(elm.childNodes);

    return elm;

    // wrap each characters inside two spans
    let words = string.match(
        /<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g,
    );

    _console.log(words);

    // split words
    words = words
        .map((word) => {
            return `<${settings.tag} style="white-space:nowrap">${word}</${settings.tag}>`;
        })
        .join(' ');

    let letters = _decodeHtml(words).split('');

    let hasTagOpened = false;
    letters = letters.map((letter) => {
        // check if a tag has started
        if (letter === '<') hasTagOpened = true;
        else if (letter === '>') {
            hasTagOpened = false;
            return letter;
        }
        if (hasTagOpened) return letter;
        if (letter === ' ') letter = '&nbsp;';
        return `<${settings.tag} class="${settings.class}__letter-container"><${settings.tag} class="${settings.class}__letter">${letter}</${settings.tag}></${settings.tag}>`;
    });

    elm.innerHTML = letters.join('');

    return elm;
}
