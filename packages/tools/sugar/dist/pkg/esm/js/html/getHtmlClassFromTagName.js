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
function getHtmlClassFromTagName(tagName) {
    if (!tagName)
        return HTMLElement;
    const tagNameUpperFirst = __upperFirst(tagName);
    if (window[`HTML${tagNameUpperFirst}Element`])
        return window[`HTML${tagNameUpperFirst}Element`];
    if (__htmlTagToHtmlClassMap[tagName])
        return __htmlTagToHtmlClassMap[tagName];
    return window.HTMLElement;
}
export default getHtmlClassFromTagName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSxnQ0FBZ0MsQ0FBQztBQUMxRCxPQUFPLHVCQUF1QixNQUFNLHlCQUF5QixDQUFDO0FBRTlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsdUJBQXVCLENBQUMsT0FBZTtJQUM1QyxJQUFJLENBQUMsT0FBTztRQUFFLE9BQU8sV0FBVyxDQUFDO0lBRWpDLE1BQU0saUJBQWlCLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELElBQUksTUFBTSxDQUFDLE9BQU8saUJBQWlCLFNBQVMsQ0FBQztRQUN6QyxPQUFPLE1BQU0sQ0FBQyxPQUFPLGlCQUFpQixTQUFTLENBQUMsQ0FBQztJQUVyRCxJQUFJLHVCQUF1QixDQUFDLE9BQU8sQ0FBQztRQUNoQyxPQUFPLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQztBQUM5QixDQUFDO0FBQ0QsZUFBZSx1QkFBdUIsQ0FBQyJ9