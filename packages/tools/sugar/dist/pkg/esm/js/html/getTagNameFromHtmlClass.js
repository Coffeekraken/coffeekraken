// @ts-nocheck
import __htmlTagToHtmlClassMap from './htmlTagToHtmlClassMap';
/**
 * @name            getHtmlhtmlClassFromHtmlClass
 * @namespace            js.html
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
 * @example       js
 * import getHtmlhtmlClassFromHtmlClass from '@coffeekraken/sugar/js/html/getHtmlhtmlClassFromHtmlClass';
 * getHtmlhtmlClassFromHtmlClass(HTMLAnchorElement); // => 'a'
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function getHtmlhtmlClassFromHtmlClass(htmlClass) {
    if (!htmlClass)
        return false;
    for (const key in __htmlTagToHtmlClassMap) {
        if (__htmlTagToHtmlClassMap[key] === htmlClass)
            return key;
    }
    return false;
}
export default getHtmlhtmlClassFromHtmlClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLHVCQUF1QixNQUFNLHlCQUF5QixDQUFDO0FBRTlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsNkJBQTZCLENBQUMsU0FBc0I7SUFDekQsSUFBSSxDQUFDLFNBQVM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUU3QixLQUFLLE1BQU0sR0FBRyxJQUFJLHVCQUF1QixFQUFFO1FBQ3ZDLElBQUksdUJBQXVCLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUztZQUFFLE9BQU8sR0FBRyxDQUFDO0tBQzlEO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUNELGVBQWUsNkJBQTZCLENBQUMifQ==