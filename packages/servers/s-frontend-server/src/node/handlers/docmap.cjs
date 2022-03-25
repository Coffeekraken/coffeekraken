var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var docmap_exports = {};
__export(docmap_exports, {
  default: () => docMap
});
module.exports = __toCommonJS(docmap_exports);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_s_docmap = __toESM(require("@coffeekraken/s-docmap"));
async function docMap(req, res, settings = {}) {
  return new import_s_promise.default(async ({ resolve, reject, pipe }) => {
    const docMap2 = new import_s_docmap.default();
    const json = await docMap2.read({
      snapshot: req.query.v
    });
    const finalJson = __spreadProps(__spreadValues({}, json), {
      map: {}
    });
    Object.keys(json.map).forEach((key) => {
      const obj = json.map[key];
      if (!obj.platform)
        return;
      if (!obj.status)
        return;
      finalJson.map[key] = obj;
    });
    res.status(200);
    res.type("application/json");
    res.send(finalJson);
    resolve(finalJson);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
