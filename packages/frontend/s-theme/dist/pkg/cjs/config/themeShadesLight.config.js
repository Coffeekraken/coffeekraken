"use strict";
/**
 * @name                    themeShadesLight
 * @as                      Color shades light
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  stable
 *
 * Specify the @coffeekraken/s-theme light color shades available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (api) => {
    return {
        text: {
            /**
             * @name          darken
             * @namespace     config.themeShadesLight.text
             * @type          Number
             * @default      0
             *
             * Specify the lighten value for the "text" color shade
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            darken: 0,
            color: {
                main: {
                    /**
                     * @name          darken
                     * @namespace     config.themeShadesLight.text.color.main
                     * @type          Number
                     * @default      15
                     *
                     * Specify the lighten value for the "text" color shade on the main color
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    darken: 15,
                },
                complementary: {
                    /**
                     * @name          lighten
                     * @namespace     config.themeShadesLight.text.color.complementary
                     * @type          Number
                     * @default      15
                     *
                     * Specify the lighten value for the "text" color shade on the complementary color
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    lighten: 15,
                },
                info: {
                    /**
                     * @name          darken
                     * @namespace     config.themeShadesLight.text.color.main
                     * @type          Number
                     * @default      10
                     *
                     * Specify the lighten value for the "text" color shade on the info color
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
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
             * Specify the darken value for the "placeholder" color shade
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
             * Specify the alpha value for the "placeholder" color shade
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
             * Specify the lighten value for the "foreground" color shade
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
             * Specify the lighten value for the "background" color shade
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
             * Specify the lighten value for the "surface" color shade
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
             * Specify the lighten value for the "ui" color shade
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 49,
        },
        uiBackground: {
            /**
             * @name          lighten
             * @namespace     config.themeShadesDark.uiBackground
             * @type          Number
             * @default      48
             *
             * Specify the lighten value for the "uiBackground" color shade
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 48,
        },
        border: {
            /**
             * @name          alpha
             * @namespace     config.themeShadesLight.border
             * @type          Number
             * @default      0.2
             *
             * Specify the alpha value for the "border" color shade
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
             * Specify the lightness value for the "hover" color shade
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
             * Specify the lightness value for the "active" color shade
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
             * Specify the lighten value for the "gradientStart" color shade
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
             * Specify the lighten value for the "gradientEnd" color shade
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 20,
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsa0JBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuQixPQUFPO1FBQ0gsSUFBSSxFQUFFO1lBQ0Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSxDQUFDO1lBRVQsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxNQUFNLEVBQUUsRUFBRTtpQkFDYjtnQkFDRCxhQUFhLEVBQUU7b0JBQ1g7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsT0FBTyxFQUFFLEVBQUU7aUJBQ2Q7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGOzs7Ozs7Ozs7O3VCQVVHO29CQUNILE1BQU0sRUFBRSxFQUFFO2lCQUNiO2FBQ0o7U0FDSjtRQUNELFdBQVcsRUFBRTtZQUNUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsQ0FBQztZQUNUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsR0FBRztTQUNiO1FBQ0QsVUFBVSxFQUFFO1lBQ1I7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxFQUFFO1NBQ2Q7UUFDRCxVQUFVLEVBQUU7WUFDUjs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLEVBQUU7U0FDZDtRQUNELE9BQU8sRUFBRTtZQUNMOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsRUFBRTtZQUVYLEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsT0FBTyxFQUFFLEVBQUU7aUJBQ2Q7YUFDSjtTQUNKO1FBQ0QsRUFBRSxFQUFFO1lBQ0E7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxFQUFFO1NBQ2Q7UUFDRCxZQUFZLEVBQUU7WUFDVjs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLEVBQUU7U0FDZDtRQUNELE1BQU0sRUFBRTtZQUNKOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsR0FBRztTQUNiO1FBQ0QsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxFQUFFO1NBQ2Q7UUFDRCxNQUFNLEVBQUU7WUFDSjs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLEVBQUU7U0FDYjtRQUNELGFBQWEsRUFBRTtZQUNYOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsQ0FBQztTQUNiO1FBQ0QsV0FBVyxFQUFFO1lBQ1Q7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxFQUFFO1NBQ2Q7S0FDSixDQUFDO0FBQ04sQ0FBQyxDQUFDIn0=