"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trigger;

var _SPromise = _interopRequireDefault(require("../promise/SPromise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        trigger
 * @namespace           js.event
 * @type          Function
 *
 * This function can ben used to trigger an event globally.
 * You can subscribe to these events using the "sugar.js.event.subscribe" function
 *
 * @param         {String}        name          The event name you want to trigger to
 * @param         {Mixed}        value          The value you want to send alongside the event
 *
 * @example       js
 * const trigger = require('@coffeekraken/sugar/js/event/trigger');
 * trigger('something', 'Hello world');
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function trigger(name, value) {
  // check that the global SPromise exists
  if (!window._sugarEventSPromise) window._sugarEventSPromise = new _SPromise.default({
    id: 'sugarEventSPromise'
  }); // trigger to the event

  window._sugarEventSPromise.trigger(name, value);
}

module.exports = exports.default;