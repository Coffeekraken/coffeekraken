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
    let startPos, endPos, $target;
    let track = [];
    let lastCapturedTime;
    function buildTrackPoint(e) {
        const deltaX = e.pageX - startPos.left, deltaY = e.pageY - startPos.top, time = (Date.now() - lastCapturedTime);
        const secondPercentage = 100 / 1000 * time;
        const lastTrackPoint = track[track.length - 1];
        const lastDeltaX = e.pageX - lastTrackPoint.x, lastDeltaY = e.pageY - lastTrackPoint.y;
        const speedX = lastDeltaX / time, speedY = lastDeltaY / time;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25EcmFnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib25EcmFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBV0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxNQUFNLENBQUMsSUFBaUIsRUFBRSxFQUFZO0lBRTFELElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztJQUV4QixJQUFJLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDO0lBRTlCLElBQUksS0FBSyxHQUF1QixFQUFFLENBQUM7SUFHbkMsSUFBSSxnQkFBZ0IsQ0FBQztJQUVyQixTQUFTLGVBQWUsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksRUFDbEMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFDL0IsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLGdCQUFnQixDQUFDLENBQUM7UUFFdkMsTUFBTSxnQkFBZ0IsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztRQUUvQyxNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUvQyxNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxDQUFDLEVBQ3pDLFVBQVUsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFFNUMsTUFBTSxNQUFNLEdBQUcsVUFBVSxHQUFHLElBQUksRUFDNUIsTUFBTSxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFFL0IsT0FBTztZQUNILENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSztZQUNWLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSztZQUNWLE1BQU07WUFDTixNQUFNO1lBQ04sZUFBZSxFQUFFLFVBQVUsR0FBRyxnQkFBZ0IsR0FBRyxHQUFHO1lBQ3BELGVBQWUsRUFBRSxVQUFVLEdBQUcsZ0JBQWdCLEdBQUcsR0FBRztZQUNwRCxNQUFNO1lBQ04sTUFBTTtTQUNULENBQUM7SUFDTixDQUFDO0lBRUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBRXpDLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFBRSxPQUFPO1FBQzFELE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBRW5CLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUVyQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzlCLGdCQUFnQjtRQUNoQixXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLHlCQUF5QjtRQUN6QixRQUFRLEdBQUc7WUFDUCxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUs7WUFDWixJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUs7U0FDaEIsQ0FBQztRQUNGLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckIsRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxDQUFHO1lBQ0QsSUFBSSxFQUFFLE9BQU87WUFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDaEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDekMsSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPO1FBQ3pCLE1BQU0sS0FBSyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xCLEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsK0JBQ0UsSUFBSSxFQUFFLE9BQU8sSUFDVixLQUFLLEtBQ1IsS0FBSyxJQUNQLENBQUM7UUFDSCxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdkMsSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPO1FBQ3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztRQUV0QyxnQkFBZ0I7UUFDaEIsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixFQUFFLGFBQUYsRUFBRSx1QkFBRixFQUFFLCtCQUNFLElBQUksRUFBRSxLQUFLLElBQ1IsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQzFCLEtBQUssSUFDUCxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDIn0=