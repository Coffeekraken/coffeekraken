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
var countLines_exports = {};
__export(countLines_exports, {
  default: () => countLines_default
});
module.exports = __toCommonJS(countLines_exports);
var import_countLine = __toESM(require("../../shared/string/countLine"));
function countLines(string) {
  let currentCount = 0;
  let lines = string.split("\n");
  lines.forEach((line) => {
    const lineCount = (0, import_countLine.default)(line);
    currentCount += Math.ceil(lineCount / process.stdout.columns);
  });
  return currentCount;
}
var countLines_default = countLines;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
