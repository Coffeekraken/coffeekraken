"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = imagesLoaded;

var _imageLoaded = _interopRequireDefault(require("./imageLoaded"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      imagesLoaded
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Detect when some images are loaded
 *
 * @param    {Array<HTMLImageElement>}    $imgs    An array (or nodeList) of HTMLImageElement to detect the load
 * @return    {Promise}    A promise resolved when all images are loaded properly
 *
 * @example    js
 * import imagesLoaded from '@coffeekraken/sugar/js/dom/imagesLoaded'
 * imagesLoaded([
 * 	$img1, $img2, $img3
 * ]).then(() => {
 *   // do something here
 * })
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function imagesLoaded($imgs) {
  return new Promise((resolve, reject) => {
    const promises = [];
    Array.from($imgs).forEach($img => {
      promises.push((0, _imageLoaded.default)($img));
    });
    resolve(Promise.all(promises));
  });
}

module.exports = exports.default;