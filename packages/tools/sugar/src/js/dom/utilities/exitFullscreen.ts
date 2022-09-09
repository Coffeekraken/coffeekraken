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
 * @example    js
 * import { __exitFullscreen } from '@coffeekraken/sugar/dom'
 * __exitFullscreen()
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __exitFullscreen(): Promise<any> {
    if (document.cancelFullScreen) {
        return document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        return document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        return document.webkitCancelFullScreen();
    }
}
