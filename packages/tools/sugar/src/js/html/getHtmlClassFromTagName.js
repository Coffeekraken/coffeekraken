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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SHRtbENsYXNzRnJvbVRhZ05hbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRIdG1sQ2xhc3NGcm9tVGFnTmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sZ0NBQWdDLENBQUM7QUFDMUQsT0FBTyx1QkFBdUIsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLHVCQUF1QixDQUFDLE9BQWU7SUFDNUMsSUFBSSxDQUFDLE9BQU87UUFBRSxPQUFPLFdBQVcsQ0FBQztJQUVqQyxNQUFNLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLGlCQUFpQixTQUFTLENBQUM7UUFDekMsT0FBTyxNQUFNLENBQUMsT0FBTyxpQkFBaUIsU0FBUyxDQUFDLENBQUM7SUFFckQsSUFBSSx1QkFBdUIsQ0FBQyxPQUFPLENBQUM7UUFDaEMsT0FBTyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU1QyxPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFDOUIsQ0FBQztBQUNELGVBQWUsdUJBQXVCLENBQUMifQ==