export default function (api) {
    return {
        family: {
            default: {
                /**
                 * @name            fontFamily
                 * @namespace       config.themeFont.family.default
                 * @type            String
                 * @default         "Titillium Web"
                 *
                 * Declare the "default" fontFamily
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                fontFamily: '"Titillium Web"',
                /**
                 * @name            fontWeight
                 * @namespace       config.themeFont.family.default
                 * @type            Number
                 * @default         400
                 *
                 * Declare the "default" fontWeight
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                fontWeight: 400,
                /**
                 * @name            import
                 * @namespace       config.themeFont.family.default
                 * @type            String
                 * @default         https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap
                 *
                 * Declare the "default" import
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                import: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap',
            },

            title: {
                /**
                 * @name            fontFamily
                 * @namespace       config.themeFont.family.title
                 * @type            String
                 * @default         https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap
                 *
                 * Declare the "default" fontFamily
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                fontFamily: '"Titillium Web"',
                /**
                 * @name            fontWeight
                 * @namespace       config.themeFont.family.title
                 * @type            String
                 * @default         600
                 *
                 * Declare the "default" fontWeight
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                fontWeight: 600,
                /**
                 * @name            import
                 * @namespace       config.themeFont.family.title
                 * @type            String
                 * @default         https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap
                 *
                 * Declare the "default" import
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                import: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap',
            },

            quote: {
                /**
                 * @name            fontFamily
                 * @namespace       config.themeFont.family.quote
                 * @type            String
                 * @default         "Palatino, Times, Georgia, serif"
                 *
                 * Declare the "quote" fontFamily
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                fontFamily: '"Palatino, Times, Georgia, serif"',
                /**
                 * @name            fontWeight
                 * @namespace       config.themeFont.family.quote
                 * @type            String
                 * @default         normal
                 *
                 * Declare the "quote" fontWeight
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                fontWeight: 'normal',
                /**
                 * @name            fontStyle
                 * @namespace       config.themeFont.family.quote
                 * @type            String
                 * @default         normal"
                 *
                 * Declare the "quote" fontStyle
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                fontStyle: 'normal',
                /**
                 * @name            fontDisplay
                 * @namespace       config.themeFont.family.quote
                 * @type            String
                 * @default         auto
                 *
                 * Declare the "quote" fontDisplay
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                fontDisplay: 'auto',
                /**
                 * @name            cap-height
                 * @namespace       config.themeFont.family.quote
                 * @type            Number
                 * @default         0.65
                 *
                 * Declare the "quote" cap-height
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                capHeight: 0.65,
            },

            code: {
                /**
                 * @name            fontFamily
                 * @namespace       config.themeFont.family.code
                 * @type            String
                 * @default         "Menlo, Monaco, Consolas, Courier New, monospace"
                 *
                 * Declare the "code" fontFamily
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                fontFamily: 'Menlo, Monaco, Consolas, Courier New, monospace',
                /**
                 * @name            fontWeight
                 * @namespace       config.themeFont.family.code
                 * @type            String
                 * @default         normal
                 *
                 * Declare the "code" fontWeight
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                fontWeight: 'normal',
                /**
                 * @name            fontStyle
                 * @namespace       config.themeFont.family.code
                 * @type            String
                 * @default         normal
                 *
                 * Declare the "code" fontStyle
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                fontStyle: 'normal',
                /**
                 * @name            fontDisplay
                 * @namespace       config.themeFont.family.code
                 * @type            String
                 * @default         auto
                 *
                 * Declare the "code" fontDisplay
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                fontDisplay: 'auto',
                /**
                 * @name            cap-height
                 * @namespace       config.themeFont.family.code
                 * @type            Number
                 * @default         0.65
                 *
                 * Declare the "code" cap-height
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                capHeight: 0.65,
            },
        },

        size: {
            /**
             * @name          default
             * @namespace     config.themeFont.size
             * @type          String
             * @default       [theme.size.default]
             *
             * Declare the "default" font size.
             * MUST be an absolute css value like "3rem".
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get default() {
                return api.theme.size.default;
            },

            /**
             * @name          0
             * @namespace     config.themeFont.size
             * @type          String
             * @default       0
             *
             * Declare the "0" font size.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            0: 0,

            /**
             * @name          5
             * @namespace     config.themeFont.size
             * @type          String
             * @default       [theme.size.5]
             *
             * Declare the "5" font size.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get 5() {
                return api.theme.size['5'];
            },

            /**
             * @name          10
             * @namespace     config.themeFont.size
             * @type          String
             * @default       [theme.size.10]
             *
             * Declare the "10" font size.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get 10() {
                return api.theme.size['10'];
            },

            /**
             * @name          20
             * @namespace     config.themeFont.size
             * @type          String
             * @default       [theme.size.20]
             *
             * Declare the "20" font size.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get 20() {
                return api.theme.size['20'];
            },

            /**
             * @name          30
             * @namespace     config.themeFont.size
             * @type          String
             * @default       [theme.size.30]
             *
             * Declare the "30" font size.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get 30() {
                return api.theme.size['30'];
            },

            /**
             * @name          40
             * @namespace     config.themeFont.size
             * @type          String
             * @default       [theme.size.40]
             *
             * Declare the "40" font size.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get 40() {
                return api.theme.size['40'];
            },

            /**
             * @name          50
             * @namespace     config.themeFont.size
             * @type          String
             * @default       [theme.size.50]
             *
             * Declare the "50" font size.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get 50() {
                return api.theme.size['50'];
            },

            /**
             * @name          60
             * @namespace     config.themeFont.size
             * @type          String
             * @default       [theme.size.60]
             *
             * Declare the "60" font size.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get 60() {
                return api.theme.size['60'];
            },

            /**
             * @name          70
             * @namespace     config.themeFont.size
             * @type          String
             * @default       [theme.size.70]
             *
             * Declare the "70" font size.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get 70() {
                return api.theme.size['70'];
            },

            /**
             * @name          80
             * @namespace     config.themeFont.size
             * @type          String
             * @default       [theme.size.80]
             *
             * Declare the "80" font size.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get 80() {
                return api.theme.size['80'];
            },

            /**
             * @name          90
             * @namespace     config.themeFont.size
             * @type          String
             * @default      [theme.size.90]
             *
             * Declare the "90" font size.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get 90() {
                return api.theme.size['90'];
            },

            /**
             * @name          100
             * @namespace     config.themeFont.size
             * @type          String
             * @default      [theme.size.100]
             *
             * Declare the "100" font size.
             * MUST be a scale factor relative to the "default" absolute value specified.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get 100() {
                return api.theme.size['100'];
            },
        },
    };
}
