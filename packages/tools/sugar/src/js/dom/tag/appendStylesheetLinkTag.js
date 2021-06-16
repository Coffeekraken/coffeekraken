// @ts-nocheck
import linkLoaded from './linkLoaded';
/**
 * @name        appendStylesheetLinkTag
 * @namespace            js.dom.tag
 * @type      Function
 * @platform        js
 * @status        beta
 *
 * Append a stylesheet link to the page head
 *
 * @param    {String}    href    THe url to the stylesheet
 * @return    {Promise}    A promise when the stylesheet is loaded with the link element as parameter
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import appendStylesheetLink from '@coffeekraken/sugar/js/dom/appendStylesheetLink'
 * appendStylesheetLink('/dist/css/style.css')
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function appendStylesheetLink(href) {
    const $link = document.createElement('link');
    $link.type = 'text/css';
    $link.rel = 'stylesheet';
    $link.href = href;
    document.head.appendChild($link);
    return linkLoaded($link);
}
export default appendStylesheetLink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwZW5kU3R5bGVzaGVldExpbmtUYWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHBlbmRTdHlsZXNoZWV0TGlua1RhZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFVLE1BQU0sY0FBYyxDQUFDO0FBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxvQkFBb0IsQ0FBQyxJQUFZO0lBQ3hDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7SUFDeEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUM7SUFDekIsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbEIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0IsQ0FBQztBQUNELGVBQWUsb0JBQW9CLENBQUMifQ==