"use strict";
/**
 * @name                    themeBase
 * @as                      Base
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  stable
 *
 * Specify the @coffeekraken/s-theme base available configurations
 * This is the base theme configuration that aggregate all the others like the themeColors, etc...
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    return {
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
         * @name            lod
         * @namespace        config.themeBase
         * @type            String
         * @default         config.themeLod
         * @status         beta
         *
         * Specify the level of details to be used in the theme
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        // get lod() {
        //     return api.config.themeLod;
        // },
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
         * @name            fontFamily
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeFont
         *
         * Reference the "themeFontFamily" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get fontFamily() {
            return api.config.themeFontFamily;
        },
        /**
         * @name            fontSize
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeFont
         *
         * Reference the "themeFontSize" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get fontSize() {
            return api.config.themeFontSize;
        },
        /**
         * @name            borderWidth
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeBorder
         *
         * Reference the "themeBorderWidth" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get borderWidth() {
            return api.config.themeBorderWidth;
        },
        /**
         * @name            borderRadius
         * @namespace       config.themeBase
         * @type            Object
         * @default         config.themeBorder
         *
         * Reference the "themeBorderRadius" config
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get borderRadius() {
            return api.config.themeBorderRadius;
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
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7OztHQWFHOztBQUVILG1CQUF5QixHQUFHO0lBQ3hCLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxLQUFLO1lBQ0wsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNqQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxjQUFjO1FBQ2Qsa0NBQWtDO1FBQ2xDLEtBQUs7UUFFTDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxNQUFNO1lBQ04sT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNsQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksTUFBTTtZQUNOLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDbEMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE1BQU07WUFDTixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ2xDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxVQUFVO1lBQ1YsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUN0QyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksUUFBUTtZQUNSLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDcEMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE9BQU87WUFDUCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ25DLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxNQUFNO1lBQ04sT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNsQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztR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