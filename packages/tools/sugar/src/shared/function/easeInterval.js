var __defProp = Object.defineProperty;
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
import __easeInOutQuart from "../easing/easeInOutQuart";
import __SPromise from "@coffeekraken/s-promise";
function easeInterval_default(duration, cb, settings = {}) {
  return new __SPromise(({ resolve, reject, emit, on }) => {
    settings = __spreadValues({
      interval: 1e3 / 25,
      easing: __easeInOutQuart,
      from: 0,
      to: 100,
      onEnd: void 0
    }, settings);
    let cleared = false;
    on("cancel", () => {
      cleared = true;
    });
    const startTime = Date.now();
    function animate() {
      var _a;
      if (cleared)
        return;
      const percent = 100 / duration * (Date.now() - startTime);
      const easedPercent = settings.easing(percent / 100) * 100;
      cb(easedPercent);
      if (percent < 100) {
        if (cleared)
          return;
        requestAnimationFrame(animate);
      } else {
        (_a = settings.onEnd) == null ? void 0 : _a.call(settings);
        resolve(easedPercent);
      }
    }
    animate();
  });
}
export {
  easeInterval_default as default
};
