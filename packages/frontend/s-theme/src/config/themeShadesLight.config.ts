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

export default (api) => {
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
