export default function (env, config) {
    return {
        width: {
            /**
             * @name              default
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           [theme.border.width.10]
             *
             * Specify the "default" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            default: '[theme.border.width.10]',

            /**
             * @name              0
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           0
             *
             * Specify the "0" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            0: '0px',

            /**
             * @name              10
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           1px
             *
             * Specify the "10" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            10: '1px',

            /**
             * @name              20
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           2px
             *
             * Specify the "20" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            20: '2px',

            /**
             * @name              30
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           4px
             *
             * Specify the "30" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            30: '4px',

            /**
             * @name              40
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           6px
             *
             * Specify the "40" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            40: '6px',

            /**
             * @name              50
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           8px
             *
             * Specify the "50" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            50: '8px',

            /**
             * @name              60
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           12px
             *
             * Specify the "60" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            60: '12px',

            /**
             * @name              70
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           16px
             *
             * Specify the "70" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            70: '16px',

            /**
             * @name              80
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           20px
             *
             * Specify the "80" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            80: '20px',

            /**
             * @name              90
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           24px
             *
             * Specify the "90" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            90: '24px',

            /**
             * @name              100
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           30px
             *
             * Specify the "90" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            100: '30px',
        },

        radius: {
            /**
             * @name              default
             * @namespace         config.themeBorder.radius
             * @type              Number
             * @default           5px
             *
             * Specify the "default" border radius.
             * MUST be an absolute css value like "3rem".
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            default: '5px',

            /**
             * @name              0
             * @namespace         config.themeBorder.radius
             * @type              Number
             * @default           0
             *
             * Specify the "0" border radius.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            0: 0,

            /**
             * @name              10
             * @namespace         config.themeBorder.radius
             * @type              Number
             * @default           0.8
             *
             * Specify the "10" border radius.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            10: 0.8,

            /**
             * @name              20
             * @namespace         config.themeBorder.radius
             * @type              Number
             * @default           1.6
             *
             * Specify the "20" border radius.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            20: 1.6,

            /**
             * @name              30
             * @namespace         config.themeBorder.radius
             * @type              Number
             * @default           2.4
             *
             * Specify the "30" border radius.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            30: 2.4,

            /**
             * @name              40
             * @namespace         config.themeBorder.radius
             * @type              Number
             * @default           3.2
             *
             * Specify the "40" border radius.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            40: 3.2,

            /**
             * @name              50
             * @namespace         config.themeBorder.radius
             * @type              Number
             * @default           4
             *
             * Specify the "50" border radius.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            50: 4,

            /**
             * @name              60
             * @namespace         config.themeBorder.radius
             * @type              Number
             * @default           5.2
             *
             * Specify the "60" border radius.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            60: 5.2,

            /**
             * @name              70
             * @namespace         config.themeBorder.radius
             * @type              Number
             * @default           6.4
             *
             * Specify the "70" border radius.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            70: 6.4,

            /**
             * @name              80
             * @namespace         config.themeBorder.radius
             * @type              Number
             * @default           8
             *
             * Specify the "80" border radius.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            80: 8,

            /**
             * @name              90
             * @namespace         config.themeBorder.radius
             * @type              Number
             * @default           10
             *
             * Specify the "90" border radius.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            90: 10,

            /**
             * @name              100
             * @namespace         config.themeBorder.radius
             * @type              Number
             * @default           12
             *
             * Specify the "90" border radius.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            100: 12,
        },
    };
}
