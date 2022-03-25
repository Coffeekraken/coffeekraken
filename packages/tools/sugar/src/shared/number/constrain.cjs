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
var constrain_exports = {};
__export(constrain_exports, {
  default: () => constrain_default
});
module.exports = __toCommonJS(constrain_exports);
function constrain(value, min = null, max = null) {
  if (min !== null && value < min)
    value = min;
  if (max !== null && value > max)
    value = max;
  return value;
}
var constrain_default = constrain;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
