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
 * @example    js
 * import requestFullscreen from '@coffeekraken/sugar/js/dom/requestFullscreen'
 * requestFullscreen(myDomElm)
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function requestFullscreen(elm: HTMLElement): Promise<any> {
    if (elm.requestFullscreen) {
        return elm.requestFullscreen();
    } else if (elm.mozRequestFullScreen) {
        return elm.mozRequestFullScreen();
    } else if (elm.webkitRequestFullscreen) {
        return elm.webkitRequestFullscreen();
    } else if (elm.msRequestFullscreen) {
        return elm.msRequestFullscreen();
    }
}
export default requestFullscreen;
