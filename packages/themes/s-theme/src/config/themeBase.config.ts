export default function (env, config) {
    return {
        /**
         * @name            defaultColor
         * @namespace        config.themeBase
         * @type            String
         * @default         main
         *
         * Specify which color to use by default for elements that make use of the "sugar.color(current)" color.
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultColor: 'main',

        /**
         * @name            color
         * @namespace        config.themeBase
         * @type            String
         * @default         [config.themeColor]
         *
         * Specify the color schema to be used in the dark theme
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        color: '[config.themeColor]',

        /**
         * @name            easing
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeEasing" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        easing: '[config.themeEasing]',

        /**
         * @name            scroll
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeScroll" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        scroll: '[config.themeScroll]',

        /**
         * @name            timing
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeTiming" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        timing: '[config.themeTiming]',

        /**
         * @name            transition
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeTransition" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        transition: '[config.themeTransition]',

        /**
         * @name            helpers
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeHelpers" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        helpers: '[config.themeHelpers]',

        /**
         * @name            layout
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeLayout" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        layout: '[config.themeLayout]',

        /**
         * @name            ratio
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeRatio" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        ratio: '[config.themeRatio]',

        /**
         * @name            scalable
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeScalable" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        scalable: '[config.themeScalable]',

        /**
         * @name            scale
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeScale" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        scale: '[config.themeScale]',

        /**
         * @name            opacity
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeOpacity" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        opacity: '[config.themeOpacity]',

        /**
         * @name            width
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeWidth" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        width: '[config.themeWidth]',

        /**
         * @name            height
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeHeight" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        height: '[config.themeHeight]',

        /**
         * @name            depth
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeDepth" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        depth: '[config.themeDepth]',

        /**
         * @name            size
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeSize" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        size: '[config.themeSize]',

        /**
         * @name            font
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeFont" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        font: '[config.themeFont]',

        /**
         * @name            scale
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeScale" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        border: '[config.themeBorder]',

        /**
         * @name            space
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeSpace" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        space: '[config.themeSpace]',

        /**
         * @name            margin
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeMargin" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        margin: '[config.themeMargin]',

        /**
         * @name            padding
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themePadding" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        padding: '[config.themePadding]',

        /**
         * @name            offsize
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeOffsize" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        offsize: '[config.themeOffsize]',

        /**
         * @name            media
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeMedia" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        media: '[config.themeMedia]',

        /**
         * @name            ui
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeUi" config for UI elements definition
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        ui: '[config.themeUi]',

        /**
         * @name            typo
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeTypo" config for typo elements definition
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        typo: '[config.themeTypo]',
    };
}
