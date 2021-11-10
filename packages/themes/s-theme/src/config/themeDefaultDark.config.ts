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
