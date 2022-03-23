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
var rgba2hsla_exports = {};
__export(rgba2hsla_exports, {
  default: () => rgba2hsla_default
});
module.exports = __toCommonJS(rgba2hsla_exports);
var __convertColors = __toESM(require("colors-convert"), 1);
function rgba2hsla(r, g, b, a = 1) {
  if (typeof r === "object") {
    g = r.g;
    b = r.b;
    a = r.a;
    r = r.r;
  }
  return __convertColors.rgbaToHsla({
    r,
    g,
    b,
    a
  });
}
var rgba2hsla_default = rgba2hsla;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
