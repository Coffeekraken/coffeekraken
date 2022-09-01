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
/**
 * List of attributes to observe
 * @setting
 * @name 		attributes
 * @type 		{Array}
 * @default 	null
 */
exports.default = observeAttributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxTQUFTLGlCQUFpQixDQUN0QixNQUFtQixFQUNuQixXQUFnQixFQUFFO0lBRWxCLElBQUksZ0JBQWdCLENBQUM7SUFFckIsTUFBTSxHQUFHLEdBQUcsSUFBSSxtQkFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM3Qyx3QkFBd0I7UUFDeEIsZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ2xELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUNwQixvQkFBb0I7WUFDcEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUMzQixnQkFBZ0I7Z0JBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO29CQUNyQyxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUM1QixVQUFVLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQztpQkFDN0M7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxrQkFDM0IsVUFBVSxFQUFFLElBQUksSUFDYixRQUFRLEVBQ2IsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ25CLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsa0JBQWUsaUJBQWlCLENBQUMifQ==