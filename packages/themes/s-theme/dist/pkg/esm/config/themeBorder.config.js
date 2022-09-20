export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        width: {
            /**
             * @name              default
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           1px
             *
             * Specify the "default" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            default: '1px',
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
            0: 0,
            /**
             * @name              10
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           1
             *
             * Specify the "10" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            10: 1,
            /**
             * @name              20
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           2
             *
             * Specify the "20" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            20: 2,
            /**
             * @name              30
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           4
             *
             * Specify the "30" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            30: 4,
            /**
             * @name              40
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           6
             *
             * Specify the "40" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            40: 6,
            /**
             * @name              50
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           8
             *
             * Specify the "50" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            50: 8,
            /**
             * @name              60
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           12
             *
             * Specify the "60" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            60: 12,
            /**
             * @name              70
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           16
             *
             * Specify the "70" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            70: 16,
            /**
             * @name              80
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           20
             *
             * Specify the "80" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            80: 20,
            /**
             * @name              90
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           24
             *
             * Specify the "90" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            90: 24,
            /**
             * @name              100
             * @namespace         config.themeBorder.width
             * @type              Number
             * @default           30
             *
             * Specify the "90" border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            100: 30,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxLQUFLLEVBQUU7WUFDSDs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLEtBQUs7WUFFZDs7Ozs7Ozs7OztlQVVHO1lBQ0gsQ0FBQyxFQUFFLENBQUM7WUFFSjs7Ozs7Ozs7OztlQVVHO1lBQ0gsRUFBRSxFQUFFLENBQUM7WUFFTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsRUFBRSxFQUFFLENBQUM7WUFFTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsRUFBRSxFQUFFLENBQUM7WUFFTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsRUFBRSxFQUFFLENBQUM7WUFFTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsRUFBRSxFQUFFLENBQUM7WUFFTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsRUFBRSxFQUFFLEVBQUU7WUFFTjs7Ozs7Ozs7OztlQVVHO1lBQ0gsRUFBRSxFQUFFLEVBQUU7WUFFTjs7Ozs7Ozs7OztlQVVHO1lBQ0gsRUFBRSxFQUFFLEVBQUU7WUFFTjs7Ozs7Ozs7OztlQVVHO1lBQ0gsRUFBRSxFQUFFLEVBQUU7WUFFTjs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLEVBQUU7U0FDVjtRQUVELE1BQU0sRUFBRTtZQUNKOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsT0FBTyxFQUFFLEtBQUs7WUFFZDs7Ozs7Ozs7Ozs7ZUFXRztZQUNILENBQUMsRUFBRSxDQUFDO1lBRUo7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxFQUFFLEVBQUUsR0FBRztZQUVQOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsRUFBRSxFQUFFLEdBQUc7WUFFUDs7Ozs7Ozs7Ozs7ZUFXRztZQUNILEVBQUUsRUFBRSxHQUFHO1lBRVA7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxFQUFFLEVBQUUsR0FBRztZQUVQOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsRUFBRSxFQUFFLENBQUM7WUFFTDs7Ozs7Ozs7Ozs7ZUFXRztZQUNILEVBQUUsRUFBRSxHQUFHO1lBRVA7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxFQUFFLEVBQUUsR0FBRztZQUVQOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsRUFBRSxFQUFFLENBQUM7WUFFTDs7Ozs7Ozs7Ozs7ZUFXRztZQUNILEVBQUUsRUFBRSxFQUFFO1lBRU47Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxHQUFHLEVBQUUsRUFBRTtTQUNWO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==