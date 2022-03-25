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
var icons_config_exports = {};
__export(icons_config_exports, {
  default: () => icons_config_default
});
module.exports = __toCommonJS(icons_config_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
