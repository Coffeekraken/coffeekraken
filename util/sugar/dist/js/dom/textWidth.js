"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = textWidth;

var _getStyleProperty = _interopRequireDefault(require("./getStyleProperty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      textWidth
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Get the text width in px of a passed string or the passed HTMLElement
 *
 * @param 		{String|HTMLElement}		source 		The source to process
 * @return 		{Number} 								The calculated width of the text
 *
 * @example 	js
 * import textWidth from '@coffeekraken/sugar/js/dom/textWidth'
 * // text of an HTMLElement
 * const width = textWidth(myCoolHTMLElement);
 *
 * // text directly (no font-size management so it's less accurate...)
 * const width = textWidth('Hello World');
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function textWidth(source) {
  // create an element
  const elm = document.createElement("span");
  elm.style.whiteSpace = "nowrap";
  elm.style.position = "absolute";
  elm.style.visibility = "hidden";
  let text = source; // if the source if an html element

  if (source.tagName) {
    // set the text into the element
    const tagName = source.tagName.toLowerCase();

    switch (tagName) {
      case "input":
      case "textarea":
        text = source.value;
        break;

      default:
        text = source.innerText;
        break;
    } // get the font properties


    const fs = (0, _getStyleProperty.default)(source, "font-size");
    const ff = (0, _getStyleProperty.default)(source, "font-family");
    const ls = (0, _getStyleProperty.default)(source, "letter-spacing");
    elm.style.fontSize = fs;
    elm.style.fontFamily = ff;
    elm.style.letterSpacing = ls;
  } // replacing spaces


  text = text.replace(/ /g, "\u00a0"); // set the element content

  elm.innerHTML = text; // append the element to the body

  document.body.appendChild(elm); // return the width of the element

  const width = elm.offsetWidth; // remove the element from the dom

  document.body.removeChild(elm); // return the width

  return width;
}

module.exports = exports.default;