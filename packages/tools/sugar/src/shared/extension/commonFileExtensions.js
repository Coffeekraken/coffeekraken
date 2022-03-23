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
var commonFileExtensions_exports = {};
__export(commonFileExtensions_exports, {
  default: () => commonFileExtensions
});
module.exports = __toCommonJS(commonFileExtensions_exports);
var import_commonAudioFileExtensions = __toESM(require("./commonAudioFileExtensions"), 1);
var import_commonCompressedFileExtensions = __toESM(require("./commonCompressedFileExtensions"), 1);
var import_commonDataFileExtensions = __toESM(require("./commonDataFileExtensions"), 1);
var import_commonDiscFileExtensions = __toESM(require("./commonDiscFileExtensions"), 1);
var import_commonEmailFileExtensions = __toESM(require("./commonEmailFileExtensions"), 1);
var import_commonExecutableFileExtensions = __toESM(require("./commonExecutableFileExtensions"), 1);
var import_commonFontFileExtensions = __toESM(require("./commonFontFileExtensions"), 1);
var import_commonImageFileExtensions = __toESM(require("./commonImageFileExtensions"), 1);
var import_commonMediaFileExtensions = __toESM(require("./commonMediaFileExtensions"), 1);
var import_commonProgrammingFileExtensions = __toESM(require("./commonProgrammingFileExtensions"), 1);
var import_commonTextFileExtensions = __toESM(require("./commonTextFileExtensions"), 1);
var import_commonVideoFileExtensions = __toESM(require("./commonVideoFileExtensions"), 1);
var import_commonWebFileExtensions = __toESM(require("./commonWebFileExtensions"), 1);
var import_unique = __toESM(require("../array/unique"), 1);
function commonFileExtensions(types = ["audio", "compressed", "data", "disc", "email", "executable", "font", "image", "media", "programming", "text", "video", "web"], withDot = false) {
  return (0, import_unique.default)([
    ...types.includes("audio") ? (0, import_commonAudioFileExtensions.default)(false) : [],
    ...types.includes("compressed") ? (0, import_commonCompressedFileExtensions.default)(false) : [],
    ...types.includes("data") ? (0, import_commonDataFileExtensions.default)(false) : [],
    ...types.includes("disc") ? (0, import_commonDiscFileExtensions.default)(false) : [],
    ...types.includes("email") ? (0, import_commonEmailFileExtensions.default)(false) : [],
    ...types.includes("executable") ? (0, import_commonExecutableFileExtensions.default)(false) : [],
    ...types.includes("font") ? (0, import_commonFontFileExtensions.default)(false) : [],
    ...types.includes("image") ? (0, import_commonImageFileExtensions.default)(false) : [],
    ...types.includes("media") ? (0, import_commonMediaFileExtensions.default)(false) : [],
    ...types.includes("programming") ? (0, import_commonProgrammingFileExtensions.default)(false) : [],
    ...types.includes("text") ? (0, import_commonTextFileExtensions.default)(false) : [],
    ...types.includes("video") ? (0, import_commonVideoFileExtensions.default)(false) : [],
    ...types.includes("web") ? (0, import_commonWebFileExtensions.default)(false) : []
  ]).map((ext) => withDot ? `.${ext}` : ext);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
