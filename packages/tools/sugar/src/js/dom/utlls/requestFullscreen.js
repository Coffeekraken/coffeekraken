// @ts-nocheck
/**
 * @name      requestFullscreen
 * @namespace            js.dom.utils
 * @type      Function
 * @platform        js
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
 * import requestFullscreen from '@coffeekraken/sugar/js/dom/requestFullscreen'
 * requestFullscreen(myDomElm)
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function requestFullscreen(elm) {
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
export default requestFullscreen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdEZ1bGxzY3JlZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXF1ZXN0RnVsbHNjcmVlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLGlCQUFpQixDQUFDLEdBQWdCO0lBQ3pDLElBQUksR0FBRyxDQUFDLGlCQUFpQixFQUFFO1FBQ3pCLE9BQU8sR0FBRyxDQUFDLGlCQUFpQixFQUFFLENBQUM7S0FDaEM7U0FBTSxJQUFJLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRTtRQUNuQyxPQUFPLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0tBQ25DO1NBQU0sSUFBSSxHQUFHLENBQUMsdUJBQXVCLEVBQUU7UUFDdEMsT0FBTyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztLQUN0QztTQUFNLElBQUksR0FBRyxDQUFDLG1CQUFtQixFQUFFO1FBQ2xDLE9BQU8sR0FBRyxDQUFDLG1CQUFtQixFQUFFLENBQUM7S0FDbEM7QUFDSCxDQUFDO0FBQ0QsZUFBZSxpQkFBaUIsQ0FBQyJ9