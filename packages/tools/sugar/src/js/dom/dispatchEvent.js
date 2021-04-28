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
        define(["require", "exports", "../event/SEvent"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const SEvent_1 = __importDefault(require("../event/SEvent"));
    /**
     * @name      dispatchEvent
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Helper to quickly display an event with some optional data attached to it
     *
     * @param 		{HTMLElement} 					$target  		The element to dispatch the event from
     * @param 		{String} 						name 			The event name to dispatch
     * @param 		{Mixed} 						data 			The data to attache to the event
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import dispatchEvent from '@coffeekraken/sugar/js/dom/dispatchEvent'
     * dispatchEvent(myCoolHTMLElement, 'myCoolEventName', {
     * 		var1 : 'value1'
     * });
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function dispatchEvent($target, name, data = null) {
        // create new event
        const e = new SEvent_1.default(name, {
            detail: data,
            bubbles: true,
            cancelable: true
        });
        $target.dispatchEvent(e);
    }
    exports.default = dispatchEvent;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGF0Y2hFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9kb20vZGlzcGF0Y2hFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw2REFBdUM7SUFFdkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxHQUFHLElBQUk7UUFDL0MsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxHQUFHLElBQUksZ0JBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDM0IsTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPLEVBQUUsSUFBSTtZQUNiLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNELGtCQUFlLGFBQWEsQ0FBQyJ9