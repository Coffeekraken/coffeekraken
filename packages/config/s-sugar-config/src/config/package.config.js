function package_config_default(env) {
  if (env.platform !== "node")
    return;
  return {
    manager: "yarn"
  };
}
export {
  package_config_default as default
};
