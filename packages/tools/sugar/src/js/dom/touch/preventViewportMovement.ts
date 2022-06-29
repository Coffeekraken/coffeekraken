/**
 * @name      preventViewportMovement
 * @namespace            js.dom.touch
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
 * import preventViewportMovement from '@coffeekraken/sugar/js/touch/preventViewportMovement'
 * preventViewportMovement($elm)
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function preventViewportMovement($elm: HTMLElement): any {
    function cb(e) {
        e.preventDefault();
    }
    function cancel() {
        $elm.removeEventListener('touchstart', cb);
        $elm.removeEventListener('touchmove', cb);
        $elm.removeEventListener('touchend', cb);
        $elm.removeEventListener('touchcancel', cb);
    }
    $elm.addEventListener('touchstart', cb);
    $elm.addEventListener('touchmove', cb);
    $elm.addEventListener('touchend', cb);
    $elm.addEventListener('touchcancel', cb);
    return cancel;
}
