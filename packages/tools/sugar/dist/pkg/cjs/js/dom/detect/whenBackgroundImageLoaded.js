"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const unquote_1 = __importDefault(require("../../../shared/string/unquote"));
const getStyleProperty_1 = __importDefault(require("../style/getStyleProperty"));
const dom_1 = require("@coffeekraken/sugar/dom");
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
    const promise = new s_promise_1.default(({ resolve, reject, emit }) => {
        // get the background-image property from computed style
        const backgroundImage = (0, getStyleProperty_1.default)($elm, 'background-image');
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
    }).on('finally', () => {
        isCancelled = true;
    });
    promise.__$img = $img;
    return promise;
}
exports.default = __whenBackgroundImageLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUNqRCw2RUFBdUQ7QUFDdkQsaUZBQTJEO0FBQzNELGlEQUE0RDtBQUU1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQXdCLDJCQUEyQixDQUMvQyxJQUFpQixFQUNqQixFQUFFLEdBQUcsSUFBSTtJQUVULElBQUksV0FBVyxHQUFHLEtBQUssRUFDbkIsSUFBSSxDQUFDO0lBQ1QsTUFBTSxPQUFPLEdBQUcsSUFBSSxtQkFBVSxDQUMxQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzFCLHdEQUF3RDtRQUN4RCxNQUFNLGVBQWUsR0FBRyxJQUFBLDBCQUFrQixFQUN0QyxJQUFJLEVBQ0osa0JBQWtCLENBQ3JCLENBQUM7UUFDRixNQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN6QixNQUFNLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUMzQyxPQUFPO1NBQ1Y7UUFDRCxjQUFjO1FBQ2QsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBUyxFQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLHNDQUFzQztRQUN0QyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLHFDQUFxQztRQUNyQyxJQUFBLHVCQUFpQixFQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDZCxJQUFJLEVBQUU7b0JBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDakI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsRUFDRDtRQUNJLEVBQUUsRUFBRSwyQkFBMkI7S0FDbEMsQ0FDSixDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ2pCLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN0QixPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBdkNELDhDQXVDQyJ9