export default function (env, config) {
    return {
        /**
         * @name                slow
         * @namespace           config.themeTransition
         * @type                String
         * @default             all [theme.timing.slow] [theme.easing.default]
         *
         * Specify the "slow" transition for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        slow: 'all [theme.timing.slow] [theme.easing.default]',
        /**
         * @name                default
         * @namespace           config.themeTransition
         * @type                String
         * @default             all [theme.timing.default] [theme.easing.default]
         *
         * Specify the "default" transition for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        default: 'all [theme.timing.default] [theme.easing.default]',
        /**
         * @name                fast
         * @namespace           config.themeTransition
         * @type                String
         * @default             all [theme.timing.fast] [theme.easing.default]
         *
         * Specify the "fast" transition for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        fast: 'all [theme.timing.fast] [theme.easing.default]',
    };
}
