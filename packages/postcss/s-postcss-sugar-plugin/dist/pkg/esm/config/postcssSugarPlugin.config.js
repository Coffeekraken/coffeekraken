import __path from 'path';
export default function (api) {
    if (api.env.platform !== 'node')
        return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUN4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksTUFBTTtZQUNOLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSxLQUFLO1FBRVosTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFO2dCQUNGOzs7Ozs7Ozs7OzttQkFXRztnQkFDSCxVQUFVLEVBQUU7b0JBQ1IsU0FBUztvQkFDVCxhQUFhO29CQUNiLGNBQWM7b0JBQ2QscUJBQXFCO29CQUNyQixhQUFhO29CQUNiLFFBQVE7b0JBQ1IsWUFBWTtvQkFDWixPQUFPO29CQUNQLFFBQVE7b0JBQ1IsT0FBTztvQkFDUCxjQUFjO29CQUNkLGFBQWE7b0JBQ2IsWUFBWTtvQkFDWixhQUFhO29CQUNiLGNBQWM7b0JBQ2QsU0FBUztvQkFDVCxTQUFTO29CQUNULFFBQVE7b0JBQ1IsV0FBVztvQkFDWCxTQUFTO29CQUNULGFBQWE7b0JBQ2IsTUFBTTtvQkFDTixRQUFRO29CQUNSLE9BQU87b0JBQ1AsV0FBVztvQkFDWCxLQUFLO29CQUNMLE9BQU87b0JBQ1AsUUFBUTtvQkFDUixpQkFBaUI7b0JBQ2pCLE1BQU07b0JBQ04sYUFBYTtvQkFDYixZQUFZO29CQUNaLFNBQVM7b0JBQ1QsT0FBTztvQkFDUCxPQUFPO29CQUNQLFNBQVM7b0JBQ1QsT0FBTztvQkFDUCxXQUFXO29CQUNYLFVBQVU7b0JBQ1YsUUFBUTtvQkFDUixjQUFjO29CQUNkLGdCQUFnQjtvQkFDaEIsVUFBVTtvQkFDVixRQUFRO29CQUNSLE9BQU87b0JBQ1AsUUFBUTtvQkFDUixTQUFTO29CQUNULE9BQU87b0JBQ1AsUUFBUTtvQkFDUixTQUFTO29CQUNULGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixjQUFjO29CQUNkLGVBQWU7b0JBQ2YsS0FBSztvQkFDTCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsYUFBYTtvQkFDYixnQkFBZ0I7b0JBQ2hCLFlBQVk7b0JBQ1osYUFBYTtvQkFDYixPQUFPO29CQUNQLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxjQUFjO29CQUNkLFNBQVM7aUJBQ1o7YUFDSjtTQUNKO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILGNBQWMsRUFBRSxFQUFFO1FBRWxCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxxQkFBcUIsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUVuQzs7Ozs7Ozs7OztXQVVHO1FBQ0gsa0JBQWtCLEVBQUUsRUFBRTtLQUN6QixDQUFDO0FBQ04sQ0FBQyJ9