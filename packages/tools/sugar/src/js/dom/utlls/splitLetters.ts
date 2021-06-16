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
 * @platform      js
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
 * @example 	js
 * import __splitLetters from '@coffeekraken/sugar/js/dom/splitLetters'
 * const myCoolElement = document.querySelector('.my-cool-element');
 * __splitLetters(myCoolElement);
 *
 * @since       1.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISplitLettersSettings {
  tag: string;
  class: string;
}

function splitLetters(elm: HTMLElement, settings: Partial<ISplitLettersSettings> = {}): HTMLElement {

  settings = {
    tag: 'span',
    class: 's-split-litters',
    ...settings
  };

  let string = elm._splitLettersOriginalString;
  if (!string) {
    string = elm.innerHTML;
    elm._splitLettersOriginalString = string;
  }

  elm.classList.add(settings.class);

  // wrap each characters inside two spans
  let words = string.match(
    /<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g
  );

  // split words
  words = _map(words, (word) => {
    return `<${settings.tag} style="white-space:nowrap">${word}</${settings.tag}>`;
  }).join(' ');

  let letters = _decodeHtml(words).split('');

  let hasTagOpened = false;
  letters = _map(letters, (letter) => {
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
export default splitLetters;
