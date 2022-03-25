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
function whenInViewport(elm, settings = {}) {
  settings = __spreadValues({
    offset: "10px"
  }, settings);
  return new Promise((resolve) => {
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
    const observer = new IntersectionObserver(onChange, options);
    observer.observe(elm);
  });
}
var whenInViewport_default = whenInViewport;
export {
  whenInViewport_default as default
};
