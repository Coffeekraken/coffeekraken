export default (api) => {
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
                    lighten: 30,
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
