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
import __unquote from "../string/unquote";
import __unique from "@coffeekraken/sugar/shared/array/unique";
function get(obj, path, settings = {}) {
  settings = __spreadValues({}, settings);
  if (obj[path] !== void 0)
    return obj[path];
  if (!path || path === "" || path === ".")
    return obj;
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");
  let potentialPaths = [path.replace(/\?/gm, "")];
  const parts = path.split(".");
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];
    if (part.match(/\?$/)) {
      const before = parts.slice(0, i);
      const after = parts.slice(i + 1);
      potentialPaths.push([...before, ...after].join("."));
      potentialPaths.push([...before, ...after.filter((a) => !a.match(/\?$/))].join("."));
    }
  }
  potentialPaths = __unique(potentialPaths.map((s) => s.replace(/\?/gm, "")));
  for (let i = 0; i < potentialPaths.length; i++) {
    const path2 = potentialPaths[i];
    const result = __get(obj, path2, settings);
    if (result !== void 0)
      return result;
  }
}
function __get(obj, path, settings = {}) {
  settings = __spreadValues({}, settings);
  if (obj[path] !== void 0)
    return obj[path];
  if (!path || path === "" || path === ".")
    return obj;
  const a = path.split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map((p) => __unquote(p));
  let o = obj;
  while (a.length) {
    const n = a.shift().replace(/\?$/, "");
    if (typeof o !== "object" || !(n in o)) {
      return;
    }
    o = o[n];
  }
  return o;
}
var get_default = get;
export {
  get_default as default
};
