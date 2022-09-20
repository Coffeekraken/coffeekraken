export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        /**
         * @name                margin
         * @namespace           config.themeScalable
         * @type                Boolean
         * @default             false
         *
         * Specify if the "margins" are scalable in your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        margin: false,
        /**
         * @name                padding
         * @namespace           config.themeScalable
         * @type                Boolean
         * @default             true
         *
         * Specify if the "paddings" are scalable in your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        padding: true,
        /**
         * @name                offsize
         * @namespace           config.themeScalable
         * @type                Boolean
         * @default             false
         *
         * Specify if the "offsize" are scalable in your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        offsize: false,
        /**
         * @name                font
         * @namespace           config.themeScalable
         * @type                Boolean
         * @default             true
         *
         * Specify if the "fonts" are scalable in your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        font: true,
    };
}
