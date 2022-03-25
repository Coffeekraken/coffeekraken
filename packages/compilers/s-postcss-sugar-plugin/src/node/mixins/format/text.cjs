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
var text_exports = {};
__export(text_exports, {
  default: () => text_default,
  interface: () => postcssSugarPluginFormatTextlMixinInterface
});
module.exports = __toCommonJS(text_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class postcssSugarPluginFormatTextlMixinInterface extends import_s_interface.default {
  static get _definition() {
    return {};
  }
}
function text_default({
  params,
  atRule,
  unwrap,
  postcssApi
}) {
  var _a;
  const finalParams = __spreadValues({}, params != null ? params : {});
  (_a = atRule.nodes) == null ? void 0 : _a.forEach((node) => {
    if (node.selector && !node.selector.match(/^\.s-format--text/)) {
      node.selector = node.selector.split(",").map((sel) => {
        return `.s-format--text ${sel}:not(.s-format--none ${sel}), .preview .s-format--text ${sel}`;
      }).join(",");
    }
  });
  atRule.replaceWith(atRule.nodes);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
