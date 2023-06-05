/**
 * @name                    themeColor
 * @as                      Colors
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme color available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default (api) => {
    return {
        /**
         * @name                accent
         * @namespace            config.themeColor
         * @type                Color
         * @default             config.themeBase.defaultColor
         *
         * Specify the "current" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get current() {
            return api.this[api.config.themeBase.defaultColor] ?? api.this.main;
        },

        /**
         * @name                main
         * @namespace            config.themeColor
         * @type                Color
         * @default             #6F7C90
         *
         * Specify the "main" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        main: '#6F7C90',

        /**
         * @name                accent
         * @namespace            config.themeColor
         * @type                Color
         * @default             #ffbb00
         *
         * Specify the "accent" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        accent: '#ffbb00',

        /**
         * @name                complementary
         * @namespace            config.themeColor
         * @type                Color
         * @default             #5100ff
         *
         * Specify the "complementary" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        complementary: ##,

        /**
         * @name                success
         * @namespace            config.themeColor
         * @type                Color
         * @default             #91ff00
         *
         * Specify the "success" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        success: '#91ff00',

        /**
         * @name                warning
         * @namespace            config.themeColor
         * @type                Color
         * @default             #ffd500
         *
         * Specify the "warning" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        warning: '#ffd500',

        /**
         * @name                error
         * @namespace            config.themeColor
         * @type                Color
         * @default             #ff003b
         *
         * Specify the "error" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        error: '#ff003b',

        /**
         * @name                info
         * @namespace            config.themeColor
         * @type                Color
         * @default             #00ffff
         *
         * Specify the "info" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        info: '#00ffff',
    };
};
