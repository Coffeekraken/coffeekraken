import "../../../../../../chunk-PG3ZPS4G.mjs";
import __SPromise from "@coffeekraken/s-promise";
function detectInOutDirection($elm) {
  let mouseEnterHandler, mouseLeaveHandler;
  const promise = new __SPromise(({ resolve, reject, emit }) => {
    mouseEnterHandler = (e) => {
      emit("in", direction);
      emit("then", {
        action: "in",
        direction
      });
    };
    mouseLeaveHandler = (e) => {
      emit("out", direction);
      emit("then", {
        action: "out",
        direction
      });
    };
    $elm.addEventListener("mouseenter", mouseEnterHandler);
    $elm.addEventListener("mouseleave", mouseLeaveHandler);
  }, {
    id: "detectInOutDirection"
  }).on("finally", () => {
    $elm.removeEventListener("mouseenter", mouseEnterHandler);
    $elm.removeEventListener("mouseleave", mouseLeaveHandler);
  });
  return promise;
}
let oldX = 0, oldY = 0, direction = null;
const threshold = 0;
document.addEventListener("mousemove", (e) => {
  calculateDirection(e);
});
document.addEventListener("touchstart", (e) => {
  calculateDirection(e);
});
function calculateDirection(e) {
  let directionX = 0, directionY = 0, diffX = 0, diffY = 0;
  if (e.pageX < oldX - threshold) {
    directionX = "left";
    diffX = oldX - e.pageX;
    oldX = e.pageX;
  } else if (e.pageX > oldX + threshold) {
    directionX = "right";
    diffX = e.pageX - oldX;
    oldX = e.pageX;
  }
  if (e.pageY < oldY - threshold) {
    directionY = "up";
    diffY = oldY - e.pageY;
    oldY = e.pageY;
  } else if (e.pageY > oldY + threshold) {
    directionY = "down";
    diffY = e.pageY - oldY;
    oldY = e.pageY;
  }
  if (directionX && directionY) {
    direction = diffX > diffY ? directionX : directionY;
  } else if (directionX) {
    direction = directionX;
  } else if (directionY) {
    direction = directionY;
  } else {
    direction = null;
  }
}
var detectInOutDirection_default = detectInOutDirection;
export {
  detectInOutDirection_default as default
};
