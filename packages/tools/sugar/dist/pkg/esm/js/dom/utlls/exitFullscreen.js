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
export default exitFullscreen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxjQUFjO0lBQ25CLElBQUksUUFBUSxDQUFDLGdCQUFnQixFQUFFO1FBQzNCLE9BQU8sUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7S0FDdEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtRQUNyQyxPQUFPLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0tBQ3pDO1NBQU0sSUFBSSxRQUFRLENBQUMsc0JBQXNCLEVBQUU7UUFDeEMsT0FBTyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztLQUM1QztBQUNMLENBQUM7QUFDRCxlQUFlLGNBQWMsQ0FBQyJ9