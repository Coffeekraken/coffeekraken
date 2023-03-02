export default function (api) {
    return {
        light: {
            /**
             * @name                border
             * @namespace           config.themeWireframe.light
             * @type                String
             * @default             1px solid this.borderColor
             *
             * Specify the "border" for your wireframe
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get border() {
                return `1px solid ${this.borderColor}`;
            },
            /**
             * @name                borderColor
             * @namespace           config.themeWireframe.light
             * @type                String
             * @default             rgba(0,0,0,0.1)
             *
             * Specify the "borderColor" for your wireframe
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderColor: 'rgba(0,0,0,0.1)',
            /**
             * @name                background
             * @namespace           config.themeWireframe.light
             * @type                String
             * @default             rgba(255,255,255)
             *
             * Specify the "background" color for your wireframe
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            background: 'rgba(255,255,255)',
            /**
             * @name                surface
             * @namespace           config.themeWireframe.light
             * @type                String
             * @default             #fafafa
             *
             * Specify the "surface" color for your wireframe
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            surface: '#fafafa',
        },
        dark: {
            /**
             * @name                border
             * @namespace           config.themeWireframe.dark
             * @type                String
             * @default             1px solid rgba(0,0,0,0.2)
             *
             * Specify the "border" for your wireframe
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get border() {
                return `1px solid ${this.borderColor}`;
            },
            /**
             * @name                borderColor
             * @namespace           config.themeWireframe.dark
             * @type                String
             * @default             rgba(0,0,0,0.1)
             *
             * Specify the "border" for your wireframe
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderColor: 'rgba(255,255,255,0.1)',
            /**
             * @name                background
             * @namespace           config.themeWireframe.dark
             * @type                String
             * @default             #2D323A
             *
             * Specify the "background" color for your wireframe
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            background: '#2D323A',
            /**
             * @name                surface
             * @namespace           config.themeWireframe.dark
             * @type                String
             * @default             #3B424C
             *
             * Specify the "surface" color for your wireframe
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            surface: '#3B424C',
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0gsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksTUFBTTtnQkFDTixPQUFPLGFBQWEsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzNDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsV0FBVyxFQUFFLGlCQUFpQjtZQUU5Qjs7Ozs7Ozs7OztlQVVHO1lBQ0gsVUFBVSxFQUFFLG1CQUFtQjtZQUUvQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLFNBQVM7U0FDckI7UUFFRCxJQUFJLEVBQUU7WUFDRjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxNQUFNO2dCQUNOLE9BQU8sYUFBYSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDM0MsQ0FBQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxXQUFXLEVBQUUsdUJBQXVCO1lBRXBDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxVQUFVLEVBQUUsU0FBUztZQUVyQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLFNBQVM7U0FDckI7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9