import __path from 'path';
/**
 * @name                    sugarcssPluginConfig
 * @as                      PostCSS Sugar plugin config
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  stable
 *
 * Specify the @coffeekraken/s-sugarcss-plugin available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            outDir
         * @namespace       config.sugarcssPlugin
         * @type            String
         * @default        __path.dirname(`${api.config.storage.dist.cssDir}/index.css`)
         *
         * Specify a directory in which to save relatively exported css, etc...
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get outDir() {
            return __path.dirname(`${api.config.storage.dist.cssDir}/index.css`);
        },
        clean: {
            /**
             * @name            variables
             * @namespace       config.sugarcssPlugin.clean
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
        /**
         * @name            classmap
         * @namespace       config.sugarcssPlugin
         * @type            {ISClassmapSettings | false}
         * @default         api.theme.classmap.enabled ? {} : false
         *
         * Specigy some SClassmap settings, of false if you dont want to use classmap at all.
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get classmap() {
            return api.theme.classmap.enabled ? {} : false;
        },
        /**
         * @name            excludeByTypes
         * @namespace       config.sugarcssPlugin
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
         * @namespace       config.sugarcssPlugin
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
         * @namespace       config.sugarcssPlugin
         * @type            String[]
         * @default         []
         *
         * Specify some types of code to exclude from the builded css
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        excludeCodeByTypes: [],
        /**
         * @name            viewsRootDirs
         * @namespace       config.sugarcssPlugin
         * @type            String[]
         * @default         []
         *
         * Specify where are stored the views to be able to import them in your css
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get viewsRootDirs() {
            return api.config.viewRenderer.rootDirs;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQjs7Ozs7Ozs7Ozs7O0dBWUc7QUFFSCxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksTUFBTTtZQUNOLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FDakIsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxZQUFZLENBQ2hELENBQUM7UUFDTixDQUFDO1FBRUQsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxJQUFJLFNBQVM7Z0JBQ1QsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxZQUFZLENBQUM7WUFDM0MsQ0FBQztTQUNKO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksUUFBUTtZQUNSLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNuRCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILGNBQWMsRUFBRSxFQUFFO1FBRWxCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxxQkFBcUIsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUVuQzs7Ozs7Ozs7OztXQVVHO1FBQ0gsa0JBQWtCLEVBQUUsRUFBRTtRQUV0Qjs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxhQUFhO1lBQ2IsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDNUMsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=