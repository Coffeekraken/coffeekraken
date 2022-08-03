"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name 		                SEvent
 * @namespace            js.event
 * @type                    Class
 * @import              import SEvent from '@coffeekraken/sugar/js/event/SEvent';
 * @platform          js
 * @status                  stable
 *
 * Proxy class to create custom events that can be dispatched
 * through the standard dispatch method on any HTMLElement
 *
 * @setting         {Boolean}       [cancelable=true]           Specify if the event is cancelable or not
 * @setting         {Boolean}           [bubbles=true]          Specify if the event has to bubble or not
 * @setting             {Any}            [detail=null]           Specify some data to emit with the event
 *
 * @param           {String}            name            The event name
 * @param           {ISEventSettings}           [settings={}]           Some settings to tweak the event behavior
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
const custom_event_1 = __importDefault(require("custom-event"));
exports.default = custom_event_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ0c7QUFDSCxnRUFBdUM7QUFRdkMsa0JBQWUsc0JBQVcsQ0FBQyJ9