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
        define(["require", "exports", "@coffeekraken/s-promise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    /**
     * @name        observeAttributes
     * @namespace           sugar.js.dom
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
    function observeAttributes(target, settings) {
        if (settings === void 0) { settings = {}; }
        return new s_promise_1.default(function (_a) {
            var emit = _a.emit;
            // create a new observer
            var mutationObserver = new MutationObserver(function (mutations) {
                var mutedAttrs = {};
                // loop on mutations
                mutations.forEach(function (mutation) {
                    // push mutation
                    if (!mutedAttrs[mutation.attributeName]) {
                        emit('then', mutation);
                        mutedAttrs[mutation.attributeName] = true;
                    }
                });
                mutedAttrs = {};
            });
            mutationObserver.observe(target, __assign({ attributes: true }, settings));
        }, {
            id: 'observeAttributes'
        }).on('finally', function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2ZUF0dHJpYnV0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvanMvZG9tL29ic2VydmVBdHRyaWJ1dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsc0VBQWlEO0lBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EyQkc7SUFDSCxTQUFTLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQzlDLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixVQUFDLEVBQVE7Z0JBQU4sSUFBSSxVQUFBO1lBQ0wsd0JBQXdCO1lBQ3hCLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxVQUFDLFNBQVM7Z0JBQ3RELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztnQkFDcEIsb0JBQW9CO2dCQUNwQixTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUTtvQkFDekIsZ0JBQWdCO29CQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTt3QkFDdkMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQzt3QkFDdkIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUM7cUJBQzNDO2dCQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNILFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxhQUM3QixVQUFVLEVBQUUsSUFBSSxJQUViLFFBQVEsRUFDWCxDQUFDO1FBQ0wsQ0FBQyxFQUNEO1lBQ0UsRUFBRSxFQUFFLG1CQUFtQjtTQUN4QixDQUNGLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRTtZQUNkLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGtCQUFlLGlCQUFpQixDQUFDIn0=