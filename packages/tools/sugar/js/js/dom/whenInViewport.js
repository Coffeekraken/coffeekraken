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
        define(["require", "exports", "in-viewport"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var in_viewport_1 = __importDefault(require("in-viewport"));
    /**
     * @name      whenInViewport
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Monitor an HTMLElement to be notified when it is in the viewport
     *
     * @param 		{HTMLElement} 				elm 					The element to monitor
     * @param 		{Number} 					[offset=50] 			An offset that represent the distance before entering the viewport for the detection
     * @return 		(Promise) 											The promise that will be resolved when the element is in the viewport
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import whenInViewport from '@coffeekraken/sugar/js/dom/whenInViewport'
     * whenInViewport(myCoolHTMLElement).then((elm) => {
     * 		// do something with your element that has entered the viewport...
     * });
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function whenInViewport(elm, offset) {
        if (offset === void 0) { offset = 50; }
        return new Promise(function (resolve, reject) {
            in_viewport_1.default(elm, {
                offset: offset
            }, function () {
                resolve(elm);
            });
        });
    }
    exports.default = whenInViewport;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbkluVmlld3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvanMvZG9tL3doZW5JblZpZXdwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDREQUF1QztJQUV2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsU0FBUyxjQUFjLENBQUMsR0FBRyxFQUFFLE1BQVc7UUFBWCx1QkFBQSxFQUFBLFdBQVc7UUFDdEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2pDLHFCQUFZLENBQ1YsR0FBRyxFQUNIO2dCQUNFLE1BQU0sRUFBRSxNQUFNO2FBQ2YsRUFDRDtnQkFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZixDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGtCQUFlLGNBQWMsQ0FBQyJ9