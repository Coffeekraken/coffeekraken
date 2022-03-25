function riotjs_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {};
}
export {
  riotjs_config_default as default
};
