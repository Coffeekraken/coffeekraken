var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var detectInOutDirection_exports = {};
__export(detectInOutDirection_exports, {
  default: () => detectInOutDirection_default
});
module.exports = __toCommonJS(detectInOutDirection_exports);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
function detectInOutDirection($elm) {
  let mouseEnterHandler, mouseLeaveHandler;
  const promise = new import_s_promise.default(({ resolve, reject, emit }) => {
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
