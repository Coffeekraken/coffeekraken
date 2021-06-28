// @ts-nocheck
/**
 * @name      exitFullscreen
 * @namespace            js.dom.utils
 * @type      Function
 * @platform          js
 * @platform          ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpdEZ1bGxzY3JlZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleGl0RnVsbHNjcmVlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLGNBQWM7SUFDckIsSUFBSSxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7UUFDN0IsT0FBTyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLG1CQUFtQixFQUFFO1FBQ3ZDLE9BQU8sUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUM7S0FDdkM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUMxQyxPQUFPLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0tBQzFDO0FBQ0gsQ0FBQztBQUNELGVBQWUsY0FBYyxDQUFDIn0=