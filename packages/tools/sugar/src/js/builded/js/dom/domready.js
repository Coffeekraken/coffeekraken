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
    exports.default = domReady;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tcmVhZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9kb20vZG9tcmVhZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E0Qkc7SUFDSCxzREFBa0M7SUFDbEMsU0FBUyxRQUFRLENBQUMsRUFBUztRQUFULG1CQUFBLEVBQUEsU0FBUztRQUN6QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsa0JBQVUsQ0FBQztnQkFDVCxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7Z0JBQ1gsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGtCQUFlLFFBQVEsQ0FBQyJ9