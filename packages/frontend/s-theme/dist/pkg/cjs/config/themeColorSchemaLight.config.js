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
            alpha: 0.4,
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
             * @default      40
             *
             * Specify the lighten value for the "surface" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 40,
            color: {
                base: {
                    lighten: 49,
                },
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
            lighten: 49,
        },
        uiForeground: {
            /**
             * @name          darken
             * @namespace     config.themeColorSchemaLight.uiForeground
             * @type          Number
             * @default      15
             *
             * Specify the darken value for the "uiForeground" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            darken: 15,
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
        hover: {
            /**
             * @name          lighten
             * @namespace     config.themeColorSchemaDark.hover
             * @type          Number
             * @default      0.3
             *
             * Specify the lightness value for the "hover" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 40,
        },
        active: {
            /**
             * @name          darken
             * @namespace     config.themeColorSchemaDark.active
             * @type          Number
             * @default      darken
             *
             * Specify the lightness value for the "active" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            darken: 10,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuQixPQUFPO1FBQ0gsSUFBSSxFQUFFO1lBQ0Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSxDQUFDO1lBRVQsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixNQUFNLEVBQUUsQ0FBQztpQkFDWjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0YsTUFBTSxFQUFFLEVBQUU7aUJBQ2I7Z0JBQ0QsYUFBYSxFQUFFO29CQUNYLE9BQU8sRUFBRSxFQUFFO2lCQUNkO2dCQUNELElBQUksRUFBRTtvQkFDRixNQUFNLEVBQUUsRUFBRTtpQkFDYjthQUNKO1NBQ0o7UUFDRCxXQUFXLEVBQUU7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLENBQUM7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELFVBQVUsRUFBRTtZQUNSOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsRUFBRTtTQUNkO1FBQ0QsVUFBVSxFQUFFO1lBQ1I7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxFQUFFO1lBRVgsS0FBSyxFQUFFO2dCQUNILE9BQU8sRUFBRTtvQkFDTCxNQUFNLEVBQUUsRUFBRTtpQkFDYjthQUNKO1NBQ0o7UUFDRCxvQkFBb0IsRUFBRTtZQUNsQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLEVBQUU7U0FDYjtRQUNELE9BQU8sRUFBRTtZQUNMOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsRUFBRTtZQUVYLEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsT0FBTyxFQUFFLEVBQUU7aUJBQ2Q7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLE9BQU8sRUFBRSxFQUFFO2lCQUNkO2FBQ0o7U0FDSjtRQUNELGlCQUFpQixFQUFFO1lBQ2Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSxFQUFFO1NBQ2I7UUFDRCxFQUFFLEVBQUU7WUFDQTs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLEVBQUU7U0FDZDtRQUNELFlBQVksRUFBRTtZQUNWOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsRUFBRTtTQUNiO1FBQ0QsTUFBTSxFQUFFO1lBQ0o7Ozs7Ozs7Ozs7ZUFVRztZQUNILEtBQUssRUFBRSxHQUFHO1NBQ2I7UUFDRCxLQUFLLEVBQUU7WUFDSDs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLEVBQUU7U0FDZDtRQUNELE1BQU0sRUFBRTtZQUNKOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsRUFBRTtTQUNiO1FBQ0QsYUFBYSxFQUFFO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFDRCxXQUFXLEVBQUU7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLEVBQUU7U0FDZDtLQUNKLENBQUM7QUFDTixDQUFDLENBQUMifQ==