/**
 * @name        strToHtml
 * @namespace           sugar.js.html
 * @type      Function
 *
 * Return the html (dom) version of a string
 *
 * @param    {HTMLElement}    html    The string to convert to dom nodes
 * @return    {HTMLElement}    The dom nodes representation of the passed string
 *
 * @example    js
 * import strToHtml from '@coffeekraken/sugar/js/html/strToHtml'
 * const myString = '<p>Hello World</p>'
 * strToHtml(myString) // <p>Hello World</p>
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function strToHtml(string) {
  if (document !== undefined && document.createElement !== undefined) {
    const cont = document.createElement('div');
    cont.innerHTML = string;
    if (cont.children.length === 1) {
      return cont.children[0];
    } else {
      return cont;
    }
  }
  return string;
}
