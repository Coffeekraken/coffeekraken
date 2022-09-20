export default function (api) {
    if (api.env.platform !== 'node')
        return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxPQUFPO1lBQ1AsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDbkMsQ0FBQztRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsSUFBSSxDQUFDO1lBQ0QsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxJQUFJLEVBQUU7WUFDRixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNILElBQUksRUFBRTtZQUNGLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsSUFBSSxFQUFFO1lBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxJQUFJLEVBQUU7WUFDRixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNILElBQUksRUFBRTtZQUNGLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsSUFBSSxFQUFFO1lBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxJQUFJLEVBQUU7WUFDRixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNILElBQUksRUFBRTtZQUNGLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsSUFBSSxFQUFFO1lBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxJQUFJLEdBQUc7WUFDSCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9