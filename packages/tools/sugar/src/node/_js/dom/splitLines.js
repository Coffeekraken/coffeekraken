"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splitLines;

var _map2 = _interopRequireDefault(require("lodash/map"));

var _throttle = _interopRequireDefault(require("../function/throttle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      splitLines
 * @namespace           sugar.js.dom
 * @type      Function
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
 * @param 	{HTMLElement} 		elm 		 	The HTMLElement to split lines in
 * @param 	{String} 			[tag="p"] 		The tag to use to split the lines
 * @param 	{String} 			[tagClass="s-split-lines"] 		The class to apply on the tags
 * @return 	{HTMLElement} 						The HTMLElement processed
 *
 * @example 	js
 * import splitLines from '@coffeekraken/sugar/js/dom/splitLines'
 * const myCoolElement = document.querySelector('.my-cool-element');
 * splitLines(myCoolElement);
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function splitLines(elm, tag, tagClass) {
  if (tag === void 0) {
    tag = 'p';
  }

  if (tagClass === void 0) {
    tagClass = 'split-lines';
  }

  // apply again on resize
  window.addEventListener('resize', (0, _throttle.default)(e => {
    _splitLines(elm, tag, tagClass);
  }, 150)); // first call

  _splitLines(elm, tag, tagClass);

  return elm;
}

function _splitLines(elm, tag, tagClass) {
  var string = elm._splitLinesOriginalString;

  if (!string) {
    string = elm.innerHTML;
    elm._splitLinesOriginalString = string;
  }

  elm.classList.add(tagClass); // wrap each characters inside two spans

  var words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
  words = (0, _map2.default)(words, word => {
    return "<span class=\"s-split-lines\">".concat(word, "</span>");
  }).join(' ');
  elm.innerHTML = words;
  var spans = elm.querySelectorAll('span.s-split-lines');
  var top = null;
  var lines = [];
  var line = [];
  [].forEach.call(spans, spanElm => {
    var spanTop = spanElm.getBoundingClientRect().top;

    if (top && spanTop !== top) {
      lines.push(line.join(' '));
      line = [];
    }

    line.push(spanElm.innerHTML.trim());
    top = spanTop;
  });
  lines.push(line.join(' '));
  elm.innerHTML = lines.map(lineStr => {
    return "<".concat(tag, " class=\"").concat(tagClass, "__line\">").concat(lineStr, "</").concat(tag, ">");
  }).join('');
}

module.exports = exports.default;