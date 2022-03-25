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
var utcTime_exports = {};
__export(utcTime_exports, {
  default: () => utcTime
});
module.exports = __toCommonJS(utcTime_exports);
function utcTime(hours = true, minutes = true, seconds = true) {
  const timeAr = [];
  const date = new Date();
  if (hours)
    timeAr.push(date.getHours());
  if (minutes)
    timeAr.push(date.getMinutes());
  if (seconds)
    timeAr.push(date.getSeconds());
  return timeAr.join(":");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
