// @ts-nocheck

import __upperFirst from '../../shared/string/upperFirst';
import __htmlTagToHtmlClassMap from './htmlTagToHtmlClassMap';

/**
 * @name            getHtmlhtmlClassFromHtmlClass
 * @namespace            js.html
 * @type            Function
 * @stable
 *
 * This function simply return the tagname depending on the passed HTML class
 * like HTMLAnchorElement, HTMLLinkElement, etc...
 *
 * @param       {HTMLElement}      htmlClass       The htmlClass to get the tag for
 * @return      {String}               The tagname that correspond to the passed HTMLElement class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import getHtmlhtmlClassFromHtmlClass from '@coffeekraken/sugar/js/html/getHtmlhtmlClassFromHtmlClass';
 * getHtmlhtmlClassFromHtmlClass(HTMLAnchorElement); // => 'a'
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function getHtmlhtmlClassFromHtmlClass(htmlClass) {
  if (!htmlClass) return false;

  for (const key in __htmlTagToHtmlClassMap) {
    if (__htmlTagToHtmlClassMap[key] === htmlClass) return key;
  }

  return false;
}
export default getHtmlhtmlClassFromHtmlClass;
