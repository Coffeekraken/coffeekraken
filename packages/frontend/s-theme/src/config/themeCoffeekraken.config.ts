/**
 * @name                    themeCoffeekraken
 * @as                      Coffeekraken theme
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme coffeekraken available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (api) {
    return {
        /**
         * @name          themeName
         * @namespace     config.themeCoffeekraken
         * @type          Number
         * @default      coffeekraken
         *
         * Specify the default theme name
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        themeName: 'coffeekraken',

        metas: {
            /**
             * @name            title
             * @namespace       config.themeCoffeekraken.metas
             * @type            String
             *
             * Specify the theme title
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            /**
             * @name            description
             * @namespace       config.themeCoffeekraken.metas
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
             * @namespace     config.themeCoffeekraken.variants
             * @type          Object
             * @default      config.themeCoffeekrakenLight
             *
             * Specify the default theme light variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get light() {
                return api.config.themeCoffeekrakenLight;
            },

            /**
             * @name          dark
             * @namespace     config.themeCoffeekraken.variants
             * @type          Object
             * @default      config.themeCoffeekrakenDark
             *
             * Specify the default theme dark variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get dark() {
                return api.config.themeCoffeekrakenDark;
            },
        },
    };
}
