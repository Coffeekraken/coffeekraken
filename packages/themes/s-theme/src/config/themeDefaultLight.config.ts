export default function (env, config) {
    return {
        /**
         * @name            extends
         * @namespace        config.themeDefaultLight
         * @type            String
         * @default         themeBase
         *
         * Specify which theme this one extends from
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        extends: 'themeBase',

        /**
         * @name            colorSchema
         * @namespace        config.themeDefaultDark
         * @type            String
         * @default         [config.themeColorSchemaLight]
         *
         * Specify the color schema to be used in the dark theme
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        colorSchema: '[config.themeColorSchemaLight]',

        // /**
        //  * @name            defaultColor
        //  * @namespace        config.themeDefaultLight
        //  * @type            String
        //  * @default         main
        //  *
        //  * Specify the default color of this theme
        //  *
        //  * @since           2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //  */
        // defaultColor: 'main',

        // color: {
        //     base: {
        //         /**
        //          * @name                color
        //          * @namespace            config.themeDefaultLight.color.base
        //          * @type                Color
        //          * @default             hsla(212,14,50,1)
        //          *
        //          * Specify the "base" color value.
        //          *
        //          * @since             2.0.0
        //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //          */
        //         color: 'hsla(212,14,50,1)',
        //         /**
        //          * @name                ...
        //          * @namespace            config.themeDefaultLight.color.base
        //          * @type                Color
        //          * @default             [extends.colorSchema]
        //          *
        //          * Extends the colorSchema from the extended theme
        //          *
        //          * @since             2.0.0
        //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //          */
        //         '...': '[extends.colorSchema]',
        //         default: {
        //             text: {
        //                 darken: 40,
        //             },
        //             surface: {
        //                 darken: 5,
        //             },
        //         },
        //     },

        //     main: {
        //         /**
        //          * @name                color
        //          * @namespace            config.themeDefaultLight.color.main
        //          * @type                Color
        //          * @default             hsla(198,10,50,1)
        //          *
        //          * Specify the "main" color value.
        //          *
        //          * @since             2.0.0
        //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //          */
        //         color: 'hsla(212,14,50,1)',
        //         /**
        //          * @name                ...
        //          * @namespace            config.themeDefaultLight.color.main
        //          * @type                Color
        //          * @default             [extends.colorSchema]
        //          *
        //          * Extends the colorSchema from the extended theme
        //          *
        //          * @since             2.0.0
        //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //          */
        //         '...': '[extends.colorSchema]',
        //         default: {
        //             text: {
        //                 darken: 10,
        //             },
        //             surface: {
        //                 lighten: 48,
        //             },
        //         },
        //     },

        //     accent: {
        //         /**
        //          * @name                color
        //          * @namespace            config.themeDefaultLight.color.accent
        //          * @type                Color
        //          * @default             #ffbb00
        //          *
        //          * Specify the "accent" color value.
        //          *
        //          * @since             2.0.0
        //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //          */
        //         color: '#ffbb00',
        //         /**
        //          * @name                ...
        //          * @namespace            config.themeDefaultLight.color.accent
        //          * @type                Color
        //          * @default             [extends.colorSchema]
        //          *
        //          * Extends the colorSchema from the extended theme
        //          *
        //          * @since             2.0.0
        //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //          */
        //         '...': '[extends.colorSchema]',
        //     },

        //     complementary: {
        //         /**
        //          * @name                color
        //          * @namespace            config.themeDefaultLight.color.complementary
        //          * @type                Color
        //          * @default             #5100ff
        //          *
        //          * Specify the "complementary" color value.
        //          *
        //          * @since             2.0.0
        //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //          */
        //         color: '#5100ff',
        //         /**
        //          * @name                ...
        //          * @namespace            config.themeDefaultLight.color.complementary
        //          * @type                Color
        //          * @default             [extends.colorSchema]
        //          *
        //          * Extends the colorSchema from the extended theme
        //          *
        //          * @since             2.0.0
        //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //          */
        //         '...': '[extends.colorSchema]',
        //     },

        //     success: {
        //         /**
        //          * @name                color
        //          * @namespace            config.themeDefaultLight.color.success
        //          * @type                Color
        //          * @default             #91ff00
        //          *
        //          * Specify the "success" color value.
        //          *
        //          * @since             2.0.0
        //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //          */
        //         color: '#91ff00',
        //         /**
        //          * @name                ...
        //          * @namespace            config.themeDefaultLight.color.success
        //          * @type                Color
        //          * @default             [extends.colorSchema]
        //          *
        //          * Extends the colorSchema from the extended theme
        //          *
        //          * @since             2.0.0
        //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //          */
        //         '...': '[extends.colorSchema]',
        //         default: {
        //             foreground: {
        //                 darken: 20,
        //             },
        //         },
        //     },

        //     warning: {
        //         /**
        //          * @name                color
        //          * @namespace            config.themeDefaultLight.color.warning
        //          * @type                Color
        //          * @default             #ffd500
        //          *
        //          * Specify the "warning" color value.
        //          *
        //          * @since             2.0.0
        //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //          */
        //         color: '#ffd500',
        //         /**
        //          * @name                ...
        //          * @namespace            config.themeDefaultLight.color.warning
        //          * @type                Color
        //          * @default             [extends.colorSchema]
        //          *
        //          * Extends the colorSchema from the extended theme
        //          *
        //          * @since             2.0.0
        //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //          */
        //         '...': '[extends.colorSchema]',
        //     },

        //     error: {
        //         /**
        //          * @name                color
        //          * @namespace            config.themeDefaultLight.color.error
        //          * @type                Color
        //          * @default             #ff003b
        //          *
        //          * Specify the "error" color value.
        //          *
        //          * @since             2.0.0
        //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //          */
        //         color: '#ff003b',
        //         /**
        //          * @name                ...
        //          * @namespace            config.themeDefaultLight.color.error
        //          * @type                Color
        //          * @default             [extends.colorSchema]
        //          *
        //          * Extends the colorSchema from the extended theme
        //          *
        //          * @since             2.0.0
        //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //          */
        //         '...': '[extends.colorSchema]',
        //     },

        //     info: {
        //         /**
        //          * @name                color
        //          * @namespace            config.themeDefaultLight.color.info
        //          * @type                Color
        //          * @default             #00ffff
        //          *
        //          * Specify the "info" color value.
        //          *
        //          * @since             2.0.0
        //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //          */
        //         color: '#00ffff',
        //         /**
        //          * @name                ...
        //          * @namespace            config.themeDefaultLight.color.info
        //          * @type                Color
        //          * @default             [extends.colorSchema]
        //          *
        //          * Extends the colorSchema from the extended theme
        //          *
        //          * @since             2.0.0
        //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //          */
        //         '...': '[extends.colorSchema]',
        //         default: {
        //             text: {
        //                 darken: 10,
        //             },
        //         },
        //     },
        // },
    };
}
