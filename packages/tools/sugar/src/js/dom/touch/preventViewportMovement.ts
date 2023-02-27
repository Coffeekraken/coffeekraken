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
 * @snippet         __preventViewportMovement($1)
 *
 * @example    js
 * import { __preventViewportMovement } from '@coffeekraken/sugar/dom'
 * __preventViewportMovement($elm)
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __preventViewportMovement($elm: HTMLElement): any {
    function cb(e) {
        e.preventDefault();
    }
    function cancel() {
        $elm.removeEventListener('touchstart', cb);
        $elm.removeEventListener('touchmove', cb);
        $elm.removeEventListener('touchend', cb);
        $elm.removeEventListener('touchcancel', cb);
    }
    $elm.addEventListener('touchstart', cb, {
        passive: true,
    });
    $elm.addEventListener('touchmove', cb, {
        passive: true,
    });
    $elm.addEventListener('touchend', cb, {
        passive: true,
    });
    $elm.addEventListener('touchcancel', cb, {
        passive: true,
    });
    return cancel;
}
