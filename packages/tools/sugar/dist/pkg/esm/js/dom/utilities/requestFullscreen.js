// @ts-nocheck
/**
 * @name      requestFullscreen
 * @namespace            js.dom.utils
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Request fullscreen on the passed DOM element
 *
 * @param    {HTMLElement}    elm    The element on which to request the fullscreen
 * @return    {Promise}   Returns a Promise which is resolved once full-screen mode has been activated.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __requestFullscreen()
 *
 * @example    js
 * import { __requestFullscreen } from '@coffeekraken/sugar/dom'
 *  __requestFullscreen(myDomElm)
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __requestFullscreen(elm) {
    if (elm.requestFullscreen) {
        return elm.requestFullscreen();
    }
    else if (elm.mozRequestFullScreen) {
        return elm.mozRequestFullScreen();
    }
    else if (elm.webkitRequestFullscreen) {
        return elm.webkitRequestFullscreen();
    }
    else if (elm.msRequestFullscreen) {
        return elm.msRequestFullscreen();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxtQkFBbUIsQ0FBQyxHQUFnQjtJQUN4RCxJQUFJLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRTtRQUN2QixPQUFPLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0tBQ2xDO1NBQU0sSUFBSSxHQUFHLENBQUMsb0JBQW9CLEVBQUU7UUFDakMsT0FBTyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztLQUNyQztTQUFNLElBQUksR0FBRyxDQUFDLHVCQUF1QixFQUFFO1FBQ3BDLE9BQU8sR0FBRyxDQUFDLHVCQUF1QixFQUFFLENBQUM7S0FDeEM7U0FBTSxJQUFJLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRTtRQUNoQyxPQUFPLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0tBQ3BDO0FBQ0wsQ0FBQyJ9