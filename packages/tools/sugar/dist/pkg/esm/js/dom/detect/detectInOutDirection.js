// @ts-nocheck
var _a, _b;
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
 * import { __detectInOutDirection } from '@coffeekraken/sugar/dom';
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
export default function __detectInOutDirection($elm) {
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
(_a = document === null || document === void 0 ? void 0 : document.addEventListener) === null || _a === void 0 ? void 0 : _a.call(document, 'pointermove', (e) => {
    calculateDirection(e);
});
(_b = document === null || document === void 0 ? void 0 : document.addEventListener) === null || _b === void 0 ? void 0 : _b.call(document, 'pointerdown', (e) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7O0FBRWQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLHNCQUFzQixDQUFDLElBQWlCO0lBQzVELElBQUksbUJBQW1CLEVBQUUsbUJBQW1CLENBQUM7SUFFN0MsTUFBTSxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUN6RCxtQkFBbUIsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDO1FBQ0YsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN4QixJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQztRQUNGLDZDQUE2QztRQUM3QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQy9ELENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ2xCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDbEUsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBRUQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUNSLElBQUksR0FBRyxDQUFDLEVBQ1IsU0FBUyxHQUFHLElBQUksQ0FBQztBQUNyQixNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFFcEIsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsZ0JBQWdCLHlEQUFHLGFBQWEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQzlDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFCLENBQUMsQ0FBQyxDQUFDO0FBQ0gsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsZ0JBQWdCLHlEQUFHLGFBQWEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQzlDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFCLENBQUMsQ0FBQyxDQUFDO0FBQ0gsU0FBUyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3pCLElBQUksVUFBVSxHQUFHLENBQUMsRUFDZCxVQUFVLEdBQUcsQ0FBQyxFQUNkLEtBQUssR0FBRyxDQUFDLEVBQ1QsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNkLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsU0FBUyxFQUFFO1FBQzVCLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEIsS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0tBQ2xCO1NBQU0sSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxTQUFTLEVBQUU7UUFDbkMsVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUNyQixLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7S0FDbEI7SUFDRCxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLFNBQVMsRUFBRTtRQUM1QixVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN2QixJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUNsQjtTQUFNLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsU0FBUyxFQUFFO1FBQ25DLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEIsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0tBQ2xCO0lBQ0QsSUFBSSxVQUFVLElBQUksVUFBVSxFQUFFO1FBQzFCLFNBQVMsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztLQUN2RDtTQUFNLElBQUksVUFBVSxFQUFFO1FBQ25CLFNBQVMsR0FBRyxVQUFVLENBQUM7S0FDMUI7U0FBTSxJQUFJLFVBQVUsRUFBRTtRQUNuQixTQUFTLEdBQUcsVUFBVSxDQUFDO0tBQzFCO1NBQU07UUFDSCxTQUFTLEdBQUcsSUFBSSxDQUFDO0tBQ3BCO0FBQ0wsQ0FBQyJ9