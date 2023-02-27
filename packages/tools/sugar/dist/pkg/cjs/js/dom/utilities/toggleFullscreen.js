"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exitFullscreen_1 = __importDefault(require("./exitFullscreen"));
const requestFullscreen_1 = __importDefault(require("./requestFullscreen"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHNFQUE4QztBQUM5Qyw0RUFBb0Q7QUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQXdCLGtCQUFrQixDQUFDLEdBQWdCO0lBQ3ZELE1BQU0sYUFBYSxHQUNmLFFBQVEsQ0FBQyxpQkFBaUI7UUFDMUIsUUFBUSxDQUFDLG9CQUFvQjtRQUM3QixRQUFRLENBQUMsdUJBQXVCLENBQUM7SUFDckMsSUFBSSxDQUFDLGFBQWEsSUFBSSxhQUFhLEtBQUssR0FBRyxFQUFFO1FBQ3pDLE9BQU8sSUFBQSwyQkFBaUIsRUFBQyxHQUFHLENBQUMsQ0FBQztLQUNqQztTQUFNO1FBQ0gsT0FBTyxJQUFBLHdCQUFjLEdBQUUsQ0FBQztLQUMzQjtBQUNMLENBQUM7QUFWRCxxQ0FVQyJ9