// @ts-nocheck
import __striptags from 'striptags';
/**
 * @name        striptags
 * @namespace            js.html
 * @type      Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * Strip tags of an html string.
 * This is a simple wrapper of the nice "striptags" package that you can find here: https://www.npmjs.com/package/striptags
 *
 * @param    {String}    html    The html string to process
 * @param    {String}    allowedTags    The tags that are allowed like <h1><h2>...
 * @param     {String}    tagReplacement    A string with which you want to replace the tags
 * @return    {String}    The processed string without tags
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import striptags from '@coffeekraken/sugar/js/string/striptags'
 * striptags('<p><span>Hello</span> world</p>', '<span>') // <span>Hello</span> world
 *
 * @see       https://www.npmjs.com/package/striptags
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function striptags(html, allowedTags = '', tagReplacement = '') {
    return __striptags(html, allowedTags, tagReplacement);
}
export default striptags;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUM7QUFFcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILFNBQVMsU0FBUyxDQUFDLElBQUksRUFBRSxXQUFXLEdBQUcsRUFBRSxFQUFFLGNBQWMsR0FBRyxFQUFFO0lBQzFELE9BQU8sV0FBVyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUNELGVBQWUsU0FBUyxDQUFDIn0=