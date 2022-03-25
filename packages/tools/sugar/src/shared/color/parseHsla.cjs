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
var parseHsla_exports = {};
__export(parseHsla_exports, {
  default: () => parseHsla_default
});
module.exports = __toCommonJS(parseHsla_exports);
function parseHsl(hslaString) {
  hslaString = hslaString.toLowerCase();
  const string = hslaString.replace("hsla(", "").replace("hsl(", "").replace(")", "").replace(/\s/g, "");
  const array = string.split(",");
  return {
    h: parseFloat(array[0]),
    s: parseFloat(array[1]),
    l: parseFloat(array[2]),
    a: array[3] ? parseFloat(array[3]) : 1
  };
}
var parseHsla_default = parseHsl;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
