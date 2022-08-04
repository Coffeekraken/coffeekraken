"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const imageLoaded_1 = __importDefault(require("./imageLoaded"));
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
    return new s_promise_1.default(({ resolve, reject, emit }) => {
        const promises = [], loadedImages = [];
        Array.from($imgs).forEach(($img) => {
            promises.push((0, imageLoaded_1.default)($img)
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
exports.default = imagesLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUNqRCxnRUFBMEM7QUFFMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxTQUFTLFlBQVksQ0FDakIsS0FBeUIsRUFDekIsRUFBRSxHQUFHLElBQUk7SUFFVCxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ2hELE1BQU0sUUFBUSxHQUFHLEVBQUUsRUFDZixZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDL0IsUUFBUSxDQUFDLElBQUksQ0FDVCxJQUFBLHFCQUFhLEVBQUMsSUFBSSxDQUFDO2lCQUNkLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNaLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzFCLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUN0QyxJQUFJLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO29CQUM3QixJQUFJLEVBQUU7d0JBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN6QixPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQ3pCO1lBQ0wsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FDVCxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxrQkFBZSxZQUFZLENBQUMifQ==