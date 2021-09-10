import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           theme
 * @namespace      node.mixins.prism
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the css needed to skin "Prism js"
 * with the theme colors
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.prism.theme;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginPrismThemeInterface extends __SInterface {
}
postcssSugarPluginPrismThemeInterface.definition = {};
export { postcssSugarPluginPrismThemeInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [
        `
.hljs {
    display: block;
    overflow: hidden;
    padding: sugar.theme(ui.code.paddingBlock) sugar.theme(ui.code.paddingInline);
    background-color: sugar.color(ui, surface);
    border-radius: sugar.theme(ui.code.borderRadius);
    color: sugar.color(ui, surfaceForeground);
    line-height: 1.5 !important;

    &,
    &.hljs-subst {
        color: sugar.color(ui, surfaceForeground);
    }

    .hljs-selector-tag {
        color: sugar.color(accent, --spin 340);
    }

    .hljs-selector-id {
        color: sugar.color(info);
        font-weight: bold;
    }

    .hljs-selector-class {
        color: sugar.color(info);
    }

    .hljs-selector-attr {
        color: sugar.color(info);
    }

    .hljs-selector-pseudo {
        color: #88C0D0;
    }

    .hljs-addition {
        background-color: rgba(163, 190, 140, 0.5);
    }

    .hljs-deletion {
        background-color: rgba(191, 97, 106, 0.5);
    }

    .hljs-built_in,
    .hljs-type {
        color: sugar.color(info);
    }

    .hljs-class {
        color: sugar.color(info);
    }

    .hljs-function {
        color: #88C0D0;
    }

    .hljs-function > .hljs-title {
        color: #88C0D0;
    }

    .hljs-keyword,
    .hljs-literal,
    .hljs-symbol {
        color: sugar.color(accent, --spin 340);
    }

    .hljs-number {
        color: #B48EAD;
    }

    .hljs-regexp {
        color: sugar.color(accent);
    }

    .hljs-string {
        color: sugar.color(accent);
    }

    .hljs-title {
        color: sugar.color(info);
    }

    .hljs-params {
        color: sugar.color(text);
    }

    .hljs-bullet {
        color: sugar.color(accent, --spin 340);
    }

    .hljs-code {
        color: sugar.color(info);
    }

    .hljs-emphasis {
        font-style: italic;
    }

    .hljs-formula {
        color: sugar.color(info);
    }

    .hljs-strong {
        font-weight: bold;
    }

    .hljs-link:hover {
        text-decoration: underline;
    }

    .hljs-quote {
        color: sugar.color(ui, 30);
    }

    .hljs-comment {
        color: sugar.color(ui, 30);
    }

    .hljs-doctag {
        color: sugar.color(info);
    }

    .hljs-meta,
    .hljs-meta-keyword {
        color: #5E81AC;
    }

    .hljs-meta-string {
        color: sugar.color(accent);
    }

    .hljs-attr {
        color: sugar.color(info);
    }

    .hljs-attribute {
        color: sugar.color(text, 30);
    }

    .hljs-builtin-name {
        color: sugar.color(accent, --spin 340);
    }

    .hljs-name {
        color: sugar.color(accent, --spin 340);
    }

    .hljs-section {
        color: #88C0D0;
    }

    .hljs-tag {
        color: sugar.color(accent, --spin 340);
    }

    .hljs-variable {
        color: sugar.color(text);
    }

    .hljs-template-variable {
        color: sugar.color(text);
    }

    .hljs-template-tag {
        color: #5E81AC;
    }

    &.abnf .hljs-attribute {
        color: #88C0D0;
    }

    &.abnf .hljs-symbol {
        color: sugar.color(accent);
    }

    &.apache .hljs-attribute {
        color: #88C0D0;
    }

    &.apache .hljs-section {
        color: sugar.color(accent, --spin 340);
    }

    &.arduino .hljs-built_in {
        color: #88C0D0;
    }

    &.aspectj .hljs-meta {
        color: #D08770;
    }

    &.aspectj > .hljs-title {
        color: #88C0D0;
    }

    &.bnf .hljs-attribute {
        color: sugar.color(info);
    }

    &.clojure .hljs-name {
        color: #88C0D0;
    }

    &.clojure .hljs-symbol {
        color: sugar.color(accent);
    }

    &.coq .hljs-built_in {
        color: #88C0D0;
    }

    &.cpp .hljs-meta-string {
        color: sugar.color(info);
    }

    &.css .hljs-built_in {
        color: #88C0D0;
    }

    &.css .hljs-keyword {
        color: #D08770;
    }

    &.diff .hljs-meta {
        color: sugar.color(info);
    }

    &.ebnf .hljs-attribute {
        color: sugar.color(info);
    }

    &.glsl .hljs-built_in {
        color: #88C0D0;
    }

    &.groovy .hljs-meta:not(:first-child) {
        color: #D08770;
    }

    &.haxe .hljs-meta {
        color: #D08770;
    }

    &.java .hljs-meta {
        color: #D08770;
    }

    &.ldif .hljs-attribute {
        color: sugar.color(info);
    }

    &.lisp .hljs-name {
        color: #88C0D0;
    }

    &.lua .hljs-built_in {
        color: #88C0D0;
    }

    &.moonscript .hljs-built_in {
        color: #88C0D0;
    }

    &.nginx .hljs-attribute {
        color: #88C0D0;
    }

    &.nginx .hljs-section {
        color: #5E81AC;
    }

    &.pf .hljs-built_in {
        color: #88C0D0;
    }

    &.processing .hljs-built_in {
        color: #88C0D0;
    }

    &.scss .hljs-keyword {
        color: sugar.color(accent, --spin 340);
    }

    &.stylus .hljs-keyword {
        color: sugar.color(accent, --spin 340);
    }

    &.swift .hljs-meta {
        color: #D08770;
    }

    &.vim .hljs-built_in {
        color: #88C0D0;
        font-style: italic;
    }

    &.yaml .hljs-meta {
        color: #D08770;
    }
}
  `,
    ];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLHFDQUFzQyxTQUFRLFlBQVk7O0FBQ3JELGdEQUFVLEdBQUcsRUFBRSxDQUFDO0FBSzNCLE9BQU8sRUFBRSxxQ0FBcUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU5RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWE7UUFDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2U0w7S0FDRSxDQUFDO0lBRUYsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==