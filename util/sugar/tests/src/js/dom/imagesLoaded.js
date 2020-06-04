import __imageLoaded from "./imageLoaded";
import __SPromise from '../promise/SPromise';

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
export default function imagesLoaded($imgs) {
  return new __SPromise((resolve, reject, trigger, cancel) => {
    const promises = [], loadedImages = [];
    Array.from($imgs).forEach($img => {
      promises.push(__imageLoaded($img).then(_$img => {
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
