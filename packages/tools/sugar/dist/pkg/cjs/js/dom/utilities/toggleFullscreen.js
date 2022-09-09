"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const requestFullscreen_1 = __importDefault(require("./requestFullscreen"));
const exitFullscreen_1 = __importDefault(require("./exitFullscreen"));
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
function __toggleFullscreen(elm) {
    const fullscreenElm = document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement;
    if (!fullscreenElm || fullscreenElm !== elm) {
        return (0, requestFullscreen_1.default)(elm);
    }
    else {
        return (0, exitFullscreen_1.default)();
    }
}
exports.default = __toggleFullscreen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFvRDtBQUNwRCxzRUFBOEM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUF3QixrQkFBa0IsQ0FBQyxHQUFnQjtJQUN2RCxNQUFNLGFBQWEsR0FDZixRQUFRLENBQUMsaUJBQWlCO1FBQzFCLFFBQVEsQ0FBQyxvQkFBb0I7UUFDN0IsUUFBUSxDQUFDLHVCQUF1QixDQUFDO0lBQ3JDLElBQUksQ0FBQyxhQUFhLElBQUksYUFBYSxLQUFLLEdBQUcsRUFBRTtRQUN6QyxPQUFPLElBQUEsMkJBQWlCLEVBQUMsR0FBRyxDQUFDLENBQUM7S0FDakM7U0FBTTtRQUNILE9BQU8sSUFBQSx3QkFBYyxHQUFFLENBQUM7S0FDM0I7QUFDTCxDQUFDO0FBVkQscUNBVUMifQ==