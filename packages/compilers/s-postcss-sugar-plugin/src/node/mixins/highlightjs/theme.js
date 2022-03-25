var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginHighlightjsThemeInterface extends __SInterface {
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
export {
  theme_default as default,
  postcssSugarPluginHighlightjsThemeInterface as interface
};
