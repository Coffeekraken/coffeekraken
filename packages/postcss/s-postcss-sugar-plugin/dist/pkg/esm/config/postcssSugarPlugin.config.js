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
        clean: {
            /**
             * @name            variables
             * @namespace       config.postcssSugarPlugin.clean
             * @type            Boolean
             * @default         undefined
             *
             * Specify if you want to clean unused variables in your final css.
             * If is set to "undefined", it will be true only for production target build.
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get variables() {
                return api.env.target === 'production';
            },
        },
        compress: {
            /**
             * @name            variables
             * @namespace       config.postcssSugarPlugin.compress
             * @type            Boolean
             * @default         undefined
             *
             * Specify if you want to compress the --s-theme... variables or not.
             * If is set to "undefined", it will be true only for production target build.
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get variables() {
                return api.env.target === 'production';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUN4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksTUFBTTtZQUNOLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBRUQsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxJQUFJLFNBQVM7Z0JBQ1QsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxZQUFZLENBQUM7WUFDM0MsQ0FBQztTQUNKO1FBRUQsUUFBUSxFQUFFO1lBQ047Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxJQUFJLFNBQVM7Z0JBQ1QsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxZQUFZLENBQUM7WUFDM0MsQ0FBQztTQUNKO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILGNBQWMsRUFBRSxFQUFFO1FBRWxCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxxQkFBcUIsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUVuQzs7Ozs7Ozs7OztXQVVHO1FBQ0gsa0JBQWtCLEVBQUUsRUFBRTtLQUN6QixDQUFDO0FBQ04sQ0FBQyJ9