"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxy = void 0;
const s_color_1 = __importDefault(require("@coffeekraken/s-color"));
const get_1 = __importDefault(require("@coffeekraken/sugar/shared/object/get"));
function proxy(path, originalValue, config) {
    if (path.match(/\.colors\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/)) {
        if (path.split('.').pop() === 'default') {
            return originalValue;
        }
        const defaultColor = get_1.default(config, path.split('.').slice(0, -1).join('.') + '.default');
        if (typeof originalValue === 'string') {
            if (originalValue.slice(0, 1) === '#' &&
                (originalValue.length === 7 || originalValue.length === 4)) {
                return originalValue;
            }
            else if (originalValue.match(/^rgb\(.*,.*,.*\)$/)) {
                return originalValue;
            }
            else if (originalValue.match(/^rgba\(.*,.*,.*,.*\)$/)) {
                return originalValue;
            }
            else if (originalValue.match(/^hsl\(.*,.*,.*\)$/)) {
                return originalValue;
            }
            else if (originalValue.match(/^hsla\(.*,.*,.*,.*\)$/)) {
                return originalValue;
            }
            else {
                const color = new s_color_1.default(defaultColor);
                color.apply(originalValue);
                return color.toString();
            }
        }
    }
    return originalValue;
}
exports.proxy = proxy;
exports.default = {
    default: {
        colors: {
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
                default: '#848e91',
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
                default: '#2b3438',
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
                default: '#848e91',
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
                default: '[config.theme.default.colors.primary.default]',
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
                default: '#f2bc2b',
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
                default: '#6d858f',
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
                default: '#5cb85c',
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
                default: '#f0ad4e',
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
                default: '#d9534f',
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
                default: '#2199e8',
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
                default: '[config.theme.default.colors.primary.default]',
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
    },
    dark: {
        colors: {
            primary: {
                default: '#ffffff'
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9FQUE2QztBQUM3QyxnRkFBMEQ7QUFFMUQsU0FBZ0IsS0FBSyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsTUFBTTtJQUMvQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsdUNBQXVDLENBQUMsRUFBRTtRQUN2RCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssU0FBUyxFQUFFO1lBQ3ZDLE9BQU8sYUFBYSxDQUFDO1NBQ3RCO1FBQ0QsTUFBTSxZQUFZLEdBQUcsYUFBSyxDQUN4QixNQUFNLEVBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FDcEQsQ0FBQztRQUNGLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFO1lBQ3JDLElBQ0UsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRztnQkFDakMsQ0FBQyxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUMxRDtnQkFDQSxPQUFPLGFBQWEsQ0FBQzthQUN0QjtpQkFBTSxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsRUFBRTtnQkFDbkQsT0FBTyxhQUFhLENBQUM7YUFDdEI7aUJBQU0sSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLEVBQUU7Z0JBQ3ZELE9BQU8sYUFBYSxDQUFDO2FBQ3RCO2lCQUFNLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO2dCQUNuRCxPQUFP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