import "../../../../../chunk-TD77TI6B.mjs";
import __picomatch from "picomatch";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SugarConfig from "@coffeekraken/s-sugar-config";
import __chokidar from "chokidar";
import __SEventEmitter from "@coffeekraken/s-event-emitter";
var internalWatcherReloadPlugin_default = (config = {}) => ({
  name: "s-vite-plugin-internal-watcher-reload",
  apply: "serve",
  config: () => ({ server: { watch: { disableGlobbing: false, followSymlinks: true } } }),
  configureServer({ watcher, ws, config: { logger } }) {
    config = __deepMerge({
      config: true,
      css: true
    }, config);
    const configFiles = __SugarConfig.foldersRealPaths.map((p) => `${p}/*.config.js`);
    const shouldReloadConfigs = __picomatch(configFiles);
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
    __SEventEmitter.global.on("s-postcss-sugar-plugin-import-update", (e) => {
      checkReload(e.path);
    });
    const localWatcher = __chokidar.watch(configFiles, {
      ignoreInitial: true
    });
    localWatcher.on("add", checkReload);
    localWatcher.on("change", checkReload);
  }
});
export {
  internalWatcherReloadPlugin_default as default
};
