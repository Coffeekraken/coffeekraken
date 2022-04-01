import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
var whenNearViewport_exports = {};
__export(whenNearViewport_exports, {
  default: () => whenNearViewport_default
});
module.exports = __toCommonJS(whenNearViewport_exports);
function whenNearViewport(elm, settings = {}) {
  settings = __spreadValues({
    offset: `${window.innerHeight}px ${window.innerWidth}px`
  }, settings);
  let observer, resizeTimeout;
  return new Promise(async (resolve) => {
    const options = {
      root: null,
      rootMargin: settings.offset,
      threshold: 1
    };
    function onChange(changes, observer2) {
      changes.forEach((change) => {
        var _a;
        if (change.intersectionRatio > 0) {
          (_a = observer2.disconnect) == null ? void 0 : _a.call(observer2);
          resolve(elm);
        }
      });
    }
    observer = new IntersectionObserver(onChange, options);
    observer.observe(elm);
    window.addEventListener("resize", (e) => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        var _a;
        (_a = observer.disconnect) == null ? void 0 : _a.call(observer);
        options.rootMargin = `${window.innerHeight}px ${window.innerWidth}px`;
        observer = new IntersectionObserver(onChange, options);
        observer.observe(elm);
      }, 500);
    });
  });
}
var whenNearViewport_default = whenNearViewport;
