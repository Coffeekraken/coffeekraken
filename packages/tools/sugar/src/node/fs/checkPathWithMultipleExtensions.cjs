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
var checkPathWithMultipleExtensions_exports = {};
__export(checkPathWithMultipleExtensions_exports, {
  default: () => checkPathWithMultipleExtensions
});
module.exports = __toCommonJS(checkPathWithMultipleExtensions_exports);
var import_extension = __toESM(require("./extension"));
var import_fs = __toESM(require("fs"));
function checkPathWithMultipleExtensions(path, exts) {
  const extension = (0, import_extension.default)(path) || "";
  const pathWithoutExt = path.replace(`.${extension}`, "");
  for (let i = 0; i < exts.length; i++) {
    const ext = exts[i];
    if (import_fs.default.existsSync(`${pathWithoutExt}.${ext}`)) {
      return `${pathWithoutExt}.${ext}`;
    }
  }
  return void 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
