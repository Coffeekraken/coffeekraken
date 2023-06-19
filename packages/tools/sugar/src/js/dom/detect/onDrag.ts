import __positionFromEvent from '../position/positionFromEvent';

/**
 * @name      onDrag
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status          beta
 * @async
 *
 * Detect drag "gesture" with the mouse or touch
 *
 * @param       {HTMLElement}         elm         The HTMLElement on which to detect the swipe
 * @param       {Function}            cb          The function to call on swipe. The callback function has as parameter an object that containthe swipe direction like left, right, up and down
 * @param       {Number}              [threshold=100]       The swipe threshold
 *
 * @setting     {Number}      [maxSpeed=0.01]       The maximum speed
 *
 * @snippet         __onDrag($1, $2)
 * __onDrag($1, drag => {
 *     $2
 * });
 *
 * @todo      tests
 *
 * @example 	js
 * import { __onDrag } from '@coffeekraken/sugar/dom'
 * __onDrag($myElement, (drag) => {
 *    // do something...
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IOnDragTrackItem {
    x: number;
    y: number;
    deltaX: number;
    deltaY: number;
    speedX: number;
    speedY: number;
}

export interface IOnDragSettings {
    maxSpeed: number;
}

export default function __onDrag(
    $elm: HTMLElement,
    cb: Function,
    settings?: Partial<IOnDragSettings>,
): void {
    const finalSettings = <IOnDragSettings>{
        maxSpeed: 0.01,
        ...(settings ?? {}),
    };

    let isMouseDown = false;

    let startPos, $target;

    let track: IOnDragTrackItem[] = [];

    let lastCapturedTime;

    function buildTrackPoint(e) {
        const { x, y } = __positionFromEvent(e);
        const deltaX = x - startPos.x,
            deltaY = y - startPos.y,
            time = Date.now() - lastCapturedTime;

        const secondPercentage = (100 / 1000) * time;

        const lastTrackPoint = track[track.length - 1];

        const lastDeltaX = x - lastTrackPoint.x,
            lastDeltaY = y - lastTrackPoint.y;

        let speedX = lastDeltaX / time || 0,
            speedY = lastDeltaY / time || 0;

        if (Math.abs(speedX) > finalSettings.maxSpeed) {
            speedX = finalSettings.maxSpeed * (speedX < 0 ? -1 : 1);
        }
        if (Math.abs(speedY) > finalSettings.maxSpeed) {
            speedY = finalSettings.maxSpeed * (speedY < 0 ? -1 : 1);
        }

        const point = {
            x,
            y,
            deltaX,
            deltaY,
            speedX: (lastDeltaX / secondPercentage) * 100,
            speedY: (lastDeltaY / secondPercentage) * 100,
        };
        return point;
    }

    function down(e) {
        if (e.target !== $elm && !$elm.contains(e.target)) return;

        $target = e.target;

        const { x, y } = __positionFromEvent(e);

        // set the start position
        startPos = {
            x,
            y,
        };
        // set the first tracked point
        track = [
            {
                x: startPos.x,
                y: startPos.y,
                deltaX: 0,
                deltaY: 0,
                speedX: 0,
                speedY: 0,
            },
        ];
        lastCapturedTime = Date.now();
        // update status
        isMouseDown = true;
    }
    document.addEventListener('mousedown', down);
    document.addEventListener('touchstart', down);

    function move(e) {
        if (!isMouseDown) return;

        // if first point tracked, trigger the "start" event
        if (track.length === 1) {
            cb?.({
                type: 'start',
                track: track[0],
            });
        }

        $target.style.pointerEvents = 'none';

        const point = buildTrackPoint(e);
        track.push(point);
        cb?.({
            type: 'track',
            ...point,
            track,
        });
        lastCapturedTime = Date.now();
    }
    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move);

    function up(e) {
        if (!isMouseDown) return;
        $target.style.pointerEvents = 'unset';

        // update status
        isMouseDown = false;

        // callback if moved
        if (track.length > 1) {
            cb?.({
                type: 'end',
                ...track[track.length - 1],
                track,
            });
        }
    }
    document.addEventListener('mouseup', up);
    document.addEventListener('touchend', up);
}
