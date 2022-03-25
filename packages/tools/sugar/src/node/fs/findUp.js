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
import __SFile from "@coffeekraken/s-file";
import __fs from "fs";
import __glob from "glob";
import __isGlob from "../../shared/is/glob";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function findUp(search, settings) {
  settings = __spreadValues({
    symlinks: true,
    cwd: process.cwd(),
    stopWhenFound: true,
    SFile: true
  }, settings);
  return new Promise(async (resolve) => {
    await __SSugarConfig.load();
    const cwd = settings.cwd;
    let currentPath = cwd.split("/").filter((p) => p.trim() !== "");
    let foundedFiles = [];
    while (currentPath.length > 0) {
      const path = `/${currentPath.join("/")}`;
      if (__isGlob(search)) {
        let files = __glob.sync(search, {
          cwd: path,
          symlinks: settings.symlinks
        });
        if (files && files.length) {
          files = files.map((f) => {
            return `${path}/${f}`;
          });
          foundedFiles = [...foundedFiles, ...files];
        }
      } else if (__fs.existsSync(`${path}/${search}`)) {
        foundedFiles.push(`${path}/${search}`);
      }
      if (settings.stopWhenFound && foundedFiles.length) {
        break;
      }
      currentPath = currentPath.slice(0, -1);
    }
    if (settings.SFile === true) {
      foundedFiles = foundedFiles.map((path) => {
        return new __SFile(path);
      });
    }
    return resolve(foundedFiles);
  });
}
export {
  findUp as default
};
