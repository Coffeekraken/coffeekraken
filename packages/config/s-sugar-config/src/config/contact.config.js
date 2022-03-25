function contact_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    discord: {
      url: "[config.discord.server.url]",
      shield: "https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&logo=discord"
    },
    email: {
      get url() {
        var _a, _b, _c, _d, _e;
        return `mailto:${(_e = (_b = (_a = config == null ? void 0 : config.packageJson) == null ? void 0 : _a.author) == null ? void 0 : _b.email) != null ? _e : (_d = (_c = config == null ? void 0 : config.git) == null ? void 0 : _c.user) == null ? void 0 : _d.email}`;
      },
      shield: "https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&logo=Mail.Ru"
    }
  };
}
export {
  contact_config_default as default
};
