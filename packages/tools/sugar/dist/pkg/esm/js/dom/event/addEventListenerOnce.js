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
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import addEventListenerOnce from '@coffeekraken/sugar/js/dom/addEventListenerOnce'
 * addEventListenerOnce(myElm, 'click', (e) => {
 *     // do something on click
 * });
 * addEventListenerOnce(myElm, 'click').on('click', (e) => {
 *
 * });
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function addEventListenerOnce($elm, eventNames, callback = null, useCapture = false) {
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
export default addEventListenerOnce;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGtCQUFrQixNQUFNLG9CQUFvQixDQUFDO0FBRXBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFDSCxTQUFTLG9CQUFvQixDQUN6QixJQUFpQixFQUNqQixVQUE2QixFQUM3QixRQUFRLEdBQUcsSUFBSSxFQUNmLFVBQVUsR0FBRyxLQUFLO0lBRWxCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUFFLFVBQVUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRTFELE1BQU0sYUFBYSxHQUFHLElBQUksVUFBVSxDQUFDO1FBQ2pDLEVBQUUsRUFBRSxzQkFBc0I7S0FDN0IsQ0FBQyxDQUFDO0lBRUgsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBRXZCLGFBQWEsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUM3QixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDN0IsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQzdCLE1BQU0sT0FBTyxHQUFHLGtCQUFrQixDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRXRFLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRztZQUNyQixPQUFPO1NBQ1YsQ0FBQztRQUVGLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxRQUFRLElBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxFQUFFO2dCQUM1QyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDakM7WUFDRCxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNyQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sYUFBYSxDQUFDO0FBQ3pCLENBQUM7QUFDRCxlQUFlLG9CQUFvQixDQUFDIn0=