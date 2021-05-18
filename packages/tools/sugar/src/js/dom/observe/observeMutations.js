// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name      observeMutations
 * @namespace            js.dom.observe
 * @type      Function
 * @stable
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
        id: 'observeMutations'
    }).on('finally', () => {
        mutationObserver && mutationObserver.disconnect();
    });
}
export default observeMutations;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2ZU11dGF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9ic2VydmVNdXRhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFDSCxTQUFTLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUM5QyxRQUFRLG1CQUNOLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLFNBQVMsRUFBRSxLQUFLLEVBQ2hCLE9BQU8sRUFBRSxLQUFLLElBQ1gsUUFBUSxDQUNaLENBQUM7SUFFRixJQUFJLGdCQUFnQixDQUFDO0lBRXJCLE9BQU8sSUFBSSxVQUFVLENBQ25CLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ1gsd0JBQXdCO1FBQ3hCLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNwRCxvQkFBb0I7WUFDcEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUM3QixzQkFBc0I7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDOUMsQ0FBQyxFQUNEO1FBQ0UsRUFBRSxFQUFFLGtCQUFrQjtLQUN2QixDQUNGLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDbkIsZ0JBQWdCLElBQUksZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBQ0QsZUFBZSxnQkFBZ0IsQ0FBQyJ9