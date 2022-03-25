function icons_config_default(env) {
  if (env.platform !== "node")
    return;
  return {
    fontawesome: {
      url: "https://use.fontawesome.com/releases/v5.15.3/css/all.css"
    },
    fantasticon: {
      name: "sugar-fonticon",
      outputDir: "[config.storage.src.fontsDir]/sugar-icons"
    }
  };
}
export {
  icons_config_default as default
};
