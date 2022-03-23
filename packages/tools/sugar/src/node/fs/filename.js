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
var filename_exports = {};
__export(filename_exports, {
  default: () => filename_default
});
module.exports = __toCommonJS(filename_exports);
var import_extension = __toESM(require("./extension"), 1);
function filename(path, withExtension = true) {
  let filename2 = path.split("/").pop();
  if (!withExtension) {
    filename2 = filename2.replace(`.${(0, import_extension.default)(filename2)}`, "");
  }
  return filename2;
}
var filename_default = filename;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
