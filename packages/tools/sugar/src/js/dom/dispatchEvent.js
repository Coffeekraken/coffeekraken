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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGF0Y2hFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpc3BhdGNoRXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsNkRBQXVDO0lBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxTQUFTLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksR0FBRyxJQUFJO1FBQy9DLG1CQUFtQjtRQUNuQixNQUFNLENBQUMsR0FBRyxJQUFJLGdCQUFRLENBQUMsSUFBSSxFQUFFO1lBQzNCLE1BQU0sRUFBRSxJQUFJO1lBQ1osT0FBTyxFQUFFLElBQUk7WUFDYixVQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDRCxrQkFBZSxhQUFhLENBQUMifQ==