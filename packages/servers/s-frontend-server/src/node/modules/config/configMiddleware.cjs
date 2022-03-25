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
var configMiddleware_exports = {};
__export(configMiddleware_exports, {
  default: () => configMiddleware_default
});
module.exports = __toCommonJS(configMiddleware_exports);
var import_s_bench = __toESM(require("@coffeekraken/s-bench"));
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"));
var import_s_file = __toESM(require("@coffeekraken/s-file"));
function configMiddleware(settings = {}) {
  return async function(req, res, next) {
    var _a;
    const configJson = import_s_sugar_config.default.get("");
    if (!res.templateData)
      res.templateData = {};
    res.templateData.config = configJson;
    res.templateData.configFiles = import_s_sugar_config.default.filesPaths.map((path) => import_s_file.default.new(path).toObject(false));
    if ((_a = req.path) == null ? void 0 : _a.match(/.*\.config\.js$/)) {
      res.templateData.requestedConfig = await import_s_sugar_config.default.toDocblocks(req.path.split("/").pop());
    }
    import_s_bench.default.step("request", "configMiddleware");
    return next();
  };
}
var configMiddleware_default = configMiddleware;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
