// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __addEventListener from './addEventListener';
/**
 * @name        addEventListenerOnce
 * @namespace            js.dom.event
 * @type      Function
 * @platform          js
 * @status          beta
 *
 * Add an event listener that will be trigerred only once
 *
 * @feature       All the features of the `sugar.js.dom.addEventListener` functions
 * @feature       Remove automatically the listener after 1 event
 *
 * @param    {HTMLElement}    $elm    The element to add the event listener on
 * @param    {String}    event    The event to listen for
 * @param    {Function}    [callback=null]    The callback function to call on event
 * @param    {Boolean}    [useCapture=false]    A Boolean value that specifies whether the event should be executed in the capturing or in the bubbling phase
 * @return    {Promise}                   A promise that will be resolved once the event has been called
 *
 * @snippet         __addEventListenerOnce($1, $2, $3)
 * __addEventListenerOnce($1, $2, e => {
 *      $3
 * });
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __addEventListenerOnce } from '@coffeekraken/sugar/dom'
 *  __addEventListenerOnce(myElm, 'click', (e) => {
 *     // do something on click
 * });
 *  __addEventListenerOnce(myElm, 'click').on('click', (e) => {
 *
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __addEventListenerOnce($elm, eventNames, callback = null, useCapture = false) {
    if (!Array.isArray(eventNames))
        eventNames = [eventNames];
    const globalPromise = new __SPromise({
        id: 'addEventListenerOnce',
    });
    const eventsStack = {};
    globalPromise.on('finally', () => {
        eventNames.forEach((eventName) => {
            eventsStack[eventName].promise.cancel();
        });
    });
    eventNames.forEach((eventName) => {
        const promise = __addEventListener($elm, eventName, null, useCapture);
        eventsStack[eventName] = {
            promise,
        };
        promise.on(eventNames, (event) => {
            if (callback && typeof callback === 'function') {
                callback.apply(this, [event]);
            }
            globalPromise.emit(eventName, event);
            promise.cancel();
        });
    });
    return globalPromise;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGtCQUFrQixNQUFNLG9CQUFvQixDQUFDO0FBRXBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsc0JBQXNCLENBQzFDLElBQWlCLEVBQ2pCLFVBQTZCLEVBQzdCLFFBQVEsR0FBRyxJQUFJLEVBQ2YsVUFBVSxHQUFHLEtBQUs7SUFFbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQUUsVUFBVSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFMUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxVQUFVLENBQUM7UUFDakMsRUFBRSxFQUFFLHNCQUFzQjtLQUM3QixDQUFDLENBQUM7SUFFSCxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFFdkIsYUFBYSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQzdCLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUM3QixXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDN0IsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFdEUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHO1lBQ3JCLE9BQU87U0FDVixDQUFDO1FBRUYsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM3QixJQUFJLFFBQVEsSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLEVBQUU7Z0JBQzVDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNqQztZQUNELGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxhQUFhLENBQUM7QUFDekIsQ0FBQyJ9