// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name      detectInOutDirection
 * @namespace            js.dom
 * @type      Function
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function detectInOutDirection($elm) {
    let mouseEnterHandler, mouseLeaveHandler;
    const promise = new __SPromise(({ resolve, reject, emit }) => {
        mouseEnterHandler = (e) => {
            emit('in', direction);
            emit('then', {
                action: 'in',
                direction
            });
        };
        mouseLeaveHandler = (e) => {
            emit('out', direction);
            emit('then', {
                action: 'out',
                direction
            });
        };
        // detect when mouseenter/leave the element
        $elm.addEventListener('mouseenter', mouseEnterHandler);
        $elm.addEventListener('mouseleave', mouseLeaveHandler);
    }, {
        id: 'detectInOutDirection'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0ZWN0SW5PdXREaXJlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXRlY3RJbk91dERpcmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxTQUFTLG9CQUFvQixDQUFDLElBQUk7SUFDaEMsSUFBSSxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztJQUV6QyxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FDNUIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1QixpQkFBaUIsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWCxNQUFNLEVBQUUsSUFBSTtnQkFDWixTQUFTO2FBQ1YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBQ0YsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN4QixJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1gsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsU0FBUzthQUNWLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQztRQUNGLDJDQUEyQztRQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3pELENBQUMsRUFDRDtRQUNFLEVBQUUsRUFBRSxzQkFBc0I7S0FDM0IsQ0FDRixDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1FB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