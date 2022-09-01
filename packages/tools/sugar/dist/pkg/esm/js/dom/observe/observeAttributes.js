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
    let mutationObserver;
    const pro = new __SPromise(({ resolve, emit }) => {
        // create a new observer
        mutationObserver = new MutationObserver((mutations) => {
            let mutedAttrs = {};
            // loop on mutations
            mutations.forEach((mutation) => {
                // push mutation
                if (!mutedAttrs[mutation.attributeName]) {
                    emit('attribute', mutation);
                    mutedAttrs[mutation.attributeName] = true;
                }
            });
            mutedAttrs = {};
        });
        mutationObserver.observe(target, Object.assign({ attributes: true }, settings));
    });
    pro.on('finally', () => {
        mutationObserver.disconnect();
    });
    return pro;
}
/**
 * List of attributes to observe
 * @setting
 * @name 		attributes
 * @type 		{Array}
 * @default 	null
 */
export default observeAttributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxTQUFTLGlCQUFpQixDQUN0QixNQUFtQixFQUNuQixXQUFnQixFQUFFO0lBRWxCLElBQUksZ0JBQWdCLENBQUM7SUFFckIsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzdDLHdCQUF3QjtRQUN4QixnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDbEQsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLG9CQUFvQjtZQUNwQixTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQzNCLGdCQUFnQjtnQkFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQzVCLFVBQVUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDO2lCQUM3QztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0gsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztRQUNILGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxNQUFNLGtCQUMzQixVQUFVLEVBQUUsSUFBSSxJQUNiLFFBQVEsRUFDYixDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDbkIsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxlQUFlLGlCQUFpQixDQUFDIn0=