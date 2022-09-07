// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import { __whenImageLoaded } from '@coffeekraken/sugar/dom';
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
function imagesLoaded($imgs, cb = null) {
    return new __SPromise(({ resolve, reject, emit }) => {
        const promises = [], loadedImages = [];
        Array.from($imgs).forEach(($img) => {
            promises.push(__whenImageLoaded($img)
                .then((_$img) => {
                loadedImages.push(_$img);
                emit('img.loaded', _$img);
                if (loadedImages.length === $imgs.length) {
                    emit('loaded', loadedImages);
                    if (cb)
                        cb(loadedImages);
                    resolve(loadedImages);
                }
            })
                .catch((error) => {
                reject(error);
            }));
        });
    });
}
export default imagesLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILFNBQVMsWUFBWSxDQUNqQixLQUF5QixFQUN6QixFQUFFLEdBQUcsSUFBSTtJQUVULE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUNoRCxNQUFNLFFBQVEsR0FBRyxFQUFFLEVBQ2YsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN0QixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQy9CLFFBQVEsQ0FBQyxJQUFJLENBQ1QsaUJBQWlCLENBQUMsSUFBSSxDQUFDO2lCQUNsQixJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDWixZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUMxQixJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLE1BQU0sRUFBRTtvQkFDdEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxFQUFFO3dCQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDekIsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUN6QjtZQUNMLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDYixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQ1QsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsZUFBZSxZQUFZLENBQUMifQ==