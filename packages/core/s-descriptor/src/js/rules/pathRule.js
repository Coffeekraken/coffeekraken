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
var pathRule_exports = {};
__export(pathRule_exports, {
  default: () => pathRule_default
});
module.exports = __toCommonJS(pathRule_exports);
var import_path = __toESM(require("@coffeekraken/sugar/shared/is/path"), 1);
var import_glob = __toESM(require("@coffeekraken/sugar/shared/is/glob"), 1);
const ruleObj = {
  name: "Path",
  id: "path",
  settings: {
    mapOnArray: true
  },
  processParams: (params) => {
    var _a, _b, _c, _d, _e, _f, _g;
    return {
      absolute: (_a = params.absolute) != null ? _a : false,
      exists: (_b = params.exists) != null ? _b : false,
      create: (_c = params.create) != null ? _c : false,
      rootDir: (_d = params.rootDir) != null ? _d : process && process.cwd ? process.cwd() : "/",
      glob: (_e = params.glob) != null ? _e : false,
      tokens: (_f = params.tokens) != null ? _f : true,
      cast: (_g = params.cast) != null ? _g : true
    };
  },
  apply: (value, params, ruleSettings, settings) => {
    if (typeof value !== "string") {
      return new Error("The path value must be a <yellow>String</yellow>");
    }
    if (params.glob) {
      switch (params.glob) {
        case true:
          break;
        case false:
          if ((0, import_glob.default)(value))
            return new Error(`The passed path "<cyan>${value}</cyan>" is a glob and this is not authorized`);
          break;
      }
    }
    if (!(0, import_path.default)(value)) {
      return new Error(`The passed path "<cyan>${value}</cyan>" is not a valid path`);
    }
    if (params.exists) {
      return new Error(`<red>[SDescriptor.pathRule]</red> Sorry but the "exists" parameter cannot be used in browser context"`);
    }
    return value;
  }
};
var pathRule_default = ruleObj;
