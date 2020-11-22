import __upperFirst from '../string/upperFirst';
import __htmlTagToHtmlClassMap from './htmlTagToHtmlClassMap';

/**
 * @name            getHtmlhtmlClassFromHtmlClass
 * @namespace       sugar.js.html
 * @type            Function
 *
 * This function simply return the tagname depending on the passed HTML class
 * like HTMLAnchorElement, HTMLLinkElement, etc...
 *
 * @param       {HTMLElement}      htmlClass       The htmlClass to get the tag for
 * @return      {String}               The tagname that correspond to the passed HTMLElement class
 *
 * @example       js
 * import getHtmlhtmlClassFromHtmlClass from '@coffeekraken/sugar/js/html/getHtmlhtmlClassFromHtmlClass';
 * getHtmlhtmlClassFromHtmlClass(HTMLAnchorElement); // => 'a'
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function getHtmlhtmlClassFromHtmlClass(htmlClass) {
  if (!htmlClass) return false;

  for (let key in __htmlTagToHtmlClassMap) {
    if (__htmlTagToHtmlClassMap[key] === htmlClass) return key;
  }

  return false;
}
