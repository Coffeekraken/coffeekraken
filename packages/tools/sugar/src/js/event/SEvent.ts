// @ts-nocheck

/**
 * @name 		                SEvent
 * @namespace           sugar.js.event
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
import customEvent from 'custom-event';
export default customEvent;

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
