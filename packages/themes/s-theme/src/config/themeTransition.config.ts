export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        /**
         * @name                slow
         * @namespace           config.themeTransition
         * @type                String
         * @default             all [api.theme.timing.slow] [api.theme.easing.default]
         *
         * Specify the "slow" transition for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get slow() {
            return `all ${api.theme.timing.slow} ${api.theme.easing.default}`;
        },

        /**
         * @name                default
         * @namespace           config.themeTransition
         * @type                String
         * @default             all [api.theme.timing.default] [api.theme.easing.default]
         *
         * Specify the "default" transition for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get default() {
            return `all ${api.theme.timing.default} ${api.theme.easing.default}`;
        },

        /**
         * @name                fast
         * @namespace           config.themeTransition
         * @type                String
         * @default             all [api.theme.timing.fast] [api.theme.easing.default]
         *
         * Specify the "fast" transition for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get fast() {
            return `all ${api.theme.timing.fast} ${api.theme.easing.default}`;
        },
    };
}
