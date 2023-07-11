// @ts-nocheck

import __htmlTagToHtmlClassMap from './htmlTagToHtmlClassMap.js';

/**
 * @name            getHtmlhtmlClassFromHtmlClass
 * @namespace            js.dom.utils
 * @type            Function
 * @platform          js
 * @status        beta
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
 * @snippet         __getTagNameFromHtmlClass($1)
 *
 * @example       js
 * import { __getTagNameFromHtmlClass } from '@coffeekraken/sugar/dom';
 * __getTagNameFromHtmlClass(HTMLAnchorElement); // => 'a'
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __getTagNameFromHtmlClass(
    htmlClass: HTMLElement,
): string {
    if (!htmlClass) return false;

    for (const key in __htmlTagToHtmlClassMap) {
        if (__htmlTagToHtmlClassMap[key] === htmlClass) return key;
    }

    return false;
}
