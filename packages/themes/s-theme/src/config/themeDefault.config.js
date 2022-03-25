function themeDefault_config_default(env, config) {
  return {
    themeName: "default",
    variants: {
      light: "[config.themeDefaultLight]",
      dark: "[config.themeDefaultDark]"
    }
  };
}
export {
  themeDefault_config_default as default
};
