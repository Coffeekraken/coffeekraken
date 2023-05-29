"use strict";
/**
 * @name                    themeColor
 * @as                      Colors
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme color available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (api) => {
    return {
        /**
         * @name                accent
         * @namespace            config.themeColor
         * @type                Color
         * @default             config.themeBase.defaultColor
         *
         * Specify the "current" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get current() {
            return api.config.themeBase.defaultColor;
        },
        /**
         * @name                main
         * @namespace            config.themeColor
         * @type                Color
         * @default             #6F7C90
         *
         * Specify the "main" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        main: '#6F7C90',
        /**
         * @name                accent
         * @namespace            config.themeColor
         * @type                Color
         * @default             #ffbb00
         *
         * Specify the "accent" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        accent: '#ffbb00',
        /**
         * @name                complementary
         * @namespace            config.themeColor
         * @type                Color
         * @default             #5100ff
         *
         * Specify the "complementary" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        complementary: '#5100ff',
        /**
         * @name                success
         * @namespace            config.themeColor
         * @type                Color
         * @default             #91ff00
         *
         * Specify the "success" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        success: '#91ff00',
        /**
         * @name                warning
         * @namespace            config.themeColor
         * @type                Color
         * @default             #ffd500
         *
         * Specify the "warning" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        warning: '#ffd500',
        /**
         * @name                error
         * @namespace            config.themeColor
         * @type                Color
         * @default             #ff003b
         *
         * Specify the "error" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        error: '#ff003b',
        /**
         * @name                info
         * @namespace            config.themeColor
         * @type                Color
         * @default             #00ffff
         *
         * Specify the "info" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        info: '#00ffff',
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsa0JBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuQixPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksT0FBTztZQUNQLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO1FBQzdDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLFNBQVM7UUFFZjs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFLFNBQVM7UUFFakI7Ozs7Ozs7Ozs7V0FVRztRQUNILGFBQWEsRUFBRSxTQUFTO1FBRXhCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsU0FBUztRQUVsQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLFNBQVM7UUFFbEI7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSxTQUFTO1FBRWhCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUUsU0FBUztLQUNsQixDQUFDO0FBQ04sQ0FBQyxDQUFDIn0=