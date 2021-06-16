// @ts-nocheck
/**
 * @name      exitFullscreen
 * @namespace            js.dom.utils
 * @type      Function
 * @platform      js
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpdEZ1bGxzY3JlZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleGl0RnVsbHNjcmVlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsY0FBYztJQUNyQixJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtRQUM3QixPQUFPLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0tBQ3BDO1NBQU0sSUFBSSxRQUFRLENBQUMsbUJBQW1CLEVBQUU7UUFDdkMsT0FBTyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztLQUN2QztTQUFNLElBQUksUUFBUSxDQUFDLHNCQUFzQixFQUFFO1FBQzFDLE9BQU8sUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7S0FDMUM7QUFDSCxDQUFDO0FBQ0QsZUFBZSxjQUFjLENBQUMifQ==