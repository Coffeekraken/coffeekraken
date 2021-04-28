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
    const autoCast_1 = __importDefault(require("../../shared/string/autoCast"));
    const observeAttributes_1 = __importDefault(require("./observeAttributes"));
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
    function whenAttribute(elm, attrName, checkFn = null) {
        return new Promise((resolve, reject) => {
            if (elm.hasAttribute(attrName)) {
                const value = autoCast_1.default(elm.getAttribute(attrName));
                if (checkFn && checkFn(value, value)) {
                    resolve(value);
                    return;
                }
                else if (!checkFn) {
                    resolve(value);
                    return;
                }
            }
            const obs = observeAttributes_1.default(elm).then((mutation) => {
                if (mutation.attributeName === attrName) {
                    const value = autoCast_1.default(mutation.target.getAttribute(mutation.attributeName));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbkF0dHJpYnV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9kb20vd2hlbkF0dHJpYnV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw0RUFBc0Q7SUFDdEQsNEVBQXFEO0lBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWdDRztJQUNILFNBQVMsYUFBYSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxHQUFHLElBQUk7UUFDbEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzlCLE1BQU0sS0FBSyxHQUFHLGtCQUFVLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFO29CQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2YsT0FBTztpQkFDUjtxQkFBTSxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2YsT0FBTztpQkFDUjthQUNGO1lBRUQsTUFBTSxHQUFHLEdBQUcsMkJBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ3BELElBQUksUUFBUSxDQUFDLGFBQWEsS0FBSyxRQUFRLEVBQUU7b0JBQ3ZDLE1BQU0sS0FBSyxHQUFHLGtCQUFVLENBQ3RCLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FDckQsQ0FBQztvQkFDRixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTt3QkFDaEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNmLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDZDt5QkFBTSxJQUFJLENBQUMsT0FBTyxFQUFFO3dCQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2YsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO3FCQUNkO2lCQUNGO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxrQkFBZSxhQUFhLENBQUMifQ==