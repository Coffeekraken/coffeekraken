export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        /**
         * @name                1
         * @namespace           config.themeRatio
         * @type                Number
         * @default             1
         *
         * Specify the ratio 1/1 for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        '1': 1,
        /**
         * @name                21-9
         * @namespace           config.themeRatio
         * @type                Number
         * @default             21/9
         *
         * Specify the ratio 21/9 for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        '21-9': 21 / 9,
        /**
         * @name                16-9
         * @namespace           config.themeRatio
         * @type                Number
         * @default             16/9
         *
         * Specify the ratio 16/9 for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        '16-9': 16 / 9,
        /**
         * @name                2-3
         * @namespace           config.themeRatio
         * @type                Number
         * @default             2/3
         *
         * Specify the ratio 2/3 for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        '2-3': 2 / 3,
        /**
         * @name                4-3
         * @namespace           config.themeRatio
         * @type                Number
         * @default             4/3
         *
         * Specify the ratio 4/3 for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        '4-3': 4 / 3,
        /**
         * @name                3-4
         * @namespace           config.themeRatio
         * @type                Number
         * @default             3/4
         *
         * Specify the ratio 3/4 for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        '3-4': 3 / 4,
    };
}
