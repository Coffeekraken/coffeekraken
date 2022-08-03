"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
        window._sugarEventSPromise = new s_promise_1.default({
            id: 'sugarEventSPromise',
        });
    // emit to the event
    window._sugarEventSPromise.emit(name, value);
}
exports.default = emit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLElBQUksQ0FBQyxJQUFZLEVBQUUsS0FBVTtJQUNsQyx3Q0FBd0M7SUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUI7UUFDM0IsTUFBTSxDQUFDLG1CQUFtQixHQUFHLElBQUksbUJBQVUsQ0FBQztZQUN4QyxFQUFFLEVBQUUsb0JBQW9CO1NBQzNCLENBQUMsQ0FBQztJQUNQLG9CQUFvQjtJQUNwQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBQ0Qsa0JBQWUsSUFBSSxDQUFDIn0=