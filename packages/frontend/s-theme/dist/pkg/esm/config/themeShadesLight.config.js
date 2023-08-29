/**
 * @name                    themeShadesLight
 * @as                      Color shades light
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme light color shades available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default (api) => {
    return {
        text: {
            /**
             * @name          darken
             * @namespace     config.themeShadesLight.text
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
                main: {
                    darken: 15,
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
             * @namespace     config.themeShadesLight.placeholder
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
             * @namespace     config.themeShadesLight.placeholder
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
             * @namespace     config.themeShadesLight.foreground
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
             * @namespace     config.themeShadesLight.background
             * @type          Number
             * @default      50
             *
             * Specify the lighten value for the "background" color variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 50,
        },
        surface: {
            /**
             * @name          lighten
             * @namespace     config.themeShadesLight.surface
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
                main: {
                    lighten: 49,
                },
            },
        },
        ui: {
            /**
             * @name          lighten
             * @namespace     config.themeShadesLight.ui
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
        border: {
            /**
             * @name          alpha
             * @namespace     config.themeShadesLight.border
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
             * @namespace     config.themeShadesLight.hover
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
             * @namespace     config.themeShadesLight.active
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
             * @namespace     config.themeShadesLight.gradientStart
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
             * @namespace     config.themeShadesLight.gradientEnd
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuQixPQUFPO1FBQ0gsSUFBSSxFQUFFO1lBQ0Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSxDQUFDO1lBRVQsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixNQUFNLEVBQUUsRUFBRTtpQkFDYjtnQkFDRCxhQUFhLEVBQUU7b0JBQ1gsT0FBTyxFQUFFLEVBQUU7aUJBQ2Q7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLE1BQU0sRUFBRSxFQUFFO2lCQUNiO2FBQ0o7U0FDSjtRQUNELFdBQVcsRUFBRTtZQUNUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsQ0FBQztZQUNUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsR0FBRztTQUNiO1FBQ0QsVUFBVSxFQUFFO1lBQ1I7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxFQUFFO1NBQ2Q7UUFDRCxVQUFVLEVBQUU7WUFDUjs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLEVBQUU7U0FDZDtRQUNELE9BQU8sRUFBRTtZQUNMOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsRUFBRTtZQUVYLEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsT0FBTyxFQUFFLEVBQUU7aUJBQ2Q7YUFDSjtTQUNKO1FBQ0QsRUFBRSxFQUFFO1lBQ0E7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxFQUFFO1NBQ2Q7UUFDRCxNQUFNLEVBQUU7WUFDSjs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEtBQUssRUFBRTtZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsRUFBRTtTQUNkO1FBQ0QsTUFBTSxFQUFFO1lBQ0o7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSxFQUFFO1NBQ2I7UUFDRCxhQUFhLEVBQUU7WUFDWDs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELFdBQVcsRUFBRTtZQUNUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsRUFBRTtTQUNkO0tBQ0osQ0FBQztBQUNOLENBQUMsQ0FBQyJ9