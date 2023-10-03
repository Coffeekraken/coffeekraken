/**
 * @name                    themeScroll
 * @as                      Scroll
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme scroll available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (api) {
    return {
        /**
         * @name                duration
         * @namespace           config.themeScroll
         * @type                Number
         * @default             300
         *
         * Specify the scroll duration in ms for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        duration: 300,

        /**
         * @name                delay
         * @namespace           config.themeScroll
         * @type                Number
         * @default             300
         *
         * Specify the scroll delay in ms for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        delay: 300,

        /**
         * @name                offset
         * @namespace           config.themeScroll
         * @type                Number
         * @default             0
         *
         * Specify the scroll offset for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        offset: 0,

        /**
         * @name                offsetX
         * @namespace           config.themeScroll
         * @type                Number
         * @default             0
         *
         * Specify the scroll offset x for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        offsetX: 0,

        /**
         * @name                offsetY
         * @namespace           config.themeScroll
         * @type                Number
         * @default             200
         *
         * Specify the scroll offset y for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        offsetY: 200,
    };
}
