"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SPromise_1 = __importDefault(require("../promise/SPromise"));
/**
 * @name        emit
 * @namespace           sugar.node.event
 * @type          Function
 * @beta
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
module.exports = emit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVtaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFFZCxtRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSztJQUN2Qix3Q0FBd0M7SUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUI7UUFDN0IsTUFBTSxDQUFDLG1CQUFtQixHQUFHLElBQUksa0JBQVUsQ0FBQztZQUMxQyxFQUFFLEVBQUUsb0JBQW9CO1NBQ3pCLENBQUMsQ0FBQztJQUNMLG9CQUFvQjtJQUNwQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMvQyxDQUFDO0FBQ0QsaUJBQVMsSUFBSSxDQUFDIn0=