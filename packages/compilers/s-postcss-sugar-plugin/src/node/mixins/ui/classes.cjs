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
var classes_exports = {};
__export(classes_exports, {
  default: () => classes_default,
  interface: () => postcssSugarPluginUiClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class postcssSugarPluginUiClassesInterface extends import_s_interface.default {
  static get _definition() {
    return {};
  }
}
function classes_default({
  params,
  atRule,
  replaceWith
}) {
  const cssArray = [
    "@sugar.ui.avatar.classes;",
    "@sugar.ui.badge.classes;",
    "@sugar.ui.blockquote.classes;",
    "@sugar.ui.button.classes;",
    "@sugar.ui.checkbox.classes;",
    "@sugar.ui.dropdown.classes;",
    "@sugar.ui.fsTree.classes;",
    "@sugar.ui.input.classes;",
    "@sugar.ui.label.classes;",
    "@sugar.ui.list.classes;",
    "@sugar.ui.loader.classes;",
    "@sugar.ui.tabs.classes;",
    "@sugar.ui.radio.classes;",
    "@sugar.ui.range.classes;",
    "@sugar.ui.select.classes;",
    "@sugar.ui.switch.classes;",
    "@sugar.ui.table.classes;",
    "@sugar.ui.tooltip.classes;"
  ];
  return cssArray;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
