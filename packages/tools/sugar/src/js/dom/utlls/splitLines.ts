// @ts-nocheck

import _map from 'lodash/map';
import __throttle from '../../shared/function/throttle';

/**
 * @name      splitLines
 * @namespace            js.dom.utils
 * @type      Function
 * @platform          js
 * @status      beta
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
 * @setting 	{String} 			[tag="p"] 		The tag to use to split the lines
 * @setting 	{String} 			[class="s-split-lines"] 		The class to apply on the tags
 *
 * @param 	{HTMLElement} 		elm 		 	The HTMLElement to split lines in
 * @param     {ISplitLinesSettings}       [settings={}]       Some settings to tweak the process
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
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISplitLinesSettings {
    tag: string;
    class: string;
}

function splitLines(
    elm: HTMLElement,
    settings: Partial<ISplitLinesSettings> = {},
): HTMLElement {
    settings = {
        tag: 'p',
        class: 'split-lines',
        ...settings,
    };

    // apply again on resize
    window.addEventListener(
        'resize',
        __throttle((e) => {
            _splitLines(elm, settings);
        }, 150),
    );

    // first call
    _splitLines(elm, settings);

    return elm;
}

function _splitLines(elm, settings) {
    let string = elm._splitLinesOriginalString;
    if (!string) {
        string = elm.innerHTML;
        elm._splitLinesOriginalString = string;
    }

    elm.classList.add(settings.class);

    // wrap each characters inside two spans
    let words = string.match(
        /<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g,
    );
    words = _map(words, (word) => {
        return `<span class="s-split-lines">${word}</span>`;
    }).join(' ');
    elm.innerHTML = words;

    const spans = elm.querySelectorAll('span.s-split-lines');
    let top = null;
    const lines = [];
    let line = [];
    [].forEach.call(spans, (spanElm) => {
        const spanTop = spanElm.getBoundingClientRect().top;
        if (top && spanTop !== top) {
            lines.push(line.join(' '));
            line = [];
        }
        line.push(spanElm.innerHTML.trim());
        top = spanTop;
    });
    lines.push(line.join(' '));

    elm.innerHTML = lines
        .map((lineStr) => {
            return `<${settings.tag} class="${settings.class}__line">${lineStr}</${settings.tag}>`;
        })
        .join('');
}
export default splitLines;
