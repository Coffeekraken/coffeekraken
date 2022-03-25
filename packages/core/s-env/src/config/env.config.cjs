var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var env_config_exports = {};
__export(env_config_exports, {
  default: () => env_config_default
});
module.exports = __toCommonJS(env_config_exports);
var _a, _b, _c, _d;
if (global && !global.window)
  global.window = {};
var env_config_default = {
  env: (_d = (_c = (_a = process == null ? void 0 : process.env) == null ? void 0 : _a.NODE_ENV) != null ? _c : (_b = window == null ? void 0 : window.env) == null ? void 0 : _b.ENV) != null ? _d : "dev"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
