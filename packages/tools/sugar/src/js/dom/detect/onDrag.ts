/**
 * @name      onDrag
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @status          beta
 *
 * Detect drag "gesture" with the mouse or touch
 *
 * @setting     {Number}      [threshold=100]       The minimum distance the user has to swipe before detection
 *
 * @param       {HTMLElement}         elm         The HTMLElement on which to detect the swipe
 * @param       {Function}            cb          The function to call on swipe. The callback function has as parameter an object that containthe swipe direction like left, right, up and down
 * @param       {Number}              [threshold=100]       The swipe threshold
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import onSwipe from '@coffeekraken/sugar/js/dom/onSwipe'
 *
 * @since         1.0.0
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

export default function onDrag($elm: HTMLElement, cb: Function): void {

    let isMouseDown = false;
    
    let startPos, endPos;

    let track: IOnDragTrackItem[] = [];


    let lastCapturedTime;

    function buildTrackPoint(e) {
        const deltaX = e.offsetX - startPos.x,
            deltaY = e.offsetY - startPos.y,
            time = (Date.now() - lastCapturedTime);

            const secondPercentage = 100 / 1000 * time;

        const lastTrackPoint = track[track.length - 1];

        const lastDeltaX = e.offsetX - lastTrackPoint.x,
            lastDeltaY = e.offsetY - lastTrackPoint.y;

        const speedX = lastDeltaX / time,
            speedY = lastDeltaY / time;

        return {
            x: e.offsetX,
            y: e.offsetY,
            deltaX,
            deltaY,
            pixelsXBySecond: lastDeltaX / secondPercentage * 100,
            pixelsYBySecond: lastDeltaY / secondPercentage * 100,
            speedX,
            speedY
        };
    }

    $elm.addEventListener('mousedown', (e) => {
        track = [];
        lastCapturedTime = Date.now();
        // update status
        isMouseDown = true;
        // set the start position
        startPos = {
            x: e.offsetX,
            y: e.offsetY
        };
        track.push(startPos);
        cb?.({
            type: 'start',
            x: startPos.x,
            y: startPos.y
        });
    });
    $elm.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        const point = buildTrackPoint(e);
        track.push(point);
        cb?.({
            type: 'track',
            ...point,
            track
        });
        lastCapturedTime = Date.now();
    });
    $elm.addEventListener('mouseup', (e) => {
        // update status
        isMouseDown = false;
        cb?.({
            type: 'end',
            ...track[track.length - 1],
            track
        });
    });
}