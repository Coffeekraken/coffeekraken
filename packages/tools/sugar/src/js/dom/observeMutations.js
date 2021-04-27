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
     * @name      observeMutations
     * @namespace            js.dom
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
        return new s_promise_1.default(({ emit }) => {
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
    exports.default = observeMutations;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2ZU11dGF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9ic2VydmVNdXRhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsd0VBQWlEO0lBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E4Qkc7SUFDSCxTQUFTLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUM5QyxRQUFRLG1CQUNOLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLFNBQVMsRUFBRSxLQUFLLEVBQ2hCLE9BQU8sRUFBRSxLQUFLLElBQ1gsUUFBUSxDQUNaLENBQUM7UUFFRixJQUFJLGdCQUFnQixDQUFDO1FBRXJCLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUNYLHdCQUF3QjtZQUN4QixnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ3BELG9CQUFvQjtnQkFDcEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO29CQUM3QixzQkFBc0I7b0JBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLENBQUMsRUFDRDtZQUNFLEVBQUUsRUFBRSxrQkFBa0I7U0FDdkIsQ0FDRixDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25CLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGtCQUFlLGdCQUFnQixDQUFDIn0=