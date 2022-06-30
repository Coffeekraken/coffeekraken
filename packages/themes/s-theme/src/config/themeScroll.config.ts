export default function (env, config) {
    return {
        /**
         * @name                duration
         * @namespace           config.themeScroll
         * @type                String
         * @default             300
         *
         * Specify the scroll duration for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        duration: 300,

        /**
         * @name                offset
         * @namespace           config.themeScroll
         * @type                String
         * @default             300
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
         * @type                String
         * @default             [theme.layout.offset.left]
         *
         * Specify the scroll offset x for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        offsetX: `[theme.layout.offset.left]`,

        /**
         * @name                offsetY
         * @namespace           config.themeScroll
         * @type                String
         * @default             [theme.layout.offset.top]
         *
         * Specify the scroll offset y for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        offsetY: `[theme.layout.offset.top]`,
    };
}
