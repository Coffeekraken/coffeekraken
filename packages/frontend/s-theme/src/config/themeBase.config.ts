/**
 * @name                    themeBase
 * @as                      Base
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme base available configurations
 * This is the base theme configuration that aggregate all the others like the themeColors, etc...
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (api) {
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
         * @default         config.themeColor
         *
         * Specify the color schema to be used in the theme
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get color() {
            return api.config.themeColor;
        },

        /**
         * @name            classmap
         * @namespace        config.themeBase
         * @type            String
         * @default         config.themeClassmap
         *
         * Specify classmap settings to be used in the theme
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get classmap() {
            return api.config.themeClassmap;
        },

        /**
         * @name            lod
         * @namespace        config.themeBase
         * @type            String
         * @default         config.themeLod
         *
         * Specify the level of details to be used in the theme
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get lod() {
            return api.config.themeLod;
        },

        /**
         * @name            easing
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeEasing
         *
         * Reference the "themeEasing" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get easing() {
            return api.config.themeEasing;
        },

        /**
         * @name            scroll
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeScroll
         *
         * Reference the "themeScroll" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get scroll() {
            return api.config.themeScroll;
        },

        /**
         * @name            partytown
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themePartytown
         *
         * Reference the "themePartytown" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get partytown() {
            return api.config.themePartytown;
        },

        /**
         * @name            timing
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeTiming
         *
         * Reference the "themeTiming" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get timing() {
            return api.config.themeTiming;
        },

        /**
         * @name            transition
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeTransition
         *
         * Reference the "themeTransition" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get transition() {
            return api.config.themeTransition;
        },

        /**
         * @name            gradient
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeGradient
         *
         * Reference the "themeGradient" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get gradient() {
            return api.config.themeGradient;
        },

        /**
         * @name            helpers
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeHelpers
         *
         * Reference the "themeHelpers" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get helpers() {
            return api.config.themeHelpers;
        },

        /**
         * @name            layout
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeLayout
         *
         * Reference the "themeLayout" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get layout() {
            return api.config.themeLayout;
        },

        /**
         * @name            ratio
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeRatio
         *
         * Reference the "themeRatio" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get ratio() {
            return api.config.themeRatio;
        },

        /**
         * @name            scalable
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeScalable
         *
         * Reference the "themeScalable" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get scalable() {
            return api.config.themeScalable;
        },

        /**
         * @name            scale
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeScale
         *
         * Reference the "themeScale" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get scale() {
            return api.config.themeScale;
        },

        /**
         * @name            opacity
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeOpacity
         *
         * Reference the "themeOpacity" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get opacity() {
            return api.config.themeOpacity;
        },

        /**
         * @name            width
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeWidth
         *
         * Reference the "themeWidth" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get width() {
            return api.config.themeWidth;
        },

        /**
         * @name            height
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeHeight
         *
         * Reference the "themeHeight" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get height() {
            return api.config.themeHeight;
        },

        /**
         * @name            depth
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeDepth
         *
         * Reference the "themeDepth" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get depth() {
            return api.config.themeDepth;
        },

        /**
         * @name            size
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeSize
         *
         * Reference the "themeSize" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get size() {
            return api.config.themeSize;
        },

        /**
         * @name            font
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeFont
         *
         * Reference the "themeFont" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get font() {
            return api.config.themeFont;
        },

        /**
         * @name            border
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeBorder
         *
         * Reference the "themeBorder" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get border() {
            return api.config.themeBorder;
        },

        /**
         * @name            space
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeSpace
         *
         * Reference the "themeSpace" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get space() {
            return api.config.themeSpace;
        },

        /**
         * @name            margin
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeMargin
         *
         * Reference the "themeMargin" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get margin() {
            return api.config.themeMargin;
        },

        /**
         * @name            padding
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themePadding
         *
         * Reference the "themePadding" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get padding() {
            return api.config.themePadding;
        },

        /**
         * @name            offsize
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeOffsize
         *
         * Reference the "themeOffsize" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get offsize() {
            return api.config.themeOffsize;
        },

        /**
         * @name            media
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeMedia
         *
         * Reference the "themeMedia" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get media() {
            return api.config.themeMedia;
        },

        /**
         * @name            ui
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeUi
         *
         * Reference the "themeUi" config for UI elements definition
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get ui() {
            return api.config.themeUi;
        },

        /**
         * @name            typo
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeTypo
         *
         * Reference the "themeTypo" config for typo elements definition
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get typo() {
            return api.config.themeTypo;
        },

        /**
         * @name            wireframe
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeWireframe
         *
         * Reference the "themeWireframe" config for wireframe elements definition
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get wireframe() {
            return api.config.themeWireframe;
        },
    };
}
