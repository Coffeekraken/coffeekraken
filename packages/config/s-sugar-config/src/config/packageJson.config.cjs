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
var packageJson_config_exports = {};
__export(packageJson_config_exports, {
  default: () => packageJson_config_default,
  prepare: () => prepare
});
module.exports = __toCommonJS(packageJson_config_exports);
var import_json = __toESM(require("@coffeekraken/sugar/node/package/json"));
async function prepare() {
  return await (0, import_json.default)();
}
function packageJson_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {};
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  prepare
});
