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
var frontspecMiddleware_exports = {};
__export(frontspecMiddleware_exports, {
  default: () => frontspecMiddleware_default
});
module.exports = __toCommonJS(frontspecMiddleware_exports);
var import_s_bench = __toESM(require("@coffeekraken/s-bench"));
var import_s_frontspec = __toESM(require("@coffeekraken/s-frontspec"));
function frontspecMiddleware(settings = {}) {
  return async function(req, res, next) {
    const frontspec = new import_s_frontspec.default();
    if (!res.templateData)
      res.templateData = {};
    if (!res.templateData.frontspec)
      res.templateData.frontspec = {};
    res.templateData.frontspec = __spreadValues(__spreadValues({}, await frontspec.read()), res.templateData.frontspec);
    import_s_bench.default.step("request", "frontspecMiddleware");
    return next();
  };
}
var frontspecMiddleware_default = frontspecMiddleware;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
