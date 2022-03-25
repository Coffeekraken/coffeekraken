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
var set_exports = {};
__export(set_exports, {
  default: () => set_default
});
module.exports = __toCommonJS(set_exports);
var import_get = __toESM(require("./get"));
var import_unquote = __toESM(require("../string/unquote"));
var set_default = (obj, path, value, settings = {}) => {
  settings = __spreadValues({}, settings);
  if (!path || path === "" || path === ".") {
    obj = value;
    return;
  }
  path = path.replace(/\[(\w+)\]/g, ".[$1]");
  const a = (0, import_unquote.default)(path).split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map((p) => (0, import_unquote.default)(p));
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
  return (0, import_get.default)(obj, path);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
