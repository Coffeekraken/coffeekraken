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
import __packageRootDir from "../../path/packageRootDir";
import __glob from "glob-all";
import __fs from "fs";
import __unique from "../../../shared/array/unique";
function listNodeModulesPackages(settings) {
  const finalSettings = __spreadValues({
    pathes: [`${__packageRootDir()}/node_modules`],
    monorepo: false
  }, settings != null ? settings : {});
  if (finalSettings.monorepo) {
    finalSettings.pathes.push(`${__packageRootDir(process.cwd(), true)}/node_modules`);
  }
  const finalPaths = [];
  finalSettings.pathes.forEach((path) => {
    finalPaths.push(`${path}/*/package.json`);
    finalPaths.push(`${path}/*/*/package.json`);
  });
  finalSettings.pathes = __unique(finalSettings.pathes);
  const finalPackagesList = {};
  __glob.sync(finalPaths).forEach((path) => {
    let packageJson;
    try {
      packageJson = JSON.parse(__fs.readFileSync(path, "utf8"));
    } catch (e) {
      console.log(path.toUpperCase());
      console.log(e);
    }
    if (packageJson) {
      if (!finalPackagesList[packageJson.name]) {
        finalPackagesList[packageJson.name] = packageJson;
      }
    }
  });
  return finalPackagesList;
}
export {
  listNodeModulesPackages as default
};
