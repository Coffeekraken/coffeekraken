"use strict";
/**
 * @name                    themeFont
 * @as                      Fonts
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  stable
 *
 * Specify the @coffeekraken/s-theme font available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    return {
        family: {
            default: {
                /**
                 * @name            fontFamily
                 * @namespace       config.themeFont.family.default
                 * @type            String
                 * @default         "Roboto"
                 *
                 * Declare the "default" fontFamily
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                fontFamily: '"Roboto"',
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
                 * @default         https://fonts.googleapis.com/css2?family=Roboto&display=swap
                 *
                 * Declare the "default" import
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                import: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
            },
            title: {
                /**
                 * @name            fontFamily
                 * @namespace       config.themeFont.family.title
                 * @type            String
                 * @default         Roboto
                 *
                 * Declare the "default" fontFamily
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                fontFamily: '"Roboto"',
                /**
                 * @name            fontWeight
                 * @namespace       config.themeFont.family.title
                 * @type            String
                 * @default         500
                 *
                 * Declare the "default" fontWeight
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                fontWeight: 500,
                /**
                 * @name            import
                 * @namespace       config.themeFont.family.title
                 * @type            String
                 * @default         https://fonts.googleapis.com/css2?family=Roboto:wght@600&display=swap
                 *
                 * Declare the "default" import
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                import: 'https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap',
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
             * @type          Number
             * @default       theme.size.default
             *
             * Declare the default font size.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get default() {
                return api.theme.size.default;
            }
            /**
             * @name          0
             * @namespace     config.themeFont.size
             * @type          Number
             * @default       0
             *
             * Declare the "0" font size.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            ,
            /**
             * @name          0
             * @namespace     config.themeFont.size
             * @type          Number
             * @default       0
             *
             * Declare the "0" font size.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            0: 0,
            /**
             * @name          5
             * @namespace     config.themeFont.size
             * @type          Number
             * @default       [theme.size.5]
             *
             * Declare the "5" font size.
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
             * @type          Number
             * @default       [theme.size.10]
             *
             * Declare the "10" font size.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get 10() {
                return api.theme.size['10'];
            },
            /**
             * @name          15
             * @namespace     config.themeFont.size
             * @type          Number
             * @default       [theme.size.15]
             *
             * Declare the "15" font size.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get 15() {
                return api.theme.size['15'];
            },
            /**
             * @name          20
             * @namespace     config.themeFont.size
             * @type          Number
             * @default       [theme.size.20]
             *
             * Declare the "20" font size.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get 20() {
                return api.theme.size['20'];
            },
            /**
             * @name          25
             * @namespace     config.themeFont.size
             * @type          Number
             * @default       [theme.size.25]
             *
             * Declare the "25" font size.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get 25() {
                return api.theme.size['25'];
            },
            /**
             * @name          30
             * @namespace     config.themeFont.size
             * @type          Number
             * @default       [theme.size.30]
             *
             * Declare the "30" font size.
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
             * @type          Number
             * @default       [theme.size.40]
             *
             * Declare the "40" font size.
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
             * @type          Number
             * @default       [theme.size.50]
             *
             * Declare the "50" font size.
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
             * @type          Number
             * @default       [theme.size.60]
             *
             * Declare the "60" font size.
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
             * @type          Number
             * @default       [theme.size.70]
             *
             * Declare the "70" font size.
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
             * @type          Number
             * @default       [theme.size.80]
             *
             * Declare the "80" font size.
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
             * @type          Number
             * @default      [theme.size.90]
             *
             * Declare the "90" font size.
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
             * @type          Number
             * @default      [theme.size.100]
             *
             * Declare the "100" font size.
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTztRQUNILE1BQU0sRUFBRTtZQUNKLE9BQU8sRUFBRTtnQkFDTDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxVQUFVLEVBQUUsVUFBVTtnQkFDdEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsVUFBVSxFQUFFLEdBQUc7Z0JBQ2Y7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsTUFBTSxFQUFFLDhEQUE4RDthQUN6RTtZQUVELEtBQUssRUFBRTtnQkFDSDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxVQUFVLEVBQUUsVUFBVTtnQkFDdEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsVUFBVSxFQUFFLEdBQUc7Z0JBQ2Y7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsTUFBTSxFQUFFLHVFQUF1RTthQUNsRjtZQUVELEtBQUssRUFBRTtnQkFDSDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxVQUFVLEVBQUUsbUNBQW1DO2dCQUMvQzs7Ozs7Ozs7OzttQkFVRztnQkFDSCxVQUFVLEVBQUUsUUFBUTtnQkFDcEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsU0FBUyxFQUFFLFFBQVE7Z0JBQ25COzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFBRSxNQUFNO2dCQUNuQjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxTQUFTLEVBQUUsSUFBSTthQUNsQjtZQUVELElBQUksRUFBRTtnQkFDRjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxVQUFVLEVBQUUsaURBQWlEO2dCQUM3RDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxVQUFVLEVBQUUsUUFBUTtnQkFDcEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsU0FBUyxFQUFFLFFBQVE7Z0JBQ25COzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFBRSxNQUFNO2dCQUNuQjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxTQUFTLEVBQUUsSUFBSTthQUNsQjtTQUNKO1FBRUQsSUFBSSxFQUFFO1lBRUY7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksT0FBTztnQkFDUCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNsQyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRzs7WUFWSDs7Ozs7Ozs7OztlQVVHO1lBQ0gsQ0FBQyxFQUFFLENBQUM7WUFFSjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxDQUFDO2dCQUNELE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0IsQ0FBQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRTtnQkFDRixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsQ0FBQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRTtnQkFDRixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsQ0FBQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRTtnQkFDRixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsQ0FBQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRTtnQkFDRixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxHQUFHO2dCQUNILE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsQ0FBQztTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFsYkQsNEJBa2JDIn0=