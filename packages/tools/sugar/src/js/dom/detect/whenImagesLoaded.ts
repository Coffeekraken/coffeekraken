// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import { __whenImageLoaded } from '@coffeekraken/sugar/dom';

/**
 * @name      whenImagesLoaded
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect when some images are loaded. This function take advantage of the SPromise class
 * and trigger an event called "img.loaded" that will be triggered on each loaded images and another called "loaded" once all the images are loaded.
 * See in the example bellow.
 *
 * @feature       Promise based API
 *
 * @param    {Array<HTMLImageElement>}    $imgs    An array (or nodeList) of HTMLImageElement to detect the load
 * @return    {Promise}    A promise resolved when all images are loaded properly
 *
 * @snippet         __whenImagesLoaded($1)
 * __whenImagesLoaded($1).then(imgs => {
 *      $2
 * });
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __whenImagesLoaded } from '@coffeekraken/sugar/dom'
 * __whenImagesLoaded([
 * 	$img1, $img2, $img3
 * ]).on('loaded', $img => {
 *    // do something with the loaded image
 * }).then(imgs => {
 *   // do something here
 * })
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __whenImagesLoaded(
    $imgs: HTMLImageElement[],
): __SPromise<HTMLImageElement[]> {
    return new __SPromise(({ resolve, reject, emit }) => {
        const promises = [],
            loadedImages = [];
        Array.from($imgs).forEach(($img) => {
            promises.push(
                __whenImageLoaded($img)
                    .then((_$img) => {
                        loadedImages.push(_$img);
                        emit('loaded', _$img);
                        if (loadedImages.length === $imgs.length) {
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
