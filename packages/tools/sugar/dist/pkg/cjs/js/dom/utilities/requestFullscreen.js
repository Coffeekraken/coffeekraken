"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
 * import { __requestFullscreen } from '@coffeekraken/sugar/dom'
 *  __requestFullscreen(myDomElm)
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __requestFullscreen(elm) {
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
exports.default = __requestFullscreen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBd0IsbUJBQW1CLENBQUMsR0FBZ0I7SUFDeEQsSUFBSSxHQUFHLENBQUMsaUJBQWlCLEVBQUU7UUFDdkIsT0FBTyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztLQUNsQztTQUFNLElBQUksR0FBRyxDQUFDLG9CQUFvQixFQUFFO1FBQ2pDLE9BQU8sR0FBRyxDQUFDLG9CQUFvQixFQUFFLENBQUM7S0FDckM7U0FBTSxJQUFJLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRTtRQUNwQyxPQUFPLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0tBQ3hDO1NBQU0sSUFBSSxHQUFHLENBQUMsbUJBQW1CLEVBQUU7UUFDaEMsT0FBTyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztLQUNwQztBQUNMLENBQUM7QUFWRCxzQ0FVQyJ9