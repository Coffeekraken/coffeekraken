"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxy = exports.prepare = void 0;
const s_color_1 = __importDefault(require("@coffeekraken/s-color"));
const get_1 = __importDefault(require("@coffeekraken/sugar/shared/object/get"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
function prepare(themeConfig, config) {
    Object.keys(themeConfig).forEach((themeName) => {
        const themeObj = themeConfig[themeName];
        if (themeObj.extends && !themeConfig[themeObj.extends]) {
            throw new Error(`<red>[theme.config.js]</red> The theme "<yellow>${themeName}</yellow>" need to extends the theme "<yellow>${themeObj.extends}</yellow>" but this theme does not exists...`);
        }
        else if (themeObj.extends) {
            themeConfig[themeName] = deepMerge_1.default(themeConfig[themeObj.extends], themeConfig[themeName]);
            delete themeConfig[themeName].extends;
        }
    });
    return themeConfig;
}
exports.prepare = prepare;
function proxy(path, originalValue, config) {
    if (path.match(/\.color\.[a-zA-Z0-9]+$/)) {
        const newStack = originalValue;
        Object.keys(originalValue).forEach((modName) => {
            const color = new s_color_1.default(newStack[modName]);
            newStack[`${modName}-i`] = color.apply('-i').toString();
        });
        return newStack;
    }
    if (path.match(/\.color\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/)) {
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
        modifier: {
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
        color: {
            /**
             * @name                default
             * @namespace           config.color
             * @type                Color
             * @default             #848e91
             *
             * Specify the <default>default</default> color value and modifiers.
             * The color object format has to follow these guidelines:
             * - color (#848e91) {Color}: Specify the default color
             * - modifiers ({}) (Object): Specify the modifiers available for this color
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            default: {
                default: '#848e91',
                '...': '[config.theme.default.modifier]'
            },
            /**
             * @name                title
             * @namespace           config.color
             * @type                Color
             * @default             #2b3438
             *
             * Specify the <title>title</title> color value and modifiers.
             * The color object format has to follow these guidelines:
             * - color (#2b3438) {Color}: Specify the default color
             * - modifiers ({}) (Object): Specify the modifiers available for this color
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            title: {
                default: '#2b3438',
                '...': '[config.theme.default.modifier]'
            },
            /**
             * @name                text
             * @namespace           config.color
             * @type                Color
             * @default             #848e91
             *
             * Specify the <text>text</text> color value and modifiers.
             * The color object format has to follow these guidelines:
             * - color (#848e91) {Color}: Specify the default color
             * - modifiers ({}) (Object): Specify the modifiers available for this color
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            text: {
                default: '#848e91',
                '...': '[config.theme.default.modifier]'
            },
            /**
             * @name                link
             * @namespace           config.color
             * @type                Color
             * @default             primary
             *
             * Specify the <link>link</link> color value and modifiers.
             * The color object format has to follow these guidelines:
             * - color (#primary) {Color}: Specify the default color
             * - modifiers ({}) (Object): Specify the modifiers available for this color
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            link: {
                default: '#f2bc2b',
                '...': '[config.theme.default.modifier]'
            },
            /**
             * @name                primary
             * @namespace           config.color
             * @type                Color
             * @default             #f2bc2b
             *
             * Specify the <primary>primary</primary> color value and modifiers.
             * The color object format has to follow these guidelines:
             * - color (#f2bc2b) {Color}: Specify the default color
             * - modifiers ({}) (Object): Specify the modifiers available for this color
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            primary: {
                default: '#f2bc2b',
                '...': '[config.theme.default.modifier]'
            },
            /**
             * @name                secondary
             * @namespace           config.color
             * @type                Color
             * @default             #2b3438
             *
             * Specify the <secondary>secondary</secondary> color value and modifiers.
             * The color object format has to follow these guidelines:
             * - color (#2b3438) {Color}: Specify the default color
             * - modifiers ({}) (Object): Specify the modifiers available for this color
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            secondary: {
                default: '#6d858f',
                '...': '[config.theme.default.modifier]'
            },
            /**
             * @name                success
             * @namespace           config.color
             * @type                Color
             * @default             #5cb85c
             *
             * Specify the <success>success</success> color value and modifiers.
             * The color object format has to follow these guidelines:
             * - color (#5cb85c) {Color}: Specify the default color
             * - modifiers ({}) (Object): Specify the modifiers available for this color
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            success: {
                default: '#5cb85c',
                '...': '[config.theme.default.modifier]'
            },
            /**
             * @name                warning
             * @namespace           config.color
             * @type                Color
             * @default             #f0ad4e
             *
             * Specify the <warning>warning</warning> color value and modifiers.
             * The color object format has to follow these guidelines:
             * - color (#f0ad4e) {Color}: Specify the default color
             * - modifiers ({}) (Object): Specify the modifiers available for this color
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            warning: {
                default: '#f0ad4e',
                '...': '[config.theme.default.modifier]'
            },
            /**
             * @name                error
             * @namespace           config.color
             * @type                Color
             * @default             #d9534f
             *
             * Specify the <error>error</error> color value and modifiers.
             * The color object format has to follow these guidelines:
             * - color (#d9534f) {Color}: Specify the default color
             * - modifiers ({}) (Object): Specify the modifiers available for this color
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            error: {
                default: '#d9534f',
                '...': '[config.theme.default.modifier]'
            },
            /**
             * @name                info
             * @namespace           config.color
             * @type                Color
             * @default             #2199e8
             *
             * Specify the <info>info</info> color value and modifiers.
             * The color object format has to follow these guidelines:
             * - color (#2199e8) {Color}: Specify the default color
             * - modifiers ({}) (Object): Specify the modifiers available for this color
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            info: {
                default: '#2199e8',
                '...': '[config.theme.default.modifier]'
            },
            /**
             * @name                extension
             * @namespace           config.color
             * @type                Color
             * @default             #2b3438
             *
             * Specify the <primary>extension</primary> color value and modifiers.
             * The color object format has to follow these guidelines:
             * - color (#2b3438) {Color}: Specify the default color
             * - modifiers ({}) (Object): Specify the modifiers available for this color
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            extension: {
                default: '[config.theme.default.color.primary.default]',
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
        },
        font: {
            /**
             * @name            family
             * @namespace       config.font
             * @type            Object
             *
             * Store the font family that will be available in the project
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            family: {
                /**
                 * @name            default
                 * @namespace       config.theme.default.fonts.family
                 * @type            Object
                 *
                 * Declare the <primary>default</primary> font face
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                default: {
                    'font-family': 'Titillium Web',
                    'font-weight': 400,
                    import: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap'
                },
                /**
                 * @name            title
                 * @namespace       config.theme.default.fonts.family
                 * @type            Object
                 *
                 * Declare the <primary>title</primary> font face
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                title: {
                    'font-family': 'Titillium Web',
                    'font-weight': 700,
                    import: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@700&display=swap'
                },
                /**
                 * @name            quote
                 * @namespace       config.theme.default.fonts.family
                 * @type            Object
                 *
                 * Declare the <primary>quote</primary> font face
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                quote: {
                    'font-family': 'Palatino, Times, Georgia, serif',
                    'font-weight': 'normal',
                    'font-style': 'normal',
                    'font-display': 'auto',
                    'cap-height': 0.65
                },
                /**
                 * @name            code
                 * @namespace       config.theme.default.fonts.family
                 * @type            Object
                 *
                 * Declare the <primary>code</primary> font face
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                code: {
                    'font-family': 'Menlo, Monaco, Consolas, Courier New, monospace',
                    'font-weight': 'normal',
                    'font-style': 'normal',
                    'font-display': 'auto',
                    'cap-height': 0.65
                }
            },
            /**
             * @name            size
             * @namespace       config.font
             * @type            Object
             *
             * Store the font size that will be available in the project
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            size: {
                /**
                 * @name          default
                 * @namespace     config.theme.default.font.size
                 * @type          String
                 * @default       16px
                 *
                 * Declare the font size <primary>default</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                default: '16px',
                /**
                 * @name          0
                 * @namespace     config.theme.default.font.size
                 * @type          String
                 * @default       0
                 *
                 * Declare the font size <primary>50</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                0: 0,
                /**
                 * @name          50
                 * @namespace     config.theme.default.font.size
                 * @type          String
                 * @default       2px
                 *
                 * Declare the font size <primary>50</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                50: '4px',
                /**
                 * @name          100
                 * @namespace     config.theme.default.font.size
                 * @type          String
                 * @default       4px
                 *
                 * Declare the font size <primary>100</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                100: '4px',
                /**
                 * @name          200
                 * @namespace     config.theme.default.font.size
                 * @type          String
                 * @default       8px
                 *
                 * Declare the font size <primary>200</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                200: '8px',
                /**
                 * @name          300
                 * @namespace     config.theme.default.font.size
                 * @type          String
                 * @default       12px
                 *
                 * Declare the font size <primary>300</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                300: '12px',
                /**
                 * @name          400
                 * @namespace     config.theme.default.font.size
                 * @type          String
                 * @default       16px
                 *
                 * Declare the font size <primary>400</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                400: '16px',
                /**
                 * @name          500
                 * @namespace     config.theme.default.font.size
                 * @type          String
                 * @default       24px
                 *
                 * Declare the font size <primary>500</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                500: '24px',
                /**
                 * @name          600
                 * @namespace     config.theme.default.font.size
                 * @type          String
                 * @default       32px
                 *
                 * Declare the font size <primary>600</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                600: '32px',
                /**
                 * @name          700
                 * @namespace     config.theme.default.font.size
                 * @type          String
                 * @default       40px
                 *
                 * Declare the font size <primary>700</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                700: '40px',
                /**
                 * @name          800
                 * @namespace     config.theme.default.font.size
                 * @type          String
                 * @default       48px
                 *
                 * Declare the font size <primary>800</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                800: '48px',
                /**
                 * @name          900
                 * @namespace     config.theme.default.font.size
                 * @type          String
                 * @default       56px
                 *
                 * Declare the font size <primary>900</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                900: '56px'
            }
        },
        border: {
            size: {
                /**
                 * @name              0
                 * @namespace         config.theme.border.size
                 * @type              Number
                 * @default           0
                 *
                 * Specify the <primary>0</primary> border size
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                0: '0px',
                /**
                 * @name              100
                 * @namespace         config.theme.border.size
                 * @type              Number
                 * @default           1px
                 *
                 * Specify the <primary>100</primary> border size
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                100: '1px',
                /**
                 * @name              200
                 * @namespace         config.theme.border.size
                 * @type              Number
                 * @default           2px
                 *
                 * Specify the <primary>200</primary> border size
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                200: '2px',
                /**
                 * @name              300
                 * @namespace         config.theme.border.size
                 * @type              Number
                 * @default           4px
                 *
                 * Specify the <primary>300</primary> border size
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                300: '4px',
                /**
                 * @name              400
                 * @namespace         config.theme.border.size
                 * @type              Number
                 * @default           6px
                 *
                 * Specify the <primary>400</primary> border size
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                400: '6px',
                /**
                 * @name              500
                 * @namespace         config.theme.border.size
                 * @type              Number
                 * @default           8px
                 *
                 * Specify the <primary>500</primary> border size
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                500: '8px',
                /**
                 * @name              600
                 * @namespace         config.theme.border.size
                 * @type              Number
                 * @default           12px
                 *
                 * Specify the <primary>600</primary> border size
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                600: '12px',
                /**
                 * @name              700
                 * @namespace         config.theme.border.size
                 * @type              Number
                 * @default           16px
                 *
                 * Specify the <primary>700</primary> border size
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                700: '16px',
                /**
                 * @name              800
                 * @namespace         config.theme.border.size
                 * @type              Number
                 * @default           20px
                 *
                 * Specify the <primary>800</primary> border size
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                800: '20px',
                /**
                 * @name              900
                 * @namespace         config.theme.border.size
                 * @type              Number
                 * @default           24px
                 *
                 * Specify the <primary>900</primary> border size
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                900: '24px'
            },
            radius: {
                /**
                 * @name              default
                 * @namespace         config.theme.default.border.radius
                 * @type              Number
                 * @default           10px
                 *
                 * Specify the <primary>0</primary> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                default: '10px',
                /**
                 * @name              0
                 * @namespace         config.theme.default.border.radius
                 * @type              Number
                 * @default           0px
                 *
                 * Specify the <primary>0</primary> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                0: '0px',
                /**
                 * @name              100
                 * @namespace         config.theme.default.border.radius
                 * @type              Number
                 * @default           2px
                 *
                 * Specify the <primary>100</primary> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                100: '2px',
                /**
                 * @name              200
                 * @namespace         config.theme.default.border.radius
                 * @type              Number
                 * @default           4px
                 *
                 * Specify the <primary>200</primary> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                200: '4px',
                /**
                 * @name              300
                 * @namespace         config.theme.default.border.radius
                 * @type              Number
                 * @default           6px
                 *
                 * Specify the <primary>300</primary> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                300: '6px',
                /**
                 * @name              400
                 * @namespace         config.theme.default.border.radius
                 * @type              Number
                 * @default           8px
                 *
                 * Specify the <primary>400</primary> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                400: '8px',
                /**
                 * @name              500
                 * @namespace         config.theme.default.border.radius
                 * @type              Number
                 * @default           10px
                 *
                 * Specify the <primary>500</primary> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                500: '10px',
                /**
                 * @name              600
                 * @namespace         config.theme.default.border.radius
                 * @type              Number
                 * @default           12px
                 *
                 * Specify the <primary>600</primary> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                600: '12px',
                /**
                 * @name              700
                 * @namespace         config.theme.default.border.radius
                 * @type              Number
                 * @default           14px
                 *
                 * Specify the <primary>700</primary> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                700: '14px',
                /**
                 * @name              800
                 * @namespace         config.theme.default.border.radius
                 * @type              Number
                 * @default           16px
                 *
                 * Specify the <primary>800</primary> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                800: '16px',
                /**
                 * @name              900
                 * @namespace         config.theme.default.border.radius
                 * @type              Number
                 * @default           18px
                 *
                 * Specify the <primary>900</primary> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                900: '18px'
            }
        },
        ui: {
            button: {
                padding: '1em 2em',
                borderRadius: '0.5em'
            }
        },
        space: {
            /**
             * @name            default
             * @namespace       config.theme.default.space
             * @type            String
             * @default         1rem
             *
             * Specify the <primary>default</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            default: '1rem',
            /**
             * @name            0
             * @namespace       config.theme.default.space
             * @type            String
             * @default         0.5rem
             *
             * Specify the <primary>0</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            0: '0rem',
            /**
             * @name            100
             * @namespace       config.theme.default.space
             * @type            String
             * @default         0.2rem
             *
             * Specify the <primary>100</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            100: '0.2rem',
            /**
             * @name            200
             * @namespace       config.theme.default.space
             * @type            String
             * @default         0.4rem
             *
             * Specify the <primary>200</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            200: '0.4rem',
            /**
             * @name            300
             * @namespace       config.theme.default.space
             * @type            String
             * @default         0.3rem
             *
             * Specify the <primary>300</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            300: '0.6rem',
            /**
             * @name            400
             * @namespace       config.theme.default.space
             * @type            String
             * @default         0.5rem
             *
             * Specify the <primary>400</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            400: '0.8rem',
            /**
             * @name            500
             * @namespace       config.theme.default.space
             * @type            String
             * @default         1rem
             *
             * Specify the <primary>500</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            500: '1rem',
            /**
             * @name            600
             * @namespace       config.theme.default.space
             * @type            String
             * @default         1.2rem
             *
             * Specify the <primary>600</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            600: '1.2rem',
            /**
             * @name            700
             * @namespace       config.theme.default.space
             * @type            String
             * @default         1.4rem
             *
             * Specify the <primary>700</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            700: '1.4rem',
            /**
             * @name            800
             * @namespace       config.theme.default.space
             * @type            String
             * @default         1.6rem
             *
             * Specify the <primary>800</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            800: '1.6rem',
            /**
             * @name            900
             * @namespace       config.theme.default.space
             * @type            String
             * @default         1.8rem
             *
             * Specify the <primary>900</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            900: '1.8rem'
        },
        margin: {
            /**
             * @name            default
             * @namespace       config.theme.default.margin
             * @type            String
             * @default         [config.theme.default.space.default]
             *
             * Specify the <primary>default</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            default: '[config.theme.default.space.default]',
            /**
             * @name            0
             * @namespace       config.theme.default.margin
             * @type            String
             * @default         [config.theme.default.space.0]
             *
             * Specify the <primary>0</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            0: '[config.theme.default.space.0]',
            /**
             * @name            100
             * @namespace       config.theme.default.margin
             * @type            String
             * @default         [config.theme.default.space.100]
             *
             * Specify the <primary>100</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            100: '[config.theme.default.space.100]',
            /**
             * @name            200
             * @namespace       config.theme.default.margin
             * @type            String
             * @default         [config.theme.default.space.200]
             *
             * Specify the <primary>200</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            200: '[config.theme.default.space.200]',
            /**
             * @name            300
             * @namespace       config.theme.default.margin
             * @type            String
             * @default         [config.theme.default.space.300]
             *
             * Specify the <primary>300</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            300: '[config.theme.default.space.300]',
            /**
             * @name            400
             * @namespace       config.theme.default.margin
             * @type            String
             * @default         [config.theme.default.space.400]
             *
             * Specify the <primary>400</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            400: '[config.theme.default.space.400]',
            /**
             * @name            500
             * @namespace       config.theme.default.margin
             * @type            String
             * @default         [config.theme.default.space.500]
             *
             * Specify the <primary>500</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            500: '[config.theme.default.space.500]',
            /**
             * @name            600
             * @namespace       config.theme.default.margin
             * @type            String
             * @default         [config.theme.default.space.600]
             *
             * Specify the <primary>600</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            600: '[config.theme.default.space.600]',
            /**
             * @name            700
             * @namespace       config.theme.default.margin
             * @type            String
             * @default         [config.theme.default.space.700]
             *
             * Specify the <primary>700</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            700: '[config.theme.default.space.700]',
            /**
             * @name            800
             * @namespace       config.theme.default.margin
             * @type            String
             * @default         [config.theme.default.space.800]
             *
             * Specify the <primary>800</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            800: '[config.theme.default.space.800]',
            /**
             * @name            900
             * @namespace       config.theme.default.margin
             * @type            String
             * @default         [config.theme.default.space.900]
             *
             * Specify the <primary>900</primary> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            900: '[config.theme.default.space.900]'
        },
        padding: {
            /**
             * @name            default
             * @namespace       config.theme.default.padding
             * @type            String
             * @default         [config.theme.default.space.default]
             *
             * Specify the <primary>default</primary> space used for padding and padding
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            default: '[config.theme.default.space.default]',
            /**
             * @name            0
             * @namespace       config.theme.default.padding
             * @type            String
             * @default         [config.theme.default.space.0]
             *
             * Specify the <primary>0</primary> space used for padding and padding
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            0: '[config.theme.default.space.0]',
            /**
             * @name            100
             * @namespace       config.theme.default.padding
             * @type            String
             * @default         [config.theme.default.space.100]
             *
             * Specify the <primary>100</primary> space used for padding and padding
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            100: '[config.theme.default.space.100]',
            /**
             * @name            200
             * @namespace       config.theme.default.padding
             * @type            String
             * @default         [config.theme.default.space.200]
             *
             * Specify the <primary>200</primary> space used for padding and padding
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            200: '[config.theme.default.space.200]',
            /**
             * @name            300
             * @namespace       config.theme.default.padding
             * @type            String
             * @default         [config.theme.default.space.300]
             *
             * Specify the <primary>300</primary> space used for padding and padding
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            300: '[config.theme.default.space.300]',
            /**
             * @name            400
             * @namespace       config.theme.default.padding
             * @type            String
             * @default         [config.theme.default.space.400]
             *
             * Specify the <primary>400</primary> space used for padding and padding
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            400: '[config.theme.default.space.400]',
            /**
             * @name            500
             * @namespace       config.theme.default.padding
             * @type            String
             * @default         [config.theme.default.space.500]
             *
             * Specify the <primary>500</primary> space used for padding and padding
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            500: '[config.theme.default.space.500]',
            /**
             * @name            600
             * @namespace       config.theme.default.padding
             * @type            String
             * @default         [config.theme.default.space.600]
             *
             * Specify the <primary>600</primary> space used for padding and padding
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            600: '[config.theme.default.space.600]',
            /**
             * @name            700
             * @namespace       config.theme.default.padding
             * @type            String
             * @default         [config.theme.default.space.700]
             *
             * Specify the <primary>700</primary> space used for padding and padding
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            700: '[config.theme.default.space.700]',
            /**
             * @name            800
             * @namespace       config.theme.default.padding
             * @type            String
             * @default         [config.theme.default.space.800]
             *
             * Specify the <primary>800</primary> space used for padding and padding
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            800: '[config.theme.default.space.800]',
            /**
             * @name            900
             * @namespace       config.theme.default.padding
             * @type            String
             * @default         [config.theme.default.space.900]
             *
             * Specify the <primary>900</primary> space used for padding and padding
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            900: '[config.theme.default.space.900]'
        },
        media: {
            /**
             * @name              defaultAction
             * @namespace         config.theme.default.media
             * @type              String
             * @values            >,<,=,>=,<=
             * @default           =
             *
             * Specify the default action to apply if you don't specify one in your media
             * mixin call like ```@include Sugar.media('tablet') {...}```. If the defaultAction is set to ">=",
             * the above media will be the same as ```@include Sugar.media('>=tablet') {...}```
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            defaultAction: '=',
            /**
             * @name              defaultQuery
             * @namespace         config.theme.default.media
             * @type              String
             * @default           screen
             *
             * Specify the default query to base all the generated ones upon
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            defaultQuery: 'screen',
            queries: {
                /**
                 * @name          mobile
                 * @namespace     config.theme.default.media.queries
                 * @type          Object
                 * @default       {'min-width': null, 'max-width': 639}
                 *
                 * Specify the media query arguments needed to target mobile
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                mobile: {
                    'min-width': null,
                    'max-width': 639
                },
                /**
                 * @name          tablet
                 * @namespace     config.theme.default.media.queries
                 * @type          Object
                 * @default       {'min-width': 640, 'max-width': 1279}
                 *
                 * Specify the media query arguments needed to target tablet
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                tablet: {
                    'min-width': 640,
                    'max-width': 1279
                },
                /**
                 * @name          desktop
                 * @namespace     config.theme.default.media.queries
                 * @type          Object
                 * @default       {'min-width': 1280, 'max-width': null}
                 *
                 * Specify the media query arguments needed to target desktop
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                desktop: {
                    'min-width': 1280,
                    'max-width': null
                }
                // devices based media queries
                // 'iphone-4': require('./media/iphone-4-4s'),
                // 'iphone-4s': require('./media/iphone-4-4s'),
                // 'iphone-5': require('./media/iphone-5-5s-5c-5se'),
                // 'iphone-5s': require('./media/iphone-5-5s-5c-5se'),
                // 'iphone-5c': require('./media/iphone-5-5s-5c-5se'),
                // 'iphone-5se': require('./media/iphone-5-5s-5c-5se'),
                // 'iphone-6': require('./media/iphone-6-6s-7-8'),
                // 'iphone-6s': require('./media/iphone-6-6s-7-8'),
                // 'iphone-7': require('./media/iphone-6-6s-7-8'),
                // 'iphone-8': require('./media/iphone-6-6s-7-8'),
                // 'iphone-6+': require('./media/iphone-6+-7+-8+'),
                // 'iphone-7+': require('./media/iphone-6+-7+-8+'),
                // 'iphone-8+': require('./media/iphone-6+-7+-8+'),
                // 'iphone-x': require('./media/iphone-x'),
                // 'galaxy-s3': require('./media/galaxy-s3'),
                // 'galaxy-s4': require('./media/galaxy-s4-s5-note3'),
                // 'galaxy-s5': require('./media/galaxy-s4-s5-note3'),
                // 'galaxy-note3': require('./media/galaxy-s4-s5-note3'),
                // 'galaxy-s6': require('./media/galaxy-s6'),
                // pixel: require('./media/pixel'),
                // 'pixel-xl': require('./media/pixel-xl'),
                // 'htc-one': require('./media/htc-one'),
                // windows: require('./media/windows'),
                // 'ipad-1': require('./media/ipad-1-2-mini-air'),
                // 'ipad-2': require('./media/ipad-1-2-mini-air'),
                // 'ipad-mini': require('./media/ipad-1-2-mini-air'),
                // 'ipad-air': require('./media/ipad-1-2-mini-air'),
                // 'ipad-3': require('./media/ipad-3-4-pro9'),
                // 'ipad-4': require('./media/ipad-3-4-pro9'),
                // 'ipad-pro9': require('./media/ipad-3-4-pro9'),
                // 'ipad-pro10': require('./media/ipad-pro10'),
                // 'ipad-pro12': require('./media/ipad-pro12'),
                // 'galaxy-tab2': require('./media/galaxy-tab2'),
                // 'galaxy-tabs': require('./media/galaxy-tabs'),
                // 'nexus-7': require('./media/nexus-7'),
                // 'nexus-8': require('./media/nexus-7'),
                // 'nexus-9': require('./media/nexus-9'),
                // 'kindle-fire-hd-7': require('./media/kindle-fire-hd-7'),
                // 'kindle-fire-hd-8': require('./media/kindle-fire-hd-8')
            }
        }
    },
    dark: {
        extends: 'default',
        color: {
            primary: {
                default: '#ffffff'
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9FQUE2QztBQUM3QyxnRkFBMEQ7QUFFMUQsNEZBQXNFO0FBRXRFLFNBQWdCLE9BQU8sQ0FBQyxXQUFXLEVBQUUsTUFBTTtJQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQzdDLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QyxJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3RELE1BQU0sSUFBSSxLQUFLLENBQ2IsbURBQW1ELFNBQVMsaURBQWlELFFBQVEsQ0FBQyxPQUFPLDhDQUE4QyxDQUM1SyxDQUFDO1NBQ0g7YUFBTSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDM0IsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLG1CQUFXLENBQ2xDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQzdCLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FDdkIsQ0FBQztZQUNGLE9BQU8sV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztTQUN2QztJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQWhCRCwwQkFnQkM7QUFFRCxTQUFnQixLQUFLLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxNQUFNO0lBQy9DLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO1FBQ3hDLE1BQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQztRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzdDLE1BQU0sS0FBSyxHQUFHLElBQUksaUJBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM5QyxRQUFRLENBQUMsR0FBRyxPQUFPLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFFBQVEsQ0FBQztLQUNqQjtJQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxFQUFFO1FBQ3RELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxTQUFTLEVBQUU7WUFDdkMsT0FBTyxhQUFhLENBQUM7U0FDdEI7UUFDRCxNQUFNLFlBQVksR0FBRyxhQUFLLENBQ3hCLE1BQU0sRUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUNwRCxDQUFDO1FBQ0YsSUFBSSxPQUFPLGFBQWEsS0FBSyxRQUFRLEVBQUU7WUFDckMsSUFDRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHO2dCQUNqQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQzFEO2dCQUNBLE9BQU8sYUFBYSxDQUFDO2FBQ3RCO2lCQUFNLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO2dCQUNuRCxPQUFPLGFBQWEsQ0FBQzthQUN0QjtpQkFBTSxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsRUFBRTtnQkFDdkQsT0FBTyxhQUFhLENBQUM7YUFDdEI7aUJBQU0sSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLEVBQUU7Z0JBQ25ELE9BQU8sYUFBYSxDQUFDO2FBQ3RCO2lCQUFNLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO2dCQUN2RCxPQUFPLGFBQWEsQ0FBQzthQUN0QjtpQkFBTTtnQkFDTCxNQUFNLEtBQUssR0FBRyxJQUFJLGlCQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3pDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3pCO1NBQ0Y7S0FDRjtJQUNELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUM7QUF4Q0Qsc0JBd0NDO0FBRUQsa0JBQWU7SUFDYixPQUFPLEVBQUU7UUFDUCxRQUFRLEVBQUU7WUFDUixFQUFFLEVBQUUsY0FBYztZQUNsQixHQUFHLEVBQUUsY0FBYztZQUNuQixHQUFHLEVBQUUsY0FBYztZQUNuQixHQUFHLEVBQUUsY0FBYztZQUNuQixHQUFHLEVBQUUsY0FBYztZQUNuQixHQUFHLEVBQUUsYUFBYTtZQUNsQixHQUFHLEVBQUUsYUFBYTtZQUNsQixHQUFHLEVBQUUsYUFBYTtZQUNsQixHQUFHLEVBQUUsYUFBYTtZQUNsQixHQUFHLEVBQUUsYUFBYTtTQUNuQjtRQUVELEtBQUssRUFBRTtZQUNMOzs7Ozs7Ozs7Ozs7O2VBYUc7WUFDSCxPQUFPLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLEtBQUssRUFBRSxpQ0FBaUM7YUFDekM7WUFFRDs7Ozs7Ozs7Ozs7OztlQWFHO1lBQ0gsS0FBSyxFQUFFO2dCQUNMLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixLQUFLLEVBQUUsaUNBQWlDO2FBQ3pDO1lBRUQ7Ozs7Ozs7Ozs7Ozs7ZUFhRztZQUNILElBQUksRUFBRTtnQkFDSixPQUFPLEVBQUUsU0FBUztnQkFDbEIsS0FBSyxFQUFFLGlDQUFpQzthQUN6QztZQUVEOzs7Ozs7Ozs7Ozs7O2VBYUc7WUFDSCxJQUFJLEVBQUU7Z0JBQ0osT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLEtBQUssRUFBRSxpQ0FBaUM7YUFDekM7WUFFRDs7Ozs7Ozs7Ozs7OztlQWFHO1lBQ0gsT0FBTyxFQUFFO2dCQUNQLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixLQUFLLEVBQUUsaUNBQWlDO2FBQ3pDO1lBRUQ7Ozs7Ozs7Ozs7Ozs7ZUFhRztZQUNILFNBQVMsRUFBRTtnQkFDVCxPQUFPLEVBQUUsU0FBUztnQkFDbEIsS0FBSyxFQUFFLGlDQUFpQzthQUN6QztZQUVEOzs7Ozs7Ozs7Ozs7O2VBYUc7WUFDSCxPQUFPLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLEtBQUssRUFBRSxpQ0FBaUM7YUFDekM7WUFFRDs7Ozs7Ozs7Ozs7OztlQWFHO1lBQ0gsT0FBTyxFQUFFO2dCQUNQLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixLQUFLLEVBQUUsaUNBQWlDO2FBQ3pDO1lBRUQ7Ozs7Ozs7Ozs7Ozs7ZUFhRztZQUNILEtBQUssRUFBRTtnQkFDTCxPQUFPLEVBQUUsU0FBUztnQkFDbEIsS0FBSyxFQUFFLGlDQUFpQzthQUN6QztZQUVEOzs7Ozs7Ozs7Ozs7O2VBYUc7WUFDSCxJQUFJLEVBQUU7Z0JBQ0osT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLEtBQUssRUFBRSxpQ0FBaUM7YUFDekM7WUFFRDs7Ozs7Ozs7Ozs7OztlQWFHO1lBQ0gsU0FBUyxFQUFFO2dCQUNULE9BQU8sRUFBRSw4Q0FBOEM7Z0JBQ3ZELEtBQUssRUFBRSxTQUFTO2dCQUNoQixHQUFHLEVBQUUsU0FBUztnQkFDZCxFQUFFLEVBQUUsU0FBUztnQkFDYixJQUFJLEVBQUUsU0FBUztnQkFDZixHQUFHLEVBQUUsU0FBUztnQkFDZCxJQUFJLEVBQUUsU0FBUztnQkFDZixJQUFJLEVBQUUsU0FBUztnQkFDZixJQUFJLEVBQUUsU0FBUztnQkFDZixHQUFHLEVBQUUsU0FBUztnQkFDZCxJQUFJLEVBQUUsU0FBUztnQkFDZixHQUFHLEVBQUUsU0FBUztnQkFDZCxHQUFHLEVBQUUsU0FBUztnQkFDZCxHQUFHLEVBQUUsU0FBUztnQkFDZCxHQUFHLEVBQUUsU0FBUztnQkFDZCxHQUFHLEVBQUUsU0FBUztnQkFDZCxHQUFHLEVBQUUsU0FBUztnQkFDZCxHQUFHLEVBQUUsU0FBUztnQkFDZCxHQUFHLEVBQUUsU0FBUzthQUNmO1NBQ0Y7UUFFRCxJQUFJLEVBQUU7WUFDSjs7Ozs7Ozs7O2VBU0c7WUFDSCxNQUFNLEVBQUU7Z0JBQ047Ozs7Ozs7OzttQkFTRztnQkFDSCxPQUFPLEVBQUU7b0JBQ1AsYUFBYSxFQUFFLGVBQWU7b0JBQzlCLGFBQWEsRUFBRSxHQUFHO29CQUNsQixNQUFNLEVBQ0osOEVBQThFO2lCQUNqRjtnQkFFRDs7Ozs7Ozs7O21CQVNHO2dCQUNILEtBQUssRUFBRTtvQkFDTCxhQUFhLEVBQUUsZUFBZTtvQkFDOUIsYUFBYSxFQUFFLEdBQUc7b0JBQ2xCLE1BQU0sRUFDSiw4RUFBOEU7aUJBQ2pGO2dCQUVEOzs7Ozs7Ozs7bUJBU0c7Z0JBQ0gsS0FBSyxFQUFFO29CQUNMLGFBQWEsRUFBRSxpQ0FBaUM7b0JBQ2hELGFBQWEsRUFBRSxRQUFRO29CQUN2QixZQUFZLEVBQUUsUUFBUTtvQkFDdEIsY0FBYyxFQUFFLE1BQU07b0JBQ3RCLFlBQVksRUFBRSxJQUFJO2lCQUNuQjtnQkFFRDs7Ozs7Ozs7O21CQVNHO2dCQUNILElBQUksRUFBRTtvQkFDSixhQUFhLEVBQUUsaURBQWlEO29CQUNoRSxhQUFhLEVBQUUsUUFBUTtvQkFDdkIsWUFBWSxFQUFFLFFBQVE7b0JBQ3RCLGNBQWMsRUFBRSxNQUFNO29CQUN0QixZQUFZLEVBQUUsSUFBSTtpQkFDbkI7YUFDRjtZQUVEOzs7Ozs7Ozs7ZUFTRztZQUNILElBQUksRUFBRTtnQkFDSjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsTUFBTTtnQkFFZjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxDQUFDLEVBQUUsQ0FBQztnQkFFSjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxFQUFFLEVBQUUsS0FBSztnQkFFVDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsS0FBSztnQkFFVjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsS0FBSztnQkFFVjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsTUFBTTtnQkFFWDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsTUFBTTtnQkFFWDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsTUFBTTtnQkFFWDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsTUFBTTtnQkFFWDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsTUFBTTtnQkFFWDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsTUFBTTtnQkFFWDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsTUFBTTthQUNaO1NBQ0Y7UUFFRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUU7Z0JBQ0o7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsQ0FBQyxFQUFFLEtBQUs7Z0JBRVI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsR0FBRyxFQUFFLEtBQUs7Z0JBRVY7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsR0FBRyxFQUFFLEtBQUs7Z0JBRVY7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsR0FBRyxFQUFFLEtBQUs7Z0JBRVY7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsR0FBRyxFQUFFLEtBQUs7Z0JBRVY7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsR0FBRyxFQUFFLEtBQUs7Z0JBRVY7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsR0FBRyxFQUFFLE1BQU07Z0JBRVg7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsR0FBRyxFQUFFLE1BQU07Z0JBRVg7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsR0FBRyxFQUFFLE1BQU07Z0JBRVg7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsR0FBRyxFQUFFLE1BQU07YUFDWjtZQUVELE1BQU0sRUFBRTtnQkFDTjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsTUFBTTtnQkFFZjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxDQUFDLEVBQUUsS0FBSztnQkFFUjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsS0FBSztnQkFFVjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsS0FBSztnQkFFVjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsS0FBSztnQkFFVjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsS0FBSztnQkFFVjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsTUFBTTtnQkFFWDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsTUFBTTtnQkFFWDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsTUFBTTtnQkFFWDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsTUFBTTtnQkFFWDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsTUFBTTthQUNaO1NBQ0Y7UUFFRCxFQUFFLEVBQUU7WUFDRixNQUFNLEVBQUU7Z0JBQ04sT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLFlBQVksRUFBRSxPQUFPO2FBQ3RCO1NBQ0Y7UUFFRCxLQUFLLEVBQUU7WUFDTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLE1BQU07WUFFZjs7Ozs7Ozs7OztlQVVHO1lBQ0gsQ0FBQyxFQUFFLE1BQU07WUFFVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLFFBQVE7WUFFYjs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLFFBQVE7WUFFYjs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLFFBQVE7WUFFYjs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLFFBQVE7WUFFYjs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLE1BQU07WUFFWDs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLFFBQVE7WUFFYjs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLFFBQVE7WUFFYjs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLFFBQVE7WUFFYjs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLFFBQVE7U0FDZDtRQUVELE1BQU0sRUFBRTtZQUNOOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsc0NBQXNDO1lBRS9DOzs7Ozs7Ozs7O2VBVUc7WUFDSCxDQUFDLEVBQUUsZ0NBQWdDO1lBRW5DOzs7Ozs7Ozs7O2VBVUc7WUFDSCxHQUFHLEVBQUUsa0NBQWtDO1lBRXZDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxHQUFHLEVBQUUsa0NBQWtDO1lBRXZDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxHQUFHLEVBQUUsa0NBQWtDO1lBRXZDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxHQUFHLEVBQUUsa0NBQWtDO1lBRXZDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxHQUFHLEVBQUUsa0NBQWtDO1lBRXZDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxHQUFHLEVBQUUsa0NBQWtDO1lBRXZDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxHQUFHLEVBQUUsa0NBQWtDO1lBRXZDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxHQUFHLEVBQUUsa0NBQWtDO1lBRXZDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxHQUFHLEVBQUUsa0NBQWtDO1NBQ3hDO1FBRUQsT0FBTyxFQUFFO1lBQ1A7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxzQ0FBc0M7WUFFL0M7Ozs7Ozs7Ozs7ZUFVRztZQUNILENBQUMsRUFBRSxnQ0FBZ0M7WUFFbkM7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSxrQ0FBa0M7WUFFdkM7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSxrQ0FBa0M7WUFFdkM7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSxrQ0FBa0M7WUFFdkM7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSxrQ0FBa0M7WUFFdkM7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSxrQ0FBa0M7WUFFdkM7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSxrQ0FBa0M7WUFFdkM7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSxrQ0FBa0M7WUFFdkM7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSxrQ0FBa0M7WUFFdkM7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSxrQ0FBa0M7U0FDeEM7UUFFRCxLQUFLLEVBQUU7WUFDTDs7Ozs7Ozs7Ozs7OztlQWFHO1lBQ0gsYUFBYSxFQUFFLEdBQUc7WUFFbEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILFlBQVksRUFBRSxRQUFRO1lBRXRCLE9BQU8sRUFBRTtnQkFDUDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxNQUFNLEVBQUU7b0JBQ04sV0FBVyxFQUFFLElBQUk7b0JBQ2pCLFdBQVcsRUFBRSxHQUFHO2lCQUNqQjtnQkFFRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxNQUFNLEVBQUU7b0JBQ04sV0FBVyxFQUFFLEdBQUc7b0JBQ2hCLFdBQVcsRUFBRSxJQUFJO2lCQUNsQjtnQkFFRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUU7b0JBQ1AsV0FBVyxFQUFFLElBQUk7b0JBQ2pCLFdBQVcsRUFBRSxJQUFJO2lCQUNsQjtnQkFFRCw4QkFBOEI7Z0JBQzlCLDhDQUE4QztnQkFDOUMsK0NBQStDO2dCQUUvQyxxREFBcUQ7Z0JBQ3JELHNEQUFzRDtnQkFDdEQsc0RBQXNEO2dCQUN0RCx1REFBdUQ7Z0JBRXZELGtEQUFrRDtnQkFDbEQsbURBQW1EO2dCQUNuRCxrREFBa0Q7Z0JBQ2xELGtEQUFrRDtnQkFFbEQsbURBQW1EO2dCQUNuRCxtREFBbUQ7Z0JBQ25ELG1EQUFtRDtnQkFFbkQsMkNBQTJDO2dCQUUzQyw2Q0FBNkM7Z0JBRTdDLHNEQUFzRDtnQkFDdEQsc0RBQXNEO2dCQUN0RCx5REFBeUQ7Z0JBRXpELDZDQUE2QztnQkFFN0MsbUNBQW1DO2dCQUNuQywyQ0FBMkM7Z0JBRTNDLHlDQUF5QztnQkFFekMsdUNBQXVDO2dCQUV2QyxrREFBa0Q7Z0JBQ2xELGtEQUFrRDtnQkFDbEQscURBQXFEO2dCQUNyRCxvREFBb0Q7Z0JBRXBELDhDQUE4QztnQkFDOUMsOENBQThDO2dCQUM5QyxpREFBaUQ7Z0JBRWpELCtDQUErQztnQkFFL0MsK0NBQStDO2dCQUUvQyxpREFBaUQ7Z0JBQ2pELGlEQUFpRDtnQkFFakQseUNBQXlDO2dCQUN6Qyx5Q0FBeUM7Z0JBRXpDLHlDQUF5QztnQkFFekMsMkRBQTJEO2dCQUMzRCwwREFBMEQ7YUFDM0Q7U0FDRjtLQUNGO0lBRUQsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFO1lBQ0wsT0FBTyxFQUFFO2dCQUNQLE9BQU8sRUFBRSxTQUFTO2FBQ25CO1NBQ0Y7S0FDRjtDQUNGLENBQUMifQ==