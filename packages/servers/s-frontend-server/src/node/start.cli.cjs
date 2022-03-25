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
var start_cli_exports = {};
__export(start_cli_exports, {
  default: () => start
});
module.exports = __toCommonJS(start_cli_exports);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_SFrontendServer = __toESM(require("./SFrontendServer"));
function start(stringArgs = "") {
  return new import_s_promise.default(async ({ resolve, pipe, emit }) => {
    const server = new import_SFrontendServer.default();
    const promise = server.start(stringArgs);
    pipe(promise);
    resolve(await promise);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
