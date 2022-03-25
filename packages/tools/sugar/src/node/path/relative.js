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
import __isGlob from "../../shared/is/glob";
import __isPath from "../../shared/is/path";
import __path from "path";
import __packageRootDir from "./packageRootDir";
function relative(path, from = __packageRootDir(), settings = {}) {
  settings = __spreadValues({
    glob: true,
    absolute: true
  }, settings);
  const isArray = Array.isArray(path);
  if (!isArray)
    path = [path];
  path = path.map((p) => {
    if (__isGlob(p)) {
      if (settings.glob)
        return __path.relative(from, p);
      return p;
    } else if (__path.isAbsolute(p)) {
      if (settings.absolute)
        return __path.relative(from, p);
      return p;
    } else if (__isPath(p))
      return __path.relative(from, p);
    return p;
  });
  if (isArray)
    return path;
  return path[0];
}
var relative_default = relative;
export {
  relative_default as default
};
