"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toString;

/**
 * @name            toString
 * @namespace           sugar.js.html
 * @type      Function
 *
 * Return the string version of a dom node or the dom node and his children
 *
 * @param    {HTMLElement}    html    The HTMLElement to convert to string
 * @param    {Boolean}    [deep=true]    Include or not his children
 * @return    {String}    The string version of the dom node
 *
 * @example    js
 * import toString from '@coffeekraken/sugar/js/string/toString'
 * const myDomNode = document.querySelector('.my-dom-node')
 * toString(myDomNode, false) // <div class="my-dom-node"></div>
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function toString(html, deep) {
  if (deep === void 0) {
    deep = true;
  }

  if (document !== undefined && document.createElement !== undefined) {
    var cont = document.createElement('div');
    cont.appendChild(html.cloneNode(deep));
    return cont.innerHTML;
  }

  return html;
}

module.exports = exports.default;