function faviconBuilder_config_default(env) {
  return {
    input: "[config.storage.src.rootDir]/favicon/favicon.png",
    outDir: "[config.storage.dist.rootDir]/favicon",
    settings: {}
  };
}
export {
  faviconBuilder_config_default as default
};
