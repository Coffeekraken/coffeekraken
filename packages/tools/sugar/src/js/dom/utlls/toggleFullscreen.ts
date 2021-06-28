// @ts-nocheck

import requestFullscreen from './requestFullscreen';
import exitFullscreen from './exitFullscreen';

/**
 * @name      toggleFullscreen
 * @namespace            js.dom.utils
 * @type      Function
 * @platform          js
 * @platform          ts
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
 * import toggleFullscreen from '@coffeekraken/sugar/js/dom/toggleFullscreen'
 * toggleFullscreen(myDomElm)
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function toggleFullscreen(elm: HTMLElement): Promise<any> {
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
export default toggleFullscreen;
