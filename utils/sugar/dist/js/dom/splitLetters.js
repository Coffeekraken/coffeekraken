"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splitLetters;

var _map2 = _interopRequireDefault(require("lodash/map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
/**
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
 * @example 	js
 * import __splitLetters from '@coffeekraken/sugar/js/dom/splitLetters'
 * const myCoolElement = document.querySelector('.my-cool-element');
 * __splitLetters(myCoolElement);
 *
 * @param 	{HTMLElement} 		elm 		 	The HTMLElement to split letters in
 * @param 	{String} 			[tag="span"] 	The tag to use to split the letters
 * @param 	{String} 			[tagClass="s-split-letters"] 		The class to apply on the tags
 * @return 	{HTMLElement} 						The HTMLElement processed
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


function splitLetters(elm, tag = "span", tagClass = "split-letters") {
  let string = elm._splitLettersOriginalString;

  if (!string) {
    string = elm.innerHTML;
    elm._splitLettersOriginalString = string;
  }

  elm.classList.add(tagClass); // wrap each characters inside two spans

  let words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g); // split words

  words = (0, _map2.default)(words, word => {
    return `<${tag} style="white-space:nowrap">${word}</${tag}>`;
  }).join(" ");

  let letters = _decodeHtml(words).split("");

  let hasTagOpened = false;
  letters = (0, _map2.default)(letters, letter => {
    // check if a tag has started
    if (letter === "<") hasTagOpened = true;else if (letter === ">") {
      hasTagOpened = false;
      return letter;
    }
    if (hasTagOpened) return letter;
    if (letter === " ") letter = "&nbsp;";
    return `<${tag} class="${tagClass}__letter-container"><${tag} class="${tagClass}__letter">${letter}</${tag}></${tag}>`;
  });
  elm.innerHTML = letters.join("");
  return elm;
}

module.exports = exports.default;