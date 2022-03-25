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
var module_config_exports = {};
__export(module_config_exports, {
  default: () => module_config_default
});
module.exports = __toCommonJS(module_config_exports);
var import_node = __toESM(require("@coffeekraken/sugar/shared/is/node"));
function module_config_default(env) {
  if (env.platform !== "node")
    return;
  return {
    resolve: {
      dirs: ["[config.storage.package.nodeModulesDir]"],
      extensions: ["js", "mjs", "json", "node"],
      fields: ["main", "module", "browser"],
      builtInModules: (0, import_node.default)() ? true : false,
      preferExports: true,
      method: "import",
      target: (0, import_node.default)() ? "node" : "default"
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
