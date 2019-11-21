"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = backgroundImageLoaded;

var _getStyleProperty = _interopRequireDefault(require("./getStyleProperty"));

var _imageLoaded = _interopRequireDefault(require("./imageLoaded"));

var _unquote = _interopRequireDefault(require("../utils/strings/unquote"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Detect when a background image has been loaded on an HTMLElement
 * @param    {HTMLElement}    $elm    The HTMLElement on which to detect the background image load
 * @return    {Promise}    A promise that will be resolved when the background image has been loaded
 *
 * @example    js
 * import backgroundImageLoaded from 'coffeekraken-sugar/js/dom/backgroundImageLoaded'
 * backgroundImageLoaded($myElm).then(() => {
 *   // do something when loaded
 * })
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function backgroundImageLoaded($elm) {
  return new Promise((resolve, reject) => {
    // get the background-image property from computed style
    const backgroundImage = (0, _getStyleProperty.default)($elm, "background-image");
    const matches = backgroundImage.match(/.*url\((.*)\).*/);

    if (!matches || !matches[1]) {
      reject("No background image url found...");
      return;
    } // process url


    const url = (0, _unquote.default)(matches[1]); // make a new image with the image set

    const $img = new Image();
    $img.src = url; // return the promise of image loaded

    resolve((0, _imageLoaded.default)($img));
  });
}

module.exports = exports.default;