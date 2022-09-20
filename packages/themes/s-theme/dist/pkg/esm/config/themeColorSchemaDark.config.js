export default (api) => {
    if (api.env.platform !== 'node')
        return;
    return {
        text: {
            /**
             * @name          lighten
             * @namespace     config.themeColorSchemaDark.text
             * @type          Number
             * @default      0
             *
             * Specify the lighten value for the "text" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 0,
            color: {
                base: {
                    lighten: 30,
                },
                main: {
                    lighten: 46,
                },
                complementary: {
                    lighten: 15,
                },
            },
        },
        placeholder: {
            /**
             * @name          lighten
             * @namespace     config.themeColorSchemaDark.placeholder
             * @type          Number
             * @default      5
             *
             * Specify the lighten value for the "placeholder" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 50,
            /**
             * @name          alpha
             * @namespace     config.themeColorSchemaDark.placeholder
             * @type          Number
             * @default      0.4
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
             * @namespace     config.themeColorSchemaDark.foreground
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
             * @name          darken
             * @namespace     config.themeColorSchemaDark.background
             * @type          Number
             * @default      30
             *
             * Specify the darken value for the "background" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            darken: 30,
        },
        backgroundForeground: {
            /**
             * @name          lighten
             * @namespace     config.themeColorSchemaDark.backgroundForeground
             * @type          Number
             * @default      50
             *
             * Specify the lighten value for the "backgroundForeground" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 50,
        },
        surface: {
            /**
             * @name          darken
             * @namespace     config.themeColorSchemaDark.surface
             * @type          Number
             * @default      25
             *
             * Specify the darken value for the "surface" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            darken: 25,
        },
        surfaceForeground: {
            /**
             * @name          lighten
             * @namespace     config.themeColorSchemaDark.surfaceForeground
             * @type          Number
             * @default      50
             *
             * Specify the lighten value for the "surfaceForeground" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 50,
        },
        ui: {
            /**
             * @name          darken
             * @namespace     config.themeColorSchemaDark.ui
             * @type          Number
             * @default      25
             *
             * Specify the darken value for the "ui" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            darken: 25,
        },
        uiForeground: {
            /**
             * @name          lighten
             * @namespace     config.themeColorSchemaDark.uiForeground
             * @type          Number
             * @default      45
             *
             * Specify the lighten value for the "uiForeground" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 45,
        },
        border: {
            /**
             * @name          alpha
             * @namespace     config.themeColorSchemaDark.border
             * @type          Number
             * @default      0.4
             *
             * Specify the alpha value for the "border" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            alpha: 0.4,
        },
        gradientStart: {
            /**
             * @name          lighten
             * @namespace     config.themeColorSchemaDark.gradientStart
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
             * @name          darken
             * @namespace     config.themeColorSchemaDark.gradientEnd
             * @type          Number
             * @default      20
             *
             * Specify the darken value for the "gradientEnd" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            darken: 20,
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuQixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxJQUFJLEVBQUU7WUFDRjs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLENBQUM7WUFFVixLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLE9BQU8sRUFBRSxFQUFFO2lCQUNkO2dCQUNELElBQUksRUFBRTtvQkFDRixPQUFPLEVBQUUsRUFBRTtpQkFDZDtnQkFDRCxhQUFhLEVBQUU7b0JBQ1gsT0FBTyxFQUFFLEVBQUU7aUJBQ2Q7YUFDSjtTQUNKO1FBQ0QsV0FBVyxFQUFFO1lBQ1Q7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxFQUFFO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILEtBQUssRUFBRSxHQUFHO1NBQ2I7UUFDRCxVQUFVLEVBQUU7WUFDUjs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLEVBQUU7U0FDZDtRQUNELFVBQVUsRUFBRTtZQUNSOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsRUFBRTtTQUNiO1FBQ0Qsb0JBQW9CLEVBQUU7WUFDbEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxFQUFFO1NBQ2Q7UUFDRCxPQUFPLEVBQUU7WUFDTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLEVBQUU7U0FDYjtRQUNELGlCQUFpQixFQUFFO1lBQ2Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxFQUFFO1NBQ2Q7UUFDRCxFQUFFLEVBQUU7WUFDQTs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLEVBQUU7U0FDYjtRQUNELFlBQVksRUFBRTtZQUNWOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsRUFBRTtTQUNkO1FBQ0QsTUFBTSxFQUFFO1lBQ0o7Ozs7Ozs7Ozs7ZUFVRztZQUNILEtBQUssRUFBRSxHQUFHO1NBQ2I7UUFDRCxhQUFhLEVBQUU7WUFDWDs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELFdBQVcsRUFBRTtZQUNUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsRUFBRTtTQUNiO0tBQ0osQ0FBQztBQUNOLENBQUMsQ0FBQyJ9