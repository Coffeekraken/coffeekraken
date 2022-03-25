function vue_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    css: {
      extract: false
    }
  };
}
export {
  vue_config_default as default
};
