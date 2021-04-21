// @ts-nocheck

import linkLoaded from './linkLoaded';

/**
 * @name        appendStylesheetLink
 * @namespace            js.dom
 * @type      Function
 * @stable
 *
 * Append a stylesheet link to the page head
 *
 * @param    {String}    href    THe url to the stylesheet
 * @return    {Promise}    A promise when the stylesheet is loaded with the link element as parameter
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import appendStylesheetLink from '@coffeekraken/sugar/js/dom/appendStylesheetLink'
 * appendStylesheetLink('/dist/css/style.css')
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function appendStylesheetLink(href) {
  const $link = document.createElement('link');
  $link.type = 'text/css';
  $link.rel = 'stylesheet';
  $link.href = href;
  document.head.appendChild($link);
  return linkLoaded($link);
}
export default appendStylesheetLink;
