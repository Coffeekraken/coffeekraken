"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const html_tags_1 = __importDefault(require("html-tags"));
const void_1 = __importDefault(require("html-tags/void"));
const known_css_properties_1 = __importDefault(require("known-css-properties"));
const MODES = (hljs) => {
    return {
        IMPORTANT: {
            className: 'meta',
            begin: '!important',
        },
        HEXCOLOR: {
            className: 'number',
            begin: '#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})',
        },
        ATTRIBUTE_SELECTOR_MODE: {
            className: 'selector-attr',
            begin: /\[/,
            end: /\]/,
            illegal: '$',
            contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE],
        },
    };
};
const TAGS = [...html_tags_1.default, ...void_1.default];
const MEDIA_FEATURES = [
    'any-hover',
    'any-pointer',
    'aspect-ratio',
    'color',
    'color-gamut',
    'color-index',
    'device-aspect-ratio',
    'device-height',
    'device-width',
    'display-mode',
    'forced-colors',
    'grid',
    'height',
    'hover',
    'inverted-colors',
    'monochrome',
    'orientation',
    'overflow-block',
    'overflow-inline',
    'pointer',
    'prefers-color-scheme',
    'prefers-contrast',
    'prefers-reduced-motion',
    'prefers-reduced-transparency',
    'resolution',
    'scan',
    'scripting',
    'update',
    'width',
    // TODO: find a better solution?
    'min-width',
    'max-width',
    'min-height',
    'max-height',
];
// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
const PSEUDO_CLASSES = [
    'active',
    'any-link',
    'blank',
    'checked',
    'current',
    'default',
    'defined',
    'dir',
    'disabled',
    'drop',
    'empty',
    'enabled',
    'first',
    'first-child',
    'first-of-type',
    'fullscreen',
    'future',
    'focus',
    'focus-visible',
    'focus-within',
    'has',
    'host',
    'host-context',
    'hover',
    'indeterminate',
    'in-range',
    'invalid',
    'is',
    'lang',
    'last-child',
    'last-of-type',
    'left',
    'link',
    'local-link',
    'not',
    'nth-child',
    'nth-col',
    'nth-last-child',
    'nth-last-col',
    'nth-last-of-type',
    'nth-of-type',
    'only-child',
    'only-of-type',
    'optional',
    'out-of-range',
    'past',
    'placeholder-shown',
    'read-only',
    'read-write',
    'required',
    'right',
    'root',
    'scope',
    'target',
    'target-within',
    'user-invalid',
    'valid',
    'visited',
    'where', // where()
];
// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements
const PSEUDO_ELEMENTS = [
    'after',
    'backdrop',
    'before',
    'cue',
    'cue-region',
    'first-letter',
    'first-line',
    'grammar-error',
    'marker',
    'part',
    'placeholder',
    'selection',
    'slotted',
    'spelling-error',
];
const ATTRIBUTES = known_css_properties_1.default.all.reverse();
/*
Language: css
Description: Scss is an extension of the syntax of CSS.
Author: Kurt Emch <kurt@kurtemch.com>
Website: https://sass-lang.com
Category: common, css
*/
/** @type LanguageFn */
function css(hljs) {
    const modes = MODES(hljs);
    const PSEUDO_ELEMENTS$1 = PSEUDO_ELEMENTS;
    const PSEUDO_CLASSES$1 = PSEUDO_CLASSES;
    const AT_IDENTIFIER = '@[a-z-.]+'; // @font-face
    const AT_MODIFIERS = 'and or not only';
    const IDENT_RE = '[a-zA-Z-.][a-zA-Z0-9_.-]*';
    const VARIABLE = {
        className: 'variable',
        begin: '(\\$' + IDENT_RE + ')\\b',
    };
    const ret = {
        name: 'CSS',
        case_insensitive: true,
        illegal: "[=/|']",
        contains: [
            {
                className: 'sugar-function',
                begin: 'sugar\\.[a-zA-Z0-9-_\\.]+',
                contains: [hljs.QUOTE_STRING_MODE, hljs.APOS_STRING_MODE],
            },
            {
                className: 'sugar-mixin',
                begin: '@sugar\\.[a-zA-Z0-9-_\\.]+',
                contains: [hljs.QUOTE_STRING_MODE, hljs.APOS_STRING_MODE],
            },
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            {
                className: 'selector-id',
                begin: '#[A-Za-z0-9_-]+',
                relevance: 0,
            },
            {
                className: 'selector-class',
                begin: '\\.[A-Za-z0-9_-]+',
                relevance: 0,
            },
            modes.ATTRIBUTE_SELECTOR_MODE,
            {
                className: 'selector-tag',
                begin: '\\b(' + TAGS.join('|') + ')\\b',
                // was there, before, but why?
                relevance: 0,
            },
            {
                className: 'selector-pseudo',
                begin: ':(' + PSEUDO_CLASSES$1.join('|') + ')',
            },
            {
                className: 'selector-pseudo',
                begin: '::(' + PSEUDO_ELEMENTS$1.join('|') + ')',
            },
            VARIABLE,
            {
                // pseudo-selector params
                begin: /\(/,
                end: /\)/,
                contains: [hljs.NUMBER_MODE],
            },
            {
                className: 'attribute',
                begin: '\\b(' + ATTRIBUTES.join('|') + ')\\b',
            },
            {
                begin: '\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b',
            },
            // {
            //   begin: ':',
            //   end: ';',
            //   contains: [
            //     VARIABLE,
            //     modes.HEXCOLOR,
            //     hljs.NUMBER_MODE,
            //     hljs.QUOTE_STRING_MODE,
            //     hljs.APOS_STRING_MODE,
            //     modes.IMPORTANT
            //   ]
            // },
            // matching these here allows us to treat them more like regular CSS
            // rules so everything between the {} gets regular rule highlighting,
            // which is what we want for page and font-face
            {
                begin: '@(page|font-face)',
                lexemes: AT_IDENTIFIER,
                keywords: '@page @font-face',
            },
            {
                begin: '@',
                end: '[{;]',
                returnBegin: true,
                keywords: {
                    $pattern: /[a-zA-Z-\.]+/,
                    keyword: AT_MODIFIERS,
                    attribute: MEDIA_FEATURES.join(' '),
                },
                contains: [
                    {
                        begin: AT_IDENTIFIER,
                        className: 'keyword',
                    },
                    {
                        begin: /[a-zA-Z\.-]+(?=:)/,
                        className: 'attribute',
                    },
                    VARIABLE,
                    hljs.QUOTE_STRING_MODE,
                    hljs.APOS_STRING_MODE,
                    modes.HEXCOLOR,
                    hljs.NUMBER_MODE,
                ],
            },
        ],
    };
    return ret;
}
exports.default = css;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQW1DO0FBQ25DLDBEQUFtRDtBQUNuRCxnRkFBbUQ7QUFFbkQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUNuQixPQUFPO1FBQ0gsU0FBUyxFQUFFO1lBQ1AsU0FBUyxFQUFFLE1BQU07WUFDakIsS0FBSyxFQUFFLFlBQVk7U0FDdEI7UUFDRCxRQUFRLEVBQUU7WUFDTixTQUFTLEVBQUUsUUFBUTtZQUNuQixLQUFLLEVBQUUsa0NBQWtDO1NBQzVDO1FBQ0QsdUJBQXVCLEVBQUU7WUFDckIsU0FBUyxFQUFFLGVBQWU7WUFDMUIsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUsSUFBSTtZQUNULE9BQU8sRUFBRSxHQUFHO1lBQ1osUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztTQUM1RDtLQUNKLENBQUM7QUFDTixDQUFDLENBQUM7QUFFRixNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsbUJBQVUsRUFBRSxHQUFHLGNBQXFCLENBQUMsQ0FBQztBQUV2RCxNQUFNLGNBQWMsR0FBRztJQUNuQixXQUFXO0lBQ1gsYUFBYTtJQUNiLGNBQWM7SUFDZCxPQUFPO0lBQ1AsYUFBYTtJQUNiLGFBQWE7SUFDYixxQkFBcUI7SUFDckIsZUFBZTtJQUNmLGNBQWM7SUFDZCxjQUFjO0lBQ2QsZUFBZTtJQUNmLE1BQU07SUFDTixRQUFRO0lBQ1IsT0FBTztJQUNQLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osYUFBYTtJQUNiLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsU0FBUztJQUNULHNCQUFzQjtJQUN0QixrQkFBa0I7SUFDbEIsd0JBQXdCO0lBQ3hCLDhCQUE4QjtJQUM5QixZQUFZO0lBQ1osTUFBTTtJQUNOLFdBQVc7SUFDWCxRQUFRO0lB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