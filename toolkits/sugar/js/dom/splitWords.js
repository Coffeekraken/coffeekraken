"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splitWords;

var _map2 = _interopRequireDefault(require("lodash/map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      splitWords
 * @namespace           js.dom
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
function splitWords(elm, tag, tagClass) {
  if (tag === void 0) {
    tag = 'span';
  }

  if (tagClass === void 0) {
    tagClass = 'split-words';
  }

  // first call
  _splitWords(elm, tag, tagClass);

  return elm;
}

function _splitWords(elm, tag, tagClass) {
  var string = elm._splitWordsOriginalString;

  if (!string) {
    string = elm.innerHTML;
    elm._splitWordsOriginalString = string;
  }

  elm.classList.add(tagClass); // wrap each characters inside two spans

  var words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
  words = (0, _map2.default)(words, word => {
    return "<".concat(tag, " class=\"").concat(tagClass, "__word\">").concat(word, "</").concat(tag, ">");
  }).join(' ');
  elm.innerHTML = words;
}

module.exports = exports.default;