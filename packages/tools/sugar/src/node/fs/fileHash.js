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
var fileHash_exports = {};
__export(fileHash_exports, {
  default: () => fileHash
});
module.exports = __toCommonJS(fileHash_exports);
var import_crypto = __toESM(require("crypto"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_buffer = require("buffer");
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
function fileHash(filePath, settings = {}) {
  var _a;
  settings = (0, import_deepMerge.default)({
    algo: "sha256",
    digest: "base64",
    include: {
      ctime: false
    }
  }, settings != null ? settings : {});
  let fileBuffer = import_fs.default.readFileSync(filePath);
  if ((_a = settings.include) == null ? void 0 : _a.ctime) {
    try {
      const ctime = import_fs.default.statSync(filePath).ctime;
      const buffer = import_buffer.Buffer.from(ctime);
      fileBuffer = import_buffer.Buffer.concat([fileBuffer, buffer]);
    } catch (e) {
    }
  }
  const hashSum = import_crypto.default.createHash(settings.algo);
  hashSum.update(fileBuffer);
  return hashSum.digest(settings.digest);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
