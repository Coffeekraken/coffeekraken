// @ts-nocheck
import __SPromise from '../promise/SPromise';
/**
 * @name        emit
 * @namespace           sugar.js.event
 * @type          Function
 * @stable
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function emit(name, value) {
    // check that the global SPromise exists
    if (!window._sugarEventSPromise)
        window._sugarEventSPromise = new __SPromise({
            id: 'sugarEventSPromise'
        });
    // emit to the event
    window._sugarEventSPromise.emit(name, value);
}
export default emit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVtaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sVUFBVSxNQUFNLHFCQUFxQixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUs7SUFDdkIsd0NBQXdDO0lBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CO1FBQzdCLE1BQU0sQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLFVBQVUsQ0FBQztZQUMxQyxFQUFFLEVBQUUsb0JBQW9CO1NBQ3pCLENBQUMsQ0FBQztJQUNMLG9CQUFvQjtJQUNwQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMvQyxDQUFDO0FBQ0QsZUFBZSxJQUFJLENBQUMifQ==