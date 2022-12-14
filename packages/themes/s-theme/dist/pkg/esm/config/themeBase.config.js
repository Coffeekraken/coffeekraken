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
         * @default         [config.themeColor]
         *
         * Specify the color schema to be used in the dark theme
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get color() {
            return api.config.themeColor;
        },
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
        get easing() {
            return api.config.themeEasing;
        },
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
        get scroll() {
            return api.config.themeScroll;
        },
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
        get timing() {
            return api.config.themeTiming;
        },
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
        get transition() {
            return api.config.themeTransition;
        },
        /**
         * @name            gradient
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themegradient" config
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
         * @default         {}
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
         * @default         {}
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
         * @default         {}
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
         * @default         {}
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
         * @default         {}
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
         * @default         {}
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
         * @default         {}
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
         * @default         {}
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
         * @default         {}
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
         * @default         {}
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
         * @default         {}
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
        get border() {
            return api.config.themeBorder;
        },
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
        get space() {
            return api.config.themeSpace;
        },
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
        get margin() {
            return api.config.themeMargin;
        },
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
        get padding() {
            return api.config.themePadding;
        },
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
        get offsize() {
            return api.config.themeOffsize;
        },
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
        get media() {
            return api.config.themeMedia;
        },
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
        get ui() {
            return api.config.themeUi;
        },
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
        get typo() {
            return api.config.themeTypo;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQVksRUFBRSxNQUFNO1FBRXBCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEtBQUs7WUFDTCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ2pDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxNQUFNO1lBQ04sT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNsQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksTUFBTTtZQUNOLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDbEMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE1BQU07WUFDTixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ2xDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxVQUFVO1lBQ1YsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUN0QyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksUUFBUTtZQUNSLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDcEMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE9BQU87WUFDUCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ25DLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxNQUFNO1lBQ04sT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNsQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksS0FBSztZQUNMLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDakMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLFFBQVE7WUFDUixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBQ3BDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxLQUFLO1lBQ0wsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNqQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksT0FBTztZQUNQLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDbkMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEtBQUs7WUFDTCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ2pDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxNQUFNO1lBQ04sT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNsQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksS0FBSztZQUNMLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDakMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLElBQUk7WUFDSixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2hDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxJQUFJO1lBQ0osT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksTUFBTTtZQUNOLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDbEMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEtBQUs7WUFDTCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ2pDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxNQUFNO1lBQ04sT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNsQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksT0FBTztZQUNQLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDbkMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE9BQU87WUFDUCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ25DLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxLQUFLO1lBQ0wsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNqQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRTtZQUNGLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDOUIsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLElBQUk7WUFDSixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2hDLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9