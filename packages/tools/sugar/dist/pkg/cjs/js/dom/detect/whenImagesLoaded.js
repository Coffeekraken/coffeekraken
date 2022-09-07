"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const dom_1 = require("@coffeekraken/sugar/dom");
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
 * import { __whenImagesLoaded } from '@coffeekraken/sugar/dom'
 * __whenImagesLoaded([
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
function __whenImagesLoaded($imgs, cb = null) {
    return new s_promise_1.default(({ resolve, reject, emit }) => {
        const promises = [], loadedImages = [];
        Array.from($imgs).forEach(($img) => {
            promises.push((0, dom_1.__whenImageLoaded)($img)
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
exports.default = __whenImagesLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUNqRCxpREFBNEQ7QUFFNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxTQUF3QixrQkFBa0IsQ0FDdEMsS0FBeUIsRUFDekIsRUFBRSxHQUFHLElBQUk7SUFFVCxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ2hELE1BQU0sUUFBUSxHQUFHLEVBQUUsRUFDZixZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDL0IsUUFBUSxDQUFDLElBQUksQ0FDVCxJQUFBLHVCQUFpQixFQUFDLElBQUksQ0FBQztpQkFDbEIsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ1osWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUU7b0JBQ3RDLElBQUksQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQzdCLElBQUksRUFBRTt3QkFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3pCLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDekI7WUFDTCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUNULENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXpCRCxxQ0F5QkMifQ==