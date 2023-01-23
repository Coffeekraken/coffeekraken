"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
const unquote_1 = __importDefault(require("../../../shared/string/unquote"));
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
 * import { __whenBackgroundImageLoaded } from '@coffeekraken/sugar/dom'
 * __whenBackgroundImageLoaded($myElm).then(() => {
 *   // do something when loaded
 * })
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __whenBackgroundImageLoaded($elm, cb = null) {
    let isCancelled = false, $img;
    const promise = new Promise((resolve, reject) => {
        // get the background-image property from computed style
        const backgroundImage = (0, dom_1.__getStyleProperty)($elm, 'background-image');
        const matches = backgroundImage.match(/.*url\((.*)\).*/);
        if (!matches || !matches[1]) {
            reject('No background image url found...');
            return;
        }
        // process url
        const url = (0, unquote_1.default)(matches[1]);
        // make a new image with the image set
        $img = new Image();
        $img.src = url;
        // return the promise of image loaded
        (0, dom_1.__whenImageLoaded)($img).then(() => {
            if (!isCancelled) {
                if (cb)
                    cb($elm);
                resolve($elm);
            }
        });
    }, {
        id: 'whenBackgroundImageLoaded',
    });
    promise.then(() => {
        isCancelled = true;
    });
    promise.__$img = $img;
    return promise;
}
exports.default = __whenBackgroundImageLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlEQUFnRjtBQUNoRiw2RUFBdUQ7QUFFdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxTQUF3QiwyQkFBMkIsQ0FDL0MsSUFBaUIsRUFDakIsRUFBRSxHQUFHLElBQUk7SUFFVCxJQUFJLFdBQVcsR0FBRyxLQUFLLEVBQ25CLElBQUksQ0FBQztJQUNULE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUN2QixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNoQix3REFBd0Q7UUFDeEQsTUFBTSxlQUFlLEdBQUcsSUFBQSx3QkFBa0IsRUFDdEMsSUFBSSxFQUNKLGtCQUFrQixDQUNyQixDQUFDO1FBQ0YsTUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDekIsTUFBTSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7WUFDM0MsT0FBTztTQUNWO1FBQ0QsY0FBYztRQUNkLE1BQU0sR0FBRyxHQUFHLElBQUEsaUJBQVMsRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxzQ0FBc0M7UUFDdEMsSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixxQ0FBcUM7UUFDckMsSUFBQSx1QkFBaUIsRUFBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQzlCLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFO29CQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLEVBQ0Q7UUFDSSxFQUFFLEVBQUUsMkJBQTJCO0tBQ2xDLENBQ0osQ0FBQztJQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ2QsV0FBVyxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUExQ0QsOENBMENDIn0=