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
var theme_exports = {};
__export(theme_exports, {
  default: () => theme_default,
  interface: () => postcssSugarPluginHighlightjsThemeInterface
});
module.exports = __toCommonJS(theme_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class postcssSugarPluginHighlightjsThemeInterface extends import_s_interface.default {
  static get _definition() {
    return {};
  }
}
function theme_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params);
  const vars = [
    `
.hljs {
    font-size: sugar.scalable(1rem);
    display: block;
    overflow: hidden;
    padding: sugar.theme(ui.code.paddingBlock) sugar.theme(ui.code.paddingInline);
    background-color: sugar.color(current, surface);
    border-radius: sugar.theme(ui.code.borderRadius);
    color: sugar.color(current, surfaceForeground);
    line-height: 1.5 !important;

    @sugar.media(mobile) {
        padding: clamp(10px, calc(sugar.theme(ui.code.paddingBlock) * 0.5), 100px) clamp(10px, calc(sugar.theme(ui.code.paddingInline) * 0.5), 100px);
        overflow: auto !important;
        white-space: pre !important;
        @sugar.scrollbar;
    }

    .hljs-sugar-function {
        color: sugar.color(accent, --lighten 20);
        border-bottom: 1px solid sugar.color(accent, --lighten 20);
        display: inline-block;
    }
    .hljs-sugar-mixin {
        color: sugar.color(error, --lighten 20);
        border-bottom: 1px solid sugar.color(error, --lighten 20);
        display: inline-block;
    }

    &,
    &.hljs-subst {
        color: sugar.color(current, surfaceForeground);
    }

    .hljs-selector-tag {
        color: sugar.color(error, --lighten 20);
    }

    .hljs-selector-id {
        color: sugar.color(info, --lighten 20);
        font-weight: bold;
    }

    .hljs-selector-class {
        color: sugar.color(info, --lighten 20);
    }

    .hljs-selector-attr {
        color: sugar.color(info, --lighten 20);
    }

    .hljs-selector-pseudo {
        color: sugar.color(info, --lighten 20 --alpha .6);
    }

    .hljs-addition {
        background-color: rgba(163, 190, 140, 0.5);
    }

    .hljs-deletion {
        background-color: rgba(191, 97, 106, 0.5);
    }

    .hljs-built_in,
    .hljs-type {
        color: sugar.color(info, --lighten 20);
    }

    .hljs-class {
        color: sugar.color(info, --lighten 20);
    }

    .hljs-function {
        color: sugar.color(info, --lighten 20);
    }

    .hljs-function > .hljs-title {
        color: sugar.color(info, --lighten 20);
    }

    .hljs-keyword,
    .hljs-literal,
    .hljs-symbol {
        color: sugar.color(error, --lighten 20);
    }

    .hljs-number {
        color: sugar.color(accent, --lighten 20);
    }

    .hljs-regexp {
        color: sugar.color(info, --lighten 20);
    }

    .hljs-string {
        color: sugar.color(accent, --lighten 20);
    }

    .hljs-title {
        color: sugar.color(info, --lighten 20);
    }

    .hljs-params {
        color: sugar.color(text);
    }

    .hljs-bullet {
        color: sugar.color(accent, --lighten 20);
    }

    .hljs-code {
        color: sugar.color(info, --lighten 20);
    }

    .hljs-emphasis {
        font-style: italic;
    }

    .hljs-formula {
        color: sugar.color(info, --lighten 20);
    }

    .hljs-strong {
        font-weight: bold;
    }

    .hljs-link:hover {
        text-decoration: underline;
    }

    .hljs-quote {
        color: sugar.color(current, 30);
    }

    .hljs-comment {
        color: sugar.color(current, 30);
    }

    .hljs-doctag {
        color: sugar.color(info, --lighten 20);
    }

    .hljs-meta,
    .hljs-meta-keyword {
        color: sugar.color(error, --lighten 10 --desaturate 40);
    }

    .hljs-meta-string {
        color: sugar.color(accent);
    }

    .hljs-attr {
        color: sugar.color(info, --lighten 20);
    }

    .hljs-attribute {
        color: sugar.color(complementary, --lighten 30);
    }

    .hljs-builtin-name {
        color: sugar.color(error, --lighten 20);
    }

    .hljs-name {
        color: sugar.color(error, --lighten 20);
    }

    .hljs-section {
        color: sugar.color(info, --lighten 20);
    }

    .hljs-tag {
        color: sugar.color(error, --lighten 20);
    }

    .hljs-variable {
        color: sugar.color(complementary, --lighten 20);
    }

    .hljs-template-variable {
        color: sugar.color(complementary, --lighten 20);
    }

    .hljs-template-tag {
        color: sugar.color(error, --darken 10 --desaturate 20);
    }

    &.css .hljs-built_in {
        color: sugar.color(info, --lighten 20);
    }

    &.css .hljs-keyword {
        color: sugar.color(error, --lighten 20);
    }

    &.scss .hljs-keyword {
        color: sugar.color(error, --lighten 20);
    }
}
  `
  ];
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
