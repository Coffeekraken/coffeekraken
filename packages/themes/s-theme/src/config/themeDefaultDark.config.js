export default function (env, config) {
    return {
        extends: 'themeDarkBase',
        /**
         * @name            defaultColor
         * @namespace        config.theme.themes.themeDefaultDark
         * @type            String
         * @default         main
         *
         * Specify which color to use by default for elements that make use of the "sugar.color(current)" color.
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        defaultColor: 'main',
        color: {
            /**
             * @name                main
             * @namespace           config.theme.themes.default.color
             * @type                Color
             * @default             hsla(198,10,50,1)
             *
             * Specify the <s-color="main">main</s-color> color value.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            main: {
                color: 'hsla(198,10,50,1)',
                '...': '[extends.colorSchemas]',
            },
            /**
             * @name                accent
             * @namespace           config.theme.themes.default.color
             * @type                Color
             * @default             #ffbb00
             *
             * Specify the <s-color="accent">accent</s-color> color value.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            accent: {
                color: '#ffbb00',
                '...': '[extends.colorSchemas]',
            },
            /**
             * @name                complementary
             * @namespace           config.theme.themes.default.color
             * @type                Color
             * @default             #5100ff
             *
             * Specify the <s-color="complementary">complementary</s-color> color value.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            complementary: {
                color: '#5100ff',
                '...': '[extends.colorSchemas]',
            },
            /**
             * @name                success
             * @namespace           config.theme.themes.default.color
             * @type                Color
             * @default             #91ff00
             *
             * Specify the <s-color="success">success</s-color> color value.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            success: {
                color: '#91ff00',
                '...': '[extends.colorSchemas]',
            },
            /**
             * @name                warning
             * @namespace           config.theme.themes.default.color
             * @type                Color
             * @default             #ffd500
             *
             * Specify the <s-color="warning">warning</s-color> color value.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            warning: {
                color: '#ffd500',
                '...': '[extends.colorSchemas]',
            },
            /**
             * @name                error
             * @namespace           config.theme.themes.default.color
             * @type                Color
             * @default             #ff003b
             *
             * Specify the <s-color="error">error</s-color> color value.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            error: {
                color: '#ff003b',
                '...': '[extends.colorSchemas]',
            },
            /**
             * @name                info
             * @namespace           config.theme.themes.default.color
             * @type                Color
             * @default             #00ffff
             *
             * Specify the <s-color="info">info</s-color> color value.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            info: {
                color: '#00ffff',
                '...': '[extends.colorSchemas]',
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVEZWZhdWx0RGFyay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZURlZmF1bHREYXJrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLE9BQU87UUFDSCxPQUFPLEVBQUUsZUFBZTtRQUV4Qjs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxFQUFFLE1BQU07UUFFcEIsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRTtnQkFDRixLQUFLLEVBQUUsbUJBQW1CO2dCQUMxQixLQUFLLEVBQUUsd0JBQXdCO2FBQ2xDO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRTtnQkFDSixLQUFLLEVBQUUsU0FBUztnQkFDaEIsS0FBSyxFQUFFLHdCQUF3QjthQUNsQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxhQUFhLEVBQUU7Z0JBQ1gsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLEtBQUssRUFBRSx3QkFBd0I7YUFDbEM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLEtBQUssRUFBRSxTQUFTO2dCQUNoQixLQUFLLEVBQUUsd0JBQXdCO2FBQ2xDO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRTtnQkFDTCxLQUFLLEVBQUUsU0FBUztnQkFDaEIsS0FBSyxFQUFFLHdCQUF3QjthQUNsQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLEtBQUssRUFBRSx3QkFBd0I7YUFDbEM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLEtBQUssRUFBRSxTQUFTO2dCQUNoQixLQUFLLEVBQUUsd0JBQXdCO2FBQ2xDO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9