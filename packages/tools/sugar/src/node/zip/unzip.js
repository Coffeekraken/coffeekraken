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
import __unzipper from "unzipper";
import __folderPath from "../fs/folderPath";
import __fileName from "../fs/filename";
import __SDuration from "@coffeekraken/s-duration";
function unzip(zipFilePath, settings) {
  return new Promise((resolve, reject) => {
    settings = __spreadValues({}, settings != null ? settings : {});
    if (!__fs.existsSync(zipFilePath)) {
      throw new Error(`The passed file "${zipFilePath}" does not exists...`);
    }
    const duration = new __SDuration();
    const folderName = __fileName(zipFilePath).replace(/\.g?zip$/, "");
    let dest = settings.dest ? `${settings.dest}/${folderName}` : `${__folderPath(zipFilePath)}/${folderName}`;
    __fs.createReadStream(zipFilePath).pipe(__unzipper.Extract({ path: dest })).on("close", () => {
      if (!__fs.existsSync(dest)) {
        throw new Error(`Something went wrong during the unzip process of the file "${zipFilePath}"...`);
      }
      resolve(__spreadValues({
        dest
      }, duration.end()));
    });
  });
}
export {
  unzip as default
};
