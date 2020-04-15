"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = imagesLoaded;

var _imageLoaded = _interopRequireDefault(require("./imageLoaded"));

var _SPromise = _interopRequireDefault(require("../promise/SPromise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      imagesLoaded
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Detect when some images are loaded. This function take advantage of the SPromise class
 * and expose a callback registration function called "img" that will be triggered on each loaded images. See in the example bellow.
 *
 * @param    {Array<HTMLImageElement>}    $imgs    An array (or nodeList) of HTMLImageElement to detect the load
 * @return    {Promise}    A promise resolved when all images are loaded properly
 *
 * @example    js
 * import imagesLoaded from '@coffeekraken/sugar/js/dom/imagesLoaded'
 * imagesLoaded([
 * 	$img1, $img2, $img3
 * ]).img($img => {
 *    // do something with the loaded image
 * }).then(() => {
 *   // do something here
 * })
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function imagesLoaded($imgs) {
  return new _SPromise.default((resolve, reject, trigger, cancel) => {
    const promises = [],
          loadedImages = [];
    Array.from($imgs).forEach($img => {
      promises.push((0, _imageLoaded.default)($img).then(_$img => {
        loadedImages.push(_$img);
        trigger('img', _$img);

        if (loadedImages.length === $imgs.length) {
          resolve(loadedImages);
        }
      }).catch(error => {
        reject(error);
      }));
    });
  }, {
    stacks: 'img'
  }).start();
}

module.exports = exports.default;