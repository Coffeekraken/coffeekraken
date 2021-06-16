// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name        addEventListener
 * @namespace            js.dom.event
 * @type      Function
 * @platform        js
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
 * import addEventListener from '@coffeekraken/sugar/js/dom/addEventListener'
 * const listener = addEventListener($myCoolElm, 'click', (event) => {
 *    // event.type; // => click
 * });
 * // remove the event listener
 * listener.cancel();
 *
 * // listen for more than one event at a time
 * addEventListener($myCoolElm, 'click,mouseover,mouseout', (event) => {
 *    // do something depending on the event.type property
 * }).on('mouseover', (event) => {
 *    // do something when the event is the mouseover one
 * });
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function addEventListener($elm, eventNames, callback = null, useCapture = false) {
    if (!Array.isArray(eventNames))
        eventNames = eventNames.split(',').map((e) => e.trim());
    if (callback && typeof callback === 'function')
        callback = callback;
    else if (callback && typeof callback === 'boolean')
        useCapture = callback;
    const eventsStack = {};
    const promise = new __SPromise({
        id: 'addEventListener'
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
            useCapture
        };
        $elm.addEventListener(eventName, internalCallback, useCapture);
    });
    return promise;
}
export default addEventListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkRXZlbnRMaXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkZEV2ZW50TGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Q0c7QUFDSCxTQUFTLGdCQUFnQixDQUN2QixJQUFJLEVBQ0osVUFBVSxFQUNWLFFBQVEsR0FBRyxJQUFJLEVBQ2YsVUFBVSxHQUFHLEtBQUs7SUFFbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQzVCLFVBQVUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFMUQsSUFBSSxRQUFRLElBQUksT0FBTyxRQUFRLEtBQUssVUFBVTtRQUFFLFFBQVEsR0FBRyxRQUFRLENBQUM7U0FDL0QsSUFBSSxRQUFRLElBQUksT0FBTyxRQUFRLEtBQUssU0FBUztRQUFFLFVBQVUsR0FBRyxRQUFRLENBQUM7SUFFMUUsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBRXZCLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDO1FBQzdCLEVBQUUsRUFBRSxrQkFBa0I7S0FDdkIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ3BCLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUMvQixNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQy9CLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNqQyxJQUFJLFFBQVE7Z0JBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQztRQUVGLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRztZQUN2QixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFVBQVU7U0FDWCxDQUFDO1FBRUYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNqRSxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxlQUFlLGdCQUFnQixDQUFDIn0=