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
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = observeMutations;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2ZU11dGF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9ic2VydmVNdXRhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFZCxpRUFBNkM7SUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQThCRztJQUNILFNBQVMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQWE7UUFBYix5QkFBQSxFQUFBLGFBQWE7UUFDOUMsUUFBUSxjQUNOLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLFNBQVMsRUFBRSxLQUFLLEVBQ2hCLE9BQU8sRUFBRSxLQUFLLElBQ1gsUUFBUSxDQUNaLENBQUM7UUFFRixJQUFJLGdCQUFnQixDQUFDO1FBRXJCLE9BQU8sSUFBSSxrQkFBVSxDQUNuQixVQUFDLEVBQVE7Z0JBQU4sSUFBSSxVQUFBO1lBQ0wsd0JBQXdCO1lBQ3hCLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsVUFBQyxTQUFTO2dCQUNoRCxvQkFBb0I7Z0JBQ3BCLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO29CQUN6QixzQkFBc0I7b0JBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLENBQUMsRUFDRDtZQUNFLEVBQUUsRUFBRSxrQkFBa0I7U0FDdkIsQ0FDRixDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUU7WUFDZCxnQkFBZ0IsSUFBSSxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxrQkFBZSxnQkFBZ0IsQ0FBQyJ9