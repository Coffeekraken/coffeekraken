import {
  __spreadProps,
  __spreadValues
} from "../../../../../../chunk-PG3ZPS4G.mjs";
import __getPositionFromEvent from "../position/getPositionFromEvent";
function onDrag($elm, cb, settings) {
  const finalSettings = __spreadValues({
    maxSpeed: 0.01
  }, settings != null ? settings : {});
  let isMouseDown = false;
  let startPos, $target;
  let track = [];
  let lastCapturedTime;
  function buildTrackPoint(e) {
    const { x, y } = __getPositionFromEvent(e);
    const deltaX = x - startPos.x, deltaY = y - startPos.y, time = Date.now() - lastCapturedTime;
    const secondPercentage = 100 / 1e3 * time;
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
    startPos = {
      x,
      y
    };
    track = [{
      x: startPos.x,
      y: startPos.y,
      deltaX: 0,
      deltaY: 0,
      speedX: 0,
      speedY: 0
    }];
    lastCapturedTime = Date.now();
    isMouseDown = true;
  }
  document.addEventListener("mousedown", down);
  document.addEventListener("touchstart", down);
  function move(e) {
    if (!isMouseDown)
      return;
    if (track.length === 1) {
      cb == null ? void 0 : cb({
        type: "start",
        track: track[0]
      });
    }
    $target.style.pointerEvents = "none";
    const point = buildTrackPoint(e);
    track.push(point);
    cb == null ? void 0 : cb(__spreadProps(__spreadValues({
      type: "track"
    }, point), {
      track
    }));
    lastCapturedTime = Date.now();
  }
  document.addEventListener("mousemove", move);
  document.addEventListener("touchmove", move);
  function up(e) {
    if (!isMouseDown)
      return;
    $target.style.pointerEvents = "unset";
    isMouseDown = false;
    if (track.length > 1) {
      cb == null ? void 0 : cb(__spreadProps(__spreadValues({
        type: "end"
      }, track[track.length - 1]), {
        track
      }));
    }
  }
  document.addEventListener("mouseup", up);
  document.addEventListener("touchend", up);
}
export {
  onDrag as default
};
