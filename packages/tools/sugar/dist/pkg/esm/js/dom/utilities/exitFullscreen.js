// @ts-nocheck
/**
 * @name      exitFullscreen
 * @namespace            js.dom.utils
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Exit the fullscreen mode
 *
 * @return    {Promise}    Returns a Promise which is resolved once full-screen mode has been desactivated.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __exitFullscreen()
 *
 * @example    js
 * import { __exitFullscreen } from '@coffeekraken/sugar/dom'
 * __exitFullscreen()
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __exitFullscreen() {
    if (document.cancelFullScreen) {
        return document.cancelFullScreen();
    }
    else if (document.mozCancelFullScreen) {
        return document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
        return document.webkitCancelFullScreen();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGdCQUFnQjtJQUNwQyxJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtRQUMzQixPQUFPLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0tBQ3RDO1NBQU0sSUFBSSxRQUFRLENBQUMsbUJBQW1CLEVBQUU7UUFDckMsT0FBTyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztLQUN6QztTQUFNLElBQUksUUFBUSxDQUFDLHNCQUFzQixFQUFFO1FBQ3hDLE9BQU8sUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7S0FDNUM7QUFDTCxDQUFDIn0=