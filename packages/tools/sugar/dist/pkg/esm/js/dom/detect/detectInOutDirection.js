// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name      detectInOutDirection
 * @namespace            js.dom.detection
 * @type      Function
 * @platform          js
 * @status              beta
 * @async
 *
 * Detect the mouse direction when entered on the passed element. The direction can be up, down, left or right and will be passed to the two callbacks available.
 *
 * @param    {HTMLElement}    $elm    The element to listen for mouseover and mouseout on
 * @return    {HTMLElement}    The $elm to maintain chainability
 *
 * @event       in          Emitted when the pointer enters the element
 * @event       out         Emitted when the pointer leaves the element
 *
 * @todo      tests
 *
 * @example     js
 * import __detectInOutDirection from '@coffeekraken/sugar/js/dom/detectInOutDirection';
 * const detector = __detectInOutDirection($myElm).on('in', (direction) => {
 *    // direction can be "up", "down", "left" or "right"
 * }).on('out', (direction) => {
 *    // direction can be "up", "down", "left" or "right"
 * });
 *
 * // cancel the detection process
 * detector.cancel();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function detectInOutDirection($elm) {
    let pointerEnterHandler, pointerLeaveHandler;
    const promise = new __SPromise(({ resolve, reject, emit }) => {
        pointerEnterHandler = (e) => {
            emit('in', direction);
        };
        pointerLeaveHandler = (e) => {
            emit('out', direction);
        };
        // detect when pointerenter/leave the element
        $elm.addEventListener('pointerenter', pointerEnterHandler);
        $elm.addEventListener('pointerleave', pointerLeaveHandler);
    }).on('finally', () => {
        $elm.removeEventListener('pointerenter', pointerEnterHandler);
        $elm.removeEventListener('pointerleave', pointerLeaveHandler);
    });
    return promise;
}
let oldX = 0, oldY = 0, direction = null;
const threshold = 0;
document.addEventListener('pointermove', (e) => {
    calculateDirection(e);
});
document.addEventListener('pointerdown', (e) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRztBQUNILFNBQVMsb0JBQW9CLENBQUMsSUFBaUI7SUFDM0MsSUFBSSxtQkFBbUIsRUFBRSxtQkFBbUIsQ0FBQztJQUU3QyxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3pELG1CQUFtQixHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDeEIsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUM7UUFDRixtQkFBbUIsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDO1FBQ0YsNkNBQTZDO1FBQzdDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDL0QsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDbEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFFRCxJQUFJLElBQUksR0FBRyxDQUFDLEVBQ1IsSUFBSSxHQUFHLENBQUMsRUFDUixTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQztBQUNwQixRQUFRLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDM0Msa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFDSCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDM0Msa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFDSCxTQUFTLGtCQUFrQixDQUFDLENBQUM7SUFDekIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUNkLFVBQVUsR0FBRyxDQUFDLEVBQ2QsS0FBSyxHQUFHLENBQUMsRUFDVCxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxTQUFTLEVBQUU7UUFDNUIsVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUNwQixLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDdkIsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7S0FDbEI7U0FBTSxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLFNBQVMsRUFBRTtRQUNuQyxVQUFVLEdBQUcsT0FBTyxDQUFDO1FBQ3JCLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUNsQjtJQUNELElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsU0FBUyxFQUFFO1FBQzVCLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0tBQ2xCO1NBQU0sSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxTQUFTLEVBQUU7UUFDbkMsVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUNwQixLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7S0FDbEI7SUFDRCxJQUFJLFVBQVUsSUFBSSxVQUFVLEVBQUU7UUFDMUIsU0FBUyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO0tBQ3ZEO1NBQU0sSUFBSSxVQUFVLEVBQUU7UUFDbkIsU0FBUyxHQUFHLFVBQVUsQ0FBQztLQUMxQjtTQUFNLElBQUksVUFBVSxFQUFFO1FBQ25CLFNBQVMsR0FBRyxVQUFVLENBQUM7S0FDMUI7U0FBTTtRQUNILFNBQVMsR0FBRyxJQUFJLENBQUM7S0FDcEI7QUFDTCxDQUFDO0FBQ0QsZUFBZSxvQkFBb0IsQ0FBQyJ9