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
var storage_config_exports = {};
__export(storage_config_exports, {
  default: () => storage_config_default
});
module.exports = __toCommonJS(storage_config_exports);
var import_packageRoot = __toESM(require("@coffeekraken/sugar/node/path/packageRoot"));
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"));
var import_systemTmpDir = __toESM(require("@coffeekraken/sugar/node/path/systemTmpDir"));
function storage_config_default(env) {
  return {
    system: {
      tmpDir: (0, import_systemTmpDir.default)()
    },
    package: {
      rootDir: `${(0, import_packageRoot.default)(process.cwd())}`,
      localDir: `[config.storage.package.rootDir]/.local`,
      cacheDir: `[config.storage.package.localDir]/cache`,
      tmpDir: `[config.storage.package.localDir]/temp`,
      nodeModulesDir: `[config.storage.package.rootDir]/node_modules`
    },
    sugar: {
      rootDir: `${(0, import_packageRoot.default)((0, import_dirname.default)())}`
    },
    src: {
      rootDir: `[config.storage.package.rootDir]/src`,
      jsDir: `[config.storage.src.rootDir]/js`,
      nodeDir: `[config.storage.src.rootDir]/node`,
      cssDir: `[config.storage.src.rootDir]/css`,
      docDir: `[config.storage.src.rootDir]/doc`,
      fontsDir: `[config.storage.src.rootDir]/fonts`,
      iconsDir: `[config.storage.src.rootDir]/icons`,
      imgDir: `[config.storage.src.rootDir]/img`,
      viewsDir: `[config.storage.src.rootDir]/views`
    },
    dist: {
      rootDir: `[config.storage.package.rootDir]/dist`,
      jsDir: `[config.storage.dist.rootDir]/js`,
      nodeDir: `[config.storage.dist.rootDir]/node`,
      cssDir: `[config.storage.dist.rootDir]/css`,
      docDir: `[config.storage.dist.rootDir]/doc`,
      fontsDir: `[config.storage.dist.rootDir]/fonts`,
      iconsDir: `[config.storage.dist.rootDir]/icons`,
      imgDir: `[config.storage.dist.rootDir]/img`,
      viewsDir: `[config.storage.dist.rootDir]/views`
    },
    exclude: [
      "**/bin/**",
      "**/.DS_Store",
      "**/__WIP__/**",
      "**/__wip__/**",
      "**/__TESTS/**",
      "**/__tests__/**",
      "**/__tests__.wip/**",
      "**/.*/**",
      "**/node_modules/**"
    ]
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
