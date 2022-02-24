// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name        emit
 * @namespace            js.event
 * @type          Function
 * @platform          js
 * @status      beta
 *
 * This function can ben used to emit an event globally.
 * You can subscribe to these events using the "sugar.js.event.subscribe" function
 *
 * @param         {String}        name          The event name you want to trigger to
 * @param         {Mixed}        value          The value you want to send alongside the event
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import emit from '@coffeekraken/sugar/js/event/emit';
 * emit('something', 'Hello world');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function emit(name, value) {
    // check that the global SPromise exists
    if (!window._sugarEventSPromise)
        window._sugarEventSPromise = new __SPromise({
            id: 'sugarEventSPromise',
        });
    // emit to the event
    window._sugarEventSPromise.emit(name, value);
}
export default emit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVtaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsSUFBSSxDQUFDLElBQVksRUFBRSxLQUFVO0lBQ2xDLHdDQUF3QztJQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQjtRQUMzQixNQUFNLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxVQUFVLENBQUM7WUFDeEMsRUFBRSxFQUFFLG9CQUFvQjtTQUMzQixDQUFDLENBQUM7SUFDUCxvQkFBb0I7SUFDcEIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUNELGVBQWUsSUFBSSxDQUFDIn0=