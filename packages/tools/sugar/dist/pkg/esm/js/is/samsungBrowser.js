// @ts-nocheck
/**
 * @name        isSamsumgBrowser
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect if is the samsung stock browser that is running the page
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return      {Boolean}                                       true if is a samsung browser, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isSamsumgBrowser from '@coffeekraken/sugar/js/is/samsungBrowser'
 * if (isSamsumgBrowser()) {
 *   // do something
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isSamsumgBrowser(ua = navigator.userAgent) {
    return ua.match(/SamsungBrowser/i) !== null;
}
export default isSamsumgBrowser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxLQUFhLFNBQVMsQ0FBQyxTQUFTO0lBQ3RELE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLElBQUksQ0FBQztBQUNoRCxDQUFDO0FBQ0QsZUFBZSxnQkFBZ0IsQ0FBQyJ9