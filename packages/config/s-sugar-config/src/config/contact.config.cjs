var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var contact_config_exports = {};
__export(contact_config_exports, {
  default: () => contact_config_default
});
module.exports = __toCommonJS(contact_config_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
