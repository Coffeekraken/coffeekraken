var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
var platform_exports = {};
__export(platform_exports, {
  default: () => platform_default,
  interface: () => postcssSugarPluginAssetPlatformInterface
});
module.exports = __toCommonJS(platform_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"), 1);
var import_base64 = __toESM(require("@coffeekraken/sugar/shared/crypt/base64"), 1);
var import_fs = __toESM(require("fs"), 1);
class postcssSugarPluginAssetPlatformInterface extends import_s_interface.default {
  static get _definition() {
    return {
      platform: {
        type: "String",
        values: ["js", "node", "ts", "php"],
        required: true
      }
    };
  }
}
function platform_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    platform: ""
  }, params);
  const vars = [];
  if (!import_fs.default.readFileSync(`${(0, import_dirname.default)()}/platforms/${finalParams.platform}.svg`)) {
    throw new Error(`<red>[s-postcss-sugar-plugin]</red> Sorry but the requested platform "<yellow>${finalParams.platform}</yellow>" does not exists...`);
  }
  const svgStr = import_fs.default.readFileSync(`${(0, import_dirname.default)()}/platforms/${finalParams.platform}.svg`, "utf8");
  vars.push(`
    display: inline-block;
    vertical-align: middle;
    width: 1em;
    height: 1em;
    background-size: contain;
    background-image: url("data:image/svg+xml;base64,${import_base64.default.encrypt(svgStr)}");
  `);
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
