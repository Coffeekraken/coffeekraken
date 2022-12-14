"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name          defaultModifierStart
         * @namespace     config.themeGradient
         * @type          Object
         * @default       {}
         *
         * Specify the modifier value to use to lighten the base color like '--lighten 10% --alpha 0.3' etc...
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultModifierStart: {},
        /**
         * @name          defaultModifierEnd
         * @namespace     config.themeGradient
         * @type          String
         * @default       { lighten: 20 }
         *
         * Specify the modifier value to use to lighten the base color like '--lighten 10% --alpha 0.3' etc...
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultModifierEnd: {
            lighten: 20,
        },
        /**
         * @name          defaultX
         * @namespace     config.themeGradient
         * @type          String
         * @default       50%
         *
         * Specify the default x position to use for generated radial classes
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultX: '50%',
        /**
         * @name          defaultY
         * @namespace     config.themeGradient
         * @type          String
         * @default       50%
         *
         * Specify the default y position to use for generated radial classes
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultY: '50%',
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
        /**
         * @name          defaultTextModifierStart
         * @namespace     config.themeGradient
         * @type          Object
         * @default       {}
         *
         * Specify the modifier value to use to lighten the base color like '--lighten 10% --alpha 0.3' etc...
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultTextModifierStart: {},
        /**
         * @name          defaulTexttModifierEnd
         * @namespace     config.themeGradient
         * @type          String
         * @default       { lighten: 20 }
         *
         * Specify the modifier value to use to lighten the base color like '--lighten 10% --alpha 0.3' etc...
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultTextModifierEnd: {
            lighten: 20,
        },
        /**
         * @name          defaultTextAngle
         * @namespace     config.themeGradient
         * @type          String
         * @default       90deg
         *
         * Specify the default gradient angle to use for generated classes
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultTextAngle: '90deg',
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILG9CQUFvQixFQUFFLEVBQUU7UUFFeEI7Ozs7Ozs7Ozs7V0FVRztRQUNILGtCQUFrQixFQUFFO1lBQ2hCLE9BQU8sRUFBRSxFQUFFO1NBQ2Q7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsUUFBUSxFQUFFLEtBQUs7UUFFZjs7Ozs7Ozs7OztXQVVHO1FBQ0gsUUFBUSxFQUFFLEtBQUs7UUFFZjs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxFQUFFLE9BQU87UUFFckI7Ozs7Ozs7Ozs7V0FVRztRQUNILHdCQUF3QixFQUFFLEVBQUU7UUFFNUI7Ozs7Ozs7Ozs7V0FVRztRQUNILHNCQUFzQixFQUFFO1lBQ3BCLE9BQU8sRUFBRSxFQUFFO1NBQ2Q7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsZ0JBQWdCLEVBQUUsT0FBTztLQUM1QixDQUFDO0FBQ04sQ0FBQztBQWhIRCw0QkFnSEMifQ==