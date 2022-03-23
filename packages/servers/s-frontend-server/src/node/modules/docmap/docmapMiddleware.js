var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var docmapMiddleware_exports = {};
__export(docmapMiddleware_exports, {
  default: () => docmapMiddleware_default
});
module.exports = __toCommonJS(docmapMiddleware_exports);
var import_s_bench = __toESM(require("@coffeekraken/s-bench"), 1);
var import_s_docmap = __toESM(require("@coffeekraken/s-docmap"), 1);
let docmapCache;
function docmapMiddleware(settings = {}) {
  return async function(req, res, next) {
    if (!res.templateData)
      res.templateData = {};
    if (docmapCache) {
      res.templateData.docmap = docmapCache;
      return next();
    }
    const docmap = new import_s_docmap.default();
    const docmapJson = await docmap.read();
    res.templateData.docmap = docmapJson;
    docmapCache = docmapJson;
    import_s_bench.default.step("request", "docmapMiddleware");
    return next();
  };
}
var docmapMiddleware_default = docmapMiddleware;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
