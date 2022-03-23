var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var onDrag_exports = {};
__export(onDrag_exports, {
  default: () => onDrag
});
module.exports = __toCommonJS(onDrag_exports);
var import_getPositionFromEvent = __toESM(require("../position/getPositionFromEvent"), 1);
function onDrag($elm, cb, settings) {
  const finalSettings = __spreadValues({
    maxSpeed: 0.01
  }, settings != null ? settings : {});
  let isMouseDown = false;
  let startPos, $target;
  let track = [];
  let lastCapturedTime;
  function buildTrackPoint(e) {
    const { x, y } = (0, import_getPositionFromEvent.default)(e);
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
    const { x, y } = (0, import_getPositionFromEvent.default)(e);
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
