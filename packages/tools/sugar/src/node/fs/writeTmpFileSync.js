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
import __writeFileSync from "./writeFileSync";
import __path from "path";
import __uniqid from "../../shared/string/uniqid";
import __packageTmpDir from "../path/packageTmpDir";
function writeTmpFileSync(data, settings = {}) {
  var _a;
  settings = __spreadValues({
    path: void 0
  }, settings);
  let path = __path.resolve(__packageTmpDir(), "files", (_a = settings.path) != null ? _a : __uniqid() + ".tmp");
  __writeFileSync(path, data);
  return path;
}
var writeTmpFileSync_default = writeTmpFileSync;
export {
  writeTmpFileSync_default as default
};
