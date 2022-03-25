var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var frontspec_config_exports = {};
__export(frontspec_config_exports, {
  default: () => frontspec_config_default,
  prepare: () => prepare
});
module.exports = __toCommonJS(frontspec_config_exports);
var import_ipAddress = __toESM(require("@coffeekraken/sugar/node/network/utils/ipAddress"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_packageRoot = __toESM(require("@coffeekraken/sugar/node/path/packageRoot"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_readJson = __toESM(require("@coffeekraken/sugar/node/fs/readJson"), 1);
async function prepare(config) {
  const potentialFrontspecJsonFilePath = `${(0, import_packageRoot.default)()}/frontspec.json`;
  if (!import_fs.default.existsSync(potentialFrontspecJsonFilePath))
    return config;
  const json = await (0, import_readJson.default)(potentialFrontspecJsonFilePath);
  return (0, import_deepMerge.default)(config, json);
}
function frontspec_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    head: {
      viteClient: env.env === "development" ? `
        <script>
          document.addEventListener("DOMContentLoaded", function() {
            var $script = document.createElement("script");
            var ip = "${(0, import_ipAddress.default)()}";
            $script.setAttribute("type", "module");
            $script.setAttribute("src", "[config.vite.server.hostname]/@vite/client");
            document.body.appendChild($script);
          });
        <\/script>
      ` : ""
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  prepare
});
