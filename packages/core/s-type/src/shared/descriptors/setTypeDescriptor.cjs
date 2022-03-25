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
var setTypeDescriptor_exports = {};
__export(setTypeDescriptor_exports, {
  default: () => setTypeDescriptor_default
});
module.exports = __toCommonJS(setTypeDescriptor_exports);
const descriptor = {
  name: "Set",
  id: "set",
  is: (value) => value instanceof Set,
  cast: (value) => {
    if (value instanceof Set)
      return value;
    const set = /* @__PURE__ */ new Set();
    set.add(value);
    return set;
  }
};
var setTypeDescriptor_default = descriptor;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
