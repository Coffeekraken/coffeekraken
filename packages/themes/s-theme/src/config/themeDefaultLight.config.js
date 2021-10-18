export default function (env, config) {
    return {
        extends: 'themeLightBase',
        /**
         * @name            defaultColor
         * @namespace        config.theme.themes.themeDefaultLight
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
             * @default             #776D91
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVEZWZhdWx0TGlnaHQuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWVEZWZhdWx0TGlnaHQuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsT0FBTztRQUNILE9BQU8sRUFBRSxnQkFBZ0I7UUFFekI7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQVksRUFBRSxNQUFNO1FBRXBCLEtBQUssRUFBRTtZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsS0FBSyxFQUFFLG1CQUFtQjtnQkFDMUIsS0FBSyxFQUFFLHdCQUF3QjthQUNsQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLEtBQUssRUFBRSx3QkFBd0I7YUFDbEM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsYUFBYSxFQUFFO2dCQUNYLEtBQUssRUFBRSxTQUFTO2dCQUNoQixLQUFLLEVBQUUsd0JBQXdCO2FBQ2xDO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRTtnQkFDTCxLQUFLLEVBQUUsU0FBUztnQkFDaEIsS0FBSyxFQUFFLHdCQUF3QjthQUNsQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLEtBQUssRUFBRSx3QkFBd0I7YUFDbEM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxTQUFTO2dCQUNoQixLQUFLLEVBQUUsd0JBQXdCO2FBQ2xDO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRTtnQkFDRixLQUFLLEVBQUUsU0FBUztnQkFDaEIsS0FBSyxFQUFFLHdCQUF3QjthQUNsQztTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==