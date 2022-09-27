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
try {
    (_a = document === null || document === void 0 ? void 0 : document.addEventListener) === null || _a === void 0 ? void 0 : _a.call(document, 'pointermove', (e) => {
        calculateDirection(e);
    });
    (_b = document === null || document === void 0 ? void 0 : document.addEventListener) === null || _b === void 0 ? void 0 : _b.call(document, 'pointerdown', (e) => {
        calculateDirection(e);
    });
}
catch (e) { }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7O0FBRWQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLHNCQUFzQixDQUFDLElBQWlCO0lBQzVELElBQUksbUJBQW1CLEVBQUUsbUJBQW1CLENBQUM7SUFFN0MsTUFBTSxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUN6RCxtQkFBbUIsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDO1FBQ0YsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN4QixJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQztRQUNGLDZDQUE2QztRQUM3QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQy9ELENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ2xCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDbEUsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBRUQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUNSLElBQUksR0FBRyxDQUFDLEVBQ1IsU0FBUyxHQUFHLElBQUksQ0FBQztBQUNyQixNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFDcEIsSUFBSTtJQUNBLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLGdCQUFnQix5REFBRyxhQUFhLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUM5QyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUNILE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLGdCQUFnQix5REFBRyxhQUFhLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUM5QyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztDQUNOO0FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtBQUNkLFNBQVMsa0JBQWtCLENBQUMsQ0FBQztJQUN6QixJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQ2QsVUFBVSxHQUFHLENBQUMsRUFDZCxLQUFLLEdBQUcsQ0FBQyxFQUNULEtBQUssR0FBRyxDQUFDLENBQUM7SUFDZCxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLFNBQVMsRUFBRTtRQUM1QixVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN2QixJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUNsQjtTQUFNLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsU0FBUyxFQUFFO1FBQ25DLFVBQVUsR0FBRyxPQUFPLENBQUM7UUFDckIsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0tBQ2xCO0lBQ0QsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxTQUFTLEVBQUU7UUFDNUIsVUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDdkIsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7S0FDbEI7U0FBTSxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLFNBQVMsRUFBRTtRQUNuQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUNsQjtJQUNELElBQUksVUFBVSxJQUFJLFVBQVUsRUFBRTtRQUMxQixTQUFTLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7S0FDdkQ7U0FBTSxJQUFJLFVBQVUsRUFBRTtRQUNuQixTQUFTLEdBQUcsVUFBVSxDQUFDO0tBQzFCO1NBQU0sSUFBSSxVQUFVLEVBQUU7UUFDbkIsU0FBUyxHQUFHLFVBQVUsQ0FBQztLQUMxQjtTQUFNO1FBQ0gsU0FBUyxHQUFHLElBQUksQ0FBQztLQUNwQjtBQUNMLENBQUMifQ==