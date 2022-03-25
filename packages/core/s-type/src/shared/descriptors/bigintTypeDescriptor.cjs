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
var bigintTypeDescriptor_exports = {};
__export(bigintTypeDescriptor_exports, {
  default: () => bigintTypeDescriptor_default
});
module.exports = __toCommonJS(bigintTypeDescriptor_exports);
const descriptor = {
  name: "Bigint",
  id: "bigint",
  is: (value) => typeof value === "bigint",
  cast: (value) => {
    if (typeof value === "bigint")
      return value;
    if (typeof value !== "string" && typeof value !== "number") {
      return new Error(`Sorry but only <yellow>String</yellow> and <yellow>Number</yellow> can be casted to <green>Bigint</green>`);
    }
    let res;
    try {
      res = BigInt(value);
    } catch (e) {
      res = new Error(`It seem's that the passed value "<yellow>${value}</yellow>" can not be casted to a <green>BigInt</green>`);
    }
    return res;
  }
};
var bigintTypeDescriptor_default = descriptor;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
