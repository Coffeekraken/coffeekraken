// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name        on
 * @namespace            js.event
 * @type          Function
 * @platform      js
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function on(name, callback) {
    // check that the global SPromise exists
    if (!window._sugarEventSPromise)
        window._sugarEventSPromise = new __SPromise({
            id: 'sugarEventSPromise'
        });
    // subscribe to the event
    window._sugarEventSPromise.on(name, callback);
    // return the unsubscribe function
    return () => {
        window._sugarEventSPromise.off(name, callback);
    };
}
export default on;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBUyxFQUFFLENBQUMsSUFBWSxFQUFFLFFBQWtCO0lBQzFDLHdDQUF3QztJQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQjtRQUM3QixNQUFNLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxVQUFVLENBQUM7WUFDMUMsRUFBRSxFQUFFLG9CQUFvQjtTQUN6QixDQUFDLENBQUM7SUFDTCx5QkFBeUI7SUFDekIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDOUMsa0NBQWtDO0lBQ2xDLE9BQU8sR0FBRyxFQUFFO1FBQ1YsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUNELGVBQWUsRUFBRSxDQUFDIn0=