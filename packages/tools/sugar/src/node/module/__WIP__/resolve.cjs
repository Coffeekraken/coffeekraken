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
var resolve_exports = {};
__export(resolve_exports, {
  ResolveSettingsInterface: () => ResolveSettingsInterface,
  default: () => resolve
});
module.exports = __toCommonJS(resolve_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_deepMerge = __toESM(require("../../shared/object/deepMerge"), 1);
var import_checkPathWithMultipleExtensions = __toESM(require("../fs/checkPathWithMultipleExtensions"), 1);
var import_existsSync = __toESM(require("../fs/existsSync"), 1);
var import_file = __toESM(require("../is/file"), 1);
var import_packageRootDir = __toESM(require("../path/packageRootDir"), 1);
var import_buildInNodeModules = __toESM(require("./buildInNodeModules"), 1);
var import_exportsMatch = __toESM(require("./exportsMatch"), 1);
var import_readJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/readJsonSync"), 1);
class ResolveSettingsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      dirs: {
        type: "Array<String>",
        default: import_s_sugar_config.default.get("module.resolve.dirs")
      },
      extensions: {
        type: "Array<String>",
        default: import_s_sugar_config.default.get("module.resolve.extensions")
      },
      fields: {
        type: "Array<String>",
        default: import_s_sugar_config.default.get("module.resolve.fields")
      },
      buildInModules: {
        type: "Boolean",
        default: import_s_sugar_config.default.get("module.resolve.builtInModules")
      },
      preferExports: {
        type: "Boolean",
        default: import_s_sugar_config.default.get("module.resolve.preferExports")
      },
      method: {
        type: "String",
        values: ["import", "require"],
        default: import_s_sugar_config.default.get("module.resolve.method")
      },
      target: {
        type: "String",
        values: ["node", "default"],
        default: import_s_sugar_config.default.get("module.resolve.target")
      },
      rootDir: {
        type: "String",
        default: (0, import_packageRootDir.default)()
      }
    };
  }
}
function resolve(moduleName, settings) {
  const set = (0, import_deepMerge.default)(__spreadValues({}, ResolveSettingsInterface.defaults()), settings || {});
  console.log(set);
  if (!import_fs.default.existsSync(`${set.rootDir}/package.json`)) {
    throw new Error(`[resolve] Sorry but the "<yellow>resolve</yellow>" function can be used only inside a package with a proper "<cyan>package.json</cyan>" file at his root`);
  }
  const rootPackageJson = (0, import_readJsonSync.default)(`${set.rootDir}/package.json`);
  const builtInModulesArray = Object.keys(import_buildInNodeModules.default);
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
        if (parts.length >= 1 && (0, import_existsSync.default)(import_path.default.resolve(dirPath, parts[0], "package.json"))) {
          requestedModulePackageJson = (0, import_readJsonSync.default)(import_path.default.resolve(dirPath, parts[0], "package.json"));
          requestedModuleName = requestedModulePackageJson.name;
          requestedModuleDirPath = import_path.default.resolve(dirPath, parts[0]);
          requestedInternalModulePath = parts.slice(1).join("/");
        } else if (parts.length >= 2 && (0, import_existsSync.default)(import_path.default.resolve(dirPath, parts[0], parts[1], "package.json"))) {
          requestedModulePackageJson = (0, import_readJsonSync.default)(import_path.default.resolve(dirPath, parts[0], parts[1], "package.json"));
          requestedModuleName = requestedModulePackageJson.name;
          requestedModuleDirPath = import_path.default.resolve(dirPath, parts[0], parts[1]);
          requestedInternalModulePath = parts.slice(2).join("/");
        }
      } else {
        const filePath = (0, import_checkPathWithMultipleExtensions.default)(import_path.default.resolve(dirPath, moduleName), set.extensions);
        if (filePath)
          return filePath;
        if ((0, import_existsSync.default)(import_path.default.resolve(dirPath, moduleName, "package.json"))) {
          requestedModulePackageJson = (0, import_readJsonSync.default)(import_path.default.resolve(dirPath, moduleName, "package.json"));
          requestedModuleName = requestedModulePackageJson.name;
          requestedModuleDirPath = import_path.default.resolve(dirPath, moduleName);
        } else {
          absPath = import_path.default.resolve(dirPath, moduleName);
        }
      }
    }
  }
  if (!requestedModuleName) {
    throw new Error(`[resolve] Sorry but the requested package "<yellow>${moduleName}</yellow>" se`);
  }
  if (absPath && (0, import_file.default)(absPath))
    return absPath;
  let depPath;
  if (rootPackageJson.dependencies && rootPackageJson.dependencies[requestedModulePackageJson.name]) {
    depPath = rootPackageJson.dependencies[requestedModulePackageJson.name];
  }
  if (rootPackageJson.devDependencies && rootPackageJson.devDependencies[requestedModulePackageJson.name]) {
    depPath = rootPackageJson.devDependencies[requestedModulePackageJson.name];
  }
  if (depPath && depPath.match(/^file:/)) {
    requestedModuleDirPath = import_path.default.resolve(set.rootDir, depPath.replace(/^file:/, ""));
  }
  if (requestedModulePackageJson && requestedModuleDirPath) {
    let exportsMatch = function() {
      const matchPath = (0, import_exportsMatch.default)(requestedModuleDirPath, requestedModulePackageJson.exports, requestedInternalModulePath, {
        extensions: set.extensions,
        method: set.method,
        target: set.target
      });
      if (matchPath)
        return matchPath;
    };
    if (requestedInternalModulePath) {
      const potentialPath = (0, import_checkPathWithMultipleExtensions.default)(import_path.default.resolve(requestedModuleDirPath, requestedInternalModulePath), set.extensions);
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
      const filePath = import_path.default.resolve(requestedModuleDirPath, requestedModulePackageJson[field]);
      if (!(0, import_file.default)(filePath))
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ResolveSettingsInterface
});
