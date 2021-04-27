// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-promise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    /**
     * @name        observeAttributes
     * @namespace            js.dom
     * @type      Function
     * @stable
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
     * import observeAttributes from 'sugarcss/js/dom/observeAttributes'
     * const observer = observeAttributes(myCoolHTMLElement).then(mutation => {
     * 		// do something with the mutation
     * });
     * / the observer
     * observe();
     *
     * @see 		https://developer.mozilla.org/en/docs/Web/API/MutationObserver
     * @since       1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
            id: 'observeAttributes'
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2ZUF0dHJpYnV0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvYnNlcnZlQXR0cmlidXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCx3RUFBaUQ7SUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCRztJQUNILFNBQVMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzlDLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUNYLHdCQUF3QjtZQUN4QixNQUFNLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDMUQsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixvQkFBb0I7Z0JBQ3BCLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtvQkFDN0IsZ0JBQWdCO29CQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTt3QkFDdkMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQzt3QkFDdkIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUM7cUJBQzNDO2dCQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNILFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxrQkFDN0IsVUFBVSxFQUFFLElBQUksSUFFYixRQUFRLEVBQ1gsQ0FBQztRQUNMLENBQUMsRUFDRDtZQUNFLEVBQUUsRUFBRSxtQkFBbUI7U0FDeEIsQ0FDRixDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25CLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGtCQUFlLGlCQUFpQixDQUFDIn0=