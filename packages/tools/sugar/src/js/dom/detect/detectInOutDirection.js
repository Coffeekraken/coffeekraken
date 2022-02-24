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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0ZWN0SW5PdXREaXJlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXRlY3RJbk91dERpcmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9DRztBQUNILFNBQVMsb0JBQW9CLENBQUMsSUFBSTtJQUM5QixJQUFJLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDO0lBRXpDLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUMxQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzFCLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDdEIsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE1BQU0sRUFBRSxJQUFJO2dCQUNaLFNBQVM7YUFDWixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUM7UUFDRixpQkFBaUIsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEVBQUUsS0FBSztnQkFDYixTQUFTO2FBQ1osQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDO1FBQ0YsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDM0QsQ0FBQyxFQUNEO1FBQ0ksRUFBRSxFQUFFLHNCQUFzQjtLQUM3QixDQUNKLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7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