"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (api) => {
    return {
        text: {
            /**
             * @name          darken
             * @namespace     config.themeColorSchemaLight.text
             * @type          Number
             * @default      0
             *
             * Specify the lighten value for the "text" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            darken: 0,
            color: {
                base: {
                    darken: 5,
                },
                main: {
                    darken: 10,
                },
                complementary: {
                    lighten: 15,
                },
                info: {
                    darken: 10,
                },
            },
        },
        placeholder: {
            /**
             * @name          darken
             * @namespace     config.themeColorSchemaLight.placeholder
             * @type          Number
             * @default      0
             *
             * Specify the darken value for the "placeholder" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            darken: 0,
            /**
             * @name          alpha
             * @namespace     config.themeColorSchemaLight.placeholder
             * @type          Number
             * @default      0.2
             *
             * Specify the alpha value for the "placeholder" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            alpha: 0.2,
        },
        foreground: {
            /**
             * @name          lighten
             * @namespace     config.themeColorSchemaLight.foreground
             * @type          Number
             * @default      50
             *
             * Specify the lighten value for the "foreground" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 50,
        },
        background: {
            /**
             * @name          lighten
             * @namespace     config.themeColorSchemaLight.background
             * @type          Number
             * @default      50
             *
             * Specify the lighten value for the "background" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 50,
            color: {
                surface: {
                    darken: 20,
                },
            },
        },
        backgroundForeground: {
            /**
             * @name          darken
             * @namespace     config.themeColorSchemaLight.backgroundForeground
             * @type          Number
             * @default      45
             *
             * Specify the darken value for the "backgroundForeground" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            darken: 45,
        },
        surface: {
            /**
             * @name          lighten
             * @namespace     config.themeColorSchemaLight.surface
             * @type          Number
             * @default      49
             *
             * Specify the lighten value for the "surface" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 49,
            color: {
                main: {
                    lighten: 49,
                },
            },
        },
        surfaceForeground: {
            /**
             * @name          lighten
             * @namespace     config.themeColorSchemaLight.surfaceForeground
             * @type          Number
             * @default      45
             *
             * Specify the lighten value for the "surfaceForeground" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            darken: 45,
        },
        ui: {
            /**
             * @name          lighten
             * @namespace     config.themeColorSchemaLight.ui
             * @type          Number
             * @default      48
             *
             * Specify the lighten value for the "ui" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 48,
        },
        uiForeground: {
            /**
             * @name          darken
             * @namespace     config.themeColorSchemaLight.uiForeground
             * @type          Number
             * @default      25
             *
             * Specify the darken value for the "uiForeground" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            darken: 25,
        },
        border: {
            /**
             * @name          alpha
             * @namespace     config.themeColorSchemaLight.border
             * @type          Number
             * @default      0.2
             *
             * Specify the alpha value for the "border" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            alpha: 0.2,
        },
        gradientStart: {
            /**
             * @name          lighten
             * @namespace     config.themeColorSchemaLight.gradientStart
             * @type          Number
             * @default      0
             *
             * Specify the lighten value for the "gradientStart" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 0,
        },
        gradientEnd: {
            /**
             * @name          lighten
             * @namespace     config.themeColorSchemaLight.gradientEnd
             * @type          Number
             * @default      20
             *
             * Specify the lighten value for the "gradientEnd" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 20,
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuQixPQUFPO1FBQ0gsSUFBSSxFQUFFO1lBQ0Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSxDQUFDO1lBRVQsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixNQUFNLEVBQUUsQ0FBQztpQkFDWjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0YsTUFBTSxFQUFFLEVBQUU7aUJBQ2I7Z0JBQ0QsYUFBYSxFQUFFO29CQUNYLE9BQU8sRUFBRSxFQUFFO2lCQUNkO2dCQUNELElBQUksRUFBRTtvQkFDRixNQUFNLEVBQUUsRUFBRTtpQkFDYjthQUNKO1NBQ0o7UUFDRCxXQUFXLEVBQUU7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLENBQUM7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELFVBQVUsRUFBRTtZQUNSOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsRUFBRTtTQUNkO1FBQ0QsVUFBVSxFQUFFO1lBQ1I7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxFQUFFO1lBRVgsS0FBSyxFQUFFO2dCQUNILE9BQU8sRUFBRTtvQkFDTCxNQUFNLEVBQUUsRUFBRTtpQkFDYjthQUNKO1NBQ0o7UUFDRCxvQkFBb0IsRUFBRTtZQUNsQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLEVBQUU7U0FDYjtRQUNELE9BQU8sRUFBRTtZQUNMOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsRUFBRTtZQUVYLEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsT0FBTyxFQUFFLEVBQUU7aUJBQ2Q7YUFDSjtTQUNKO1FBQ0QsaUJBQWlCLEVBQUU7WUFDZjs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLEVBQUU7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsRUFBRTtTQUNkO1FBQ0QsWUFBWSxFQUFFO1lBQ1Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSxFQUFFO1NBQ2I7UUFDRCxNQUFNLEVBQUU7WUFDSjs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELGFBQWEsRUFBRTtZQUNYOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsQ0FBQztTQUNiO1FBQ0QsV0FBVyxFQUFFO1lBQ1Q7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxFQUFFO1NBQ2Q7S0FDSixDQUFDO0FBQ04sQ0FBQyxDQUFDIn0=