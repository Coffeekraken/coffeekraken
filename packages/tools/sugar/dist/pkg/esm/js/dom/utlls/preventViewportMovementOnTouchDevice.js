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
export default function coco() { }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsSUFBSSxLQUFJLENBQUM7QUFDakMsZ0VBQWdFO0FBQ2hFLHlCQUF5QjtBQUN6QixXQUFXO0FBQ1gsMEJBQTBCO0FBQzFCLGlDQUFpQztBQUNqQyxXQUFXO0FBQ1gsNkJBQTZCO0FBQzdCLHlEQUF5RDtBQUN6RCx3REFBd0Q7QUFDeEQsdURBQXVEO0FBQ3ZELDBEQUEwRDtBQUMxRCxXQUFXO0FBQ1gsa0RBQWtEO0FBQ2xELGlEQUFpRDtBQUNqRCxnREFBZ0Q7QUFDaEQsbURBQW1EO0FBQ25ELHdCQUF3QjtBQUN4QixJQUFJIn0=