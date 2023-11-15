/**
 * @name                    themeDefault
 * @as                      Default theme
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  stable
 *
 * Specify the @coffeekraken/s-theme default available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (api) {
    return {
        /**
         * @name          themeName
         * @namespace     config.themeDefault
         * @type          Number
         * @default      default
         *
         * Specify the default theme name
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        themeName: 'default',

        metas: {
            /**
             * @name            title
             * @namespace       config.themeDefault.metas
             * @type            String
             *
             * Specify the theme title
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            /**
             * @name            description
             * @namespace       config.themeDefault.metas
             * @type            String
             *
             * Specify the theme description
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
        },

        variants: {
            /**
             * @name          light
             * @namespace     config.themeDefault.variants
             * @type          Object
             * @default      config.themeDefaultLight
             *
             * Specify the default theme light variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get light() {
                return api.config.themeDefaultLight;
            },

            /**
             * @name          dark
             * @namespace     config.themeDefault.variants
             * @type          Object
             * @default      config.themeDefaultDark
             *
             * Specify the default theme dark variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get dark() {
                return api.config.themeDefaultDark;
            },
        },
    };
}
