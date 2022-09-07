import { __positionFromEvent } from '@coffeekraken/sugar/dom';
export default function __onDrag($elm, cb, settings) {
    const finalSettings = Object.assign({ maxSpeed: 0.01 }, (settings !== null && settings !== void 0 ? settings : {}));
    let isMouseDown = false;
    let startPos, $target;
    let track = [];
    let lastCapturedTime;
    function buildTrackPoint(e) {
        const { x, y } = __positionFromEvent(e);
        const deltaX = x - startPos.x, deltaY = y - startPos.y, time = Date.now() - lastCapturedTime;
        const secondPercentage = (100 / 1000) * time;
        const lastTrackPoint = track[track.length - 1];
        const lastDeltaX = x - lastTrackPoint.x, lastDeltaY = y - lastTrackPoint.y;
        let speedX = lastDeltaX / time || 0, speedY = lastDeltaY / time || 0;
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
        if (e.target !== $elm && !$elm.contains(e.target))
            return;
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
        if (!isMouseDown)
            return;
        // if first point tracked, trigger the "start" event
        if (track.length === 1) {
            cb === null || cb === void 0 ? void 0 : cb({
                type: 'start',
                track: track[0],
            });
        }
        $target.style.pointerEvents = 'none';
        const point = buildTrackPoint(e);
        track.push(point);
        cb === null || cb === void 0 ? void 0 : cb(Object.assign(Object.assign({ type: 'track' }, point), { track }));
        lastCapturedTime = Date.now();
    }
    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move);
    function up(e) {
        if (!isMouseDown)
            return;
        $target.style.pointerEvents = 'unset';
        // update status
        isMouseDown = false;
        // callback if moved
        if (track.length > 1) {
            cb === null || cb === void 0 ? void 0 : cb(Object.assign(Object.assign({ type: 'end' }, track[track.length - 1]), { track }));
        }
    }
    document.addEventListener('mouseup', up);
    document.addEventListener('touchend', up);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBMkM5RCxNQUFNLENBQUMsT0FBTyxVQUFVLFFBQVEsQ0FDNUIsSUFBaUIsRUFDakIsRUFBWSxFQUNaLFFBQW1DO0lBRW5DLE1BQU0sYUFBYSxHQUFHLGdCQUNsQixRQUFRLEVBQUUsSUFBSSxJQUNYLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFFeEIsSUFBSSxRQUFRLEVBQUUsT0FBTyxDQUFDO0lBRXRCLElBQUksS0FBSyxHQUF1QixFQUFFLENBQUM7SUFFbkMsSUFBSSxnQkFBZ0IsQ0FBQztJQUVyQixTQUFTLGVBQWUsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEVBQ3pCLE1BQU0sR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsRUFDdkIsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQztRQUV6QyxNQUFNLGdCQUFnQixHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUU3QyxNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUvQyxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsRUFDbkMsVUFBVSxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBRXRDLElBQUksTUFBTSxHQUFH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