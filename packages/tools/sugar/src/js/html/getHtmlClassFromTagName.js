// @ts-nocheck
import __upperFirst from '../../shared/string/upperFirst';
import __htmlTagToHtmlClassMap from './htmlTagToHtmlClassMap';
/**
 * @name            getHtmlClassFromTagName
 * @namespace            js.html
 * @type            Function
 * @platform          js
 * @platform          ts
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SHRtbENsYXNzRnJvbVRhZ05hbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRIdG1sQ2xhc3NGcm9tVGFnTmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sZ0NBQWdDLENBQUM7QUFDMUQsT0FBTyx1QkFBdUIsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyx1QkFBdUIsQ0FBQyxPQUFlO0lBQzVDLElBQUksQ0FBQyxPQUFPO1FBQUUsT0FBTyxXQUFXLENBQUM7SUFFakMsTUFBTSxpQkFBaUIsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsSUFBSSxNQUFNLENBQUMsT0FBTyxpQkFBaUIsU0FBUyxDQUFDO1FBQ3pDLE9BQU8sTUFBTSxDQUFDLE9BQU8saUJBQWlCLFNBQVMsQ0FBQyxDQUFDO0lBRXJELElBQUksdUJBQXVCLENBQUMsT0FBTyxDQUFDO1FBQ2hDLE9BQU8sdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDO0FBQzlCLENBQUM7QUFDRCxlQUFlLHVCQUF1QixDQUFDIn0=