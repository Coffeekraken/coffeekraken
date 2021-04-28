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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2ZUF0dHJpYnV0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvZG9tL29ic2VydmVBdHRyaWJ1dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHdFQUFpRDtJQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkJHO0lBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDOUMsT0FBTyxJQUFJLG1CQUFVLENBQ25CLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ1gsd0JBQXdCO1lBQ3hCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUMxRCxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7Z0JBQ3BCLG9CQUFvQjtnQkFDcEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO29CQUM3QixnQkFBZ0I7b0JBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO3dCQUN2QyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO3dCQUN2QixVQUFVLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQztxQkFDM0M7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQztZQUNILGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxNQUFNLGtCQUM3QixVQUFVLEVBQUUsSUFBSSxJQUViLFFBQVEsRUFDWCxDQUFDO1FBQ0wsQ0FBQyxFQUNEO1lBQ0UsRUFBRSxFQUFFLG1CQUFtQjtTQUN4QixDQUNGLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbkIsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsa0JBQWUsaUJBQWlCLENBQUMifQ==