import __path from 'path';

export default function (api) {
    if (api.env.platform !== 'node') return;
    return {
        /**
         * @name            outDir
         * @namespace       config.postcssSugarPlugin
         * @type            String
         * @default        __path.dirname(config.postcssBuilder.output)
         *
         * Specify a directory in which to save relatively exported css, etc...
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get outDir() {
            return __path.dirname(api.config.postcssBuilder.output);
        },

        /**
         * @name            cache
         * @namespace       config.postcssSugarPlugin
         * @type            Boolean
         * @default         true
         *
         * Specify if you want to use the internal cache to speed up your compilations or not
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        cache: false,

        scopes: {
            bare: {
                /**
                 * @name            properties
                 * @namespace       config.postcssSugarPlugin.scopes.bare
                 * @type            Boolean
                 * @default         [...]
                 *
                 * Specify all the css properties that are to be considered "bare" scope.
                 * You can prefix them by "^" to tell "starts with", or suffix them by "$" to tell "ends with".
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                properties: [
                    '^align-',
                    'appearance$',
                    'aspect-ratio',
                    'backface-visibility',
                    '^background',
                    'bottom',
                    'box-sizing',
                    'clear',
                    '^clip-',
                    'color',
                    'column-count',
                    'column-fill',
                    'column-gap',
                    'column-span',
                    'column-width',
                    'columns',
                    'content',
                    'cursor',
                    'direction',
                    'display',
                    'empty-cells',
                    'fill',
                    '^flex-',
                    'float',
                    'font-size',
                    'gap',
                    '^grid',
                    'height',
                    'justify-content',
                    'left',
                    'line-height',
                    'list-style',
                    '^margin',
                    '^max-',
                    '^min-',
                    'opacity',
                    'order',
                    '^overflow',
                    '^padding',
                    '^page-',
                    '^perspective',
                    'pointer-events',
                    'position',
                    'resize',
                    'right',
                    'rotate',
                    'row-gap',
                    'scale',
                    'stroke',
                    '^scroll',
                    'table-layout',
                    '^text-align',
                    'text-justify',
                    'text-overflow',
                    'top',
                    '^transform',
                    'translate',
                    'user-select',
                    'vertical-align',
                    'visibility',
                    'white-space',
                    'width',
                    'word-break',
                    'word-wrap',
                    'writing-mode',
                    'z-index',
                ],
            },
        },

        /**
         * @name            excludeByTypes
         * @namespace       config.postcssSugarPlugin
         * @type            String[]
         * @default         []
         *
         * Specify some types of comments and code to exclude from the builded css
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        excludeByTypes: [],

        /**
         * @name            excludeCommentByTypes
         * @namespace       config.postcssSugarPlugin
         * @type            String[]
         * @default         ['CssClass']
         *
         * Specify some types of comments to exclude from the builded css
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        excludeCommentByTypes: ['CssClass'],

        /**
         * @name            excludeCodeByTypes
         * @namespace       config.postcssSugarPlugin
         * @type            String[]
         * @default         []
         *
         * Specify some types of code to exclude from the builded css
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        excludeCodeByTypes: [],
    };
}
