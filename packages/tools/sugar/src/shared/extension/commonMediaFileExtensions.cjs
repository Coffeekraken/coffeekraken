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
var commonMediaFileExtensions_exports = {};
__export(commonMediaFileExtensions_exports, {
  default: () => commonMediaFileExtensions
});
module.exports = __toCommonJS(commonMediaFileExtensions_exports);
var import_commonImageFileExtensions = __toESM(require("./commonImageFileExtensions"));
var import_commonVideoFileExtensions = __toESM(require("./commonVideoFileExtensions"));
var import_commonAudioFileExtensions = __toESM(require("./commonAudioFileExtensions"));
var import_unique = __toESM(require("../array/unique"));
function commonMediaFileExtensions(withDot = false) {
  return (0, import_unique.default)([
    ...(0, import_commonImageFileExtensions.default)(false),
    ...(0, import_commonVideoFileExtensions.default)(false),
    ...(0, import_commonAudioFileExtensions.default)(false)
  ]).map((ext) => withDot ? `.${ext}` : ext);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
