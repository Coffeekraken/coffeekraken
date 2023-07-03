// @ts-nocheck
import __htmlTagToHtmlClassMap from './htmlTagToHtmlClassMap';
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
export default function __getTagNameFromHtmlClass(htmlClass) {
    if (!htmlClass)
        return false;
    for (const key in __htmlTagToHtmlClassMap) {
        if (__htmlTagToHtmlClassMap[key] === htmlClass)
            return key;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLHVCQUF1QixNQUFNLHlCQUF5QixDQUFDO0FBRTlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSx5QkFBeUIsQ0FDN0MsU0FBc0I7SUFFdEIsSUFBSSxDQUFDLFNBQVM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUU3QixLQUFLLE1BQU0sR0FBRyxJQUFJLHVCQUF1QixFQUFFO1FBQ3ZDLElBQUksdUJBQXVCLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUztZQUFFLE9BQU8sR0FBRyxDQUFDO0tBQzlEO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyJ9