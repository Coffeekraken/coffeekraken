"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addEventListenerOnce_1 = __importDefault(require("./addEventListenerOnce"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
/**
 * @name      removeClassOnAnimationEnd
 * @namespace            js.dom.class
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Remove some class on animation end
 *
 * @param    {HTMLElement}    elm    The element to take care of
 * @param    {String|Array}    class    The class or classes (Array) to remove
 * @return   {Promise}                  A promise that will be resolved once the class has been removed and the animation finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import removeClassOnAnimationEnd from '@coffeekraken/sugar/js/dom/removeClassOnAnimationEnd'
 * removeClassOnAnimationEnd(myCoolElm, 'my-class');
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function removeClassOnAnimationEnd($elm, cls) {
    return new s_promise_1.default(({ resolve }) => {
        // listen for animation end on the element just once
        (0, addEventListenerOnce_1.default)($elm, 'animationend', (e) => {
            if (!Array.isArray(cls))
                cls = [cls];
            // remove the cls
            cls.forEach((_cls) => {
                $elm.classList.remove(_cls);
            });
            // resolve the process
            resolve(e);
        });
    }, {
        id: 'removeClassOnAnimationEnd',
    });
}
exports.default = removeClassOnAnimationEnd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUE0RDtBQUM1RCx3RUFBaUQ7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsR0FBRztJQUN4QyxPQUFPLElBQUksbUJBQVUsQ0FDakIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7UUFDWixvREFBb0Q7UUFDcEQsSUFBQSw4QkFBc0IsRUFBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLGlCQUFpQjtZQUNqQixHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsc0JBQXNCO1lBQ3RCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxFQUNEO1FBQ0ksRUFBRSxFQUFFLDJCQUEyQjtLQUNsQyxDQUNKLENBQUM7QUFDTixDQUFDO0FBQ0Qsa0JBQWUseUJBQXlCLENBQUMifQ==