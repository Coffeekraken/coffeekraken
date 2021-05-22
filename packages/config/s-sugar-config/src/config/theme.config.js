import __SColor from '@coffeekraken/s-color';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __isColor from '@coffeekraken/sugar/shared/is/color';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
export function prepare(themeConfig, config) {
    Object.keys(themeConfig.themes).forEach((themeName) => {
        const themeObj = themeConfig.themes[themeName];
        if (themeObj.extends && !themeConfig.themes[themeObj.extends]) {
            throw new Error(`<red>[theme.config.js]</red> The theme "<yellow>${themeName}</yellow>" need to extends the theme "<yellow>${themeObj.extends}</yellow>" but this theme does not exists...`);
        }
        else if (themeObj.extends) {
            themeConfig.themes[themeName] = __deepMerge(themeConfig.themes[themeObj.extends], themeConfig.themes[themeName]);
            delete themeConfig.themes[themeName].extends;
        }
        Object.keys(themeObj.color).forEach((colorName) => {
            Object.keys(themeObj.color[colorName]).forEach((colorVariantName) => {
                const colorValue = themeObj.color[colorName][colorVariantName];
                if (colorVariantName.match(/^:/) && __isPlainObject(colorValue)) {
                    Object.keys(colorValue).forEach((modifierName) => {
                        const modifierValue = colorValue[modifierName];
                        if (colorVariantName !== ':hover' &&
                            colorVariantName !== ':focus' &&
                            colorVariantName !== ':active') {
                            throw new Error(`<red>[config.theme.${themeName}.color.${colorName}.${colorVariantName}.${modifierName}]</red> Sorry but the specified state variant "<yellow>${modifierName}</yellow>" is not a valid one. Supported states are <green>:hover, :focus and :active</green>`);
                        }
                        if (__isColor(modifierValue)) {
                            throw new Error(`<red>[config.theme.${themeName}.color.${colorName}.${colorVariantName}.${modifierName}]</red> Sorry but a color state variant cannot be a color but just a color modifier like "--darken 10", etc...`);
                        }
                        // themeObj.color[colorName][
                        //   `${colorVariantName}-${modifierName}`
                        // ] = modifierValue;
                    });
                }
                else if (__isColor(colorValue)) {
                    const color = new __SColor(colorValue);
                    themeObj.color[colorName][`${colorVariantName}-h`] = color.h;
                    themeObj.color[colorName][`${colorVariantName}-s`] = color.s;
                    themeObj.color[colorName][`${colorVariantName}-l`] = color.l;
                }
            });
        });
    });
    return themeConfig;
}
// export function proxy(path, originalValue, config) {
//   // if (path.match(/\.color\.[a-zA-Z0-9]+$/)) {
//   //   const newStack = originalValue;
//   //   Object.keys(originalValue).forEach((modName) => {
//   //     const color = new __SColor(newStack[modName]);
//   //     newStack[`${modName}-i`] = color.apply('-i').toString();
//   //   });
//   //   return newStack;
//   // }
//   if (path.match(/\.color\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/)) {
//     if (path.split('.').pop() === 'default') {
//       return originalValue;
//     }
//     const defaultColor = __get(
//       config,
//       path.split('.').slice(0, -1).join('.') + '.default'
//     );
//     if (typeof originalValue === 'string') {
//       if (
//         originalValue.slice(0, 1) === '#' &&
//         (originalValue.length === 7 || originalValue.length === 4)
//       ) {
//         return originalValue;
//       } else if (originalValue.match(/^rgb\(.*,.*,.*\)$/)) {
//         return originalValue;
//       } else if (originalValue.match(/^rgba\(.*,.*,.*,.*\)$/)) {
//         return originalValue;
//       } else if (originalValue.match(/^hsl\(.*,.*,.*\)$/)) {
//         return originalValue;
//       } else if (originalValue.match(/^hsla\(.*,.*,.*,.*\)$/)) {
//         return originalValue;
//       } else {
//         const color = new __SColor(defaultColor);
//         color.apply(originalValue);
//         return color.toString();
//       }
//     }
//   }
//   return originalValue;
// }
export default {
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
            transition: {
                slow: 'all 1s ease-in-out',
                default: 'all .5s ease-in-out',
                fast: 'all .2s ease-in-out'
            },
            layout: {
                container: {
                    'max-width': '1280px'
                },
                layout: {
                    '1': '1',
                    '12': '1 2',
                    '123': '1 2 3',
                    '1234': '1 2 3 4',
                    '122': '1 2 2',
                    '112': '1 1 2',
                    '12345': '1 2 3 4 5',
                    '123456': '1 2 3 4 5 6'
                }
            },
            ratio: {
                '1-1': 1,
                '16-9': 16 / 9,
                '2-3': 2 / 3,
                '4-3': 4 / 3,
                '3-4': 3 / 4
            },
            depth: {
                0: '0',
                10: `0 0.1px 0.1px rgba(0, 0, 0, 0.02),
            0 0.1px 0.1px rgba(0, 0, 0, 0.028),
            0 0.3px 0.3px rgba(0, 0, 0, 0.035),
            0 0.4px 0.4px rgba(0, 0, 0, 0.042),
            0 0.8px 0.8px rgba(0, 0, 0, 0.05),
            0 2px 2px rgba(0, 0, 0, 0.07)`,
                20: `0 0.1px 0.1px rgba(0, 0, 0, 0.02),
            0 0.3px 0.3px rgba(0, 0, 0, 0.028),
            0 0.5px 0.6px rgba(0, 0, 0, 0.035),
            0 0.9px 1.1px rgba(0, 0, 0, 0.042),
            0 1.7px 2.1px rgba(0, 0, 0, 0.05),
            0 4px 5px rgba(0, 0, 0, 0.07)
            `,
                30: `0 0.6px 0.5px rgba(0, 0, 0, 0.017),
            0 1.5px 1.1px rgba(0, 0, 0, 0.024),
            0 2.8px 2.1px rgba(0, 0, 0, 0.03),
            0 4.9px 3.8px rgba(0, 0, 0, 0.036),
            0 9.2px 7.1px rgba(0, 0, 0, 0.043),
            0 22px 17px rgba(0, 0, 0, 0.06)
            `,
                40: `0 0.2px 0.2px rgba(0, 0, 0, 0.02),
            0 0.4px 0.5px rgba(0, 0, 0, 0.028),
            0 0.8px 0.9px rgba(0, 0, 0, 0.035),
            0 1.3px 1.6px rgba(0, 0, 0, 0.042),
            0 2.5px 2.9px rgba(0, 0, 0, 0.05),
            0 6px 7px rgba(0, 0, 0, 0.07)`,
                50: `0 0.3px 0.3px rgba(0, 0, 0, 0.02),
            0 0.7px 0.7px rgba(0, 0, 0, 0.028),
            0 1.3px 1.3px rgba(0, 0, 0, 0.035),
            0 2.2px 2.2px rgba(0, 0, 0, 0.042),
            0 4.2px 4.2px rgba(0, 0, 0, 0.05),
            0 10px 10px rgba(0, 0, 0, 0.07)`,
                60: `0 0.3px 0.3px rgba(0, 0, 0, 0.02),
            0 0.8px 0.8px rgba(0, 0, 0, 0.028),
            0 1.5px 1.5px rgba(0, 0, 0, 0.035),
            0 2.7px 2.7px rgba(0, 0, 0, 0.042),
            0 5px 5px rgba(0, 0, 0, 0.05),
            0 12px 12px rgba(0, 0, 0, 0.07)`,
                70: `0 0.4px 0.4px rgba(0, 0, 0, 0.02),
            0 0.9px 0.9px rgba(0, 0, 0, 0.028),
            0 1.8px 1.8px rgba(0, 0, 0, 0.035),
            0 3.1px 3.1px rgba(0, 0, 0, 0.042),
            0 5.8px 5.8px rgba(0, 0, 0, 0.05),
            0 14px 14px rgba(0, 0, 0, 0.07)`,
                80: `0 0.4px 0.4px rgba(0, 0, 0, 0.02),
            0 1.1px 1.1px rgba(0, 0, 0, 0.028),
            0 2px 2px rgba(0, 0, 0, 0.035),
            0 3.6px 3.6px rgba(0, 0, 0, 0.042),
            0 6.7px 6.7px rgba(0, 0, 0, 0.05),
            0 16px 16px rgba(0, 0, 0, 0.07)`,
                90: `0 0.5px 0.5px rgba(0, 0, 0, 0.02),
            0 1.3px 1.3px rgba(0, 0, 0, 0.028),
            0 2.4px 2.4px rgba(0, 0, 0, 0.035),
            0 4.2px 4.2px rgba(0, 0, 0, 0.042),
            0 7.9px 7.9px rgba(0, 0, 0, 0.05),
            0 19px 19px rgba(0, 0, 0, 0.07)`,
                100: `0 0.6px 0.6px rgba(0, 0, 0, 0.02),
            0 1.5px 1.5px rgba(0, 0, 0, 0.028),
            0 2.8px 2.8px rgba(0, 0, 0, 0.035),
            0 4.9px 4.9px rgba(0, 0, 0, 0.042),
            0 9.2px 9.2px rgba(0, 0, 0, 0.05),
            0 22px 22px rgba(0, 0, 0, 0.07)`
            },
            gradient: {
                defaultType: 'linear',
                defaultAngle: 45,
                defaultModifier: '70'
            },
            colorSchema: {
                default: 'default',
                accent: 'primary',
                complementary: 'secondary'
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
                    default: '#848e91'
                },
                /**
                 * @name                ui
                 * @namespace           config.theme.themes.ui.color
                 * @type                Color
                 * @ui             #BDBDBD
                 *
                 * Specify the <ui>ui</ui> color value and modifiers.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                ui: {
                    default: '#BDBDBD'
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
                    default: '#2b3438'
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
                    default: '#848e91'
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
                    default: '#f2bc2b'
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
                    default: '#f2d72b',
                    text: '--darken 30',
                    highlight: '--lighten 0',
                    surface: '--lighten 45',
                    foreground: '--darken 0',
                    ':hover': {
                        surface: '--lighten 35',
                        foreground: '--darken 40'
                    },
                    ':focus': {
                        surface: '--lighten 20',
                        foreground: '--darken 40'
                    },
                    ':active': {
                        surface: '--lighten 0',
                        foreground: '--lighten 50'
                    }
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
                    default: '#6d858f'
                },
                /**
                 * @name                surface
                 * @namespace           config.theme.themes.default.color
                 * @type                Color
                 * @default             #ffffff
                 *
                 * Specify the <surface>surface</surface> color value and modifiers.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                surface: {
                    default: '#ffffff'
                },
                /**
                 * @name                background
                 * @namespace           config.theme.themes.default.color
                 * @type                Color
                 * @default             #FAFAFA
                 *
                 * Specify the <background>background</background> color value and modifiers.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                background: {
                    default: '#FAFAFA'
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
                    default: '#5cb85c'
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
                    default: '#f0ad4e'
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
                    default: '#d9534f'
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
                    default: '#2199e8'
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
                        'font-family': '"Titillium Web"',
                        'font-weight': 400,
                        import: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap'
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
                        'font-family': '"Titillium Web"',
                        'font-weight': 400,
                        import: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap'
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
                        'font-family': '"Palatino, Times, Georgia, serif"',
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
                        'font-family': '"Menlo, Monaco, Consolas, Courier New, monospace"',
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
                     * @default       8px
                     *
                     * Declare the font size <primary>10</primary>
                     *
                     * @since         2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    10: '8px',
                    /**
                     * @name          20
                     * @namespace     config.theme.themes.default.font.size
                     * @type          String
                     * @default       10px
                     *
                     * Declare the font size <primary>20</primary>
                     *
                     * @since         2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    20: '10px',
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
                     * @default       14px
                     *
                     * Declare the font size <primary>40</primary>
                     *
                     * @since         2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    40: '14px',
                    /**
                     * @name          50
                     * @namespace     config.theme.themes.default.font.size
                     * @type          String
                     * @default       16px
                     *
                     * Declare the font size <primary>50</primary>
                     *
                     * @since         2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    50: '16px',
                    /**
                     * @name          60
                     * @namespace     config.theme.themes.default.font.size
                     * @type          String
                     * @default       24px
                     *
                     * Declare the font size <primary>60</primary>
                     *
                     * @since         2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    60: '24px',
                    /**
                     * @name          70
                     * @namespace     config.theme.themes.default.font.size
                     * @type          String
                     * @default       32px
                     *
                     * Declare the font size <primary>70</primary>
                     *
                     * @since         2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    70: '32px',
                    /**
                     * @name          80
                     * @namespace     config.theme.themes.default.font.size
                     * @type          String
                     * @default       40px
                     *
                     * Declare the font size <primary>80</primary>
                     *
                     * @since         2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    80: '40px',
                    /**
                     * @name          90
                     * @namespace     config.theme.themes.default.font.size
                     * @type          String
                     * @default      48px
                     *
                     * Declare the font size <primary>90</primary>
                     *
                     * @since         2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    90: '48px',
                    /**
                     * @name          10
                     * @namespace     config.theme.themes.default.font.size
                     * @type          String
                     * @default      56px
                     *
                     * Declare the font size <primary>100</primary>
                     *
                     * @since         2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    100: '56px'
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
            typo: {
                h1: {
                    'font-family': 'title',
                    'font-size': 80,
                    color: 'primary',
                    'margin-bottom': 80
                },
                h2: {
                    'font-family': 'title',
                    'font-size': 70,
                    color: 'primary',
                    'margin-bottom': 70
                },
                h3: {
                    'font-family': 'title',
                    'font-size': 60,
                    color: 'text',
                    'margin-bottom': 60
                },
                h4: {
                    'font-family': 'title',
                    'font-size': 50,
                    color: 'text',
                    'margin-bottom': 50
                },
                h5: {
                    'font-family': 'title',
                    'font-size': 40,
                    color: 'text',
                    'margin-bottom': 50
                },
                h6: {
                    'font-family': 'title',
                    'font-size': 30,
                    color: 'text',
                    'margin-bottom': 50
                },
                'p-lead': {
                    'font-family': 'default',
                    'font-size': 70,
                    color: 'text',
                    'margin-bottom': 50
                },
                p: {
                    'font-family': 'default',
                    'font-size': 50,
                    color: 'text',
                    'margin-bottom': 50
                },
                b: {
                    'font-weight': 'bold'
                },
                strong: {
                    'font-weight': 'bold'
                },
                i: {
                    'font-style': 'italic'
                },
                em: {
                    'font-style': 'italic'
                },
                small: {
                    'font-size': '0.5em'
                },
                mark: {
                    'background-color': '[config.theme.themes.default.color.primary.30]'
                },
                del: {
                    'text-decoration': 'line-through'
                },
                ins: {
                    'text-decoration': 'underline'
                },
                sub: {
                    'vertical-align': 'sub',
                    'font-size': '0.6em'
                },
                sup: {
                    'vertical-align': 'sup',
                    'font-size': '0.6em'
                }
            },
            ui: {
                button: {
                    padding: '1em 2em',
                    borderRadius: '[config.theme.themes.default.border.radius.default]',
                    transition: '[config.theme.themes.default.transition.fast]',
                    styles: ['default', 'outlined', 'text']
                },
                form: {
                    padding: '0.5em 0.8em',
                    borderRadius: '[config.theme.themes.default.border.radius.default]',
                    transition: '[config.theme.themes.default.transition.fast]',
                    styles: ['default:default'],
                    colors: ['ui:default']
                },
                list: {
                    padding: '0.5em 0.8em',
                    borderRadius: '[config.theme.themes.default.border.radius.default]',
                    transition: '[config.theme.themes.default.transition.fast]',
                    styles: ['default'],
                    colors: ['primary:default']
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
                90: '1.8rem',
                /**
                 * @name            100
                 * @namespace       config.theme.themes.default.space
                 * @type            String
                 * @default         2rem
                 *
                 * Specify the <primary>100</primary> space used for padding and margin
                 *
                 * @since           1.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                100: '2rem'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBRXhFLE1BQU0sVUFBVSxPQUFPLENBQUMsV0FBVyxFQUFFLE1BQU07SUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDcEQsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3RCxNQUFNLElBQUksS0FBSyxDQUNiLG1EQUFtRCxTQUFTLGlEQUFpRCxRQUFRLENBQUMsT0FBTyw4Q0FBOEMsQ0FDNUssQ0FBQztTQUNIO2FBQU0sSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQzNCLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsV0FBVyxDQUN6QyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFDcEMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FDOUIsQ0FBQztZQUNGLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUM7U0FDOUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNoRCxNQUFN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Ozs7Ozs7bUJBVUc7Z0JBQ0gsRUFBRSxFQUFFLFFBQVE7Z0JBRVo7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsRUFBRSxFQUFFLFFBQVE7Z0JBRVo7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsRUFBRSxFQUFFLFFBQVE7Z0JBRVo7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsRUFBRSxFQUFFLFFBQVE7Z0JBRVo7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsRUFBRSxFQUFFLE1BQU07Z0JBRVY7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsRUFBRSxFQUFFLFFBQVE7Z0JBRVo7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsRUFBRSxFQUFFLFFBQVE7Z0JBRVo7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsRUFBRSxFQUFFLFFBQVE7Z0JBRVo7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsRUFBRSxFQUFFLFFBQVE7Z0JBRVo7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsR0FBRyxFQUFFLE1BQU07YUFDWjtZQUVELE1BQU0sRUFBRTtnQkFDTjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsNkNBQTZDO2dCQUV0RDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxDQUFDLEVBQUUsdUNBQXVDO2dCQUUxQzs7Ozs7Ozs7OzttQkFVRztnQkFDSCxFQUFFLEVBQUUsd0NBQXdDO2dCQUU1Qzs7Ozs7Ozs7OzttQkFVRztnQkFDSCxFQUFFLEVBQUUsd0NBQXdDO2dCQUU1Qzs7Ozs7Ozs7OzttQkFVRztnQkFDSCxFQUFFLEVBQUUsd0NBQXdDO2dCQUU1Qzs7Ozs7Ozs7OzttQkFVRztnQkFDSCxFQUFFLEVBQUUsd0NBQXdDO2dCQUU1Qzs7Ozs7Ozs7OzttQkFVRztnQkFDSCxFQUFFLEVBQUUsd0NBQXdDO2dCQUU1Qzs7Ozs7Ozs7OzttQkFVRztnQkFDSCxFQUFFLEVBQUUsd0NBQXdDO2dCQUU1Qzs7Ozs7Ozs7OzttQkFVRztnQkFDSCxFQUFFLEVBQUUsd0NBQXdDO2dCQUU1Qzs7Ozs7Ozs7OzttQkFVRztnQkFDSCxFQUFFLEVBQUUsd0NBQXdDO2dCQUU1Qzs7Ozs7Ozs7OzttQkFV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