"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splitLetters;

var _map2 = _interopRequireDefault(require("lodash/map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _decodeHtml(html) {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}
/**
 * @name      splitLetters
 * @namespace           js.dom
 * @type      Function
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
 * @example 	js
 * import __splitLetters from '@coffeekraken/sugar/js/dom/splitLetters'
 * const myCoolElement = document.querySelector('.my-cool-element');
 * __splitLetters(myCoolElement);
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


function splitLetters(elm, tag, tagClass) {
  if (tag === void 0) {
    tag = 'span';
  }

  if (tagClass === void 0) {
    tagClass = 'split-letters';
  }

  var string = elm._splitLettersOriginalString;

  if (!string) {
    string = elm.innerHTML;
    elm._splitLettersOriginalString = string;
  }

  elm.classList.add(tagClass); // wrap each characters inside two spans

  var words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g); // split words

  words = (0, _map2.default)(words, word => {
    return "<".concat(tag, " style=\"white-space:nowrap\">").concat(word, "</").concat(tag, ">");
  }).join(' ');

  var letters = _decodeHtml(words).split('');

  var hasTagOpened = false;
  letters = (0, _map2.default)(letters, letter => {
    // check if a tag has started
    if (letter === '<') hasTagOpened = true;else if (letter === '>') {
      hasTagOpened = false;
      return letter;
    }
    if (hasTagOpened) return letter;
    if (letter === ' ') letter = '&nbsp;';
    return "<".concat(tag, " class=\"").concat(tagClass, "__letter-container\"><").concat(tag, " class=\"").concat(tagClass, "__letter\">").concat(letter, "</").concat(tag, "></").concat(tag, ">");
  });
  elm.innerHTML = letters.join('');
  return elm;
}

module.exports = exports.default;