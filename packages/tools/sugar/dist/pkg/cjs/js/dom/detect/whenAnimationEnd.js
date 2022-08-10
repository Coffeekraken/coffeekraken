"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const addEventListenerOnce_1 = __importDefault(require("../event/addEventListenerOnce"));
/**
 * @name      whenAnimationEnd
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status      beta
 * @async
 *
 * Detect when animation ends
 *
 * @param    {HTMLElement}    elm    The element to listen on
 * @return   {Promise}                  A promise that will be resolved once the animation has ended
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import whenAnimationEnd from '@coffeekraken/sugar/js/dom/whenAnimationEnd'
 * await whenAnimationEnd(myCoolElm);
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function whenAnimationEnd($elm, cls) {
    return new s_promise_1.default(({ resolve }) => {
        (0, addEventListenerOnce_1.default)($elm, 'animationend', (e) => {
            resolve(e);
        });
    }, {
        id: 'whenAnimationEnd',
    });
}
exports.default = whenAnimationEnd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUNqRCx5RkFBbUU7QUFFbkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBd0IsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEdBQUc7SUFDOUMsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1FBQ1osSUFBQSw4QkFBc0IsRUFBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDL0MsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLEVBQ0Q7UUFDSSxFQUFFLEVBQUUsa0JBQWtCO0tBQ3pCLENBQ0osQ0FBQztBQUNOLENBQUM7QUFYRCxtQ0FXQyJ9