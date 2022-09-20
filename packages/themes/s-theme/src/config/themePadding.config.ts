export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        /**
         * @name            default
         * @namespace       config.themePadding
         * @type            String
         * @default         [theme.space.default]
         *
         * Specify the "default" space used for paddings
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get default() {
            return api.theme.space.default;
        },

        /**
         * @name            0
         * @namespace       config.themePadding
         * @type            String
         * @default         [theme.space.0]
         *
         * Specify the "0" space used for paddings.
         * MUST be a scale factor relative to the "default" absolute value specified.
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get 0() {
            return api.theme.space['0'];
        },

        /**
         * @name            10
         * @namespace       config.themePadding
         * @type            String
         * @default         [theme.space.10]
         *
         * Specify the "10" space used for paddings.
         * MUST be a scale factor relative to the "default" absolute value specified.
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get 10() {
            return api.theme.space['10'];
        },

        /**
         * @name            20
         * @namespace       config.themePadding
         * @type            String
         * @default         [theme.space.20]
         *
         * Specify the "20" space used for paddings.
         * MUST be a scale factor relative to the "default" absolute value specified.
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get 20() {
            return api.theme.space['20'];
        },

        /**
         * @name            30
         * @namespace       config.themePadding
         * @type            String
         * @default         [theme.space.30]
         *
         * Specify the "30" space used for paddings.
         * MUST be a scale factor relative to the "default" absolute value specified.
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get 30() {
            return api.theme.space['30'];
        },

        /**
         * @name            40
         * @namespace       config.themePadding
         * @type            String
         * @default         [theme.space.40]
         *
         * Specify the "40" space used for paddings.
         * MUST be a scale factor relative to the "default" absolute value specified.
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get 40() {
            return api.theme.space['40'];
        },

        /**
         * @name            50
         * @namespace       config.themePadding
         * @type            String
         * @default         [theme.space.50]
         *
         * Specify the "50" space used for paddings.
         * MUST be a scale factor relative to the "default" absolute value specified.
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get 50() {
            return api.theme.space['50'];
        },

        /**
         * @name            60
         * @namespace       config.themePadding
         * @type            String
         * @default         [theme.space.60]
         *
         * Specify the "60" space used for paddings.
         * MUST be a scale factor relative to the "default" absolute value specified.
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get 60() {
            return api.theme.space['60'];
        },

        /**
         * @name            70
         * @namespace       config.themePadding
         * @type            String
         * @default         [theme.space.70]
         *
         * Specify the "70" space used for paddings.
         * MUST be a scale factor relative to the "default" absolute value specified.
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get 70() {
            return api.theme.space['70'];
        },

        /**
         * @name            80
         * @namespace       config.themePadding
         * @type            String
         * @default         [theme.space.80]
         *
         * Specify the "80" space used for paddings.
         * MUST be a scale factor relative to the "default" absolute value specified.
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get 80() {
            return api.theme.space['80'];
        },

        /**
         * @name            90
         * @namespace       config.themePadding
         * @type            String
         * @default         [theme.space.90]
         *
         * Specify the "90" space used for paddings.
         * MUST be a scale factor relative to the "default" absolute value specified.
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get 90() {
            return api.theme.space['90'];
        },

        /**
         * @name            100
         * @namespace       config.themePadding
         * @type            String
         * @default         [theme.space.90]
         *
         * Specify the "100" space used for paddings.
         * MUST be a scale factor relative to the "default" absolute value specified.
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get 100() {
            return api.theme.space['100'];
        },
    };
}
