export default (api) => {
    return {
        /**
         * @name                accent
         * @namespace            theme.themeColor
         * @type                Color
         * @default             [config.themeColor.main]
         *
         * Specify the "current" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get current() {
            return api.config.themeColor.main;
        },

        /**
         * @name                main
         * @namespace            config.themeColor
         * @type                Color
         * @default             hsla(212,6,50,1)
         *
         * Specify the "main" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        main: 'hsla(212,6,50,1)',

        /**
         * @name                accent
         * @namespace            theme.themeColor
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
         * @namespace            theme.themeColor
         * @type                Color
         * @default             #5100ff
         *
         * Specify the "complementary" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        complementary: '#5100ff',

        /**
         * @name                success
         * @namespace            theme.themeColor
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
         * @namespace            theme.themeColor
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
         * @namespace            theme.themeColor
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
         * @namespace            theme.themeColor
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
