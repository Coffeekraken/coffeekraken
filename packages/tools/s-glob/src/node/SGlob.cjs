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
var SGlob_exports = {};
__export(SGlob_exports, {
  IResolveGlobSettings: () => import_resolveGlob.IResolveGlobSettings,
  default: () => SGlob
});
module.exports = __toCommonJS(SGlob_exports);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_resolveGlob = __toESM(require("@coffeekraken/sugar/node/glob/resolveGlob"));
var import_extractGlob = __toESM(require("@coffeekraken/sugar/shared/glob/extractGlob"));
var import_extractNoneGlob = __toESM(require("@coffeekraken/sugar/shared/glob/extractNoneGlob"));
var import_s_class = __toESM(require("@coffeekraken/s-class"));
var import_glob = __toESM(require("@coffeekraken/sugar/shared/is/glob"));
class SGlob extends import_s_class.default {
  constructor(globs, settings = {}) {
    super((0, import_deepMerge.default)({
      glob: {
        resolve: {}
      }
    }, settings));
    this._globs = null;
    this._globs = Array.isArray(globs) ? globs : [globs];
  }
  static isGlob(glob) {
    return (0, import_glob.default)(glob);
  }
  static resolve(globs, settings = {}) {
    return (0, import_resolveGlob.default)(globs, settings);
  }
  static extractGlob(string) {
    return (0, import_extractGlob.default)(string);
  }
  static extractNoneGlob(string) {
    return (0, import_extractNoneGlob.default)(string);
  }
  resolve(settings = {}) {
    settings = (0, import_deepMerge.default)(this._settings.glob.resolve, {}, settings);
    return SGlob.resolve(this._globs, settings);
  }
  extractGlob() {
    if (this._globs.length === 1) {
      return SGlob.extractGlob(this._globs[0]);
    }
    return this._globs.map((glob) => {
      SGlob.extractGlob(glob);
    });
  }
  extractNoneGlob() {
    if (this._globs.length === 1) {
      return SGlob.extractNoneGlob(this._globs[0]);
    }
    return this._globs.map((glob) => {
      SGlob.extractNoneGlob(glob);
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IResolveGlobSettings
});
