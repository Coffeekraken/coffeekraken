function log_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    types: ["info", "warning", "error"]
  };
}
export {
  log_config_default as default
};
