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
var weakmapTypeDescriptor_exports = {};
__export(weakmapTypeDescriptor_exports, {
  default: () => weakmapTypeDescriptor_default
});
module.exports = __toCommonJS(weakmapTypeDescriptor_exports);
const descriptor = {
  name: "WeakMap",
  id: "weakmap",
  is: (value) => value instanceof WeakMap,
  cast: (value) => {
    return new Error(`Sorry but nothing can be casted to a WeakMap for now`);
  }
};
var weakmapTypeDescriptor_default = descriptor;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
