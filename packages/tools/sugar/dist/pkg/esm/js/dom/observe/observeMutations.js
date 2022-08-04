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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRztBQUNILFNBQVMsZ0JBQWdCLENBQ3JCLE9BQW9CLEVBQ3BCLFdBQWlDLEVBQUU7SUFFbkMsUUFBUSxtQkFDSixVQUFVLEVBQUUsSUFBSSxFQUNoQixTQUFTLEVBQUUsS0FBSyxFQUNoQixPQUFPLEVBQUUsS0FBSyxJQUNYLFFBQVEsQ0FDZCxDQUFDO0lBRUYsSUFBSSxnQkFBZ0IsQ0FBQztJQUVyQixPQUFPLElBQUksVUFBVSxDQUNqQixDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUNULHdCQUF3QjtRQUN4QixnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDbEQsb0JBQW9CO1lBQ3BCLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDM0Isc0JBQXNCO2dCQUN0QixJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUMsRUFDRDtRQUNJLEVBQUUsRUFBRSxrQkFBa0I7S0FDekIsQ0FDSixDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ2pCLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELGVBQWUsZ0JBQWdCLENBQUMifQ==