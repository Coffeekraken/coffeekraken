/**
 * @name      exitFullscreen
 * @namespace           js.dom
 * @type      Function
 *
 * Exit the fullscreen mode
 *
 * @return    {Promise}    Returns a Promise which is resolved once full-screen mode has been desactivated.
 *
 * @example    js
 * import exitFullscreen from '@coffeekraken/sugar/js/dom/exitFullscreen'
 * exitFullscreen()
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function exitFullscreen() {
  if (document.cancelFullScreen) {
    return document.cancelFullScreen();
  } else if (document.mozCancelFullScreen) {
    return document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    return document.webkitCancelFullScreen();
  }
}
