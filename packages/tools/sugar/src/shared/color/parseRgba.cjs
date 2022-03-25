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
var parseRgba_exports = {};
__export(parseRgba_exports, {
  default: () => parseRgba_default
});
module.exports = __toCommonJS(parseRgba_exports);
function parseRgba(rgbaString) {
  rgbaString = rgbaString.toLowerCase();
  const string = rgbaString.replace("rgba(", "").replace("rgb(", "").replace(")", "").replace(/\s/g, "");
  const array = string.split(",");
  return {
    r: parseInt(array[0]),
    g: parseInt(array[1]),
    b: parseInt(array[2]),
    a: array[3] ? parseInt(array[3]) : 1
  };
}
var parseRgba_default = parseRgba;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
