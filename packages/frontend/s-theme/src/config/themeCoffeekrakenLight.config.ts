/**
 * @name                    themeCoffeekrakenLight
 * @as                      Default dark theme
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme coffeekraken light available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (api) {
    return api.extends(api.config.themeBase, {
        metas: {
            title: 'Coffeekraken light',
            description: 'Nice and elegant coffeekraken light theme',
        },

        get color() {
            return {
                ...api.config.themeColor,
                main: '#737A8C',
                accent: '#F7C33F',
                complementary: '#F9656E',
            };
        },

        /**
         * @name            shades
         * @namespace        config.themeCoffeekrakenLight
         * @type            String
         * @default         config.themeShadesDark
         *
         * Specify the color shades to be used in the light theme
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get shades() {
            return api.extends(api.config.themeShadesLight, {
                background: {
                    lighten: 47,
                },
            });
        },
    });
}
