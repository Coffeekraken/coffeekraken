// @ts-nocheck
/**
 * @name      stripTags
 * @namespace            js.dom.manipulate
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Strip the tags of the passed text
 *
 * @param    {String}    html    the html to process
 * @return    {String}    The html without any tags
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __stripTags } from '@coffeekraken/sugar/dom'
 * __stripTags('<h1>Hello World</h1>') // => Hello World
 *
 @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __stripTags(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUFDLElBQVk7SUFDNUMsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUNyQixPQUFPLEdBQUcsQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7QUFDbEQsQ0FBQyJ9