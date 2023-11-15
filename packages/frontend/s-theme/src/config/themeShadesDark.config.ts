/**
 * @name                    themeShadesDark
 * @as                      Color shades dark
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  stable
 *
 * Specify the @coffeekraken/s-theme dark color shades available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default (api) => {
    return {
        text: {
            /**
             * @name          lighten
             * @namespace     config.themeShadesDark.text
             * @type          Number
             * @default      15
             *
             * Specify the lighten value for the "text" color shade
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 10,

            color: {
                main: {
                    /**
                     * @name          lighten
                     * @namespace     config.themeShadesDark.text.color.main
                     * @type          Number
                     * @default      15
                     *
                     * Specify the lighten value for the "text" share of the main color shade
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    lighten: 50,
                },
            },
        },
        placeholder: {
            /**
             * @name          lighten
             * @namespace     config.themeShadesDark.placeholder
             * @type          Number
             * @default      5
             *
             * Specify the lighten value for the "placeholder" color shade
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 50,
            /**
             * @name          alpha
             * @namespace     config.themeShadesDark.placeholder
             * @type          Number
             * @default      0.4
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
             * @namespace     config.themeShadesDark.foreground
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
             * @name          darken
             * @namespace     config.themeShadesDark.background
             * @type          Number
             * @default      30
             *
             * Specify the darken value for the "background" color shade
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            darken: 30,
        },
        surface: {
            /**
             * @name          darken
             * @namespace     config.themeShadesDark.surface
             * @type          Number
             * @default      25
             *
             * Specify the darken value for the "surface" color shade
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            darken: 25,
        },
        ui: {
            /**
             * @name          lighten
             * @namespace     config.themeShadesDark.ui
             * @type          Number
             * @default      10
             *
             * Specify the darken value for the "ui" color shade
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            lighten: 10,
        },
        uiBackground: {
            /**
             * @name          darken
             * @namespace     config.themeShadesDark.uiBackground
             * @type          Number
             * @default      27
             *
             * Specify the darken value for the "uiBackground" color shade
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            darken: 27,
        },
        border: {
            /**
             * @name          alpha
             * @namespace     config.themeShadesDark.border
             * @type          Number
             * @default      0.4
             *
             * Specify the alpha value for the "border" color shade
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            alpha: 0.4,
        },
        hover: {
            /**
             * @name          lighten
             * @namespace     config.themeShadesDark.hover
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
             * @namespace     config.themeShadesDark.active
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
             * @namespace     config.themeShadesDark.gradientStart
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
             * @name          darken
             * @namespace     config.themeShadesDark.gradientEnd
             * @type          Number
             * @default      20
             *
             * Specify the darken value for the "gradientEnd" color shade
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            darken: 20,
        },
    };
};
