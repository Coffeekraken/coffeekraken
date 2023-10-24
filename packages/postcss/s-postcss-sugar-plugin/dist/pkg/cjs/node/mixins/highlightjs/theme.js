"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           theme
 * @as              @s.highlightjs.theme
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
 * @snippet         @s.highlightjs.theme
 *
 * @example        css
 * \@s.highlightjs.theme;
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
    @s.color(main);

    font-size: s.scalable(1rem);
    display: block;
    overflow: hidden;
    padding: s.padding(ui.code.paddingBlock) s.padding(ui.code.paddingInline);
    background-color: s.color(current, surface);
    border-radius: s.border.radius(ui.code.borderRadius);
    line-height: 1.5 !important;
    color: s.color(current, text);
    white-space: inherit;

    @s.media(mobile) {
        padding: clamp(10px, calc(s.padding(ui.code.paddingBlock) * 0.5), 100px) clamp(10px, calc(s.padding(ui.code.paddingInline) * 0.5), 100px);
        overflow: auto !important;
        white-space: pre !important;
        @s.scrollbar;
    }

    .hljs-s-function {
        color: s.color(accent, text);
        border-bottom: 1px solid s.color(accent, text);
        display: inline-block;
    }
    .hljs-s-mixin {
        color: s.color(error, text);
        border-bottom: 1px solid s.color(error, text);
        display: inline-block;
    }

    .hljs-selector-tag {
        color: s.color(error, text);
    }

    .hljs-selector-id {
        color: s.color(info, text);
        font-weight: bold;
    }

    .hljs-selector-class {
        color: s.color(info, text);
    }

    .hljs-selector-attr {
        color: s.color(info, text);
    }

    .hljs-selector-pseudo {
        color: s.color(info, text);
    }

    .hljs-addition {
        background-color: rgba(163, 190, 140, 0.5);
    }

    .hljs-deletion {
        background-color: rgba(191, 97, 106, 0.5);
    }

    .hljs-built_in,
    .hljs-type {
        color: s.color(info, text);
    }

    .hljs-class {
        color: s.color(info, text);
    }

    .hljs-function {
        color: s.color(info, text);
    }

    .hljs-function > .hljs-title {
        color: s.color(info, text);
    }

    .hljs-keyword,
    .hljs-literal,
    .hljs-symbol {
        color: s.color(error, text);
    }

    .hljs-number {
        color: s.color(accent, text);
    }

    .hljs-regexp {
        color: s.color(info, text);
    }

    .hljs-string {
        color: s.color(accent, text);
    }

    .hljs-title {
        color: s.color(info, text);
    }

    .hljs-params {
        color: s.color(complementary, text);
    }

    .hljs-bullet {
        color: s.color(accent, text);
    }

    .hljs-code {
        color: s.color(info, text);
    }

    .hljs-emphasis {
        font-style: italic;
    }

    .hljs-formula {
        color: s.color(info, text);
    }

    .hljs-strong {
        font-weight: bold;
    }

    .hljs-link:hover {
        text-decoration: underline;
    }

    .hljs-quote {
        color: s.color(current, text);
    }

    .hljs-comment {
        color: s.color(current, text, --alpha 0.5);
    }

    .hljs-doctag {
        color: s.color(info, text);
    }

    .hljs-meta,
    .hljs-meta-keyword {
        color: s.color(error, text);
    }

    .hljs-meta-string {
        color: s.color(accent, text);
    }

    .hljs-attr {
        color: s.color(info, text);
    }

    .hljs-attribute {
        color: s.color(complementary, text);
    }

    .hljs-builtin-name {
        color: s.color(error, text);
    }

    .hljs-name {
        color: s.color(error, text);
    }

    .hljs-section {
        color: s.color(info, text);
    }

    .hljs-tag {
        color: s.color(error, text);
    }

    .hljs-variable {
        color: s.color(complementary, text);
    }

    .hljs-template-variable {
        color: s.color(complementary, text);
    }

    .hljs-template-tag {
        color: s.color(error, text);
    }

    &.css .hljs-built_in {
        color: s.color(info, text);
    }

    &.css .hljs-keyword {
        color: s.color(error, text);
    }

    &.scss .hljs-keyword {
        color: s.color(error, text);
    }
}
  `,
    ];
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLDJDQUE0QyxTQUFRLHFCQUFZO0lBQ2xFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSXVELGdFQUFTO0FBRWpFLG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhO1FBQ25COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFNTDtLQUNFLENBQUM7SUFFRixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBdk5ELDRCQXVOQyJ9