import __SColor from '@coffeekraken/s-color';
import __get from '@coffeekraken/sugar/shared/object/get';

export function proxy(path, originalValue, config) {
  if (path.match(/\.colors\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/)) {
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
