// @ts-nocheck
import requestFullscreen from './requestFullscreen';
import exitFullscreen from './exitFullscreen';
/**
 * @name      toggleFullscreen
 * @namespace            js.dom.utils
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Toggle the fullscreen mode
 *
 * @param    {HTMLElement}    elm    The element on which to request the fullscreen
 * @return    {Promise}   Returns a Promise which is resolved once full-screen mode has been des/activated.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example   js
 * import { __toggleFullscreen } from '@coffeekraken/sugar/dom'
 * __toggleFullscreen(myDomElm)
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __toggleFullscreen(elm) {
    const fullscreenElm = document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement;
    if (!fullscreenElm || fullscreenElm !== elm) {
        return requestFullscreen(elm);
    }
    else {
        return exitFullscreen();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGlCQUFpQixNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBRTlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxrQkFBa0IsQ0FBQyxHQUFnQjtJQUN2RCxNQUFNLGFBQWEsR0FDZixRQUFRLENBQUMsaUJBQWlCO1FBQzFCLFFBQVEsQ0FBQyxvQkFBb0I7UUFDN0IsUUFBUSxDQUFDLHVCQUF1QixDQUFDO0lBQ3JDLElBQUksQ0FBQyxhQUFhLElBQUksYUFBYSxLQUFLLEdBQUcsRUFBRTtRQUN6QyxPQUFPLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2pDO1NBQU07UUFDSCxPQUFPLGNBQWMsRUFBRSxDQUFDO0tBQzNCO0FBQ0wsQ0FBQyJ9