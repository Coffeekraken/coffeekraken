import __knownCssProps from 'known-css-properties';
import __htmlTags from 'html-tags';
import __selfClosingHtmlTags from 'html-tags/void';
const MODES = (hljs) => {
    return {
        IMPORTANT: {
            className: 'meta',
            begin: '!important'
        },
        HEXCOLOR: {
            className: 'number',
            begin: '#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})'
        },
        ATTRIBUTE_SELECTOR_MODE: {
            className: 'selector-attr',
            begin: /\[/,
            end: /\]/,
            illegal: '$',
            contains: [
                hljs.APOS_STRING_MODE,
                hljs.QUOTE_STRING_MODE
            ]
        }
    };
};
const TAGS = [
    ...__htmlTags,
    ...__selfClosingHtmlTags
];
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
    'max-height'
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
    'where' // where()
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
    'spelling-error'
];
const ATTRIBUTES = __knownCssProps.all.reverse();
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
    const AT_IDENTIFIER = '@[a-z-\.]+'; // @font-face
    const AT_MODIFIERS = "and or not only";
    const IDENT_RE = '[a-zA-Z-\.][a-zA-Z0-9_\.-]*';
    const VARIABLE = {
        className: 'variable',
        begin: '(\\$' + IDENT_RE + ')\\b'
    };
    const ret = {
        name: 'CSS',
        case_insensitive: true,
        illegal: '[=/|\']',
        contains: [
            {
                className: 'sugar-function',
                begin: 'sugar\\.[a-zA-Z0-9-_\\.]+',
                contains: [
                    hljs.QUOTE_STRING_MODE,
                    hljs.APOS_STRING_MODE
                ]
            },
            {
                className: 'sugar-mixin',
                begin: '@sugar\\.[a-zA-Z0-9-_\\.]+',
                contains: [
                    hljs.QUOTE_STRING_MODE,
                    hljs.APOS_STRING_MODE
                ]
            },
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            {
                className: 'selector-id',
                begin: '#[A-Za-z0-9_-]+',
                relevance: 0
            },
            {
                className: 'selector-class',
                begin: '\\.[A-Za-z0-9_-]+',
                relevance: 0
            },
            modes.ATTRIBUTE_SELECTOR_MODE,
            {
                className: 'selector-tag',
                begin: '\\b(' + TAGS.join('|') + ')\\b',
                // was there, before, but why?
                relevance: 0
            },
            {
                className: 'selector-pseudo',
                begin: ':(' + PSEUDO_CLASSES$1.join('|') + ')'
            },
            {
                className: 'selector-pseudo',
                begin: '::(' + PSEUDO_ELEMENTS$1.join('|') + ')'
            },
            VARIABLE,
            {
                begin: /\(/,
                end: /\)/,
                contains: [hljs.NUMBER_MODE]
            },
            {
                className: 'attribute',
                begin: '\\b(' + ATTRIBUTES.join('|') + ')\\b'
            },
            {
                begin: '\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b'
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
                keywords: '@page @font-face'
            },
            {
                begin: '@',
                end: '[{;]',
                returnBegin: true,
                keywords: {
                    $pattern: /[a-zA-Z-\.]+/,
                    keyword: AT_MODIFIERS,
                    attribute: MEDIA_FEATURES.join(" ")
                },
                contains: [
                    {
                        begin: AT_IDENTIFIER,
                        className: "keyword"
                    },
                    {
                        begin: /[a-zA-Z\.-]+(?=:)/,
                        className: "attribute"
                    },
                    VARIABLE,
                    hljs.QUOTE_STRING_MODE,
                    hljs.APOS_STRING_MODE,
                    modes.HEXCOLOR,
                    hljs.NUMBER_MODE
                ]
            }
        ]
    };
    return ret;
}
export default css;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3NzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sVUFBVSxNQUFNLFdBQVcsQ0FBQztBQUNuQyxPQUFPLHFCQUFxQixNQUFNLGdCQUFnQixDQUFDO0FBRW5ELE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDckIsT0FBTztRQUNMLFNBQVMsRUFBRTtZQUNULFNBQVMsRUFBRSxNQUFNO1lBQ2pCLEtBQUssRUFBRSxZQUFZO1NBQ3BCO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsU0FBUyxFQUFFLFFBQVE7WUFDbkIsS0FBSyxFQUFFLGtDQUFrQztTQUMxQztRQUNELHVCQUF1QixFQUFFO1lBQ3ZCLFNBQVMsRUFBRSxlQUFlO1lBQzFCLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLElBQUk7WUFDVCxPQUFPLEVBQUUsR0FBRztZQUNaLFFBQVEsRUFBRTtnQkFDUixJQUFJLENBQUMsZ0JBQWdCO2dCQUNyQixJQUFJLENBQUMsaUJBQWlCO2FBQ3ZCO1NBQ0Y7S0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsTUFBTSxJQUFJLEdBQUc7SUFDWCxHQUFHLFVBQVU7SUFDYixHQUFHLHFCQUFxQjtDQUN6QixDQUFDO0FBRUYsTUFBTSxjQUFjLEdBQUc7SUFDckIsV0FBVztJQUNYLGFBQWE7SUFDYixjQUFjO0lBQ2QsT0FBTztJQUNQLGFBQWE7SUFDYixhQUFhO0lBQ2IscUJBQXFCO0lBQ3JCLGVBQWU7SUFDZixjQUFjO0lBQ2QsY0FBYztJQUNkLGVBQWU7SUFDZixNQUFNO0lBQ04sUUFBUTtJQUNSLE9BQU87SUFDUCxpQkFBaUI7SUFDakIsWUFBWTtJQUNaLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLFNBQVM7SUFDVCxzQkFBc0I7SUFDdEIsa0JBQWtCO0lBQ2xCLHdCQUF3QjtJQUN4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