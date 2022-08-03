// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name        observeAttributes
 * @namespace            js.dom.observe
 * @type      Function
 * @async
 * @platform          js
 * @status        beta
 *
 * Observe attributes on an HTMLElement and get mutations through the SPromise instance
 *
 * @param 		{HTMLElement} 					target 		The element to observe
 * @param 		{MutationObserverInit} 			settings 	The mutation observer settings
 * @return 		{SPromise} 								The SPromise throught which you can have the mutations using the "then" callback
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import observeAttributes from '@coffeekraken/sugar/js/dom/observeAttributes'
 * const observer = observeAttributes(myCoolHTMLElement).then(mutation => {
 * 		// do something with the mutation
 * });
 * / the observer
 * observe();
 *
 * @see 		https://developer.mozilla.org/en/docs/Web/API/MutationObserver
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function observeAttributes(target, settings = {}) {
    return new __SPromise(({ emit }) => {
        // create a new observer
        const mutationObserver = new MutationObserver((mutations) => {
            let mutedAttrs = {};
            // loop on mutations
            mutations.forEach((mutation) => {
                // push mutation
                if (!mutedAttrs[mutation.attributeName]) {
                    emit('then', mutation);
                    mutedAttrs[mutation.attributeName] = true;
                }
            });
            mutedAttrs = {};
        });
        mutationObserver.observe(target, Object.assign({ attributes: true }, settings));
    }, {
        id: 'observeAttributes',
    }).on('finally', () => {
        mutationObserver.disconnect();
    });
}
/**
 * List of attributes to observe
 * @setting
 * @name 		attributes
 * @type 		{Array}
 * @default 	null
 */
export default observeAttributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxTQUFTLGlCQUFpQixDQUN0QixNQUFtQixFQUNuQixXQUFnQixFQUFFO0lBRWxCLE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ1Qsd0JBQXdCO1FBQ3hCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3hELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUNwQixvQkFBb0I7WUFDcEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUMzQixnQkFBZ0I7Z0JBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO29CQUNyQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUN2QixVQUFVLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQztpQkFDN0M7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxrQkFDM0IsVUFBVSxFQUFFLElBQUksSUFFYixRQUFRLEVBQ2IsQ0FBQztJQUNQLENBQUMsRUFDRDtRQUNJLEVBQUUsRUFBRSxtQkFBbUI7S0FDMUIsQ0FDSixDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ2pCLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2xDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNILGVBQWUsaUJBQWlCLENBQUMifQ==