export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        /**
         * @name                default
         * @namespace           config.themeEasing
         * @type                String
         * @default             cubic-bezier(0.700, 0.000, 0.305, 0.995)
         *
         * Specify the "default" easing for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        default: 'cubic-bezier(0.700, 0.000, 0.305, 0.995)',
    };
}
