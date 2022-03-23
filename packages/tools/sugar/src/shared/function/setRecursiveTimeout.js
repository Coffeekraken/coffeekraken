var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var setRecursiveTimeout_exports = {};
__export(setRecursiveTimeout_exports, {
  default: () => setRecursiveTimeout_default
});
module.exports = __toCommonJS(setRecursiveTimeout_exports);
function setRecursiveTimeout(fn, timeout, duration, spread = 0) {
  let idx = 0;
  let currentDuration = 0;
  let timeoutFn = null;
  (function tick() {
    fn(idx);
    currentDuration += timeout;
    idx++;
    if (!duration || duration === -1 || currentDuration < duration) {
      const spreadValue = -spread + Math.round(Math.random(spread * 2));
      timeoutFn = setTimeout(tick, timeout + spreadValue);
    }
  })();
  return function() {
    clearTimeout(timeoutFn);
  };
}
var setRecursiveTimeout_default = setRecursiveTimeout;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
