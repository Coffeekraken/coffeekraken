// @ts-nocheck
/**
 * @name      requestFullscreen
 * @namespace            js.dom.utils
 * @type      Function
 * @platform          js
 * @platform          ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdEZ1bGxzY3JlZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXF1ZXN0RnVsbHNjcmVlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxHQUFnQjtJQUN6QyxJQUFJLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRTtRQUN6QixPQUFPLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0tBQ2hDO1NBQU0sSUFBSSxHQUFHLENBQUMsb0JBQW9CLEVBQUU7UUFDbkMsT0FBTyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztLQUNuQztTQUFNLElBQUksR0FBRyxDQUFDLHVCQUF1QixFQUFFO1FBQ3RDLE9BQU8sR0FBRyxDQUFDLHVCQUF1QixFQUFFLENBQUM7S0FDdEM7U0FBTSxJQUFJLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRTtRQUNsQyxPQUFPLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0tBQ2xDO0FBQ0gsQ0FBQztBQUNELGVBQWUsaUJBQWlCLENBQUMifQ==