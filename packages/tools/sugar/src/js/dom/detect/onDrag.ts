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

export interface IOnDragSettings {
    maxSpeed: number;
}

export default function onDrag($elm: HTMLElement, cb: Function, settings?: Partial<IOnDragSettings>): void {

    const finalSettings = <IOnDragSettings>{
        maxSpeed: 0.01,
        ...settings ?? {}
    };

    let isMouseDown = false;
    
    let startPos, $target;

    let track: IOnDragTrackItem[] = [];

    let lastCapturedTime;

    function buildTrackPoint(e) {
        const deltaX = e.pageX - startPos.left,
            deltaY = e.pageY - startPos.top,
            time = (Date.now() - lastCapturedTime);

        const secondPercentage = 100 / 1000 * time;

        const lastTrackPoint = track[track.length - 1];

        const lastDeltaX = e.pageX - lastTrackPoint.x,
            lastDeltaY = e.pageY - lastTrackPoint.y;

        let speedX = lastDeltaX / time || 0,
            speedY = lastDeltaY / time || 0;
        
        if (Math.abs(speedX) > finalSettings.maxSpeed) {
            speedX = finalSettings.maxSpeed * (speedX < 0 ? -1 : 1);
        }
        if (Math.abs(speedY) > finalSettings.maxSpeed) {
            speedY = finalSettings.maxSpeed * (speedY < 0 ? -1 : 1);
        }
            
        return {
            x: e.pageX,
            y: e.pageY,
            deltaX,
            deltaY,
            pixelsXBySecond: lastDeltaX / secondPercentage * 100,
            pixelsYBySecond: lastDeltaY / secondPercentage * 100,
            speedX,
            speedY
        };
    }

    document.addEventListener('mousedown', (e) => {

        if (e.target !== $elm && !$elm.contains(e.target)) return;
        $target = e.target;

        $target.style.pointerEvents = 'none';

        track = [];
        lastCapturedTime = Date.now();
        // update status
        isMouseDown = true;
        // set the start position
        startPos = {
            top: e.pageY,
            left: e.pageX,
        };
        track.push(startPos);
        cb?.({
            type: 'start',
            x: startPos.x,
            y: startPos.y
        });
    });
    document.addEventListener('mousemove', (e) => {
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
    document.addEventListener('mouseup', (e) => {
        if (!isMouseDown) return;
        $target.style.pointerEvents = 'unset';

        // update status
        isMouseDown = false;
        cb?.({
            type: 'end',
            ...track[track.length - 1],
            track
        });
    });
}