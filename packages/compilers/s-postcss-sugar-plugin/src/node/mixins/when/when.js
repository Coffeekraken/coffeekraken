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
var when_exports = {};
__export(when_exports, {
  default: () => when_default,
  interface: () => postcssSugarPluginmountedMixinInterface
});
module.exports = __toCommonJS(when_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
class postcssSugarPluginmountedMixinInterface extends import_s_interface.default {
  static get _definition() {
    return {
      state: {
        type: "String",
        values: ["mounted", "active", "dark", "light"],
        required: true
      },
      context: {
        type: "String",
        values: ["self", "sibling", "parent", "ancestor", "theme"],
        default: "self",
        required: true
      }
    };
  }
}
function when_default({
  params,
  atRule,
  postcssApi
}) {
  const finalParams = __spreadValues({
    state: "mounted",
    context: "self"
  }, params != null ? params : {});
  let selector;
  switch (finalParams.state) {
    case "mounted":
      if (finalParams.context === "parent") {
        selector = "*[mounted] > &, *.mounted > &";
      } else if (finalParams.context === "ancestor") {
        selector = "*[mounted] &, *.mounted &";
      } else if (finalParams.context === "sibling") {
        selector = "*[mounted] + &, *.mounted + &";
      } else {
        selector = "&[mounted], &.mounted";
      }
      break;
    case "active":
      if (finalParams.context === "parent") {
        selector = "*[active] > &. *.active > &";
      } else if (finalParams.context === "ancestor") {
        selector = "*[active] &. *.active &";
      } else if (finalParams.context === "sibling") {
        selector = "*[active] + &. *.active + &";
      } else {
        selector = "&[active], &.active";
      }
      break;
    case "dark":
      selector = `@media (prefers-color-scheme: dark)`;
      break;
    case "light":
      selector = `@media (prefers-color-scheme: light)`;
      break;
  }
  const wrapperRule = new postcssApi.Rule({
    selector
  });
  atRule.nodes.forEach((node) => {
    wrapperRule.append(node);
  });
  atRule.replaceWith(wrapperRule);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
