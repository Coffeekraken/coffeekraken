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
export default function preventViewportMovementOnTouchDevice($elm) {
    function cb(e) {
        e.preventDefault();
    }
    // function cancel() {
    //     $elm.removeEventListener('touchstart', cb);
    //     $elm.removeEventListener('touchmove', cb);
    //     $elm.removeEventListener('touchend', cb);
    //     $elm.removeEventListener('touchcancel', cb);
    // }
    // $elm.addEventListener('touchstart', cb);
    // $elm.addEventListener('touchmove', cb);
    // $elm.addEventListener('touchend', cb);
    // $elm.addEventListener('touchcancel', cb);
    // return cancel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsb0NBQW9DLENBQ3hELElBQWlCO0lBRWpCLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNELHNCQUFzQjtJQUN0QixrREFBa0Q7SUFDbEQsaURBQWlEO0lBQ2pELGdEQUFnRDtJQUNoRCxtREFBbUQ7SUFDbkQsSUFBSTtJQUNKLDJDQUEyQztJQUMzQywwQ0FBMEM7SUFDMUMseUNBQXlDO0lBQ3pDLDRDQUE0QztJQUU1QyxpQkFBaUI7QUFDckIsQ0FBQyJ9