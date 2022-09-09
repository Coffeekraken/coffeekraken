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
 * import { __exitFullscreen } from '@coffeekraken/sugar/dom'
 * __exitFullscreen()
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __exitFullscreen() {
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
exports.default = __exitFullscreen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxTQUF3QixnQkFBZ0I7SUFDcEMsSUFBSSxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7UUFDM0IsT0FBTyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztLQUN0QztTQUFNLElBQUksUUFBUSxDQUFDLG1CQUFtQixFQUFFO1FBQ3JDLE9BQU8sUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUM7S0FDekM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUN4QyxPQUFPLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0tBQzVDO0FBQ0wsQ0FBQztBQVJELG1DQVFDIn0=