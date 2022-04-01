import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
import __SPromise from "@coffeekraken/s-promise";
function inViewportStatusChange($elm, settings) {
  let status = "out", observer, isInViewport = false;
  settings = __spreadValues({
    offset: "10px"
  }, settings != null ? settings : {});
  return new __SPromise(({ emit }) => {
    const _cb = () => {
      if (!isInViewport && status === "in") {
        status = "out";
        emit("leave", $elm);
      } else if (isInViewport && status === "out") {
        status = "in";
        emit("enter", $elm);
      }
    };
    observer = new IntersectionObserver((entries, observer2) => {
      if (!entries.length)
        return;
      const entry = entries[0];
      if (entry.intersectionRatio > 0) {
        isInViewport = true;
      } else {
        isInViewport = false;
      }
      _cb();
    }, {
      root: null,
      rootMargin: settings.offset,
      threshold: [
        0,
        0.1,
        0.2,
        0.3,
        0.4,
        0.5,
        0.6,
        0.7,
        0.8,
        0.9,
        1
      ]
    });
    observer.observe($elm);
  }, {
    id: "inViewportStatisChange"
  }).on("cancel", () => {
    var _a;
    (_a = observer.disconnect) == null ? void 0 : _a.call(observer);
  });
}
var inViewportStatusChange_default = inViewportStatusChange;
export {
  inViewportStatusChange_default as default
};
