"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
/**
 * @name        on
 * @namespace           sugar.node.event
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
        global._sugarEventSPromise = new s_promise_1.default({
            id: 'sugarEventSPromise'
        });
    // subscribe to the event
    global._sugarEventSPromise.on(name, callback);
    // return the unsubscribe function
    return () => {
        global._sugarEventSPromise.off(name, callback);
    };
}
exports.default = on;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZS9ldmVudC9vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx3RUFBaUQ7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUTtJQUN4Qix3Q0FBd0M7SUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUI7UUFDN0IsTUFBTSxDQUFDLG1CQUFtQixHQUFHLElBQUksbUJBQVUsQ0FBQztZQUMxQyxFQUFFLEVBQUUsb0JBQW9CO1NBQ3pCLENBQUMsQ0FBQztJQUNMLHlCQUF5QjtJQUN6QixNQUFNLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM5QyxrQ0FBa0M7SUFDbEMsT0FBTyxHQUFHLEVBQUU7UUFDVixNQUFNLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNqRCxDQUFDLENBQUM7QUFDSixDQUFDO0FBQ0Qsa0JBQWUsRUFBRSxDQUFDIn0=