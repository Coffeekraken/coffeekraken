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
var requestMiddleware_exports = {};
__export(requestMiddleware_exports, {
  default: () => requestMiddleware_default
});
module.exports = __toCommonJS(requestMiddleware_exports);
var import_s_bench = __toESM(require("@coffeekraken/s-bench"));
function requestMiddleware(settings = {}) {
  return async function(req, res, next) {
    if (!res.templateData)
      res.templateData = {};
    res.templateData.request = {
      baseUrl: req.baseUrl,
      body: req.body,
      fresh: req.fresh,
      hostname: req.hostname,
      ip: req.ip,
      ips: req.ips,
      originalUrl: req.originalUrl,
      params: req.params,
      path: req.path,
      protocol: req.protocol,
      query: req.query,
      secure: req.secure,
      stale: req.stale,
      subdomains: req.subdomains,
      xhr: req.xhr
    };
    import_s_bench.default.step("request", "requestMiddleware");
    return next();
  };
}
var requestMiddleware_default = requestMiddleware;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
