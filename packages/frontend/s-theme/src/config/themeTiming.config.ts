/**
 * @name                    themeTiming
 * @as                      Timings
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  stable
 *
 * Specify the @coffeekraken/s-theme timing available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (api) {
    return {
        /**
         * @name                slow
         * @namespace           config.themeTiming
         * @type                String
         * @default             0.6s
         *
         * Specify the "slow" timing  for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        slow: '.6s',
        /**
         * @name                default
         * @namespace           config.themeTiming
         * @type                String
         * @default             0.3s
         *
         * Specify the "default" timing  for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        default: '.3s',
        /**
         * @name                fast
         * @namespace           config.themeTiming
         * @type                String
         * @default             0.1s
         *
         * Specify the "fast" timing  for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        fast: '.1s',
    };
}
