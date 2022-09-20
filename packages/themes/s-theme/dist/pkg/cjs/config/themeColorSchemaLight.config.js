"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (api) => {
    if (api.env.platform !== 'node')
        return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuQixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxJQUFJLEVBQUU7WUFDRjs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLENBQUM7WUFFVCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLE1BQU0sRUFBRSxDQUFDO2lCQUNaO2dCQUNELElBQUksRUFBRTtvQkFDRixNQUFNLEVBQUUsRUFBRTtpQkFDYjtnQkFDRCxhQUFhLEVBQUU7b0JBQ1gsT0FBTyxFQUFFLEVBQUU7aUJBQ2Q7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLE1BQU0sRUFBRSxFQUFFO2lCQUNiO2FBQ0o7U0FDSjtRQUNELFdBQVcsRUFBRTtZQUNUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsQ0FBQztZQUNUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsR0FBRztTQUNiO1FBQ0QsVUFBVSxFQUFFO1lBQ1I7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxFQUFFO1NBQ2Q7UUFDRCxVQUFVLEVBQUU7WUFDUjs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLEVBQUU7WUFFWCxLQUFLLEVBQUU7Z0JBQ0gsT0FBTyxFQUFFO29CQUNMLE1BQU0sRUFBRSxFQUFFO2lCQUNiO2FBQ0o7U0FDSjtRQUNELG9CQUFvQixFQUFFO1lBQ2xCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsRUFBRTtTQUNiO1FBQ0QsT0FBTyxFQUFFO1lBQ0w7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxFQUFFO1lBRVgsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixPQUFPLEVBQUUsRUFBRTtpQkFDZDthQUNKO1NBQ0o7UUFDRCxpQkFBaUIsRUFBRTtZQUNmOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsRUFBRTtTQUNiO1FBQ0QsRUFBRSxFQUFFO1lBQ0E7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxFQUFFO1NBQ2Q7UUFDRCxZQUFZLEVBQUU7WUFDVjs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLEVBQUU7U0FDYjtRQUNELE1BQU0sRUFBRTtZQUNKOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsR0FBRztTQUNiO1FBQ0QsYUFBYSxFQUFFO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFDRCxXQUFXLEVBQUU7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLEVBQUU7U0FDZDtLQUNKLENBQUM7QUFDTixDQUFDLENBQUMifQ==