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
var matchExcludeGlobs_exports = {};
__export(matchExcludeGlobs_exports, {
  default: () => matchExcludeGlobs
});
module.exports = __toCommonJS(matchExcludeGlobs_exports);
var import_minimatch = __toESM(require("minimatch"), 1);
var import_excludeGlobs = __toESM(require("./excludeGlobs"), 1);
function matchExcludeGlobs(path) {
  const excludeGlobs = (0, import_excludeGlobs.default)();
  for (let i = 0; i < excludeGlobs.length; i++) {
    if ((0, import_minimatch.default)(excludeGlobs[i], path))
      return true;
  }
  return false;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
