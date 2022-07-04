export default function (env, config) {
    return {
        extends: 'themeBase',

        colorSchema: {
            text: {
                /**
                 * @name          lighten
                 * @namespace     config.themeDarkBase.colorSchema.text
                 * @type          Number
                 * @default      0
                 *
                 * Specify the lighten value for the "text" color variant
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                lighten: 0,
            },
            placeholder: {
                /**
                 * @name          lighten
                 * @namespace     config.themeDarkBase.colorSchema.placeholder
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
                 * @namespace     config.themeDarkBase.colorSchema.placeholder
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
                 * @namespace     config.themeDarkBase.colorSchema.foreground
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
                 * @namespace     config.themeDarkBase.colorSchema.background
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
                 * @namespace     config.themeDarkBase.colorSchema.backgroundForeground
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
            middleground: {
                /**
                 * @name          darken
                 * @namespace     config.themeDarkBase.colorSchema.middleground
                 * @type          Number
                 * @default      40
                 *
                 * Specify the darken value for the "surface" color variant
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                darken: 40,
            },
            middlegroundForeground: {
                /**
                 * @name          lighten
                 * @namespace     config.themeDarkBase.colorSchema.middlegroundForeground
                 * @type          Number
                 * @default      50
                 *
                 * Specify the lighten value for the "middlegroundForeground" color variant
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                lighten: 50,
            },
            surface: {
                /**
                 * @name          darken
                 * @namespace     config.themeDarkBase.colorSchema.surface
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
                 * @namespace     config.themeDarkBase.colorSchema.surfaceForeground
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
                 * @namespace     config.themeDarkBase.colorSchema.ui
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
                 * @namespace     config.themeDarkBase.colorSchema.uiForeground
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
                 * @namespace     config.themeDarkBase.colorSchema.border
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
                 * @namespace     config.themeDarkBase.colorSchema.gradientStart
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
                 * @namespace     config.themeDarkBase.colorSchema.gradientEnd
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
        },
    };
}
