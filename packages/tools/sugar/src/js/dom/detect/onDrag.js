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
export default function onDrag($elm, cb) {
    let isMouseDown = false;
    let startPos, endPos;
    let track = [];
    let lastCapturedTime;
    function buildTrackPoint(e) {
        const deltaX = e.offsetX - startPos.x, deltaY = e.offsetY - startPos.y, time = (Date.now() - lastCapturedTime);
        const secondPercentage = 100 / 1000 * time;
        const lastTrackPoint = track[track.length - 1];
        const lastDeltaX = e.offsetX - lastTrackPoint.x, lastDeltaY = e.offsetY - lastTrackPoint.y;
        const speedX = lastDeltaX / time, speedY = lastDeltaY / time;
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
        cb === null || cb === void 0 ? void 0 : cb({
            type: 'start',
            x: startPos.x,
            y: startPos.y
        });
    });
    $elm.addEventListener('mousemove', (e) => {
        if (!isMouseDown)
            return;
        const point = buildTrackPoint(e);
        track.push(point);
        cb === null || cb === void 0 ? void 0 : cb(Object.assign(Object.assign({ type: 'track' }, point), { track }));
        lastCapturedTime = Date.now();
    });
    $elm.addEventListener('mouseup', (e) => {
        // update status
        isMouseDown = false;
        cb === null || cb === void 0 ? void 0 : cb(Object.assign(Object.assign({ type: 'end' }, track[track.length - 1]), { track }));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25EcmFnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib25EcmFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBV0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxNQUFNLENBQUMsSUFBaUIsRUFBRSxFQUFZO0lBRTFELElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztJQUV4QixJQUFJLFFBQVEsRUFBRSxNQUFNLENBQUM7SUFFckIsSUFBSSxLQUFLLEdBQXVCLEVBQUUsQ0FBQztJQUduQyxJQUFJLGdCQUFnQixDQUFDO0lBRXJCLFNBQVMsZUFBZSxDQUFDLENBQUM7UUFDdEIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUNqQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUMvQixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUV2QyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRS9DLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRS9DLE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLENBQUMsRUFDM0MsVUFBVSxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUU5QyxNQUFNLE1BQU0sR0FBRyxVQUFVLEdBQUcsSUFBSSxFQUM1QixNQUFNLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQztRQUUvQixPQUFPO1lBQ0gsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPO1lBQ1osQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPO1lBQ1osTUFBTTtZQUNOLE1BQU07WUFDTixlQUFlLEVBQUUsVUFBVSxHQUFHLGdCQUFnQixHQUFHLEdBQUc7WUFDcEQsZUFBZSxFQUFFLFVBQVUsR0FBRyxnQkFBZ0IsR0FBRyxHQUFHO1lBQ3BELE1BQU07WUFDTixNQUFNO1NBQ1QsQ0FBQztJQUNOLENBQUM7SUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDckMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLGdCQUFnQixHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM5QixnQkFBZ0I7UUFDaEIsV0FBVyxHQUFHLElBQUksQ0FBQztRQUNuQix5QkFBeUI7UUFDekIsUUFBUSxHQUFHO1lBQ1AsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPO1lBQ1osQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPO1NBQ2YsQ0FBQztRQUNGLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckIsRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxDQUFHO1lBQ0QsSUFBSSxFQUFFLE9BQU87WUFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDaEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDckMsSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPO1FBQ3pCLE1BQU0sS0FBSyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xCLEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsK0JBQ0UsSUFBSSxFQUFFLE9BQU8sSUFDVixLQUFLLEtBQ1IsS0FBSyxJQUNQLENBQUM7UUFDSCxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDbkMsZ0JBQWdCO1FBQ2hCLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSwrQkFDRSxJQUFJLEVBQUUsS0FBSyxJQUNSLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUMxQixLQUFLLElBQ1AsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9