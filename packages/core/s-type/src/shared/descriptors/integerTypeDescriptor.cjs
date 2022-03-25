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
var integerTypeDescriptor_exports = {};
__export(integerTypeDescriptor_exports, {
  default: () => integerTypeDescriptor_default
});
module.exports = __toCommonJS(integerTypeDescriptor_exports);
const descriptor = {
  name: "Integer",
  id: "integer",
  is: (value) => Number.isInteger(value),
  cast: (value) => {
    if (typeof value !== "string" && typeof value !== "number") {
      return new Error(`Sorry but only strings and numbers can be casted to integers... Passed value: ${value}`);
    }
    const res = parseInt(value);
    if (isNaN(res))
      return new Error(`Sorry but the conversion of "<yellow>${value}</yellow>" to a <green>Integer</green> does not work...`);
    return res;
  }
};
var integerTypeDescriptor_default = descriptor;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
