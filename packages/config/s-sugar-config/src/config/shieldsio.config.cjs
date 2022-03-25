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
var shieldsio_config_exports = {};
__export(shieldsio_config_exports, {
  default: () => shieldsio_config_default
});
module.exports = __toCommonJS(shieldsio_config_exports);
function shieldsio_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    style: "for-the-badge",
    shields: {
      size: {
        url: "https://shields.io/bundlephobia/min/[packageJson.name]?style=[config.shieldsio.style]",
        href: "https://www.npmjs.com/package/[packageJson.name]"
      },
      downloads: {
        url: "https://shields.io/npm/dm/[packageJson.name]?style=[config.shieldsio.style]",
        href: "https://www.npmjs.com/package/[packageJson.name]"
      },
      license: {
        url: "https://shields.io/npm/l/[packageJson.name]?style=[config.shieldsio.style]",
        href: "./LICENSE"
      },
      discord: {
        url: "https://shields.io/discord/[config.discord.server.id]?style=[config.shieldsio.style]",
        href: "[config.discord.server.url]"
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
