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
var packageRoot_exports = {};
__export(packageRoot_exports, {
  default: () => packageRoot_default
});
module.exports = __toCommonJS(packageRoot_exports);
var import_file = __toESM(require("../is/file"));
var import_find_package_json = __toESM(require("find-package-json"));
function packageRoot(from = process.cwd(), highest = false) {
  if ((0, import_file.default)(from))
    from = from.split("/").slice(0, -1).join("/");
  const f = (0, import_find_package_json.default)(from);
  let file = f.next();
  if (!file || !file.filename)
    return false;
  if (!highest) {
    const filename = file.filename || false;
    if (!filename)
      return filename;
    return filename.split("/").slice(0, -1).join("/");
  }
  let finalFile;
  while (!file.done) {
    if (file.done)
      break;
    finalFile = file;
    file = f.next();
  }
  if (finalFile.filename) {
    return finalFile.filename.split("/").slice(0, -1).join("/");
  }
  return false;
}
var packageRoot_default = packageRoot;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
