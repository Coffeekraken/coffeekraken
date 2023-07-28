/**
 * @name                    themeDefaultDark
 * @as                      Default dark theme
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme default dark available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (api) {
    return api.extends(api.config.themeBase, {
        metas: {
            title: 'Default dark',
            description: 'Nice and elegant dark theme',
        },

        /**
         * @name            shades
         * @namespace        config.themeDefaultDark
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
