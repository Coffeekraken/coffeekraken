function postcssSugarPlugin_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    cache: true
  };
}
export {
  postcssSugarPlugin_config_default as default
};
