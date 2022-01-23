export default function (env, config) {
    return {
        /**
         * @name            extends
         * @namespace        config.themeDefaultLight
         * @type            String
         * @default         themeLightBase
         *
         * Specify which theme this one extends from
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        extends: 'themeLightBase',
        /**
         * @name            defaultColor
         * @namespace        config.themeDefaultLight
         * @type            String
         * @default         main
         *
         * Specify the default color of this theme
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        defaultColor: 'main',
        color: {
            main: {
                /**
                 * @name                color
                 * @namespace            config.themeDefaultLight.color.main
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
                 * @namespace            config.themeDefaultLight.color.main
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
                        darken: 10,
                    },
                    surface: {
                        lighten: 48
                    }
                },
            },
            accent: {
                /**
                 * @name                color
                 * @namespace            config.themeDefaultLight.color.accent
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
                 * @namespace            config.themeDefaultLight.color.accent
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
                 * @namespace            config.themeDefaultLight.color.complementary
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
                 * @namespace            config.themeDefaultLight.color.complementary
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
            success: {
                /**
                 * @name                color
                 * @namespace            config.themeDefaultLight.color.success
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
                 * @namespace            config.themeDefaultLight.color.success
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
                    foreground: {
                        darken: 20,
                    },
                },
            },
            warning: {
                /**
                 * @name                color
                 * @namespace            config.themeDefaultLight.color.warning
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
                 * @namespace            config.themeDefaultLight.color.warning
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
                 * @namespace            config.themeDefaultLight.color.error
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
                 * @namespace            config.themeDefaultLight.color.error
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
                 * @namespace            config.themeDefaultLight.color.info
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
                 * @namespace            config.themeDefaultLight.color.info
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
                        darken: 10,
                    }
                }
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVEZWZhdWx0TGlnaHQuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWVEZWZhdWx0TGlnaHQuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsZ0JBQWdCO1FBRXpCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFZLEVBQUUsTUFBTTtRQUVwQixLQUFLLEVBQUU7WUFDSCxJQUFJLEVBQUU7Z0JBQ0Y7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLG1CQUFtQjtnQkFDMUI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLHdCQUF3QjtnQkFDL0IsT0FBTyxFQUFFO29CQUNMLElBQUksRUFBRTt3QkFDRixNQUFNLEVBQUUsRUFBRTtxQkFDYjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsT0FBTyxFQUFFLEVBQUU7cUJBQ2Q7aUJBQ0o7YUFDSjtZQUVELE1BQU0sRUFBRTtnQkFDSjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsU0FBUztnQkFDaEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLHdCQUF3QjthQUNsQztZQUVELGFBQWEsRUFBRTtnQkFDWDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsU0FBUztnQkFDaEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLHdCQUF3QjthQUNsQztZQUVELE9BQU8sRUFBRTtnQkFDTDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsU0FBUztnQkFDaEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLHdCQUF3QjtnQkFDL0IsT0FBTyxFQUFFO29CQUNMLFVBQVUsRUFBRTt3QkFDUixNQUFNLEVBQUUsRUFBRTtxQkFDYjtpQkFDSjthQUNKO1lBRUQsT0FBTyxFQUFFO2dCQUNMOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxTQUFTO2dCQUNoQjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsd0JBQXdCO2FBQ2xDO1lBRUQsS0FBSyxFQUFFO2dCQUNIOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxTQUFTO2dCQUNoQjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsd0JBQXdCO2FBQ2xDO1lBRUQsSUFBSSxFQUFFO2dCQUNGOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxTQUFTO2dCQUNoQjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsd0JBQXdCO2dCQUMvQixPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFO3dCQUNGLE1BQU0sRUFBRSxFQUFFO3FCQUNiO2lCQUNKO2FBQ0o7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=