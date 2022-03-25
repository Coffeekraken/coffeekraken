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
import __get from "./get";
import __unquote from "../string/unquote";
var set_default = (obj, path, value, settings = {}) => {
  settings = __spreadValues({}, settings);
  if (!path || path === "" || path === ".") {
    obj = value;
    return;
  }
  path = path.replace(/\[(\w+)\]/g, ".[$1]");
  const a = __unquote(path).split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map((p) => __unquote(p));
  let o = obj;
  while (a.length - 1) {
    const n = a.shift();
    if (!(n in o)) {
      if (a[0].match(/^\[[0-9]+\]$/))
        o[n] = [];
      else
        o[n] = {};
    }
    o = o[n];
  }
  if (a[0].match(/^\[[0-9]+\]$/)) {
    if (!Array.isArray(o))
      o = [];
    o.push(value);
  } else {
    o[a[0]] = value;
  }
  return __get(obj, path);
};
export {
  set_default as default
};
