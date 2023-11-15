/**
 * @name                    themeEasing
 * @as                      Easings
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  stable
 *
 * Specify the @coffeekraken/s-theme easing available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (api) {
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
