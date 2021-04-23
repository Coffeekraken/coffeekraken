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
    Object.keys(themeConfig.themes).forEach((themeName) => {
        const themeObj = themeConfig.themes[themeName];
        if (themeObj.extends && !themeConfig.themes[themeObj.extends]) {
            throw new Error(`<red>[theme.config.js]</red> The theme "<yellow>${themeName}</yellow>" need to extends the theme "<yellow>${themeObj.extends}</yellow>" but this theme does not exists...`);
        }
        else if (themeObj.extends) {
            themeConfig.themes[themeName] = deepMerge_1.default(themeConfig.themes[themeObj.extends], themeConfig.themes[themeName]);
            delete themeConfig.themes[themeName].extends;
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
    /**
     * @name          baseTheme
     * @namespace     config.theme
     */
    baseTheme: 'default',
    /**
     * @name          themes
     * @namespace     config.theme
     * @type          Object
     *
     * Store all the themes inside a property each like "default", "myCoolTheme", etc...
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    themes: {
        default: {
            modifier: {
                5: '-lighten 45%',
                10: '-lighten 40%',
                20: '-lighten 30%',
                30: '-lighten 20%',
                40: '-lighten 10%',
                50: '-lighten 0%',
                60: '-darken 10%',
                70: '-darken 20%',
                80: '-darken 30%',
                90: '-darken 40%'
            },
            transition: {
                slow: 'all 1s ease-in-out',
                default: 'all .5s ease-in-out',
                fast: 'all .2s ease-in-out'
            },
            depth: {
                0: 'box-shadow: 0',
                1: `box-shadow:
              0 0.1px 0.1px rgba(0, 0, 0, 0.017),
              0 0.3px 0.3px rgba(0, 0, 0, 0.024),
              0 0.5px 0.6px rgba(0, 0, 0, 0.03),
              0 0.9px 1.1px rgba(0, 0, 0, 0.036),
              0 1.7px 2.1px rgba(0, 0, 0, 0.043),
              0 4px 5px rgba(0, 0, 0, 0.06)
            ;`,
                2: `box-shadow:
              0 0.4px 0.5px rgba(0, 0, 0, 0.017),
              0 0.9px 1.1px rgba(0, 0, 0, 0.024),
              0 1.8px 2.1px rgba(0, 0, 0, 0.03),
              0 3.1px 3.8px rgba(0, 0, 0, 0.036),
              0 5.8px 7.1px rgba(0, 0, 0, 0.043),
              0 14px 17px rgba(0, 0, 0, 0.06)
            ;`,
                3: `box-shadow:
              0 0.6px 0.5px rgba(0, 0, 0, 0.017),
              0 1.5px 1.1px rgba(0, 0, 0, 0.024),
              0 2.8px 2.1px rgba(0, 0, 0, 0.03),
              0 4.9px 3.8px rgba(0, 0, 0, 0.036),
              0 9.2px 7.1px rgba(0, 0, 0, 0.043),
              0 22px 17px rgba(0, 0, 0, 0.06)
            ;`,
                4: `box-shadow:
              0 0.9px 0.7px rgba(0, 0, 0, 0.017),
              0 2.1px 1.7px rgba(0, 0, 0, 0.024),
              0 4px 3.1px rgba(0, 0, 0, 0.03),
              0 7.1px 5.6px rgba(0, 0, 0, 0.036),
              0 13.4px 10.4px rgba(0, 0, 0, 0.043),
              0 32px 25px rgba(0, 0, 0, 0.06)
            ;`,
                5: `box-shadow:
              0 1.3px 0.8px rgba(0, 0, 0, 0.017),
              0 3.1px 2px rgba(0, 0, 0, 0.024),
              0 5.9px 3.8px rgba(0, 0, 0, 0.03),
              0 10.5px 6.7px rgba(0, 0, 0, 0.036),
              0 19.6px 12.5px rgba(0, 0, 0, 0.043),
              0 47px 30px rgba(0, 0, 0, 0.06)
            ;`,
                6: `box-shadow:
              0 1.8px 1.1px rgba(0, 0, 0, 0.017),
              0 4.3px 2.7px rgba(0, 0, 0, 0.024),
              0 8px 5.1px rgba(0, 0, 0, 0.03),
              0 14.3px 9.2px rgba(0, 0, 0, 0.036),
              0 26.7px 17.1px rgba(0, 0, 0, 0.043),
              0 64px 41px rgba(0, 0, 0, 0.06)
            ;`,
                7: `box-shadow:
              0 2.4px 1.4px rgba(0, 0, 0, 0.017),
              0 5.7px 3.3px rgba(0, 0, 0, 0.024),
              0 10.6px 6.1px rgba(0, 0, 0, 0.03),
              0 19px 10.9px rgba(0, 0, 0, 0.036),
              0 35.5px 20.5px rgba(0, 0, 0, 0.043),
              0 85px 49px rgba(0, 0, 0, 0.06)
            ;`,
                8: `box-shadow:
              0 3px 1.9px rgba(0, 0, 0, 0.017),
              0 7.2px 4.6px rgba(0, 0, 0, 0.024),
              0 13.6px 8.6px rgba(0, 0, 0, 0.03),
              0 24.3px 15.4px rgba(0, 0, 0, 0.036),
              0 45.5px 28.8px rgba(0, 0, 0, 0.043),
              0 109px 69px rgba(0, 0, 0, 0.06)
            ;`,
                9: `box-shadow:
              0 4px 2.2px rgba(0, 0, 0, 0.017),
              0 9.6px 5.4px rgba(0, 0, 0, 0.024),
              0 18px 10.1px rgba(0, 0, 0, 0.03),
              0 32.2px 18.1px rgba(0, 0, 0, 0.036),
              0 60.2px 33.8px rgba(0, 0, 0, 0.043),
              0 144px 81px rgba(0, 0, 0, 0.06)
            ;`,
                10: `box-shadow:
              0 5px 2.6px rgba(0, 0, 0, 0.017),
              0 12px 6.3px rgba(0, 0, 0, 0.024),
              0 22.7px 11.8px rgba(0, 0, 0, 0.03),
              0 40.4px 21px rgba(0, 0, 0, 0.036),
              0 75.6px 39.3px rgba(0, 0, 0, 0.043),
              0 181px 94px rgba(0, 0, 0, 0.06)
            ;`
            },
            color: {
                /**
                 * @name                default
                 * @namespace           config.theme.themes.default.color
                 * @type                Color
                 * @default             #848e91
                 *
                 * Specify the <default>default</default> color value and modifiers.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                default: {
                    default: '#848e91',
                    '...': '[config.theme.themes.default.modifier]'
                },
                /**
                 * @name                title
                 * @namespace           config.theme.themes.default.color
                 * @type                Color
                 * @default             #2b3438
                 *
                 * Specify the <title>title</title> color value and modifiers.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                title: {
                    default: '#2b3438',
                    '...': '[config.theme.themes.default.modifier]'
                },
                /**
                 * @name                text
                 * @namespace           config.theme.themes.default.color
                 * @type                Color
                 * @default             #848e91
                 *
                 * Specify the <text>text</text> color value and modifiers.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                text: {
                    default: '#848e91',
                    '...': '[config.theme.themes.default.modifier]'
                },
                /**
                 * @name                link
                 * @namespace           config.theme.themes.default.color
                 * @type                Color
                 * @default             primary
                 *
                 * Specify the <link>link</link> color value and modifiers.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                link: {
                    default: '#f2bc2b',
                    '...': '[config.theme.themes.default.modifier]'
                },
                /**
                 * @name                primary
                 * @namespace           config.theme.themes.default.color
                 * @type                Color
                 * @default             #f2bc2b
                 *
                 * Specify the <primary>primary</primary> color value and modifiers.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                primary: {
                    default: '#f2bc2b',
                    '...': '[config.theme.themes.default.modifier]'
                },
                /**
                 * @name                secondary
                 * @namespace           config.theme.themes.default.color
                 * @type                Color
                 * @default             #2b3438
                 *
                 * Specify the <secondary>secondary</secondary> color value and modifiers.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                secondary: {
                    default: '#6d858f',
                    '...': '[config.theme.themes.default.modifier]'
                },
                /**
                 * @name                surface
                 * @namespace           config.theme.themes.default.color
                 * @type                Color
                 * @default             #2b3438
                 *
                 * Specify the <surface>surface</surface> color value and modifiers.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                surface: {
                    default: '#6d858f',
                    '...': '[config.theme.themes.default.modifier]'
                },
                /**
                 * @name                background
                 * @namespace           config.theme.themes.default.color
                 * @type                Color
                 * @default             #2b3438
                 *
                 * Specify the <background>background</background> color value and modifiers.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                background: {
                    default: '#6d858f',
                    '...': '[config.theme.themes.default.modifier]'
                },
                /**
                 * @name                success
                 * @namespace           config.theme.themes.default.color
                 * @type                Color
                 * @default             #5cb85c
                 *
                 * Specify the <success>success</success> color value and modifiers.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                success: {
                    default: '#5cb85c',
                    '...': '[config.theme.themes.default.modifier]'
                },
                /**
                 * @name                warning
                 * @namespace           config.theme.themes.default.color
                 * @type                Color
                 * @default             #f0ad4e
                 *
                 * Specify the <warning>warning</warning> color value and modifiers.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                warning: {
                    default: '#f0ad4e',
                    '...': '[config.theme.themes.default.modifier]'
                },
                /**
                 * @name                error
                 * @namespace           config.theme.themes.default.color
                 * @type                Color
                 * @default             #d9534f
                 *
                 * Specify the <error>error</error> color value and modifiers.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                error: {
                    default: '#d9534f',
                    '...': '[config.theme.themes.default.modifier]'
                },
                /**
                 * @name                info
                 * @namespace           config.theme.themes.default.color
                 * @type                Color
                 * @default             #2199e8
                 *
                 * Specify the <info>info</info> color value and modifiers.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                info: {
                    default: '#2199e8',
                    '...': '[config.theme.themes.default.modifier]'
                },
                /**
                 * @name                extension
                 * @namespace           config.theme.themes.default.color
                 * @type                Color
                 * @default             #2b3438
                 *
                 * Specify the <primary>extension</primary> color value and modifiers.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                extension: {
                    default: '[config.theme.themes.default.color.primary.default]',
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
            size: {
                /**
                 * @name          default
                 * @namespace     config.theme.themes.default.size
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
                 * @namespace     config.theme.themes.default.size
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
                 * @name          5
                 * @namespace     config.theme.themes.default.size
                 * @type          String
                 * @default       2px
                 *
                 * Declare the font size <primary>50</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                5: '4px',
                /**
                 * @name          10
                 * @namespace     config.theme.themes.default.size
                 * @type          String
                 * @default       4px
                 *
                 * Declare the font size <primary>10</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                10: '4px',
                /**
                 * @name          20
                 * @namespace     config.theme.themes.default.size
                 * @type          String
                 * @default       8px
                 *
                 * Declare the font size <primary>20</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                20: '8px',
                /**
                 * @name          30
                 * @namespace     config.theme.themes.default.size
                 * @type          String
                 * @default       12px
                 *
                 * Declare the font size <primary>30</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                30: '12px',
                /**
                 * @name          40
                 * @namespace     config.theme.themes.default.size
                 * @type          String
                 * @default       16px
                 *
                 * Declare the font size <primary>40</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                40: '16px',
                /**
                 * @name          50
                 * @namespace     config.theme.themes.default.size
                 * @type          String
                 * @default       24px
                 *
                 * Declare the font size <primary>50</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                50: '24px',
                /**
                 * @name          60
                 * @namespace     config.theme.themes.default.size
                 * @type          String
                 * @default       32px
                 *
                 * Declare the font size <primary>60</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                60: '32px',
                /**
                 * @name          70
                 * @namespace     config.theme.themes.default.size
                 * @type          String
                 * @default       40px
                 *
                 * Declare the font size <primary>70</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                70: '40px',
                /**
                 * @name          80
                 * @namespace     config.theme.themes.default.size
                 * @type          String
                 * @default       48px
                 *
                 * Declare the font size <primary>80</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                80: '48px',
                /**
                 * @name          90
                 * @namespace     config.theme.themes.default.size
                 * @type          String
                 * @default       56px
                 *
                 * Declare the font size <primary>90</primary>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                90: '56px'
            },
            font: {
                /**
                 * @name            family
                 * @namespace       config.theme.themes.default.font
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
                     * @namespace       config.theme.themes.default.fonts.family
                     * @type            Object
                     *
                     * Declare the <primary>default</primary> font face
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    default: {
                        'font-family': 'Titillium Web',
                        'font-weight': 40,
                        import: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@40&display=swap'
                    },
                    /**
                     * @name            title
                     * @namespace       config.theme.themes.default.fonts.family
                     * @type            Object
                     *
                     * Declare the <primary>title</primary> font face
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    title: {
                        'font-family': 'Titillium Web',
                        'font-weight': 70,
                        import: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@70&display=swap'
                    },
                    /**
                     * @name            quote
                     * @namespace       config.theme.themes.default.fonts.family
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
                     * @namespace       config.theme.themes.default.fonts.family
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
                 * @namespace       config.theme.themes.default.font
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
                     * @namespace     config.theme.themes.default.font.size
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
                     * @namespace     config.theme.themes.default.font.size
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
                     * @name          5
                     * @namespace     config.theme.themes.default.font.size
                     * @type          String
                     * @default       2px
                     *
                     * Declare the font size <primary>50</primary>
                     *
                     * @since         2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    5: '4px',
                    /**
                     * @name          10
                     * @namespace     config.theme.themes.default.font.size
                     * @type          String
                     * @default       4px
                     *
                     * Declare the font size <primary>10</primary>
                     *
                     * @since         2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    10: '4px',
                    /**
                     * @name          20
                     * @namespace     config.theme.themes.default.font.size
                     * @type          String
                     * @default       8px
                     *
                     * Declare the font size <primary>20</primary>
                     *
                     * @since         2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    20: '8px',
                    /**
                     * @name          30
                     * @namespace     config.theme.themes.default.font.size
                     * @type          String
                     * @default       12px
                     *
                     * Declare the font size <primary>30</primary>
                     *
                     * @since         2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    30: '12px',
                    /**
                     * @name          40
                     * @namespace     config.theme.themes.default.font.size
                     * @type          String
                     * @default       16px
                     *
                     * Declare the font size <primary>40</primary>
                     *
                     * @since         2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    40: '16px',
                    /**
                     * @name          50
                     * @namespace     config.theme.themes.default.font.size
                     * @type          String
                     * @default       24px
                     *
                     * Declare the font size <primary>50</primary>
                     *
                     * @since         2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    50: '24px',
                    /**
                     * @name          60
                     * @namespace     config.theme.themes.default.font.size
                     * @type          String
                     * @default       32px
                     *
                     * Declare the font size <primary>60</primary>
                     *
                     * @since         2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    60: '32px',
                    /**
                     * @name          70
                     * @namespace     config.theme.themes.default.font.size
                     * @type          String
                     * @default       40px
                     *
                     * Declare the font size <primary>70</primary>
                     *
                     * @since         2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    70: '40px',
                    /**
                     * @name          80
                     * @namespace     config.theme.themes.default.font.size
                     * @type          String
                     * @default       48px
                     *
                     * Declare the font size <primary>80</primary>
                     *
                     * @since         2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    80: '48px',
                    /**
                     * @name          90
                     * @namespace     config.theme.themes.default.font.size
                     * @type          String
                     * @default       56px
                     *
                     * Declare the font size <primary>90</primary>
                     *
                     * @since         2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    90: '56px'
                }
            },
            border: {
                size: {
                    /**
                     * @name              0
                     * @namespace         config.theme.themes.border.size
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
                     * @name              10
                     * @namespace         config.theme.themes.border.size
                     * @type              Number
                     * @default           1px
                     *
                     * Specify the <primary>10</primary> border size
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    10: '1px',
                    /**
                     * @name              20
                     * @namespace         config.theme.themes.border.size
                     * @type              Number
                     * @default           2px
                     *
                     * Specify the <primary>20</primary> border size
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    20: '2px',
                    /**
                     * @name              30
                     * @namespace         config.theme.themes.border.size
                     * @type              Number
                     * @default           4px
                     *
                     * Specify the <primary>30</primary> border size
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    30: '4px',
                    /**
                     * @name              40
                     * @namespace         config.theme.themes.border.size
                     * @type              Number
                     * @default           6px
                     *
                     * Specify the <primary>40</primary> border size
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    40: '6px',
                    /**
                     * @name              50
                     * @namespace         config.theme.themes.border.size
                     * @type              Number
                     * @default           8px
                     *
                     * Specify the <primary>50</primary> border size
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    50: '8px',
                    /**
                     * @name              60
                     * @namespace         config.theme.themes.border.size
                     * @type              Number
                     * @default           12px
                     *
                     * Specify the <primary>60</primary> border size
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    60: '12px',
                    /**
                     * @name              70
                     * @namespace         config.theme.themes.border.size
                     * @type              Number
                     * @default           16px
                     *
                     * Specify the <primary>70</primary> border size
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    70: '16px',
                    /**
                     * @name              80
                     * @namespace         config.theme.themes.border.size
                     * @type              Number
                     * @default           20px
                     *
                     * Specify the <primary>80</primary> border size
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    80: '20px',
                    /**
                     * @name              90
                     * @namespace         config.theme.themes.border.size
                     * @type              Number
                     * @default           24px
                     *
                     * Specify the <primary>90</primary> border size
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    90: '24px'
                },
                radius: {
                    /**
                     * @name              default
                     * @namespace         config.theme.themes.default.border.radius
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
                     * @namespace         config.theme.themes.default.border.radius
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
                     * @name              10
                     * @namespace         config.theme.themes.default.border.radius
                     * @type              Number
                     * @default           2px
                     *
                     * Specify the <primary>10</primary> border radius
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    10: '2px',
                    /**
                     * @name              20
                     * @namespace         config.theme.themes.default.border.radius
                     * @type              Number
                     * @default           4px
                     *
                     * Specify the <primary>20</primary> border radius
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    20: '4px',
                    /**
                     * @name              30
                     * @namespace         config.theme.themes.default.border.radius
                     * @type              Number
                     * @default           6px
                     *
                     * Specify the <primary>30</primary> border radius
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    30: '6px',
                    /**
                     * @name              40
                     * @namespace         config.theme.themes.default.border.radius
                     * @type              Number
                     * @default           8px
                     *
                     * Specify the <primary>40</primary> border radius
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    40: '8px',
                    /**
                     * @name              50
                     * @namespace         config.theme.themes.default.border.radius
                     * @type              Number
                     * @default           10px
                     *
                     * Specify the <primary>50</primary> border radius
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    50: '10px',
                    /**
                     * @name              60
                     * @namespace         config.theme.themes.default.border.radius
                     * @type              Number
                     * @default           12px
                     *
                     * Specify the <primary>60</primary> border radius
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    60: '12px',
                    /**
                     * @name              70
                     * @namespace         config.theme.themes.default.border.radius
                     * @type              Number
                     * @default           14px
                     *
                     * Specify the <primary>70</primary> border radius
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    70: '14px',
                    /**
                     * @name              80
                     * @namespace         config.theme.themes.default.border.radius
                     * @type              Number
                     * @default           16px
                     *
                     * Specify the <primary>80</primary> border radius
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    80: '16px',
                    /**
                     * @name              90
                     * @namespace         config.theme.themes.default.border.radius
                     * @type              Number
                     * @default           18px
                     *
                     * Specify the <primary>90</primary> border radius
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    90: '18px'
                }
            },
            ui: {
                button: {
                    padding: '1em 2em',
                    borderRadius: '0.2em',
                    transition: '[config.theme.themes.default.transition.fast]',
                    styles: ['default', 'outlined', 'text']
                }
            },
            space: {
                /**
                 * @name            default
                 * @namespace       config.theme.themes.default.space
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
                 * @namespace       config.theme.themes.default.space
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
                 * @name            10
                 * @namespace       config.theme.themes.default.space
                 * @type            String
                 * @default         0.2rem
                 *
                 * Specify the <primary>10</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                10: '0.2rem',
                /**
                 * @name            20
                 * @namespace       config.theme.themes.default.space
                 * @type            String
                 * @default         0.4rem
                 *
                 * Specify the <primary>20</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                20: '0.4rem',
                /**
                 * @name            30
                 * @namespace       config.theme.themes.default.space
                 * @type            String
                 * @default         0.3rem
                 *
                 * Specify the <primary>30</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                30: '0.6rem',
                /**
                 * @name            40
                 * @namespace       config.theme.themes.default.space
                 * @type            String
                 * @default         0.5rem
                 *
                 * Specify the <primary>40</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                40: '0.8rem',
                /**
                 * @name            50
                 * @namespace       config.theme.themes.default.space
                 * @type            String
                 * @default         1rem
                 *
                 * Specify the <primary>50</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                50: '1rem',
                /**
                 * @name            60
                 * @namespace       config.theme.themes.default.space
                 * @type            String
                 * @default         1.2rem
                 *
                 * Specify the <primary>60</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                60: '1.2rem',
                /**
                 * @name            70
                 * @namespace       config.theme.themes.default.space
                 * @type            String
                 * @default         1.4rem
                 *
                 * Specify the <primary>70</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                70: '1.4rem',
                /**
                 * @name            80
                 * @namespace       config.theme.themes.default.space
                 * @type            String
                 * @default         1.6rem
                 *
                 * Specify the <primary>80</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                80: '1.6rem',
                /**
                 * @name            90
                 * @namespace       config.theme.themes.default.space
                 * @type            String
                 * @default         1.8rem
                 *
                 * Specify the <primary>90</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                90: '1.8rem'
            },
            margin: {
                /**
                 * @name            default
                 * @namespace       config.theme.themes.default.margin
                 * @type            String
                 * @default         [config.theme.themes.default.space.default]
                 *
                 * Specify the <primary>default</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                default: '[config.theme.themes.default.space.default]',
                /**
                 * @name            0
                 * @namespace       config.theme.themes.default.margin
                 * @type            String
                 * @default         [config.theme.themes.default.space.0]
                 *
                 * Specify the <primary>0</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                0: '[config.theme.themes.default.space.0]',
                /**
                 * @name            10
                 * @namespace       config.theme.themes.default.margin
                 * @type            String
                 * @default         [config.theme.themes.default.space.10]
                 *
                 * Specify the <primary>10</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                10: '[config.theme.themes.default.space.10]',
                /**
                 * @name            20
                 * @namespace       config.theme.themes.default.margin
                 * @type            String
                 * @default         [config.theme.themes.default.space.20]
                 *
                 * Specify the <primary>20</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                20: '[config.theme.themes.default.space.20]',
                /**
                 * @name            30
                 * @namespace       config.theme.themes.default.margin
                 * @type            String
                 * @default         [config.theme.themes.default.space.30]
                 *
                 * Specify the <primary>30</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                30: '[config.theme.themes.default.space.30]',
                /**
                 * @name            40
                 * @namespace       config.theme.themes.default.margin
                 * @type            String
                 * @default         [config.theme.themes.default.space.40]
                 *
                 * Specify the <primary>40</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                40: '[config.theme.themes.default.space.40]',
                /**
                 * @name            50
                 * @namespace       config.theme.themes.default.margin
                 * @type            String
                 * @default         [config.theme.themes.default.space.50]
                 *
                 * Specify the <primary>50</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                50: '[config.theme.themes.default.space.50]',
                /**
                 * @name            60
                 * @namespace       config.theme.themes.default.margin
                 * @type            String
                 * @default         [config.theme.themes.default.space.60]
                 *
                 * Specify the <primary>60</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                60: '[config.theme.themes.default.space.60]',
                /**
                 * @name            70
                 * @namespace       config.theme.themes.default.margin
                 * @type            String
                 * @default         [config.theme.themes.default.space.70]
                 *
                 * Specify the <primary>70</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                70: '[config.theme.themes.default.space.70]',
                /**
                 * @name            80
                 * @namespace       config.theme.themes.default.margin
                 * @type            String
                 * @default         [config.theme.themes.default.space.80]
                 *
                 * Specify the <primary>80</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                80: '[config.theme.themes.default.space.80]',
                /**
                 * @name            90
                 * @namespace       config.theme.themes.default.margin
                 * @type            String
                 * @default         [config.theme.themes.default.space.90]
                 *
                 * Specify the <primary>90</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                90: '[config.theme.themes.default.space.90]'
            },
            padding: {
                /**
                 * @name            default
                 * @namespace       config.theme.themes.default.padding
                 * @type            String
                 * @default         [config.theme.themes.default.space.default]
                 *
                 * Specify the <primary>default</primary> space used for padding and padding
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                default: '[config.theme.themes.default.space.default]',
                /**
                 * @name            0
                 * @namespace       config.theme.themes.default.padding
                 * @type            String
                 * @default         [config.theme.themes.default.space.0]
                 *
                 * Specify the <primary>0</primary> space used for padding and padding
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                0: '[config.theme.themes.default.space.0]',
                /**
                 * @name            10
                 * @namespace       config.theme.themes.default.padding
                 * @type            String
                 * @default         [config.theme.themes.default.space.10]
                 *
                 * Specify the <primary>10</primary> space used for padding and padding
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                10: '[config.theme.themes.default.space.10]',
                /**
                 * @name            20
                 * @namespace       config.theme.themes.default.padding
                 * @type            String
                 * @default         [config.theme.themes.default.space.20]
                 *
                 * Specify the <primary>20</primary> space used for padding and padding
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                20: '[config.theme.themes.default.space.20]',
                /**
                 * @name            30
                 * @namespace       config.theme.themes.default.padding
                 * @type            String
                 * @default         [config.theme.themes.default.space.30]
                 *
                 * Specify the <primary>30</primary> space used for padding and padding
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                30: '[config.theme.themes.default.space.30]',
                /**
                 * @name            40
                 * @namespace       config.theme.themes.default.padding
                 * @type            String
                 * @default         [config.theme.themes.default.space.40]
                 *
                 * Specify the <primary>40</primary> space used for padding and padding
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                40: '[config.theme.themes.default.space.40]',
                /**
                 * @name            50
                 * @namespace       config.theme.themes.default.padding
                 * @type            String
                 * @default         [config.theme.themes.default.space.50]
                 *
                 * Specify the <primary>50</primary> space used for padding and padding
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                50: '[config.theme.themes.default.space.50]',
                /**
                 * @name            60
                 * @namespace       config.theme.themes.default.padding
                 * @type            String
                 * @default         [config.theme.themes.default.space.60]
                 *
                 * Specify the <primary>60</primary> space used for padding and padding
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                60: '[config.theme.themes.default.space.60]',
                /**
                 * @name            70
                 * @namespace       config.theme.themes.default.padding
                 * @type            String
                 * @default         [config.theme.themes.default.space.70]
                 *
                 * Specify the <primary>70</primary> space used for padding and padding
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                70: '[config.theme.themes.default.space.70]',
                /**
                 * @name            80
                 * @namespace       config.theme.themes.default.padding
                 * @type            String
                 * @default         [config.theme.themes.default.space.80]
                 *
                 * Specify the <primary>80</primary> space used for padding and padding
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                80: '[config.theme.themes.default.space.80]',
                /**
                 * @name            90
                 * @namespace       config.theme.themes.default.padding
                 * @type            String
                 * @default         [config.theme.themes.default.space.90]
                 *
                 * Specify the <primary>90</primary> space used for padding and padding
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                90: '[config.theme.themes.default.space.90]'
            },
            media: {
                /**
                 * @name              defaultAction
                 * @namespace         config.theme.themes.default.media
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
                 * @namespace         config.theme.themes.default.media
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
                     * @namespace     config.theme.themes.default.media.queries
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
                     * @namespace     config.theme.themes.default.media.queries
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
                     * @namespace     config.theme.themes.default.media.queries
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
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9FQUE2QztBQUM3QyxnRkFBMEQ7QUFFMUQsNEZBQXNFO0FBRXRFLFNBQWdCLE9BQU8sQ0FBQyxXQUFXLEVBQUUsTUFBTTtJQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNwRCxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLElBQUksUUFBUSxDQUFDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzdELE1BQU0sSUFBSSxLQUFLLENBQ2IsbURBQW1ELFNBQVMsaURBQWlELFFBQVEsQ0FBQyxPQUFPLDhDQUE4QyxDQUM1SyxDQUFDO1NBQ0g7YUFBTSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDM0IsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxtQkFBVyxDQUN6QyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFDcEMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FDOUIsQ0FBQztZQUNGLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUM7U0FDOUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUM7QUFoQkQsMEJBZ0JDO0FBRUQsU0FBZ0IsS0FBSyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsTUFBTTtJQUMvQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsRUFBRTtRQUN4QyxNQUFNLFFBQVEsR0FBRyxh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