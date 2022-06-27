export default function (env, config) {
    return {
        extends: 'themeBase',

        colorSchema: {
            text: {
                /**
                 * @name          darken
                 * @namespace     config.themeLightBase.colorSchema.text
                 * @type          Number
                 * @default      0
                 *
                 * Specify the lighten value for the "text" color variant
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                darken: 0,
            },
            placeholder: {
                /**
                 * @name          darken
                 * @namespace     config.themeLightBase.colorSchema.placeholder
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
                 * @namespace     config.themeLightBase.colorSchema.placeholder
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
                 * @namespace     config.themeLightBase.colorSchema.foreground
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
                 * @namespace     config.themeLightBase.colorSchema.background
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
            backgroundForeground: {
                /**
                 * @name          darken
                 * @namespace     config.themeLightBase.colorSchema.backgroundForeground
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
                 * @namespace     config.themeLightBase.colorSchema.surface
                 * @type          Number
                 * @default      35
                 *
                 * Specify the lighten value for the "surface" color variant
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                lighten: 35,
            },
            surfaceForeground: {
                /**
                 * @name          lighten
                 * @namespace     config.themeLightBase.colorSchema.surfaceForeground
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
                 * @namespace     config.themeLightBase.colorSchema.ui
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
                 * @namespace     config.themeLightBase.colorSchema.uiForeground
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
                 * @namespace     config.themeLightBase.colorSchema.border
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
                 * @namespace     config.themeLightBase.colorSchema.gradientStart
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
                 * @namespace     config.themeLightBase.colorSchema.gradientEnd
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
        },
    };
}
