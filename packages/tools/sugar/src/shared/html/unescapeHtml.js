import __unescape from 'unescape';
/**
 * @name            unescapeHtml
 * @namespace       shared.html
 * @type            Function
 * @platform        js
 * @platform        node
 * @platform        ts
 * @status          beta
 *
 * This function allows you to unescape some html characters like &lt;, etc...
 *
 * @param       {String}            html            The html to unescape
 * @return      {String}                            The unescaped html
 *
 * @example         js
 * import unescapeHtml from '@coffeekraken/sugar/shared/html/unescapeHtml';
 * unescapeHtml('&lt;s-code-example&gt;'); // => <s-code-example>
 *
 * @see             https://www.npmjs.com/package/unescape
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function unescapeHtml(html) {
    return __unescape(html);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5lc2NhcGVIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidW5lc2NhcGVIdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxZQUFZLENBQUMsSUFBSTtJQUNyQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM1QixDQUFDIn0=