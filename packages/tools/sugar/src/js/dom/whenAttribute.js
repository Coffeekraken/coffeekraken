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
        define(["require", "exports", "../string/autoCast", "./observeAttributes"], factory);
    }
})(function (require, exports) {
    "use strict";
    var autoCast_1 = __importDefault(require("../string/autoCast"));
    var observeAttributes_1 = __importDefault(require("./observeAttributes"));
    /**
     * @name      whenAttribute
     * @namespace           sugar.js.dom
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
    return whenAttribute;
});
//# sourceMappingURL=module.js.map