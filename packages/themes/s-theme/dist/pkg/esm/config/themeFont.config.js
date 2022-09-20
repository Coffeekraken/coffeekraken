export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        family: {
            default: {
                /**
                 * @name            font-family
                 * @namespace       config.themeFont.family.default
                 * @type            String
                 * @default         "Titillium Web"
                 *
                 * Declare the "default" font-family
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                'font-family': '"Titillium Web"',
                /**
                 * @name            font-weight
                 * @namespace       config.themeFont.family.default
                 * @type            Number
                 * @default         400
                 *
                 * Declare the "default" font-weight
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                'font-weight': 400,
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
                 * @name            font-family
                 * @namespace       config.themeFont.family.title
                 * @type            String
                 * @default         https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap
                 *
                 * Declare the "default" font-family
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                'font-family': '"Titillium Web"',
                /**
                 * @name            font-weight
                 * @namespace       config.themeFont.family.title
                 * @type            String
                 * @default         600
                 *
                 * Declare the "default" font-weight
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                'font-weight': 600,
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
                 * @name            font-family
                 * @namespace       config.themeFont.family.quote
                 * @type            String
                 * @default         "Palatino, Times, Georgia, serif"
                 *
                 * Declare the "quote" font-family
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                'font-family': '"Palatino, Times, Georgia, serif"',
                /**
                 * @name            font-weight
                 * @namespace       config.themeFont.family.quote
                 * @type            String
                 * @default         normal
                 *
                 * Declare the "quote" font-weight
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                'font-weight': 'normal',
                /**
                 * @name            font-style
                 * @namespace       config.themeFont.family.quote
                 * @type            String
                 * @default         normal"
                 *
                 * Declare the "quote" font-style
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                'font-style': 'normal',
                /**
                 * @name            font-display
                 * @namespace       config.themeFont.family.quote
                 * @type            String
                 * @default         auto
                 *
                 * Declare the "quote" font-display
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                'font-display': 'auto',
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
                'cap-height': 0.65,
            },
            code: {
                /**
                 * @name            font-family
                 * @namespace       config.themeFont.family.code
                 * @type            String
                 * @default         "Menlo, Monaco, Consolas, Courier New, monospace"
                 *
                 * Declare the "code" font-family
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                'font-family': 'Menlo, Monaco, Consolas, Courier New, monospace',
                /**
                 * @name            font-weight
                 * @namespace       config.themeFont.family.code
                 * @type            String
                 * @default         normal
                 *
                 * Declare the "code" font-weight
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                'font-weight': 'normal',
                /**
                 * @name            font-style
                 * @namespace       config.themeFont.family.code
                 * @type            String
                 * @default         normal
                 *
                 * Declare the "code" font-style
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                'font-style': 'normal',
                /**
                 * @name            font-display
                 * @namespace       config.themeFont.family.code
                 * @type            String
                 * @default         auto
                 *
                 * Declare the "code" font-display
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                'font-display': 'auto',
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
                'cap-height': 0.65,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxNQUFNLEVBQUU7WUFDSixPQUFPLEVBQUU7Z0JBQ0w7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsYUFBYSxFQUFFLGlCQUFpQjtnQkFDaEM7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsYUFBYSxFQUFFLEdBQUc7Z0JBQ2xCOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE1BQU0sRUFBRSw4RUFBOEU7YUFDekY7WUFFRCxLQUFLLEVBQUU7Z0JBQ0g7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsYUFBYSxFQUFFLGlCQUFpQjtnQkFDaEM7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsYUFBYSxFQUFFLEdBQUc7Z0JBQ2xCOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE1BQU0sRUFBRSw4RUFBOEU7YUFDekY7WUFFRCxLQUFLLEVBQUU7Z0JBQ0g7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsYUFBYSxFQUFFLG1DQUFtQztnQkFDbEQ7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsYUFBYSxFQUFFLFFBQVE7Z0JBQ3ZCOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFlBQVksRUFBRSxRQUFRO2dCQUN0Qjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxjQUFjLEVBQUUsTUFBTTtnQkFDdEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsWUFBWSxFQUFFLElBQUk7YUFDckI7WUFFRCxJQUFJLEVBQUU7Z0JBQ0Y7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsYUFBYSxFQUNULGlEQUFpRDtnQkFDckQ7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsYUFBYSxFQUFFLFFBQVE7Z0JBQ3ZCOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFlBQVksRUFBRSxRQUFRO2dCQUN0Qjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxjQUFjLEVBQUUsTUFBTTtnQkFDdEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsWUFBWSxFQUFFLElBQUk7YUFDckI7U0FDSjtRQUVELElBQUksRUFBRTtZQUNGOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsSUFBSSxPQUFPO2dCQUNQLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2xDLENBQUM7WUFFRDs7Ozs7Ozs7Ozs7ZUFXRztZQUNILENBQUMsRUFBRSxDQUFDO1lBRUo7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxJQUFJLENBQUM7Z0JBQ0QsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQixDQUFDO1lBRUQ7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxJQUFJLEdBQUc7Z0JBQ0gsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxDQUFDO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9