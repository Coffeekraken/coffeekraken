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
import __SInterface from "@coffeekraken/s-interface";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __fs from "fs";
import __path from "path";
import __deepMerge from "../../shared/object/deepMerge";
import __checkPathWithMultipleExtensions from "../fs/checkPathWithMultipleExtensions";
import __existsSync from "../fs/existsSync";
import __isFile from "../is/file";
import __packageRootDir from "../path/packageRootDir";
import __builtInNodeModules from "./buildInNodeModules";
import __exportsMatch from "./exportsMatch";
import __readJsonSync from "@coffeekraken/sugar/node/fs/readJsonSync";
class ResolveSettingsInterface extends __SInterface {
  static get _definition() {
    return {
      dirs: {
        type: "Array<String>",
        default: __SSugarConfig.get("module.resolve.dirs")
      },
      extensions: {
        type: "Array<String>",
        default: __SSugarConfig.get("module.resolve.extensions")
      },
      fields: {
        type: "Array<String>",
        default: __SSugarConfig.get("module.resolve.fields")
      },
      buildInModules: {
        type: "Boolean",
        default: __SSugarConfig.get("module.resolve.builtInModules")
      },
      preferExports: {
        type: "Boolean",
        default: __SSugarConfig.get("module.resolve.preferExports")
      },
      method: {
        type: "String",
        values: ["import", "require"],
        default: __SSugarConfig.get("module.resolve.method")
      },
      target: {
        type: "String",
        values: ["node", "default"],
        default: __SSugarConfig.get("module.resolve.target")
      },
      rootDir: {
        type: "String",
        default: __packageRootDir()
      }
    };
  }
}
function resolve(moduleName, settings) {
  const set = __deepMerge(__spreadValues({}, ResolveSettingsInterface.defaults()), settings || {});
  console.log(set);
  if (!__fs.existsSync(`${set.rootDir}/package.json`)) {
    throw new Error(`[resolve] Sorry but the "<yellow>resolve</yellow>" function can be used only inside a package with a proper "<cyan>package.json</cyan>" file at his root`);
  }
  const rootPackageJson = __readJsonSync(`${set.rootDir}/package.json`);
  const builtInModulesArray = Object.keys(__builtInNodeModules);
  if (builtInModulesArray.indexOf(moduleName) !== -1 && set.builtInModules)
    return moduleName;
  let requestedModuleDirPath, requestedModuleName, requestedInternalModulePath, absPath, requestedModulePackageJson;
  const allDependencies = __spreadValues(__spreadValues({}, rootPackageJson.dependencies || {}), rootPackageJson.devDependencies || {});
  for (let i = 0; i < Object.keys(allDependencies).length; i++) {
    const dep = Object.keys(allDependencies)[i];
    if (moduleName.slice(0, dep.length - 1)[0] === dep) {
      requestedModuleName = dep;
      break;
    }
  }
  if (!requestedModuleName) {
    for (let i = 0; i < set.dirs.length; i++) {
      const dirPath = set.dirs[i];
      if (!moduleName.match(/^[\.\/]/)) {
        const parts = moduleName.split("/");
        if (parts.length >= 1 && __existsSync(__path.resolve(dirPath, parts[0], "package.json"))) {
          requestedModulePackageJson = __readJsonSync(__path.resolve(dirPath, parts[0], "package.json"));
          requestedModuleName = requestedModulePackageJson.name;
          requestedModuleDirPath = __path.resolve(dirPath, parts[0]);
          requestedInternalModulePath = parts.slice(1).join("/");
        } else if (parts.length >= 2 && __existsSync(__path.resolve(dirPath, parts[0], parts[1], "package.json"))) {
          requestedModulePackageJson = __readJsonSync(__path.resolve(dirPath, parts[0], parts[1], "package.json"));
          requestedModuleName = requestedModulePackageJson.name;
          requestedModuleDirPath = __path.resolve(dirPath, parts[0], parts[1]);
          requestedInternalModulePath = parts.slice(2).join("/");
        }
      } else {
        const filePath = __checkPathWithMultipleExtensions(__path.resolve(dirPath, moduleName), set.extensions);
        if (filePath)
          return filePath;
        if (__existsSync(__path.resolve(dirPath, moduleName, "package.json"))) {
          requestedModulePackageJson = __readJsonSync(__path.resolve(dirPath, moduleName, "package.json"));
          requestedModuleName = requestedModulePackageJson.name;
          requestedModuleDirPath = __path.resolve(dirPath, moduleName);
        } else {
          absPath = __path.resolve(dirPath, moduleName);
        }
      }
    }
  }
  if (!requestedModuleName) {
    throw new Error(`[resolve] Sorry but the requested package "<yellow>${moduleName}</yellow>" se`);
  }
  if (absPath && __isFile(absPath))
    return absPath;
  let depPath;
  if (rootPackageJson.dependencies && rootPackageJson.dependencies[requestedModulePackageJson.name]) {
    depPath = rootPackageJson.dependencies[requestedModulePackageJson.name];
  }
  if (rootPackageJson.devDependencies && rootPackageJson.devDependencies[requestedModulePackageJson.name]) {
    depPath = rootPackageJson.devDependencies[requestedModulePackageJson.name];
  }
  if (depPath && depPath.match(/^file:/)) {
    requestedModuleDirPath = __path.resolve(set.rootDir, depPath.replace(/^file:/, ""));
  }
  if (requestedModulePackageJson && requestedModuleDirPath) {
    let exportsMatch = function() {
      const matchPath = __exportsMatch(requestedModuleDirPath, requestedModulePackageJson.exports, requestedInternalModulePath, {
        extensions: set.extensions,
        method: set.method,
        target: set.target
      });
      if (matchPath)
        return matchPath;
    };
    if (requestedInternalModulePath) {
      const potentialPath = __checkPathWithMultipleExtensions(__path.resolve(requestedModuleDirPath, requestedInternalModulePath), set.extensions);
      if (potentialPath)
        return potentialPath;
    }
    if (requestedModulePackageJson.exports !== void 0 && set.preferExports) {
      const exportsRes = exportsMatch();
      if (exportsRes)
        return exportsRes;
    }
    for (let j = 0; j < set.fields.length; j++) {
      const field = set.fields[j];
      if (!requestedModulePackageJson[field])
        continue;
      const filePath = __path.resolve(requestedModuleDirPath, requestedModulePackageJson[field]);
      if (!__isFile(filePath))
        continue;
      return filePath;
    }
    if (requestedModulePackageJson.exports !== void 0 && !set.preferExports) {
      const exportsRes = exportsMatch();
      if (exportsRes)
        return exportsRes;
    }
  }
  throw new Error(`Sorry but the requested module "<yellow>${moduleName}</yellow>" cannot be resolved correctly...`);
}
export {
  ResolveSettingsInterface,
  resolve as default
};
