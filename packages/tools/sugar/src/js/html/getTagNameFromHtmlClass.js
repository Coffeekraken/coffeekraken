// @ts-nocheck
import __htmlTagToHtmlClassMap from './htmlTagToHtmlClassMap';
/**
 * @name            getHtmlhtmlClassFromHtmlClass
 * @namespace       sugar.js.html
 * @type            Function
 * @stable
 *
 * This function simply return the tagname depending on the passed HTML class
 * like HTMLAnchorElement, HTMLLinkElement, etc...
 *
 * @param       {HTMLElement}      htmlClass       The htmlClass to get the tag for
 * @return      {String}               The tagname that correspond to the passed HTMLElement class
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VGFnTmFtZUZyb21IdG1sQ2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRUYWdOYW1lRnJvbUh0bWxDbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBR2QsT0FBTyx1QkFBdUIsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsNkJBQTZCLENBQUMsU0FBUztJQUM5QyxJQUFJLENBQUMsU0FBUztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRTdCLEtBQUssTUFBTSxHQUFHLElBQUksdUJBQXVCLEVBQUU7UUFDekMsSUFBSSx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTO1lBQUUsT0FBTyxHQUFHLENBQUM7S0FDNUQ7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFDRCxlQUFlLDZCQUE2QixDQUFDIn0=