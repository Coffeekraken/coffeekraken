function monorepo_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    packagesGlobs: ["packages/*/*/package.json"],
    filesToUpgrade: ["package.json", "composer.json"]
  };
}
export {
  monorepo_config_default as default
};
