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
    var SEvent_1 = __importDefault(require("../event/SEvent"));
    /**
     * @name      dispatchEvent
     * @namespace           sugar.js.dom
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
    function dispatchEvent($target, name, data) {
        if (data === void 0) { data = null; }
        // create new event
        var e = new SEvent_1.default(name, {
            detail: data,
            bubbles: true,
            cancelable: true
        });
        $target.dispatchEvent(e);
    }
    exports.default = dispatchEvent;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGF0Y2hFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2RvbS9kaXNwYXRjaEV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDJEQUF1QztJQUV2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsU0FBUyxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFXO1FBQVgscUJBQUEsRUFBQSxXQUFXO1FBQy9DLG1CQUFtQjtRQUNuQixJQUFNLENBQUMsR0FBRyxJQUFJLGdCQUFRLENBQUMsSUFBSSxFQUFFO1lBQzNCLE1BQU0sRUFBRSxJQUFJO1lBQ1osT0FBTyxFQUFFLElBQUk7WUFDYixVQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDRCxrQkFBZSxhQUFhLENBQUMifQ==