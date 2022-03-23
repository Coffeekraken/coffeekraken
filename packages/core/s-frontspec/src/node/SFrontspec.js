var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
var SFrontspec_exports = {};
__export(SFrontspec_exports, {
  default: () => SFrontspec
});
module.exports = __toCommonJS(SFrontspec_exports);
var import_s_env = __toESM(require("@coffeekraken/s-env"), 1);
var import_s_file = __toESM(require("@coffeekraken/s-file"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_packageRootDir = __toESM(require("@coffeekraken/sugar/node/path/packageRootDir"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_readJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/readJsonSync"), 1);
var import_deepMerge2 = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_delete = __toESM(require("@coffeekraken/sugar/shared/object/delete"), 1);
var import_folderPath = __toESM(require("@coffeekraken/sugar/node/fs/folderPath"), 1);
class SFrontspec extends import_s_promise.default {
  constructor(settings = {}) {
    super((0, import_deepMerge2.default)({
      metas: {
        id: "SFrontspec"
      }
    }, settings));
  }
  read() {
    return new import_s_promise.default(async ({ resolve, pipe, emit }) => {
      var _a;
      const frontspecPath = `${(0, import_packageRootDir.default)()}/frontspec.json`;
      let frontspecJson = {};
      try {
        frontspecJson = (0, import_readJsonSync.default)(frontspecPath);
      } catch (e) {
        console.log("ER", e);
      }
      let res = (0, import_deepMerge2.default)((_a = import_s_sugar_config.default.get("frontspec")) != null ? _a : {}, frontspecJson);
      res.frontspec = {
        path: frontspecPath,
        folderPath: (0, import_folderPath.default)(frontspecPath)
      };
      if (res.assets) {
        Object.keys(res.assets).forEach((type) => {
          const typeObj = res.assets[type];
          Object.keys(typeObj).forEach((asset) => {
            const assetObj = typeObj[asset];
            if (assetObj.env && !import_s_env.default.is(assetObj.env)) {
              (0, import_delete.default)(res.assets, `${type}.${asset}`);
            }
          });
        });
      }
      resolve(res);
    });
  }
  async assetsToServe() {
    const frontspecJson = await this.read();
    const assetsToServe = [];
    if (!frontspecJson.assets)
      return;
    Object.keys(frontspecJson.assets).forEach((type) => {
      const typeAssets = frontspecJson.assets[type];
      Object.keys(typeAssets).forEach((assetId) => {
        var _a, _b, _c;
        const assetObj = Object.assign({}, typeAssets[assetId]);
        const url = (_a = assetObj.path) != null ? _a : assetObj.src;
        if (assetObj.env && !import_s_env.default.is(assetObj.env))
          return;
        const fileObj = {
          type,
          id: assetId,
          args: __spreadValues({}, assetObj)
        };
        const filePath = import_path.default.resolve((0, import_packageRootDir.default)(), (_c = (_b = assetObj.path) != null ? _b : assetObj.src) != null ? _c : assetObj.href);
        if (type === "css") {
          fileObj.args.href = fileObj.args.src;
          delete fileObj.args.src;
        }
        if (import_fs.default.existsSync(filePath)) {
          fileObj.file = import_s_file.default.new(filePath);
        } else {
          fileObj.url = url;
        }
        assetsToServe.push(fileObj);
      });
    });
    return assetsToServe;
  }
}
SFrontspec._cachesStack = {};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
