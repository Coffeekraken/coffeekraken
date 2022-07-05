// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __imageLoaded from './imageLoaded';

/**
 * @name      imagesLoaded
 * @namespace            js.dom.load
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect when some images are loaded. This function take advantage of the SPromise class
 * and trigger an event called "img.loaded" that will be triggered on each loaded images and another called "loaded" once all the images are loaded.
 * See in the example bellow.
 *
 * @feature       Promise based API
 * @feature       Callback support
 *
 * @param    {Array<HTMLImageElement>}    $imgs    An array (or nodeList) of HTMLImageElement to detect the load
 * @param     {Function}          [cb=null]       A callback function if you prefer
 * @return    {Promise}    A promise resolved when all images are loaded properly
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import imagesLoaded from '@coffeekraken/sugar/js/dom/load/imagesLoaded'
 * imagesLoaded([
 * 	$img1, $img2, $img3
 * ]).on('loaded', $img => {
 *    // do something with the loaded image
 * }).then(() => {
 *   // do something here
 * })
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function imagesLoaded(
    $imgs: HTMLImageElement[],
    cb = null,
): __SPromise<HTMLImageElement[]> {
    return new __SPromise(({ resolve, reject, emit }) => {
        const promises = [],
            loadedImages = [];
        Array.from($imgs).forEach(($img) => {
            promises.push(
                __imageLoaded($img)
                    .then((_$img) => {
                        loadedImages.push(_$img);
                        emit('img.loaded', _$img);
                        if (loadedImages.length === $imgs.length) {
                            emit('loaded', loadedImages);
                            if (cb) cb(loadedImages);
                            resolve(loadedImages);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    }),
            );
        });
    });
}
export default imagesLoaded;
