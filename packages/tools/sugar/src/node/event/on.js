// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name        on
 * @namespace            node.event
 * @type          Function
 * @status              beta
 *
 * This function allows you to subscribe to global events emited by the "sugar.node.event.dispatch" function
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
 * import on from '@coffeekraken/sugar/node/event/on';
 * on('something', () => {
 *    // do something
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function on(name, callback) {
    // check that the global SPromise exists
    if (!global._sugarEventSPromise)
        global._sugarEventSPromise = new __SPromise({
            id: 'sugarEventSPromise'
        });
    // subscribe to the event
    global._sugarEventSPromise.on(name, callback);
    // return the unsubscribe function
    return () => {
        global._sugarEventSPromise.off(name, callback);
    };
}
export default on;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUTtJQUN4Qix3Q0FBd0M7SUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUI7UUFDN0IsTUFBTSxDQUFDLG1CQUFtQixHQUFHLElBQUksVUFBVSxDQUFDO1lBQzFDLEVBQUUsRUFBRSxvQkFBb0I7U0FDekIsQ0FBQyxDQUFDO0lBQ0wseUJBQXlCO0lBQ3pCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLGtDQUFrQztJQUNsQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQztBQUNKLENBQUM7QUFDRCxlQUFlLEVBQUUsQ0FBQyJ9