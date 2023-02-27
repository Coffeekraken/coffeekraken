// @ts-nocheck
import exitFullscreen from './exitFullscreen';
import requestFullscreen from './requestFullscreen';
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
 * @snippet         __toggleFullscreen()
 *
 * @example   js
 * import { __toggleFullscreen } from '@coffeekraken/sugar/dom'
 * __toggleFullscreen(myDomElm)
 *
 * @since           2.0.0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLGlCQUFpQixNQUFNLHFCQUFxQixDQUFDO0FBRXBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGtCQUFrQixDQUFDLEdBQWdCO0lBQ3ZELE1BQU0sYUFBYSxHQUNmLFFBQVEsQ0FBQyxpQkFBaUI7UUFDMUIsUUFBUSxDQUFDLG9CQUFvQjtRQUM3QixRQUFRLENBQUMsdUJBQXVCLENBQUM7SUFDckMsSUFBSSxDQUFDLGFBQWEsSUFBSSxhQUFhLEtBQUssR0FBRyxFQUFFO1FBQ3pDLE9BQU8saUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakM7U0FBTTtRQUNILE9BQU8sY0FBYyxFQUFFLENBQUM7S0FDM0I7QUFDTCxDQUFDIn0=