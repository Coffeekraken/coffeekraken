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
var convert_exports = {};
__export(convert_exports, {
  default: () => convert_default
});
module.exports = __toCommonJS(convert_exports);
var import_parse = __toESM(require("./parse"));
var import_hsla2rgba = __toESM(require("./hsla2rgba"));
var import_rgba2hsla = __toESM(require("./rgba2hsla"));
var import_rgba2hex = __toESM(require("./rgba2hex"));
function convert(input, format = "rgba") {
  let rgbaObj = {};
  if (typeof input === "string") {
    rgbaObj = (0, import_parse.default)(input, "rgba");
  } else if (typeof input === "object") {
    if (input.r !== void 0 && input.g !== void 0 && input.b !== void 0) {
      rgbaObj = input;
    } else if (input.h !== void 0 && input.s !== void 0 && input.l !== void 0) {
      rgbaObj = (0, import_hsla2rgba.default)(input);
    }
  }
  switch (format) {
    case "rgba":
      return rgbaObj;
    case "hsl":
      return (0, import_rgba2hsla.default)(rgbaObj);
    case "hex":
    case "hexString":
      return (0, import_rgba2hex.default)(rgbaObj);
    case "rgbaString":
      return `rgba(${rgbaObj.r},${rgbaObj.g},${rgbaObj.b},${rgbaObj.a})`;
    case "hslString":
      const hslObj = convert(rgbaObj, "hsl");
      return `hsl(${hslObj.h},${hslObj.s},${hslObj.l})`;
  }
  return void 0;
}
var convert_default = convert;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
