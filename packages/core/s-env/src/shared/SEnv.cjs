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
var SEnv_exports = {};
__export(SEnv_exports, {
  default: () => SEnv
});
module.exports = __toCommonJS(SEnv_exports);
var import_node = __toESM(require("@coffeekraken/sugar/shared/is/node"), 1);
var import_jsonSync = __toESM(require("@coffeekraken/sugar/node/package/jsonSync"), 1);
if (!(0, import_node.default)() && !window.env) {
  window.env = {
    SUGAR: {}
  };
} else
  process.env.SUGAR = JSON.stringify({});
const _SEnv = class {
  static get env() {
    var _a, _b, _c, _d, _e, _f;
    if (this._env)
      return this._env;
    if ((0, import_node.default)()) {
      this._env = {
        ENVIRONMENT: (_a = process.env.NODE_ENV) != null ? _a : "dev",
        ENV: (_b = process.env.NODE_ENV) != null ? _b : "dev",
        PLATFORM: "node"
      };
    } else {
      this._env = {
        ENVIRONMENT: (_d = (_c = window == null ? void 0 : window.env) == null ? void 0 : _c.ENV) != null ? _d : "dev",
        ENV: (_f = (_e = window == null ? void 0 : window.env) == null ? void 0 : _e.ENV) != null ? _f : "dev",
        PLATFORM: "browser"
      };
    }
    return this._env;
  }
  static is(env) {
    env = env.toLowerCase();
    if (env === "dev" || env === "development") {
      if (this.get("environment") === "dev" || this.get("environment") === "development")
        return true;
    } else if (env === "prod" || env === "production") {
      if (this.get("environment") === "prod" || this.get("environment") === "production")
        return true;
    } else {
      return this.get("environment") === env;
    }
    return false;
  }
  static get(name) {
    return this.env[name.toUpperCase()];
  }
  static set(name, value) {
    _SEnv.env[name.toUpperCase()] = value;
    return value;
  }
  static delete(name) {
    delete _SEnv.env[name.toUpperCase()];
  }
};
let SEnv = _SEnv;
SEnv.packageJson = (0, import_jsonSync.default)();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
