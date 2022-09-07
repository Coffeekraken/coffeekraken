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
 * import { __observeMutations } from '@coffeekraken/sugar/dom'
 * const promise = __observeMutations(myElement).then(mutation => {
 *    // do something with the mutation
 * });
 * // stop listening for mutations
 * promise.cancel();
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __observeMutations($target, settings = {}) {
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
exports.default = __observeMutations;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRztBQUNILFNBQXdCLGtCQUFrQixDQUN0QyxPQUFvQixFQUNwQixXQUFpQyxFQUFFO0lBRW5DLFFBQVEsbUJBQ0osVUFBVSxFQUFFLElBQUksRUFDaEIsU0FBUyxFQUFFLEtBQUssRUFDaEIsT0FBTyxFQUFFLEtBQUssSUFDWCxRQUFRLENBQ2QsQ0FBQztJQUVGLElBQUksZ0JBQWdCLENBQUM7SUFFckIsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ1Qsd0JBQXdCO1FBQ3hCLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNsRCxvQkFBb0I7WUFDcEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUMzQixzQkFBc0I7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQyxFQUNEO1FBQ0ksRUFBRSxFQUFFLGtCQUFrQjtLQUN6QixDQUNKLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDakIsZ0JBQWdCLElBQUksZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEQsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBL0JELHFDQStCQyJ9