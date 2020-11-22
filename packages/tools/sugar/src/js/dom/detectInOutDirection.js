import __SPromise from '../promise/SPromise';
/**
 * @name      detectInOutDirection
 * @namespace           sugar.js.dom
 * @type      Function
 *
 * Detect the mouse direction when entered on the passed element. The direction can be up, down, left or right and will be passed to the two callbacks available.
 * The first one is the `onIn` callback, and the second one is the `onOut`.
 *
 * @param    {HTMLElement}    $elm    The element to listen for mouseover and mouseout on
 * @param    {Function}    onIn    The onIn callback. The direction and the $elm will be passed to it
 * @param    {Function}    onOut    The onOut callback. The direction and the $elm will be passed to it
 * @return    {HTMLElement}    The $elm to maintain chainability
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function detectInOutDirection($elm) {
    let mouseEnterHandler, mouseLeaveHandler;
    const promise = new __SPromise((resolve, reject, trigger, cancel) => {
        mouseEnterHandler = (e) => {
            trigger('in', direction);
            trigger('then', {
                action: 'in',
                direction
            });
        };
        mouseLeaveHandler = (e) => {
            trigger('out', direction);
            trigger('then', {
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
let oldX = 0, oldY = 0, threshold = 0, direction = null;
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
