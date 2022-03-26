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
var import_em2px = __toESM(require("./em2px"), 1);
var import_em2px2 = __toESM(require("./em2px"), 1);
var import_px2em = __toESM(require("./px2em"), 1);
var import_px2rem = __toESM(require("./px2rem"), 1);
function convert(from, to = "px", $elm) {
  let fromUnit = "px";
  if (typeof from === "string" && parseFloat(from).toString() !== from) {
    fromUnit = from.replace(/[0-9.,]+/g, "");
  }
  const fromNumber = parseFloat(from);
  let pxValue;
  switch (fromUnit) {
    case "px":
      pxValue = fromNumber;
      break;
    case "rem":
      pxValue = (0, import_em2px2.default)(fromNumber);
      break;
    case "em":
      pxValue = (0, import_em2px.default)(fromNumber, $elm);
      break;
    default:
      return from;
      break;
  }
  switch (to) {
    case "px":
      return pxValue;
      break;
    case "rem":
      return (0, import_px2rem.default)(pxValue);
      break;
    case "em":
      return (0, import_px2em.default)(pxValue, $elm);
      break;
    default:
      return from;
      break;
  }
}
var convert_default = convert;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
