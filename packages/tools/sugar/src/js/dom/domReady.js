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
    /**
     * @name      domReady
     * @namespace           sugar.js.dom
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
    var domready_1 = __importDefault(require("domready"));
    function domReady(cb) {
        if (cb === void 0) { cb = null; }
        return new Promise(function (resolve, reject) {
            domready_1.default(function () {
                cb && cb();
                resolve();
            });
        });
    }
    return domReady;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tcmVhZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb21yZWFkeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNEJHO0lBQ0gsc0RBQWtDO0lBQ2xDLFNBQVMsUUFBUSxDQUFDLEVBQVM7UUFBVCxtQkFBQSxFQUFBLFNBQVM7UUFDekIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2pDLGtCQUFVLENBQUM7Z0JBQ1QsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO2dCQUNYLE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxPQUFTLFFBQVEsQ0FBQyJ9