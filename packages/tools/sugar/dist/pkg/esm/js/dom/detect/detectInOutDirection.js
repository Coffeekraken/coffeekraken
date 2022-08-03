// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name      detectInOutDirection
 * @namespace            js.dom.detection
 * @type      Function
 * @async
 * @platform          js
 * @status              wip
 *
 * Detect the mouse direction when entered on the passed element. The direction can be up, down, left or right and will be passed to the two callbacks available.
 * The first one is the `onIn` callback, and the second one is the `onOut`.
 *
 * @param    {HTMLElement}    $elm    The element to listen for mouseover and mouseout on
 * @param    {Function}    onIn    The onIn callback. The direction and the $elm will be passed to it
 * @param    {Function}    onOut    The onOut callback. The direction and the $elm will be passed to it
 * @return    {HTMLElement}    The $elm to maintain chainability
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import detectInOutDirection from '@coffeekraken/sugar/js/dom/detectInOutDirection'
 * const detect = detectInOutDirection(myElm).in(direction => {
 *    // do something...
 * }).out(direction => {
 *    // do something...
 * }).then(value => {
 *    // do something
 *    console.log(value); // => { action: 'in', direction: 'up' };
 * });
 *
 * // cancel the detection process
 * detect.cancel();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function detectInOutDirection($elm) {
    let mouseEnterHandler, mouseLeaveHandler;
    const promise = new __SPromise(({ resolve, reject, emit }) => {
        mouseEnterHandler = (e) => {
            emit('in', direction);
            emit('then', {
                action: 'in',
                direction,
            });
        };
        mouseLeaveHandler = (e) => {
            emit('out', direction);
            emit('then', {
                action: 'out',
                direction,
            });
        };
        // detect when mouseenter/leave the element
        $elm.addEventListener('mouseenter', mouseEnterHandler);
        $elm.addEventListener('mouseleave', mouseLeaveHandler);
    }, {
        id: 'detectInOutDirection',
    }).on('finally', () => {
        $elm.removeEventListener('mouseenter', mouseEnterHandler);
        $elm.removeEventListener('mouseleave', mouseLeaveHandler);
    });
    return promise;
}
let oldX = 0, oldY = 0, direction = null;
const threshold = 0;
document.addEventListener('mousemove', (e) => {
    calculateDirection(e);
});
document.addEventListener('touchstart', (e) => {
    calculateDirection(e);
});
function calculateDirection(e) {
    let directionX = 0, directionY = 0, diffX = 0, diffY = 0;
    if (e.pageX < oldX - threshold) {
        directionX = 'left';
        diffX = oldX - e.pageX;
        oldX = e.pageX;
    }
    else if (e.pageX > oldX + threshold) {
        directionX = 'right';
        diffX = e.pageX - oldX;
        oldX = e.pageX;
    }
    if (e.pageY < oldY - threshold) {
        directionY = 'up';
        diffY = oldY - e.pageY;
        oldY = e.pageY;
    }
    else if (e.pageY > oldY + threshold) {
        directionY = 'down';
        diffY = e.pageY - oldY;
        oldY = e.pageY;
    }
    if (directionX && directionY) {
        direction = diffX > diffY ? directionX : directionY;
    }
    else if (directionX) {
        direction = directionX;
    }
    else if (directionY) {
        direction = directionY;
    }
    else {
        direction = null;
    }
}
export default detectInOutDirection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0NHO0FBQ0gsU0FBUyxvQkFBb0IsQ0FBQyxJQUFJO0lBQzlCLElBQUksaUJBQWlCLEVBQUUsaUJBQWlCLENBQUM7SUFFekMsTUFBTSxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQzFCLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDMUIsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN0QixJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLElBQUk7Z0JBQ1osU0FBUzthQUNaLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQztRQUNGLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDdEIsSUFBSSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE1BQU0sRUFBRSxLQUFLO2dCQUNiLFNBQVM7YUFDWixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUM7UUFDRiwyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUMzRCxDQUFDLEVBQ0Q7UUFDSSxFQUFFLEVBQUUsc0JBQXNCO0tBQzdCLENBQ0osQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUNqQixJQUFJLENBQUMsbUJBQW1CLENBQUMs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