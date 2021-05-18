// @ts-nocheck
/**
 * @name      requestAnimationFrame
 * @namespace            js.dom.utils
 * @type      Function
 * @stable
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdEFuaW1hdGlvbkZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVxdWVzdEFuaW1hdGlvbkZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxlQUFlLE1BQU0sQ0FBQyxxQkFBcUI7SUFDekMsTUFBTSxDQUFDLDJCQUEyQjtJQUNsQyxNQUFNLENBQUMsd0JBQXdCO0lBQy9CLE1BQU0sQ0FBQyxzQkFBc0I7SUFDN0IsTUFBTSxDQUFDLHVCQUF1QixDQUFDIn0=