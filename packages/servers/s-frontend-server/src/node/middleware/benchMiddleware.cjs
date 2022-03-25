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
var benchMiddleware_exports = {};
__export(benchMiddleware_exports, {
  default: () => benchMiddleware_default
});
module.exports = __toCommonJS(benchMiddleware_exports);
var import_s_bench = __toESM(require("@coffeekraken/s-bench"));
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
function benchEndMiddleware(settings = {}) {
  return function(req, res, next) {
    return new import_s_promise.default(({ resolve, reject, pipe }) => {
      import_s_bench.default.start("request");
      function afterResponse() {
        import_s_bench.default.end("request", {}).log();
      }
      res.on("finish", afterResponse);
      setTimeout(() => {
        next();
      }, 100);
    });
  };
}
var benchMiddleware_default = benchEndMiddleware;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
