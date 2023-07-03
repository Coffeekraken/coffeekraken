// @ts-nocheck
/**
 * @name        isUcBrowser
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect if is the UC stock browser that is running the page
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isUcBrowser()
 *
 * @example    js
 * import { __isUcBrowser } from '@coffeekraken/sugar/is'
 * if (__isUcBrowser()) {
 *   // do something
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isUcBrowser(ua = navigator.userAgent) {
    return ua.match(/UCBrowser/i) !== null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYSxDQUNqQyxLQUFhLFNBQVMsQ0FBQyxTQUFTO0lBRWhDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxJQUFJLENBQUM7QUFDM0MsQ0FBQyJ9