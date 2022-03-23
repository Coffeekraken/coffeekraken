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
var dependencyTree_exports = {};
__export(dependencyTree_exports, {
  default: () => dependencyTree
});
module.exports = __toCommonJS(dependencyTree_exports);
var import_s_cache = __toESM(require("@coffeekraken/s-cache"), 1);
var import_s_file = __toESM(require("@coffeekraken/s-file"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_md5 = __toESM(require("../../shared/crypt/md5"), 1);
var import_deepMerge = __toESM(require("../../shared/object/deepMerge"), 1);
var import_packageRootDir = __toESM(require("../path/packageRootDir"), 1);
var import_extractImport = __toESM(require("./extractImport"), 1);
function dependencyTree(filePath, settings) {
  return new import_s_promise.default(async ({ resolve, reject, emit }) => {
    const set = (0, import_deepMerge.default)({
      deep: false,
      cache: false
    }, settings || {});
    const logPath = import_path.default.relative((0, import_packageRootDir.default)(), filePath);
    if (!import_fs.default.existsSync(filePath)) {
      throw new Error(`dependencyTree: Sorry but the filePath passed "<cyan>${filePath}</cyan>" seems to not exists...`);
    }
    let packageJsonMtimeMs = -1, fileMtimeMs = import_fs.default.statSync(filePath).mtimeMs;
    const packageJsonPath = `${(0, import_packageRootDir.default)()}/package.json`;
    if (import_fs.default.existsSync(packageJsonPath)) {
      packageJsonMtimeMs = import_fs.default.statSync(packageJsonPath).mtimeMs;
    }
    const cache = new import_s_cache.default("dependency-tree");
    const integrity = import_md5.default.encrypt({
      packageJsonMtimeMs,
      fileMtimeMs
    });
    if (set.cache) {
      emit("log", {
        group: `s-dependency-tree`,
        value: `<yellow>[cache]</yellow> Checking cache for file "<cyan>${logPath}</cyan>"...`
      });
      const cachedValue = await cache.get(filePath);
      if (cachedValue) {
        if (cachedValue.integrity === integrity) {
          emit("log", {
            group: `s-dependency-tree`,
            value: `<green>[cache]</green> Cache validated for file "<cyan>${logPath}</cyan>"`
          });
          return resolve(cachedValue.tree);
        }
      }
    }
    emit("log", {
      group: `s-dependency-tree`,
      value: `<yellow>[generate]</yellow> Generating dependency tree for file "<cyan>${logPath}</cyan>"...`
    });
    const tree = {};
    const file = import_s_file.default.new(filePath);
    const imports = (0, import_extractImport.default)(file.content);
    emit("log", {
      group: `s-dependency-tree`,
      value: `<green>[generated]</green> Dependency tree generated <green>successfully</green> for file "<cyan>${logPath}</cyan>"`
    });
    if (set.cache) {
      emit("log", {
        group: `s-dependency-tree`,
        value: `<yellow>[cache]</yellow> Caching dependency tree for file "<cyan>${logPath}</cyan>"...`
      });
      await cache.set(filePath, {
        tree,
        integrity
      });
    }
    resolve(tree);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
