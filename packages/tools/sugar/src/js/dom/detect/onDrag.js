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
export default function onDrag($elm, cb, settings) {
    const finalSettings = Object.assign({ maxSpeed: 0.01 }, settings !== null && settings !== void 0 ? settings : {});
    let isMouseDown = false;
    let startPos, $target;
    let track = [];
    let lastCapturedTime;
    function buildTrackPoint(e) {
        const deltaX = e.pageX - startPos.left, deltaY = e.pageY - startPos.top, time = (Date.now() - lastCapturedTime);
        const secondPercentage = 100 / 1000 * time;
        const lastTrackPoint = track[track.length - 1];
        const lastDeltaX = e.pageX - lastTrackPoint.x, lastDeltaY = e.pageY - lastTrackPoint.y;
        let speedX = lastDeltaX / time || 0, speedY = lastDeltaY / time || 0;
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
        if (e.target !== $elm && !$elm.contains(e.target))
            return;
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
        cb === null || cb === void 0 ? void 0 : cb({
            type: 'start',
            x: startPos.x,
            y: startPos.y
        });
    });
    document.addEventListener('mousemove', (e) => {
        if (!isMouseDown)
            return;
        const point = buildTrackPoint(e);
        track.push(point);
        cb === null || cb === void 0 ? void 0 : cb(Object.assign(Object.assign({ type: 'track' }, point), { track }));
        lastCapturedTime = Date.now();
    });
    document.addEventListener('mouseup', (e) => {
        if (!isMouseDown)
            return;
        $target.style.pointerEvents = 'unset';
        // update status
        isMouseDown = false;
        cb === null || cb === void 0 ? void 0 : cb(Object.assign(Object.assign({ type: 'end' }, track[track.length - 1]), { track }));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25EcmFnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib25EcmFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBZUgsTUFBTSxDQUFDLE9BQU8sVUFBVSxNQUFNLENBQUMsSUFBaUIsRUFBRSxFQUFZLEVBQUUsUUFBbUM7SUFFL0YsTUFBTSxhQUFhLEdBQUcsZ0JBQ2xCLFFBQVEsRUFBRSxJQUFJLElBQ1gsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNwQixDQUFDO0lBRUYsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBRXhCLElBQUksUUFBUSxFQUFFLE9BQU8sQ0FBQztJQUV0QixJQUFJLEtBQUssR0FBdUIsRUFBRSxDQUFDO0lBRW5DLElBQUksZ0JBQWdCLENBQUM7SUFFckIsU0FBUyxlQUFlLENBQUMsQ0FBQztRQUN0QixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQ2xDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQy9CLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRTNDLE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7UUFFM0MsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFL0MsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsQ0FBQyxFQUN6QyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBRTVDLElBQUksTUFBTSxHQUFHLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxFQUMvQixNQUFNLEdBQUcsVUFBVSxHQUFH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