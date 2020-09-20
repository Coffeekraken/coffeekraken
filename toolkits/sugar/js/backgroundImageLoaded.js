"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = backgroundImageLoaded;

var _getStyleProperty = _interopRequireDefault(require("./getStyleProperty"));

var _imageLoaded = _interopRequireDefault(require("./imageLoaded"));

var _unquote = _interopRequireDefault(require("../string/unquote"));

var _SPromise = _interopRequireDefault(require("../promise/SPromise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        backgroundImageLoaded
 * @namespace           sugar.js.dom
 * @type      Function
 *
 * Detect when a background image has been loaded on an HTMLElement
 *
 * @param    {HTMLElement}    $elm    The HTMLElement on which to detect the background image load
 * @return    {SPromise}    A promise that will be resolved when the background image has been loaded
 *
 * @example    js
 * import backgroundImageLoaded from '@coffeekraken/sugar/js/dom/backgroundImageLoaded'
 * backgroundImageLoaded($myElm).then(() => {
 *   // do something when loaded
 * })
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function backgroundImageLoaded($elm) {
  var isCancelled = false,
      $img;
  var promise = new _SPromise.default((resolve, reject, trigger, cancel) => {
    // get the background-image property from computed style
    var backgroundImage = (0, _getStyleProperty.default)($elm, 'background-image');
    var matches = backgroundImage.match(/.*url\((.*)\).*/);

    if (!matches || !matches[1]) {
      reject('No background image url found...');
      return;
    } // process url


    var url = (0, _unquote.default)(matches[1]); // make a new image with the image set

    $img = new Image();
    $img.src = url; // return the promise of image loaded

    (0, _imageLoaded.default)($img).then(() => {
      if (!isCancelled) resolve($elm);
    });
  }).on('finally', () => {
    isCancelled = true;
  });
  promise.__$img = $img;
  return promise;
}

module.exports = exports.default;