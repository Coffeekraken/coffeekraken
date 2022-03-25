var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import __SClass from "@coffeekraken/s-class";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __fs from "fs";
import __glob from "glob-all";
import __unique from "@coffeekraken/sugar/shared/array/unique";
import __packageRoot from "@coffeekraken/sugar/node/path/packageRoot";
import __childProcess from "child_process";
import __SBench from "@coffeekraken/s-bench";
import __readJsonSync from "@coffeekraken/sugar/node/fs/readJsonSync";
class SSugarJson extends __SClass {
  get sugarJsonSettings() {
    return this._settings.sugarJson;
  }
  constructor(settings) {
    super(__deepMerge({
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
    __SBench.start("SSugarJson.read");
    const finalSettings = __spreadValues(__spreadValues({}, this.sugarJsonSettings), settings);
    let sugarJsonPaths = [];
    if (!sugarJsonPaths.length) {
      sugarJsonPaths = await this.search(finalSettings);
    }
    const results = {};
    sugarJsonPaths.forEach((path) => {
      const jsonStr = __fs.readFileSync(path, "utf8").toString();
      const json = JSON.parse(jsonStr);
      const packageJson = JSON.parse(__fs.readFileSync(path.replace("sugar.json", "package.json")).toString());
      const resultJson = this.sanitizeJson(__spreadValues({
        metas: {
          path,
          folderPath: path.split("/").slice(0, -1).join("/")
        }
      }, json));
      results[packageJson.name] = resultJson;
    });
    __SBench.end("SSugarJson.read");
    return results;
  }
  current() {
    try {
      return this.sanitizeJson(__readJsonSync(`${__packageRoot()}/sugar.json`));
    } catch (e) {
      return {};
    }
  }
  async search(settings) {
    const finalSettings = __spreadValues(__spreadValues({}, this.sugarJsonSettings), settings != null ? settings : {});
    __SBench.start("SSugarJson.search");
    const globalNodeModulesPath = __childProcess.execSync(`npm root -g`).toString().trim();
    const packagesArray = typeof finalSettings.packages === "string" ? finalSettings.packages.split(",") : [];
    const localNodeModulesPath = `${__packageRoot()}/node_modules`;
    const topLocalNodeModulesPath = `${__packageRoot(process.cwd(), true)}/node_modules`;
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
      globs.push(`${__packageRoot(process.cwd())}/sugar.json`);
    }
    if (localNodeModulesPath !== topLocalNodeModulesPath && finalSettings.includePackage && finalSettings.includeTop) {
      globs.push(`${__packageRoot(process.cwd(), true)}/sugar.json`);
    }
    const files = __glob.sync(globs, {}).filter((path) => {
      const packageJsonPath = path.replace(/sugar\.json$/, "package.json");
      if (__fs.existsSync(packageJsonPath))
        return true;
      return false;
    });
    __SBench.end("SSugarJson.search");
    const finalFiles = __unique(files.map((f) => __fs.realpathSync(f)).filter((f) => {
      if (f.toLowerCase().split("__wip__").length > 1 || f.toLowerCase().split("__tests__").length > 1) {
        return false;
      }
      return true;
    }));
    return finalFiles;
  }
}
export {
  SSugarJson as default
};
