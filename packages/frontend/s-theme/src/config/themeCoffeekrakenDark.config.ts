/**
 * @name                    themeCoffeekrakenDark
 * @as                      Default dark theme
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme coffeekraken dark available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (api) {
    return api.extends(api.config.themeBase, {
        metas: {
            title: 'Coffeekraken dark',
            description: 'Nice and elegant coffeekraken dark theme',
        },

        get color() {
            return {
                ...api.config.themeColor,
                base: '#90816F',
                accent: '#CAAC72',
                complementary: '#A0917F',
            };
        },

        /**
         * @name            shades
         * @namespace        config.themeCoffeekrakenDark
         * @type            String
         * @default         config.themeShadesDark
         *
         * Specify the color shades to be used in the dark theme
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get shades() {
            return api.config.themeShadesDark;
        },
    });
}
