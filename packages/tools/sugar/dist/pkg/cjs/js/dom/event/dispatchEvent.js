"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SEvent_1 = __importDefault(require("../../event/SEvent"));
/**
 * @name      dispatchEvent
 * @namespace            js.dom.event
 * @type      Function
 * @platform          js
 * @status          stable
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function dispatchEvent($target, name, data = null) {
    // create new event
    const e = new SEvent_1.default(name, {
        detail: data,
        bubbles: true,
        cancelable: true,
    });
    $target.dispatchEvent(e);
}
exports.default = dispatchEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGdFQUEwQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsYUFBYSxDQUNsQixPQUFvQixFQUNwQixJQUFZLEVBQ1osT0FBWSxJQUFJO0lBRWhCLG1CQUFtQjtJQUNuQixNQUFNLENBQUMsR0FBRyxJQUFJLGdCQUFRLENBQUMsSUFBSSxFQUFFO1FBQ3pCLE1BQU0sRUFBRSxJQUFJO1FBQ1osT0FBTyxFQUFFLElBQUk7UUFDYixVQUFVLEVBQUUsSUFBSTtLQUNuQixDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFDRCxrQkFBZSxhQUFhLENBQUMifQ==