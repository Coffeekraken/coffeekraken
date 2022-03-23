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
var internalWatcherReloadPlugin_exports = {};
__export(internalWatcherReloadPlugin_exports, {
  default: () => internalWatcherReloadPlugin_default
});
module.exports = __toCommonJS(internalWatcherReloadPlugin_exports);
var import_picomatch = __toESM(require("picomatch"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_chokidar = __toESM(require("chokidar"), 1);
var import_s_event_emitter = __toESM(require("@coffeekraken/s-event-emitter"), 1);
var internalWatcherReloadPlugin_default = (config = {}) => ({
  name: "s-vite-plugin-internal-watcher-reload",
  apply: "serve",
  config: () => ({ server: { watch: { disableGlobbing: false, followSymlinks: true } } }),
  configureServer({ watcher, ws, config: { logger } }) {
    config = (0, import_deepMerge.default)({
      config: true,
      css: true
    }, config);
    const configFiles = import_s_sugar_config.default.foldersRealPaths.map((p) => `${p}/*.config.js`);
    const shouldReloadConfigs = (0, import_picomatch.default)(configFiles);
    const checkReload = (path) => {
      if (!path.match(/\.config\.js$/) && !path.match(/\.css$/))
        return;
      let passChecks = false;
      if (shouldReloadConfigs(path) && config.config)
        passChecks = true;
      if (!passChecks && path.match(/\.css$/) && config.css)
        passChecks = true;
      if (!passChecks)
        return;
      setTimeout(() => ws.send({ type: "full-reload" }, path), 100);
    };
    import_s_event_emitter.default.global.on("s-postcss-sugar-plugin-import-update", (e) => {
      checkReload(e.path);
    });
    const localWatcher = import_chokidar.default.watch(configFiles, {
      ignoreInitial: true
    });
    localWatcher.on("add", checkReload);
    localWatcher.on("change", checkReload);
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
