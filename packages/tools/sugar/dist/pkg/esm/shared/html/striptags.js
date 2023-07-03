// @ts-nocheck
import __stripTags from 'striptags';
/**
 * @name        stripTags
 * @namespace            shared.html
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
 * @snippet         __stripTags($1)
 *
 * @example    js
 * import { __stripTags } from '@coffeekraken/sugar/html'
 * __stripTags('<p><span>Hello</span> world</p>', '<span>') // <span>Hello</span> world
 *
 * @see       https://www.npmjs.com/package/striptags
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function stripTags(html, allowedTags = '', tagReplacement = '') {
    let res = __stripTags(html, allowedTags, tagReplacement);
    return res;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUM7QUFFcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxTQUFTLENBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRyxFQUFFLEVBQUUsY0FBYyxHQUFHLEVBQUU7SUFDekUsSUFBSSxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDekQsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDIn0=