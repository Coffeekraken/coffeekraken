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
        define(["require", "exports", "domready"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name      domReady
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Wait that the dom is ready before resolving the promise
     *
     * @param 		{Function} 		cb 			An optional callback that will be called when the dom is ready
     * @return 		{Promise} 					A promise that will be resolved when the dom is ready
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import domReady from '@coffeekraken/sugar/js/dom/domReady'
     * // using callback
     * domReady(() => {
     * 		// do something
     * });
     * // using promise
     * domReady().then(() => {
     * 		// do something
     * });
     *
     * @since           1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    const domready_1 = __importDefault(require("domready"));
    function domReady(cb = null) {
        return new Promise((resolve, reject) => {
            domready_1.default(() => {
                cb && cb();
                resolve();
            });
        });
    }
    exports.default = domReady;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tcmVhZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvZG9tL2RvbXJlYWR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNEJHO0lBQ0gsd0RBQWtDO0lBQ2xDLFNBQVMsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJO1FBQ3pCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsa0JBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO2dCQUNYLE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxrQkFBZSxRQUFRLENBQUMifQ==