import __getPositionFromEvent from '../position/getPositionFromEvent';
export default function onDrag($elm, cb, settings) {
    const finalSettings = Object.assign({ maxSpeed: 0.01 }, settings !== null && settings !== void 0 ? settings : {});
    let isMouseDown = false;
    let startPos, $target;
    let track = [];
    let lastCapturedTime;
    function buildTrackPoint(e) {
        const { x, y } = __getPositionFromEvent(e);
        const deltaX = x - startPos.x, deltaY = y - startPos.y, time = (Date.now() - lastCapturedTime);
        const secondPercentage = 100 / 1000 * time;
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
            speedX: lastDeltaX / secondPercentage * 100,
            speedY: lastDeltaY / secondPercentage * 100
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
        track = [{
                x: startPos.x,
                y: startPos.y,
                deltaX: 0,
                deltaY: 0,
                speedX: 0,
                speedY: 0
            }];
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
                track: track[0]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25EcmFnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib25EcmFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sc0JBQXNCLE1BQU0sa0NBQWtDLENBQUM7QUEwQ3RFLE1BQU0sQ0FBQyxPQUFPLFVBQVUsTUFBTSxDQUFDLElBQWlCLEVBQUUsRUFBWSxFQUFFLFFBQW1DO0lBRS9GLE1BQU0sYUFBYSxHQUFHLGdCQUNsQixRQUFRLEVBQUUsSUFBSSxJQUNYLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDcEIsQ0FBQztJQUVGLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztJQUV4QixJQUFJLFFBQVEsRUFBRSxPQUFPLENBQUM7SUFFdEIsSUFBSSxLQUFLLEdBQXVCLEVBQUUsQ0FBQztJQUVuQyxJQUFJLGdCQUFnQixDQUFDO0lBRXJCLFNBQVMsZUFBZSxDQUFDLENBQUM7UUFDdEIsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsRUFDekIsTUFBTSxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUN2QixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUUzQyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRTNDLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRS9DLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxFQUNuQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFFdEMsSUFBSSxNQUFNLEdBQUcsVUFBVSxHQUFHLElBQUksSUFBSSxD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