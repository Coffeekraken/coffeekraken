"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SPromise_1 = __importDefault(require("../promise/SPromise"));
/**
 * @name        dispatch
 * @namespace           sugar.node.event
 * @type          Function
 *
 * This function can ben used to dispatch an event globally.
 * You can subscribe to these events using the "sugar.node.event.subscribe" function
 *
 * @param         {String}        name          The event name you want to dispatch to
 * @param         {Mixed}        value          The value you want to send alongside the event
 *
 * @example       js
 * import dispatch from '@coffeekraken/sugar/node/event/dispatch';
 * dispatch('something', 'Hello world');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function dispatch(name, value) {
    // check that the global SPromise exists
    if (!global._sugarEventSPromise)
        global._sugarEventSPromise = new SPromise_1.default({
            id: 'sugarEventSPromise'
        });
    // dispatch to the event
    global._sugarEventSPromise.trigger(name, value);
}
exports.default = dispatch;
