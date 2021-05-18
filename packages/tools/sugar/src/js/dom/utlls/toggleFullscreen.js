// @ts-nocheck
import requestFullscreen from './requestFullscreen';
import exitFullscreen from './exitFullscreen';
/**
 * @name      toggleFullscreen
 * @namespace            js.dom.utils
 * @type      Function
 * @stable
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
 * import toggleFullscreen from '@coffeekraken/sugar/js/dom/toggleFullscreen'
 * toggleFullscreen(myDomElm)
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function toggleFullscreen(elm) {
    const fullscreenElm = document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement;
    if (!fullscreenElm || fullscreenElm !== elm) {
        return requestFullscreen(elm);
    }
    else {
        return exitFullscreen();
    }
}
export default toggleFullscreen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlRnVsbHNjcmVlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvZ2dsZUZ1bGxzY3JlZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8saUJBQWlCLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsZ0JBQWdCLENBQUMsR0FBRztJQUMzQixNQUFNLGFBQWEsR0FDakIsUUFBUSxDQUFDLGlCQUFpQjtRQUMxQixRQUFRLENBQUMsb0JBQW9CO1FBQzdCLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQztJQUNuQyxJQUFJLENBQUMsYUFBYSxJQUFJLGFBQWEsS0FBSyxHQUFHLEVBQUU7UUFDM0MsT0FBTyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMvQjtTQUFNO1FBQ0wsT0FBTyxjQUFjLEVBQUUsQ0FBQztLQUN6QjtBQUNILENBQUM7QUFDRCxlQUFlLGdCQUFnQixDQUFDIn0=