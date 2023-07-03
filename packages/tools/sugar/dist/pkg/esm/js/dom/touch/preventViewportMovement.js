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
export default function __preventViewportMovement($elm) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSx5QkFBeUIsQ0FBQyxJQUFpQjtJQUMvRCxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxTQUFTLE1BQU07UUFDWCxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRTtRQUNwQyxPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLEVBQUUsRUFBRTtRQUNuQyxPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRTtRQUNsQyxPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLEVBQUUsRUFBRTtRQUNyQyxPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDLENBQUM7SUFDSCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDIn0=