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
 * import { __observeAttributes } from '@coffeekraken/sugar/dom'
 * const observer =  __observeAttributes(myCoolHTMLElement).then(mutation => {
 * 		// do something with the mutation
 * });
 * / the observer
 * observe();
 *
 * @see 		https://developer.mozilla.org/en/docs/Web/API/MutationObserver
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __observeAttributes(target, settings = {}) {
    let mutationObserver;
    const pro = new s_promise_1.default(({ resolve, emit }) => {
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
exports.default = __observeAttributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxTQUF3QixtQkFBbUIsQ0FDdkMsTUFBbUIsRUFDbkIsV0FBZ0IsRUFBRTtJQUVsQixJQUFJLGdCQUFnQixDQUFDO0lBRXJCLE1BQU0sR0FBRyxHQUFHLElBQUksbUJBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDN0Msd0JBQXdCO1FBQ3hCLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNsRCxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDcEIsb0JBQW9CO1lBQ3BCLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDM0IsZ0JBQWdCO2dCQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtvQkFDckMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDNUIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUM7aUJBQzdDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE1BQU0sa0JBQzNCLFVBQVUsRUFBRSxJQUFJLElBQ2IsUUFBUSxFQUNiLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUNuQixnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQTdCRCxzQ0E2QkMifQ==