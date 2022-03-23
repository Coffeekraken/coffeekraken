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
var require_exports = {};
__export(require_exports, {
  default: () => require2
});
module.exports = __toCommonJS(require_exports);
var import_callsites = __toESM(require("callsites"), 1);
var import_esm = __toESM(require("esm"), 1);
var import_module = require("module");
function require2(pkg) {
  var _a;
  let filePath = (_a = (0, import_callsites.default)()[1].getFileName()) == null ? void 0 : _a.replace(/^file:\/\//, "");
  const rr = (0, import_module.createRequire)(filePath);
  const r = (0, import_esm.default)({});
  const requiredPkg = rr(pkg);
  return requiredPkg;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
