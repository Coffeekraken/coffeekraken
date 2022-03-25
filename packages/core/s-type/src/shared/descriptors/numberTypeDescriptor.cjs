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
var numberTypeDescriptor_exports = {};
__export(numberTypeDescriptor_exports, {
  default: () => numberTypeDescriptor_default
});
module.exports = __toCommonJS(numberTypeDescriptor_exports);
const descriptor = {
  name: "Number",
  id: "number",
  is: (value) => typeof value === "number",
  cast: (value) => {
    if (typeof value !== "string") {
      return new Error(`Sorry but only strings can be casted to numbers...`);
    }
    const res = parseFloat(value);
    if (isNaN(res))
      return new Error(`Sorry but the conversion of "<yellow>${value}</yellow>" to a <green>Number</green> does not work...`);
    return res;
  }
};
var numberTypeDescriptor_default = descriptor;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
