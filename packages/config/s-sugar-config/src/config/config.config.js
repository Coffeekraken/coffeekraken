function config_config_default(env, config) {
  return {
    browser: {
      include: ["contact", "datetime", "log", "serve", "env", "theme"]
    },
    node: {
      include: []
    }
  };
}
export {
  config_config_default as default
};
