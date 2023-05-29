/**
 * @name                    themeDefaultLight
 * @as                      Default light theme
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme default light available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (api) {
    return api.extends(api.config.themeBase, {
        metas: {
            title: 'Default light',
            description: 'Nice and elegant light theme',
        },

        /**
         * @name            colorSchema
         * @namespace        config.themeDefaultDark
         * @type            String
         * @default         config.themeColorSchemaLight
         *
         * Specify the color schema to be used in the dark theme
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get colorSchema() {
            return api.config.themeColorSchemaLight;
        },
    });
}
