import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           theme
 * @namespace      node.mixins.highlightjs
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the css needed to skin "Prism js"
 * with the theme colors
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.highlightjs.theme;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginHighlightjsThemeInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginHighlightjsThemeInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
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
  `,
    ];
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLDJDQUE0QyxTQUFRLFlBQVk7SUFDbEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsMkNBQTJDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFcEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhO1FBQ25COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdU1MO0tBQ0UsQ0FBQztJQUVGLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==