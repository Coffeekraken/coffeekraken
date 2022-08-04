"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
 * import exitFullscreen from '@coffeekraken/sugar/js/dom/exitFullscreen'
 * exitFullscreen()
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function exitFullscreen() {
    if (document.cancelFullScreen) {
        return document.cancelFullScreen();
    }
    else if (document.mozCancelFullScreen) {
        return document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
        return document.webkitCancelFullScreen();
    }
}
exports.default = exitFullscreen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxTQUFTLGNBQWM7SUFDbkIsSUFBSSxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7UUFDM0IsT0FBTyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztLQUN0QztTQUFNLElBQUksUUFBUSxDQUFDLG1CQUFtQixFQUFFO1FBQ3JDLE9BQU8sUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUM7S0FDekM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUN4QyxPQUFPLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0tBQzVDO0FBQ0wsQ0FBQztBQUNELGtCQUFlLGNBQWMsQ0FBQyJ9