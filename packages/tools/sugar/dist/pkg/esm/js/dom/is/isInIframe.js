// @ts-nocheck
/**
 * @name      isInIframe
 * @namespace            js.dom.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Check if the page is loaded inside an iframe
 *
 * @return    {Boolean}    true if in iframe, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __isInIframe } from '@coffeekraken/sugar/dom'
 * if (__isInIframe()) {
 *   // do something
 * }
 *
 @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isInIframe() {
    try {
        return window.self !== window.top;
    }
    catch (e) {
        return true;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFlBQVk7SUFDaEMsSUFBSTtRQUNBLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDO0tBQ3JDO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixPQUFPLElBQUksQ0FBQztLQUNmO0FBQ0wsQ0FBQyJ9