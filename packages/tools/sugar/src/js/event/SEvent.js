// @ts-nocheck
/**
 * @name 		                SEvent
 * @namespace            js.event
 * @type                    Class
 * @import              import SEvent from '@coffeekraken/sugar/js/event/SEvent';
 * @platform                js
 * @status                  stable
 *
 * Proxy class to create custom events that can be dispatched
 * through the standard dispatch method on any HTMLElement
 *
 * @setting         {Boolean}       [cancelable=true]           Specify if the event is cancelable or not
 * @setting         {Boolean}           [bubbles=true]          Specify if the event has to bubble or not
 * @setting             {Any}            [detail=null]           Specify some data to emit with the event
 *
 * @param           {String}            name            The event name
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
import customEvent from 'custom-event';
export default customEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0V2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0V2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0NHO0FBQ0gsT0FBTyxXQUFXLE1BQU0sY0FBYyxDQUFDO0FBUXZDLGVBQWUsV0FBVyxDQUFDIn0=