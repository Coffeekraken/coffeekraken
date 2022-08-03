export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
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
        cache: true,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3hDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFLElBQUk7UUFFWDs7Ozs7Ozs7OztXQVVHO1FBQ0gsY0FBYyxFQUFFLEVBQUU7UUFFbEI7Ozs7Ozs7Ozs7V0FVRztRQUNILHFCQUFxQixFQUFFLENBQUMsVUFBVSxDQUFDO1FBRW5DOzs7Ozs7Ozs7O1dBVUc7UUFDSCxrQkFBa0IsRUFBRSxFQUFFO0tBQ3pCLENBQUM7QUFDTixDQUFDIn0=