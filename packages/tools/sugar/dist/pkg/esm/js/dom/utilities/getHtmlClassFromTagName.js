// @ts-nocheck
import { __htmlTagToHtmlClassMap } from '@coffeekraken/sugar/dom';
import __upperFirst from '../../../shared/string/upperFirst';
/**
 * @name            getHtmlClassFromTagName
 * @namespace            js.dom.utils
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
 * @snippet         __getHtmlClassFromTagName($1)
 *
 * @example       js
 * import { __getHtmlClassFromTagName } from '@coffeekraken/sugar/dom';
 *  __getHtmlClassFromTagName('a'); // => HTMLAnchorElement
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __getHtmlClassFromTagName(tagName) {
    if (!tagName)
        return HTMLElement;
    const tagNameUpperFirst = __upperFirst(tagName);
    if (window[`HTML${tagNameUpperFirst}Element`])
        return window[`HTML${tagNameUpperFirst}Element`];
    if (__htmlTagToHtmlClassMap[tagName])
        return __htmlTagToHtmlClassMap[tagName];
    return window.HTMLElement;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRSxPQUFPLFlBQVksTUFBTSxtQ0FBbUMsQ0FBQztBQUU3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUseUJBQXlCLENBQzdDLE9BQWU7SUFFZixJQUFJLENBQUMsT0FBTztRQUFFLE9BQU8sV0FBVyxDQUFDO0lBRWpDLE1BQU0saUJBQWlCLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELElBQUksTUFBTSxDQUFDLE9BQU8saUJBQWlCLFNBQVMsQ0FBQztRQUN6QyxPQUFPLE1BQU0sQ0FBQyxPQUFPLGlCQUFpQixTQUFTLENBQUMsQ0FBQztJQUVyRCxJQUFJLHVCQUF1QixDQUFDLE9BQU8sQ0FBQztRQUNoQyxPQUFPLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQztBQUM5QixDQUFDIn0=