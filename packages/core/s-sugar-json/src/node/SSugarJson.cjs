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
var SSugarJson_exports = {};
__export(SSugarJson_exports, {
  default: () => SSugarJson
});
module.exports = __toCommonJS(SSugarJson_exports);
var import_s_class = __toESM(require("@coffeekraken/s-class"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_glob_all = __toESM(require("glob-all"), 1);
var import_unique = __toESM(require("@coffeekraken/sugar/shared/array/unique"), 1);
var import_packageRoot = __toESM(require("@coffeekraken/sugar/node/path/packageRoot"), 1);
var import_child_process = __toESM(require("child_process"), 1);
var import_s_bench = __toESM(require("@coffeekraken/s-bench"), 1);
var import_readJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/readJsonSync"), 1);
class SSugarJson extends import_s_class.default {
  get sugarJsonSettings() {
    return this._settings.sugarJson;
  }
  constructor(settings) {
    super((0, import_deepMerge.default)({
      sugarJson: {
        includePackage: true,
        includeModules: true,
        includeGlobal: true,
        includeTop: true
      }
    }, settings != null ? settings : {}));
  }
  sanitizeJson(sugarJson) {
    sugarJson = Object.assign({}, sugarJson);
    if (!sugarJson.extends)
      sugarJson.extends = [];
    else if (!Array.isArray(sugarJson.extends))
      sugarJson.extends = [sugarJson.extends];
    return sugarJson;
  }
  async read(settings) {
    import_s_bench.default.start("SSugarJson.read");
    const finalSettings = __spreadValues(__spreadValues({}, this.sugarJsonSettings), settings);
    let sugarJsonPaths = [];
    if (!sugarJsonPaths.length) {
      sugarJsonPaths = await this.search(finalSettings);
    }
    const results = {};
    sugarJsonPaths.forEach((path) => {
      const jsonStr = import_fs.default.readFileSync(path, "utf8").toString();
      const json = JSON.parse(jsonStr);
      const packageJson = JSON.parse(import_fs.default.readFileSync(path.replace("sugar.json", "package.json")).toString());
      const resultJson = this.sanitizeJson(__spreadValues({
        metas: {
          path,
          folderPath: path.split("/").slice(0, -1).join("/")
        }
      }, json));
      results[packageJson.name] = resultJson;
    });
    import_s_bench.default.end("SSugarJson.read");
    return results;
  }
  current() {
    try {
      return this.sanitizeJson((0, import_readJsonSync.default)(`${(0, import_packageRoot.default)()}/sugar.json`));
    } catch (e) {
      return {};
    }
  }
  async search(settings) {
    const finalSettings = __spreadValues(__spreadValues({}, this.sugarJsonSettings), settings != null ? settings : {});
    import_s_bench.default.start("SSugarJson.search");
    const globalNodeModulesPath = import_child_process.default.execSync(`npm root -g`).toString().trim();
    const packagesArray = typeof finalSettings.packages === "string" ? finalSettings.packages.split(",") : [];
    const localNodeModulesPath = `${(0, import_packageRoot.default)()}/node_modules`;
    const topLocalNodeModulesPath = `${(0, import_packageRoot.default)(process.cwd(), true)}/node_modules`;
    const globs = [];
    if (localNodeModulesPath && finalSettings.includeModules) {
      globs.push(`${localNodeModulesPath}/@coffeekraken/*/sugar.json`);
      if (finalSettings.packages === "*") {
        globs.push(`${localNodeModulesPath}/*/sugar.json`);
        globs.push(`${localNodeModulesPath}/*/*/sugar.json`);
      } else if (finalSettings.packages !== false) {
        packagesArray.forEach((name) => {
          globs.push(`${localNodeModulesPath}/${name}/sugar.json`);
        });
      }
    }
    if (localNodeModulesPath !== topLocalNodeModulesPath && finalSettings.includeModules && finalSettings.includeTop) {
      globs.push(`${topLocalNodeModulesPath}/@coffeekraken/*/sugar.json`);
      if (finalSettings.packages === "*") {
        globs.push(`${topLocalNodeModulesPath}/*/sugar.json`);
        globs.push(`${topLocalNodeModulesPath}/*/*/sugar.json`);
      } else {
        packagesArray.forEach((name) => {
          globs.push(`${topLocalNodeModulesPath}/${name}/sugar.json`);
        });
      }
    }
    if (globalNodeModulesPath && finalSettings.includeModules && finalSettings.includeGlobal) {
      globs.push(`${globalNodeModulesPath}/@coffeekraken/*/sugar.json`);
      if (finalSettings.packages === "*") {
        globs.push(`${globalNodeModulesPath}/*/sugar.json`);
        globs.push(`${globalNodeModulesPath}/*/*/sugar.json`);
      } else {
        packagesArray.forEach((name) => {
          globs.push(`${globalNodeModulesPath}/${name}/sugar.json`);
        });
      }
    }
    if (finalSettings.includePackage) {
      globs.push(`${(0, import_packageRoot.default)(process.cwd())}/sugar.json`);
    }
    if (localNodeModulesPath !== topLocalNodeModulesPath && finalSettings.includePackage && finalSettings.includeTop) {
      globs.push(`${(0, import_packageRoot.default)(process.cwd(), true)}/sugar.json`);
    }
    const files = import_glob_all.default.sync(globs, {}).filter((path) => {
      const packageJsonPath = path.replace(/sugar\.json$/, "package.json");
      if (import_fs.default.existsSync(packageJsonPath))
        return true;
      return false;
    });
    import_s_bench.default.end("SSugarJson.search");
    const finalFiles = (0, import_unique.default)(files.map((f) => import_fs.default.realpathSync(f)).filter((f) => {
      if (f.toLowerCase().split("__wip__").length > 1 || f.toLowerCase().split("__tests__").length > 1) {
        return false;
      }
      return true;
    }));
    return finalFiles;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
