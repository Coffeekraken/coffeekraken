"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requestFullscreen;

/**
 * @name      requestFullscreen
 * @namespace           sugar.js.dom
 * @type      Function
 *
 * Request fullscreen on the passed DOM element
 *
 * @param    {HTMLElement}    elm    The element on which to request the fullscreen
 * @return    {Promise}   Returns a Promise which is resolved once full-screen mode has been activated.
 *
 * @example    js
 * import requestFullscreen from '@coffeekraken/sugar/js/dom/requestFullscreen'
 * requestFullscreen(myDomElm)
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function requestFullscreen(elm) {
  if (elm.requestFullscreen) {
    return elm.requestFullscreen();
  } else if (elm.mozRequestFullScreen) {
    return elm.mozRequestFullScreen();
  } else if (elm.webkitRequestFullscreen) {
    return elm.webkitRequestFullscreen();
  } else if (elm.msRequestFullscreen) {
    return elm.msRequestFullscreen();
  }
}

module.exports = exports.default;