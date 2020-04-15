"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dispatchEvent;

var _SEvent = _interopRequireDefault(require("../event/SEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      dispatchEvent
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Helper to quickly display an event with some optional data attached to it
 *
 * @param 		{HTMLElement} 					$target  		The element to dispatch the event from
 * @param 		{String} 						name 			The event name to dispatch
 * @param 		{Mixed} 						data 			The data to attache to the event
 *
 * @example  	js
 * import dispatchEvent from '@coffeekraken/sugar/js/dom/dispatchEvent'
 * dispatchEvent(myCoolHTMLElement, 'myCoolEventName', {
 * 		var1 : 'value1'
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function dispatchEvent($target, name, data = null) {
  // create new event
  const e = new _SEvent.default(name, {
    detail: data,
    bubbles: true,
    cancelable: true
  });
  $target.dispatchEvent(e);
}

module.exports = exports.default;