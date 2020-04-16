/**
 * @name            toString
 * @namespace       sugar.js.html
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
export default function toString(html, deep = true) {
  if (document !== undefined && document.createElement !== undefined) {
    const cont = document.createElement("div");
    cont.appendChild(html.cloneNode(deep));
    return cont.innerHTML;
  }
  return html;
}
