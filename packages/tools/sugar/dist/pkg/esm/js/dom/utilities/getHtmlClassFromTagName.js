// @ts-nocheck
import __upperFirst from '../../../shared/string/upperFirst';
import __htmlTagToHtmlClassMap from './htmlTagToHtmlClassMap';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSxtQ0FBbUMsQ0FBQztBQUM3RCxPQUFPLHVCQUF1QixNQUFNLHlCQUF5QixDQUFDO0FBRTlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSx5QkFBeUIsQ0FDN0MsT0FBZTtJQUVmLElBQUksQ0FBQyxPQUFPO1FBQUUsT0FBTyxXQUFXLENBQUM7SUFFakMsTUFBTSxpQkFBaUIsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsSUFBSSxNQUFNLENBQUMsT0FBTyxpQkFBaUIsU0FBUyxDQUFDO1FBQ3pDLE9BQU8sTUFBTSxDQUFDLE9BQU8saUJBQWlCLFNBQVMsQ0FBQyxDQUFDO0lBRXJELElBQUksdUJBQXVCLENBQUMsT0FBTyxDQUFDO1FBQ2hDLE9BQU8sdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDO0FBQzlCLENBQUMifQ==