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
export default function (api) {
    return {
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
        },
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
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksT0FBTztZQUNQLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2xDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsQ0FBQyxFQUFFLENBQUM7UUFFSjs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxDQUFDO1lBQ0QsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRTtZQUNGLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUU7WUFDRixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFO1lBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRTtZQUNGLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUU7WUFDRixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFO1lBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRTtZQUNGLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUU7WUFDRixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFO1lBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRTtZQUNGLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUU7WUFDRixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxHQUFHO1lBQ0gsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==