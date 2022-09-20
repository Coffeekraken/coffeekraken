export default (api) => {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name                accent
         * @namespace            theme.themeColor
         * @type                Color
         * @default             [config.themeColor.main]
         *
         * Specify the "current" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get current() {
            return api.config.themeColor.main;
        },
        /**
         * @name                color
         * @namespace            config.themeColor
         * @type                Color
         * @default             hsla(212,14,50,1)
         *
         * Specify the "base" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        base: 'hsla(212,14,50,1)',
        /**
         * @name                main
         * @namespace            config.themeColor
         * @type                Color
         * @default             hsla(212,14,50,1)
         *
         * Specify the "main" color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        main: 'hsla(212,14,50,1)',
        /**
         * @name                accent
         * @namespace            theme.themeColor
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
         * @namespace            theme.themeColor
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
         * @namespace            theme.themeColor
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
         * @namespace            theme.themeColor
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
         * @namespace            theme.themeColor
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
         * @namespace            theme.themeColor
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuQixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxPQUFPO1lBQ1AsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDdEMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUUsbUJBQW1CO1FBRXpCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUUsbUJBQW1CO1FBRXpCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQUUsU0FBUztRQUVqQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsYUFBYSxFQUFFLFNBQVM7UUFFeEI7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxTQUFTO1FBRWxCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsU0FBUztRQUVsQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFLFNBQVM7UUFFaEI7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxTQUFTO0tBQ2xCLENBQUM7QUFDTixDQUFDLENBQUMifQ==