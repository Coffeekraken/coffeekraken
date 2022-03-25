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
var parse_exports = {};
__export(parse_exports, {
  default: () => parse_default
});
module.exports = __toCommonJS(parse_exports);
var import_parseRgba = __toESM(require("./parseRgba"));
var import_parseHsla = __toESM(require("./parseHsla"));
var import_hsla2rgba = __toESM(require("./hsla2rgba"));
var import_hex2rgba = __toESM(require("./hex2rgba"));
var import_rgba2hsla = __toESM(require("./rgba2hsla"));
function parse(color, format = "rgba") {
  color = color.replace(/\s/g, "");
  if (color.indexOf("rgb") != -1) {
    color = (0, import_parseRgba.default)(color);
  } else if (color.indexOf("hsl") != -1) {
    color = (0, import_parseHsla.default)(color);
    color = (0, import_hsla2rgba.default)(color.h, color.s, color.l);
  } else if (color.substring(0, 1) == "#") {
    color = (0, import_hex2rgba.default)(color);
  }
  switch (format) {
    case "hsla":
    case "hsl":
      return (0, import_rgba2hsla.default)(color);
      break;
    case "rgba":
    case "rgb":
    default:
      return color;
      break;
  }
}
var parse_default = parse;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
