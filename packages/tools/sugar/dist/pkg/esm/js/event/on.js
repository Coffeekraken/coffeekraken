// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name        on
 * @namespace            js.event
 * @type          Function
 * @platform          js
 * @status      beta
 *
 * This function allows you to subscribe to global events triggered by the "sugar.js.event.dispatch" function
 * It use under the hood an SPromise instance
 *
 * @param         {String}        name          The event name you want to subscribe to
 * @param         {Function}      callback      The callback function you want to call
 * @return        {Function}                    Return an "unsubscribe" function callable when you want to stop executing the callback
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import on from '@coffeekraken/sugar/js/event/on';
 * on('something', () => {
 *    // do something
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function on(name, callback) {
    // check that the global SPromise exists
    if (!window._sugarEventSPromise)
        window._sugarEventSPromise = new __SPromise({
            id: 'sugarEventSPromise',
        });
    // subscribe to the event
    window._sugarEventSPromise.on(name, callback);
    // return the unsubscribe function
    return () => {
        window._sugarEventSPromise.off(name, callback);
    };
}
export default on;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLEVBQUUsQ0FBQyxJQUFZLEVBQUUsUUFBa0I7SUFDeEMsd0NBQXdDO0lBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CO1FBQzNCLE1BQU0sQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLFVBQVUsQ0FBQztZQUN4QyxFQUFFLEVBQUUsb0JBQW9CO1NBQzNCLENBQUMsQ0FBQztJQUNQLHlCQUF5QjtJQUN6QixNQUFNLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM5QyxrQ0FBa0M7SUFDbEMsT0FBTyxHQUFHLEVBQUU7UUFDUixNQUFNLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNuRCxDQUFDLENBQUM7QUFDTixDQUFDO0FBQ0QsZUFBZSxFQUFFLENBQUMifQ==