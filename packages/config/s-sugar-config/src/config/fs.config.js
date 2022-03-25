function fs_config_default(env) {
  if (env.platform !== "node")
    return;
  return {};
}
export {
  fs_config_default as default
};
