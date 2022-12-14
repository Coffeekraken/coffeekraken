"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILGVBQWUsRUFBRSxlQUFlO1FBQ2hDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxXQUFXLEVBQUUsUUFBUTtRQUNyQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxFQUFFLE9BQU87S0FDeEIsQ0FBQztBQUNOLENBQUM7QUF6Q0QsNEJBeUNDIn0=