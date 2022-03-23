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
             * @namespace        config.themeDefaultLight
             * @type            String
             * @default         themeLightBase
             *
             * Specify which theme this one extends from
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultColor: 'main',
            color: {
                base: {
                    /**
                     * @name                color
                     * @namespace            config.themeDefaultLight.color.base
                     * @type                Color
                     * @default             hsla(198,0,100,1)
                     *
                     * Specify the "base" color value.
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    color: 'hsla(198,0,100,1)',
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
                            darken: 40,
                        },
                        surface: {
                            darken: 5
                        }
                    },
                },
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVEZWZhdWx0TGlnaHQuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWVEZWZhdWx0TGlnaHQuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsbUJBQXlCLEdBQUcsRUFBRSxNQUFNO1FBQ2hDLE9BQU87WUFDSDs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLGdCQUFnQjtZQUV6Qjs7Ozs7Ozs7OztlQVVHO1lBQ0gsWUFBWSxFQUFFLE1BQU07WUFFcEIsS0FBSyxFQUFFO2dCQUVILElBQUksRUFBRTtvQkFDRjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxLQUFLLEVBQUUsbUJBQW1CO29CQUMxQjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxLQUFLLEVBQUUsd0JBQXdCO29CQUMvQixPQUFPLEVBQUU7d0JBQ0wsSUFBSSxFQUFFOzRCQUNGLE1BQU0sRUFBRSxFQUFFO3lCQUNiO3dCQUNELE9BQU8sRUFBRTs0QkFDTCxNQUFNLEVBQUUsQ0FBQzt5QkFDWjtxQkFDSjtpQkFDSjtnQkFFRCxJQUFJLEVBQUU7b0JBQ0Y7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsS0FBSyxFQUFFLG1CQUFtQjtvQkFDMUI7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsS0FBSyxFQUFFLHdCQUF3QjtvQkFDL0IsT0FBTyxFQUFFO3dCQUNMLElBQUksRUFBRTs0QkFDRixNQUFNLEVBQUUsRUFBRTt5QkFDYjt3QkFDRCxPQUFPLEVBQUU7NEJBQ0wsT0FBTyxFQUFFLEVBQUU7eUJBQ2Q7cUJBQ0o7aUJBQ0o7Z0JBRUQsTUFBTSxFQUFFO29CQUNKOzs7Ozs7Ozs7O3VCQVVHO29CQUNILEtBQUssRUFBRSxTQUFTO29CQUNoQjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxLQUFLLEVBQUUsd0JBQXdCO2lCQUNsQztnQkFFRCxhQUFhLEVBQUU7b0JBQ1g7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCOzs7Ozs7Ozs7O3VCQVVHO29CQUNILEtBQUssRUFBRSx3QkFBd0I7aUJBQ2xDO2dCQUVELE9BQU8sRUFBRTtvQkFDTDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxLQUFLLEVBQUUsU0FBUztvQkFDaEI7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsS0FBSyxFQUFFLHdCQUF3QjtvQkFDL0IsT0FBTyxFQUFFO3dCQUNMLFVBQVUsRUFBRTs0QkFDUixNQUFNLEVBQUUsRUFBRTt5QkFDYjtxQkFDSjtpQkFDSjtnQkFFRCxPQUFPLEVBQUU7b0JBQ0w7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCOzs7Ozs7Ozs7O3VCQVVHO29CQUNILEtBQUssRUFBRSx3QkFBd0I7aUJBQ2xDO2dCQUVELEtBQUssRUFBRTtvQkFDSDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxLQUFLLEVBQUUsU0FBUztvQkFDaEI7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsS0FBSyxFQUFFLHdCQUF3QjtpQkFDbEM7Z0JBRUQsSUFBSSxFQUFFO29CQUNGOzs7Ozs7Ozs7O3VCQVVHO29CQUNILEtBQUssRUFBRSxTQUFTO29CQUNoQjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxLQUFLLEVBQUUsd0JBQXdCO29CQUMvQixPQUFPLEVBQUU7d0JBQ0wsSUFBSSxFQUFFOzRCQUNGLE1BQU0sRUFBRSxFQUFFO3lCQUNiO3FCQUNKO2lCQUNKO2FBQ0o7U0FDSixDQUFDO0lBQ04sQ0FBQztJQWpSRCw0QkFpUkMifQ==