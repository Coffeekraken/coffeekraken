var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var mapTypeDescriptor_exports = {};
__export(mapTypeDescriptor_exports, {
  default: () => mapTypeDescriptor_default
});
module.exports = __toCommonJS(mapTypeDescriptor_exports);
var import_map = __toESM(require("@coffeekraken/sugar/shared/is/map"));
const descriptor = {
  name: "Map",
  id: "map",
  is: (value) => (0, import_map.default)(value),
  cast: (value) => {
    if ((0, import_map.default)(value))
      return value;
    const map = /* @__PURE__ */ new Map();
    map.set("value", value);
    return map;
  }
};
var mapTypeDescriptor_default = descriptor;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
