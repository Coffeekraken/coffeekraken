export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        /**
         * @name          defaultModifierStart
         * @namespace     config.themeGradient
         * @type          Object
         * @default       {}
         *
         * Specify the modifier value to use to lighten the base color like '--lighten 10% --alpha 0.3' etc...
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultModifierStart: {},

        /**
         * @name          defaultModifierEnd
         * @namespace     config.themeGradient
         * @type          String
         * @default       { lighten: 20 }
         *
         * Specify the modifier value to use to lighten the base color like '--lighten 10% --alpha 0.3' etc...
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultModifierEnd: {
            lighten: 20,
        },

        /**
         * @name          defaultX
         * @namespace     config.themeGradient
         * @type          String
         * @default       50%
         *
         * Specify the default x position to use for generated radial classes
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultX: '50%',

        /**
         * @name          defaultY
         * @namespace     config.themeGradient
         * @type          String
         * @default       50%
         *
         * Specify the default y position to use for generated radial classes
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultY: '50%',

        /**
         * @name          defaultAngle
         * @namespace     config.themeGradient
         * @type          String
         * @default       90deg
         *
         * Specify the default gradient angle to use for generated classes
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultAngle: '90deg',

        /**
         * @name          defaultTextModifierStart
         * @namespace     config.themeGradient
         * @type          Object
         * @default       {}
         *
         * Specify the modifier value to use to lighten the base color like '--lighten 10% --alpha 0.3' etc...
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultTextModifierStart: {},

        /**
         * @name          defaulTexttModifierEnd
         * @namespace     config.themeGradient
         * @type          String
         * @default       { lighten: 20 }
         *
         * Specify the modifier value to use to lighten the base color like '--lighten 10% --alpha 0.3' etc...
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultTextModifierEnd: {
            lighten: 20,
        },

        /**
         * @name          defaultTextAngle
         * @namespace     config.themeGradient
         * @type          String
         * @default       90deg
         *
         * Specify the default gradient angle to use for generated classes
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultTextAngle: '90deg',
    };
}
