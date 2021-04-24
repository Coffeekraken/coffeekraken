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
        define(["require", "exports", "../../shared/string/autoCast", "./observeAttributes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var autoCast_1 = __importDefault(require("../../shared/string/autoCast"));
    var observeAttributes_1 = __importDefault(require("./observeAttributes"));
    /**
     * @name      whenAttribute
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Resolve a promise when the wanted attribute on the passed HTMLElement exist or pass the check function provided
     *
     * @param 		{HTMLElement} 				elm 				The HTMLElement on which to monitor the property
     * @param 		{String} 					attribute 			The attribute to monitor
     * @param 		{Function} 					[checkFn=null] 		An optional function to check the attribute. The promise is resolved when this function return true
     * @return 		(Promise) 										The promise that will be resolved when the attribute exist on the element (and that it passes the checkFn)
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import whenAttribute from '@coffeekraken/sugar/js/dom/whenAttribute'
     * whenAttribute(myCoolHTMLElement, 'value').then((value) => {
     * 		// the value attribute exist on the element
     * });
     * // with a checkFn
     * whenAttribute(myCoolHTMLElement, 'value', (newVal, oldVal) => {
     * 		// make sure the value is a number
     * 		return typeof(newVal) === 'number';
     * }).then((value) => {
     * 		// do something with your number value...
     * });
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function whenAttribute(elm, attrName, checkFn) {
        if (checkFn === void 0) { checkFn = null; }
        return new Promise(function (resolve, reject) {
            if (elm.hasAttribute(attrName)) {
                var value = autoCast_1.default(elm.getAttribute(attrName));
                if (checkFn && checkFn(value, value)) {
                    resolve(value);
                    return;
                }
                else if (!checkFn) {
                    resolve(value);
                    return;
                }
            }
            var obs = observeAttributes_1.default(elm).then(function (mutation) {
                if (mutation.attributeName === attrName) {
                    var value = autoCast_1.default(mutation.target.getAttribute(mutation.attributeName));
                    if (checkFn && checkFn(value, mutation.oldValue)) {
                        resolve(value);
                        obs.cancel();
                    }
                    else if (!checkFn) {
                        resolve(value);
                        obs.cancel();
                    }
                }
            });
        });
    }
    exports.default = whenAttribute;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbkF0dHJpYnV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndoZW5BdHRyaWJ1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsMEVBQXNEO0lBQ3RELDBFQUFxRDtJQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQ0c7SUFDSCxTQUFTLGFBQWEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQWM7UUFBZCx3QkFBQSxFQUFBLGNBQWM7UUFDbEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2pDLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDOUIsSUFBTSxLQUFLLEdBQUcsa0JBQVUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUU7b0JBQ3BDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDZixPQUFPO2lCQUNSO3FCQUFNLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDZixPQUFPO2lCQUNSO2FBQ0Y7WUFFRCxJQUFNLEdBQUcsR0FBRywyQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO2dCQUNoRCxJQUFJLFFBQVEsQ0FBQyxhQUFhLEtBQUssUUFBUSxFQUFFO29CQUN2QyxJQUFNLEtBQUssR0FBRyxrQkFBVSxDQUN0QixRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQ3JELENBQUM7b0JBQ0YsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7d0JBQ2hELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDZixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ2Q7eUJBQU0sSUFBSSxDQUFDLE9BQU8sRUFBRTt3QkFDbkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNmLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDZDtpQkFDRjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUsYUFBYSxDQUFDIn0=