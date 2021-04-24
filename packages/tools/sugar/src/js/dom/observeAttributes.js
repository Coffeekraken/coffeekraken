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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2ZUF0dHJpYnV0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvYnNlcnZlQXR0cmlidXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHNFQUFpRDtJQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkJHO0lBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsUUFBYTtRQUFiLHlCQUFBLEVBQUEsYUFBYTtRQUM5QyxPQUFPLElBQUksbUJBQVUsQ0FDbkIsVUFBQyxFQUFRO2dCQUFOLElBQUksVUFBQTtZQUNMLHdCQUF3QjtZQUN4QixJQUFNLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsVUFBQyxTQUFTO2dCQUN0RCxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7Z0JBQ3BCLG9CQUFvQjtnQkFDcEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVE7b0JBQ3pCLGdCQUFnQjtvQkFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7d0JBQ3ZDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBQ3ZCLFVBQVUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDO3FCQUMzQztnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDSCxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE1BQU0sYUFDN0IsVUFBVSxFQUFFLElBQUksSUFFYixRQUFRLEVBQ1gsQ0FBQztRQUNMLENBQUMsRUFDRDtZQUNFLEVBQUUsRUFBRSxtQkFBbUI7U0FDeEIsQ0FDRixDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUU7WUFDZCxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxrQkFBZSxpQkFBaUIsQ0FBQyJ9