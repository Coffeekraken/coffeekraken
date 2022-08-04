"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
        window._sugarEventSPromise = new s_promise_1.default({
            id: 'sugarEventSPromise',
        });
    // subscribe to the event
    window._sugarEventSPromise.on(name, callback);
    // return the unsubscribe function
    return () => {
        window._sugarEventSPromise.off(name, callback);
    };
}
exports.default = on;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLEVBQUUsQ0FBQyxJQUFZLEVBQUUsUUFBa0I7SUFDeEMsd0NBQXdDO0lBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CO1FBQzNCLE1BQU0sQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLG1CQUFVLENBQUM7WUFDeEMsRUFBRSxFQUFFLG9CQUFvQjtTQUMzQixDQUFDLENBQUM7SUFDUCx5QkFBeUI7SUFDekIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDOUMsa0NBQWtDO0lBQ2xDLE9BQU8sR0FBRyxFQUFFO1FBQ1IsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbkQsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUNELGtCQUFlLEVBQUUsQ0FBQyJ9