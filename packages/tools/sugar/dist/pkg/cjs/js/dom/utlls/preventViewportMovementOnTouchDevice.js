"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      preventViewportMovementOnTouchDevice
 * @namespace            js.dom.utils
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Capture the "touchstart", "touchmove", "touchend" and "touchcancel" of the passed element and
 * apply a "preventDefault()" on all events
 *
 * @param    {HTMLElement}    $elm    The HTMLElement to prevent the viewport movement from
 * @return    {Function}            A function that you can call to stop preventing default behavior
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import preventViewportMovementOnTouchDevice from '@coffeekraken/sugar/js/dom/preventViewportMovementOnTouchDevice'
 * preventViewportMovementOnTouchDevice($elm)
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function coco() { }
exports.default = coco;
// export default function preventViewportMovementOnTouchDevice(
//     $elm: HTMLElement,
// ): any {
//     // function cb(e) {
//     //     e.preventDefault();
//     // }
//     // function cancel() {
//     //     $elm.removeEventListener('touchstart', cb);
//     //     $elm.removeEventListener('touchmove', cb);
//     //     $elm.removeEventListener('touchend', cb);
//     //     $elm.removeEventListener('touchcancel', cb);
//     // }
//     // $elm.addEventListener('touchstart', cb);
//     // $elm.addEventListener('touchmove', cb);
//     // $elm.addEventListener('touchend', cb);
//     // $elm.addEventListener('touchcancel', cb);
//     // return cancel;
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBd0IsSUFBSSxLQUFJLENBQUM7QUFBakMsdUJBQWlDO0FBQ2pDLGdFQUFnRTtBQUNoRSx5QkFBeUI7QUFDekIsV0FBVztBQUNYLDBCQUEwQjtBQUMxQixpQ0FBaUM7QUFDakMsV0FBVztBQUNYLDZCQUE2QjtBQUM3Qix5REFBeUQ7QUFDekQsd0RBQXdEO0FBQ3hELHVEQUF1RDtBQUN2RCwwREFBMEQ7QUFDMUQsV0FBVztBQUNYLGtEQUFrRDtBQUNsRCxpREFBaUQ7QUFDakQsZ0RBQWdEO0FBQ2hELG1EQUFtRDtBQUNuRCx3QkFBd0I7QUFDeEIsSUFBSSJ9