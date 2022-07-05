// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __unquote from '../../../shared/string/unquote';
import __getStyleProperty from '../style/getStyleProperty';
import __imageLoaded from './imageLoaded';

/**
 * @name        backgroundImageLoaded
 * @namespace            js.dom.load
 * @type      Function
 * @platform          js
 * @status        betas
 *
 * Detect when a background image has been loaded on an HTMLElement
 *
 * @feature       Promise based API
 * @feature       Callback support
 *
 * @param    {HTMLElement}    $elm    The HTMLElement on which to detect the background image load
 * @param     {Function}      [cb=null]       A callback function if you prefer
 * @return    {SPromise}    A promise that will be resolved when the background image has been loaded
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import backgroundImageLoaded from '@coffeekraken/sugar/js/dom/load/backgroundImageLoaded'
 * backgroundImageLoaded($myElm).then(() => {
 *   // do something when loaded
 * })
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function backgroundImageLoaded(
    $elm: HTMLElement,
    cb = null,
): __SPromise<HTMLElement> {
    let isCancelled = false,
        $img;
    const promise = new __SPromise(
        ({ resolve, reject, emit }) => {
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
            __imageLoaded($img).then(() => {
                if (!isCancelled) {
                    if (cb) cb($elm);
                    resolve($elm);
                }
            });
        },
        {
            id: 'backgroundImageLoaded',
        },
    ).on('finally', () => {
        isCancelled = true;
    });
    promise.__$img = $img;
    return promise;
}
export default backgroundImageLoaded;
