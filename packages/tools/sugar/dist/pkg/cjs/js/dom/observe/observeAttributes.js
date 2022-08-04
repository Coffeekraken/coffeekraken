"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
    return new s_promise_1.default(({ emit }) => {
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
exports.default = observeAttributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxTQUFTLGlCQUFpQixDQUN0QixNQUFtQixFQUNuQixXQUFnQixFQUFFO0lBRWxCLE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUNULHdCQUF3QjtRQUN4QixNQUFNLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUN4RCxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDcEIsb0JBQW9CO1lBQ3BCLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDM0IsZ0JBQWdCO2dCQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtvQkFDckMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDdkIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUM7aUJBQzdDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE1BQU0sa0JBQzNCLFVBQVUsRUFBRSxJQUFJLElBRWIsUUFBUSxFQUNiLENBQUM7SUFDUCxDQUFDLEVBQ0Q7UUFDSSxFQUFFLEVBQUUsbUJBQW1CO0tBQzFCLENBQ0osQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUNqQixnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNsQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxrQkFBZSxpQkFBaUIsQ0FBQyJ9