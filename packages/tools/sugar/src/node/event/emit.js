"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SPromise_1 = __importDefault(require("../promise/SPromise"));
/**
 * @name        emit
 * @namespace           sugar.node.event
 * @type          Function
 * @status              beta
 *
 * This function can ben used to emit an event globally.
 * You can subscribe to these events using the "sugar.node.event.subscribe" function
 *
 * @param         {String}        name          The event name you want to emit to
 * @param         {Mixed}        value          The value you want to send alongside the event
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import emit from '@coffeekraken/sugar/node/event/emit';
 * emit('something', 'Hello world');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function emit(name, value) {
    // check that the global SPromise exists
    if (!global._sugarEventSPromise)
        global._sugarEventSPromise = new SPromise_1.default({
            id: 'sugarEventSPromise'
        });
    // emit to the event
    global._sugarEventSPromise.emit(name, value);
}
exports.default = emit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVtaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsbUVBQTZDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUs7SUFDdkIsd0NBQXdDO0lBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CO1FBQzdCLE1BQU0sQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLGtCQUFVLENBQUM7WUFDMUMsRUFBRSxFQUFFLG9CQUFvQjtTQUN6QixDQUFDLENBQUM7SUFDTCxvQkFBb0I7SUFDcEIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDL0MsQ0FBQztBQUNELGtCQUFlLElBQUksQ0FBQyJ9