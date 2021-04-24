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
        define(["require", "exports", "custom-event"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name 		                SEvent
     * @namespace            js.event
     * @type                    Class
     * @stable
     *
     * Proxy class to create custom events that can be dispatched
     * through the standard dispatch method on any HTMLElement
     *
     * @todo            interface
     * @todo            doc
     * @todo            tests
     *
     * @example 	          js
     * let myEvent = new SEvent('myCoolEvent', {
     * 		cancelable : true,
     * 		bubbles : false,
     * 		detail : {
     * 			// some datas to send with the event
     * 		}
     * });
     * // dispatch the event from an HTMLElement
     * myHTMLElement.dispatch(myEvent);
     *
     * @see 		https://www.npmjs.com/package/customevent
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    var custom_event_1 = __importDefault(require("custom-event"));
    exports.default = custom_event_1.default;
});
/**
 * @name                        constructor
 * @type                        Function
 *
 * Construct the event
 *
 * @param  	            	{String} 	              name 		              The event name
 * @param 	            	{Object} 	              settings 	            The event settings
 *
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
/**
 * @name                        settings.cancelable
 * @type                        Boolean
 * @default                     true
 *
 * Set if the event is cancelable or not
 *
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
/**
 * @name                        settings.bubbles
 * @type                        Boolean
 * @default                     true
 *
 * Set if the event will bubble or not
 *
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
/**
 * @name                        settings.detail
 * @type                        Object
 * @default                     null
 *
 * Pass an object that will be sent with the event
 *
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0V2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0V2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EyQkc7SUFDSCw4REFBdUM7SUFDdkMsa0JBQWUsc0JBQVcsQ0FBQzs7QUFFM0I7Ozs7Ozs7Ozs7R0FVRztBQUVIOzs7Ozs7OztHQVFHO0FBRUg7Ozs7Ozs7O0dBUUc7QUFFSDs7Ozs7Ozs7R0FRRyJ9