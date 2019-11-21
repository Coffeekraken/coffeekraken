"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleFullscreen;

var _requestFullscreen = _interopRequireDefault(require("./requestFullscreen"));

var _exitFullscreen = _interopRequireDefault(require("./exitFullscreen"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Toggle the fullscreen mode
 * @param    {HTMLElement}    elm    The element on which to request the fullscreen
 * @return    {Promise}   Returns a Promise which is resolved once full-screen mode has been des/activated.
 *
 * @example   js
 * import toggleFullscreen from 'coffeekraken-sugar/js/dom/toggleFullscreen'
 * toggleFullscreen(myDomElm)
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function toggleFullscreen(elm) {
  const fullscreenElm = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

  if (!fullscreenElm || fullscreenElm !== elm) {
    return (0, _requestFullscreen.default)(elm);
  } else {
    return (0, _exitFullscreen.default)();
  }
}

module.exports = exports.default;