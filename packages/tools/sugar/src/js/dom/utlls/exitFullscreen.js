// @ts-nocheck
/**
 * @name      exitFullscreen
 * @namespace            js.dom.utils
 * @type      Function
 * @stable
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpdEZ1bGxzY3JlZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleGl0RnVsbHNjcmVlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsU0FBUyxjQUFjO0lBQ3JCLElBQUksUUFBUSxDQUFDLGdCQUFnQixFQUFFO1FBQzdCLE9BQU8sUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtRQUN2QyxPQUFPLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0tBQ3ZDO1NBQU0sSUFBSSxRQUFRLENBQUMsc0JBQXNCLEVBQUU7UUFDMUMsT0FBTyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztLQUMxQztBQUNILENBQUM7QUFDRCxlQUFlLGNBQWMsQ0FBQyJ9