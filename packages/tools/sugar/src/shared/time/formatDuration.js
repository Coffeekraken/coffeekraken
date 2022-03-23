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
var formatDuration_exports = {};
__export(formatDuration_exports, {
  default: () => formatDuration_default
});
module.exports = __toCommonJS(formatDuration_exports);
function formatDuration(duration) {
  if (duration === Infinity) {
    return "...";
  }
  if (duration < 1e3) {
    return `${duration}ms`;
  }
  if (duration < 1e3 * 60) {
    const s = (duration / 1e3).toFixed(0);
    const ms = (duration - s * 1e3).toFixed(0);
    if (ms <= 0)
      return `${s}s`;
    return `${s}.${ms}s`;
  }
  if (duration < 1e3 * 60 * 60) {
    const m2 = Math.floor(duration / 1e3 / 60);
    const s = ((duration - m2 * 1e3 * 60) / 1e3).toFixed(0);
    return `${m2}m${s > 0 ? `${s}s` : ""}`;
  }
  const h = Math.floor(duration / 1e3 / 60 / 60);
  const m = ((duration - h * 1e3 * 60 * 60) / 1e3 / 60).toFixed(0);
  return `${h}h${m > 0 ? `${m}m` : ""}`;
}
var formatDuration_default = formatDuration;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
