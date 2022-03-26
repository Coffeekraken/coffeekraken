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
var pool_exports = {};
__export(pool_exports, {
  default: () => pool_default
});
module.exports = __toCommonJS(pool_exports);
var import_s_file = __toESM(require("@coffeekraken/s-file"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_chokidar = __toESM(require("chokidar"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_expandGlob = __toESM(require("../../shared/glob/expandGlob"), 1);
var import_deepMerge = __toESM(require("../../shared/object/deepMerge"), 1);
var import_matchGlob = __toESM(require("../glob/matchGlob"), 1);
function pool(input, settings) {
  const filesStack = {};
  return new import_s_promise.default(async ({ resolve, reject, emit, cancel, on }) => {
    var _a;
    await import_s_sugar_config.default.load();
    const set = (0, import_deepMerge.default)({
      SFile: true,
      cwd: process.cwd(),
      watch: false,
      chokidar: {},
      exclude: [],
      ignored: ["**/node_modules/**/*", "**/.git/**/*"]
    }, settings || {});
    set.chokidar.cwd = set.cwd;
    if (!Array.isArray(input))
      input = [input];
    input = input.map((i) => {
      var _a2;
      return (_a2 = i.path) != null ? _a2 : i;
    });
    const expandedGlobs = (0, import_expandGlob.default)(input).map((l) => {
      return l.split(":")[0].replace(set.cwd + "/", "").replace(set.cwd, "");
    });
    const watcher = import_chokidar.default.watch(expandedGlobs, __spreadProps(__spreadValues({}, set.chokidar), {
      ignored: [...set.ignored, ...(_a = set.exclude) != null ? _a : []]
    }));
    watcher.on("add", (path) => {
      if (filesStack[path] || !import_fs.default.existsSync(`${set.cwd}/${path}`))
        return;
      if (!filesStack[path]) {
        if (set.SFile)
          filesStack[path] = import_s_file.default.new(`${set.cwd}/${path}`);
        else
          filesStack[path] = path;
      }
      emit("add", filesStack[path]);
      emit("file", filesStack[path]);
    }).on("change", (path) => {
      if (!import_fs.default.existsSync(`${set.cwd}/${path}`))
        return;
      if (!filesStack[path]) {
        if (set.SFile)
          filesStack[path] = import_s_file.default.new(`${set.cwd}/${path}`);
        else
          filesStack[path] = path;
      }
      emit("update", filesStack[path]);
      emit("change", filesStack[path]);
      emit("file", filesStack[path]);
    }).on("unlink", (path) => {
      if (filesStack[path] && filesStack[path].path) {
        emit("unlink", filesStack[path].path);
      } else if (filesStack[path] && typeof filesStack[path] === "string") {
        emit("unlink", filesStack[path]);
      }
      delete filesStack[path];
    }).on("ready", () => {
      const files = watcher.getWatched();
      const filesPaths = [];
      const finalFiles = [];
      Object.keys(files).forEach((path) => {
        files[path].forEach((fileName) => {
          filesPaths.push(`${path}/${fileName}`);
        });
      });
      filesPaths.filter((filePath) => {
        return (0, import_matchGlob.default)(filePath, input, {
          cwd: set.cwd
        });
      }).forEach((filePath) => {
        if (set.SFile)
          finalFiles.push(import_s_file.default.new(`${set.cwd}/${filePath}`));
        else
          finalFiles.push(filePath);
        emit("file", finalFiles[finalFiles.length - 1]);
        filesStack[filePath] = finalFiles[finalFiles.length - 1];
      });
      emit("ready", finalFiles);
      if (finalFiles.length && !set.ignoreInitial) {
        emit("files", finalFiles);
      }
      if (!set.watch) {
        watcher.close();
        resolve(finalFiles);
      }
    }).on("cancel", () => {
      watcher.close();
    });
  }, {
    eventEmitter: {}
  });
}
var pool_default = pool;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
