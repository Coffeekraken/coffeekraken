(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function default_1(env, config) {
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
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultColor: 'main',
            color: {
                base: {
                    /**
                     * @name                color
                     * @namespace            config.themeDefaultLight.color.base
                     * @type                Color
                     * @default             hsla(206,11,21,1)
                     *
                     * Specify the "base" color value.
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    color: 'hsla(206,11,21,1)',
                    /**
                     * @name                ...
                     * @namespace            config.themeDefaultLight.color.base
                     * @type                Color
                     * @default             [extends.colorSchemas]
                     *
                     * Extends the colorSchemas from the extended theme
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '...': '[extends.colorSchemas]',
                    default: {
                        text: {
                            lighten: 30,
                        },
                        surface: {
                            lighten: 5
                        }
                    },
                },
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '...': '[extends.colorSchemas]',
                },
            },
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVEZWZhdWx0RGFyay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZURlZmF1bHREYXJrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLG1CQUF5QixHQUFHLEVBQUUsTUFBTTtRQUNoQyxPQUFPO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxlQUFlO1lBRXhCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxZQUFZLEVBQUUsTUFBTTtZQUVwQixLQUFLLEVBQUU7Z0JBRUgsSUFBSSxFQUFFO29CQUNGOzs7Ozs7Ozs7O3VCQVVHO29CQUNILEtBQUssRUFBRSxtQkFBbUI7b0JBQzFCOzs7Ozs7Ozs7O3VCQVVHO29CQUNILEtBQUssRUFBRSx3QkFBd0I7b0JBQy9CLE9BQU8sRUFBRTt3QkFDTCxJQUFJLEVBQUU7NEJBQ0YsT0FBTyxFQUFFLEVBQUU7eUJBQ2Q7d0JBQ0QsT0FBTyxFQUFFOzRCQUNMLE9BQU8sRUFBRSxDQUFDO3lCQUNiO3FCQUNKO2lCQUNKO2dCQUVELElBQUksRUFBRTtvQkFDRjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxLQUFLLEVBQUUsbUJBQW1CO29CQUMxQjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxLQUFLLEVBQUUsd0JBQXdCO29CQUMvQixPQUFPLEVBQUU7d0JBQ0wsSUFBSSxFQUFFOzRCQUNGLE9BQU8sRUFBRSxFQUFFO3lCQUNkO3FCQUNKO2lCQUNKO2dCQUVELE1BQU0sRUFBRTtvQkFDSjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxLQUFLLEVBQUUsU0FBUztvQkFDaEI7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsS0FBSyxFQUFFLHdCQUF3QjtpQkFDbEM7Z0JBRUQsYUFBYSxFQUFFO29CQUNYOzs7Ozs7Ozs7O3VCQVVHO29CQUNILEtBQUssRUFBRSxTQUFTO29CQUNoQjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxLQUFLLEVBQUUsd0JBQXdCO29CQUMvQixPQUFPLEVBQUU7d0JBQ0wsSUFBSSxFQUFFOzRCQUNGLE9BQU8sRUFBRSxFQUFFO3lCQUNkO3FCQUNKO2lCQUNKO2dCQUVELE9BQU8sRUFBRTtvQkFDTDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxLQUFLLEVBQUUsU0FBUztvQkFDaEI7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsS0FBSyxFQUFFLHdCQUF3QjtpQkFDbEM7Z0JBRUQsT0FBTyxFQUFFO29CQUNMOzs7Ozs7Ozs7O3VCQVVHO29CQUNILEtBQUssRUFBRSxTQUFTO29CQUNoQjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxLQUFLLEVBQUUsd0JBQXdCO2lCQUNsQztnQkFFRCxLQUFLLEVBQUU7b0JBQ0g7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCOzs7Ozs7Ozs7O3VCQVVHO29CQUNILEtBQUssRUFBRSx3QkFBd0I7aUJBQ2xDO2dCQUVELElBQUksRUFBRTtvQkFDRjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxLQUFLLEVBQUUsU0FBUztvQkFDaEI7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsS0FBSyxFQUFFLHdCQUF3QjtpQkFDbEM7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDO0lBelFELDRCQXlRQyJ9