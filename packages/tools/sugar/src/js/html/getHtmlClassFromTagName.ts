// @ts-nocheck

import __upperFirst from '../../shared/string/upperFirst';
import __htmlTagToHtmlClassMap from './htmlTagToHtmlClassMap';

/**
 * @name            getHtmlClassFromTagName
 * @namespace            js.html
 * @type            Function
 * @platform          js
 * @status        beta
 *
 * This function simply return the HTML{name}Element class depending on the passed
 * tag name like "p", "input", "textarea", etc...
 *
 * @param       {String}      tagName       The tagName to get the class for
 * @return      {HTMLElement}               The HTMLElement class that correspond to the requested tag name
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import getHtmlClassFromTagName from '@coffeekraken/sugar/js/html/getHtmlClassFromTagName';
 * getHtmlClassFromTagName('a'); // => HTMLAnchorElement
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function getHtmlClassFromTagName(tagName: string): HTMLElement {
    if (!tagName) return HTMLElement;

    const tagNameUpperFirst = __upperFirst(tagName);
    if (window[`HTML${tagNameUpperFirst}Element`])
        return window[`HTML${tagNameUpperFirst}Element`];

    if (__htmlTagToHtmlClassMap[tagName])
        return __htmlTagToHtmlClassMap[tagName];

    return window.HTMLElement;
}
export default getHtmlClassFromTagName;
