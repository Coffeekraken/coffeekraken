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
var folderHash_exports = {};
__export(folderHash_exports, {
  default: () => folderHash
});
module.exports = __toCommonJS(folderHash_exports);
var import_fs = __toESM(require("fs"), 1);
var import_sha256 = __toESM(require("../../shared/crypt/sha256"), 1);
var import_directory = __toESM(require("../is/directory"), 1);
var import_fileHash = __toESM(require("./fileHash"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
function folderHash(folderPath, settings = {}) {
  settings = (0, import_deepMerge.default)({
    recursive: true,
    algo: "sha256",
    digest: "base64",
    include: {
      ctime: false
    }
  }, settings != null ? settings : {});
  const paths = [];
  function readDir(dir) {
    const files = import_fs.default.readdirSync(dir);
    files.forEach((filePath) => {
      if (settings.recursive && (0, import_directory.default)(`${dir}/${filePath}`)) {
        return readDir(`${dir}/${filePath}`);
      }
      paths.push(`${dir}/${filePath}`);
    });
  }
  readDir(folderPath);
  const filesHashes = [];
  paths.forEach((path) => {
    if ((0, import_directory.default)(path))
      return;
    filesHashes.push((0, import_fileHash.default)(path, settings));
  });
  return import_sha256.default.encrypt(filesHashes.join("-"));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
