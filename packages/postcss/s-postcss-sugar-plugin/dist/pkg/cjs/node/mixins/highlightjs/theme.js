"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           theme
 * @namespace      node.mixin.highlightjs
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the css needed to skin "Prism js"
 * with the theme colors
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * @sugar.highlightjs.theme;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginHighlightjsThemeInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginHighlightjsThemeInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [
        `
.hljs {
    @sugar.color(main);

    font-size: sugar.scalable(1rem);
    display: block;
    overflow: hidden;
    padding: sugar.padding(ui.code.paddingBlock) sugar.padding(ui.code.paddingInline);
    background-color: sugar.color(current, surface);
    border-radius: sugar.border.radius(ui.code.borderRadius);
    line-height: 1.5 !important;
    color: sugar.color(current, text);

    @sugar.media(mobile) {
        padding: clamp(10px, calc(sugar.padding(ui.code.paddingBlock) * 0.5), 100px) clamp(10px, calc(sugar.padding(ui.code.paddingInline) * 0.5), 100px);
        overflow: auto !important;
        white-space: pre !important;
        @sugar.scrollbar;
    }

    .hljs-sugar-function {
        color: sugar.color(accent, text);
        border-bottom: 1px solid sugar.color(accent, text);
        display: inline-block;
    }
    .hljs-sugar-mixin {
        color: sugar.color(error, text);
        border-bottom: 1px solid sugar.color(error, text);
        display: inline-block;
    }

    .hljs-selector-tag {
        color: sugar.color(error, text);
    }

    .hljs-selector-id {
        color: sugar.color(info, text);
        font-weight: bold;
    }

    .hljs-selector-class {
        color: sugar.color(info, text);
    }

    .hljs-selector-attr {
        color: sugar.color(info, text);
    }

    .hljs-selector-pseudo {
        color: sugar.color(info, text);
    }

    .hljs-addition {
        background-color: rgba(163, 190, 140, 0.5);
    }

    .hljs-deletion {
        background-color: rgba(191, 97, 106, 0.5);
    }

    .hljs-built_in,
    .hljs-type {
        color: sugar.color(info, text);
    }

    .hljs-class {
        color: sugar.color(info, text);
    }

    .hljs-function {
        color: sugar.color(info, text);
    }

    .hljs-function > .hljs-title {
        color: sugar.color(info, text);
    }

    .hljs-keyword,
    .hljs-literal,
    .hljs-symbol {
        color: sugar.color(error, text);
    }

    .hljs-number {
        color: sugar.color(accent, text);
    }

    .hljs-regexp {
        color: sugar.color(info, text);
    }

    .hljs-string {
        color: sugar.color(accent, text);
    }

    .hljs-title {
        color: sugar.color(info, text);
    }

    .hljs-params {
        color: sugar.color(complementary, text);
    }

    .hljs-bullet {
        color: sugar.color(accent, text);
    }

    .hljs-code {
        color: sugar.color(info, text);
    }

    .hljs-emphasis {
        font-style: italic;
    }

    .hljs-formula {
        color: sugar.color(info, text);
    }

    .hljs-strong {
        font-weight: bold;
    }

    .hljs-link:hover {
        text-decoration: underline;
    }

    .hljs-quote {
        color: sugar.color(current, text);
    }

    .hljs-comment {
        color: sugar.color(current, text, --alpha 0.5);
    }

    .hljs-doctag {
        color: sugar.color(info, text);
    }

    .hljs-meta,
    .hljs-meta-keyword {
        color: sugar.color(error, text);
    }

    .hljs-meta-string {
        color: sugar.color(accent, text);
    }

    .hljs-attr {
        color: sugar.color(info, text);
    }

    .hljs-attribute {
        color: sugar.color(complementary, text);
    }

    .hljs-builtin-name {
        color: sugar.color(error, text);
    }

    .hljs-name {
        color: sugar.color(error, text);
    }

    .hljs-section {
        color: sugar.color(info, text);
    }

    .hljs-tag {
        color: sugar.color(error, text);
    }

    .hljs-variable {
        color: sugar.color(complementary, text);
    }

    .hljs-template-variable {
        color: sugar.color(complementary, text);
    }

    .hljs-template-tag {
        color: sugar.color(error, text);
    }

    &.css .hljs-built_in {
        color: sugar.color(info, text);
    }

    &.css .hljs-keyword {
        color: sugar.color(error, text);
    }

    &.scss .hljs-keyword {
        color: sugar.color(error, text);
    }
}
  `,
    ];
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLDJDQUE0QyxTQUFRLHFCQUFZO0lBQ2xFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSXVELGdFQUFTO0FBRWpFLG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhO1FBQ25COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb01MO0tBQ0UsQ0FBQztJQUVGLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUF0TkQsNEJBc05DIn0=