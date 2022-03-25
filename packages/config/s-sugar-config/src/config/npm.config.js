function npm_config_default(env) {
  if (env.platform !== "node")
    return;
  return {
    rootDir: `[config.storage.package.rootDir]/node_modules`
  };
}
export {
  npm_config_default as default
};
