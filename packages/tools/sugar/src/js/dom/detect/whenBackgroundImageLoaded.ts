// @ts-nocheck

import __getStyleProperty from '../style/getStyleProperty.js';
import __whenImageLoaded from './whenImageLoaded.js';

import __unquote from '../../../shared/string/unquote.js';

/**
 * @name        whenBackgroundImageLoaded
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status        betas
 *
 * Detect when a background image has been loaded on an HTMLElement
 *
 * @feature       Promise based API
 *
 * @param    {HTMLElement}    $elm    The HTMLElement on which to detect the background image load
 * @return    {SPromise}    A promise that will be resolved when the background image has been loaded
 *
 * @snippet         __whenBackgroundImageLoaded($1)
 * __whenBackgroundImageLoaded($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __whenBackgroundImageLoaded } from '@coffeekraken/sugar/dom'
 *
 * // using promise
 * await __whenBackgroundImageLoaded($elm);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __whenBackgroundImageLoaded(
    $elm: HTMLElement,
): Promise<HTMLElement> {
    let isCancelled = false,
        $img;
    const promise = new Promise(
        (resolve, reject) => {
            // get the background-image property from computed style
            const backgroundImage = __getStyleProperty(
                $elm,
                'background-image',
            );
            const matches = backgroundImage.match(/.*url\((.*)\).*/);
            if (!matches || !matches[1]) {
                reject('No background image url found...');
                return;
            }
            // process url
            const url = __unquote(matches[1]);
            // make a new image with the image set
            $img = new Image();
            $img.src = url;
            // return the promise of image loaded
            __whenImageLoaded($img).then(() => {
                if (!isCancelled) {
                    if (cb) cb($elm);
                    resolve($elm);
                }
            });
        },
        {
            id: 'whenBackgroundImageLoaded',
        },
    );

    promise.then(() => {
        isCancelled = true;
    });

    promise.__$img = $img;
    return promise;
}
