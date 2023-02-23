"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
function __onDrag($elm, cb, settings) {
    const finalSettings = Object.assign({ maxSpeed: 0.01 }, (settings !== null && settings !== void 0 ? settings : {}));
    let isMouseDown = false;
    let startPos, $target;
    let track = [];
    let lastCapturedTime;
    function buildTrackPoint(e) {
        const { x, y } = (0, dom_1.__positionFromEvent)(e);
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
        const { x, y } = (0, dom_1.__positionFromEvent)(e);
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
exports.default = __onDrag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQThEO0FBZ0Q5RCxTQUF3QixRQUFRLENBQzVCLElBQWlCLEVBQ2pCLEVBQVksRUFDWixRQUFtQztJQUVuQyxNQUFNLGFBQWEsR0FBRyxnQkFDbEIsUUFBUSxFQUFFLElBQUksSUFDWCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBRXhCLElBQUksUUFBUSxFQUFFLE9BQU8sQ0FBQztJQUV0QixJQUFJLEtBQUssR0FBdUIsRUFBRSxDQUFDO0lBRW5DLElBQUksZ0JBQWdCLENBQUM7SUFFckIsU0FBUyxlQUFlLENBQUMsQ0FBQztRQUN0QixNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLElBQUEseUJBQW1CLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEVBQ3pCLE1BQU0sR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsRUFDdkIsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQztRQUV6QyxNQUFNLGdCQUFnQixHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUU3QyxNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUvQyxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsRUFDbkMsVUFBVSxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBRXRDLElBQUksTUFBTSxHQUFHLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxFQUMvQixNQUFNLEdB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