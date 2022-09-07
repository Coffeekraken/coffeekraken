"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const dom_1 = require("@coffeekraken/sugar/dom");
/**
 * @name      whenAnimationEnd
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status      stable
 * @async
 *
 * Detect when animation ends
 *
 * @param    {HTMLElement}    elm    The element to listen on
 * @return   {SPromise<HTMLElement>}                  A promise that will be resolved once the animation has ended
 *
 * @todo      tests
 *
 * @example    js
 * import { __whenAnimationEnd } from '@coffeekraken/sugar/dom'
 * await __whenAnimationEnd(myCoolElm);
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __whenAnimationEnd($elm) {
    return new s_promise_1.default(({ resolve }) => {
        (0, dom_1.__addEventListenerOnce)($elm, 'animationend', (e) => {
            resolve($elm);
        });
    });
}
exports.default = __whenAnimationEnd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUVqRCxpREFBaUU7QUFFakU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQXdCLGtCQUFrQixDQUN0QyxJQUFpQjtJQUVqQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtRQUNsQyxJQUFBLDRCQUFzQixFQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUMvQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFSRCxxQ0FRQyJ9