// @ts-nocheck
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
 * @import requestAnimationFrame from '@coffeekraken/sugar/js/dom/requestAnimationFrame';
 * requestAnimationFrame(function() {
 *    // do something...
 * });
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdEFuaW1hdGlvbkZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVxdWVzdEFuaW1hdGlvbkZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsZUFBZSxNQUFNLENBQUMscUJBQXFCO0lBQ3pDLE1BQU0sQ0FBQywyQkFBMkI7SUFDbEMsTUFBTSxDQUFDLHdCQUF3QjtJQUMvQixNQUFNLENBQUMsc0JBQXNCO0lBQzdCLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyJ9