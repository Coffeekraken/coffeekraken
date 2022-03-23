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
var import_node = __toESM(require("@coffeekraken/sugar/shared/is/node"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_replaceTokens = __toESM(require("@coffeekraken/sugar/node/token/replaceTokens"), 1);
var import_resolveGlob = __toESM(require("@coffeekraken/sugar/node/glob/resolveGlob"), 1);
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
    function toAbsolute(path) {
      if (params.absolute && path.slice(0, 1) !== "/") {
        if (!params.cast)
          return new Error(`The passed path "<cyan>${path}</cyan>" must be absolute and cannot be casted automatically`);
        path = import_path2.default.resolve(params.rootDir, path);
      }
      return path;
    }
    if (params.tokens && (0, import_node.default)()) {
      value = (0, import_replaceTokens.default)(value);
    }
    if (params.glob) {
      switch (params.glob) {
        case true:
          break;
        case false:
          if ((0, import_glob.default)(value))
            return new Error(`The passed path "<cyan>${value}</cyan>" is a glob and this is not authorized`);
          break;
        case "resolve":
        case "SFile":
          if (!(0, import_node.default)())
            return new Error(`The parameter "<magenta>glob: 'resolve'</magenta>" can be used only in a node context`);
          let files = (0, import_resolveGlob.default)(value, {
            cwd: params.rootDir
          });
          files = files.map((file) => {
            if (params.glob === "SFile")
              return file;
            if (params.absolute)
              return toAbsolute(file.path);
            return file.path;
          });
          return files;
          break;
      }
    }
    if (!(0, import_path.default)(value)) {
      return new Error(`The passed path "<cyan>${value}</cyan>" is not a valid path`);
    }
    if (params.exists) {
      if (!import_fs.default.existsSync(value))
        if (params.create) {
          import_fs.default.mkdirSync(value, { recursive: true });
        } else {
          return new Error(`The passed path "<cyan>${value}</cyan>" does not exists and it should`);
        }
    }
    return value;
  }
};
var pathRule_default = ruleObj;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
