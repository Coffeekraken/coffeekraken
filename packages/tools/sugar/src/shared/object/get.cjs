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
var get_exports = {};
__export(get_exports, {
  default: () => get_default
});
module.exports = __toCommonJS(get_exports);
var import_unquote = __toESM(require("../string/unquote"));
var import_unique = __toESM(require("@coffeekraken/sugar/shared/array/unique"));
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
  potentialPaths = (0, import_unique.default)(potentialPaths.map((s) => s.replace(/\?/gm, "")));
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
  const a = path.split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map((p) => (0, import_unquote.default)(p));
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
