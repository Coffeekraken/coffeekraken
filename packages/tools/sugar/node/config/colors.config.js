"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                colors
 * @namespace           config
 * @type                Object
 *
 * This config file delare the colors used in the project. Each colors are defined
 * by a ```color``` property that contain the actual color hexadecimal code and can
 * have a ```modifiers``` property that specify some color variants like "light", "dark", etc...
 * Here's the list of available modifiers actions:
 * - hue {Deg}
 * - lighten {Percent}
 * - darken {Percent}
 * - saturate {Percent}
 * - desaturate {Percent}
 * - grayscale {Boolean}
 * - complement {Boolean}
 * - invert {Boolean}
 * - opacity {Percent}
 * - mix {Color}
 * - lightness {Percent}
 * - saturation {Percent}
 *
 * @example         js
 * {
 *    scss: {
 *      colors: {
 *        default: {
 *          color: '#ff0000',
 *          modifiers: {
 *            light: '-lighten 10% -opacity 50%'
 *          }
 *        }
 *      }
 *    }
 * }
 *
 * @since           1.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
exports.default = {
    /**
     * @name                default
     * @namespace           config.colors
     * @type                Color
     * @default             #848e91
     *
     * Specify the <default>default</default> color value and modifiers.
     * The color object format has to follow these guidelines:
     * - color (#848e91) {Color}: Specify the default color
     * - modifiers ({}) (Object): Specify the modifiers available for this color
     *
     * @modifier      50      -lighten 45%
     * @modifier      100      -lighten 40%
     * @modifier      200      -lighten 30%
     * @modifier      300      -lighten 20%
     * @modifier      400      -lighten 10%
     * @modifier      500      -lighten 0%
     * @modifier      600      -darken 10%
     * @modifier      700      -darken 20%
     * @modifier      800      -darken 30%
     * @modifier      900      -darken 40%
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    default: {
        color: '#848e91',
        modifiers: {
            50: '-lighten 45%',
            100: '-lighten 40%',
            200: '-lighten 30%',
            300: '-lighten 20%',
            400: '-lighten 10%',
            500: '-lighten 0%',
            600: '-darken 10%',
            700: '-darken 20%',
            800: '-darken 30%',
            900: '-darken 40%'
        }
    },
    /**
     * @name                title
     * @namespace           config.colors
     * @type                Color
     * @default             #2b3438
     *
     * Specify the <title>title</title> color value and modifiers.
     * The color object format has to follow these guidelines:
     * - color (#2b3438) {Color}: Specify the default color
     * - modifiers ({}) (Object): Specify the modifiers available for this color
     *
     * @modifier      50      -lighten 45%
     * @modifier      100      -lighten 40%
     * @modifier      200      -lighten 30%
     * @modifier      300      -lighten 20%
     * @modifier      400      -lighten 10%
     * @modifier      500      -lighten 0%
     * @modifier      600      -darken 10%
     * @modifier      700      -darken 20%
     * @modifier      800      -darken 30%
     * @modifier      900      -darken 40%
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    title: {
        color: '#2b3438',
        modifiers: {
            50: '-lighten 45%',
            100: '-lighten 40%',
            200: '-lighten 30%',
            300: '-lighten 20%',
            400: '-lighten 10%',
            500: '-lighten 0%',
            600: '-darken 10%',
            700: '-darken 20%',
            800: '-darken 30%',
            900: '-darken 40%'
        }
    },
    /**
     * @name                text
     * @namespace           config.colors
     * @type                Color
     * @default             #848e91
     *
     * Specify the <text>text</text> color value and modifiers.
     * The color object format has to follow these guidelines:
     * - color (#848e91) {Color}: Specify the default color
     * - modifiers ({}) (Object): Specify the modifiers available for this color
     *
     * @modifier      50      -lighten 45%
     * @modifier      100      -lighten 40%
     * @modifier      200      -lighten 30%
     * @modifier      300      -lighten 20%
     * @modifier      400      -lighten 10%
     * @modifier      500      -lighten 0%
     * @modifier      600      -darken 10%
     * @modifier      700      -darken 20%
     * @modifier      800      -darken 30%
     * @modifier      900      -darken 40%
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    text: {
        color: '#848e91',
        modifiers: {
            50: '-lighten 45%',
            100: '-lighten 40%',
            200: '-lighten 30%',
            300: '-lighten 20%',
            400: '-lighten 10%',
            500: '-lighten 0%',
            600: '-darken 10%',
            700: '-darken 20%',
            800: '-darken 30%',
            900: '-darken 40%'
        }
    },
    /**
     * @name                link
     * @namespace           config.colors
     * @type                Color
     * @default             primary
     *
     * Specify the <link>link</link> color value and modifiers.
     * The color object format has to follow these guidelines:
     * - color (#primary) {Color}: Specify the default color
     * - modifiers ({}) (Object): Specify the modifiers available for this color
     *
     * @modifier      50      -lighten 45%
     * @modifier      100      -lighten 40%
     * @modifier      200      -lighten 30%
     * @modifier      300      -lighten 20%
     * @modifier      400      -lighten 10%
     * @modifier      500      -lighten 0%
     * @modifier      600      -darken 10%
     * @modifier      700      -darken 20%
     * @modifier      800      -darken 30%
     * @modifier      900      -darken 40%
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    link: {
        color: 'primary',
        modifiers: {
            50: '-lighten 45%',
            100: '-lighten 40%',
            200: '-lighten 30%',
            300: '-lighten 20%',
            400: '-lighten 10%',
            500: '-lighten 0%',
            600: '-darken 10%',
            700: '-darken 20%',
            800: '-darken 30%',
            900: '-darken 40%'
        }
    },
    /**
     * @name                primary
     * @namespace           config.colors
     * @type                Color
     * @default             #f2bc2b
     *
     * Specify the <primary>primary</primary> color value and modifiers.
     * The color object format has to follow these guidelines:
     * - color (#f2bc2b) {Color}: Specify the default color
     * - modifiers ({}) (Object): Specify the modifiers available for this color
     *
     * @modifier      50      -lighten 45%
     * @modifier      100      -lighten 40%
     * @modifier      200      -lighten 30%
     * @modifier      300      -lighten 20%
     * @modifier      400      -lighten 10%
     * @modifier      500      -lighten 0%
     * @modifier      600      -darken 10%
     * @modifier      700      -darken 20%
     * @modifier      800      -darken 30%
     * @modifier      900      -darken 40%
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    primary: {
        color: '#f2bc2b',
        modifiers: {
            50: '-lighten 45%',
            100: '-lighten 40%',
            200: '-lighten 30%',
            300: '-lighten 20%',
            400: '-lighten 10%',
            500: '-lighten 0%',
            600: '-darken 10%',
            700: '-darken 20%',
            800: '-darken 30%',
            900: '-darken 40%'
        }
    },
    /**
     * @name                secondary
     * @namespace           config.colors
     * @type                Color
     * @default             #2b3438
     *
     * Specify the <secondary>secondary</secondary> color value and modifiers.
     * The color object format has to follow these guidelines:
     * - color (#2b3438) {Color}: Specify the default color
     * - modifiers ({}) (Object): Specify the modifiers available for this color
     *
     * @modifier      50      -lighten 45%
     * @modifier      100      -lighten 40%
     * @modifier      200      -lighten 30%
     * @modifier      300      -lighten 20%
     * @modifier      400      -lighten 10%
     * @modifier      500      -lighten 0%
     * @modifier      600      -darken 10%
     * @modifier      700      -darken 20%
     * @modifier      800      -darken 30%
     * @modifier      900      -darken 40%
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    secondary: {
        color: '#6d858f',
        modifiers: {
            50: '-lighten 45%',
            100: '-lighten 40%',
            200: '-lighten 30%',
            300: '-lighten 20%',
            400: '-lighten 10%',
            500: '-lighten 0%',
            600: '-darken 10%',
            700: '-darken 20%',
            800: '-darken 30%',
            900: '-darken 40%'
        }
    },
    /**
     * @name                success
     * @namespace           config.colors
     * @type                Color
     * @default             #5cb85c
     *
     * Specify the <success>success</success> color value and modifiers.
     * The color object format has to follow these guidelines:
     * - color (#5cb85c) {Color}: Specify the default color
     * - modifiers ({}) (Object): Specify the modifiers available for this color
     *
     * @modifier      50      -lighten 45%
     * @modifier      100      -lighten 40%
     * @modifier      200      -lighten 30%
     * @modifier      300      -lighten 20%
     * @modifier      400      -lighten 10%
     * @modifier      500      -lighten 0%
     * @modifier      600      -darken 10%
     * @modifier      700      -darken 20%
     * @modifier      800      -darken 30%
     * @modifier      900      -darken 40%
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    success: {
        color: '#5cb85c',
        modifiers: {
            50: '-lighten 45%',
            100: '-lighten 40%',
            200: '-lighten 30%',
            300: '-lighten 20%',
            400: '-lighten 10%',
            500: '-lighten 0%',
            600: '-darken 10%',
            700: '-darken 20%',
            800: '-darken 30%',
            900: '-darken 40%'
        }
    },
    /**
     * @name                warning
     * @namespace           config.colors
     * @type                Color
     * @default             #f0ad4e
     *
     * Specify the <warning>warning</warning> color value and modifiers.
     * The color object format has to follow these guidelines:
     * - color (#f0ad4e) {Color}: Specify the default color
     * - modifiers ({}) (Object): Specify the modifiers available for this color
     *
     * @modifier      50      -lighten 45%
     * @modifier      100      -lighten 40%
     * @modifier      200      -lighten 30%
     * @modifier      300      -lighten 20%
     * @modifier      400      -lighten 10%
     * @modifier      500      -lighten 0%
     * @modifier      600      -darken 10%
     * @modifier      700      -darken 20%
     * @modifier      800      -darken 30%
     * @modifier      900      -darken 40%
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    warning: {
        color: '#f0ad4e',
        modifiers: {
            50: '-lighten 45%',
            100: '-lighten 40%',
            200: '-lighten 30%',
            300: '-lighten 20%',
            400: '-lighten 10%',
            500: '-lighten 0%',
            600: '-darken 10%',
            700: '-darken 20%',
            800: '-darken 30%',
            900: '-darken 40%'
        }
    },
    /**
     * @name                error
     * @namespace           config.colors
     * @type                Color
     * @default             #d9534f
     *
     * Specify the <error>error</error> color value and modifiers.
     * The color object format has to follow these guidelines:
     * - color (#d9534f) {Color}: Specify the default color
     * - modifiers ({}) (Object): Specify the modifiers available for this color
     *
     * @modifier      50      -lighten 45%
     * @modifier      100      -lighten 40%
     * @modifier      200      -lighten 30%
     * @modifier      300      -lighten 20%
     * @modifier      400      -lighten 10%
     * @modifier      500      -lighten 0%
     * @modifier      600      -darken 10%
     * @modifier      700      -darken 20%
     * @modifier      800      -darken 30%
     * @modifier      900      -darken 40%
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    error: {
        color: '#d9534f',
        modifiers: {
            50: '-lighten 45%',
            100: '-lighten 40%',
            200: '-lighten 30%',
            300: '-lighten 20%',
            400: '-lighten 10%',
            500: '-lighten 0%',
            600: '-darken 10%',
            700: '-darken 20%',
            800: '-darken 30%',
            900: '-darken 40%'
        }
    },
    /**
     * @name                info
     * @namespace           config.colors
     * @type                Color
     * @default             #2199e8
     *
     * Specify the <info>info</info> color value and modifiers.
     * The color object format has to follow these guidelines:
     * - color (#2199e8) {Color}: Specify the default color
     * - modifiers ({}) (Object): Specify the modifiers available for this color
     *
     * @modifier      50      -lighten 45%
     * @modifier      100      -lighten 40%
     * @modifier      200      -lighten 30%
     * @modifier      300      -lighten 20%
     * @modifier      400      -lighten 10%
     * @modifier      500      -lighten 0%
     * @modifier      600      -darken 10%
     * @modifier      700      -darken 20%
     * @modifier      800      -darken 30%
     * @modifier      900      -darken 40%
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    info: {
        color: '#2199e8',
        modifiers: {
            50: '-lighten 45%',
            100: '-lighten 40%',
            200: '-lighten 30%',
            300: '-lighten 20%',
            400: '-lighten 10%',
            500: '-lighten 0%',
            600: '-darken 10%',
            700: '-darken 20%',
            800: '-darken 30%',
            900: '-darken 40%'
        }
    },
    /**
     * @name                extension
     * @namespace           config.colors
     * @type                Color
     * @default             #2b3438
     *
     * Specify the <primary>extension</primary> color value and modifiers.
     * The color object format has to follow these guidelines:
     * - color (#2b3438) {Color}: Specify the default color
     * - modifiers ({}) (Object): Specify the modifiers available for this color
     *
     * @modifier      50      -lighten 45%
     * @modifier      100      -lighten 40%
     * @modifier      200      -lighten 30%
     * @modifier      300      -lighten 20%
     * @modifier      400      -lighten 10%
     * @modifier      500      -lighten 0%
     * @modifier      600      -darken 10%
     * @modifier      700      -darken 20%
     * @modifier      800      -darken 30%
     * @modifier      900      -darken 40%
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    extension: {
        color: 'primary',
        modifiers: {
            blade: '#ff2d20',
            php: '#8892BF',
            js: '#f7df1e',
            node: '#68A063',
            css: '#498FE1',
            scss: '#CF649A',
            sass: '#CF649A',
            json: '#000000',
            jpg: '#B2C0E1',
            jpeg: '#B2C0E1',
            pdf: '#E7786E',
            doc: '#60D7FD',
            psd: '#F9D659',
            mp3: '#E98C61',
            png: '#C29DFB',
            aac: '#B1C5C9',
            zip: '#9CC04E',
            dmg: '#E36E4B'
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvY29sb3JzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDRztBQUNILGtCQUFlO0lBQ2I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILE9BQU8sRUFBRTtRQUNQLEtBQUssRUFBRSxTQUFTO1FBQ2hCLFNBQVMsRUFBRTtZQUNULEVBQUUsRUFBRSxjQUFjO1lBQ2xCLEdBQUcsRUFBRSxjQUFjO1lBQ25CLEdBQUcsRUFBRSxjQUFjO1lBQ25CLEdBQUcsRUFBRSxjQUFjO1lBQ25CLEdBQUcsRUFBRSxjQUFjO1lBQ25CLEdBQUcsRUFBRSxhQUFhO1lBQ2xCLEdBQUcsRUFBRSxhQUFhO1lBQ2xCLEdBQUcsRUFBRSxhQUFhO1lBQ2xCLEdBQUcsRUFBRSxhQUFhO1lBQ2xCLEdBQUcsRUFBRSxhQUFhO1NBQ25CO0tBQ0Y7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsS0FBSyxFQUFFO1FBQ0wsS0FBSyxFQUFFLFNBQVM7UUFDaEIsU0FBUyxFQUFFO1lBQ1QsRUFBRSxFQUFFLGNBQWM7WUFDbEIsR0FBRyxFQUFFLGNBQWM7WUFDbkIsR0FBRyxFQUFFLGNBQWM7WUFDbkIsR0FBRyxFQUFFLGNBQWM7WUFDbkIsR0FBRyxFQUFFLGNBQWM7WUFDbkIsR0FBRyxFQUFFLGFBQWE7WUFDbEIsR0FBRyxFQUFFLGFBQWE7WUFDbEIsR0FBRyxFQUFFLGFBQWE7WUFDbEIsR0FBRyxFQUFFLGFBQWE7WUFDbEIsR0FBRyxFQUFFLGFBQWE7U0FDbkI7S0FDRjtJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsU0FBUztRQUNoQixTQUFTLEVBQUU7WUFDVCxFQUFFLEVBQUUsY0FB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