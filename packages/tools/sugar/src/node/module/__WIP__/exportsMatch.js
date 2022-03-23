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
var exportsMatch_exports = {};
__export(exportsMatch_exports, {
  default: () => exportsMatch
});
module.exports = __toCommonJS(exportsMatch_exports);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_minimatch = __toESM(require("minimatch"), 1);
var import_path = __toESM(require("path"), 1);
var import_node = __toESM(require("../../shared/is/node"), 1);
var import_plainObject = __toESM(require("../../shared/is/plainObject"), 1);
var import_checkPathWithMultipleExtensions = __toESM(require("../fs/checkPathWithMultipleExtensions"), 1);
var import_extension = __toESM(require("../fs/extension"), 1);
function exportsMatch(packageDir, exportsObj, modulePath, settings) {
  let modulesSubpaths = exportsObj;
  const set = __spreadValues({
    method: "import",
    target: (0, import_node.default)() ? "node" : "default",
    extensions: import_s_sugar_config.default.get("module.resolve.extensions")
  }, settings || {});
  const keys = Object.keys(exportsObj);
  if (keys.indexOf("node") !== -1 || keys.indexOf("default") !== -1) {
    if (keys.length > 2)
      throw new Error(`Your "exports" field in the "<yellow>${packageDir}/package.json</yellow>" file seems to be invalid. You cannot have any other keys than "node" and "default" at the same level...`);
  }
  if (keys.indexOf("require") !== -1 || keys.indexOf("import") !== -1) {
    if (keys.length > 2)
      throw new Error(`Your "exports" field in the "<yellow>${packageDir}/package.json</yellow>" file seems to be invalid. You cannot have any other keys than "require" and "import" at the same level...`);
  }
  let founded = false;
  while (!founded) {
    if (Object.keys(modulesSubpaths).indexOf("node") !== -1 || Object.keys(modulesSubpaths).indexOf("default") !== -1) {
      if (set.target === "node" && modulesSubpaths.node !== void 0) {
        modulesSubpaths = modulesSubpaths.node;
      } else if (modulesSubpaths.default) {
        modulesSubpaths = modulesSubpaths.default;
      }
    }
    if (Object.keys(modulesSubpaths).indexOf("import") !== -1 || Object.keys(modulesSubpaths).indexOf("require") !== -1) {
      if (set.method === "import" && modulesSubpaths.import !== void 0) {
        modulesSubpaths = modulesSubpaths.import;
      } else if (modulesSubpaths.require) {
        modulesSubpaths = modulesSubpaths.require;
      }
    }
    if ((0, import_plainObject.default)(modulesSubpaths)) {
      for (const key in modulesSubpaths) {
        if ((0, import_minimatch.default)(modulePath, key.replace(/^\.\//, ""))) {
          const matchStr = key.replace(/^\.\//, "").replace(/\/\*$/, "");
          const modulePathExt = (0, import_extension.default)(modulePath);
          const internalPackageSubPathExt = (0, import_extension.default)(modulesSubpaths[key]);
          if (internalPackageSubPathExt && modulePathExt && internalPackageSubPathExt !== modulePathExt)
            continue;
          const internalPath = modulesSubpaths[key].replace(/^\.\//, "").replace(/\/\*(\.[a-zA-Z0-9]+)?/, "");
          const realPath = modulePath.replace(`${matchStr}/`, "").replace(matchStr, "");
          let potentialPath;
          if (internalPackageSubPathExt) {
            const potentialPathArray = [packageDir];
            if (internalPath && internalPath.trim() !== "")
              potentialPathArray.push(internalPath);
            if (realPath && realPath.trim() !== "")
              potentialPathArray.push(realPath);
            potentialPath = potentialPathArray.join("/");
            if (!modulePathExt)
              potentialPath += `.${internalPackageSubPathExt}`;
          } else {
            const potentialPathArray = [packageDir];
            if (internalPath && internalPath.trim() !== "")
              potentialPathArray.push(internalPath);
            if (realPath && realPath.trim() !== "")
              potentialPathArray.push(realPath);
            potentialPath = potentialPathArray.join("/");
            potentialPath = (0, import_checkPathWithMultipleExtensions.default)(potentialPath, set.extensions);
          }
          if (!potentialPath)
            return void 0;
          if (import_fs.default.existsSync(potentialPath))
            return potentialPath;
          modulesSubpaths = matchStr;
          break;
        }
      }
    }
    if (modulesSubpaths.node === void 0 && modulesSubpaths.default === void 0 && modulesSubpaths.import === void 0 && modulesSubpaths.require === void 0 || !(0, import_plainObject.default)(modulesSubpaths)) {
      founded = true;
    }
  }
  if (typeof modulesSubpaths === "string") {
    const potentialPath = import_path.default.resolve(packageDir, modulesSubpaths);
    if (import_fs.default.existsSync(potentialPath))
      return potentialPath;
  }
  return void 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
