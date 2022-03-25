var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var onSwipe_exports = {};
__export(onSwipe_exports, {
  default: () => onSwipe_default
});
module.exports = __toCommonJS(onSwipe_exports);
function onSwipe(elm, cb, settings = {}) {
  settings = __spreadValues({
    threshold: 100
  }, settings);
  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;
  const gesuredZone = elm;
  gesuredZone.addEventListener("touchstart", function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
  }, false);
  gesuredZone.addEventListener("touchend", function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesure();
  }, false);
  function handleGesure() {
    const swipeNfo = {
      distanceX: Math.abs(touchendX - touchstartX),
      distanceY: Math.abs(touchendY - touchstartY)
    };
    if (touchendX + settings.threshold < touchstartX) {
      swipeNfo.left = true;
    }
    if (touchendX - settings.threshold > touchstartX) {
      swipeNfo.right = true;
    }
    if (touchendY + settings.threshold < touchstartY) {
      swipeNfo.up = true;
    }
    if (touchendY - settings.threshold > touchstartY) {
      swipeNfo.down = true;
    }
    if (swipeNfo.left || swipeNfo.right || swipeNfo.down || swipeNfo.up) {
      cb(swipeNfo);
    }
  }
}
var onSwipe_default = onSwipe;
