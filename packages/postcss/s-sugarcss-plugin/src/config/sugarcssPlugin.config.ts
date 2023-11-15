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
    if (api.env.platform !== 'node') return;

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
            return __path.dirname(
                `${api.config.storage.dist.cssDir}/index.css`,
            );
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
            get variables(): boolean {
                return api.env.target === 'production';
            },
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
