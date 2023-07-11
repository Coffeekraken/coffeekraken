// @ts-nocheck

import exitFullscreen from './exitFullscreen.js';
import requestFullscreen from './requestFullscreen.js';

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
export default function __toggleFullscreen(elm: HTMLElement): Promise<any> {
    const fullscreenElm =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement;
    if (!fullscreenElm || fullscreenElm !== elm) {
        return requestFullscreen(elm);
    } else {
        return exitFullscreen();
    }
}
