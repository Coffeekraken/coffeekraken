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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2ZU11dGF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9kb20vb2JzZXJ2ZU11dGF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCx3RUFBaUQ7SUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQThCRztJQUNILFNBQVMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzlDLFFBQVEsbUJBQ04sVUFBVSxFQUFFLElBQUksRUFDaEIsU0FBUyxFQUFFLEtBQUssRUFDaEIsT0FBTyxFQUFFLEtBQUssSUFDWCxRQUFRLENBQ1osQ0FBQztRQUVGLElBQUksZ0JBQWdCLENBQUM7UUFFckIsT0FBTyxJQUFJLG1CQUFVLENBQ25CLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ1gsd0JBQXdCO1lBQ3hCLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDcEQsb0JBQW9CO2dCQUNwQixTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7b0JBQzdCLHNCQUFzQjtvQkFDdEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDekIsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxFQUNEO1lBQ0UsRUFBRSxFQUFFLGtCQUFrQjtTQUN2QixDQUNGLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbkIsZ0JBQWdCLElBQUksZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUsZ0JBQWdCLENBQUMifQ==