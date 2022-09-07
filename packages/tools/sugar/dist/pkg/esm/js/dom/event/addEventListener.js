// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name        addEventListener
 * @namespace            js.dom.event
 * @type      Function
 * @platform          js
 * @status          beta
 *
 * Add an event listener on an element and return the function to remove the event listener
 *
 * @feature       Returns an SPromise that you can use to remove the event listener using the `cancel` method
 * @feature       Can listen to multiple events at once
 *
 * @param    {HTMLElement}    $elm    The HTMLElement on which to add the event listener
 * @param    {String}    eventNames    The event names to listen to. Can be a simple string like "click", multiple events like "click,focus", or an array of events like ['click','hover']
 * @param    {Function}    callback    The callback function to call on event. The passed event
 * @param    {Boolean}    [useCapture=false]    A Boolean value that specifies whether the event should be executed in the capturing or in the bubbling phase
 * @return    {SPromise}                An SPromise instance on which you can listen for events or simply "cancel" the listeneing process
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __addEventListener } from '@coffeekraken/sugar/dom'
 * const listener = __addEventListener($myCoolElm, 'click', (event) => {
 *    // event.type; // => click
 * });
 * // remove the event listener
 * listener.cancel();
 *
 * // listen for more than one event at a time
 * __addEventListener($myCoolElm, 'click,mouseover,mouseout', (event) => {
 *    // do something depending on the event.type property
 * }).on('mouseover', (event) => {
 *    // do something when the event is the mouseover one
 * });
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __addEventListener($elm, eventNames, callback = null, useCapture = false) {
    if (!Array.isArray(eventNames))
        eventNames = eventNames.split(',').map((e) => e.trim());
    if (callback && typeof callback === 'function')
        callback = callback;
    else if (callback && typeof callback === 'boolean')
        useCapture = callback;
    const eventsStack = {};
    const promise = new __SPromise({
        id: 'addEventListener',
    }).on('finally', () => {
        eventNames.forEach((eventName) => {
            const stack = eventsStack[eventName];
            $elm.removeEventListener(eventName, stack.callback, stack.useCapture);
        });
    });
    eventNames.forEach((eventName) => {
        const internalCallback = (event) => {
            if (callback)
                callback.apply(this, [event]);
            promise.emit(eventName, event);
        };
        eventsStack[eventName] = {
            callback: internalCallback,
            useCapture,
        };
        $elm.addEventListener(eventName, internalCallback, useCapture);
    });
    return promise;
}
export default addEventListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNHO0FBQ0gsU0FBUyxrQkFBa0IsQ0FDdkIsSUFBSSxFQUNKLFVBQVUsRUFDVixRQUFRLEdBQUcsSUFBSSxFQUNmLFVBQVUsR0FBRyxLQUFLO0lBRWxCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUMxQixVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRTVELElBQUksUUFBUSxJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVU7UUFBRSxRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQy9ELElBQUksUUFBUSxJQUFJLE9BQU8sUUFBUSxLQUFLLFNBQVM7UUFBRSxVQUFVLEdBQUcsUUFBUSxDQUFDO0lBRTFFLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUV2QixNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQztRQUMzQixFQUFFLEVBQUUsa0JBQWtCO0tBQ3pCLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUNsQixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDN0IsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxtQkFBbUIsQ0FDcEIsU0FBUyxFQUNULEtBQUssQ0FBQyxRQUFRLEVBQ2QsS0FBSyxDQUFDLFVBQVUsQ0FDbkIsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDN0IsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQy9CLElBQUksUUFBUTtnQkFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDNUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDO1FBRUYsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHO1lBQ3JCLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsVUFBVTtTQUNiLENBQUM7UUFFRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ25FLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQUNELGVBQWUsZ0JBQWdCLENBQUMifQ==