"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      requestAnimationFrame
 * @namespace            js.dom.utils
 * @type      Function
 * @platform       js
 * @status      beta
 *
 * Proxy for the window.requestAnimationFrame function
 *
 * @param       {Function}      cb          The function to call when it's time to update your animation for the next repaint
 * @return      {Integer}                   A long integer value, the request id, that uniquely identifies the entry in the callback list
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * @import { __requestAnimationFrame } from '@coffeekraken/sugar/dom';
 * __requestAnimationFrame(function() {
 *    // do something...
 * });
 *
 @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
let requestAnimationFrame;
try {
    requestAnimationFrame =
        window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame;
}
catch (e) { }
exports.default = requestAnimationFrame;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxJQUFJLHFCQUFxQixDQUFDO0FBQzFCLElBQUk7SUFDQSxxQkFBcUI7UUFDakIsTUFBTSxDQUFDLHFCQUFxQjtZQUM1QixNQUFNLENBQUMsMkJBQTJCO1lBQ2xDLE1BQU0sQ0FBQyx3QkFBd0I7WUFDL0IsTUFBTSxDQUFDLHNCQUFzQjtZQUM3QixNQUFNLENBQUMsdUJBQXVCLENBQUM7Q0FDdEM7QUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0FBRWQsa0JBQWUscUJBQXFCLENBQUMifQ==