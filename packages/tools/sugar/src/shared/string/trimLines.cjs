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
var trimLines_exports = {};
__export(trimLines_exports, {
  default: () => trimLines_default
});
module.exports = __toCommonJS(trimLines_exports);
var import_deepMerge = __toESM(require("../object/deepMerge"));
function trimLines(string, settings = {}) {
  settings = (0, import_deepMerge.default)({
    leftPadding: 0,
    rightPadding: 0,
    keepEmptyLines: true
  }, settings);
  string = string.split("\n").map((line) => {
    line = line.trim();
    if (!settings.keepEmptyLines) {
      if (line === "")
        return -1;
    }
    if (settings.leftPadding)
      line = `${" ".repeat(settings.leftPadding)}${line}`;
    if (settings.rightPadding)
      line = `${line}${" ".repeat(settings.rightPadding)}`;
    return line;
  }).filter((line) => line !== -1).join("\n");
  return string;
}
var trimLines_default = trimLines;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
