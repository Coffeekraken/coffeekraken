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
    const in_viewport_1 = __importDefault(require("in-viewport"));
    /**
     * @name      whenInViewport
     * @namespace            js.dom
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
    function whenInViewport(elm, offset = 50) {
        return new Promise((resolve, reject) => {
            in_viewport_1.default(elm, {
                offset: offset
            }, () => {
                resolve(elm);
            });
        });
    }
    exports.default = whenInViewport;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbkluVmlld3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuSW5WaWV3cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw4REFBdUM7SUFFdkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsY0FBYyxDQUFDLEdBQUcsRUFBRSxNQUFNLEdBQUcsRUFBRTtRQUN0QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLHFCQUFZLENBQ1YsR0FBRyxFQUNIO2dCQUNFLE1BQU0sRUFBRSxNQUFNO2FBQ2YsRUFDRCxHQUFHLEVBQUU7Z0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxrQkFBZSxjQUFjLENBQUMifQ==