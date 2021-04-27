// @ts-nocheck
import __striptags from 'striptags';
/**
 * @name        striptags
 * @namespace            js.html
 * @type      Function
 * @stable
 *
 * Strip tags of an html string.
 * This is a simple wrapper of the nice "striptags" package that you can find here: https://www.npmjs.com/package/striptags
 *
 * @param    {String}    html    The html string to process
 * @param    {String}    allowableTags    The tags that are allowed like <h1><h2>...
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function striptags(html, allowedTags, tagReplacement) {
    return __striptags(html, allowedTags, tagReplacement);
}
export default striptags;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXB0YWdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC9odG1sL3N0cmlwdGFncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBRXBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyxTQUFTLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxjQUFjO0lBQ2xELE9BQU8sV0FBVyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUNELGVBQWUsU0FBUyxDQUFDIn0=