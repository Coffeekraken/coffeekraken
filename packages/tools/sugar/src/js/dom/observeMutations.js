// @ts-nocheck
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../promise/SPromise"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    /**
     * @name      observeMutations
     * @namespace           sugar.js.dom
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
    function observeMutations($target, settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({ attributes: true, childList: false, subtree: false }, settings);
        var mutationObserver;
        return new SPromise_1.default(function (_a) {
            var emit = _a.emit;
            // create a new observer
            mutationObserver = new MutationObserver(function (mutations) {
                // loop on mutations
                mutations.forEach(function (mutation) {
                    // emit the then stack
                    emit('then', mutation);
                });
            });
            mutationObserver.observe($target, settings);
        }, {
            id: 'observeMutations'
        }).on('finally', function () {
            mutationObserver && mutationObserver.disconnect();
        });
    }
    return observeMutations;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2ZU11dGF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9ic2VydmVNdXRhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkLGlFQUE2QztJQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BOEJHO0lBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsUUFBYTtRQUFiLHlCQUFBLEVBQUEsYUFBYTtRQUM5QyxRQUFRLGNBQ04sVUFBVSxFQUFFLElBQUksRUFDaEIsU0FBUyxFQUFFLEtBQUssRUFDaEIsT0FBTyxFQUFFLEtBQUssSUFDWCxRQUFRLENBQ1osQ0FBQztRQUVGLElBQUksZ0JBQWdCLENBQUM7UUFFckIsT0FBTyxJQUFJLGtCQUFVLENBQ25CLFVBQUMsRUFBUTtnQkFBTixJQUFJLFVBQUE7WUFDTCx3QkFBd0I7WUFDeEIsZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxVQUFDLFNBQVM7Z0JBQ2hELG9CQUFvQjtnQkFDcEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVE7b0JBQ3pCLHNCQUFzQjtvQkFDdEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDekIsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxFQUNEO1lBQ0UsRUFBRSxFQUFFLGtCQUFrQjtTQUN2QixDQUNGLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRTtZQUNkLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELE9BQVMsZ0JBQWdCLENBQUMifQ==