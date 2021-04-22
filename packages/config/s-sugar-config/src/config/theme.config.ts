import __SColor from '@coffeekraken/s-color';
import __get from '@coffeekraken/sugar/shared/object/get';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

export function prepare(themeConfig, config) {
  Object.keys(themeConfig).forEach((themeName) => {
    const themeObj = themeConfig[themeName];
    if (themeObj.extends && !themeConfig[themeObj.extends]) {
      throw new Error(
        `<red>[theme.config.js]</red> The theme "<yellow>${themeName}</yellow>" need to extends the theme "<yellow>${themeObj.extends}</yellow>" but this theme does not exists...`
      );
    } else if (themeObj.extends) {
      themeConfig[themeName] = __deepMerge(
        themeConfig[themeObj.extends],
        themeConfig[themeName]
      );
      delete themeConfig[themeName].extends;
    }
  });
  return themeConfig;
}

export function proxy(path, originalValue, config) {
  if (path.match(/\.color\.[a-zA-Z0-9]+$/)) {
    const newStack = originalValue;
    Object.keys(originalValue).forEach((modName) => {
      const color = new __SColor(newStack[modName]);
      newStack[`${modName}-i`] = color.apply('-i').toString();
    });
    return newStack;
  }

  if (path.match(/\.color\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/)) {
    if (path.split('.').pop() === 'default') {
      return originalValue;
    }
    const defaultColor = __get(
      config,
      path.split('.').slice(0, -1).join('.') + '.default'
    );
    if (typeof originalValue === 'string') {
      if (
        originalValue.slice(0, 1) === '#' &&
        (originalValue.length === 7 || originalValue.length === 4)
      ) {
        return originalValue;
      } else if (originalValue.match(/^rgb\(.*,.*,.*\)$/)) {
        return originalValue;
      } else if (originalValue.match(/^rgba\(.*,.*,.*,.*\)$/)) {
        return originalValue;
      } else if (originalValue.match(/^hsl\(.*,.*,.*\)$/)) {
        return originalValue;
      } else if (originalValue.match(/^hsla\(.*,.*,.*,.*\)$/)) {
        return originalValue;
      } else {
        const color = new __SColor(defaultColor);
        color.apply(originalValue);
        return color.toString();
      }
    }
  }
  return originalValue;
}

export default {
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
          import:
            'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap'
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
          import:
            'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@700&display=swap'
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
