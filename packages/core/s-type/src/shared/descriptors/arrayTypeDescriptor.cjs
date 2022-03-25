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
var arrayTypeDescriptor_exports = {};
__export(arrayTypeDescriptor_exports, {
  default: () => arrayTypeDescriptor_default
});
module.exports = __toCommonJS(arrayTypeDescriptor_exports);
const descriptor = {
  name: "Array",
  id: "array",
  is: (value) => {
    return Array.isArray(value);
  },
  cast: (value, params = {}) => {
    if (!value)
      return [];
    if (params.splitChars && Array.isArray(params.splitChars)) {
      value = value.split(new RegExp(`(${params.splitChars.join("|")})`, "gm")).filter((l) => l.trim() !== "" && params.splitChars.indexOf(l) === -1);
    }
    if (Array.isArray(value))
      return value;
    return [value];
  }
};
var arrayTypeDescriptor_default = descriptor;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
