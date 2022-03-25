function themeUi_config_default(env, config) {
  return {
    slider: {
      borderRadius: "[theme.ui.default.borderRadius]",
      transition: "all .5s ease-in-out",
      depth: "[theme.ui.default.depth]"
    }
  };
}
export {
  themeUi_config_default as default
};
