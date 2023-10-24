import __escape from 'escape-html';

/**
 * @name            escapeHtml
 * @namespace       shared.html
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function allows you to escape some html characters like &lt;, etc...
 *
 * @param       {String}            html            The html to unescape
 * @return      {String}                            The unescaped html
 *
 * @snippet         __escapeHtml($1)
 *
 * @example         js
 * import { __escapeHtml } from '@coffeekraken/sugar/html';
 * __escapeHtml('<s-code-example>'); // => &lt;s-code-example&gt;
 *
 * @see             https://www.npmjs.com/package/escape-html
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __escapeHtml(html): string {
    // @ts-ignore
    return __escape(html);
}
