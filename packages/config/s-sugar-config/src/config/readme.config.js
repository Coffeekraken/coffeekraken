function readme_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    layout: {
      headerImageUrl: "[config.serve.img.url]/doc/readmeHeader.jpg"
    },
    shields: "[config.shieldsio.shields]"
  };
}
export {
  readme_config_default as default
};
