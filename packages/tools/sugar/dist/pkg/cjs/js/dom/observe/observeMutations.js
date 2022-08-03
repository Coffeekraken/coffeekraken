"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
/**
 * @name      observeMutations
 * @namespace            js.dom.observe
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Observe mutations on an HTMLElement and get them through the observable subscription.
 * You can pass the mutation observer settings through the second argument. By default, here's his values:
 * - attributes: true,
 * - childList: false,
 * - subtree: false
 *
 * @param 		{HTMLElement} 					$target 		          The element to observe
 * @param 		{MutationObserverInit} 			[settings={}] 	The mutation observer settings
 * @return 		{SPromise} 								                The SPromise instance on which you can register your callbacks, etc...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import observeMutations from '@coffeekraken/sugar/js/dom/observeMutations'
 * const promise = observeMutations(myElement).then(mutation => {
 *    // do something with the mutation
 * });
 * // stop listening for mutations
 * promise.cancel();
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function observeMutations($target, settings = {}) {
    settings = Object.assign({ attributes: true, childList: false, subtree: false }, settings);
    let mutationObserver;
    return new s_promise_1.default(({ emit }) => {
        // create a new observer
        mutationObserver = new MutationObserver((mutations) => {
            // loop on mutations
            mutations.forEach((mutation) => {
                // emit the then stack
                emit('then', mutation);
            });
        });
        mutationObserver.observe($target, settings);
    }, {
        id: 'observeMutations',
    }).on('finally', () => {
        mutationObserver && mutationObserver.disconnect();
    });
}
exports.default = observeMutations;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRztBQUNILFNBQVMsZ0JBQWdCLENBQ3JCLE9BQW9CLEVBQ3BCLFdBQWlDLEVBQUU7SUFFbkMsUUFBUSxtQkFDSixVQUFVLEVBQUUsSUFBSSxFQUNoQixTQUFTLEVBQUUsS0FBSyxFQUNoQixPQUFPLEVBQUUsS0FBSyxJQUNYLFFBQVEsQ0FDZCxDQUFDO0lBRUYsSUFBSSxnQkFBZ0IsQ0FBQztJQUVyQixPQUFPLElBQUksbUJBQVUsQ0FDakIsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDVCx3QkFBd0I7UUFDeEIsZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ2xELG9CQUFvQjtZQUNwQixTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQzNCLHNCQUFzQjtnQkFDdEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoRCxDQUFDLEVBQ0Q7UUFDSSxFQUFFLEVBQUUsa0JBQWtCO0tBQ3pCLENBQ0osQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUNqQixnQkFBZ0IsSUFBSSxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0RCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxrQkFBZSxnQkFBZ0IsQ0FBQyJ9