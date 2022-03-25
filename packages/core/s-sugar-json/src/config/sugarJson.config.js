function sugarJson_config_default(env) {
  if (env.platform !== "node")
    return;
  return {};
}
export {
  sugarJson_config_default as default
};
