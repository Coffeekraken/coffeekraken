"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = htmlToStr;

/**
 * @name        htmlToStr
 * @namespace       sugar.js.string
 * @type      Function
 *
 * Return the string version of a dom node or the dom node and his children
 *
 * @param    {HTMLElement}    html    The HTMLElement to convert to string
 * @param    {Boolean}    [deep=true]    Include or not his children
 * @return    {String}    The string version of the dom node
 *
 * @example    js
 * import htmlToStr from '@coffeekraken/sugar/js/string/htmlToStr'
 * const myDomNode = document.querySelector('.my-dom-node')
 * htmlToStr(myDomNode, false) // <div class="my-dom-node"></div>
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function htmlToStr(html, deep = true) {
  if (document !== undefined && document.createElement !== undefined) {
    const cont = document.createElement("div");
    cont.appendChild(html.cloneNode(deep));
    return cont.innerHTML;
  }

  return html;
}

module.exports = exports.default;