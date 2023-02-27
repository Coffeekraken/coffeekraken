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
function __whenBackgroundImageLoaded($elm) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlEQUFnRjtBQUNoRiw2RUFBdUQ7QUFFdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQkc7QUFDSCxTQUF3QiwyQkFBMkIsQ0FDL0MsSUFBaUI7SUFFakIsSUFBSSxXQUFXLEdBQUcsS0FBSyxFQUNuQixJQUFJLENBQUM7SUFDVCxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FDdkIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDaEIsd0RBQXdEO1FBQ3hELE1BQU0sZUFBZSxHQUFHLElBQUEsd0JBQWtCLEVBQ3RDLElBQUksRUFDSixrQkFBa0IsQ0FDckIsQ0FBQztRQUNGLE1BQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQzNDLE9BQU87U0FDVjtRQUNELGNBQWM7UUFDZCxNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFTLEVBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsc0NBQXNDO1FBQ3RDLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YscUNBQXFDO1FBQ3JDLElBQUEsdUJBQWlCLEVBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUM5QixJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNkLElBQUksRUFBRTtvQkFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxFQUNEO1FBQ0ksRUFBRSxFQUFFLDJCQUEyQjtLQUNsQyxDQUNKLENBQUM7SUFFRixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNkLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN0QixPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBekNELDhDQXlDQyJ9