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
var commonProgrammingFileExtensions_exports = {};
__export(commonProgrammingFileExtensions_exports, {
  default: () => commonProgrammingFileExtensions
});
module.exports = __toCommonJS(commonProgrammingFileExtensions_exports);
function commonProgrammingFileExtensions(withDot = false) {
  return ["asp", "c", "cgi", "cfm", "pl", "class", "cpp", "cs", "h", "java", "php", "py", "sh", "swift", "vb", "js", "jsp", "jsx", "css", "ts", "tsx", "rs", "dart"].map((ext) => withDot ? `.${ext}` : ext);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
