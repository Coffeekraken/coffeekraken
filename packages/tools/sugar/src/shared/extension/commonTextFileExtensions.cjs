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
var commonTextFileExtensions_exports = {};
__export(commonTextFileExtensions_exports, {
  default: () => commonTextFileExtensions
});
module.exports = __toCommonJS(commonTextFileExtensions_exports);
var import_commonProgrammingFileExtensions = __toESM(require("./commonProgrammingFileExtensions"), 1);
function commonTextFileExtensions(withDot = false) {
  return ["txt", "htm", "html", "md", "json", "csv", "rss", "xhtml", ...(0, import_commonProgrammingFileExtensions.default)(withDot)].map((ext) => withDot ? `.${ext}` : ext);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
