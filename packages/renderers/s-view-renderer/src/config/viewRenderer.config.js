function viewRenderer_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    rootDirs: [`[config.storage.src.rootDir]/views`],
    cacheDir: `[config.storage.package.cacheDir]/views`,
    engines: ["@coffeekraken/s-view-renderer-engine-blade"],
    dataHandlers: ["@coffeekraken/s-view-renderer-data-handler-js"]
  };
}
export {
  viewRenderer_config_default as default
};
