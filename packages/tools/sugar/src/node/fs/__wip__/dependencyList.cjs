var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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
var dependencyList_exports = {};
__export(dependencyList_exports, {
  default: () => dependencyList
});
module.exports = __toCommonJS(dependencyList_exports);
var import_dependency_tree = __toESM(require("dependency-tree"));
var import_chokidar = __toESM(require("chokidar"));
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_fs = __toESM(require("fs"));
var import_folderPath = __toESM(require("../folderPath"));
var import_minimatch = __toESM(require("minimatch"));
function dependencyList(filePath, settings) {
  return new import_s_promise.default(({ resolve, reject, emit }) => {
    const set = __spreadValues({
      watch: false,
      includeItself: false,
      ignoreInitial: false,
      exclude: []
    }, settings);
    function getList() {
      const list = import_dependency_tree.default.toList({
        filename: filePath,
        directory: (0, import_folderPath.default)(filePath),
        filter: (path) => {
          path = import_fs.default.realpathSync(path);
          for (let i = 0; i < set.exclude.length; i++) {
            if ((0, import_minimatch.default)(path, set.exclude[i]))
              return false;
          }
          return true;
        }
      }).map((p) => import_fs.default.realpathSync(p)).filter((path) => {
        if (path === filePath && !set.includeItself)
          return false;
        return true;
      });
      return list;
    }
    if (set.watch) {
      let depWatcher;
      const watcher = import_chokidar.default.watch(filePath, {}).on("change", () => {
        const list = getList();
        if (depWatcher)
          depWatcher.close();
        depWatcher = import_chokidar.default.watch(list, {}).on("change", (path) => {
          emit("update", {
            path,
            list
          });
        });
        emit("update", {
          path: filePath,
          list: getList()
        });
      });
      if (!set.ignoreInitial) {
        emit("update", {
          path: filePath,
          list: getList()
        });
      }
    } else {
      resolve({
        path: filePath,
        list: getList()
      });
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
