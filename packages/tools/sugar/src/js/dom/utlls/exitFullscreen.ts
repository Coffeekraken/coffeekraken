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
  } else if (document.mozCancelFullScreen) {
    return document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    return document.webkitCancelFullScreen();
  }
}
export default exitFullscreen;
