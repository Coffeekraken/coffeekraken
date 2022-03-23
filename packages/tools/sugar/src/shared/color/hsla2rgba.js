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
var hsla2rgba_exports = {};
__export(hsla2rgba_exports, {
  default: () => hsla2rgba_default
});
module.exports = __toCommonJS(hsla2rgba_exports);
var __convertColors = __toESM(require("colors-convert"), 1);
function hsla2rgba(h, s, l, a = 1) {
  if (typeof h === "object") {
    h = h.h;
    s = h.s;
    l = h.l;
    a = h.a;
  }
  const rgba = __convertColors.hslaToRgba({
    h,
    s,
    l,
    a
  });
  return rgba;
}
var hsla2rgba_default = hsla2rgba;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
