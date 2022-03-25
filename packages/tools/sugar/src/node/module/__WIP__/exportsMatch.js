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
import __SugarConfig from "@coffeekraken/s-sugar-config";
import __fs from "fs";
import __minimatch from "minimatch";
import __path from "path";
import __isNode from "../../shared/is/node";
import __isPlainObject from "../../shared/is/plainObject";
import __checkPathWithMultipleExtensions from "../fs/checkPathWithMultipleExtensions";
import __extension from "../fs/extension";
function exportsMatch(packageDir, exportsObj, modulePath, settings) {
  let modulesSubpaths = exportsObj;
  const set = __spreadValues({
    method: "import",
    target: __isNode() ? "node" : "default",
    extensions: __SugarConfig.get("module.resolve.extensions")
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
    if (__isPlainObject(modulesSubpaths)) {
      for (const key in modulesSubpaths) {
        if (__minimatch(modulePath, key.replace(/^\.\//, ""))) {
          const matchStr = key.replace(/^\.\//, "").replace(/\/\*$/, "");
          const modulePathExt = __extension(modulePath);
          const internalPackageSubPathExt = __extension(modulesSubpaths[key]);
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
            potentialPath = __checkPathWithMultipleExtensions(potentialPath, set.extensions);
          }
          if (!potentialPath)
            return void 0;
          if (__fs.existsSync(potentialPath))
            return potentialPath;
          modulesSubpaths = matchStr;
          break;
        }
      }
    }
    if (modulesSubpaths.node === void 0 && modulesSubpaths.default === void 0 && modulesSubpaths.import === void 0 && modulesSubpaths.require === void 0 || !__isPlainObject(modulesSubpaths)) {
      founded = true;
    }
  }
  if (typeof modulesSubpaths === "string") {
    const potentialPath = __path.resolve(packageDir, modulesSubpaths);
    if (__fs.existsSync(potentialPath))
      return potentialPath;
  }
  return void 0;
}
export {
  exportsMatch as default
};
