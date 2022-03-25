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
import __fs from "fs";
async function exists(path, settings) {
  const set = __spreadValues({
    directory: true,
    file: true,
    symlink: true
  }, settings || {});
  let isSymlink = false, stats;
  try {
    stats = __fs.statSync(path);
    if (!stats)
      return false;
    isSymlink = stats.isSymbolicLink();
  } catch (e) {
  }
  if (isSymlink && !set.symlink)
    return false;
  if (stats.isDirectory() && !set.directory)
    return false;
  if (stats.isFile() && !set.file)
    return false;
  return true;
}
export {
  exists as default
};
