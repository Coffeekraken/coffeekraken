import __getPositionFromEvent from '../position/getPositionFromEvent';
export default function onDrag($elm, cb, settings) {
    const finalSettings = Object.assign({ maxSpeed: 0.01 }, (settings !== null && settings !== void 0 ? settings : {}));
    let isMouseDown = false;
    let startPos, $target;
    let track = [];
    let lastCapturedTime;
    function buildTrackPoint(e) {
        const { x, y } = __getPositionFromEvent(e);
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
        const { x, y } = __getPositionFromEvent(e);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sc0JBQXNCLE1BQU0sa0NBQWtDLENBQUM7QUEyQ3RFLE1BQU0sQ0FBQyxPQUFPLFVBQVUsTUFBTSxDQUMxQixJQUFpQixFQUNqQixFQUFZLEVBQ1osUUFBbUM7SUFFbkMsTUFBTSxhQUFhLEdBQUcsZ0JBQ2xCLFFBQVEsRUFBRSxJQUFJLElBQ1gsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztJQUV4QixJQUFJLFFBQVEsRUFBRSxPQUFPLENBQUM7SUFFdEIsSUFBSSxLQUFLLEdBQXVCLEVBQUUsQ0FBQztJQUVuQyxJQUFJLGdCQUFnQixDQUFDO0lBRXJCLFNBQVMsZUFBZSxDQUFDLENBQUM7UUFDdEIsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsRUFDekIsTUFBTSxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUN2QixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLGdCQUFnQixDQUFDO1FBRXpDLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRTdDLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRS9DLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxFQUNuQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFFdEMsSUFBSSxNQUFNLEdBQUcsVUFBVSxHQUFH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