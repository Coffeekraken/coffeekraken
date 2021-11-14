// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function observeMutations($target, settings = {}) {
    settings = Object.assign({ attributes: true, childList: false, subtree: false }, settings);
    let mutationObserver;
    return new __SPromise(({ emit }) => {
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
export default observeMutations;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2ZU11dGF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9ic2VydmVNdXRhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FDckIsT0FBb0IsRUFDcEIsV0FBaUMsRUFBRTtJQUVuQyxRQUFRLG1CQUNKLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLFNBQVMsRUFBRSxLQUFLLEVBQ2hCLE9BQU8sRUFBRSxLQUFLLElBQ1gsUUFBUSxDQUNkLENBQUM7SUFFRixJQUFJLGdCQUFnQixDQUFDO0lBRXJCLE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ1Qsd0JBQXdCO1FBQ3hCLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNsRCxvQkFBb0I7WUFDcEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUMzQixzQkFBc0I7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQyxFQUNEO1FBQ0ksRUFBRSxFQUFFLGtCQUFrQjtLQUN6QixDQUNKLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDakIsZ0JBQWdCLElBQUksZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEQsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsZUFBZSxnQkFBZ0IsQ0FBQyJ9