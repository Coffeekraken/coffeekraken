"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
function default_1(api) {
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
            return path_1.default.dirname(api.config.postcssBuilder.output);
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQTBCO0FBRTFCLG1CQUF5QixHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDeEMsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE1BQU07WUFDTixPQUFPLGNBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLEVBQUUsS0FBSztRQUVaLE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRTtnQkFDRjs7Ozs7Ozs7Ozs7bUJBV0c7Z0JBQ0gsVUFBVSxFQUFFO29CQUNSLFNBQVM7b0JBQ1QsYUFBYTtvQkFDYixjQUFjO29CQUNkLHFCQUFxQjtvQkFDckIsYUFBYTtvQkFDYixRQUFRO29CQUNSLFlBQVk7b0JBQ1osT0FBTztvQkFDUCxRQUFRO29CQUNSLE9BQU87b0JBQ1AsY0FBYztvQkFDZCxhQUFhO29CQUNiLFlBQVk7b0JBQ1osYUFBYTtvQkFDYixjQUFjO29CQUNkLFNBQVM7b0JBQ1QsU0FBUztvQkFDVCxRQUFRO29CQUNSLFdBQVc7b0JBQ1gsU0FBUztvQkFDVCxhQUFhO29CQUNiLE1BQU07b0JBQ04sUUFBUTtvQkFDUixPQUFPO29CQUNQLFdBQVc7b0JBQ1gsS0FBSztvQkFDTCxPQUFPO29CQUNQLFFBQVE7b0JBQ1IsaUJBQWlCO29CQUNqQixNQUFNO29CQUNOLGFBQWE7b0JBQ2IsWUFBWTtvQkFDWixTQUFTO29CQUNULE9BQU87b0JBQ1AsT0FBTztvQkFDUCxTQUFTO29CQUNULE9BQU87b0JBQ1AsV0FBVztvQkFDWCxVQUFVO29CQUNWLFFBQVE7b0JBQ1IsY0FBYztvQkFDZCxnQkFBZ0I7b0JBQ2hCLFVBQVU7b0JBQ1YsUUFBUTtvQkFDUixPQUFPO29CQUNQLFFBQVE7b0JBQ1IsU0FBUztvQkFDVCxPQUFPO29CQUNQLFFBQVE7b0JBQ1IsU0FBUztvQkFDVCxjQUFjO29CQUNkLGFBQWE7b0JBQ2IsY0FBYztvQkFDZCxlQUFlO29CQUNmLEtBQUs7b0JBQ0wsWUFBWTtvQkFDWixXQUFXO29CQUNYLGFBQWE7b0JBQ2IsZ0JBQWdCO29CQUNoQixZQUFZO29CQUNaLGFBQWE7b0JBQ2IsT0FBTztvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsY0FBYztvQkFDZCxTQUFTO2lCQUNaO2FBQ0o7U0FDSjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxjQUFjLEVBQUUsRUFBRTtRQUVsQjs7Ozs7Ozs7OztXQVVHO1FBQ0gscUJBQXFCLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFFbkM7Ozs7Ozs7Ozs7V0FVRztRQUNILGtCQUFrQixFQUFFLEVBQUU7S0FDekIsQ0FBQztBQUNOLENBQUM7QUEzSkQsNEJBMkpDIn0=