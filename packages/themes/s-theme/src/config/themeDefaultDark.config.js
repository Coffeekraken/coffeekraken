export default function (env, config) {
    return {
        /**
         * @name            extends
         * @namespace        config.themeDefaultDark
         * @type            String
         * @default         themeDarkBase
         *
         * Specify which theme this one extends from
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        extends: 'themeDarkBase',
        /**
         * @name            defaultColor
         * @namespace        config.themeDefaultDark
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
            main: {
                /**
                 * @name                color
                 * @namespace            config.themeDefaultDark.color.main
                 * @type                Color
                 * @default             hsla(198,10,50,1)
                 *
                 * Specify the "main" color value.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                color: 'hsla(198,10,50,1)',
                /**
                 * @name                ...
                 * @namespace            config.themeDefaultDark.color.main
                 * @type                Color
                 * @default             [extends.colorSchemas]
                 *
                 * Extends the colorSchemas from the extended theme
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '...': '[extends.colorSchemas]',
                default: {
                    text: {
                        lighten: 46,
                    },
                },
            },
            accent: {
                /**
                 * @name                color
                 * @namespace            config.themeDefaultDark.color.accent
                 * @type                Color
                 * @default             #ffbb00
                 *
                 * Specify the "accent" color value.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                color: '#ffbb00',
                /**
                 * @name                ...
                 * @namespace            config.themeDefaultDark.color.accent
                 * @type                Color
                 * @default             [extends.colorSchemas]
                 *
                 * Extends the colorSchemas from the extended theme
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '...': '[extends.colorSchemas]',
            },
            complementary: {
                /**
                 * @name                color
                 * @namespace            config.themeDefaultDark.color.complementary
                 * @type                Color
                 * @default             #5100ff
                 *
                 * Specify the "complementary" color value.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                color: '#5100ff',
                /**
                 * @name                ...
                 * @namespace            config.themeDefaultDark.color.complementary
                 * @type                Color
                 * @default             [extends.colorSchemas]
                 *
                 * Extends the colorSchemas from the extended theme
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '...': '[extends.colorSchemas]',
                default: {
                    text: {
                        lighten: 15,
                    },
                },
            },
            success: {
                /**
                 * @name                color
                 * @namespace            config.themeDefaultDark.color.success
                 * @type                Color
                 * @default             #91ff00
                 *
                 * Specify the "success" color value.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                color: '#91ff00',
                /**
                 * @name                ...
                 * @namespace            config.themeDefaultDark.color.success
                 * @type                Color
                 * @default             [extends.colorSchemas]
                 *
                 * Extends the colorSchemas from the extended theme
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '...': '[extends.colorSchemas]',
            },
            warning: {
                /**
                 * @name                color
                 * @namespace            config.themeDefaultDark.color.warning
                 * @type                Color
                 * @default             #ffd500
                 *
                 * Specify the "warning" color value.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                color: '#ffd500',
                /**
                 * @name                ...
                 * @namespace            config.themeDefaultDark.color.warning
                 * @type                Color
                 * @default             [extends.colorSchemas]
                 *
                 * Extends the colorSchemas from the extended theme
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '...': '[extends.colorSchemas]',
            },
            error: {
                /**
                 * @name                color
                 * @namespace            config.themeDefaultDark.color.error
                 * @type                Color
                 * @default             #ff003b
                 *
                 * Specify the "error" color value.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                color: '#ff003b',
                /**
                 * @name                ...
                 * @namespace            config.themeDefaultDark.color.error
                 * @type                Color
                 * @default             [extends.colorSchemas]
                 *
                 * Extends the colorSchemas from the extended theme
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '...': '[extends.colorSchemas]',
            },
            info: {
                /**
                 * @name                color
                 * @namespace            config.themeDefaultDark.color.info
                 * @type                Color
                 * @default             #00ffff
                 *
                 * Specify the "info" color value.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                color: '#00ffff',
                /**
                 * @name                ...
                 * @namespace            config.themeDefaultDark.color.info
                 * @type                Color
                 * @default             [extends.colorSchemas]
                 *
                 * Extends the colorSchemas from the extended theme
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '...': '[extends.colorSchemas]',
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVEZWZhdWx0RGFyay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZURlZmF1bHREYXJrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLGVBQWU7UUFFeEI7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQVksRUFBRSxNQUFNO1FBRXBCLEtBQUssRUFBRTtZQUNILElBQUksRUFBRTtnQkFDRjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsbUJBQW1CO2dCQUMxQjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsd0JBQXdCO2dCQUMvQixPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFO3dCQUNGLE9BQU8sRUFBRSxFQUFFO3FCQUNkO2lCQUNKO2FBQ0o7WUFFRCxNQUFNLEVBQUU7Z0JBQ0o7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSx3QkFBd0I7YUFDbEM7WUFFRCxhQUFhLEVBQUU7Z0JBQ1g7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSx3QkFBd0I7Z0JBQy9CLE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUU7d0JBQ0YsT0FBTyxFQUFFLEVBQUU7cUJBQ2Q7aUJBQ0o7YUFDSjtZQUVELE9BQU8sRUFBRTtnQkFDTDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsU0FBUztnQkFDaEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLHdCQUF3QjthQUNsQztZQUVELE9BQU8sRUFBRTtnQkFDTDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsU0FBUztnQkFDaEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLHdCQUF3QjthQUNsQztZQUVELEtBQUssRUFBRTtnQkFDSDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsU0FBUztnQkFDaEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLHdCQUF3QjthQUNsQztZQUVELElBQUksRUFBRTtnQkFDRjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsU0FBUztnQkFDaEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLHdCQUF3QjthQUNsQztTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==