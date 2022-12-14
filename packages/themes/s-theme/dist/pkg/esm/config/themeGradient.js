export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name          defaultModifier
         * @namespace     config.themeGradient
         * @type          String
         * @default       --lighten 20%
         *
         * Specify the modifier value to use to lighten the base color like '--lighten 10% --alpha 0.3' etc...
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultModifier: '--lighten 20%',
        /**
         * @name          defaultType
         * @namespace     config.themeGradient
         * @type          String
         * @default       linear
         *
         * Specify the default gradient type to use for generated classes
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultType: 'linear',
        /**
         * @name          defaultAngle
         * @namespace     config.themeGradient
         * @type          String
         * @default       90deg
         *
         * Specify the default gradient angle to use for generated classes
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultAngle: '90deg',
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsZUFBZSxFQUFFLGVBQWU7UUFDaEM7Ozs7Ozs7Ozs7V0FVRztRQUNILFdBQVcsRUFBRSxRQUFRO1FBQ3JCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFZLEVBQUUsT0FBTztLQUN4QixDQUFDO0FBQ04sQ0FBQyJ9